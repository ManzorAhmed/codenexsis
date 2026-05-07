'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './Process.module.css';

const steps = [
  {
    n: '01',
    title: 'Discover',
    duration: '1–2 weeks',
    body: 'We dig into your business, users, and existing systems. You leave the kickoff with a full roadmap, fixed scope, and locked price — before any code is written.',
  },
  {
    n: '02',
    title: 'Design & Build',
    duration: '6–14 weeks',
    body: 'Two-week sprints with a dedicated cross-functional team. You see working software in your hands every Friday. No black-box agencies, no theatrical demos.',
  },
  {
    n: '03',
    title: 'Launch',
    duration: '~1 week',
    body: 'We ship to production with full CI/CD, monitoring, and runbooks. Then we hold your hand for thirty days, live, while you onboard real users.',
  },
  {
    n: '04',
    title: 'Scale',
    duration: 'Ongoing',
    body: 'Continuous iteration: features, performance, security. We become your in-house team — at half the cost, with twice the depth.',
  },
];

export default function Process() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.intro}>
            <span className="tag">How we work</span>
            <h2 className={styles.title}>
              A process built on{' '}
              <span className={styles.titleAccent}>predictability.</span>
            </h2>
            <p className={styles.subtitle}>
              No hidden milestones. No surprise invoices. You see progress every
              week — in production code, not in slides.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.timeline}>
          {/* Sticky left */}
          <div className={styles.stickyLeft}>
            <div className={styles.stickyEyebrow}>Engagement model</div>
            <h3 className={styles.stickyHeadline}>
              Four phases. Senior team. Predictable outcome.
            </h3>
            <p className={styles.stickyText}>
              Every Codenexsis engagement follows the same proven structure — so you
              always know what comes next.
            </p>
          </div>

          {/* Scrolling steps */}
          <div className={styles.stepsCol}>
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                className={styles.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <span className={styles.stepIcon} />
                <div className={styles.stepHead}>
                  <span className={styles.stepNum}>{step.n}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <span className={styles.stepDuration}>⌄ {step.duration}</span>
                </div>
                <p className={styles.stepBody}>{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
