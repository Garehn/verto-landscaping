import { FadeIn } from './FadeIn';

type Props = {
  children: React.ReactNode;
  attribution?: string;
};

export function PullQuote({ children, attribution }: Props) {
  return (
    <FadeIn as="section" className="container-x py-28 lg:py-44">
      <blockquote className="max-w-4xl mx-auto text-center">
        <p className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tighter2 text-balance">
          &ldquo;{children}&rdquo;
        </p>
        {attribution && (
          <footer className="mt-8 text-xs uppercase tracking-[0.2em] text-stone">
            {attribution}
          </footer>
        )}
      </blockquote>
    </FadeIn>
  );
}
