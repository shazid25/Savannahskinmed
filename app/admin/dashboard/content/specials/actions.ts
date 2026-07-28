'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { SpecialCardVariant } from '@/lib/generated/prisma/client';

function revalidateSpecialsPage() {
  revalidatePath('/specials');
  revalidatePath('/admin/dashboard/content/specials');
}

function toOrder(raw: FormDataEntryValue | null) {
  return Math.max(0, Number(raw || 1) - 1);
}

// ---------------------------------------------------------------------------
// Bulk save — hero/heading settings + every existing card + tier field on
// the page, submitted together from the single "Save All Changes" button.
// Every field below lives outside this form in the DOM and is associated
// via the HTML `form="specials-save"` attribute (nested <form> elements
// aren't valid HTML, and this is the standards-based way around it).
// ---------------------------------------------------------------------------

export async function saveAllAction(formData: FormData) {
  const cardIds = formData.getAll('cardIds').map(String);
  const tierIds = formData.getAll('tierIds').map(String);

  await prisma.$transaction([
    prisma.specialsPageSettings.upsert({
      where: { id: 'main' },
      update: {
        heroTitle: String(formData.get('heroTitle') || ''),
        heroIntro: String(formData.get('heroIntro') || ''),
        heroImage: String(formData.get('heroImage') || ''),
        heroImageAlt: String(formData.get('heroImageAlt') || ''),
        offersHeading: String(formData.get('offersHeading') || ''),
      },
      create: {
        id: 'main',
        heroTitle: String(formData.get('heroTitle') || ''),
        heroIntro: String(formData.get('heroIntro') || ''),
        heroImage: String(formData.get('heroImage') || ''),
        heroImageAlt: String(formData.get('heroImageAlt') || ''),
        offersHeading: String(formData.get('offersHeading') || ''),
      },
    }),
    ...cardIds.map((id) =>
      prisma.specialCard.update({
        where: { id },
        data: {
          image: String(formData.get(`card-image-${id}`) || ''),
          imageAlt: String(formData.get(`card-imageAlt-${id}`) || ''),
          title: String(formData.get(`card-title-${id}`) || '') || null,
          headline: String(formData.get(`card-headline-${id}`) || '') || null,
          description: String(formData.get(`card-description-${id}`) || '') || null,
          cta: String(formData.get(`card-cta-${id}`) || 'Claim'),
          sortOrder: toOrder(formData.get(`card-order-${id}`)),
          isActive: formData.get(`card-active-${id}`) === 'on',
        },
      }),
    ),
    ...tierIds.map((id) =>
      prisma.specialCardTier.update({
        where: { id },
        data: {
          label: String(formData.get(`tier-label-${id}`) || ''),
          detail: String(formData.get(`tier-detail-${id}`) || ''),
          sortOrder: toOrder(formData.get(`tier-order-${id}`)),
        },
      }),
    ),
  ]);

  revalidateSpecialsPage();
}

// ---------------------------------------------------------------------------
// Delete / create — each of these is its own small, self-contained <form>
// (not sharing the bulk-save form), so plain field names are unambiguous.
// ---------------------------------------------------------------------------

export async function deleteSpecialCardAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.specialCard.delete({ where: { id } });
  revalidateSpecialsPage();
}

export async function createSpecialCardAction(formData: FormData) {
  const variant = String(formData.get('variant')) === 'TIERS' ? SpecialCardVariant.TIERS : SpecialCardVariant.STORY;
  const id = String(formData.get('id') || '').trim();
  if (!id) return;

  await prisma.specialCard.create({
    data: {
      id,
      variant,
      image: String(formData.get('image') || ''),
      imageAlt: String(formData.get('imageAlt') || ''),
      title: String(formData.get('title') || '') || null,
      headline: String(formData.get('headline') || '') || null,
      description: String(formData.get('description') || '') || null,
      cta: String(formData.get('cta') || 'Claim'),
      sortOrder: toOrder(formData.get('sortOrder')),
      isActive: true,
      tiers:
        variant === SpecialCardVariant.TIERS
          ? {
              create: [
                { label: 'Tier 1 label', detail: 'Tier 1 detail', sortOrder: 0 },
                { label: 'Tier 2 label', detail: 'Tier 2 detail', sortOrder: 1 },
              ],
            }
          : undefined,
    },
  });
  revalidateSpecialsPage();
}
