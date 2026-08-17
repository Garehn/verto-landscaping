import type { MetadataRoute } from 'next';
import { projects } from '@/lib/content';

export const BASE_URL = 'https://www.vertolandscapes.com.au';

// Built from the route list and the projects data, so adding a project puts it
// in the sitemap without anyone remembering to. /studio and the API routes are
// deliberately absent: the studio carries noindex and the endpoints are not
// pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }[] = [
    { path: '', priority: 1, changeFrequency: 'monthly' },
    { path: '/portfolio', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/about', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/process', priority: 0.6, changeFrequency: 'yearly' },
  ];

  return [
    ...pages.map((p) => ({
      url: `${BASE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...projects.map((project) => ({
      url: `${BASE_URL}/portfolio/${project.id}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
