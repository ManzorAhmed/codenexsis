import Link from 'next/link';
import { ArrowUpRight, Calendar, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './CTA.module.css';

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.box}>
            <div className={styles.glow} />

            <div className={styles.grid}>
              <div>
                <div className={styles.tag}>
                  <span className="tag">Ready when you are</span>
                </div>
                <h2 className={styles.title}>
                  Let&apos;s build something{' '}
                  <span className={styles.titleAccent}>unforgettable.</span>
                </h2>
                <p className={styles.subtitle}>
                  Tell us what you&apos;re working on. We&apos;ll come back within
                  24 hours with a clear next step.
                </p>
              </div>

              <div className={styles.actions}>
                <Link href="/contact" className={`btn btn-primary ${styles.actionFull}`}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={16} />
                    Book a discovery call
                  </span>
                  <ArrowUpRight size={16} />
                </Link>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className={`btn btn-ghost ${styles.actionFull}`}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={16} />
                    {siteConfig.contact.email}
                  </span>
                  <ArrowUpRight size={16} />
                </a>
                <p className={styles.responseHint}>
                  Avg response &lt; 4 hours, business days
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
