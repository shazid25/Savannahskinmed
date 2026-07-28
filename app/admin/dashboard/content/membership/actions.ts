'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

function revalidateSpecialsPage() {
  revalidatePath('/specials');
}

export async function updateMembershipPromoAction(formData: FormData) {
  const data = {
    headingStart: String(formData.get('headingStart') || ''),
    headingEmphasis: String(formData.get('headingEmphasis') || ''),
    headingEnd: String(formData.get('headingEnd') || ''),
    tagline: String(formData.get('tagline') || ''),
    description: String(formData.get('description') || ''),
    ctaLabel: String(formData.get('ctaLabel') || ''),
    image: String(formData.get('image') || ''),
  };
  await prisma.membershipPromo.upsert({
    where: { id: 'main' },
    update: data,
    create: { id: 'main', ...data },
  });
  revalidateSpecialsPage();
  revalidatePath('/admin/dashboard/content/membership');
}

export async function createMembershipBulletAction(formData: FormData) {
  await prisma.membershipPromoBullet.create({
    data: {
      promoId: 'main',
      text: String(formData.get('text') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidateSpecialsPage();
  revalidatePath('/admin/dashboard/content/membership');
}

export async function updateMembershipBulletAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.membershipPromoBullet.update({
    where: { id },
    data: {
      text: String(formData.get('text') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidateSpecialsPage();
  revalidatePath('/admin/dashboard/content/membership');
}

export async function deleteMembershipBulletAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.membershipPromoBullet.delete({ where: { id } });
  revalidateSpecialsPage();
  revalidatePath('/admin/dashboard/content/membership');
}
