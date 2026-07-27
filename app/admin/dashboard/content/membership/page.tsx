import { prisma } from '@/lib/prisma';
import {
  createMembershipBulletAction,
  deleteMembershipBulletAction,
  updateMembershipBulletAction,
  updateMembershipPromoAction,
} from './actions';

export const dynamic = 'force-dynamic';

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3 py-2 text-[14px] text-navy outline-none focus:border-navy';
const smallBtn =
  'rounded-lg border border-navy/20 px-3 py-1.5 text-[12px] font-medium text-navy hover:bg-navy hover:text-white';

export default async function MembershipContentPage() {
  let promo;
  try {
    promo = await prisma.membershipPromo.findUnique({
      where: { id: 'main' },
      include: { bullets: { orderBy: { sortOrder: 'asc' } } },
    });
  } catch {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-card">
        <h1 className="mb-2 font-serif text-[24px] text-navy">Membership Promo</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed to
          manage this content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-[26px] text-navy">Membership Promo Banner</h1>
      <p className="text-[13px] text-muted">
        This is the banner shown on the Aesthetic Specials page promoting the membership program.
      </p>

      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <form action={updateMembershipPromoAction} className="grid gap-4 sm:grid-cols-2">
          <Field label="Heading start" name="headingStart" defaultValue={promo?.headingStart} />
          <Field label="Heading emphasis (italic)" name="headingEmphasis" defaultValue={promo?.headingEmphasis} />
          <Field label="Heading end" name="headingEnd" defaultValue={promo?.headingEnd} />
          <Field label="Tagline" name="tagline" defaultValue={promo?.tagline} />
          <Field label="Description" name="description" as="textarea" defaultValue={promo?.description} className="sm:col-span-2" />
          <Field label="CTA label" name="ctaLabel" defaultValue={promo?.ctaLabel} />
          <Field label="Image (path in /public/images)" name="image" defaultValue={promo?.image} />
          <div className="sm:col-span-2">
            <button type="submit" className={smallBtn}>
              Save
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Bullet Points</h2>
        <div className="space-y-3">
          {promo?.bullets.map((bullet) => (
            <form
              key={bullet.id}
              action={updateMembershipBulletAction}
              className="grid items-end gap-2 sm:grid-cols-[3fr_auto_auto_auto]"
            >
              <input type="hidden" name="id" value={bullet.id} />
              <Field label="Text" name="text" defaultValue={bullet.text} />
              <Field label="Order" name="sortOrder" type="number" defaultValue={String(bullet.sortOrder)} />
              <button type="submit" className={smallBtn}>
                Save
              </button>
              <button formAction={deleteMembershipBulletAction} className="text-[12px] font-medium text-red-600 hover:underline">
                Delete
              </button>
            </form>
          ))}
        </div>

        <form action={createMembershipBulletAction} className="mt-4 grid items-end gap-2 border-t border-navy/10 pt-4 sm:grid-cols-[3fr_auto_auto]">
          <Field label="Text" name="text" />
          <Field label="Order" name="sortOrder" type="number" defaultValue="0" />
          <button type="submit" className={smallBtn}>
            Add Bullet
          </button>
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
