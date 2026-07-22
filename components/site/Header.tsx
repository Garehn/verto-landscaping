'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { nav, studio } from '@/lib/content';
import { EASE, EASE_PANEL } from '@/components/motion/ease';

const menuLinks = nav.filter((item) => item.href !== '/contact');

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (open) return;
    setHidden(latest > prev && latest > 160);
  });

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
      {/* Bar — mix-blend-difference keeps it legible over any ground */}
      <motion.header
        className={`fixed inset-x-0 top-0 z-[95] ${open ? '' : 'mix-blend-difference'} text-paper`}
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="container-x flex h-20 items-center justify-between sm:h-24">
          <Link href="/" className="flex items-baseline gap-3 leading-none" onClick={() => setOpen(false)}>
            <span className="font-serif italic text-3xl tracking-tighter2 sm:text-4xl">Verto</span>
            <span className="meta hidden text-paper/70 sm:inline-block">Landscapes</span>
          </Link>

          <div className="flex items-center gap-8">
            <a
              href={studio.phoneHref}
              className="meta hidden text-paper/70 transition-colors hover:text-paper lg:inline-block"
              data-numeric
            >
              {studio.phone}
            </a>
            <Link href="/contact" className="meta hidden link-underline py-1 md:inline-block">
              Start a project
            </Link>
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="group flex items-center gap-3 py-2"
            >
              <span className="meta">{open ? 'Close' : 'Menu'}</span>
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
      </motion.header>

      {/* Full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] bg-ink text-paper"
            initial={{ y: '-100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.85, ease: EASE_PANEL }}
          >
            <div className="container-x flex h-full flex-col justify-between pb-10 pt-32 sm:pt-40">
              <nav className="flex flex-col gap-1">
                {menuLinks.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <div key={item.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: '110%' }}
                        animate={{ y: '0%' }}
                        exit={{ y: '110%', transition: { duration: 0.4, ease: EASE } }}
                        transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.07 }}
                      >
                        <Link
                          href={item.href}
                          className={`group flex items-baseline gap-6 py-1 font-serif text-5xl tracking-tighter2 transition-colors duration-500 sm:text-7xl ${
                            active ? 'text-paper' : 'text-paper/45 hover:text-paper'
                          }`}
                        >
                          <span className="meta-sm w-8 shrink-0 text-brass" data-numeric>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {item.label === 'Home' ? 'Grounds' : item.label}
                        </Link>
                      </motion.div>
                    </div>
                  );
                })}
                <div className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%', transition: { duration: 0.4, ease: EASE } }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.25 + menuLinks.length * 0.07 }}
                  >
                    <Link
                      href="/contact"
                      className="group flex items-baseline gap-6 py-1 font-serif italic text-5xl tracking-tighter2 text-brass transition-colors duration-500 hover:text-paper sm:text-7xl"
                    >
                      <span className="meta-sm w-8 shrink-0 not-italic text-brass" data-numeric>
                        {String(menuLinks.length + 1).padStart(2, '0')}
                      </span>
                      Start a project
                    </Link>
                  </motion.div>
                </div>
              </nav>

              <motion.div
                className="flex flex-col gap-6 border-t border-paper/15 pt-8 sm:flex-row sm:items-end sm:justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="space-y-1 text-sm text-paper/70">
                  <div>{studio.address.street}</div>
                  <div>
                    {studio.address.suburb} {studio.address.state} {studio.address.postcode}
                  </div>
                </div>
                <div className="space-y-1 text-sm text-paper/70">
                  <a href={studio.phoneHref} className="block hover:text-paper" data-numeric>
                    {studio.phone}
                  </a>
                  <a href={`mailto:${studio.email}`} className="block hover:text-paper">
                    {studio.email}
                  </a>
                </div>
                <div className="meta-sm text-sage">{studio.coords}</div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
