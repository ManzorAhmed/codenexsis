'use client';

import Link from 'next/link';
import {
  marketingGroupLabels,
  type Service,
  type MarketingGroup,
} from '@/lib/services';
import styles from './MegaMenu.module.css';
import { iconByName } from '@/lib/icon-map';

type Props = { open: boolean; services: Service[] };

const groupOrder: MarketingGroup[] = ['seo', 'paid', 'social', 'analytics'];

export default function MarketingMegaMenu({ open, services }: Props) {
  const marketing = services.filter((s) => s.category === 'market');

  return (
    <div className={`${styles.megaWrap} ${styles.megaWrapWide} ${open ? styles.megaWrapOpen : ''}`}>
      <div className={styles.megaPanel}>
        <div className={`${styles.megaGrid} ${styles.megaGrid4}`}>
          {groupOrder.map((group) => {
            const items = marketing.filter((s) => s.group === group);
            if (items.length === 0) return null;
            const meta = marketingGroupLabels[group];
            return (
              <div key={group} className={styles.megaColumn}>
                <div className={styles.colHeader}>
                  <span className={styles.colNum}>{meta.num}</span>
                  <span className={styles.colLabel}>{meta.label}</span>
                </div>
                <p className={styles.colSubtitle}>{meta.description}</p>
                <ul className={styles.serviceList}>
                  {items.map((s) => {
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
            {marketing.length} SEO &amp; marketing services · Strategy · Execution · Reporting
          </span>
          <Link href="/digital-marketing" className={styles.stripLink}>
            View all marketing services →
          </Link>
        </div>
      </div>
    </div>
  );
}
