"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ContactInner from "./ContactInner";

export default function Contact() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      <ContactInner />
    </GoogleReCaptchaProvider>
  );
}
