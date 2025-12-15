"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import styles from "./FullScreenLoader.module.css";
import loaderAnimation from "@/assets/lottie/Loader.json";

export default function FullScreenLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.content}>
        <Lottie
          animationData={loaderAnimation}
          loop
          autoplay
          className={styles.lottie}
        />
      </div>
    </div>,
    document.body
  );
}
