import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import CherryFinancing from '@/components/financing/CherryFinancing';

export const metadata: Metadata = {
  title: 'Financing Options',
  description:
    'Flexible payment and financing options for aesthetic treatments at Savannah Age Management Medicine, powered by Cherry.',
};

export default function FinancingOptionsPage() {
  return (
    <>
      <PageHero
        title="Financing Options"
        intro="Flexible ways to pay, so the treatment plan that is right for your skin is also right for your budget."
        image="/images/banner-13-bg.jpg"
        imageAlt="Savannah Age Management Medicine"
        position="center 40%"
      />

      <section className="section bg-white">
        <div className="shell-narrow">
          <CherryFinancing />
        </div>
      </section>
    </>
  );
}
