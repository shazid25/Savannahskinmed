import type { Metadata } from 'next';
import { cache } from 'react';

import { getResolvedPageSeo, type ResolvedPageSeo } from '@/lib/data/pageSeo';
import { SITE_URL } from '@/lib/siteUrl';

/** Deduped per-request: `generateMetadata` and the page body both resolve
 * the same route's SEO row without hitting the database twice. */
export const resolvePageSeo = cache(getResolvedPageSeo);

function robotsFor(directive: ResolvedPageSeo['robots']): Metadata['robots'] {
  switch (directive) {
    case 'INDEX_FOLLOW':
      return { index: true, follow: true };
    case 'NOINDEX_FOLLOW':
      return { index: false, follow: true };
    case 'NOINDEX_NOFOLLOW':
      return { index: false, follow: false };
    case 'INHERIT':
    default:
      // Omit entirely — the root layout's site-wide default (index, follow) applies.
      return undefined;
  }
}

/** Builds a page's `generateMetadata()` return value from its DB override
 * (falling back to the route's hardcoded default title/description when a
 * field is blank or the database is unreachable). */
export async function buildPageMetadata(route: string): Promise<Metadata> {
  const seo = await resolvePageSeo(route);

  const canonical = seo.canonicalUrl || `${SITE_URL}${route === '/' ? '' : route}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ? seo.keywords.split(',').map((k) => k.trim()).filter(Boolean) : undefined,
    alternates: { canonical },
    robots: robotsFor(seo.robots),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD structured data
// ---------------------------------------------------------------------------

function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Admin-authored content only (never public user input) — the same
      // trust boundary as the tracking-code injection in the root layout.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function buildBreadcrumbSchema(route: string, title: string) {
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }];
  if (route !== '/') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: title,
      item: `${SITE_URL}${route}`,
    });
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/** Renders the per-route JSON-LD: the admin's custom schema when configured,
 * otherwise an auto-generated BreadcrumbList — or nothing if disabled. */
export async function PageJsonLd({ route }: { route: string }) {
  const seo = await resolvePageSeo(route);
  if (!seo.schemaEnabled) return null;

  if (seo.schemaSource === 'CUSTOM' && seo.customSchema.trim()) {
    try {
      const parsed = JSON.parse(seo.customSchema);
      return <JsonLdScript data={parsed} />;
    } catch {
      return null;
    }
  }

  if (route === '/') return null;
  return <JsonLdScript data={buildBreadcrumbSchema(route, seo.title)} />;
}

/** Site-wide Organization/MedicalBusiness schema — rendered once in the
 * root layout, present on every page regardless of per-route settings. */
export function OrganizationJsonLd({
  name,
  description,
  phone,
  email,
  address,
}: {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name,
    description,
    url: SITE_URL,
    telephone: phone,
    email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
    },
  };
  return <JsonLdScript data={data} />;
}
