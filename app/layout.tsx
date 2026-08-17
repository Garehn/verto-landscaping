import type { Metadata } from 'next';
import { Inter, Cormorant, IBM_Plex_Mono } from 'next/font/google';
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

// Cormorant matches the high-contrast serif of the Verto Landscapes logo.
const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Verto Landscapes, Landscape design & construction, Sydney',
    template: '%s · Verto Landscapes',
  },
  description:
    'Landscape design and construction studio on Sydney’s Lower North Shore. Paving, stonework, retaining walls, pool surrounds, decking, driveways and planting.',
  openGraph: {
    title: 'Verto Landscapes',
    description:
      'Landscape design and construction studio on Sydney’s Lower North Shore. Paving, stonework, retaining walls, pool surrounds, decking, driveways and planting.',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: studio.name,
  description:
    'Landscape design and construction studio specialising in hardscaping: paving, stonework, retaining walls, pool surrounds, decking, driveways and structures.',
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
  areaServed: studio.suburbs.map((name) => ({ '@type': 'Place', name })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${plexMono.variable}`}>
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
