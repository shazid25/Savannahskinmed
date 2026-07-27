import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import SpecialsContent from '@/components/specials/SpecialsContent';

export const metadata: Metadata = {
  title: 'Aesthetic Specials',
  description:
    'Current promotions and seasonal offers on aesthetic treatments at Savannah Age Management Medicine.',
};

export default function AestheticSpecialsPage() {
  return (
    <>
      <PageHero
        title="Aesthetic Specials"
        intro="Treat yourself to exclusive offers on our most popular aesthetic services."
        image="/images/banner-15-bg.jpg"
        imageAlt="Three clients smiling in white spa robes"
        position="center 30%"
      />
      <SpecialsContent />
    </>
  );
}
