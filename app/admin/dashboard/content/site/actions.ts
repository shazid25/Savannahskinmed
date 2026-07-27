'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { HoursKind, FooterLinkGroup } from '@/lib/generated/prisma/client';

function revalidatePublicPages() {
  revalidatePath('/', 'layout');
}

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export async function updateSiteSettingAction(formData: FormData) {
  const data = {
    name: String(formData.get('name') || ''),
    phone: String(formData.get('phone') || ''),
    phoneHref: String(formData.get('phoneHref') || ''),
    email: String(formData.get('email') || ''),
    emailHref: String(formData.get('emailHref') || ''),
    bookingUrl: String(formData.get('bookingUrl') || ''),
    copyrightText: String(formData.get('copyrightText') || ''),
  };

  await prisma.siteSetting.upsert({
    where: { id: 'main' },
    update: data,
    create: { id: 'main', ...data },
  });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

// ---------------------------------------------------------------------------
// Social links
// ---------------------------------------------------------------------------

export async function createSocialLinkAction(formData: FormData) {
  await prisma.socialLink.create({
    data: {
      label: String(formData.get('label') || ''),
      href: String(formData.get('href') || ''),
      icon: String(formData.get('icon') || 'facebook'),
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

export async function updateSocialLinkAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.socialLink.update({
    where: { id },
    data: {
      label: String(formData.get('label') || ''),
      href: String(formData.get('href') || ''),
      icon: String(formData.get('icon') || 'facebook'),
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

export async function deleteSocialLinkAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.socialLink.delete({ where: { id } });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

// ---------------------------------------------------------------------------
// Locations
// ---------------------------------------------------------------------------

export async function createLocationAction(formData: FormData) {
  const addressLines = String(formData.get('addressLines') || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  await prisma.location.create({
    data: {
      city: String(formData.get('city') || ''),
      badge: String(formData.get('badge') || '') || null,
      addressLines,
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

export async function updateLocationAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  const addressLines = String(formData.get('addressLines') || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  await prisma.location.update({
    where: { id },
    data: {
      city: String(formData.get('city') || ''),
      badge: String(formData.get('badge') || '') || null,
      addressLines,
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

export async function deleteLocationAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.location.delete({ where: { id } });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

export async function createLocationHourAction(formData: FormData) {
  const locationId = String(formData.get('locationId') || '');
  if (!locationId) return;
  await prisma.locationHours.create({
    data: {
      locationId,
      kind: String(formData.get('kind')) === 'SHORT' ? HoursKind.SHORT : HoursKind.FULL,
      days: String(formData.get('days') || ''),
      time: String(formData.get('time') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

export async function updateLocationHourAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.locationHours.update({
    where: { id },
    data: {
      kind: String(formData.get('kind')) === 'SHORT' ? HoursKind.SHORT : HoursKind.FULL,
      days: String(formData.get('days') || ''),
      time: String(formData.get('time') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

export async function deleteLocationHourAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.locationHours.delete({ where: { id } });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

// ---------------------------------------------------------------------------
// Footer nav links (Quick Links + Services column)
// ---------------------------------------------------------------------------

export async function createFooterLinkAction(formData: FormData) {
  await prisma.footerNavLink.create({
    data: {
      group: String(formData.get('group')) === 'FOOTER_SERVICE'
        ? FooterLinkGroup.FOOTER_SERVICE
        : FooterLinkGroup.QUICK_LINK,
      label: String(formData.get('label') || ''),
      href: String(formData.get('href') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

export async function updateFooterLinkAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.footerNavLink.update({
    where: { id },
    data: {
      label: String(formData.get('label') || ''),
      href: String(formData.get('href') || ''),
      sortOrder: Number(formData.get('sortOrder') || 0),
    },
  });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}

export async function deleteFooterLinkAction(formData: FormData) {
  const id = String(formData.get('id') || '');
  if (!id) return;
  await prisma.footerNavLink.delete({ where: { id } });
  revalidatePublicPages();
  revalidatePath('/admin/dashboard/content/site');
}
