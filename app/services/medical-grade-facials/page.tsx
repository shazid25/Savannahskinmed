import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import OfferingsList from '@/components/services/OfferingsList';
import BeforeAfter, { BeforeAfterSlide } from '@/components/home/BeforeAfter';
import FaqSection from '@/components/services/FaqSection';
import ExpertProfile from '@/components/services/ExpertProfile';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';

export const metadata: Metadata = {
  title: 'Medical Grade Facials',
  description:
    'Clinical facials built around your skin type, tone and goals — from deep cleansing to dermaplaning and resurfacing.',
};

const facialSlides: BeforeAfterSlide[] = [
  { before: 21, after: 22, procedure: 'Medical-Grade Facial' },
  { before: 23, after: 24, procedure: 'Chemical Peel' },
];

export default function MedicalGradeFacialsPage() {
  return (
    <>
      <ServiceHero
        eyebrow="SERVICES"
        title="Medical-Grade Facials"
        intro="Rejuvenate your skin with our customized treatments designed to address your specific needs."
        image="/images/image-mosaic-8-img.jpg"
        imageAlt="A client receiving a medical-grade facial"
        position="center"
      />
      
      <OfferingsList />
      
      <BeforeAfter 
        eyebrow="WHAT TO EXPECT BEFORE AND AFTER"
        title="Results You Can See, Confidence You Can Feel"
        slides={facialSlides}
      />
      
      <FaqSection />
      
      <ExpertProfile />
      
      <Testimonials />
      
      <ElevateCta />
    </>
  );
}
