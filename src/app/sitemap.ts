import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astra.goeasytool.com';

const VEDIC_ROUTES = [
  'kundli', 'divisional', 'yogas', 'remedies',
  'dashas', 'transits', 'nakshatra', 'kp',
  'panchang', 'muhurta', 'ashtakavarga',
  'compatibility',
  'shadbala', 'jaimini', 'career', 'wealth',
  'health', 'predictions', 'nadi',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/settings`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const vedicPages: MetadataRoute.Sitemap = VEDIC_ROUTES.map((route) => ({
    url: `${BASE_URL}/vedic/${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...vedicPages];
}
