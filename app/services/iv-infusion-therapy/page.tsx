import type { Metadata } from 'next';

import ServiceHero from '@/components/services/ServiceHero';
import IvInfusionContent from '@/components/services/IvInfusionContent';

export const metadata: Metadata = {
  title: 'IV Infusion Therapy & Vitamin Injections',
  description:
    'Hydration, vitamins and antioxidants delivered directly into the bloodstream for fast, efficient absorption.',
};

export default function IvInfusionTherapyPage() {
  return (
    <>
      <ServiceHero
        title="IV Infusion Therapy & Vitamin Injections"
        intro="Hydration, vitamins and antioxidants delivered directly into the bloodstream for fast, efficient absorption."
        image="/images/banner-13-bg.avif"
        imageAlt="IV Infusion Therapy & Vitamin Injections"
        position="center"
        hideButtons={true}
      />
      
      <IvInfusionContent />
    </>
  );
}
