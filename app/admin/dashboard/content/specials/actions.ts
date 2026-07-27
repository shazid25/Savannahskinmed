'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { SpecialCardVariant } from '@/lib/generated/prisma/client';

function revalidateSpecialsPage() {
  revalidatePath('/aesthetic-specials');
}

export async function updateSpecialsPageSettingsAction(formData: FormData) {
  const data = {
    heroTitle: String(formData.get('heroTitle') || ''),
    heroIntro: String(formData.get('heroIntro') || ''),
    heroImage: String(formData.get('heroImage') || ''),
    heroImageAlt: String(formData.get('heroImageAlt') || ''),
    offersHeading: String(formData.get('offersHeading') || ''),
  };
  await prisma.specialsPageSettings.upsert({
    where: { id: 'main' },
    update: data,
    create: { id: 'main', ...data },
  });
  revalidateSpecialsPage();
  revalidatePath('/admin/dashboard/content/specials');
}

export async function createSpecialCardAction(formData: FormData) {
  const variant =
    String(formData.get('variant')) === 'STORY' ? SpecialCardVariant.STORY : SpecialCardVariant.TIERS;

  await prisma.specialCard.create({
    data: {
      id: String(formData.get('id') || '').trim(),
      variant,
      image: String(formData.get('image') || ''),
      imageAlt: String(formData.get('imageAlt') || ''),
      title: String(formData.get('title') || '') || null,
      headline: String(formData.get('headline') || '') || null,
      description: String(formData.get('description') || '') || null,
      cta: String(formData.get('cta') || 'Claim'),
      sortOrder: Number(formData.get('sortOrder') || 0),
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
  revalidatePath('/admin/dashboard/content/specials');
}

export async function updateSpecialCardAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.specialCard.update({
    where: { id },
    data: {
      image: String(formData.get('image') || ''),
      imageAlt: String(formData.get('imageAlt') || ''),
      title: String(formData.get('title') || '') || null,
      headline: String(formData.get('headline') || '') || null,
      description: String(formData.get('description') || '') || null,
      cta: String(formData.get('cta') || 'Claim'),
      sortOrder: Number(formData.get('sortOrder') || 0),
      isActive: formData.get('isActive') === 'on',
    },
  });
  revalidateSpecialsPage();
  revalidatePath('/admin/dashboard/content/specials');
}

export async function deleteSpecialCardAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.specialCard.delete({ where: { id } });
  revalidateSpecialsPage();
  revalidatePath('/admin/dashboard/content/specials');
}

export async function updateSpecialCardTierAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.specialCardTier.update({
    where: { id },
    data: {
      label: String(formData.get('label') || ''),
      detail: String(formData.get('detail') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidateSpecialsPage();
  revalidatePath('/admin/dashboard/content/specials');
}
