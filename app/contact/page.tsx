import type { Metadata } from 'next';
import { contact, studio } from '@/lib/content';
import { FadeIn } from '@/components/site/FadeIn';
import { QuoteForm } from '@/components/contact/QuoteForm';

export const metadata: Metadata = { title: 'Request a quote' };

export default function ContactPage() {
  return (
    <section className="container-x pt-40 pb-32 lg:pt-48 lg:pb-44">
      <FadeIn>
        <div className="meta mb-6 text-sage">Contact</div>
        <h1 className="display max-w-5xl text-balance">
          Request <span className="display-italic">a quote.</span>
        </h1>
      </FadeIn>

      <div className="mt-16 lg:mt-20 grid gap-16 lg:gap-24 md:grid-cols-12">
        <FadeIn as="div" className="md:col-span-5">
          <p className="body-lg text-paper/75 text-pretty">{contact.lead}</p>

          <div className="mt-12 space-y-8">
            <ContactBlock label="Founder" value={studio.founder} />
            <ContactBlock label="Email" value={studio.email} />
            <ContactBlock label="Phone" value={studio.phone} />
            <ContactBlock
              label="Studio"
              value={`${studio.address.street}, ${studio.address.suburb} ${studio.address.state} ${studio.address.postcode}`}
            />
            <ContactBlock label="Service area" value={studio.area} />
            <ContactBlock label="Studio hours" value={'Mon–Fri · 8am–5pm'} />
          </div>
        </FadeIn>

        <FadeIn as="div" className="md:col-span-7" delay={0.1}>
          <QuoteForm />
        </FadeIn>
      </div>
    </section>
  );
}

function ContactBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="meta-sm mb-2 text-sage">{label}</div>
      <div className="font-serif text-2xl tracking-tighter2">{value}</div>
    </div>
  );
}
