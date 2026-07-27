import type { Metadata } from 'next';
import Link from 'next/link';

import { logoutAction } from '@/app/admin/actions';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

const navItems = [
  { href: '/admin/dashboard', label: 'Overview' },
  { href: '/admin/dashboard/submissions', label: 'Submissions' },
  { href: '/admin/dashboard/content/site', label: 'Site & Footer' },
  { href: '/admin/dashboard/content/specials', label: 'Specials Page' },
  { href: '/admin/dashboard/content/membership', label: 'Membership Promo' },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-navy/10 bg-white">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
          <div>
            <p className="font-serif text-[19px] text-navy">Admin Dashboard</p>
            <p className="text-[12px] text-muted">Savannah Age Management Medicine</p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-full border border-navy/20 px-5 py-2 text-[12px] font-medium uppercase tracking-widest2 text-navy transition-colors hover:bg-navy hover:text-white"
            >
              Log Out
            </button>
          </form>
        </div>
        <nav className="mx-auto flex max-w-[1240px] gap-6 overflow-x-auto px-6 pb-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[13px] font-medium text-navy/80 transition-colors hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-[1240px] px-6 py-10">{children}</main>
    </div>
  );
}
