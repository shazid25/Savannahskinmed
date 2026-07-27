'use client';

import { useMemo, useState } from 'react';

import MembershipPromoBanner from '@/components/specials/MembershipPromoBanner';
import OfferCard from '@/components/specials/OfferCard';
import Reveal from '@/components/ui/Reveal';
import { specialCards, type Location } from '@/lib/specialsData';

type Filter = 'all' | Location;

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'statesboro', label: 'Statesboro' },
  { value: 'pooler', label: 'Pooler' },
];

export default function SpecialsContent() {
  const [filter, setFilter] = useState<Filter>('all');

  const visibleCards = useMemo(
    () =>
      specialCards.filter(
        (card) => filter === 'all' || !card.locations || card.locations.includes(filter),
      ),
    [filter],
  );

  return (
    <section className="section bg-cream">
      <div className="shell">
        <Reveal className="text-center">
          <h2 className="display-3 mb-8">Select Your Location</h2>
          <div className="mb-14 inline-flex flex-wrap items-center justify-center gap-3">
            {filters.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={filter === value}
                className={`rounded-full border px-8 py-3 font-sans text-[14px] font-medium transition-colors duration-300 ${
                  filter === value
                    ? 'border-navy bg-navy text-white'
                    : 'border-[#d8d5cc] bg-transparent text-navy hover:border-navy'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="mb-14">
          <MembershipPromoBanner />
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2">
          {visibleCards.map((card) => (
            <Reveal key={card.id}>
              <OfferCard card={card} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
