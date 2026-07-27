import type { Metadata } from 'next';

import SimplePage from '@/components/ui/SimplePage';

export const metadata: Metadata = {
  title: 'Office Policies',
  description:
    'Appointment, cancellation and payment policies for Savannah Age Management Medicine.',
};

export default function OfficePoliciesPage() {
  return (
    <SimplePage
      title="Office Policies"
      intro="A few things worth knowing before your visit, so your appointment runs smoothly."
      body={[
        'Please arrive a few minutes early for your appointment so we have time to complete any paperwork and answer your questions before the treatment begins.',
        'We ask for at least 24 hours notice to reschedule or cancel an appointment. Late cancellations and missed appointments may be subject to a fee.',
        'Payment is due at the time of service. If you have questions about our policies, please call the office and we will be glad to help.',
      ]}
      cta={{ label: 'Contact The Office', href: '/contact' }}
    />
  );
}
