import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message, recaptchaToken } = await req.json();

    /* ===============================
       BASIC VALIDATION
    =============================== */
    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!recaptchaToken) {
      return Response.json(
        { success: false, message: "reCAPTCHA token missing." },
        { status: 400 }
      );
    }

    /* ===============================
       VERIFY reCAPTCHA v3 (LIKE OLD PROJECT)
    =============================== */
    const verify = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        }),
      }
    );

    const recaptcha = await verify.json();

    // Log once during debugging
    console.log("reCAPTCHA:", recaptcha);

    if (!recaptcha.success) {
      return Response.json(
        { success: false, message: "reCAPTCHA verification failed." },
        { status: 403 }
      );
    }

    // Optional score check (v3-specific)
    if (typeof recaptcha.score === "number" && recaptcha.score < 0.5) {
      return Response.json(
        { success: false, message: "reCAPTCHA score too low." },
        { status: 403 }
      );
    }

    /* ===============================
       SEND EMAIL
    =============================== */
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"ATSQuick Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `New contact message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p>${message}</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
