'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './Manifesto.module.css';

const text =
  "We don't ship features. We ship the platforms ambitious teams quietly bet their business on. Built right. Built secure. Built once.";

const accentWords = ['platforms', 'business', 'right.', 'secure.', 'once.'];

function ManifestoWord({
  word,
  start,
  end,
  isAccent,
  progress,
}: {
  word: string;
  start: number;
  end: number;
  isAccent: boolean;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  return (
    <motion.span
      className={`${styles.word} ${isAccent ? styles.wordAccent : ''}`}
      style={{ opacity }}
    >
      {word}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const words = text.split(' ');
  // Word reveal happens between scrollProgress 0.15 and 0.75
  const revealStart = 0.15;
  const revealEnd = 0.75;
  const span = revealEnd - revealStart;
  const step = span / words.length;

  return (
    <section ref={ref} className={styles.manifesto}>
      <div className={styles.sticky}>
        <div className={styles.glow} />
        <div className="container">
          <div className={styles.label}>Manifesto / 01</div>
          <p className={styles.text}>
            {words.map((word, i) => {
              const start = revealStart + i * step;
              const end = start + step * 1.4;
              const cleaned = word.replace(/[.,]/g, '').toLowerCase();
              const isAccent = accentWords.some((a) =>
                a.replace(/[.,]/g, '').toLowerCase() === cleaned,
              );
              return (
                <ManifestoWord
                  key={i}
                  word={word}
                  start={start}
                  end={end}
                  isAccent={isAccent}
                  progress={smoothProgress}
                />
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
