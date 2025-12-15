import jsPDF from "jspdf";

/**
 * Generates and downloads resume analysis PDF
 * @param {Object} analysis
 */
export function generateReportPdf(analysis) {
  // Safety check: ensure we're in browser environment
  if (typeof window === "undefined") {
    console.error("PDF generation only works in browser");
    return;
  }

  // Validate analysis data
  if (!analysis || typeof analysis !== "object") {
    console.error("Invalid analysis data");
    return;
  }

  const doc = new jsPDF();

  let y = 20;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();

  // HEADER - BRANDING
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(98, 154, 199); // Blue color for ATSQuick
  doc.text("ATSQuick", 20, y);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("AI Resume Analysis Report", 20, y + 6);

  y += 18;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, pageWidth - 20, y);
  y += 8;

  // SCORE SECTION
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("Overall ATS Score", 20, y);

  y += 10;
  doc.setFontSize(48);
  doc.setFont("helvetica", "bold");
  
  // Color score based on value
  const scoreColor = analysis.score >= 75 ? [34, 197, 94] : 
                     analysis.score >= 50 ? [249, 115, 22] : 
                     [239, 68, 68];
  doc.setTextColor(...scoreColor);
  doc.text(`${analysis.score}`, 20, y + 12);
  
  doc.setFontSize(14);
  doc.setTextColor(100, 116, 139);
  doc.text("/ 100", 45, y + 12);

  y += 25;
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  
  const scoreInterpretation = 
    analysis.score >= 80 ? "Excellent - Your resume is highly optimized for ATS" :
    analysis.score >= 60 ? "Good - Your resume is ATS-friendly with room for improvement" :
    analysis.score >= 40 ? "Fair - Consider making improvements for better ATS compatibility" :
    "Poor - Significant improvements needed for ATS compatibility";
  
  doc.text(scoreInterpretation, 20, y);

  y += 15;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  // SKILLS BREAKDOWN
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("Skills Analysis", 20, y);

  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  Object.entries(analysis.skills || {}).forEach(([skill, value]) => {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = 20;
    }

    // Draw skill bar
    const barWidth = 120;
    const barHeight = 4;
    
    doc.setDrawColor(229, 231, 235);
    doc.rect(60, y, barWidth, barHeight);
    
    // Draw filled portion
    const fillWidth = (value / 100) * barWidth;
    doc.setFillColor(98, 154, 199);
    doc.rect(60, y, fillWidth, barHeight, "F");
    
    // Draw skill name and percentage
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`${skill}:`, 20, y + 3);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text(`${value}%`, 190, y + 3);
    
    y += 8;
  });

  y += 8;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  // JOB MATCHES SECTION
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("Best Matching Job Roles", 20, y);

  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  (analysis.jobMatches || []).forEach((role, index) => {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = 20;
    }
    doc.text(`${index + 1}. ${role}`, 24, y);
    y += 7;
  });

  y += 8;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, pageWidth - 20, y);
  y += 10;

  // IMPROVEMENT SUGGESTIONS
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text("Improvement Suggestions", 20, y);

  y += 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  (analysis.suggestions || []).forEach((suggestion, index) => {
    if (y > pageHeight - 30) {
      doc.addPage();
      y = 20;
    }

    const lines = doc.splitTextToSize(suggestion, 160);
    doc.text(`${index + 1}. `, 24, y);
    doc.text(lines, 28, y);
    y += lines.length * 6 + 4;
  });

  // FOOTER
  y += 10;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, pageHeight - 15, pageWidth - 20, pageHeight - 15);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(120, 113, 108);
  doc.text(
    `ATSQuick © 2025 | Report generated on ${new Date().toLocaleDateString()}`,
    20,
    pageHeight - 8
  );

  doc.save("resume-ats-report.pdf");
}