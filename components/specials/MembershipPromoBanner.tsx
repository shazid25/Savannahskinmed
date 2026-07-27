import Image from 'next/image';

import RequestButton from '@/components/booking/RequestButton';

const bullets = [
  'Members-only pricing on popular treatments',
  'Simple monthly payment structure',
  'Savings on sexual function and PRP add-ons',
];

export default function MembershipPromoBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#a97c5c] to-[#e9caa4]">
      <Image
        src="/images/grid-9-img.jpg"
        alt="Aesthetic Membership Program"
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: 'right center' }}
      />

      <div className="relative px-8 py-14 sm:px-12 lg:px-16 lg:py-20">
        <div className="max-w-[560px]">
          <h2 className="display-2 text-white">
            Aesthetic <em className="italic">Membership</em> Program
          </h2>
          <p className="mt-4 font-serif text-[20px] text-white">
            Exclusive Savings, Elevated Care
          </p>
          <p className="mt-6 max-w-[480px] text-[15.5px] leading-[1.75] text-white/95">
            Enjoy your favorite treatments with more flexibility and less upfront cost. Our
            membership program gives you access to preferred pricing and added value across a
            range of aesthetic services.
          </p>

          <ul className="mt-6 space-y-2">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-[15px] text-white">
                <span aria-hidden="true">&bull;</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <RequestButton className="mt-9" withArrow>
            Request More Details
          </RequestButton>
        </div>
      </div>
    </div>
  );
}
