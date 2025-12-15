"use client";

import Image from "next/image";
import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* LEFT: SOCIAL LINKS */}
        <div className={styles.socials}>
          <a
            href="https://akshatdev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/akshat-dev-14ad/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>

          <a
            href="https://akshatdev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website"
          >
            <FaGlobe size={18} />
          </a>
        </div>

        {/* RIGHT: COPYRIGHT */}
        <div className={styles.meta}>
          <span>Made with ❤️ by Akshat Dev.</span>

          <div className={styles.brand}>
            <Link href="/" aria-label="Home">
            <Image
              src="/logo.png"
              alt="ATSQuick Logo"
              width={90}
              height={28}
              priority
            />
            </Link>
            <span>© 2025. All rights reserved.</span>
          </div>
          </div>
      </div>
    </footer>
  );
}
