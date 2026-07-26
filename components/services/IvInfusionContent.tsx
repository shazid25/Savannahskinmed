import Reveal from '@/components/ui/Reveal';
import BookAppointmentButton from '@/components/booking/BookAppointmentButton';

export default function IvInfusionContent() {
  return (
    <section className="section bg-white">
      <div className="shell">
        <Reveal>
          <div className="mx-auto max-w-[800px] text-center text-[16px] leading-[1.8] text-[#555a64] sm:text-[18px]">
            <p>
              IV infusion therapy bypasses the digestive system so your body can use the full dose of what it is given. Our blends support energy, immunity, recovery and skin health.
            </p>
            <p className="mt-8">
              Vitamin injections offer a quicker alternative for clients who want a regular top-up of B12, lipotropics or vitamin D without a full infusion.
            </p>
            <div className="mt-12 flex justify-center">
              <BookAppointmentButton className="rounded-full bg-navy px-10 py-4 text-[13px] font-bold tracking-widest2 text-white transition-colors hover:bg-navy-deep">
                BOOK APPOINTMENT
              </BookAppointmentButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
