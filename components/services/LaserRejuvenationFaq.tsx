'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { ChevronRight } from '@/components/icons';

type FaqItem = {
  question: string;
  answer: React.ReactNode;
};

const faqs: FaqItem[] = [
  {
    question: 'What is Laser Skin Rejuvenation?',
    answer: 'Laser skin rejuvenation refers to a variety of non-surgical treatments that use laser light energy to improve the appearance of the skin. These treatments can target specific concerns like sun damage, wrinkles, acne scars, and uneven pigmentation by either removing damaged outer layers of skin or stimulating collagen production beneath the surface.',
  },
  {
    question: 'What Is The Downtime For Laser Treatments?',
    answer: 'The downtime varies significantly depending on the specific laser used. Non-ablative lasers often have minimal to no downtime, with some temporary redness. Ablative lasers (like CO2), which offer more dramatic results, require more downtime as the skin heals, typically ranging from a few days to a week or more of recovery.',
  },
  {
    question: 'Is Laser Skin Rejuvenation Painful?',
    answer: 'Most patients tolerate laser treatments well. We use topical numbing creams and specialized cooling devices to ensure your comfort during the procedure. The sensation is often described as a warm prickling or the snapping of a rubber band against the skin. We will discuss pain management options tailored to your specific treatment during your consultation.',
  },
];

export default function LaserRejuvenationFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section bg-mist pt-0">
      <div className="shell">
        <Reveal>
          <SectionHeading title="Frequently Asked Questions" />
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-12 max-w-[900px] rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-12">
            <div className="flex flex-col gap-6">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="group">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="flex w-full items-start text-left"
                    >
                      <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-90 text-rose' : 'text-navy'}`}>
                        <ChevronRight className="h-4 w-4" />
                      </span>
                      <span className="ml-4 font-serif text-[20px] text-navy sm:text-[22px]">
                        {faq.question}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pl-10 pt-4 text-[15px] leading-[1.8] text-muted">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
