'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import {
  marketingGroupLabels,
  type Service,
  type MarketingGroup,
} from '@/lib/services';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './MarketingServices.module.css';
import { iconByName } from '@/lib/icon-map';

const groupOrder: MarketingGroup[] = ['seo', 'paid', 'social', 'analytics'];

export default function MarketingServices({ services }: { services: Service[] }) {
  const marketing = services;
  return (
    <section className={styles.section} id="seo-marketing">
      <div className={styles.bg} aria-hidden>
        <div className={styles.glow} />
      </div>

      <div className="container">
        <ScrollReveal>
          <div className={styles.headerRow}>
            <div>
              <div className={styles.tagRow}>
                <span className="tag">Get found · Get leads</span>
              </div>
              <h2 className={styles.title}>
                SEO &amp; Digital Marketing{' '}
                <span className={styles.titleAccent}>that compounds.</span>
              </h2>
              <p className={styles.subtitle}>
                Engineering gets you a great product. Marketing gets it in front of the
                people who pay for it. From search rankings to paid media, content, and
                analytics — we build the demand engine around your business.
              </p>
            </div>
            <Link href="/digital-marketing" className={styles.viewAll}>
              Explore digital marketing
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </ScrollReveal>

        <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {groupOrder.map((group) => {
            const items = marketing.filter((s) => s.group === group);
            if (items.length === 0) return null;
            const meta = marketingGroupLabels[group];
            return (
              <motion.div
                key={group}
                className={styles.card}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardNum}>{meta.num}</span>
                  <h3 className={styles.cardLabel}>{meta.label}</h3>
                </div>
                <p className={styles.cardDesc}>{meta.description}</p>
                <ul className={styles.serviceList}>
                  {items.map((s) => {
                    const Icon = iconByName(s.icon);
                    return (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className={styles.serviceLink}>
                          <span className={styles.serviceIcon}>
                            <Icon size={14} strokeWidth={1.7} />
                          </span>
                          <span className={styles.serviceName}>{s.shortTitle}</span>
                          <ArrowUpRight size={14} className={styles.serviceArrow} />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
