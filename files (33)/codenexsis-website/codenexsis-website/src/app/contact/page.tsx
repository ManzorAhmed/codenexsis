'use client';

import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { services } from '@/lib/services';
import PageHero from '@/components/PageHero/PageHero';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import styles from './contact.module.css';

const faqs = [
  {
    q: 'How much does a typical engagement cost?',
    a: 'Discovery sprints start at $12k. Full builds typically range from $80k–$400k depending on scope. We give you a fixed price after the discovery week, so you never see a surprise invoice.',
  },
  {
    q: 'How long until you can start?',
    a: 'For new engagements we usually have a senior team available within 2–3 weeks. For urgent security work, often within 48 hours.',
  },
  {
    q: 'Do you sign NDAs and DPAs?',
    a: 'Yes — both, gladly. Send yours over with the brief and we\'ll review and sign within one business day.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'About 70% of our work is outside the UAE — primarily UK, EU, US, and APAC. Our team works in your timezone.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        tag="03 / Contact"
        title={
          <>
            Tell us what you&apos;re{' '}
            <em style={{ color: 'var(--red-hi)', fontWeight: 400 }}>working on.</em>
          </>
        }
        subtitle="Real humans, fast replies. Send us the brief — we'll respond within 4 business hours with a clear next step."
      />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <ScrollReveal>
              <div className={styles.infoCol}>
                <div className={styles.infoTag}>
                  <span className="tag">Get in touch</span>
                </div>
                <h2 className={styles.infoTitle}>
                  Four ways to{' '}
                  <span className={styles.infoTitleAccent}>reach us.</span>
                </h2>
                <p className={styles.infoSubtitle}>
                  Pick whatever&apos;s easiest. We respond to all of them within
                  the same business day.
                </p>

                <div className={styles.infoCards}>
                  <a href={`mailto:${siteConfig.contact.email}`} className={styles.infoCard}>
                    <span className={styles.infoCardIcon}>
                      <Mail size={16} strokeWidth={1.6} />
                    </span>
                    <div className={styles.infoCardContent}>
                      <div className={styles.infoCardLabel}>Email</div>
                      <div className={styles.infoCardValue}>{siteConfig.contact.email}</div>
                    </div>
                  </a>
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`} className={styles.infoCard}>
                    <span className={styles.infoCardIcon}>
                      <Phone size={16} strokeWidth={1.6} />
                    </span>
                    <div className={styles.infoCardContent}>
                      <div className={styles.infoCardLabel}>Phone</div>
                      <div className={styles.infoCardValue}>{siteConfig.contact.phone}</div>
                    </div>
                  </a>
                  <div className={styles.infoCard}>
                    <span className={styles.infoCardIcon}>
                      <MapPin size={16} strokeWidth={1.6} />
                    </span>
                    <div className={styles.infoCardContent}>
                      <div className={styles.infoCardLabel}>HQ</div>
                      <div className={styles.infoCardValue}>{siteConfig.contact.address}</div>
                    </div>
                  </div>
                  <div className={styles.infoCard}>
                    <span className={styles.infoCardIcon}>
                      <Clock size={16} strokeWidth={1.6} />
                    </span>
                    <div className={styles.infoCardContent}>
                      <div className={styles.infoCardLabel}>Hours</div>
                      <div className={styles.infoCardValue}>{siteConfig.contact.hours}</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className={styles.formCol}>
                <form
                  className={styles.formGrid}
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thanks — we\'ll be in touch within 4 business hours.');
                  }}
                >
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="name">Name</label>
                      <input id="name" className={styles.input} required />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="email">Email</label>
                      <input id="email" type="email" className={styles.input} required />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="company">Company</label>
                      <input id="company" className={styles.input} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label} htmlFor="budget">Budget</label>
                      <select id="budget" className={styles.select}>
                        <option>Under $50k</option>
                        <option>$50k – $150k</option>
                        <option>$150k – $400k</option>
                        <option>$400k+</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="service">Service</label>
                    <select id="service" className={styles.select}>
                      <option>Choose a service…</option>
                      {services.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.title}</option>
                      ))}
                      <option>Multiple / not sure</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="msg">Project brief</label>
                    <textarea
                      id="msg"
                      className={styles.textarea}
                      rows={5}
                      placeholder="Goals, timeline, constraints, what success looks like…"
                    />
                  </div>

                  <button type="submit" className={`btn btn-primary ${styles.submit}`}>
                    Send brief <ArrowUpRight size={16} />
                  </button>
                  <p className={styles.formNote}>
                    NDA available on request • Avg response &lt; 4 hours
                  </p>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* FAQ */}
          <ScrollReveal>
            <div className={styles.infoTag}>
              <span className="tag">Frequently asked</span>
            </div>
            <h2 className={styles.infoTitle}>
              Questions we&apos;re asked{' '}
              <span className={styles.infoTitleAccent}>most often.</span>
            </h2>
          </ScrollReveal>

          <StaggerReveal className={styles.faqList} delay={0.06}>
            {faqs.map((f) => (
              <StaggerChild key={f.q} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{f.q}</h3>
                <p className={styles.faqA}>{f.a}</p>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>
    </>
  );
}
