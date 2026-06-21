'use client';

import { Banknote, ShieldCheck, Truck, Stethoscope, ShoppingBag, Factory, Building2, Plane } from 'lucide-react';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import styles from './Industries.module.css';

const industries = [
  { icon: Banknote, title: 'Finance & Fintech', desc: 'Banking apps, trading platforms, KYC/AML pipelines, PCI compliance.', count: '24 projects' },
  { icon: ShieldCheck, title: 'Government & Defence', desc: 'Secure platforms, ISO 27001, classified network architecture.', count: '8 engagements' },
  { icon: Truck, title: 'Logistics & Mobility', desc: 'Fleet management, real-time tracking, ELD integrations, route optimisation.', count: '17 projects' },
  { icon: Stethoscope, title: 'Healthcare', desc: 'Patient platforms, telehealth, HIPAA-equivalent compliance, integrations.', count: '11 projects' },
  { icon: ShoppingBag, title: 'Retail & E-commerce', desc: 'Headless commerce, omnichannel platforms, POS integrations.', count: '21 projects' },
  { icon: Factory, title: 'Manufacturing & Energy', desc: 'IoT pipelines, ERP integration, predictive maintenance, SCADA.', count: '9 projects' },
  { icon: Building2, title: 'Real Estate & PropTech', desc: 'Listing platforms, tenant portals, smart-building integrations.', count: '14 projects' },
  { icon: Plane, title: 'Travel & Hospitality', desc: 'Booking engines, loyalty platforms, OTA integrations, mobile apps.', count: '12 projects' },
];

export default function Industries() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.head}>
            <div>
              <div className={styles.tagBlock}>
                <span className="tag">Industries we serve</span>
              </div>
              <h2 className={styles.title}>
                Sector experience that{' '}
                <span className={styles.titleAccent}>moves the work along.</span>
              </h2>
            </div>
            <p className={styles.subtitle}>
              We&apos;ve shipped production code in every regulated, technical, and
              high-stakes industry below. Less ramp-up, fewer surprises, faster outcomes.
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className={styles.grid} delay={0.06}>
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <StaggerChild key={ind.title} className={styles.card}>
                <span className={styles.cardIcon}>
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <h3 className={styles.cardTitle}>{ind.title}</h3>
                <p className={styles.cardDesc}>{ind.desc}</p>
                <div className={styles.cardCount}>{ind.count}</div>
              </StaggerChild>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
