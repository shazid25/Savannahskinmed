'use client';

import MembershipPromoBanner from '@/components/specials/MembershipPromoBanner';
import OfferCard from '@/components/specials/OfferCard';
import Reveal from '@/components/ui/Reveal';
import { specialCards } from '@/lib/specialsData';

export default function SpecialsContent() {
  return (
    <section className="section bg-cream">
      <div className="shell">
        <Reveal className="text-center">
          <h2 className="display-3 mb-8">Explore Our Offers</h2>
        </Reveal>
      </div>

      <Reveal className="mb-14 mx-auto max-w-[1440px] relative">
        <MembershipPromoBanner />
      </Reveal>

      <div className="shell">
        <div className="grid gap-8 sm:grid-cols-2">
          {specialCards.map((card, i) => (
            <Reveal key={card.id} delay={(i % 2) * 90}>
              <OfferCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
