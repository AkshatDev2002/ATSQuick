"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ScoreCard.module.css";

/**
 * ScoreCard
 * Displays animated resume score (odometer-style)
 *
 * @param {Object} props
 * @param {number} props.score - value between 0 and 100
 */
export default function ScoreCard({ score }) {
  const safeScore =
    typeof score === "number" && score >= 0 && score <= 100
      ? Math.round(score)
      : null;

  const [displayScore, setDisplayScore] = useState(0);
  const hasAnimated = useRef(false);

  const getLabel = (value) => {
    if (value >= 85) return "Excellent";
    if (value >= 70) return "Strong";
    if (value >= 50) return "Average";
    return "Needs Improvement";
  };

  useEffect(() => {
    if (safeScore === null || hasAnimated.current) return;

    hasAnimated.current = true;

    const duration = 1200; // ms
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out curve (odometer feel)
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayScore(Math.round(eased * safeScore));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [safeScore]);

  return (
    <section className={styles.container} aria-labelledby="score-heading">
      <h2 id="score-heading" className={styles.title}>
        Resume Score
      </h2>

      {safeScore !== null ? (
        <div className={styles.scoreWrapper}>
          <span
            className={styles.score}
            aria-live="polite"
            aria-label={`Resume score ${displayScore}`}
          >
            {displayScore}
          </span>

          <span className={styles.label}>
            {getLabel(displayScore)}
          </span>
        </div>
      ) : (
        <p className={styles.error}>
          Score unavailable. Please re-analyze your resume.
        </p>
      )}
    </section>
  );
}
