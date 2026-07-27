import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import VaginalRejuvenationOfferings from '@/components/services/VaginalRejuvenationOfferings';
import DrCollinsProfile from '@/components/services/DrCollinsProfile';
import ElevateCta from '@/components/home/ElevateCta';

export const metadata: Metadata = {
  title: 'Vaginal Rejuvenation',
  description:
    'A discreet and effective solution to restore comfort, confidence, and intimacy.',
};

export default function VaginalRejuvenationPage() {
  return (
    <>
      <ServiceHero
        eyebrow="SERVICES"
        title="Vaginal Rejuvenation"
        intro="A discreet and effective solution to restore comfort, confidence, and intimacy."
        image="/images/banner-10-bg.jpg"
        imageAlt="Vaginal Rejuvenation"
        position="center"
      />
      
      <VaginalRejuvenationOfferings />
      
      <DrCollinsProfile />
      
      <ElevateCta />
    </>
  );
}
