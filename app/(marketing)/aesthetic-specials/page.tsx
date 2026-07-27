import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import SpecialsContent from '@/components/specials/SpecialsContent';
import { getSpecialsPageData } from '@/lib/data/specials';

export const metadata: Metadata = {
  title: 'Aesthetic Specials',
  description:
    'Current promotions and seasonal offers on aesthetic treatments at Savannah Age Management Medicine.',
};

export const revalidate = 300;

export default async function AestheticSpecialsPage() {
  const { settings, cards, membershipPromo } = await getSpecialsPageData();

  return (
    <>
      <PageHero
        title={settings.heroTitle}
        intro={settings.heroIntro}
        image={settings.heroImage}
        imageAlt={settings.heroImageAlt}
        position="center 30%"
      />
      <SpecialsContent
        offersHeading={settings.offersHeading}
        cards={cards}
        membershipPromo={membershipPromo}
      />
    </>
  );
}
