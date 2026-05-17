import Link from 'next/link';
import { FadeIn } from './FadeIn';

type Props = {
  title?: string;
  body?: string;
  href?: string;
  cta?: string;
};

export function Cta({
  title = 'Have a project in mind?',
  body = 'Tell us about the garden. We reply to every enquiry within two business days.',
  href = '/contact',
  cta = 'Request a quote',
}: Props) {
  return (
    <section className="bg-cream">
      <div className="container-x py-24 lg:py-36">
        <FadeIn className="grid gap-10 md:grid-cols-12 md:items-end">
          <h2 className="md:col-span-7 display display-italic text-balance">{title}</h2>
          <div className="md:col-span-5 md:pl-8">
            <p className="body-lg max-w-md mb-8 text-pretty">{body}</p>
            <Link href={href} className="group btn-primary">
              {cta}
              <span aria-hidden className="arrow">→</span>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
