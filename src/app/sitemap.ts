import type { MetadataRoute } from 'next';

import { detailPages, slugToPath } from '@/features/site/detailPages';
import { siteMetadata } from '@/features/site/siteContent';

const staticRoutes = ['/', '/about', '/contact'];
type SitemapEntry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: SitemapEntry[] = [
    ...staticRoutes.map((route) => ({
      url: new URL(route, siteMetadata.siteUrl).toString(),
      lastModified,
      changeFrequency: route === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '/' ? 1 : 0.8,
    })),
    ...detailPages.map((page) => ({
      url: new URL(slugToPath(page.slug), siteMetadata.siteUrl).toString(),
      lastModified,
      changeFrequency:
        page.slug[0] === 'services' ? ('monthly' as const) : ('weekly' as const),
      priority: page.slug.length === 1 ? 0.9 : 0.8,
    })),
  ];

  return entries;
}
