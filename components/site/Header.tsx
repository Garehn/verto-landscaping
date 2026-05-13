'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { nav, studio } from '@/lib/content';

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-paper/95 backdrop-blur-md border-b border-line h-[88px]' : 'bg-transparent h-[112px]'
      }`}
    >
      <div className={`container-x flex items-center justify-between transition-all duration-300 ${scrolled || open ? 'h-[88px]' : 'h-[112px]'}`}>
        <Link href="/" className="group flex items-baseline gap-3 leading-none">
          <span
            className={`font-serif italic tracking-tighter2 leading-none transition-all duration-300 ${
              scrolled || open ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'
            }`}
          >
            {studio.short}
          </span>
          <span
            className={`hidden sm:inline-block not-italic font-sans uppercase tracking-[0.28em] text-stone transition-all duration-300 ${
              scrolled || open ? 'text-[10px]' : 'text-xs'
            }`}
          >
            Landscaping
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {nav.slice(1, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs uppercase tracking-[0.18em] transition-colors ${
                pathname === item.href ? 'text-ink' : 'text-stone hover:text-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-xs uppercase tracking-[0.18em] border border-ink px-4 py-2.5 hover:bg-ink hover:text-paper transition-colors"
          >
            Request a quote
          </Link>
        </nav>

        <button
          aria-label="Open menu"
          aria-expanded={open}
          className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-px w-6 bg-ink transition-transform ${open ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-ink transition-transform ${open ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-paper">
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
