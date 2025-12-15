"use client";

import dynamic from "next/dynamic";
import styles from "./SkillsChart.module.css";

/**
 * Charts should never SSR
 */
const SkillsRadarChart = dynamic(
  () => import("./SkillsRadarChart"),
  { ssr: false }
);

/**
 * SkillsChart
 * Visualizes top 10 skill strengths returned by AI
 *
 * @param {Object} props
 * @param {Record<string, number>} props.skills
 */
export default function SkillsChart({ skills }) {
  const hasSkills =
    skills &&
    typeof skills === "object" &&
    Object.keys(skills).length > 0;

  if (!hasSkills) {
    return (
      <section className={styles.container}>
        <h2 className={styles.title}>Skills Breakdown</h2>
        <p className={styles.empty}>No skill data available.</p>
      </section>
    );
  }

  
  const normalizedData = Object.entries(skills)
    .filter(([, value]) => typeof value === "number")
    .map(([name, value]) => ({
      name,
      value: Math.min(Math.max(value, 0), 100),
    }))
    .sort((a, b) => b.value - a.value) 
    .slice(0, 10); 

  return (
    <section
      className={styles.container}
      aria-labelledby="skills-heading"
    >
      <h2 id="skills-heading" className={styles.title}>
        Skills Breakdown
      </h2>

      <div className={styles.chartWrapper}>
        <SkillsRadarChart data={normalizedData} />
      </div>
    </section>
  );
}
