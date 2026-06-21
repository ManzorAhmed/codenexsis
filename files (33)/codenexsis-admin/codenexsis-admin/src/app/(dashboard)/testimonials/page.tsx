'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import { api } from '@/lib/api';
import type { Testimonial } from '@/lib/types';
import {
  PageHeader, Spinner, EmptyState, Badge, Drawer, Field, Toggle,
} from '@/components/ui';

const blank: Partial<Testimonial> = {
  author: '', role: '', company: '', quote: '', avatar: '', rating: 5, published: true, order: 0,
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api.get<Testimonial[]>('/testimonials/all').then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const payload = { ...editing };
      ['id', 'createdAt', 'updatedAt'].forEach((k) => delete (payload as any)[k]);
      if (!payload.avatar) delete (payload as any).avatar;
      if (editing.id) await api.patch(`/testimonials/${editing.id}`, payload);
      else await api.post('/testimonials', payload);
      setEditing(null);
      load();
    } catch (e: any) {
      setError(e?.message ?? 'Could not save');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await api.del(`/testimonials/${id}`);
    load();
  };

  const set = (patch: Partial<Testimonial>) => setEditing((p) => ({ ...p!, ...patch }));

  return (
    <>
      <PageHeader
        title="Testimonials"
        subtitle="Social proof shown across the site."
        action={
          <button className="btn btn-primary" onClick={() => setEditing({ ...blank })}>
            <Plus size={15} /> New testimonial
          </button>
        }
      />

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState title="No testimonials yet" hint="Add client quotes to build trust." />
      ) : (
        <div className="card divide-y divide-line">
          {items.map((t) => (
            <div key={t.id} className="flex items-start gap-4 px-5 py-4">
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-medium">{t.author}</span>
                  <span className="text-xs text-ink-dim">{t.role}, {t.company}</span>
                  {!t.published && <Badge tone="amber">Hidden</Badge>}
                </div>
                <p className="line-clamp-2 text-sm text-ink-muted">“{t.quote}”</p>
                <div className="mt-1 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-red text-red" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="btn btn-ghost px-2.5 py-1.5" onClick={() => setEditing(t)}><Pencil size={14} /></button>
                <button className="btn btn-danger px-2.5 py-1.5" onClick={() => remove(t.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit testimonial' : 'New testimonial'}
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
            <div className="grid grid-cols-2 gap-4">
              <Field label="Author"><input className="input" value={editing.author ?? ''} onChange={(e) => set({ author: e.target.value })} /></Field>
              <Field label="Role"><input className="input" value={editing.role ?? ''} onChange={(e) => set({ role: e.target.value })} /></Field>
            </div>
            <Field label="Company"><input className="input" value={editing.company ?? ''} onChange={(e) => set({ company: e.target.value })} /></Field>
            <Field label="Quote"><textarea className="input" rows={4} value={editing.quote ?? ''} onChange={(e) => set({ quote: e.target.value })} /></Field>
            <Field label="Avatar URL"><input className="input" value={editing.avatar ?? ''} onChange={(e) => set({ avatar: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Rating (1–5)"><input className="input" type="number" min={1} max={5} value={editing.rating ?? 5} onChange={(e) => set({ rating: Number(e.target.value) })} /></Field>
              <Field label="Order"><input className="input" type="number" value={editing.order ?? 0} onChange={(e) => set({ order: Number(e.target.value) })} /></Field>
            </div>
            <Toggle checked={!!editing.published} onChange={(v) => set({ published: v })} label="Published" />
          </>
        )}
      </Drawer>
    </>
  );
}
