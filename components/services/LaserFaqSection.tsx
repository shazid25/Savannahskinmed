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
    question: 'What is Laser Hair Removal?',
    answer: 'Laser hair removal is a medical procedure that uses a concentrated beam of light (laser) to remove unwanted hair. During laser hair removal, a laser emits a light that is absorbed by the pigment (melanin) in the hair. The light energy is converted to heat, which damages the tube-shaped sacs within the skin (hair follicles) that produce hairs. This damage inhibits or delays future hair growth.',
  },
  {
    question: 'Will The Hair Grow Back And How Soon Is It?',
    answer: 'Although laser hair removal effectively delays hair growth for long periods, it usually doesn\'t result in permanent hair removal. Multiple laser hair removal treatments are needed for initial hair removal, and maintenance treatments might be needed as well. Laser hair removal is most effective for people who have light skin and dark hair, but it can be successfully used on all skin types.',
  },
  {
    question: 'How Long Does The Procedure Take?',
    answer: 'The length of the procedure depends on the size of the area being treated. A small area such as the upper lip can take just a few minutes, while a larger area such as the back can take up to an hour.',
  },
];

export default function LaserFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section bg-mist">
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
                      className={`grid transition-all duration-500 ease-in-out ${
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
