'use client';

import Image from 'next/image';
import { useState } from 'react';

import Reveal from '@/components/ui/Reveal';
import { ChevronLeft, ChevronRight, GoogleGlyph, QuoteMark, StarIcon } from '@/components/icons';

const reviews = [
  {
    name: 'Lisa B.',
    quote:
      'I love coming here! I was excited to try laser hair removal for the first time and Becca was amazing! She explained the whole procedure and made sure I was comfortable the entire time. I also received a dermaplaning facial and it was top of the line!',
  },
  {
    name: 'Penny M.',
    quote:
      'I have had laser treatments with Becca for at least 16 years and would not go to anyone else. She is professional and very knowledgeable concerning lasers. I trust her 100%! The office is professional, clean and runs many specials.',
  },
];

function ReviewCard({ name, quote }: (typeof reviews)[number]) {
  return (
    <article className="flex h-full flex-col rounded-xl bg-white p-7 sm:p-9">
      <QuoteMark className="h-6 w-8 text-rose-light" />

      <p className="mt-5 flex-1 text-[13.5px] leading-[1.85] text-muted">{quote}</p>

      <div className="mt-7 flex items-center gap-3.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white shadow-[0_2px_10px_rgba(19,40,92,0.16)]">
          <GoogleGlyph className="h-[18px] w-[18px]" />
        </span>
        <div>
          <p className="font-sans text-[14px] font-semibold text-navy">{name}</p>
          <div className="mt-0.5 flex gap-[3px] text-[#F5A623]">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-3.5 w-3.5" />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const rotate = (step: number) =>
    setIndex((current) => (current + step + reviews.length) % reviews.length);

  const ordered = [...reviews.slice(index), ...reviews.slice(0, index)];

  return (
    <section className="pb-16 sm:pb-20 lg:pb-[104px]">
      <div className="shell-wide">
        <div className="relative overflow-hidden rounded-[26px] bg-rose px-6 py-14 sm:px-10 lg:px-16 lg:py-[104px]">
          {/* The site's own rose panel artwork — a faint helix watermark */}
          <Image
            src="/images/contact-bg.jpg"
            alt=""
            fill
            sizes="(max-width: 1760px) 100vw, 1700px"
            className="object-cover"
            aria-hidden="true"
          />

          <Reveal className="relative z-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-[660px]">
                <p className="eyebrow mb-4 text-white/85">Patient Testimonials</p>
                <h2 className="display-2 text-white [text-wrap:initial]">
                  Real Results, True Confidence
                </h2>
                <p className="mt-5 max-w-[420px] text-[14.5px] leading-[1.85] text-white/90">
                  Our clients love their transformations. See how we&rsquo;ve helped them look and
                  feel their best.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => rotate(-1)}
                  aria-label="Previous testimonial"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/70 text-white transition-colors hover:bg-white hover:text-rose-deep"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => rotate(1)}
                  aria-label="Next testimonial"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-rose-deep transition-colors hover:bg-cream"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              key={index}
              className="mt-10 grid animate-fadeUp gap-6 md:grid-cols-2 lg:mt-14"
              aria-live="polite"
            >
              {ordered.map((review) => (
                <ReviewCard key={review.name} {...review} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
