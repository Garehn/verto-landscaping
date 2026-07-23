'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { nav, studio } from '@/lib/content';
import { EASE, EASE_PANEL } from '@/components/motion/ease';

const menuLinks = nav.filter((item) => item.href !== '/contact');

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  return (
    <>
      {/* Solid light bar, always visible, always carrying the CTA */}
      <header className="fixed inset-x-0 top-0 z-[95] border-b border-ink/10 bg-paper/95 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-6 sm:h-20">
          <Link href="/" className="inline-flex items-center py-2.5 leading-none" onClick={() => setOpen(false)}>
            <span className="block whitespace-nowrap font-serif text-base tracking-tight sm:text-2xl">
              VERTO LANDSCAPES
            </span>
            <span className="meta-sm mt-1 hidden text-stone sm:block">Design &amp; Construct</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {menuLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`meta py-2 transition-colors duration-300 ${
                    active ? 'text-ink' : 'text-stone hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <a
              href={studio.phoneHref}
              className="meta hidden text-stone transition-colors hover:text-ink xl:inline-block"
              data-numeric
            >
              {studio.phone}
            </a>
            <Link href="/contact" className="btn-cta group min-h-[40px] whitespace-nowrap !gap-1.5 !px-3 !py-2 text-[10px] sm:!gap-3 sm:!px-7 sm:!py-3 sm:text-xs">
              Get a quote <span aria-hidden className="arrow">→</span>
            </Link>
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-3 py-2 lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 block h-px w-6 bg-current transition-transform duration-500 ease-out-expo ${
                    open ? 'translate-y-[5.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 block h-px w-6 bg-current transition-transform duration-500 ease-out-expo ${
                    open ? '-translate-y-[5.5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu (mobile / tablet) */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] bg-paper text-ink"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.8, ease: EASE_PANEL }}
          >
            <div className="container-x flex h-full flex-col justify-between pb-10 pt-28">
              <nav className="flex flex-col gap-1">
                {[...menuLinks, { href: '/contact', label: 'Get a quote' }].map(
                  (item, i) => (
                    <div key={item.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '110%', transition: { duration: 0.35, ease: EASE } }}
                        transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.06 }}
                      >
                        <Link
                          href={item.href}
                          className={`flex items-baseline gap-5 py-2 font-serif text-4xl tracking-tighter2 sm:text-6xl ${
                            item.href === '/contact'
                              ? 'italic text-brass'
                              : pathname === item.href
                                ? 'text-ink'
                                : 'text-ink/50 hover:text-ink'
                          }`}
                        >
                          <span className="meta-sm w-7 shrink-0 not-italic text-brass" data-numeric>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {item.label}
                        </Link>
                      </motion.div>
                    </div>
                  )
                )}
              </nav>

              <motion.div
                className="flex flex-col gap-4 border-t border-ink/10 pt-6 text-sm text-ink/70 sm:flex-row sm:justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <div>
                  {studio.address.street}, {studio.address.suburb} {studio.address.state}{' '}
                  {studio.address.postcode}
                </div>
                <div className="flex gap-6">
                  <a href={studio.phoneHref} data-numeric className="hover:text-ink">{studio.phone}</a>
                  <a href={`mailto:${studio.email}`} className="hover:text-ink">{studio.email}</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
