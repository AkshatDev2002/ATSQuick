"use client";

import { useState, useCallback } from "react";
import styles from "./UploadBox.module.css";
import { analyzeResume } from "@/services/analyzeService";
import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";

export default function UploadBox() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }
    setFile(selectedFile);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  }, []);

  return (
    <>
      {loading && (
        <FullScreenLoader text="Analyzing your resume…" />
      )}

      <div
        className={`${styles.box} ${isDragging ? styles.dragActive : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
      >
        <input
          type="file"
          accept="application/pdf"
          id="resume-upload"
          className={styles.hiddenInput}
          onChange={(e) => handleFile(e.target.files[0])}
        />

        <label htmlFor="resume-upload" className={styles.dropZone}>
          {file ? (
            <span className={styles.fileName}>📄 {file.name}</span>
          ) : (
            <>
              <span className={styles.primaryText}>
                Drag & drop your resume here
              </span>
              <span className={styles.subText}>
                or click to upload (PDF only)
              </span>
            </>
          )}
        </label>

        <button
          className={styles.button}
          disabled={loading}
          onClick={async () => {
            if (!file) return alert("Please upload a resume");

            try {
              setLoading(true);
              const data = await analyzeResume(file);
              localStorage.setItem("analysis", JSON.stringify(data));
              window.location.href = "/dashboard";
            } catch (err) {
              console.error(err);
              alert("Our system is currently experiencing high demand and is temporarily overloaded. Please try your request again shortly.");
              setLoading(false);
            }
          }}
        >
          Analyze Resume
        </button>
      </div>
    </>
  );
}
