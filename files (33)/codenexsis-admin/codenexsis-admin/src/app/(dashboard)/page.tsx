'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layers, FileText, Inbox, Quote, ArrowUpRight } from 'lucide-react';
import { api } from '@/lib/api';
import type { Service, BlogPost, Testimonial, Lead } from '@/lib/types';
import { PageHeader, Spinner, Badge } from '@/components/ui';

type LeadStats = { total: number; byStatus: { status: string; _count: number }[] };

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ services: 0, posts: 0, testimonials: 0 });
  const [leadStats, setLeadStats] = useState<LeadStats | null>(null);
  const [recent, setRecent] = useState<Lead[]>([]);

  useEffect(() => {
    Promise.all([
      api.get<Service[]>('/services/all').catch(() => []),
      api.get<BlogPost[]>('/blog/all').catch(() => []),
      api.get<Testimonial[]>('/testimonials/all').catch(() => []),
      api.get<LeadStats>('/leads/stats').catch(() => null),
      api.get<Lead[]>('/leads').catch(() => []),
    ]).then(([services, posts, testimonials, stats, leads]) => {
      setCounts({ services: services.length, posts: posts.length, testimonials: testimonials.length });
      setLeadStats(stats);
      setRecent(leads.slice(0, 5));
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner label="Loading dashboard…" />;

  const cards = [
    { label: 'Services', value: counts.services, href: '/services', icon: Layers },
    { label: 'Blog posts', value: counts.posts, href: '/blog', icon: FileText },
    { label: 'Leads', value: leadStats?.total ?? 0, href: '/leads', icon: Inbox },
    { label: 'Testimonials', value: counts.testimonials, href: '/testimonials', icon: Quote },
  ];

  return (
    <>
      <PageHeader title="Overview" subtitle="Everything on your site at a glance." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.label} href={c.href} className="card group p-5 transition-colors hover:border-red/40">
              <div className="mb-3 flex items-center justify-between">
                <Icon size={18} className="text-red-hi" />
                <ArrowUpRight size={15} className="text-ink-dim transition-colors group-hover:text-red-hi" />
              </div>
              <div className="text-3xl font-semibold">{c.value}</div>
              <div className="text-sm text-ink-dim">{c.label}</div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-dim">
            Pipeline
          </h2>
          {leadStats && leadStats.byStatus.length > 0 ? (
            <div className="space-y-2">
              {leadStats.byStatus.map((s) => (
                <div key={s.status} className="flex items-center justify-between text-sm">
                  <span className="text-ink-muted">{s.status}</span>
                  <span className="font-medium">{s._count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-dim">No leads yet.</p>
          )}
        </div>

        <div className="card p-5">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-dim">
            Recent leads
          </h2>
          {recent.length > 0 ? (
            <div className="space-y-3">
              {recent.map((l) => (
                <div key={l.id} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{l.name}</div>
                    <div className="truncate text-xs text-ink-dim">{l.email}</div>
                  </div>
                  <Badge tone={l.status === 'NEW' ? 'amber' : 'default'}>{l.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-dim">No submissions yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
