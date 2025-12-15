import DotBackground from "@/components/ui/dot-background";
import UploadBox from "@/components/UploadBox/UploadBox";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <DotBackground>
      <main className={styles.container}>
        {/* LOGO (unchanged) */}
        <header className={styles.header}>
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/logo.png"
              alt="ATSQuick Logo"
              width={100}
              height={32}
              priority
              className={styles.logo}
            />
          </Link>
        </header>

        {/* HERO GRID */}
        <section className={styles.heroGrid}>
          {/* LEFT: Content + Upload */}
          <div className={styles.left}>
            <span className={styles.eyebrow}>ATSQuick – Free ATS Resume Check in Seconds</span>

            <h1 className={styles.title}>
              Is your resume truly interview-ready?
            </h1>

            <p className={styles.subtitle}>
              Get an instant free ATS resume score, skill analysis,
              and job role recommendations powered by Gen-AI.
            </p>
            <UploadBox />
          </div>
     

          {/* RIGHT: Glass video preview */}
          <div className={styles.right}>
            <div className={styles.previewStack}>
              <video
                className={styles.previewVideo}
                src="/ats.mp4"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </section>

        <section id="about">
          <About />
        </section>

        <section id="contact">
          <Contact />
        </section>

      </main>
    </DotBackground>
  );
}
