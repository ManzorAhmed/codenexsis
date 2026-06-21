'use client';

import Link from 'next/link';
import { categoryLabels, type Service, type ServiceCategory } from '@/lib/services';
import styles from './MegaMenu.module.css';
import { iconByName } from '@/lib/icon-map';

type Props = { open: boolean; services: Service[] };

export default function MegaMenu({ open, services }: Props) {
  const cats: { key: ServiceCategory; num: string }[] = [
    { key: 'build', num: '01' },
    { key: 'secure', num: '02' },
    { key: 'scale', num: '03' },
  ];

  const total = services.filter((s) => s.category !== 'market').length;

  return (
    <div className={`${styles.megaWrap} ${open ? styles.megaWrapOpen : ''}`}>
      <div className={styles.megaPanel}>
        <div className={styles.megaGrid}>
          {cats.map(({ key, num }) => {
            const list = services.filter((s) => s.category === key);
            if (list.length === 0) return null;
            return (
              <div key={key} className={styles.megaColumn}>
                <div className={styles.colHeader}>
                  <span className={styles.colNum}>{num}</span>
                  <span className={styles.colLabel}>{categoryLabels[key].label}</span>
                </div>
                <p className={styles.colSubtitle}>{categoryLabels[key].description}</p>
                <ul className={styles.serviceList}>
                  {list.map((s) => {
                    const Icon = iconByName(s.icon);
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
            {total} disciplines · One senior team · 4-hour response time
          </span>
          <Link href="/services" className={styles.stripLink}>
            View all services →
          </Link>
        </div>
      </div>
    </div>
  );
}
