import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import LaserRejuvenationOfferings from '@/components/services/LaserRejuvenationOfferings';
import LaserRejuvenationConsultation from '@/components/services/LaserRejuvenationConsultation';
import BeforeAfter, { BeforeAfterSlide } from '@/components/home/BeforeAfter';
import LaserRejuvenationFaq from '@/components/services/LaserRejuvenationFaq';
import ExpertProfile from '@/components/services/ExpertProfile';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';

export const metadata: Metadata = {
  title: 'Laser Skin Rejuvenation',
  description:
    'Restore your confidence and glow. Laser treatments to smooth, clear, and revitalize your skin.',
};

const laserRejuvenationSlides: BeforeAfterSlide[] = [
  { before: 55, after: 56, procedure: 'CO2 Laser Resurfacing' },
  { before: 57, after: 58, procedure: 'CO2 Laser Resurfacing' },
  { before: 25, after: 26, procedure: 'Non Ablative Laser - Hyperpigmentation' },
  { before: 27, after: 28, procedure: 'Non Ablative Laser - Hyperpigmentation' },
  { before: 29, after: 30, procedure: 'Non Ablative Laser - Hyperpigmentation' },
  { before: 31, after: 32, procedure: 'Microneedling' },
  { before: 33, after: 34, procedure: 'Microneedling' },
];

export default function LaserSkinRejuvenationPage() {
  return (
    <>
      <ServiceHero
        eyebrow="SERVICES"
        title="Laser Skin Rejuvenation"
        intro="Designed to refine, refresh, and restore your skin's youthful glow."
        image="/images/banner-7-bg.jpg"
        imageAlt="A client receiving laser skin rejuvenation treatment"
        position="center"
      />
      
      <LaserRejuvenationOfferings />
      
      <LaserRejuvenationConsultation />
      
      <BeforeAfter 
        eyebrow="BEFORE & AFTER PROCEDURES"
        title="Results You Can See, Confidence You Can Feel"
        slides={laserRejuvenationSlides}
        labelStyle="bottom"
      />
      
      <LaserRejuvenationFaq />
      
      <ExpertProfile />
      
      <Testimonials />
      
      <ElevateCta />
    </>
  );
}
