'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';

function digitsOnly(value: string) {
  return value.replace(/[^\d]/g, '');
}

async function upsertSocial(icon: string, label: string, href: string) {
  const existing = await prisma.socialLink.findFirst({ where: { icon } });

  if (!href.trim()) {
    if (existing) await prisma.socialLink.delete({ where: { id: existing.id } });
    return;
  }

  if (existing) {
    await prisma.socialLink.update({ where: { id: existing.id }, data: { label, href } });
  } else {
    const count = await prisma.socialLink.count();
    await prisma.socialLink.create({ data: { icon, label, href, sortOrder: count } });
  }
}

export async function updateSettingsAction(formData: FormData) {
  const get = (name: string) => String(formData.get(name) || '').trim();

  const phone = get('phone');
  const email = get('email');

  await prisma.siteSetting.upsert({
    where: { id: 'main' },
    update: {
      name: get('name'),
      description: get('description'),
      email,
      emailHref: email ? `mailto:${email}` : '',
      phone,
      phoneHref: phone ? `tel:+1${digitsOnly(phone)}` : '',
      address: get('address'),
      faviconUrl: get('faviconUrl'),
      googleAnalyticsId: get('googleAnalyticsId'),
      metaPixelId: get('metaPixelId'),
      headerTrackingCode: get('headerTrackingCode'),
      footerTrackingCode: get('footerTrackingCode'),
    },
    create: {
      id: 'main',
      name: get('name'),
      description: get('description'),
      email,
      emailHref: email ? `mailto:${email}` : '',
      phone,
      phoneHref: phone ? `tel:+1${digitsOnly(phone)}` : '',
      address: get('address'),
      bookingUrl: '/contact-us',
      copyrightText: `Copyright © ${new Date().getFullYear()} ${get('name')}`,
      faviconUrl: get('faviconUrl'),
      googleAnalyticsId: get('googleAnalyticsId'),
      metaPixelId: get('metaPixelId'),
      headerTrackingCode: get('headerTrackingCode'),
      footerTrackingCode: get('footerTrackingCode'),
    },
  });

  await upsertSocial('twitter', 'Twitter', get('twitter'));
  await upsertSocial('linkedin', 'LinkedIn', get('linkedin'));
  await upsertSocial('github', 'GitHub', get('github'));
  await upsertSocial('facebook', 'Facebook', get('facebook'));
  await upsertSocial('instagram', 'Instagram', get('instagram'));

  revalidatePath('/', 'layout');
  revalidatePath('/admin/dashboard/settings');
}
