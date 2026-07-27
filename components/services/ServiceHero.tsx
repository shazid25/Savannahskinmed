import Image from 'next/image';
import Link from 'next/link';

import BookAppointmentButton from '@/components/booking/BookAppointmentButton';
import { ArrowRight } from '@/components/icons';

type ServiceHeroProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  position?: string;
  hideButtons?: boolean;
};

export default function ServiceHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  position = 'center',
  hideButtons = false,
}: ServiceHeroProps) {
  return (
    <section className="relative flex min-h-[690px] items-center overflow-hidden bg-[#b9bcc2] lg:min-h-[85vh] lg:max-h-[880px] py-24 lg:py-32">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-black/10" />

      <div className="shell relative z-10 pt-20 pb-4 md:pb-6 lg:pb-8">
        <div className="mx-auto max-w-[780px] text-center">
          {eyebrow && <p className="eyebrow mb-4 animate-fadeUp text-white/90">{eyebrow}</p>}
          <h1 className="display-1 animate-fadeUp text-white text-shadow-hero [text-wrap:initial] [animation-delay:100ms]">
            {title}
          </h1>

          {intro && (
            <p className="mx-auto mt-7 max-w-[645px] animate-fadeUp text-[20px] leading-[1.7] text-white text-shadow-hero [animation-delay:150ms]">
              {intro}
            </p>
          )}

          {!hideButtons && (
            <div className="mt-9 flex flex-col animate-fadeUp items-center justify-center gap-y-6 sm:flex-row sm:gap-x-8 [animation-delay:240ms]">
              <BookAppointmentButton />

              <Link
                href="#offerings"
                className="group inline-flex items-center justify-center gap-4 font-sans text-[13px] font-medium uppercase tracking-widest2 text-white"
              >
                Learn More
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-navy transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
