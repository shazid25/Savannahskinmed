import { prisma } from '@/lib/prisma';
import {
  createSpecialCardAction,
  deleteSpecialCardAction,
  updateSpecialCardAction,
  updateSpecialCardTierAction,
  updateSpecialsPageSettingsAction,
} from './actions';

export const dynamic = 'force-dynamic';

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
        <h1 className="mb-2 font-serif text-[24px] text-navy">Specials Page</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed to
          manage this content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-[26px] text-navy">Aesthetic Specials Page</h1>

      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Hero &amp; Heading</h2>
        <form action={updateSpecialsPageSettingsAction} className="grid gap-4 sm:grid-cols-2">
          <Field label="Hero Title" name="heroTitle" defaultValue={settings?.heroTitle} />
          <Field label="Offers Section Heading" name="offersHeading" defaultValue={settings?.offersHeading} />
          <Field label="Hero Intro" name="heroIntro" as="textarea" defaultValue={settings?.heroIntro} className="sm:col-span-2" />
          <Field label="Hero Image (path in /public/images)" name="heroImage" defaultValue={settings?.heroImage} />
          <Field label="Hero Image Alt Text" name="heroImageAlt" defaultValue={settings?.heroImageAlt} />
          <div className="sm:col-span-2">
            <button type="submit" className={smallBtn}>
              Save Hero
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Offer Cards</h2>
        <div className="space-y-6">
          {cards.map((card) => (
            <div key={card.id} className="rounded-xl border border-navy/10 p-5">
              <form action={updateSpecialCardAction} className="grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="id" value={card.id} />
                <p className="text-[12px] font-semibold uppercase tracking-wide text-muted sm:col-span-2">
                  {card.id} &middot; {card.variant}
                </p>
                <Field label="Image (path in /public/images)" name="image" defaultValue={card.image} />
                <Field label="Image Alt Text" name="imageAlt" defaultValue={card.imageAlt} />
                <Field label="Title (overlay on image)" name="title" defaultValue={card.title ?? ''} />
                <Field label="CTA label" name="cta" defaultValue={card.cta} />
                {card.variant === 'STORY' && (
                  <>
                    <Field label="Headline" name="headline" defaultValue={card.headline ?? ''} className="sm:col-span-2" />
                    <Field
                      label="Description"
                      name="description"
                      as="textarea"
                      defaultValue={card.description ?? ''}
                      className="sm:col-span-2"
                    />
                  </>
                )}
                <Field label="Order" name="sortOrder" type="number" defaultValue={String(card.sortOrder)} />
                <label className="flex items-center gap-2 text-[13px] text-navy">
                  <input type="checkbox" name="isActive" defaultChecked={card.isActive} />
                  Active (shown on public site)
                </label>
                <div className="flex gap-2 sm:col-span-2">
                  <button type="submit" className={smallBtn}>
                    Save Card
                  </button>
                  <button formAction={deleteSpecialCardAction} className="text-[12px] font-medium text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </form>

              {card.variant === 'TIERS' && card.tiers.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-navy/10 pt-4">
                  <p className="text-[13px] font-semibold text-navy">Pricing Tiers</p>
                  {card.tiers.map((tier) => (
                    <form
                      key={tier.id}
                      action={updateSpecialCardTierAction}
                      className="grid items-end gap-2 sm:grid-cols-[2fr_2fr_auto_auto]"
                    >
                      <input type="hidden" name="id" value={tier.id} />
                      <Field label="Label" name="label" defaultValue={tier.label} />
                      <Field label="Detail" name="detail" defaultValue={tier.detail} />
                      <Field label="Order" name="sortOrder" type="number" defaultValue={String(tier.sortOrder)} />
                      <button type="submit" className={smallBtn}>
                        Save
                      </button>
                    </form>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <form action={createSpecialCardAction} className="mt-6 grid gap-3 border-t border-navy/10 pt-5 sm:grid-cols-2">
          <Field label="ID (unique slug, e.g. spring-facial)" name="id" />
          <div>
            <label className="mb-1 block text-[12px] text-muted">Variant</label>
            <select name="variant" defaultValue="STORY" className={inputClass}>
              <option value="STORY">Story (headline + description)</option>
              <option value="TIERS">Tiers (bundle pricing)</option>
            </select>
          </div>
          <Field label="Image (path in /public/images)" name="image" />
          <Field label="Image Alt Text" name="imageAlt" />
          <Field label="Title (overlay on image)" name="title" />
          <Field label="CTA label" name="cta" defaultValue="Claim" />
          <Field label="Headline (Story cards)" name="headline" />
          <Field label="Description (Story cards)" name="description" as="textarea" />
          <Field label="Order" name="sortOrder" type="number" defaultValue="0" />
          <div className="flex items-end">
            <button type="submit" className={smallBtn}>
              Add Offer Card
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  as,
  className = '',
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  as?: 'textarea';
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-[12px] text-muted">{label}</label>
      {as === 'textarea' ? (
        <textarea name={name} defaultValue={defaultValue} rows={3} className={inputClass} />
      ) : (
        <input name={name} type={type} defaultValue={defaultValue} className={inputClass} />
      )}
    </div>
  );
}
