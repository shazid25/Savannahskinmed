'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma';
import { HoursKind, FooterLinkGroup } from '@/lib/generated/prisma/client';

function revalidatePublicPages() {
  revalidatePath('/', 'layout');
}

// ---------------------------------------------------------------------------
// Locations
// ---------------------------------------------------------------------------
// Brand/contact/social/favicon/analytics/tracking settings now live under
// /admin/dashboard/settings (see app/admin/dashboard/settings/actions.ts).

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
      sortOrder: Math.max(0, Number(formData.get('sortOrder') || 1) - 1),
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
      sortOrder: Math.max(0, Number(formData.get('sortOrder') || 1) - 1),
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
      sortOrder: Math.max(0, Number(formData.get('sortOrder') || 1) - 1),
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
      sortOrder: Math.max(0, Number(formData.get('sortOrder') || 1) - 1),
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
      sortOrder: Math.max(0, Number(formData.get('sortOrder') || 1) - 1),
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
      sortOrder: Math.max(0, Number(formData.get('sortOrder') || 1) - 1),
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
