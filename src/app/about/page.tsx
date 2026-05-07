import { Award, Users, Globe2, ShieldCheck } from 'lucide-react';
import PageHero from '@/components/PageHero/PageHero';
import CTA from '@/components/CTA/CTA';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import styles from './about.module.css';

export const metadata = {
  title: 'About Codenexsis Technologies — Senior Engineering Studio',
  description:
    'Codenexsis Technologies is a senior engineering studio in Abu Dhabi specialising in custom software, cybersecurity, SaaS, and AI for ambitious teams worldwide.',
  alternates: { canonical: '/about' },
};

const values = [
  {
    icon: Award,
    title: 'Senior-only',
    desc: 'No juniors hidden behind your account manager. Every engineer on your team has shipped real products at scale.',
  },
  {
    icon: Users,
    title: 'Embedded',
    desc: 'We don\'t throw work over the wall. We sit in your Slack, your standups, your roadmap meetings.',
  },
  {
    icon: Globe2,
    title: 'Global team',
    desc: 'Engineers across 12 countries, headquartered in Abu Dhabi. Coverage where you work, when you work.',
  },
  {
    icon: ShieldCheck,
    title: 'Security-first',
    desc: 'Threat modelling on day one, not before launch. Security is architecture, not a checklist.',
  },
];

const timeline = [
  {
    year: '2019',
    title: 'Founded in Abu Dhabi',
    desc: 'Three engineers from Big Four consultancies and product companies set out to build the studio they wished existed.',
  },
  {
    year: '2021',
    title: 'First Fortune 500 client',
    desc: 'Shipped a logistics platform processing $400M+ annually. Cemented our enterprise practice.',
  },
  {
    year: '2023',
    title: 'Cybersecurity practice launched',
    desc: 'Added offensive security and red team services after one too many clients learned the hard way.',
  },
  {
    year: '2024',
    title: 'AI & automation division',
    desc: 'LLMs grew up. We built a practice to deploy them where they actually move metrics.',
  },
  {
    year: '2026',
    title: '40+ engineers, 120+ products shipped',
    desc: 'Today we serve clients across MENA, Europe, North America, and APAC — with the same fixed-scope, weekly-demo discipline.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        tag="02 / About"
        title={
          <>
            We are{' '}
            <em style={{ color: 'var(--red-hi)', fontWeight: 400 }}>Codenexsis.</em>
            <br />A senior studio for serious software.
          </>
        }
        subtitle="We're a global team of senior engineers, security practitioners, and product designers — headquartered in Abu Dhabi, embedded with clients on four continents."
      />

      <section className={styles.section}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.intro}>
              <div className={styles.tagBlock}>
                <span className="tag">Our story</span>
              </div>
              <h2 className={styles.title}>
                Built by engineers who got tired of{' '}
                <span className={styles.titleAccent}>shipping mediocre software.</span>
              </h2>
              <p className={styles.body}>
                Codenexsis was founded in 2019 in Abu Dhabi by three engineers
                who&apos;d worked at top-tier consultancies and product companies — and
                kept watching the same pattern: ambitious clients, overworked teams,
                and software that quietly accumulated technical debt until it
                couldn&apos;t move anymore.
              </p>
              <p className={styles.body}>
                We started Codenexsis with a different model. Senior-only. Fixed-price.
                Weekly demos. Production-grade from the first commit. Today we&apos;re
                a global team of 40+ shipping the platforms that ambitious companies
                bet their business on.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.tagBlock}>
              <span className="tag">What we believe</span>
            </div>
          </ScrollReveal>

          <StaggerReveal className={styles.valuesGrid} delay={0.08}>
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerChild key={v.title} className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <Icon size={18} strokeWidth={1.6} />
                  </div>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </StaggerChild>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.intro}>
              <div className={styles.tagBlock}>
                <span className="tag">Timeline</span>
              </div>
              <h2 className={styles.title}>
                A short history of{' '}
                <span className={styles.titleAccent}>Codenexsis.</span>
              </h2>
            </div>
          </ScrollReveal>
          <StaggerReveal className={styles.tlList} delay={0.08}>
            {timeline.map((t) => (
              <StaggerChild key={t.year} className={styles.tlRow}>
                <span className={styles.tlYear}>{t.year}</span>
                <div className={styles.tlContent}>
                  <h3 className={styles.tlTitle}>{t.title}</h3>
                  <p className={styles.tlDesc}>{t.desc}</p>
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
