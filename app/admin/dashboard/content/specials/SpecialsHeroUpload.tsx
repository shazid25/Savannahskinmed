'use client';

import { useState } from 'react';

import CloudinaryUpload from '@/components/admin/CloudinaryUpload';

type HeroSettings = {
  heroTitle: string;
  heroIntro: string;
  heroImage: string;
  heroImageAlt: string;
  offersHeading: string;
} | null;

const inputClass =
  'w-full rounded-lg border border-navy/15 px-3 py-2 text-[14px] text-navy outline-none focus:border-navy';

export default function SpecialsHeroUpload({ settings }: { settings: HeroSettings }) {
  const [heroImage, setHeroImage] = useState(settings?.heroImage || '');

  return (
    <div className="space-y-4">
      <CloudinaryUpload
        folder="specials/hero"
        currentUrl={heroImage}
        onUploaded={setHeroImage}
        label="Hero Image"
      />
      <input type="hidden" name="heroImage" value={heroImage} form="specials-save" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-[12px] text-muted">Hero Title</label>
          <input name="heroTitle" defaultValue={settings?.heroTitle} className={inputClass} form="specials-save" />
        </div>
        <div>
          <label className="mb-1 block text-[12px] text-muted">Offers Section Heading</label>
          <input name="offersHeading" defaultValue={settings?.offersHeading} className={inputClass} form="specials-save" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-[12px] text-muted">Hero Intro</label>
          <textarea name="heroIntro" defaultValue={settings?.heroIntro} rows={3} className={inputClass} form="specials-save" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1 block text-[12px] text-muted">Hero Image Alt Text</label>
          <input name="heroImageAlt" defaultValue={settings?.heroImageAlt} className={inputClass} form="specials-save" />
        </div>
      </div>
    </div>
  );
}
