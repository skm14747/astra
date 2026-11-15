import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/content/blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

const VEDIC_ROUTES = [
  'kundli', 'divisional', 'yogas', 'remedies',
  'dashas', 'transits', 'nakshatra', 'kp',
  'panchang', 'muhurta', 'ashtakavarga',
  'compatibility',
  'shadbala', 'jaimini', 'career', 'wealth',
  'health', 'predictions', 'nadi', 'report',
  'mangal-dosha', 'kaal-sarp-dosha', 'navamsa',
] as const;

const MATRIX_ROUTES = ['chart', 'health', 'timeline', 'compatibility'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const ogImageUrl = `${BASE_URL}/og-image.png`;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [ogImageUrl],
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/settings`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const vedicPages: MetadataRoute.Sitemap = VEDIC_ROUTES.map((route) => ({
    url: `${BASE_URL}/vedic/${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    images: [ogImageUrl],
  }));

  const matrixPages: MetadataRoute.Sitemap = MATRIX_ROUTES.map((route) => ({
    url: `${BASE_URL}/matrix/${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
    images: [ogImageUrl],
  }));

  const panchangDates: MetadataRoute.Sitemap = [];
  for (let i = -7; i <= 30; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    panchangDates.push({
      url: `${BASE_URL}/vedic/panchang/${dateStr}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: i === 0 ? 0.9 : 0.6,
    });
  }

  const blogPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    ...BLOG_POSTS.map(post => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  const monthlyPanchang: MetadataRoute.Sitemap = [];
  for (let offset = -1; offset <= 6; offset++) {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    const slug = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthlyPanchang.push({
      url: `${BASE_URL}/vedic/panchang/month/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: offset === 0 ? 0.8 : 0.5,
    });
  }

  return [...staticPages, ...vedicPages, ...matrixPages, ...panchangDates, ...monthlyPanchang, ...blogPages];
}
