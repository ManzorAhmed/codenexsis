'use client';

import { motion } from 'framer-motion';
import styles from './TrustBar.module.css';

const partners = [
  'Meridian',
  'FinNorth',
  'Veridian',
  'Atlas Health',
  'Helix.ai',
  'Sentinel',
];

export default function TrustBar() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          Trusted by Fortune 500s, Series-B startups, and government entities
        </motion.div>
        <motion.div
          className={styles.logosRow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {partners.map((p) => (
            <motion.span
              key={p}
              className={styles.logoItem}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <span className={styles.logoDot} />
              {p}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
