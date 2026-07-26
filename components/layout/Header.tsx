'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Logo from './Logo';
import { primaryNav, services, site } from '@/lib/site';
import {
  ArrowLongRight,
  ArrowRight,
  ChevronDown,
  CloseIcon,
  MenuIcon,
  PhoneIcon,
} from '@/components/icons';

export default function Header() {
  const pathname = usePathname();
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Route changes should always dismiss any open navigation surface.
  useEffect(() => {
    setMobileOpen(false);
    setDesktopOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setDesktopOpen(false);
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /** Small grace period so the pointer can travel from trigger to panel. */
  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDesktopOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDesktopOpen(false), 140);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    /* Absolute, not fixed: the bar stays fully transparent over the hero and
       scrolls away with it, so white links never sit on a white section. */
    <header
      className={`absolute inset-x-0 top-0 z-50 transition-colors duration-300 ${
        mobileOpen ? 'bg-navy' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1500px] items-center justify-between px-5 lg:h-[92px] lg:px-10">
        <Logo variant="light" />

        {/* ---------------- Desktop navigation ---------------- */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => {
              const hasChildren = 'children' in item && !!item.children;

              if (!hasChildren) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`block rounded-md px-4 py-2 font-sans text-[13px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                        isActive(item.href)
                          ? 'text-white'
                          : 'text-white/85 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={openMenu}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={desktopOpen}
                    aria-haspopup="true"
                    onClick={() => setDesktopOpen((v) => !v)}
                    className={`flex items-center gap-1.5 rounded-md px-4 py-2 font-sans text-[13px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                      desktopOpen || isActive('/services')
                        ? 'text-white'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-300 ${
                        desktopOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {desktopOpen && (
                    <div
                      className="absolute left-1/2 top-full w-[min(92vw,570px)] -translate-x-1/2 pt-5"
                      onMouseEnter={openMenu}
                      onMouseLeave={scheduleClose}
                    >
                      <div className="animate-menuIn rounded-xl bg-white p-2 shadow-menu">
                        <ul>
                          {services.map((service, i) => (
                            <li key={service.href}>
                              <Link
                                href={service.href}
                                className={`group flex items-center justify-between gap-6 px-6 py-[15px] text-[16px] leading-snug text-navy transition-colors duration-300 hover:text-rose-deep ${
                                  i !== 0 ? 'border-t border-navy/10' : ''
                                }`}
                              >
                                <span>{service.label}</span>
                                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ---------------- Call to action / mobile toggle ---------------- */}
        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden rounded-full bg-navy px-7 py-[13px] font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-navy-deep xl:inline-block"
          >
            Call: {site.phone}
          </a>

          {/* Below the CALL pill's breakpoint the number collapses to a glyph. */}
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            className="grid h-10 w-10 place-items-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-opacity hover:opacity-75 xl:hidden"
          >
            <PhoneIcon className="h-[22px] w-[22px]" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-opacity hover:opacity-75 lg:hidden"
          >
            {mobileOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ---------------- Mobile drawer ---------------- */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-white/10 bg-navy px-5 pb-10 pt-4 lg:hidden">
          <ul className="divide-y divide-white/10">
            {primaryNav.map((item) => {
              const hasChildren = 'children' in item && !!item.children;

              if (!hasChildren) {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-4 font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-white"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    className="flex w-full items-center justify-between py-4 font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-white"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        mobileServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {mobileServicesOpen && (
                    <ul className="pb-3">
                      {services.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            className="flex items-center justify-between gap-4 py-2.5 pl-4 text-[15px] text-white/80"
                          >
                            {service.label}
                            <ArrowLongRight className="h-3 w-6 shrink-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <a
            href={site.phoneHref}
            className="mt-7 flex items-center justify-center rounded-full bg-white px-7 py-[14px] font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-navy"
          >
            Call: {site.phone}
          </a>
        </div>
      )}
    </header>
  );
}
