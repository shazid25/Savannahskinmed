import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import InjectablesTreatments from '@/components/services/InjectablesTreatments';
import BeforeAfter, { BeforeAfterSlide } from '@/components/home/BeforeAfter';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';

export const metadata: Metadata = {
  title: 'Injectables & Wrinkle Prevention',
  description:
    'Neuromodulators and dermal fillers used with a light touch, to soften lines while keeping your expressions your own.',
};

const injectablesSlides: BeforeAfterSlide[] = [
  { before: 39, after: 40, procedure: 'Dysport' },
];

export default function InjectablesPage() {
  return (
    <>
      <ServiceHero
        eyebrow="SERVICES"
        title="Injectables & Wrinkle Prevention"
        intro="Subtle yet transformative enhancements designed to rejuvenate your natural beauty."
        image="/images/banner-6-bg.jpg"
        imageAlt="A client receiving an injectable treatment"
        position="center"
      />
      
      <InjectablesTreatments />
      
      <BeforeAfter 
        eyebrow="BEFORE & AFTER PROCEDURES"
        title="Results You Can See, Confidence You Can Feel"
        slides={injectablesSlides}
        labelStyle="bottom"
      />
      
      <Testimonials />
      
      <ElevateCta />
    </>
  );
}
