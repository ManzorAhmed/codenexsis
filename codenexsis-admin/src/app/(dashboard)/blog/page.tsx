'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import type { BlogPost } from '@/lib/types';
import {
  PageHeader, Spinner, EmptyState, Badge, Drawer, Field, Toggle, TagInput,
} from '@/components/ui';

const blank: Partial<BlogPost> = {
  slug: '', title: '', excerpt: '', content: '', author: 'Codenexsis Technologies',
  tags: [], keywords: [], metaTitle: '', metaDescription: '', published: false, readingMinutes: 4,
};

export default function BlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api.get<BlogPost[]>('/blog/all').then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const payload = { ...editing };
      ['id', 'createdAt', 'publishedAt'].forEach((k) => delete (payload as any)[k]);
      if (editing.id) await api.patch(`/blog/${editing.id}`, payload);
      else await api.post('/blog', payload);
      setEditing(null);
      load();
    } catch (e: any) {
      setError(e?.message ?? 'Could not save');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await api.del(`/blog/${id}`);
    load();
  };

  const set = (patch: Partial<BlogPost>) => setEditing((p) => ({ ...p!, ...patch }));

  return (
    <>
      <PageHeader
        title="Blog & SEO Posts"
        subtitle="Articles for organic search. Each post carries its own meta + keywords."
        action={
          <button className="btn btn-primary" onClick={() => setEditing({ ...blank })}>
            <Plus size={15} /> New post
          </button>
        }
      />

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState title="No posts yet" hint="Publish SEO articles to grow organic traffic." />
      ) : (
        <div className="card divide-y divide-line">
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-3.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{p.title}</span>
                  {p.published ? <Badge tone="green">Live</Badge> : <Badge tone="amber">Draft</Badge>}
                </div>
                <div className="truncate text-xs text-ink-dim">/{`blog/${p.slug}`}</div>
              </div>
              <div className="flex items-center gap-1">
                <button className="btn btn-ghost px-2.5 py-1.5" onClick={() => setEditing(p)}><Pencil size={14} /></button>
                <button className="btn btn-danger px-2.5 py-1.5" onClick={() => remove(p.id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? 'Edit post' : 'New post'}
        footer={
          <div className="flex items-center justify-between">
            {error ? <span className="text-sm text-red-hi">{error}</span> : <span />}
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>
                {saving ? 'Saving…' : 'Save post'}
              </button>
            </div>
          </div>
        }
      >
        {editing && (
          <>
            <Field label="Title"><input className="input" value={editing.title ?? ''} onChange={(e) => set({ title: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Slug"><input className="input" value={editing.slug ?? ''} onChange={(e) => set({ slug: e.target.value })} /></Field>
              <Field label="Reading minutes"><input className="input" type="number" value={editing.readingMinutes ?? 4} onChange={(e) => set({ readingMinutes: Number(e.target.value) })} /></Field>
            </div>
            <Field label="Author"><input className="input" value={editing.author ?? ''} onChange={(e) => set({ author: e.target.value })} /></Field>
            <Field label="Cover image URL"><input className="input" value={editing.coverImage ?? ''} onChange={(e) => set({ coverImage: e.target.value })} /></Field>
            <Field label="Excerpt"><textarea className="input" rows={2} value={editing.excerpt ?? ''} onChange={(e) => set({ excerpt: e.target.value })} /></Field>
            <Field label="Content" hint="Markdown or HTML"><textarea className="input font-mono text-xs" rows={10} value={editing.content ?? ''} onChange={(e) => set({ content: e.target.value })} /></Field>
            <Field label="Tags"><TagInput values={editing.tags ?? []} onChange={(v) => set({ tags: v })} placeholder="Add a tag" /></Field>

            <div className="my-5 border-t border-line pt-5">
              <h3 className="mb-3 text-sm font-semibold text-ink-muted">SEO</h3>
              <Field label="Meta title"><input className="input" value={editing.metaTitle ?? ''} onChange={(e) => set({ metaTitle: e.target.value })} /></Field>
              <Field label="Meta description"><textarea className="input" rows={2} value={editing.metaDescription ?? ''} onChange={(e) => set({ metaDescription: e.target.value })} /></Field>
              <Field label="Keywords"><TagInput values={editing.keywords ?? []} onChange={(v) => set({ keywords: v })} placeholder="Add a target keyword" /></Field>
            </div>

            <Toggle checked={!!editing.published} onChange={(v) => set({ published: v })} label="Published" />
          </>
        )}
      </Drawer>
    </>
  );
}
