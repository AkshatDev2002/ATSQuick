"use client";

import styles from "./About.module.css";
import Lottie from "lottie-react";


import animationData from "@/assets/lottie/Scan.json";

export default function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.grid}>
        {/* LEFT: Lottie Animation*/}
        <div className={styles.visual}>
          <div className={styles.lottieCard}>
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className={styles.lottie}
            />
          </div>
        </div>
        

        {/* RIGHT: Content*/}
        <div className={styles.content}>
          <h2 className={styles.title}>
            ATSQuick’s Resume ATS Score Analyzer uses a powerful two-step
            evaluation system to boost your job chances
          </h2>

          <p className={styles.paragraph}>
            When you apply for a job, your resume is likely to be filtered first
            by an Applicant Tracking System (ATS) before it reaches a
            recruiter’s eyes. ATS software scans resumes for relevant keywords,
            skills, and formatting to shortlist the best candidates.
          </p>

          <p className={styles.paragraph}>
            That means your resume’s success depends on how well it’s optimized
            for ATS algorithms, including the template structure, targeted
            keywords, and demonstrated skills.
          </p>

          <div className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <div>
              <h3 className={styles.stepTitle}>
                Advanced AI-driven resume content analysis
              </h3>
              <p className={styles.paragraph}>
                ATSQuick leverages the cutting-edge Gemini-2.5-Flash generative
                AI model to analyze and interpret your resume just like top ATS
                software does. This ensures precise parsing and compatibility
                scoring, giving you a clear understanding of how ATS-friendly
                your resume really is.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <div>
              <h3 className={styles.stepTitle}>
                Quality and impact of your resume content
              </h3>
              <p className={styles.paragraph}>
                While ATS systems focus on keyword matching, hiring managers look
                for clear, error-free language and measurable achievements.
                ATSQuick’s scoring also captures your resume’s clarity,
                quantifiable results, and professionalism to help you stand out.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
