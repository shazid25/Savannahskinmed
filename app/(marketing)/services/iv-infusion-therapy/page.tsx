import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import IvInfusionContent from '@/components/services/IvInfusionContent';
import Testimonials from '@/components/home/Testimonials';
import ElevateCta from '@/components/home/ElevateCta';

export const metadata: Metadata = {
  title: 'IV Infusion Therapy & Vitamin Injections',
  description:
    'Hydration, vitamins and antioxidants delivered directly into the bloodstream for fast, efficient absorption.',
};

export default function IvInfusionTherapyPage() {
  return (
    <>
      <ServiceHero
        eyebrow="SERVICES"
        title="IV Infusion Therapy & Vitamin Injections"
        intro="Provides an efficient and luxurious way to replenish your body with vital nutrients."
        image="/images/banner-9-bg.jpg"
        imageAlt="IV Infusion Therapy & Vitamin Injections"
        position="center"
      />
      
      <IvInfusionContent />
      
      <Testimonials />
      
      <ElevateCta />
    </>
  );
}
