"use client";
import { useEffect, useState } from "react";
import styles from "./PageLoader.module.css";

export default function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 600);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`${styles.loader} ${fadeOut ? styles.fadeOut : ""}`}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <img src="/logo.png" alt="CodeNexsis" className={styles.logo} />
        </div>
        <div className={styles.barTrack}>
          <div className={styles.barFill} />
        </div>
        <p className={styles.tagline}>Building your experience...</p>
      </div>
    </div>
  );
}