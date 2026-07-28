import { prisma } from '@/lib/prisma';
import { createSpecialCardAction, deleteSpecialCardAction, saveAllAction } from './actions';

export const dynamic = 'force-dynamic';

const SAVE_FORM_ID = 'specials-save';

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3 py-2 text-[14px] text-navy outline-none focus:border-navy';
const smallBtn =
  'rounded-lg border border-navy/20 px-3 py-1.5 text-[12px] font-medium text-navy hover:bg-navy hover:text-white';
const dangerBtn = 'text-[12px] font-medium text-red-600 hover:underline';

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
          Manage the hero and every offer card on the public /specials page. Edit anything below,
          then save once at the bottom.
        </p>
      </div>

      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Hero &amp; Heading</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Hero Title" name="heroTitle" defaultValue={settings?.heroTitle} />
          <Field label="Offers Section Heading" name="offersHeading" defaultValue={settings?.offersHeading} />
          <Field label="Hero Intro" name="heroIntro" as="textarea" defaultValue={settings?.heroIntro} className="sm:col-span-2" />
          <Field label="Hero Image (path in /public/images)" name="heroImage" defaultValue={settings?.heroImage} />
          <Field label="Hero Image Alt Text" name="heroImageAlt" defaultValue={settings?.heroImageAlt} />
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Offer Cards</h2>
        <div className="space-y-6">
          {cards.map((card) => (
            <div key={card.id} className="rounded-xl border border-navy/10 p-5">
              <input type="hidden" name="cardIds" value={card.id} form={SAVE_FORM_ID} />
              <div className="grid gap-3 sm:grid-cols-2">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-muted sm:col-span-2">
                  {card.id} &middot; {card.variant}
                </p>
                <Field label="Image (path in /public/images)" name={`card-image-${card.id}`} defaultValue={card.image} />
                <Field label="Image Alt Text" name={`card-imageAlt-${card.id}`} defaultValue={card.imageAlt} />
                <Field label="Title (overlay on image)" name={`card-title-${card.id}`} defaultValue={card.title ?? ''} />
                <Field label="CTA label" name={`card-cta-${card.id}`} defaultValue={card.cta} />
                {card.variant === 'STORY' && (
                  <>
                    <Field
                      label="Headline"
                      name={`card-headline-${card.id}`}
                      defaultValue={card.headline ?? ''}
                      className="sm:col-span-2"
                    />
                    <Field
                      label="Description"
                      name={`card-description-${card.id}`}
                      as="textarea"
                      defaultValue={card.description ?? ''}
                      className="sm:col-span-2"
                    />
                  </>
                )}
                <Field label="Order" name={`card-order-${card.id}`} type="number" defaultValue={String(card.sortOrder + 1)} />
                <label className="flex items-center gap-2 text-[13px] text-navy">
                  <input type="checkbox" name={`card-active-${card.id}`} defaultChecked={card.isActive} form={SAVE_FORM_ID} />
                  Active (shown on public site)
                </label>
                <div className="sm:col-span-2">
                  <form action={deleteSpecialCardAction} className="inline">
                    <input type="hidden" name="id" value={card.id} />
                    <button type="submit" className={dangerBtn}>
                      Delete Card
                    </button>
                  </form>
                </div>
              </div>

              {card.variant === 'TIERS' && card.tiers.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-navy/10 pt-4">
                  <p className="text-[13px] font-semibold text-navy">Pricing Tiers</p>
                  {card.tiers.map((tier) => (
                    <div key={tier.id} className="grid items-end gap-2 sm:grid-cols-[2fr_2fr_auto]">
                      <input type="hidden" name="tierIds" value={tier.id} form={SAVE_FORM_ID} />
                      <Field label="Label" name={`tier-label-${tier.id}`} defaultValue={tier.label} />
                      <Field label="Detail" name={`tier-detail-${tier.id}`} defaultValue={tier.detail} />
                      <Field label="Order" name={`tier-order-${tier.id}`} type="number" defaultValue={String(tier.sortOrder + 1)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <form action={createSpecialCardAction} className="mt-6 grid gap-3 border-t border-navy/10 pt-5 sm:grid-cols-2">
          <Field label="ID (unique slug, e.g. spring-facial)" name="id" noForm />
          <div>
            <label className="mb-1 block text-[12px] text-muted">Variant</label>
            <select name="variant" defaultValue="STORY" className={inputClass}>
              <option value="STORY">Story (headline + description)</option>
              <option value="TIERS">Tiers (bundle pricing)</option>
            </select>
          </div>
          <Field label="Image (path in /public/images)" name="image" noForm />
          <Field label="Image Alt Text" name="imageAlt" noForm />
          <Field label="Title (overlay on image)" name="title" noForm />
          <Field label="CTA label" name="cta" defaultValue="Claim" noForm />
          <Field label="Headline (Story cards)" name="headline" noForm />
          <Field label="Description (Story cards)" name="description" as="textarea" noForm />
          <Field label="Order" name="sortOrder" type="number" defaultValue="1" noForm />
          <div className="flex items-end">
            <button type="submit" className={smallBtn}>
              Add Offer Card
            </button>
          </div>
        </form>
      </section>

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

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  as,
  className = '',
  noForm = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  as?: 'textarea';
  className?: string;
  /** Set for fields inside their own standalone form (Add sections) so they
   * don't also get associated with the shared bulk-save form. */
  noForm?: boolean;
}) {
  const formProp = noForm ? undefined : SAVE_FORM_ID;
  return (
    <div className={className}>
      <label className="mb-1 block text-[12px] text-muted">{label}</label>
      {as === 'textarea' ? (
        <textarea name={name} defaultValue={defaultValue} rows={3} className={inputClass} form={formProp} />
      ) : (
        <input name={name} type={type} defaultValue={defaultValue} className={inputClass} form={formProp} />
      )}
    </div>
  );
}
