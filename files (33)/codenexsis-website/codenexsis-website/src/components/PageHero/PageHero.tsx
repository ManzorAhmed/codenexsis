'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './PageHero.module.css';

type Crumb = { label: string; href?: string };

type Props = {
  tag: string;
  title: ReactNode;
  subtitle?: string;
  crumbs?: Crumb[];
};

export default function PageHero({ tag, title, subtitle, crumbs }: Props) {
  return (
    <section className={styles.pageHero}>
      <div className={styles.bg}>
        <div className="grid-fade" />
        <div className={styles.glow} />
      </div>
      <div className={`container ${styles.inner}`}>
        {crumbs && crumbs.length > 0 && (
          <motion.nav
            className={styles.crumbs}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {crumbs.map((c, i) => (
              <span key={i}>
                {c.href ? (
                  <Link href={c.href} className={styles.crumbLink}>
                    {c.label}
                  </Link>
                ) : (
                  <span className={styles.crumbCurrent}>{c.label}</span>
                )}
                {i < crumbs.length - 1 && <span style={{ margin: '0 0.4rem' }}>/</span>}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.div
          className={styles.tagBlock}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <span className="tag">{tag}</span>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
