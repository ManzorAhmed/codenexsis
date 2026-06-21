'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { api } from '@/lib/api';
import type { Service } from '@/lib/types';
import {
  PageHeader, Spinner, EmptyState, Badge, Drawer, Field, Toggle, TagInput,
} from '@/components/ui';

const ICONS = [
  'Code2', 'Database', 'Smartphone', 'Globe', 'ShieldCheck', 'Bug',
  'Network', 'CloudCog', 'Cloud', 'Cpu', 'BrainCircuit', 'Search',
  'MapPin', 'ShoppingCart', 'MousePointerClick', 'Target', 'Share2',
  'PenTool', 'MailCheck', 'TrendingUp', 'BarChart3', 'Megaphone',
];
const CATEGORIES = ['build', 'secure', 'scale', 'market'];
const GROUPS = ['', 'seo', 'paid', 'social', 'analytics'];

const blank: Partial<Service> = {
  slug: '', number: '', title: '', shortTitle: '', category: 'build', group: '',
  tagline: '', description: '', longDescription: '', icon: 'Code2',
  capabilities: [], technologies: [], deliverables: [], keywords: [],
  metaTitle: '', metaDescription: '', published: true, order: 0,
};

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api.get<Service[]>('/services/all').then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const payload = { ...editing };
      delete (payload as any).id;
      delete (payload as any).createdAt;
      delete (payload as any).updatedAt;
      if (payload.category !== 'market' || !payload.group) delete (payload as any).group;
      if (editing.id) await api.patch(`/services/${editing.id}`, payload);
      else await api.post('/services', payload);
      setEditing(null);
      load();
    } catch (e: any) {
      setError(e?.message ?? 'Could not save');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this service? This removes its page from the site.')) return;
    await api.del(`/services/${id}`);
    load();
  };

  const set = (patch: Partial<Service>) => setEditing((p) => ({ ...p!, ...patch }));

  return (
    <>
      <PageHeader
        title="Services"
        subtitle="These power /services and every /services/[slug] page on the site."
        action={
          <button className="btn btn-primary" onClick={() => setEditing({ ...blank })}>
            <Plus size={15} /> New service
          </button>
        }
      />

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState title="No services yet" hint="Create your first service to publish a page." />
      ) : (
        <div className="card divide-y divide-line">
          {items.map((s) => (
            <div key={s.id} className="flex items-center gap-4 px-5 py-3.5">
              <span className="w-8 font-mono text-sm text-ink-dim">{s.number}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{s.title}</span>
                  {!s.published && <Badge tone="amber">Draft</Badge>}
                </div>
                <div className="truncate text-xs text-ink-dim">/{`services/${s.slug}`} · {s.category}</div>
              </div>
              <div className="flex items-center gap-1">
                <button className="btn btn-ghost px-2.5 py-1.5" onClick={() => setEditing(s)}>
                  <Pencil size={14} />
                </button>
                <button className="btn btn-danger px-2.5 py-1.5" onClick={() => remove(s.id)}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit service' : 'New service'}
        footer={
          <div className="flex items-center justify-between">
            {error ? <span className="text-sm text-red-hi">{error}</span> : <span />}
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>
                {saving ? 'Saving…' : 'Save service'}
              </button>
            </div>
          </div>
        }
      >
        {editing && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Title"><input className="input" value={editing.title ?? ''} onChange={(e) => set({ title: e.target.value })} /></Field>
              <Field label="Short title"><input className="input" value={editing.shortTitle ?? ''} onChange={(e) => set({ shortTitle: e.target.value })} /></Field>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Field label="Slug" hint="URL segment"><input className="input" value={editing.slug ?? ''} onChange={(e) => set({ slug: e.target.value })} /></Field>
              <Field label="Number"><input className="input" value={editing.number ?? ''} onChange={(e) => set({ number: e.target.value })} /></Field>
              <Field label="Order"><input className="input" type="number" value={editing.order ?? 0} onChange={(e) => set({ order: Number(e.target.value) })} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <select className="input" value={editing.category} onChange={(e) => set({ category: e.target.value })}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Icon" hint="lucide-react name">
                <select className="input" value={editing.icon} onChange={(e) => set({ icon: e.target.value })}>
                  {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </Field>
            </div>
            {editing.category === 'market' && (
              <Field label="Marketing group" hint="Which column it appears under in the SEO & Marketing menu">
                <select className="input" value={editing.group ?? ''} onChange={(e) => set({ group: e.target.value })}>
                  {GROUPS.map((g) => <option key={g || 'none'} value={g}>{g === '' ? '— select —' : g}</option>)}
                </select>
              </Field>
            )}
            <Field label="Tagline"><input className="input" value={editing.tagline ?? ''} onChange={(e) => set({ tagline: e.target.value })} /></Field>
            <Field label="Short description"><textarea className="input" rows={2} value={editing.description ?? ''} onChange={(e) => set({ description: e.target.value })} /></Field>
            <Field label="Long description"><textarea className="input" rows={4} value={editing.longDescription ?? ''} onChange={(e) => set({ longDescription: e.target.value })} /></Field>

            <Field label="Capabilities"><TagInput values={editing.capabilities ?? []} onChange={(v) => set({ capabilities: v })} placeholder="Add a capability" /></Field>
            <Field label="Technologies"><TagInput values={editing.technologies ?? []} onChange={(v) => set({ technologies: v })} placeholder="Add a technology" /></Field>
            <Field label="Deliverables"><TagInput values={editing.deliverables ?? []} onChange={(v) => set({ deliverables: v })} placeholder="Add a deliverable" /></Field>

            <div className="my-5 border-t border-line pt-5">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink-muted">
                <ExternalLink size={14} /> SEO
              </h3>
              <Field label="Meta title"><input className="input" value={editing.metaTitle ?? ''} onChange={(e) => set({ metaTitle: e.target.value })} /></Field>
              <Field label="Meta description"><textarea className="input" rows={2} value={editing.metaDescription ?? ''} onChange={(e) => set({ metaDescription: e.target.value })} /></Field>
              <Field label="Keywords"><TagInput values={editing.keywords ?? []} onChange={(v) => set({ keywords: v })} placeholder="Add a target keyword" /></Field>
            </div>

            <Toggle checked={!!editing.published} onChange={(v) => set({ published: v })} label="Published (visible on site)" />
          </>
        )}
      </Drawer>
    </>
  );
}
