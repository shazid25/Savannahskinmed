import type { Metadata } from 'next';

import ContactForm from '@/components/contact/ContactForm';
import ContactInfo from '@/components/contact/ContactInfo';
import PageHero from '@/components/ui/PageHero';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Reach out to Savannah Age Management Medicine in Pooler and Statesboro, GA to book your medical-grade facial or ask any questions.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        intro="We're here to help you achieve glowing, healthy skin. Reach out today to book your medical-grade facial or to ask any questions!"
        image="/images/clinic_hero_2.jpg"
        imageAlt="The calm, welcoming waiting lounge at Savannah Age Management Medicine"
        position="center 45%"
      />
      <ContactInfo />
      <ContactForm />
    </>
  );
}
