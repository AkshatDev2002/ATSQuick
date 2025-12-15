"use client";

import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Lottie from "lottie-react";
import styles from "./Contact.module.css";
import contactAnimation from "@/assets/lottie/Contact.json";

export default function ContactInner() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);

    if (!executeRecaptcha || loading) {
      console.warn("reCAPTCHA not ready");
      setStatus("error");
      return;
    }

    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha("contact_submit");

      if (!recaptchaToken) {
        throw new Error("reCAPTCHA token empty");
      }

      const formData = Object.fromEntries(new FormData(e.target));

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Request failed");
      }

      setStatus("success");
      e.target.reset();
    } catch (err) {
      console.error("Contact submit error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.content}>
          <h1 className={styles.headT}>
            Have questions about your ATS resume score or need help with updates and improvements?
          </h1>
          <p className={styles.description}>
            Reach out to ATSQuick anytime! Whether you want to request new features, report issues, or share feedback to enhance our resume analyzer, we’re here to assist you promptly. 
            Contact ATSQuick support today for personalized help and the latest updates on resume optimization.
          </p>
        </div>

        <div className={styles.formCard}>
          <div className={styles.headerRow}>
            <h2 className={styles.title}>Get in touch</h2>
            <div className={styles.lottieInline}>
              <Lottie animationData={contactAnimation} loop autoplay />
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input name="name" placeholder="Your name" required />
            <input type="email" name="email" placeholder="Email address" required />
            <textarea name="message" rows="4" placeholder="Your message" required />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <span className={styles.success}>Message sent successfully</span>
            )}
            {status === "error" && (
              <span className={styles.error}>
                reCAPTCHA not ready. Try again.
              </span>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
