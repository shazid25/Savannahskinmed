import type { Metadata } from 'next';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { manrope, playfair } from '@/lib/fonts';
import '../globals.css';

// Safety net so the DB-backed Footer picks up admin edits (or a newly
// connected database) within a few minutes even without an explicit
// revalidatePath call.
export const revalidate = 300;

export const metadata: Metadata = {
  metadataBase: new URL('https://www.agemanagementmed.com'),
  title: {
    default: 'Savannah Age Management Medicine | Medical Aesthetics in Pooler, GA',
    template: '%s | Savannah Age Management Medicine',
  },
  description:
    'Customized medical aesthetic solutions to enhance your glow and restore youthful skin. Medical-grade facials, laser treatments, injectables and IV therapy in Pooler and Statesboro, GA.',
  openGraph: {
    title: 'Savannah Age Management Medicine',
    description:
      'Redefining beauty with precision and care — medical-grade aesthetics tailored to you.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        {/* Without JS the scroll-reveal elements must not stay hidden. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
