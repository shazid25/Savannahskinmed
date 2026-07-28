import type { MetadataRoute } from 'next';

import { seoRoutes } from '@/lib/seoRoutes';
import { SITE_URL } from '@/lib/siteUrl';

export default function sitemap(): MetadataRoute.Sitemap {
  return seoRoutes.map(({ route }) => ({
    url: `${SITE_URL}${route === '/' ? '/' : route}`,
    changeFrequency: route === '/' ? 'daily' : 'monthly',
  }));
}
