import { prisma } from '@/lib/prisma';
import {
  createFooterLinkAction,
  createLocationAction,
  createLocationHourAction,
  createSocialLinkAction,
  deleteFooterLinkAction,
  deleteLocationAction,
  deleteLocationHourAction,
  deleteSocialLinkAction,
  updateFooterLinkAction,
  updateLocationAction,
  updateLocationHourAction,
  updateSiteSettingAction,
  updateSocialLinkAction,
} from './actions';

export const dynamic = 'force-dynamic';

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3 py-2 text-[14px] text-navy outline-none focus:border-navy';
const smallBtn =
  'rounded-lg border border-navy/20 px-3 py-1.5 text-[12px] font-medium text-navy hover:bg-navy hover:text-white';

export default async function SiteContentPage() {
  let siteSetting, socialLinks, locations, footerLinks;
  try {
    [siteSetting, socialLinks, locations, footerLinks] = await Promise.all([
      prisma.siteSetting.findUnique({ where: { id: 'main' } }),
      prisma.socialLink.findMany({ orderBy: { sortOrder: 'asc' } }),
      prisma.location.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { hours: { orderBy: { sortOrder: 'asc' } } },
      }),
      prisma.footerNavLink.findMany({ orderBy: { sortOrder: 'asc' } }),
    ]);
  } catch {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-card">
        <h1 className="mb-2 font-serif text-[24px] text-navy">Site &amp; Footer</h1>
        <p className="text-[14px] text-muted">
          Database not connected yet. Set <code>DATABASE_URL</code> and run migrations + seed to
          manage this content.
        </p>
      </div>
    );
  }

  const quickLinks = footerLinks.filter((l) => l.group === 'QUICK_LINK');
  const footerServiceLinks = footerLinks.filter((l) => l.group === 'FOOTER_SERVICE');

  return (
    <div className="space-y-8">
      <h1 className="font-serif text-[26px] text-navy">Site &amp; Footer</h1>

      {/* Site settings */}
      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Brand &amp; Contact</h2>
        <form action={updateSiteSettingAction} className="grid gap-4 sm:grid-cols-2">
          <Field label="Business Name" name="name" defaultValue={siteSetting?.name} />
          <Field label="Phone (display)" name="phone" defaultValue={siteSetting?.phone} />
          <Field label="Phone href (tel:...)" name="phoneHref" defaultValue={siteSetting?.phoneHref} />
          <Field label="Email" name="email" defaultValue={siteSetting?.email} />
          <Field label="Email href (mailto:...)" name="emailHref" defaultValue={siteSetting?.emailHref} />
          <Field label="Booking URL" name="bookingUrl" defaultValue={siteSetting?.bookingUrl} />
          <Field
            label="Copyright text"
            name="copyrightText"
            defaultValue={siteSetting?.copyrightText}
            className="sm:col-span-2"
          />
          <div className="sm:col-span-2">
            <button type="submit" className={smallBtn}>
              Save Brand &amp; Contact
            </button>
          </div>
        </form>
      </section>

      {/* Social links */}
      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Social Links</h2>
        <div className="space-y-4">
          {socialLinks.map((s) => (
            <form
              key={s.id}
              action={updateSocialLinkAction}
              className="grid items-end gap-3 sm:grid-cols-[1fr_2fr_1fr_auto_auto]"
            >
              <input type="hidden" name="id" value={s.id} />
              <Field label="Icon" name="icon" defaultValue={s.icon} />
              <Field label="Href" name="href" defaultValue={s.href} />
              <Field label="Label" name="label" defaultValue={s.label} />
              <Field label="Order" name="sortOrder" defaultValue={String(s.sortOrder)} type="number" />
              <div className="flex gap-2">
                <button type="submit" className={smallBtn}>
                  Save
                </button>
              </div>
              <button
                formAction={deleteSocialLinkAction}
                className="text-[12px] font-medium text-red-600 hover:underline sm:col-start-5"
              >
                Delete
              </button>
            </form>
          ))}
        </div>

        <form action={createSocialLinkAction} className="mt-5 grid gap-3 border-t border-navy/10 pt-5 sm:grid-cols-[1fr_2fr_1fr_auto]">
          <Field label="Icon (facebook/instagram/linkedin)" name="icon" defaultValue="facebook" />
          <Field label="Href" name="href" />
          <Field label="Label" name="label" />
          <Field label="Order" name="sortOrder" defaultValue="0" type="number" />
          <div>
            <button type="submit" className={smallBtn}>
              Add Social Link
            </button>
          </div>
        </form>
      </section>

      {/* Locations */}
      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Locations &amp; Hours</h2>
        <div className="space-y-8">
          {locations.map((location) => (
            <div key={location.id} className="rounded-xl border border-navy/10 p-5">
              <form action={updateLocationAction} className="grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="id" value={location.id} />
                <Field label="City" name="city" defaultValue={location.city} />
                <Field label="Badge (optional)" name="badge" defaultValue={location.badge ?? ''} />
                <Field
                  label="Address lines (one per line)"
                  name="addressLines"
                  as="textarea"
                  defaultValue={(location.addressLines as string[]).join('\n')}
                  className="sm:col-span-2"
                />
                <Field
                  label="Order"
                  name="sortOrder"
                  type="number"
                  defaultValue={String(location.sortOrder)}
                />
                <div className="flex items-end gap-2">
                  <button type="submit" className={smallBtn}>
                    Save Location
                  </button>
                  <button formAction={deleteLocationAction} className="text-[12px] font-medium text-red-600 hover:underline">
                    Delete
                  </button>
                </div>
              </form>

              <div className="mt-5 border-t border-navy/10 pt-4">
                <p className="mb-3 text-[13px] font-semibold text-navy">Hours</p>
                <div className="space-y-3">
                  {location.hours.map((h) => (
                    <form
                      key={h.id}
                      action={updateLocationHourAction}
                      className="grid items-end gap-2 sm:grid-cols-[auto_1fr_1fr_auto_auto_auto]"
                    >
                      <input type="hidden" name="id" value={h.id} />
                      <div>
                        <label className="mb-1 block text-[12px] text-muted">Kind</label>
                        <select name="kind" defaultValue={h.kind} className={inputClass}>
                          <option value="FULL">Full</option>
                          <option value="SHORT">Short</option>
                        </select>
                      </div>
                      <Field label="Days" name="days" defaultValue={h.days} />
                      <Field label="Time" name="time" defaultValue={h.time} />
                      <Field label="Order" name="sortOrder" type="number" defaultValue={String(h.sortOrder)} />
                      <button type="submit" className={smallBtn}>
                        Save
                      </button>
                      <button formAction={deleteLocationHourAction} className="text-[12px] font-medium text-red-600 hover:underline">
                        Delete
                      </button>
                    </form>
                  ))}
                </div>

                <form
                  action={createLocationHourAction}
                  className="mt-3 grid items-end gap-2 border-t border-navy/10 pt-3 sm:grid-cols-[auto_1fr_1fr_auto_auto]"
                >
                  <input type="hidden" name="locationId" value={location.id} />
                  <div>
                    <label className="mb-1 block text-[12px] text-muted">Kind</label>
                    <select name="kind" defaultValue="FULL" className={inputClass}>
                      <option value="FULL">Full</option>
                      <option value="SHORT">Short</option>
                    </select>
                  </div>
                  <Field label="Days" name="days" placeholder="Mon to Thu:" />
                  <Field label="Time" name="time" placeholder="9:00 AM - 5:00 PM" />
                  <Field label="Order" name="sortOrder" type="number" defaultValue="0" />
                  <button type="submit" className={smallBtn}>
                    Add Hours Row
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>

        <form action={createLocationAction} className="mt-6 grid gap-3 border-t border-navy/10 pt-5 sm:grid-cols-2">
          <Field label="City" name="city" />
          <Field label="Badge (optional)" name="badge" />
          <Field label="Address lines (one per line)" name="addressLines" as="textarea" className="sm:col-span-2" />
          <Field label="Order" name="sortOrder" type="number" defaultValue="0" />
          <div className="flex items-end">
            <button type="submit" className={smallBtn}>
              Add Location
            </button>
          </div>
        </form>
      </section>

      {/* Footer links */}
      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Footer &ldquo;Quick Links&rdquo;</h2>
        <FooterLinkGroupEditor
          links={quickLinks}
          group="QUICK_LINK"
          updateAction={updateFooterLinkAction}
          deleteAction={deleteFooterLinkAction}
          createAction={createFooterLinkAction}
        />
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
        <h2 className="mb-4 font-serif text-[19px] text-navy">Footer &ldquo;Services&rdquo;</h2>
        <FooterLinkGroupEditor
          links={footerServiceLinks}
          group="FOOTER_SERVICE"
          updateAction={updateFooterLinkAction}
          deleteAction={deleteFooterLinkAction}
          createAction={createFooterLinkAction}
        />
      </section>
    </div>
  );
}

function FooterLinkGroupEditor({
  links,
  group,
  updateAction,
  deleteAction,
  createAction,
}: {
  links: { id: string; label: string; href: string; sortOrder: number }[];
  group: 'QUICK_LINK' | 'FOOTER_SERVICE';
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
  createAction: (formData: FormData) => Promise<void>;
}) {
  return (
    <div className="space-y-3">
      {links.map((link) => (
        <form key={link.id} action={updateAction} className="grid items-end gap-2 sm:grid-cols-[2fr_2fr_auto_auto_auto]">
          <input type="hidden" name="id" value={link.id} />
          <Field label="Label" name="label" defaultValue={link.label} />
          <Field label="Href" name="href" defaultValue={link.href} />
          <Field label="Order" name="sortOrder" type="number" defaultValue={String(link.sortOrder)} />
          <button type="submit" className={smallBtn}>
            Save
          </button>
          <button formAction={deleteAction} className="text-[12px] font-medium text-red-600 hover:underline">
            Delete
          </button>
        </form>
      ))}

      <form action={createAction} className="grid items-end gap-2 border-t border-navy/10 pt-3 sm:grid-cols-[2fr_2fr_auto_auto]">
        <input type="hidden" name="group" value={group} />
        <Field label="Label" name="label" />
        <Field label="Href" name="href" />
        <Field label="Order" name="sortOrder" type="number" defaultValue="0" />
        <button type="submit" className={smallBtn}>
          Add
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
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  as?: 'textarea';
  className?: string;
  placeholder?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-[12px] text-muted">{label}</label>
      {as === 'textarea' ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={3}
          className={inputClass}
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}
