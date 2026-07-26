import BeforeAfter from '@/components/home/BeforeAfter';
import ElevateCta from '@/components/home/ElevateCta';
import ExpertsSection from '@/components/home/ExpertsSection';
import Hero from '@/components/home/Hero';
import ServicesSection from '@/components/home/ServicesSection';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <BeforeAfter />
      <Testimonials />
      <ExpertsSection />
      <ElevateCta />
    </>
  );
}
