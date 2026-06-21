'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  FileText,
  Search,
  Inbox,
  Quote,
  Settings,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

const nav = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/services', label: 'Services', icon: Layers },
  { href: '/blog', label: 'Blog & SEO Posts', icon: FileText },
  { href: '/seo', label: 'Page SEO', icon: Search },
  { href: '/leads', label: 'Leads', icon: Inbox },
  { href: '/testimonials', label: 'Testimonials', icon: Quote },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-line bg-bg2">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-red text-xs font-bold text-white">
          C
        </span>
        <div className="leading-tight">
          <div className="text-sm font-semibold">Codenexsis</div>
          <div className="text-[11px] uppercase tracking-wider text-ink-dim">CMS</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-2">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active ? 'bg-red/15 text-red-hi' : 'text-ink-muted hover:bg-bg3 hover:text-ink'
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line p-3">
        <div className="mb-2 px-2">
          <div className="truncate text-sm font-medium">{user?.name ?? '—'}</div>
          <div className="truncate text-xs text-ink-dim">{user?.email}</div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-bg3 hover:text-ink"
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </aside>
  );
}
