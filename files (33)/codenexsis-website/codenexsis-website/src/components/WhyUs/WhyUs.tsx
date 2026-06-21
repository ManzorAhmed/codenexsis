'use client';

import { Award, Layers, Calendar, Lock, FileCheck, Headphones } from 'lucide-react';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import styles from './WhyUs.module.css';

const reasons = [
  {
    n: '01',
    icon: Award,
    title: 'Senior-only delivery',
    desc: 'No juniors hidden behind your account manager. Every engineer on your team has 7+ years shipping production at scale.',
  },
  {
    n: '02',
    icon: Layers,
    title: 'One stack, four disciplines',
    desc: 'Software, security, IT, and cloud — all from the same senior team. No vendor stitching. No hand-offs that drop on the floor.',
  },
  {
    n: '03',
    icon: Calendar,
    title: 'Fixed scope, weekly demos',
    desc: 'You see real working software every Friday. No black-box agencies. No theatrical mid-project surprise invoices.',
  },
  {
    n: '04',
    icon: Lock,
    title: 'Security baked in, not bolted on',
    desc: 'Threat modelling on day one. ISO 27001 / SOC 2 readiness, IAM, and 24/7 SOC monitoring as part of the platform — not an afterthought.',
  },
  {
    n: '05',
    icon: FileCheck,
    title: 'NDA & DPA friendly',
    desc: 'Send yours over with the brief. We review and sign within one business day. Public sector and Fortune 500 clients welcome.',
  },
  {
    n: '06',
    icon: Headphones,
    title: '24/7 support that picks up',
    desc: 'Production incidents get an engineer on the line, not a ticket queue. Average response time under 4 minutes for P1.',
  },
];

export default function WhyUs() {
  return (
    <section className={styles.section}>
      <div className="container">
        <ScrollReveal>
          <div className={styles.head}>
            <div>
              <div className={styles.tagBlock}>
                <span className="tag">Why Codenexsis</span>
              </div>
              <h2 className={styles.title}>
                The studio model, executed{' '}
                <span className={styles.titleAccent}>like a product team.</span>
              </h2>
            </div>
            <p className={styles.subtitle}>
              Six reasons clients keep us through their next three projects — and
              hand us the next ones their internal teams couldn&apos;t crack.
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className={styles.grid} delay={0.06}>
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <StaggerChild key={r.n} className={styles.card}>
                <span className={styles.cardNum}>{r.n}</span>
                <span className={styles.cardIcon}>
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <h3 className={styles.cardTitle}>{r.title}</h3>
                <p className={styles.cardDesc}>{r.desc}</p>
              </StaggerChild>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
}
