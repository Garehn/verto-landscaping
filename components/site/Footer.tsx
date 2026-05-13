import Link from 'next/link';
import { studio, nav } from '@/lib/content';

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-x py-20 lg:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="font-serif italic text-4xl md:text-5xl tracking-tighter2 text-balance">
              Quiet gardens, <br className="hidden md:inline" /> built to last.
            </div>
            <Link
              href="/contact"
              className="mt-8 inline-block text-sm uppercase tracking-[0.2em] border-b border-paper/40 hover:border-paper pb-1"
            >
              Begin a project →
            </Link>
          </div>
          <div className="md:col-span-3 md:col-start-8">
            <div className="text-xs uppercase tracking-[0.2em] text-paper/50 mb-4">Studio</div>
            <ul className="space-y-2 text-sm text-paper/80">
              <li>{studio.email}</li>
              <li>{studio.phone}</li>
              <li className="text-paper/60">{studio.area}</li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-paper/50 mb-4">Site</div>
            <ul className="space-y-2 text-sm">
              {nav.slice(0, -1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-paper/80 hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-paper/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-paper/50">
          <div>© {new Date().getFullYear()} {studio.name}. All rights reserved.</div>
          <div>Studio practice — Sydney, AU</div>
        </div>
      </div>
    </footer>
  );
}
