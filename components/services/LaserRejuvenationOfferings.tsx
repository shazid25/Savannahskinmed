import Reveal from '@/components/ui/Reveal';

export default function LaserRejuvenationOfferings() {
  return (
    <section id="offerings" className="section bg-mist pt-0 lg:pt-0">
      <div className="shell relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
        <Reveal>
          <div className="mx-auto max-w-[900px] rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
            <div className="text-center">
              <h2 className="display-3 mb-4 text-navy">Laser Skin Rejuvenation Offerings</h2>
              <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8]">
                We offer a number of state-of-the-art laser and non-laser procedures, designed to provide a range of solutions based on comfort level, price point, and number of desired treatments.
              </p>
              <div className="mx-auto mt-8 inline-flex rounded-full bg-cream px-8 py-3">
                <span className="font-sans text-[15px] font-bold tracking-widest text-navy uppercase">
                  Treatments
                </span>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-8 text-[15.5px] leading-[1.8] text-ink">
              <div className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  BBL (BroadBand Light) / Advanced IPL for face, chest and hands
                </h3>
                <p className="mt-2 text-muted">
                  A gentler but highly effective option for treating sun damage, age spots, redness, and rosacea. BBL uses targeted light energy to break up pigment and visible blood vessels, resulting in a clearer, more even skin tone. This treatment requires minimal downtime.
                </p>
              </div>

              <div className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  Non-Ablative Laser Resurfacing
                </h3>
                <p className="mt-2 text-muted">
                  This treatment targets the deeper layers of skin to stimulate collagen production without damaging the surface. It is excellent for reducing fine lines, improving skin texture, and minimizing acne scars. Non-ablative resurfacing offers a balanced approach with noticeable results and less downtime than ablative lasers.
                </p>
              </div>

              <div className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  CO2 Laser Resurfacing
                </h3>
                <p className="mt-2 text-muted">
                  Our most powerful laser option, CO2 resurfacing provides dramatic results for deep wrinkles, severe sun damage, and significant acne scarring. This ablative laser removes thin layers of skin, promoting intense collagen regeneration. It requires more downtime but delivers the most transformative outcome.
                </p>
              </div>

              <div className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-[2px] before:w-3 before:bg-teal">
                <h3 className="font-sans text-[17px] font-bold text-navy">
                  Microneedling
                </h3>
                <p className="mt-2 text-muted">
                  While not a laser, microneedling is a highly effective skin rejuvenation treatment often combined or alternated with laser therapies. It creates controlled micro-injuries in the skin, triggering the body&apos;s natural healing process to stimulate collagen and elastin production. This improves skin texture, reduces the appearance of scars, and enhances the absorption of topical skincare products.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
              <span className="font-medium cursor-pointer hover:text-rose transition-colors">
                ← INJECTABLES & WRINKLE PREVENTION
              </span>
              <span className="font-medium cursor-pointer hover:text-rose transition-colors">
                MEDICAL-GRADE FACIALS →
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
