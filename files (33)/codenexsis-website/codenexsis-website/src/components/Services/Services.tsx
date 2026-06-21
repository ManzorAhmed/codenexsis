'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { type Service } from '@/lib/services';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './Services.module.css';
import { iconByName } from '@/lib/icon-map';

export default function Services({ services }: { services: Service[] }) {
  const coreServices = services;
  return (
    <section className={styles.section} id="services">
      <div className="container">
        <ScrollReveal>
          <div className={styles.headerRow}>
            <div>
              <div className={styles.tagRow}>
                <span className="tag">What we do</span>
              </div>
              <h2 className={styles.title}>
                {coreServices.length} engineering disciplines.{' '}
                <span className={styles.titleAccent}>One senior team.</span>
              </h2>
            </div>
            <Link href="/services" className={styles.viewAll}>
              View all services
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </ScrollReveal>

        <motion.div
          className={styles.serviceList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {coreServices.map((service) => {
            const Icon = iconByName(service.icon);
            return (
              <motion.div
                key={service.slug}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <Link href={`/services/${service.slug}`} className={styles.serviceRow}>
                  <span className={styles.serviceNum}>{service.number}</span>
                  <div className={styles.serviceTitleBlock}>
                    <span className={styles.serviceIcon}>
                      <Icon size={16} strokeWidth={1.6} />
                    </span>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                  </div>
                  <p className={styles.serviceRowDesc}>{service.description}</p>
                  <span className={styles.serviceRowArrow}>
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
