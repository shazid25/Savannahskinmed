import Reveal from '@/components/ui/Reveal';

const leftColumn = [
  'Full Back',
  'Full Bikini',
  'Bikini Line',
  'Full Face And Neck',
  'Full Leg',
  'Buttocks',
  'Chin',
  'Other',
  'Abdomen',
];

const rightColumn = [
  'Half Back',
  'Forearms',
  'Full Face',
  'Half Leg',
  'Underarms',
  'Lip',
  'Lip And Chin',
  'Neck',
];

export default function LaserOfferingsList() {
  return (
    <section className="section bg-cream">
      <div className="shell">
        <Reveal>
          <div className="mx-auto max-w-[800px] rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16">
            <div className="text-center">
              <div className="mx-auto mb-8 inline-flex rounded-full bg-cream px-6 py-2">
                <span className="eyebrow text-navy">Our Services</span>
              </div>
              <h2 className="display-3 mb-4 text-navy">Laser Hair Removal Offerings</h2>
              <p className="mx-auto max-w-[600px] text-[16px] leading-[1.8]">
                Discover the laser hair removal services that we offer at Savannah Age
                Management Medicine.
              </p>
            </div>

            <div className="mt-12 flex flex-col md:flex-row gap-4 md:gap-8 justify-center max-w-[500px] mx-auto text-center font-sans text-[17px] font-bold tracking-wide text-navy">
              <div className="flex-1 flex flex-col gap-4">
                {leftColumn.map((item, i) => (
                  <div key={`left-${i}`}>{item}</div>
                ))}
              </div>
              <div className="flex-1 flex flex-col gap-4">
                {rightColumn.map((item, i) => (
                  <div key={`right-${i}`}>{item}</div>
                ))}
              </div>
            </div>
            
            <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-haze pt-8 text-[13px] uppercase tracking-widest2 text-navy">
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
