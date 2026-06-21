import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categoryLabels } from '@/lib/services';
import { loadServices } from '@/lib/services-data';
import { siteConfig } from '@/config/site';
import PageHero from '@/components/PageHero/PageHero';
import CTA from '@/components/CTA/CTA';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import styles from './services.module.css';
import { iconByName } from '@/lib/icon-map';

export const revalidate = 60;

export const metadata = {
  title: 'Services — Custom Software, Cybersecurity, SaaS, AI',
  description:
    'Codenexsis Technologies services — custom software, CRM/ERP, mobile apps, SaaS, cybersecurity, penetration testing, web development, and AI/automation.',
  alternates: { canonical: '/services' },
};

export default async function ServicesPage() {
  const services = await loadServices();

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${siteConfig.name} Services`,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      url: `${siteConfig.url}/services/${s.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <PageHero
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
        tag="01 / Services"
        title={
          <>
            Built for the work that{' '}
            <em style={{ color: 'var(--red-hi)', fontWeight: 400 }}>matters most.</em>
          </>
        }
        subtitle="From engineering to growth — software, security, cloud, AI, and a full SEO & digital marketing stack. One senior team, one shared definition of done: we engineer outcomes, then we grow them."
      />

      <section>
        <div className="container">
          <StaggerReveal className={styles.list} delay={0.06}>
            {services.map((service) => {
              const Icon = iconByName(service.icon);
              return (
                <StaggerChild key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={styles.row}>
                    <span className={styles.rowNum}>{service.number}</span>
                    <div className={styles.rowTitleBlock}>
                      <span className={styles.rowIcon}>
                        <Icon size={18} strokeWidth={1.6} />
                      </span>
                      <div>
                        <h3 className={styles.rowTitle}>{service.title}</h3>
                        <div className={styles.rowSubtitle}>
                          {categoryLabels[service.category].label}
                        </div>
                      </div>
                    </div>
                    <p className={styles.rowDesc}>{service.tagline}</p>
                    <span className={styles.rowArrow}>
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                </StaggerChild>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
