import type { Metadata } from 'next';

import SimplePage from '@/components/ui/SimplePage';

export const metadata: Metadata = {
  title: 'Financing Options',
  description:
    'Flexible payment and financing options for aesthetic treatments at Savannah Age Management Medicine.',
};

export default function FinancingOptionsPage() {
  return (
    <SimplePage
      title="Financing Options"
      intro="Flexible ways to pay, so the treatment plan that is right for your skin is also right for your budget."
      body={[
        'We accept all major credit cards and offer third-party financing so you can spread the cost of a treatment plan over time.',
        'Our aesthetic membership program is another way to make consistent care more affordable, with a monthly credit and preferred pricing on additional services.',
        'Call the office and we will walk you through the options available for the treatments you are considering.',
      ]}
      cta={{ label: 'Contact The Office', href: '/contact' }}
    />
  );
}
