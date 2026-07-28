import { prisma } from '@/lib/prisma';
import { createSpecialCardAction, deleteSpecialCardAction, saveAllAction } from './actions';
import AdminSpecialCard from '@/components/admin/AdminSpecialCard';
import CloudinaryUpload from '@/components/admin/CloudinaryUpload';
import SpecialsHeroUpload from './SpecialsHeroUpload';

export const dynamic = 'force-dynamic';

const SAVE_FORM_ID = 'specials-save';

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3 py-2 text-[14px] text-navy outline-none focus:border-navy';
const smallBtn =
  'rounded-lg border border-navy/20 px-3 py-1.5 text-[12px] font-medium text-navy hover:bg-navy hover:text-white';

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
          <p className="text-[12px] text-muted">{cards.length} card{cards.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {cards.map((card) => (
            <AdminSpecialCard key={card.id} card={card} />
          ))}
        </div>

        {/* Add New Card */}
        <div className="mt-6 rounded-2xl border-2 border-dashed border-navy/15 bg-white p-6 shadow-card">
          <h3 className="mb-4 font-serif text-[16px] text-navy">Add New Card</h3>
          <form action={createSpecialCardAction} className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[12px] text-muted">ID (unique slug)</label>
              <input name="id" placeholder="e.g. spring-facial" className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-[12px] text-muted">Variant</label>
              <select name="variant" defaultValue="STORY" className={inputClass}>
                <option value="STORY">Story (headline + description)</option>
                <option value="TIERS">Tiers (bundle pricing)</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[12px] text-muted">Title (overlay on image)</label>
              <input name="title" className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-[12px] text-muted">CTA Label</label>
              <input name="cta" defaultValue="Claim" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[12px] text-muted">Headline (Story cards)</label>
              <input name="headline" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-[12px] text-muted">Description (Story cards)</label>
              <textarea name="description" rows={3} className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-[12px] text-muted">Sort Order</label>
              <input name="sortOrder" type="number" defaultValue="1" className={inputClass} />
            </div>
            <div className="flex items-end">
              <button type="submit" className={smallBtn}>
                Add Offer Card
              </button>
            </div>
          </form>
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
