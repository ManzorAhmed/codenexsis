'use client';

import { useEffect, useState } from 'react';
import { Trash2, Mail, Building2 } from 'lucide-react';
import { api } from '@/lib/api';
import type { Lead, LeadStatus } from '@/lib/types';
import { PageHeader, Spinner, EmptyState, Drawer, Field } from '@/components/ui';

const STATUSES: LeadStatus[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST'];

export default function LeadsPage() {
  const [items, setItems] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Lead | null>(null);
  const [notes, setNotes] = useState('');

  const load = () => {
    setLoading(true);
    api.get<Lead[]>('/leads').then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const setStatus = async (id: string, status: LeadStatus) => {
    await api.patch(`/leads/${id}`, { status });
    setItems((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const saveNotes = async () => {
    if (!open) return;
    await api.patch(`/leads/${open.id}`, { notes });
    setItems((prev) => prev.map((l) => (l.id === open.id ? { ...l, notes } : l)));
    setOpen(null);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    await api.del(`/leads/${id}`);
    load();
  };

  return (
    <>
      <PageHeader title="Leads" subtitle="Contact-form submissions and your sales pipeline." />

      {loading ? (
        <Spinner />
      ) : items.length === 0 ? (
        <EmptyState title="No leads yet" hint="Submissions from the website contact form land here." />
      ) : (
        <div className="card divide-y divide-line">
          {items.map((l) => (
            <div key={l.id} className="flex flex-wrap items-center gap-3 px-5 py-3.5">
              <button
                className="min-w-0 flex-1 text-left"
                onClick={() => { setOpen(l); setNotes(l.notes ?? ''); }}
              >
                <div className="truncate font-medium">{l.name}</div>
                <div className="flex flex-wrap items-center gap-x-3 text-xs text-ink-dim">
                  <span className="inline-flex items-center gap-1"><Mail size={11} />{l.email}</span>
                  {l.company && <span className="inline-flex items-center gap-1"><Building2 size={11} />{l.company}</span>}
                  {l.service && <span>· {l.service}</span>}
                </div>
              </button>
              <select
                className="input w-36 py-1.5 text-xs"
                value={l.status}
                onChange={(e) => setStatus(l.id, e.target.value as LeadStatus)}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button className="btn btn-danger px-2.5 py-1.5" onClick={() => remove(l.id)}><Trash2 size={14} /></button>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={!!open}
        onClose={() => setOpen(null)}
        title={open?.name ?? 'Lead'}
        footer={
          <div className="flex justify-end gap-2">
            <button className="btn btn-ghost" onClick={() => setOpen(null)}>Close</button>
            <button className="btn btn-primary" onClick={saveNotes}>Save notes</button>
          </div>
        }
      >
        {open && (
          <>
            <div className="mb-4 grid grid-cols-2 gap-3 text-sm">
              <div><span className="label">Email</span><a href={`mailto:${open.email}`} className="text-red-hi">{open.email}</a></div>
              <div><span className="label">Phone</span>{open.phone || '—'}</div>
              <div><span className="label">Company</span>{open.company || '—'}</div>
              <div><span className="label">Budget</span>{open.budget || '—'}</div>
              <div><span className="label">Service</span>{open.service || '—'}</div>
              <div><span className="label">Source</span>{open.source || '—'}</div>
            </div>
            <Field label="Message">
              <div className="rounded-lg border border-line bg-bg3 px-3 py-2 text-sm text-ink-muted whitespace-pre-wrap">
                {open.message}
              </div>
            </Field>
            <Field label="Internal notes">
              <textarea className="input" rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>
          </>
        )}
      </Drawer>
    </>
  );
}
