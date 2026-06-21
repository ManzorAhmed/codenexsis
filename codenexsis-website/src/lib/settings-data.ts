import 'server-only';
import { siteConfig } from '@/config/site';

export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  hours: string;
};

export type SocialLinks = {
  linkedin: string;
  twitter: string;
  github: string;
  instagram: string;
};

export type SiteSettings = {
  contact: ContactInfo;
  social: SocialLinks;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const REVALIDATE = 60;

/**
 * Load site settings (contact + social) from the CMS, merged over the static
 * siteConfig defaults. Falls back entirely to siteConfig if the API is unset
 * or unreachable, so the site always renders.
 */
export async function loadSettings(): Promise<SiteSettings> {
  const fallback: SiteSettings = {
    contact: { ...siteConfig.contact },
    social: { ...siteConfig.social },
  };

  if (!API_URL) return fallback;

  try {
    const res = await fetch(`${API_URL}/settings`, {
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) throw new Error(`CMS responded ${res.status}`);
    const rows = (await res.json()) as { key: string; value: unknown }[];

    const byKey: Record<string, Record<string, string>> = {};
    if (Array.isArray(rows)) {
      for (const r of rows) {
        if (r && typeof r.value === 'object' && r.value !== null) {
          byKey[r.key] = r.value as Record<string, string>;
        }
      }
    }

    return {
      contact: { ...fallback.contact, ...(byKey.contact ?? {}) },
      social: { ...fallback.social, ...(byKey.social ?? {}) },
    };
  } catch {
    return fallback;
  }
}
