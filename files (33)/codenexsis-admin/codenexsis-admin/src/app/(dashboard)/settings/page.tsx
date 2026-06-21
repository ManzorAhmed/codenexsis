'use client';

import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';
import type { Setting } from '@/lib/types';
import { PageHeader, Spinner, EmptyState, Drawer, Field } from '@/components/ui';

type Draft = { key: string; valueText: string; isNew: boolean };

export default function SettingsPage() {
  const [items, setItems] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    api.get<Setting[]>('/settings').then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openEdit = (s: Setting) =>
    setDraft({ key: s.key, valueText: JSON.stringify(s.value, null, 2), isNew: false });
  const openNew = () => setDraft({ key: '', valueText: '{\n  \n}', isNew: true });

  const save = async () => {
    if (!draft) return;
    setSaving(true);
    setError('');
    try {
      let value: unknown;
      try {
        value = JSON.parse(draft.valueText);
      } catch {
        throw new Error('Value must be valid JSON');
      }
      await api.put('/settings', { key: draft.key, value });
      setDraft(null);
      load();
    } catch (e: any) {
      setError(e?.message ?? 'Could not save');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (key: string) => {
    if (!confirm(`Delete setting "${key}"?`)) return;
    await api.del(`/settings/${encodeURIComponent(key)}`);
    load();
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Global key/value config — contact details, social links, feature flags."
        action={
          <button className="btn btn-primary" onClick={openNew}>
            <Plus size={15} /> New setting
          </button>
        }
      />

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState title="No settings yet" hint="Add a key like 'contact' or 'social'." />
      ) : (
        <div className="space-y-3">
          {items.map((s) => (
            <div key={s.id} className="card p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-sm font-medium text-red-hi">{s.key}</span>
                <div className="flex items-center gap-1">
                  <button className="btn btn-ghost px-2.5 py-1.5" onClick={() => openEdit(s)}><Pencil size={14} /></button>
                  <button className="btn btn-danger px-2.5 py-1.5" onClick={() => remove(s.key)}><Trash2 size={14} /></button>
                </div>
              </div>
              <pre className="overflow-x-auto rounded-lg border border-line bg-bg3 p-3 text-xs text-ink-muted">
                {JSON.stringify(s.value, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={!!draft}
        onClose={() => setDraft(null)}
        title={draft?.isNew ? 'New setting' : `Edit "${draft?.key}"`}
        footer={
          <div className="flex items-center justify-between">
            {error ? <span className="text-sm text-red-hi">{error}</span> : <span />}
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => setDraft(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        }
      >
        {draft && (
          <>
            <Field label="Key">
              <input
                className="input font-mono"
                value={draft.key}
                disabled={!draft.isNew}
                onChange={(e) => setDraft({ ...draft, key: e.target.value })}
              />
            </Field>
            <Field label="Value (JSON)" hint="Any valid JSON — object, array, string, number, boolean.">
              <textarea
                className="input font-mono text-xs"
                rows={12}
                value={draft.valueText}
                onChange={(e) => setDraft({ ...draft, valueText: e.target.value })}
              />
            </Field>
          </>
        )}
      </Drawer>
    </>
  );
}
