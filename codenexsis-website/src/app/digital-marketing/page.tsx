import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { marketingGroupLabels, type MarketingGroup } from '@/lib/services';
import { loadServices, marketingOf } from '@/lib/services-data';
import { siteConfig } from '@/config/site';
import PageHero from '@/components/PageHero/PageHero';
import CTA from '@/components/CTA/CTA';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import styles from './digital-marketing.module.css';
import { iconByName } from '@/lib/icon-map';

export const revalidate = 60;

export const metadata = {
  title: 'SEO & Digital Marketing Services in UAE | Codenexsis Technologies',
  description:
    'Full-funnel SEO and digital marketing — search, local & e-commerce SEO, Google Ads, paid social, content, email, CRO, and analytics. Codenexsis grows your demand engine in the UAE and beyond.',
  keywords: [
    'digital marketing agency UAE',
    'digital marketing services Dubai',
    'SEO services UAE',
    'PPC management',
    'social media marketing',
    'content marketing',
    'email marketing automation',
    'conversion rate optimization',
  ],
  alternates: { canonical: '/digital-marketing' },
  openGraph: {
    title: 'SEO & Digital Marketing Services | Codenexsis Technologies',
    description:
      'Search, paid media, content, and analytics engineered to grow demand. A full-funnel digital marketing team in the UAE.',
    url: `${siteConfig.url}/digital-marketing`,
    type: 'website',
  },
};

const groupOrder: MarketingGroup[] = ['seo', 'paid', 'social', 'analytics'];

const promises = [
  { stat: 'Strategy-first', label: 'Every campaign tied to revenue, not vanity metrics' },
  { stat: 'Full-funnel', label: 'From first impression to repeat customer' },
  { stat: 'Transparent', label: 'Live dashboards — you see every dirham at work' },
  { stat: 'Senior team', label: 'No juniors learning on your budget' },
];

const jsonLd = (all: { title: string; slug: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'SEO & Digital Marketing Services',
  url: `${siteConfig.url}/digital-marketing`,
  isPartOf: { '@type': 'WebSite', name: siteConfig.name, url: siteConfig.url },
  about: {
    '@type': 'ItemList',
    itemListElement: all.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: `${siteConfig.url}/services/${s.slug}`,
    })),
  },
});

export default async function DigitalMarketingPage() {
  const all = marketingOf(await loadServices());
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(all)) }}
      />

      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'SEO & Digital Marketing' }]}
        tag="Growth / Marketing"
        title={
          <>
            Demand, engineered.{' '}
            <em style={{ color: 'var(--red-hi)', fontWeight: 400 }}>Growth, measured.</em>
          </>
        }
        subtitle="A complete SEO and digital marketing stack — search, paid media, content, and analytics — built to put your business in front of the people who buy, and prove the return on every channel."
      />

      {/* Promises strip */}
      <section className={styles.promiseSection}>
        <div className="container">
          <StaggerReveal className={styles.promiseGrid} delay={0.06}>
            {promises.map((p) => (
              <StaggerChild key={p.stat}>
                <div className={styles.promiseCard}>
                  <div className={styles.promiseStat}>{p.stat}</div>
                  <p className={styles.promiseLabel}>{p.label}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Grouped services */}
      {groupOrder.map((group) => {
        const items = all.filter((s) => s.group === group);
        if (items.length === 0) return null;
        const meta = marketingGroupLabels[group];
        return (
          <section key={group} className={styles.groupSection}>
            <div className="container">
              <ScrollReveal>
                <div className={styles.groupHeader}>
                  <span className={styles.groupNum}>{meta.num}</span>
                  <div>
                    <h2 className={styles.groupTitle}>{meta.label}</h2>
                    <p className={styles.groupDesc}>{meta.description}</p>
                  </div>
                </div>
              </ScrollReveal>

              <StaggerReveal className={styles.cardGrid} delay={0.06}>
                {items.map((s) => {
                  const Icon = iconByName(s.icon);
                  return (
                    <StaggerChild key={s.slug}>
                      <Link href={`/services/${s.slug}`} className={styles.card}>
                        <div className={styles.cardTop}>
                          <span className={styles.cardIcon}>
                            <Icon size={18} strokeWidth={1.6} />
                          </span>
                          <span className={styles.cardNum}>{s.number}</span>
                        </div>
                        <h3 className={styles.cardTitle}>{s.title}</h3>
                        <p className={styles.cardTagline}>{s.tagline}</p>
                        <p className={styles.cardDescription}>{s.description}</p>
                        <ul className={styles.capList}>
                          {s.capabilities.slice(0, 3).map((c) => (
                            <li key={c}>
                              <Check size={13} strokeWidth={2.4} />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                        <span className={styles.cardLink}>
                          Explore service
                          <ArrowUpRight size={15} />
                        </span>
                      </Link>
                    </StaggerChild>
                  );
                })}
              </StaggerReveal>
            </div>
          </section>
        );
      })}

      <CTA />
    </>
  );
}
