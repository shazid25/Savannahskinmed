# Savannah Age Management Medicine

Front-end rebuild of the Savannah Age Management Medicine site in Next.js (App Router).

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **Tailwind CSS 3.4** for styling
- **next/font** — Playfair Display (display serif) + Manrope (UI sans)
- No backend: the contact form and booking dialog acknowledge submissions client-side.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

On Windows PowerShell, `npm` may be blocked by the execution policy. Either use
`npm.cmd run dev` or allow local scripts once with
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

To run a production build **without** disturbing a running dev server, send it to
a throwaway output directory:

```bash
NEXT_DIST_DIR=.next-verify npm run build
```

Rebuilding into `.next` while `next dev` is running causes
`Cannot find module './NNN.js'`; the fix is to stop the server, `rm -rf .next`
and start again.

## Design tokens

Defined in `tailwind.config.ts`:

| Token           | Value       | Used for                                            |
| --------------- | ----------- | --------------------------------------------------- |
| `navy`          | `#13285C`   | Headings, buttons, footer links                      |
| `navy-deep`     | `#0C1D45`   | Button hover, 404 background                         |
| `rose`          | `#BE8596`   | Testimonial + contact panels (sampled from artwork)  |
| `rose-deep`     | `#B0798A`   | Eyebrow labels, "Office Hours", link hover           |
| `rose-light`    | `#E3A7B7`   | Service card arrow buttons, carousel arrows          |
| `cream`         | `#F6F4EC`   | "Experts In Aesthetic Excellence" panel              |
| `mist` / `haze` | pale greens | Our Clinic bands                                     |
| `sand`          | `#D3A277`   | "Elevate And Enhance" band                           |
| `mint` / `aqua` | pale tints  | Alternating service card backgrounds                 |
| `sage`          | `#6E9A94`   | Treatment icons                                      |
| `teal`          | `#4E9A97`   | Booking dialog primary button                        |

Shared component classes (`.shell`, `.display-1`, `.eyebrow`, `.btn-*`, `.field`)
live in `app/globals.css`.

### Layout fidelity

The desktop reference screenshots were captured at a **1280px CSS viewport on a
1.5x display**, so sizes were derived by dividing screenshot pixels by 1.5.
Check any layout change at a 1280px viewport.

| Measurement (at 1280px)  | Reference | Built |
| ------------------------ | --------- | ----- |
| Home page height         | 4868      | 4866  |
| Contact page height      | 2889      | 2875  |
| Our Clinic page height   | 4066      | 4049  |
| Services grid width      | 1034      | 1036  |
| Before/after frame width | 806       | 806   |
| Rose panel width         | 1156      | 1156  |
| Logo width               | 124       | 124   |

Mobile is matched separately — the original uses **~56px page gutters** and a
**fixed 690px banner height** on phones rather than a viewport-relative one:

| Measurement (at 393px) | Reference | Built |
| ---------------------- | --------- | ----- |
| Content gutter         | 56        | 56    |
| Logo width             | 153       | 150   |
| Hero paragraph line 1  | 280       | 280   |
| Banner height          | 691       | 690   |

## Structure

```
app/
  layout.tsx              root shell: fonts, header, footer, skip link
  page.tsx                home
  contact/                contact page
  our-clinic/             clinic page (welcome, image mosaic, two feature bands)
  services/               index + [slug] treatment pages
  financing-options/ office-policies/ aesthetic-specials/
  privacy-policy/ not-found.tsx
components/
  layout/                 Header (with Services dropdown), Footer, Logo
  home/                   Hero, ServicesSection, BeforeAfter, Testimonials,
                          ExpertsSection, ElevateCta
  contact/                ContactInfo (details + map), ContactForm
  booking/                BookAppointmentButton + BookingModal
  ui/                     ButtonLink, SectionHeading, PageHero, SimplePage, Reveal
  icons/                  all inline SVG icons
lib/
  site.ts                 nav, services, locations, hours, socials
  serviceContent.ts       copy for the individual treatment pages
public/images/            brand photography and the logo lockup
```

## Notes

- **Header** is `position: absolute`, not fixed — it stays fully transparent over
  the hero and scrolls away, so white links never land on a white section.
- **Logo** ships as one white PNG. The footer re-colours the same artwork to navy
  via a CSS mask on its alpha channel, so there is only one asset to maintain.
- **Scroll reveals** (`components/ui/Reveal.tsx`) reproduce the original's WOW.js
  `fadeInUp` with an IntersectionObserver. The hidden starting state is cancelled
  by a `<noscript>` rule in the root layout so content is never stranded invisible.
- **Before/after carousel** cycles six pairs every 3s. It pauses while the pointer
  rests on it *or* while the divider is being dragged, and resumes on release —
  hover and hold are tracked separately because touch has no hover.
- **Booking dialog** is portalled to `document.body`; hero and reveal ancestors
  carry a CSS transform, which would otherwise capture a `position: fixed` overlay.
  Only the banner CTA opens it — the other Book Appointment buttons link to
  `/contact`.
- The Google Map on the contact page is a keyless `maps?q=…&output=embed` iframe.
- Home, Contact and Our Clinic reproduce the supplied designs. The remaining
  routes exist so every navigation, footer and dropdown link resolves; they share
  a common `SimplePage` shell and carry **placeholder copy that must be replaced
  with the real page content** before launch.
