import type { Metadata } from 'next';

import SimplePage from '@/components/ui/SimplePage';

export const metadata: Metadata = {
  title: 'Aesthetic Specials',
  description:
    'Current promotions and seasonal offers on aesthetic treatments at Savannah Age Management Medicine.',
};

export default function AestheticSpecialsPage() {
  return (
    <SimplePage
      title="Aesthetic Specials"
      intro="Seasonal offers and promotions on the treatments our clients ask for most."
      image="/images/hero-bg.jpg"
      imageAlt="Clients enjoying the results of their aesthetic treatments"
      body={[
        'We run specials throughout the year on facials, laser packages, injectables and IV therapy.',
        'Offers change regularly, so call the office or follow us on social media for what is currently available — and ask about our membership program if you would like preferred pricing year round.',
      ]}
      cta={{ label: 'Contact The Office', href: '/contact' }}
    />
  );
}
