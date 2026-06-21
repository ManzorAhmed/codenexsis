'use client';

import { Star } from 'lucide-react';
import { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote:
      'They rebuilt our core platform in 14 weeks — what previous vendors had been promising for two years. Code quality is genuinely best-in-class.',
    author: 'Aisha Khalid',
    role: 'CTO',
    company: 'Meridian Logistics',
  },
  {
    quote:
      'The penetration test report read like an attacker’s playbook. We patched 23 issues we didn’t even know existed. Worth ten times the fee.',
    author: 'James Whitmore',
    role: 'Head of Security',
    company: 'FinNorth Bank',
  },
  {
    quote:
      'Our SaaS went from MVP to enterprise-ready with SSO, audit logs, and SOC 2 readiness in one engagement. We close 3× bigger deals now.',
    author: 'Priya Anand',
    role: 'Founder & CEO',
    company: 'Veridian.app',
  },
];

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.head}>
            <div className={styles.headTag}>
              <span className="tag">Client voices</span>
            </div>
            <h2 className={styles.title}>
              Trusted by teams who can&apos;t{' '}
              <span className={styles.titleAccent}>afford to be wrong.</span>
            </h2>
          </div>
        </ScrollReveal>

        <StaggerReveal className={styles.grid} delay={0.1}>
          {testimonials.map((t) => (
            <StaggerChild key={t.author} className={styles.card}>
              <div className={styles.quoteOpen}>“</div>
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={styles.starIcon} size={13} />
                ))}
              </div>
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <div className={styles.author}>
                <div className={styles.authorName}>{t.author}</div>
                <div className={styles.authorRole}>
                  {t.role}, <span className={styles.authorCompany}>{t.company}</span>
                </div>
              </div>
            </StaggerChild>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
