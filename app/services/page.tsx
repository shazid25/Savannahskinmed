import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/ui/PageHero';
import { ArrowRight } from '@/components/icons';
import { serviceContent } from '@/lib/serviceContent';

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'Medical-grade facials, laser treatments, injectables, IV therapy and age management care in Pooler and Statesboro, GA.',
};

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        intro="Science-backed treatments designed to rejuvenate your skin, restore your energy and enhance your confidence."
        image="/images/photo-content-11-img.jpg"
        imageAlt="Treatment room at Savannah Age Management Medicine"
        position="center 45%"
      />

      <section className="section bg-white">
        <div className="shell">
          <ul className="grid gap-3.5 md:grid-cols-2">
            {serviceContent.map((service, i) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className={`group flex h-full flex-col gap-3 rounded-lg px-7 py-7 transition-colors duration-300 ${
                    i % 2 === 0 ? 'bg-mint hover:bg-mint/60' : 'bg-aqua hover:bg-aqua/60'
                  }`}
                >
                  <span className="flex items-center justify-between gap-6">
                    <span className="font-serif text-[20px] leading-snug text-navy">
                      {service.title}
                    </span>
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-rose-light text-white transition-all duration-300 group-hover:bg-rose-deep group-hover:translate-x-0.5">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                  <span className="text-[14px] leading-[1.8] text-muted">{service.intro}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
