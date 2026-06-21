'use client';

import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './SoftwareShowcase.module.css';

const SoftwareShowcaseScene = dynamic(() => import('./SoftwareShowcaseScene'), {
  ssr: false,
  loading: () => null,
});

const tiers = [
  {
    n: '01',
    title: 'Presentation tier',
    desc: 'Web platforms, dashboards, admin consoles, and customer-facing apps — built with Next.js, React, and TypeScript.',
  },
  {
    n: '02',
    title: 'Business logic tier',
    desc: 'Microservices, APIs, workflows, and event-driven systems — engineered in Node.js, Go, Python, or .NET.',
  },
  {
    n: '03',
    title: 'Data tier',
    desc: 'PostgreSQL, Redis, vector databases, ETL pipelines — designed for scale, reliability, and observability.',
  },
];

const tech = ['Next.js', 'Node.js', 'TypeScript', 'Python', 'Go', '.NET', 'PostgreSQL', 'Redis', 'Kubernetes', 'AWS', 'Terraform'];

export default function SoftwareShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.bgGlow} />
      <div className="container">
        <div className={styles.grid}>
          {/* 3D scene first (left on desktop) */}
          <ScrollReveal>
            <div className={styles.scene}>
              <SoftwareShowcaseScene />
            </div>
          </ScrollReveal>

          {/* Copy */}
          <ScrollReveal delay={0.15}>
            <div className={styles.copy}>
              <div className={styles.tagBlock}>
                <span className="tag">Custom Software Engineering</span>
              </div>
              <h2 className={styles.title}>
                Software, architected to{' '}
                <span className={styles.titleAccent}>outlast its first sprint.</span>
              </h2>
              <p className={styles.body}>
                Every system we ship is engineered in three tiers — clean separation, observable
                everywhere, and built to be picked up by your team two years from now.
              </p>

              <div className={styles.tierList}>
                {tiers.map((tier) => (
                  <div key={tier.n} className={styles.tier}>
                    <span className={styles.tierNum}>{tier.n}</span>
                    <span className={styles.tierTitle}>{tier.title}</span>
                    <span className={styles.tierDesc}>{tier.desc}</span>
                  </div>
                ))}
              </div>

              <div className={styles.techRow}>
                {tech.map((t) => (
                  <span key={t} className={styles.techBadge}>{t}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
