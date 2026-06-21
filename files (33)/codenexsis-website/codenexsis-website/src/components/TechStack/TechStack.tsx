'use client';

import { Code2, Server, Smartphone, Cloud, ShieldCheck, Cpu } from 'lucide-react';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import styles from './TechStack.module.css';

const stack = [
  {
    icon: Code2,
    title: 'Frontend',
    subtitle: 'UI / Web platforms',
    items: ['Next.js', 'React', 'TypeScript', 'Vue', 'Tailwind', 'Framer Motion', 'Three.js', 'Sanity'],
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    subtitle: 'Services / data',
    items: ['Node.js', 'Python', 'Go', '.NET', 'PostgreSQL', 'Redis', 'gRPC', 'GraphQL'],
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    subtitle: 'iOS / Android',
    items: ['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'React Native', 'Flutter', 'Expo', 'Firebase'],
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    subtitle: 'Infrastructure',
    items: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'ArgoCD', 'GitHub Actions', 'Datadog'],
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity',
    subtitle: 'Defensive & offensive',
    items: ['Burp Suite Pro', 'Metasploit', 'Crowdstrike', 'Wazuh', 'Okta', 'Vault', 'Nmap', 'OWASP ZAP'],
  },
  {
    icon: Cpu,
    title: 'AI & Automation',
    subtitle: 'Models / pipelines',
    items: ['OpenAI', 'Anthropic Claude', 'LangChain', 'Pinecone', 'pgvector', 'n8n', 'Hugging Face', 'Python'],
  },
];

export default function TechStack() {
  return (
    <section className={styles.section}>
      <div className={styles.bgGlow} />
      <div className="container">
        <ScrollReveal>
          <div className={styles.head}>
            <div>
              <div className={styles.tagBlock}>
                <span className="tag">Technologies</span>
              </div>
              <h2 className={styles.title}>
                The stack behind{' '}
                <span className={styles.titleAccent}>everything we ship.</span>
              </h2>
            </div>
            <p className={styles.subtitle}>
              Battle-tested tooling chosen for longevity, maintainability, and your
              team&apos;s ability to take it over two years from now.
            </p>
          </div>
        </ScrollReveal>

        <StaggerReveal className={styles.categoryGrid} delay={0.08}>
          {stack.map((cat) => {
            const Icon = cat.icon;
            return (
              <StaggerChild key={cat.title} className={styles.category}>
                <div className={styles.catHead}>
                  <span className={styles.catIcon}>
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <div>
                    <div className={styles.catTitle}>{cat.title}</div>
                    <div className={styles.catSubtitle}>{cat.subtitle}</div>
                  </div>
                </div>
                <div className={styles.techList}>
                  {cat.items.map((t) => (
                    <span key={t} className={styles.tech}>{t}</span>
                  ))}
                </div>
              </StaggerChild>
            );
          })}
        </StaggerReveal>

        <ScrollReveal>
          <div className={styles.footerNote}>
            And dozens more — we pick the tool that fits the problem, never the trend{' '}
            <span>·</span> <span>Codenexsis</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
