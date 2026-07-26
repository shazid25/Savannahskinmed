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
    question: 'What Are Medical-Grade Facials?',
    answer: 'Medical-grade facials are highly customizable treatments that use clinical-grade products and tools. They are performed by trained medical aestheticians and are designed to produce more significant results than standard spa facials by targeting deeper skin layers and specific concerns.',
  },
  {
    question: 'How Do They Work?',
    answer: 'These facials work by deeply exfoliating the skin, extracting impurities, and infusing targeted serums. Depending on the specific treatment, they can also stimulate collagen production, improve cellular turnover, and enhance the absorption of active ingredients.',
  },
  {
    question: 'What Can Be Treated With A Medical-Grade Facial?',
    answer: 'They can treat a wide range of concerns including acne, hyperpigmentation, fine lines, uneven texture, dullness, and rosacea. We customize the treatment based on your unique skin profile.',
  },
];

export default function FaqSection() {
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
