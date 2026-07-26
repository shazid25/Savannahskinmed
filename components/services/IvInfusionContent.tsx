import Reveal from '@/components/ui/Reveal';
import BookAppointmentButton from '@/components/booking/BookAppointmentButton';

export default function IvInfusionContent() {
  return (
    <section id="offerings" className="section bg-mist pt-0 lg:pt-0">
      <div className="shell relative z-20 -mt-16 sm:-mt-24 lg:-mt-32">
        <Reveal>
          <div className="mx-auto max-w-[800px] rounded-[32px] bg-white p-8 shadow-[0_12px_40px_-16px_rgba(19,40,92,0.1)] sm:p-14 lg:p-16 text-center text-[16px] leading-[1.8] text-[#555a64] sm:text-[18px]">
            <h2 className="display-3 mb-6 text-navy">
              IV Infusion Therapy & Vitamin Injections Offerings
            </h2>
            <p>
              Custom-designed therapies to enhance your overall health, boost immunity, improve skin radiance, and support mental clarity and physical stamina.
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
