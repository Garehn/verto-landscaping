import type { MetadataRoute } from 'next';
import { BASE_URL } from './sitemap';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The studio is an internal tool and the endpoints are not pages. The
      // studio also carries a noindex tag; this keeps crawlers out of the
      // photo library it serves.
      disallow: ['/studio', '/studio/', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
