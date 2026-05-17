'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, studio } from '@/lib/content';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Pages that begin with a full-bleed dark hero — header must render light text at the top.
  const hasDarkHero = pathname === '/';
  const overDark = hasDarkHero && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const condensed = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,height,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        condensed
          ? 'bg-paper/95 backdrop-blur-md border-b border-line h-[80px] text-ink'
          : `bg-transparent h-[104px] ${overDark ? 'text-paper' : 'text-ink'}`
      }`}
    >
      {/* Subtle scrim only when over a dark hero — keeps text readable without a hard bar */}
      {overDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-black/35 to-transparent"
        />
      )}

      <div
        className={`container-x relative flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          condensed ? 'h-[80px]' : 'h-[104px]'
        }`}
      >
        <Link
          href="/"
          className="group flex items-baseline gap-3 leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-sm"
        >
          <span
            className={`font-serif italic tracking-tighter2 leading-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              condensed ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'
            }`}
          >
            {studio.short}
          </span>
          <span
            className={`hidden sm:inline-block not-italic font-sans uppercase tracking-[0.28em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              overDark ? 'text-paper/70' : 'text-stone'
            } ${condensed ? 'text-[10px]' : 'text-xs'}`}
          >
            Landscaping
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {nav.slice(1, -1).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative text-xs uppercase tracking-[0.18em] py-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-sm ${
                  overDark
                    ? active
                      ? 'text-paper'
                      : 'text-paper/65 hover:text-paper'
                    : active
                      ? 'text-ink'
                      : 'text-stone hover:text-ink'
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute left-0 right-0 -bottom-0.5 mx-auto h-px origin-center bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/contact"
            className={`group inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] border px-4 py-2.5 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-4 focus-visible:ring-offset-transparent ${
              overDark
                ? 'border-paper/70 text-paper hover:bg-paper hover:text-ink'
                : 'border-ink text-ink hover:bg-ink hover:text-paper'
            }`}
          >
            Request a quote
            <span aria-hidden className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </nav>

        <button
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 rounded-sm"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-px w-6 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-paper text-ink">
          <div className="container-x py-6 flex flex-col gap-5">
            {nav.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm uppercase tracking-[0.18em] ${
                  pathname === item.href ? 'text-ink' : 'text-stone'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
