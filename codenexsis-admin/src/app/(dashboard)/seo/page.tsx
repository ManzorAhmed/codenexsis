'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import type { SeoMeta } from '@/lib/types';
import {
  PageHeader, Spinner, EmptyState, Badge, Drawer, Field, Toggle, TagInput,
} from '@/components/ui';

const blank: Partial<SeoMeta> = {
  path: '/', title: '', description: '', keywords: [], ogImage: '', canonical: '', noindex: false,
};

export default function SeoPage() {
  const [items, setItems] = useState<SeoMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<SeoMeta> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api.get<SeoMeta[]>('/seo').then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      await api.put('/seo', {
        path: editing.path,
        title: editing.title,
        description: editing.description,
        keywords: editing.keywords ?? [],
        ogImage: editing.ogImage || undefined,
        canonical: editing.canonical || undefined,
        noindex: !!editing.noindex,
      });
      setEditing(null);
      load();
    } catch (e: any) {
      setError(e?.message ?? 'Could not save');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (path: string) => {
    if (!confirm(`Remove SEO override for ${path}?`)) return;
    await api.del(`/seo?path=${encodeURIComponent(path)}`);
    load();
  };

  const set = (patch: Partial<SeoMeta>) => setEditing((p) => ({ ...p!, ...patch }));

  return (
    <>
      <PageHeader
        title="Page SEO"
        subtitle="Per-page title, description, and keyword overrides keyed by URL path."
        action={
          <button className="btn btn-primary" onClick={() => setEditing({ ...blank })}>
            <Plus size={15} /> New override
          </button>
        }
      />

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState title="No SEO overrides" hint="Add one to control a page's meta tags." />
      ) : (
        <div className="card divide-y divide-line">
          {items.map((m) => (
            <div key={m.id} className="flex items-center gap-4 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">{m.path}</span>
                  {m.noindex && <Badge tone="red">noindex</Badge>}
                </div>
                <div className="truncate text-xs text-ink-dim">{m.title}</div>
              </div>
              <div className="flex items-center gap-1">
                <button className="btn btn-ghost px-2.5 py-1.5" onClick={() => setEditing(m)}><Pencil size={14} /></button>
                <button className="btn btn-danger px-2.5 py-1.5" onClick={() => remove(m.path)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit SEO override' : 'New SEO override'}
        footer={
          <div className="flex items-center justify-between">
            {error ? <span className="text-sm text-red-hi">{error}</span> : <span />}
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        }
      >
        {editing && (
          <>
            <Field label="Path" hint="e.g. / or /services or /about"><input className="input font-mono" value={editing.path ?? ''} onChange={(e) => set({ path: e.target.value })} /></Field>
            <Field label="Title"><input className="input" value={editing.title ?? ''} onChange={(e) => set({ title: e.target.value })} /></Field>
            <Field label="Description"><textarea className="input" rows={2} value={editing.description ?? ''} onChange={(e) => set({ description: e.target.value })} /></Field>
            <Field label="Keywords"><TagInput values={editing.keywords ?? []} onChange={(v) => set({ keywords: v })} placeholder="Add a keyword" /></Field>
            <Field label="OG image URL"><input className="input" value={editing.ogImage ?? ''} onChange={(e) => set({ ogImage: e.target.value })} /></Field>
            <Field label="Canonical URL"><input className="input" value={editing.canonical ?? ''} onChange={(e) => set({ canonical: e.target.value })} /></Field>
            <Toggle checked={!!editing.noindex} onChange={(v) => set({ noindex: v })} label="noindex (hide from search engines)" />
          </>
        )}
      </Drawer>
    </>
  );
}
