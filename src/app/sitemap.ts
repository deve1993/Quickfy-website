import { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quickfy.com';

  // Define all routes in the application
  const routes = [
    '',  // Homepage
    '/whappi',
    '/privacy-policy',
    '/terms-and-conditions'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate entries for each locale and route
  locales.forEach(locale => {
    routes.forEach(route => {
      const url = `${baseUrl}/${locale}${route}`;

      // Create alternate language links
      const languages: Record<string, string> = {};
      locales.forEach(l => {
        languages[l] = `${baseUrl}/${l}${route}`;
      });

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages
        }
      });
    });
  });

  return sitemapEntries;
}
