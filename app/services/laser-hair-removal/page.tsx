import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import LaserOfferingsList from '@/components/services/LaserOfferingsList';
import BeforeAfter, { BeforeAfterSlide } from '@/components/home/BeforeAfter';
import LaserFaqSection from '@/components/services/LaserFaqSection';
import ExpertProfile from '@/components/services/ExpertProfile';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';

export const metadata: Metadata = {
  title: 'Laser Hair Removal',
  description:
    'Comfortable, effective laser hair reduction delivered by providers with decades of combined laser experience.',
};

const laserSlides: BeforeAfterSlide[] = [
  { before: 19, after: 20, procedure: 'Laser Hair Removal' },
];

export default function LaserHairRemovalPage() {
  return (
    <>
      <ServiceHero
        eyebrow="SERVICES"
        title="Laser Hair Removal"
        intro="State-of-the-art laser hair removal services designed to achieve a flawless, hair-free look."
        image="/images/banner-4-bg.jpg"
        imageAlt="A client receiving laser hair removal treatment"
        position="center"
      />
      
      <LaserOfferingsList />
      
      <BeforeAfter 
        eyebrow="WHAT TO EXPECT BEFORE AND AFTER"
        title="Results You Can See, Confidence You Can Feel"
        slides={laserSlides}
        labelStyle="pill"
      />
      
      <LaserFaqSection />
      
      <ExpertProfile />
      
      <Testimonials />
      
      <ElevateCta />
    </>
  );
}
