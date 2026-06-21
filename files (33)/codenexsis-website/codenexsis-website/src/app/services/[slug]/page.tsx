import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import { services as fallbackServices } from '@/lib/services';
import { loadServices, loadServiceBySlug } from '@/lib/services-data';
import { siteConfig } from '@/config/site';
import PageHero from '@/components/PageHero/PageHero';
import CTA from '@/components/CTA/CTA';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/ScrollReveal/ScrollReveal';
import styles from '@/components/ServiceDetail/ServiceDetail.module.css';
import { iconByName } from '@/lib/icon-map';

type Props = { params: { slug: string } };

export const dynamicParams = true;
export const revalidate = 60;

export function generateStaticParams() {
  return fallbackServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const service = await loadServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await loadServiceBySlug(params.slug);
  if (!service) notFound();

  const all = await loadServices();
  const others = all.filter((s) => s.slug !== service.slug).slice(0, 3);
  const Icon = iconByName(service.icon);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: service.title,
    url: `${siteConfig.url}/services/${service.slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${siteConfig.url}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: `${siteConfig.url}/services/${service.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <PageHero
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.shortTitle },
        ]}
        tag={`${service.number} / ${service.shortTitle}`}
        title={service.title}
        subtitle={service.description}
      />

      {/* Tagline + Icon */}
      <section style={{ paddingBottom: '4rem' }}>
        <div className="container">
          <ScrollReveal>
            <div className={styles.heroIcon}>
              <Icon size={28} strokeWidth={1.5} />
            </div>
            <p className={styles.tagline}>“{service.tagline}”</p>
          </ScrollReveal>
        </div>
      </section>

      {/* Overview */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.twoCol}>
            <ScrollReveal>
              <div className={styles.colHeader}>
                <div className={styles.colTag}>
                  <span className="tag">Overview</span>
                </div>
                <h2 className={styles.colTitle}>
                  Why teams hire us for{' '}
                  <span className={styles.colTitleAccent}>{service.shortTitle}.</span>
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className={styles.prose}>
                <p>{service.longDescription}</p>
                <p>
                  Every engagement starts with a discovery week — we map your
                  goals, surface unknowns, and lock the scope. From there it&apos;s
                  weekly demos, production-grade code, and full handover.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.twoCol}>
            <ScrollReveal>
              <div className={styles.colHeader}>
                <div className={styles.colTag}>
                  <span className="tag">Capabilities</span>
                </div>
                <h2 className={styles.colTitle}>
                  What&apos;s included in every{' '}
                  <span className={styles.colTitleAccent}>{service.shortTitle.toLowerCase()} engagement.</span>
                </h2>
                <p className={styles.colSubtitle}>
                  Senior practitioners across every layer of your stack — no juniors,
                  no offshoring, no surprises.
                </p>
              </div>
            </ScrollReveal>
            <StaggerReveal className={styles.capList} delay={0.05}>
              {service.capabilities.map((cap, i) => (
                <StaggerChild key={cap} className={styles.capItem}>
                  <span className={styles.capNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.capText}>{cap}</span>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.twoCol}>
            <ScrollReveal>
              <div className={styles.colHeader}>
                <div className={styles.colTag}>
                  <span className="tag">Tech we use</span>
                </div>
                <h2 className={styles.colTitle}>
                  Tooling chosen for{' '}
                  <span className={styles.colTitleAccent}>longevity, not hype.</span>
                </h2>
                <p className={styles.colSubtitle}>
                  We pick technology that you, your team, and the next agency
                  can pick up two years from now.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className={styles.techGrid}>
                {service.technologies.map((tech) => (
                  <span key={tech} className={styles.techPill}>{tech}</span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.twoCol}>
            <ScrollReveal>
              <div className={styles.colHeader}>
                <div className={styles.colTag}>
                  <span className="tag">What you get</span>
                </div>
                <h2 className={styles.colTitle}>
                  Deliverables, in writing —{' '}
                  <span className={styles.colTitleAccent}>before kickoff.</span>
                </h2>
              </div>
            </ScrollReveal>
            <StaggerReveal className={styles.delList} delay={0.06}>
              {service.deliverables.map((del) => (
                <StaggerChild key={del} className={styles.delItem}>
                  <span className={styles.delCheck}>
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                  <span className={styles.delText}>{del}</span>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className={styles.section}>
        <div className="container">
          <ScrollReveal>
            <div style={{ marginBottom: '3rem' }}>
              <span className="tag">Related</span>
              <h2 className={styles.colTitle} style={{ marginTop: '1rem' }}>
                Explore other{' '}
                <span className={styles.colTitleAccent}>disciplines.</span>
              </h2>
            </div>
          </ScrollReveal>
          <StaggerReveal className={styles.otherGrid} delay={0.08}>
            {others.map((s) => {
              const OtherIcon = iconByName(s.icon);
              return (
                <StaggerChild key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={styles.otherCard}>
                    <span className={styles.otherIcon}>
                      <OtherIcon size={16} strokeWidth={1.6} />
                    </span>
                    <div className={styles.otherTitle}>{s.title}</div>
                    <p className={styles.otherTagline}>{s.tagline}</p>
                    <span className={styles.otherLink}>
                      Read more <ArrowUpRight size={13} />
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
