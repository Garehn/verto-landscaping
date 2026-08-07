import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { beforeAfter } from '@/lib/content';
import { Hero } from '@/components/home/Hero';
import { Statement } from '@/components/home/Statement';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { ServiceCards } from '@/components/home/ServiceCards';
import { StatsBand } from '@/components/home/StatsBand';
import { TerrainSection } from '@/components/home/TerrainSection';
import { Testimonial } from '@/components/home/Testimonial';
import { BeforeAfter } from '@/components/site/BeforeAfter';
import { Reveal } from '@/components/motion/Reveal';
import { Cta } from '@/components/site/Cta';

export default function HomePage() {
  // Drop a compressed loop at public/video/hero.mp4 and the hero upgrades
  // itself from still to cinematic video automatically.
  const heroVideo = fs.existsSync(path.join(process.cwd(), 'public/video/hero.mp4'))
    ? '/video/hero.mp4'
    : undefined;

  return (
    <>
      <Hero videoSrc={heroVideo} />
      <Statement />
      <FeaturedProjects />
      <ServiceCards />
      <StatsBand />
      <TerrainSection />

      {/* Before / after, proof in one drag. Every pair is the same position on
          the same site, shot before the works and again on completion. */}
      <section className="bg-paper text-ink">
        <div className="container-x py-16 lg:py-24">
          <Reveal className="mb-10 flex items-center gap-6">
            <span className="meta-sm text-verde" data-numeric>05</span>
            <span className="meta text-stone">Before · After</span>
            <span className="h-px flex-1 bg-ink/10" aria-hidden />
          </Reveal>
          <div className="grid gap-x-8 gap-y-12 lg:grid-cols-2 lg:gap-x-10">
            {beforeAfter.map((pair, i) => (
              <Reveal key={pair.id} delay={(i % 2) * 0.1}>
                <BeforeAfter
                  beforeSrc={pair.before}
                  afterSrc={pair.after}
                  beforeAlt={pair.beforeAlt}
                  afterAlt={pair.afterAlt}
                  label={pair.label}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonial />
      <Cta />
    </>
  );
}
