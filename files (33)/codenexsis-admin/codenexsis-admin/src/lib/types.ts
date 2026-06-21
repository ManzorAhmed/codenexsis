export type Role = 'ADMIN' | 'EDITOR';
export type User = { id: string; email: string; name: string; role: Role };

export type Service = {
  id: string;
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
  capabilities: string[];
  technologies: string[];
  deliverables: string[];
  keywords: string[];
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  order: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  author: string;
  tags: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords: string[];
  published: boolean;
  readingMinutes: number;
  publishedAt?: string | null;
  createdAt: string;
};

export type SeoMeta = {
  id: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string | null;
  canonical?: string | null;
  noindex: boolean;
};

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'WON' | 'LOST';
export type Lead = {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
  status: LeadStatus;
  source?: string | null;
  notes?: string | null;
  createdAt: string;
};

export type Testimonial = {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string | null;
  rating: number;
  published: boolean;
  order: number;
};

export type Setting = { id: string; key: string; value: unknown; updatedAt: string };
