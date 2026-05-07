'use client';

import Link from 'next/link';
import { servicesByCategory, categoryLabels } from '@/lib/services';
import styles from './MegaMenu.module.css';

type Props = { open: boolean };

export default function MegaMenu({ open }: Props) {
  const cats: { key: 'build' | 'secure' | 'scale'; num: string }[] = [
    { key: 'build', num: '01' },
    { key: 'secure', num: '02' },
    { key: 'scale', num: '03' },
  ];

  return (
    <div className={`${styles.megaWrap} ${open ? styles.megaWrapOpen : ''}`}>
      <div className={styles.megaPanel}>
        <div className={styles.megaGrid}>
          {cats.map(({ key, num }) => {
            const services = servicesByCategory(key);
            return (
              <div key={key} className={styles.megaColumn}>
                <div className={styles.colHeader}>
                  <span className={styles.colNum}>{num}</span>
                  <span className={styles.colLabel}>{categoryLabels[key].label}</span>
                </div>
                <p className={styles.colSubtitle}>{categoryLabels[key].description}</p>
                <ul className={styles.serviceList}>
                  {services.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className={styles.serviceLink}>
                          <span className={styles.serviceIconBox}>
                            <Icon size={14} strokeWidth={1.6} />
                          </span>
                          <span className={styles.serviceText}>
                            <span className={styles.serviceTitle}>{s.shortTitle}</span>
                            <span className={styles.serviceDesc}>{s.tagline}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div className={styles.bottomStrip}>
          <span className={styles.stripText}>
            10 disciplines · One senior team · 4-hour response time
          </span>
          <Link href="/services" className={styles.stripLink}>
            View all services →
          </Link>
        </div>
      </div>
    </div>
  );
}
