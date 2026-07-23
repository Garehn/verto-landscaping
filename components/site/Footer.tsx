import Link from 'next/link';
import Image from 'next/image';
import { studio, nav } from '@/lib/content';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink text-paper">
      <div className="container-x pb-8 pt-20 lg:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/images/real/logo-white.png" alt="Verto Landscapes, Design & Construct" width={220} height={176} className="mb-8 h-28 w-auto opacity-95" />
            <div className="font-serif italic text-4xl tracking-tighter2 text-balance md:text-5xl">
              Quiet gardens, <br className="hidden md:inline" /> built to last.
            </div>
            <Link href="/contact" className="btn-cta group mt-10">
              Begin a project <span aria-hidden className="arrow">→</span>
            </Link>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <div className="meta-sm mb-5 text-sage">Studio</div>
            <ul className="space-y-2 text-sm text-paper/75">
              <li>{studio.founder} · Founder</li>
              <li>{studio.address.street}</li>
              <li>
                {studio.address.suburb} {studio.address.state} {studio.address.postcode}
              </li>
              <li className="pt-2">
                <a href={studio.phoneHref} className="hover:text-paper" data-numeric>
                  {studio.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${studio.email}`} className="hover:text-paper">
                  {studio.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="meta-sm mb-5 text-sage">Site</div>
            <ul className="space-y-2 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/75 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="meta-sm mb-5 text-sage">Field</div>
            <ul className="space-y-2 text-sm text-paper/75">
              <li>{studio.area}</li>
              <li className="meta-sm pt-2 text-sage">{studio.coords}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
          <div>
            © {new Date().getFullYear()} {studio.name}. All rights reserved.
          </div>
          <div className="meta-sm">Garden design &amp; build · Castlecrag, Sydney</div>
        </div>
      </div>

      {/* Giant cropped wordmark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden leading-none"
      >
        <div className="container-x">
          <div className="translate-y-[0.24em] font-serif text-[27vw] leading-[0.8] tracking-tighter2 text-paper/[0.07]">
            Verto
          </div>
        </div>
      </div>
    </footer>
  );
}
