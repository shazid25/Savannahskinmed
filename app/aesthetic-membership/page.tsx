import type { Metadata } from 'next';

import MembershipHero from '@/components/membership/MembershipHero';
import BeautyWithoutGuesswork from '@/components/membership/BeautyWithoutGuesswork';
import MemberBenefits from '@/components/membership/MemberBenefits';
import MembershipOptions from '@/components/membership/MembershipOptions';
import AdditionalBenefits from '@/components/membership/AdditionalBenefits';
import HowItWorks from '@/components/membership/HowItWorks';
import MembershipCta from '@/components/membership/MembershipCta';

export const metadata: Metadata = {
  title: 'Aesthetic Membership Program | Savannah Age Management Medicine',
  description: 'Maintain your aesthetic results with exclusive member pricing, flexible monthly credits, and a personalized care plan.',
};

export default function AestheticMembershipPage() {
  return (
    <main>
      <MembershipHero />
      <BeautyWithoutGuesswork />
      <MemberBenefits />
      <MembershipOptions />
      <AdditionalBenefits />
      <HowItWorks />
      <MembershipCta />
    </main>
  );
}
