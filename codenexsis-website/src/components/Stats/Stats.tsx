'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './Stats.module.css';

type Stat = {
  num: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub?: string;
  decimals?: number;
};

const stats: Stat[] = [
  { num: 120, suffix: '+', label: 'Products shipped', sub: 'Since 2019' },
  { num: 40, suffix: '+', label: 'Senior engineers', sub: 'In-house team' },
  { num: 12, label: 'Countries served', sub: 'MENA, EU, US, APAC' },
  { num: 99.9, suffix: '%', label: 'Uptime SLA', sub: 'Production platforms', decimals: 1 },
  { num: 24, suffix: '/7', label: 'SOC monitoring', sub: 'Security operations' },
  { num: 4.9, suffix: '★', label: 'Average rating', sub: 'Across all clients', decimals: 1 },
];

function CountUp({ to, decimals = 0, durationMs = 900 }: { to: number; decimals?: number; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    const tick = (t: number) => {
      const e = Math.min(1, (t - start) / durationMs);
      // ease out cubic
      const eased = 1 - Math.pow(1 - e, 3);
      setVal(eased * to);
      if (e < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, durationMs]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  return <span ref={ref}>{display}</span>;
}

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className={styles.bgGrid} />
      <div className="container">
        <ScrollReveal>
          <div className={styles.head}>
            <div className={styles.tagBlock}>
              <span className="tag">By the numbers</span>
            </div>
            <h2 className={styles.title}>
              Six years.{' '}
              <span className={styles.titleAccent}>Real outcomes.</span>
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className={styles.cell}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <div className={styles.cellNum}>
                {s.prefix && <span className={styles.cellSuffix}>{s.prefix}</span>}
                <CountUp to={s.num} decimals={s.decimals} />
                {s.suffix && <span className={styles.cellSuffix}>{s.suffix}</span>}
              </div>
              <div className={styles.cellLabel}>{s.label}</div>
              {s.sub && <div className={styles.cellSub}>{s.sub}</div>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
