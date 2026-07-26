import Reveal from '@/components/ui/Reveal';

const offerings = [
  {
    title: 'DiamondGlow® Microdermabrasion',
    description:
      'Gently exfoliate, extract debris, and infuse skin with professional-grade SkinMedica® Pro-Infusion Serums.',
  },
  {
    title: 'Dermaplaning',
    description:
      'A safe and effective method to remove dead skin and peach fuzz (vellus hair) from the face. This improves product absorption and gives your skin a brighter, more radiant appearance, making it the perfect prelude to any facial or peel.',
  },
  {
    title: 'Chemical Peels',
    description:
      'Our customized chemical peels effectively exfoliate the surface of your skin to reveal a brighter, smoother, and more youthful complexion. We offer a range of peels formulated for various skin concerns.',
  },
  {
    title: 'Microneedling / Collagen Induction Therapy (CIT)',
    description:
      'A minimally invasive procedure that uses tiny needles to create micro-injuries in the skin, stimulating its natural healing process and promoting collagen and elastin production.',
  },
  {
    title: 'PRP with Microneedling (Vampire Facial)',
    description:
      'Combine the benefits of microneedling with Platelet-Rich Plasma (PRP) drawn from your own blood. This stimulates collagen production, improves skin tone and texture, and accelerates the healing process.',
  },
  {
    title: 'Customized Facials',
    description:
      'Our aestheticians can create a customized facial tailored to your unique skin type and concerns. We use medical-grade products to ensure optimal results.',
  },
];

export default function OfferingsList() {
  return (
    <section id="offerings" className="section bg-cream pt-0 lg:pt-0">
      <div className="shell relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
        <Reveal>
          <div className="mx-auto max-w-[800px] rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
            <div className="text-center">
              <h2 className="display-3 mb-4 text-navy">Medical-Grade Facials Offerings</h2>
              <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8]">
                Discover the medical-grade facial treatments that we offer at Savannah Age
                Management Medicine.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-8">
              {offerings.map((offering, i) => (
                <div key={i} className="group relative">
                  {i !== 0 && (
                    <div className="absolute -top-4 left-0 right-0 h-px bg-haze transition-colors group-hover:bg-rose/40" />
                  )}
                  <h3 className="font-sans text-[17px] font-bold tracking-wide text-navy">
                    {offering.title}
                  </h3>
                  <p className="mt-2 text-[15.5px] leading-[1.8] text-muted">
                    {offering.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
              <span className="font-medium cursor-pointer hover:text-rose transition-colors">
                ← PREVIOUS TREATMENT
              </span>
              <button className="rounded-full bg-navy px-8 py-3.5 text-white transition-colors hover:bg-navy-deep">
                BOOK APPOINTMENT
              </button>
              <span className="font-medium cursor-pointer hover:text-rose transition-colors">
                NEXT TREATMENT →
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
