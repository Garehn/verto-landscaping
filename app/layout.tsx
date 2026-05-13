import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
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

export const metadata: Metadata = {
  title: {
    default: 'Verto Landscaping — Garden design & build studio',
    template: '%s · Verto Landscaping',
  },
  description:
    'A small landscape design and build studio building considered outdoor spaces. Sydney, NSW.',
  openGraph: {
    title: 'Verto Landscaping',
    description:
      'A small landscape design and build studio building considered outdoor spaces. Sydney, NSW.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
