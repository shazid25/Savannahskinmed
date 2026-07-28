import { prisma } from '@/lib/prisma';
import { saveAllAction } from './actions';
import AdminSpecialCard from '@/components/admin/AdminSpecialCard';
import AddSpecialCardButton from '@/components/admin/AddSpecialCardButton';
import SpecialsHeroUpload from './SpecialsHeroUpload';

export const dynamic = 'force-dynamic';

const SAVE_FORM_ID = 'specials-save';

export default async function SpecialsContentPage() {
  let settings, cards;
  try {
    [settings, cards] = await Promise.all([
      prisma.specialsPageSettings.findUnique({ where: { id: 'main' } }),
      prisma.specialCard.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { tiers: { orderBy: { sortOrder: 'asc' } } },
      }),
    ]);
  } catch {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-card">
        <h1 className="mb-2 font-serif text-[24px] text-navy">Aesthetic Specials</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed to
          manage this content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-[26px] text-navy">Aesthetic Specials</h1>
        <p className="text-[13px] text-muted">
          Manage the hero section and offer cards on the public /specials page.
          Upload images via Cloudinary, edit content, then save.
        </p>
      </div>

      {/* Hero Section */}
      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-5 font-serif text-[19px] text-navy">Hero &amp; Heading</h2>
        <SpecialsHeroUpload settings={settings} />
      </section>

      {/* Offer Cards — visual card layout */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-[19px] text-navy">Offer Cards</h2>
          <div className="flex items-center gap-4">
            <p className="text-[12px] text-muted">{cards.length} card{cards.length !== 1 ? 's' : ''}</p>
            <AddSpecialCardButton />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <AdminSpecialCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      {/* Global Save */}
      <form id={SAVE_FORM_ID} action={saveAllAction}>
        <button
          type="submit"
          className="rounded-lg bg-navy px-6 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-navy-deep"
        >
          Save All Changes
        </button>
      </form>
    </div>
  );
}
