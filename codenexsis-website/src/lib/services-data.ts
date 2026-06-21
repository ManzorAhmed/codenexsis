import 'server-only';
import {
  services as fallbackServices,
  type Service,
  type ServiceCategory,
  type MarketingGroup,
} from './services';

/** Shape returned by the CMS API (icon is a string name, not a component). */
type ApiService = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  group?: string | null;
  tagline: string;
  description: string;
  longDescription: string;
  icon: string;
  capabilities?: string[];
  technologies?: string[];
  deliverables?: string[];
  keywords?: string[];
  metaTitle: string;
  metaDescription: string;
  order?: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** How often (seconds) to re-pull content from the CMS. */
const REVALIDATE = 60;

function mapApiToService(a: ApiService): Service {
  return {
    slug: a.slug,
    number: a.number,
    title: a.title,
    shortTitle: a.shortTitle,
    category: a.category as ServiceCategory,
    group: (a.group as MarketingGroup) || undefined,
    tagline: a.tagline,
    description: a.description,
    longDescription: a.longDescription,
    icon: a.icon,
    capabilities: a.capabilities ?? [],
    technologies: a.technologies ?? [],
    deliverables: a.deliverables ?? [],
    metaTitle: a.metaTitle,
    metaDescription: a.metaDescription,
  };
}

/**
 * Load all published services.
 * Tries the CMS API first; if it's unset or unreachable, falls back to the
 * built-in static list so the site always renders.
 */
export async function loadServices(): Promise<Service[]> {
  if (!API_URL) return fallbackServices;
  try {
    const res = await fetch(`${API_URL}/services`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`CMS responded ${res.status}`);
    const data = (await res.json()) as ApiService[];
    if (!Array.isArray(data) || data.length === 0) return fallbackServices;
    return data
      .map(mapApiToService)
      .sort((a, b) => Number(a.number) - Number(b.number));
  } catch {
    // CMS offline / build-time with no DB → use static content.
    return fallbackServices;
  }
}

export async function loadServiceBySlug(slug: string): Promise<Service | undefined> {
  const all = await loadServices();
  return all.find((s) => s.slug === slug);
}

export const coreOf = (all: Service[]): Service[] =>
  all.filter((s) => s.category !== 'market');

export const marketingOf = (all: Service[]): Service[] =>
  all.filter((s) => s.category === 'market');

export const byCategory = (all: Service[], cat: ServiceCategory): Service[] =>
  all.filter((s) => s.category === cat);

export const byGroup = (all: Service[], group: MarketingGroup): Service[] =>
  all.filter((s) => s.category === 'market' && s.group === group);
