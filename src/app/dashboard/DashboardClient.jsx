"use client";

import { useEffect, useState } from "react";
import DotBackground from "@/components/ui/dot-background";
import ScoreCard from "@/components/ScoreCard/ScoreCard";
import SkillsChart from "@/components/SkillsChart/SkillsChart";
import JobMatchBox from "@/components/JobMatchBox/JobMatchBox";
import SuggestionsBox from "@/components/SuggestionsBox/SuggestionsBox";
import { generateReportPdf } from "@/utils/generateReportPdf";


import styles from "./dashboard.module.css";

export default function DashboardClient() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("analysis");
      if (stored) {
        setAnalysis(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load analysis:", err);
    }
  }, []);

  if (!analysis) {
    return (
      <main className={styles.loading}>
        <p>Loading resume analysis...</p>
      </main>
    );
  }

  return (
        <DotBackground>
    
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Resume Analysis Dashboard</h1>
        <p>
          AI-powered evaluation of your resume with ATS-focused insights
        </p>
        <button
  className={styles.downloadBtn}
  onClick={() => generateReportPdf(analysis)}
>
  Download PDF Report
</button>

      </header>

      <section className={styles.grid}>
        <ScoreCard score={analysis.score} />
        <SkillsChart skills={analysis.skills} />
      </section>

      <section className={styles.gridSecondary}>
        <JobMatchBox roles={analysis.jobMatches} />
        <SuggestionsBox suggestions={analysis.suggestions} />
      </section>
    </main>
        </DotBackground>
    
  );
}
