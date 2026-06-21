'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Database, Cpu, Lock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal';
import styles from './AIServices.module.css';

const AICoreScene = dynamic(() => import('./AICoreScene'), {
  ssr: false,
  loading: () => null,
});

const pillars = [
  {
    icon: Database,
    title: 'Trained on your data',
    body: 'Models learn from your proprietary data — labelled, cleaned, and engineered in-house.',
  },
  {
    icon: Lock,
    title: 'No third-party APIs',
    body: 'No OpenAI, no external endpoints. Your data never leaves infrastructure you control.',
  },
  {
    icon: Cpu,
    title: 'You own the weights',
    body: 'We hand over the trained model, pipeline, and deployment — yours to keep and retrain.',
  },
  {
    icon: ShieldCheck,
    title: 'Private deployment',
    body: 'Run on-prem or in your own VPC, with guardrails, monitoring, and full audit trails.',
  },
];

const stages = ['Data', 'Train', 'Evaluate', 'Deploy', 'Monitor'];

export default function AIServices() {
  return (
    <section className={styles.section} id="ai-services">
      <div className={styles.glow} aria-hidden />
      <div className="container">
        <div className={styles.layout}>
          {/* Left: copy */}
          <div className={styles.copy}>
            <ScrollReveal>
              <div className={styles.tagRow}>
                <span className="tag">Proprietary AI</span>
                <span className={styles.tagNote}>Built in-house</span>
              </div>
              <h2 className={styles.title}>
                We build the AI.{' '}
                <span className={styles.titleAccent}>Not a wrapper around someone else&apos;s.</span>
              </h2>
              <p className={styles.subtitle}>
                Most &ldquo;AI&rdquo; products are thin layers over a third-party API — your data
                leaves your walls and your roadmap depends on a vendor. We do the opposite:
                we design, train, and deploy automation systems on{' '}
                <strong className={styles.strong}>your own data</strong>, running on
                infrastructure <strong className={styles.strong}>you control</strong>.
              </p>
            </ScrollReveal>

            {/* Pipeline strip */}
            <ScrollReveal delay={0.1}>
              <div className={styles.pipeline} role="list" aria-label="Our ML lifecycle">
                {stages.map((s, i) => (
                  <span className={styles.stage} role="listitem" key={s}>
                    <span className={styles.stageDot} />
                    {s}
                    {i < stages.length - 1 && <span className={styles.stageArrow}>→</span>}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Pillars */}
            <motion.div
              className={styles.pillars}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={p.title}
                    className={styles.pillar}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  >
                    <span className={styles.pillarIcon}>
                      <Icon size={16} strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className={styles.pillarTitle}>{p.title}</h3>
                      <p className={styles.pillarBody}>{p.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <ScrollReveal delay={0.15}>
              <div className={styles.actions}>
                <Link href="/services/ai-services" className="btn btn-primary">
                  Explore AI Services
                  <ArrowUpRight size={14} />
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Talk to an ML engineer
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: 3D core */}
          <div className={styles.visual}>
            <div className={styles.sceneWrap}>
              <AICoreScene />
            </div>
            <div className={styles.visualCaption}>
              <span className={styles.visualLabel}>Live model core</span>
              <span className={styles.visualSub}>training · inference · guardrails</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
