'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import styles from './About.module.css';

const stats = [
  { v: '40+', l: 'Engineers' },
  { v: '12', l: 'Countries' },
  { v: '$80M+', l: 'Revenue impacted' },
  { v: '4.9★', l: 'Avg rating' },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax: big number floats up slowly as you scroll
  const numY = useTransform(scrollYProgress, [0, 1], [60, -100]);

  return (
    <section ref={ref} className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Number side */}
          <div className={styles.numberSide}>
            <motion.div style={{ y: numY }}>
              <ScrollReveal>
                <div className={styles.bigNum}>
                  120<span className={styles.plus}>+</span>
                </div>
                <div className={styles.numLabel}>Products shipped since 2019</div>
              </ScrollReveal>
            </motion.div>

            <StaggerReveal className={styles.miniStats} delay={0.1}>
              {stats.map((s) => (
                <StaggerChild key={s.l} className={styles.miniStat}>
                  <div className={styles.miniStatValue}>{s.v}</div>
                  <div className={styles.miniStatLabel}>{s.l}</div>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>

          {/* Copy side */}
          <ScrollReveal delay={0.1}>
            <div className={styles.copySide}>
              <div className={styles.copyTag}>
                <span className="tag">Who we are</span>
              </div>
              <h2 className={styles.copyTitle}>
                A senior engineering studio,{' '}
                <span className={styles.copyAccent}>built like a product team.</span>
              </h2>
              <p className={styles.copyBody}>
                Codenexsis was founded in Abu Dhabi in 2019 by senior engineers
                who&apos;d worked at consultancies, product companies, and security
                firms — and watched the same pattern play out everywhere: ambitious
                ideas, overworked teams, production-grade code as the casualty.
              </p>
              <p className={styles.copyBody}>
                We built the studio we wished existed. Senior-only. Fixed-price.
                Weekly demos. Production-grade. Security baked in from architecture,
                not bolted on before launch. Today we&apos;re trusted by Fortune 500s,
                Series-B startups, and government entities.
              </p>
              <Link href="/about" className={styles.copyCTA}>
                Read the full story
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
