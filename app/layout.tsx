import type { Metadata } from 'next';
import { Inter, Fraunces, IBM_Plex_Mono } from 'next/font/google';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Preloader } from '@/components/motion/Preloader';
import { IntroProvider } from '@/components/motion/intro';
import { studio } from '@/lib/content';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Verto Landscapes — Garden design & build studio, Sydney',
    template: '%s · Verto Landscapes',
  },
  description:
    'A small garden design and build studio in Castlecrag, Sydney. Considered outdoor spaces for the North Shore and Northern Beaches.',
  openGraph: {
    title: 'Verto Landscapes',
    description:
      'A small garden design and build studio in Castlecrag, Sydney. Considered outdoor spaces for the North Shore and Northern Beaches.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LandscapingBusiness',
  name: studio.name,
  founder: { '@type': 'Person', name: studio.founder },
  email: studio.email,
  telephone: '+61 488 728 767',
  address: {
    '@type': 'PostalAddress',
    streetAddress: studio.address.street,
    addressLocality: studio.address.suburb,
    addressRegion: studio.address.state,
    postalCode: studio.address.postcode,
    addressCountry: 'AU',
  },
  areaServed: 'Sydney, NSW',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${plexMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <IntroProvider>
          <SmoothScroll>
            <Preloader />
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </IntroProvider>
      </body>
    </html>
  );
}
