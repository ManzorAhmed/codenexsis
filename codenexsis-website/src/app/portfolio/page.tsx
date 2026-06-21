import PageHero from '@/components/PageHero/PageHero';
import CTA from '@/components/CTA/CTA';
import { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import styles from './portfolio.module.css';

export const metadata = {
  title: 'Portfolio — Selected Work | Codenexsis Technologies',
  description:
    'Selected case studies from Codenexsis Technologies — enterprise platforms, fintech apps, SaaS products, and offensive security engagements.',
  alternates: { canonical: '/portfolio' },
};

const projects = [
  {
    title: 'Meridian Fleet OS',
    client: 'Meridian Logistics — UAE',
    category: 'Enterprise Platform',
    year: '2025',
    centerHead: 'Fleet',
    centerAccent: 'OS.',
    desc: 'Real-time fleet management replacing 4 legacy systems. 1,200+ vehicles, 8 countries, 40% reduction in idle time.',
    meta: ['Next.js', 'PostgreSQL', 'WebSockets', 'AWS'],
  },
  {
    title: 'FinNorth Mobile',
    client: 'FinNorth Bank — Norway',
    category: 'Mobile App',
    year: '2025',
    centerHead: 'FinNorth',
    centerAccent: 'app.',
    desc: 'Native iOS & Android banking app with biometric auth, real-time fraud detection, and 4.8★ store rating.',
    meta: ['Swift', 'Kotlin', 'Biometrics', 'OAuth 2.1'],
  },
  {
    title: 'Veridian SaaS',
    client: 'Veridian.app — USA',
    category: 'SaaS Product',
    year: '2024',
    centerHead: 'Veridian',
    centerAccent: '.app',
    desc: 'Multi-tenant compliance SaaS scaled from MVP to enterprise — SSO, audit logs, SOC 2. 3× ARR within 8 months.',
    meta: ['Next.js', 'Stripe', 'SSO', 'SOC 2'],
  },
  {
    title: 'Atlas Health CRM',
    client: 'Atlas Health Group — KSA',
    category: 'CRM / ERP',
    year: '2024',
    centerHead: 'Atlas',
    centerAccent: 'CRM.',
    desc: 'Custom healthcare CRM serving 23 clinics. Patient pipeline, billing, and HIPAA-equivalent compliance built in.',
    meta: ['React', '.NET', 'SQL Server', 'Power BI'],
  },
  {
    title: 'Helix.ai Copilot',
    client: 'Helix Industries — Germany',
    category: 'AI / Automation',
    year: '2025',
    centerHead: 'Helix',
    centerAccent: '.ai',
    desc: 'Internal AI copilot for engineering teams. RAG over 80k documents, 31% reduction in time-to-answer.',
    meta: ['Anthropic', 'pgvector', 'LangChain', 'Python'],
  },
  {
    title: 'Sentinel Red Team',
    client: 'Confidential — UK Bank',
    category: 'Cybersecurity',
    year: '2025',
    centerHead: 'Red',
    centerAccent: 'Team.',
    desc: 'Six-week adversary emulation across web, cloud, and human layers. 17 critical findings, full remediation playbook.',
    meta: ['OWASP', 'Cobalt Strike', 'AWS', 'Phishing sim'],
  },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Portfolio' }]}
        tag="04 / Portfolio"
        title={
          <>
            Selected work for{' '}
            <em style={{ color: 'var(--red-hi)', fontWeight: 400 }}>serious teams.</em>
          </>
        }
        subtitle="A small selection of recent engagements. Many more under NDA — happy to share specifics on a call."
      />

      <section className={styles.section}>
        <div className="container">
          <StaggerReveal className={styles.grid} delay={0.08}>
            {projects.map((p) => (
              <StaggerChild key={p.title} className={styles.card}>
                <div className={styles.cardVisual}>
                  <div className={styles.cardGrid} />
                  <span className={styles.cardCategory}>{p.category}</span>
                  <span className={styles.cardYear}>{p.year}</span>
                  <div className={styles.cardCenter}>
                    {p.centerHead} <span className={styles.cardCenterAccent}>{p.centerAccent}</span>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <div className={styles.cardClient}>{p.client}</div>
                  <p className={styles.cardDesc}>{p.desc}</p>
                  <div className={styles.cardMeta}>
                    {p.meta.map((m) => (
                      <span key={m} className={styles.cardMetaPill}>{m}</span>
                    ))}
                  </div>
                </div>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
