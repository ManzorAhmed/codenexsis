import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { services } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: siteConfig.url, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteConfig.url}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteConfig.url}/services`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/portfolio`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/contact`, lastModified, changeFrequency: 'yearly', priority: 0.6 },
    ...services.map((s) => ({
      url: `${siteConfig.url}/services/${s.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ];
}
