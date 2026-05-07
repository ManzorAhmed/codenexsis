'use client';

import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './MobileShowcase.module.css';

const MobileShowcaseScene = dynamic(() => import('./MobileShowcaseScene'), {
  ssr: false,
  loading: () => null,
});

const capabilities = [
  'Native iOS (Swift, SwiftUI)',
  'Native Android (Kotlin, Compose)',
  'Cross-platform (Flutter, React Native)',
  'Offline-first sync architecture',
  'Push notifications & deep linking',
  'App Store & Play Store launch',
];

const stats = [
  { v: '38', a: '+', l: 'Apps shipped' },
  { v: '4.7', a: '★', l: 'Avg store rating' },
  { v: '12', a: 'M+', l: 'App downloads' },
];

export default function MobileShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.bgGlow} />
      <div className="container">
        <div className={styles.grid}>
          {/* Copy side */}
          <ScrollReveal>
            <div className={styles.copy}>
              <div className={styles.tagBlock}>
                <span className="tag">Mobile Application Development</span>
              </div>
              <h2 className={styles.title}>
                Mobile apps engineered{' '}
                <span className={styles.titleAccent}>like products, not projects.</span>
              </h2>
              <p className={styles.body}>
                Native-grade performance on iOS and Android. Cross-platform when it makes sense.
                Apps your users open every day — and your team can ship updates to in hours, not weeks.
              </p>

              <ul className={styles.capList}>
                {capabilities.map((c) => (
                  <li key={c} className={styles.capItem}>
                    <span className={styles.capDot} />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.statsRow}>
                {stats.map((s) => (
                  <div key={s.l} className={styles.stat}>
                    <div className={styles.statValue}>
                      {s.v}
                      <span className={styles.statValueAccent}>{s.a}</span>
                    </div>
                    <div className={styles.statLabel}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 3D scene */}
          <ScrollReveal delay={0.15}>
            <div className={styles.scene}>
              <MobileShowcaseScene />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
