import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { images } from '@/lib/unsplash';
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

      {/* Before / after, proof in one drag */}
      <section className="bg-paper text-ink">
        <div className="container-x py-16 lg:py-24">
          <Reveal className="mb-10 flex items-center gap-6">
            <span className="meta-sm text-verde" data-numeric>05</span>
            <span className="meta text-stone">Before · After</span>
            <span className="h-px flex-1 bg-ink/10" aria-hidden />
          </Reveal>
          <Reveal>
            <BeforeAfter
              beforeSrc="/images/proj/before/edinburgh-street.jpg"
              afterSrc="/images/proj/edinburgh/street.jpg"
              beforeAlt="Edinburgh Rd from the street before the works, the house hidden behind an overgrown hedge and a grey wall"
              afterAlt="The same view after: white rendered frontage, olives in sandstone-edged beds and a cobbled arrival court"
              label="Edinburgh Rd, Castlecrag · the same view"
            />
          </Reveal>
        </div>
      </section>

      <Testimonial />
      <Cta />
    </>
  );
}
