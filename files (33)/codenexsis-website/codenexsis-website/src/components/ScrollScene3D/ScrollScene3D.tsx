'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import styles from './ScrollScene3D.module.css';

const ScrollScene3DCanvas = dynamic(() => import('./ScrollScene3DCanvas'), {
  ssr: false,
  loading: () => null,
});

const phases = [
  {
    label: 'Build · Phase 01',
    headline: 'We engineer software',
    accent: 'that earns its keep.',
    body: 'Custom platforms, mobile apps, web products, CRM and ERP. Senior engineers, weekly demos, fixed scope, production-grade from the first commit.',
    callouts: [
      'Architecture, APIs, and full-stack delivery',
      'Mobile (iOS, Android, cross-platform)',
      'Web platforms, CRM/ERP, SaaS products',
    ],
  },
  {
    label: 'Secure · Phase 02',
    headline: 'We harden what runs',
    accent: 'your business.',
    body: 'Cybersecurity audits, penetration testing, SOC monitoring, IT setup and managed networks. Security baked into architecture — not bolted on at launch.',
    callouts: [
      'Cybersecurity audits & ISO 27001 / SOC 2',
      'Offensive penetration testing',
      'IT setup, networking, & 24/7 helpdesk',
    ],
  },
  {
    label: 'Scale · Phase 03',
    headline: 'We make it grow',
    accent: 'without breaking.',
    body: 'Cloud architecture on AWS, Azure, GCP. DevOps automation, observability, and AI features that move metrics. Built to compound.',
    callouts: [
      'Cloud & DevOps (AWS, Azure, GCP)',
      'Kubernetes, Terraform, CI/CD pipelines',
      'AI integrations & intelligent automation',
    ],
  },
];

export default function ScrollScene3D() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Phase 0: 0 → 0.33,  Phase 1: 0.33 → 0.66,  Phase 2: 0.66 → 1
  const phase0Opacity = useTransform(scrollYProgress, [0, 0.02, 0.30, 0.36], [1, 1, 1, 0]);
  const phase1Opacity = useTransform(scrollYProgress, [0.30, 0.36, 0.62, 0.68], [0, 1, 1, 0]);
  const phase2Opacity = useTransform(scrollYProgress, [0.62, 0.68, 1.0], [0, 1, 1]);

  // For phase indicators
  const phase0Active = useTransform(scrollYProgress, (v) => v < 0.34);
  const phase1Active = useTransform(scrollYProgress, (v) => v >= 0.34 && v < 0.67);
  const phase2Active = useTransform(scrollYProgress, (v) => v >= 0.67);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.sticky}>
        <div className={styles.gridBg} />

        {/* 3D Canvas */}
        <div className={styles.canvas}>
          <ScrollScene3DCanvas progress={scrollYProgress} />
        </div>
        <div className={styles.canvasFade} />

        {/* Content overlay */}
        <div className="container">
          <div className={styles.content}>
            <div className={styles.contentInner}>
              {/* Phase pills - fixed display, but active state changes */}
              <PhasePills
                phase0={phase0Active}
                phase1={phase1Active}
                phase2={phase2Active}
              />

              {/* Stacked phases - cross-fade */}
              <div className={styles.phaseStack} style={{ minHeight: '380px' }}>
                {/* Phase 0 - Build */}
                <motion.div className={`${styles.phase} ${styles.phase0}`} style={{ opacity: phase0Opacity }}>
                  <div className={styles.label}>{phases[0].label}</div>
                  <h2 className={styles.headline}>
                    {phases[0].headline}{' '}
                    <span className={styles.headlineAccent}>{phases[0].accent}</span>
                  </h2>
                  <p className={styles.body}>{phases[0].body}</p>
                  <ul className={styles.calloutList}>
                    {phases[0].callouts.map((c) => (
                      <li key={c} className={styles.callout}>
                        <span className={styles.calloutDot} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Phase 1 - Secure */}
                <motion.div className={`${styles.phase} ${styles.phase1}`} style={{ opacity: phase1Opacity }}>
                  <div className={styles.label}>{phases[1].label}</div>
                  <h2 className={styles.headline}>
                    {phases[1].headline}{' '}
                    <span className={styles.headlineAccent}>{phases[1].accent}</span>
                  </h2>
                  <p className={styles.body}>{phases[1].body}</p>
                  <ul className={styles.calloutList}>
                    {phases[1].callouts.map((c) => (
                      <li key={c} className={styles.callout}>
                        <span className={styles.calloutDot} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Phase 2 - Scale */}
                <motion.div className={`${styles.phase} ${styles.phase2}`} style={{ opacity: phase2Opacity }}>
                  <div className={styles.label}>{phases[2].label}</div>
                  <h2 className={styles.headline}>
                    {phases[2].headline}{' '}
                    <span className={styles.headlineAccent}>{phases[2].accent}</span>
                  </h2>
                  <p className={styles.body}>{phases[2].body}</p>
                  <ul className={styles.calloutList}>
                    {phases[2].callouts.map((c) => (
                      <li key={c} className={styles.callout}>
                        <span className={styles.calloutDot} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhasePills({
  phase0, phase1, phase2,
}: {
  phase0: MotionValue<boolean>;
  phase1: MotionValue<boolean>;
  phase2: MotionValue<boolean>;
}) {
  return (
    <div className={styles.phaseRow}>
      <PhasePill active={phase0} label="01 — Build" />
      <PhasePill active={phase1} label="02 — Secure" />
      <PhasePill active={phase2} label="03 — Scale" />
    </div>
  );
}

function PhasePill({ active, label }: { active: MotionValue<boolean>; label: string }) {
  const opacity = useTransform(active, (v) => (v ? 1 : 0.55));
  const borderColor = useTransform(active, (v) => (v ? '#ef2b3d' : 'rgba(255,255,255,0.12)'));
  const bg = useTransform(active, (v) => (v ? 'rgba(239,43,61,0.06)' : 'transparent'));
  const color = useTransform(active, (v) => (v ? '#ff4258' : '#74747f'));
  return (
    <motion.span
      className={styles.phasePill}
      style={{ opacity, borderColor, background: bg, color }}
    >
      {label}
    </motion.span>
  );
}
