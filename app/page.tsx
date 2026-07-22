import Link from 'next/link';
import { beforeAfters } from '@/lib/content';
import { images } from '@/lib/unsplash';
import { Hero } from '@/components/home/Hero';
import { Manifesto } from '@/components/home/Manifesto';
import { ShowcasePanels } from '@/components/home/ShowcasePanels';
import { StatsBand } from '@/components/home/StatsBand';
import { ServicesIndex } from '@/components/home/ServicesIndex';
import { TerrainSection } from '@/components/home/TerrainSection';
import { Testimonial } from '@/components/home/Testimonial';
import { BeforeAfter } from '@/components/site/BeforeAfter';
import { Reveal } from '@/components/motion/Reveal';
import { Cta } from '@/components/site/Cta';

export default function HomePage() {
  const featuredBA = beforeAfters[0];

  return (
    <>
      <Hero />
      <Manifesto />
      <ShowcasePanels />
      <StatsBand />
      <ServicesIndex />
      <TerrainSection />

      {/* Before / after — proof in one drag */}
      <section className="bg-paper text-ink">
        <div className="container-x py-28 lg:py-36">
          <Reveal className="mb-14 flex items-center gap-6">
            <span className="meta-sm text-brass" data-numeric>06</span>
            <span className="meta text-stone">Before — After</span>
            <span className="h-px flex-1 bg-ink/10" aria-hidden />
            <Link href="/portfolio" className="meta link-underline hidden py-1 sm:inline-block">
              More projects
            </Link>
          </Reveal>
          <Reveal>
            <BeforeAfter
              beforeSrc={images[featuredBA.before].src}
              afterSrc={images[featuredBA.after].src}
              beforeAlt={images[featuredBA.before].alt}
              afterAlt={images[featuredBA.after].alt}
              label={featuredBA.label}
            />
          </Reveal>
        </div>
      </section>

      <Testimonial />
      <Cta />
    </>
  );
}
