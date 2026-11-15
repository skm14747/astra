import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/content/blog';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

const LOCALES = ['en', 'hi', 'ne', 'pt', 'es', 'ja'] as const;

const VEDIC_ROUTES = [
  'kundli', 'divisional', 'yogas', 'remedies',
  'dashas', 'transits', 'nakshatra', 'kp',
  'panchang', 'muhurta', 'ashtakavarga',
  'compatibility',
  'shadbala', 'jaimini', 'career', 'wealth',
  'health', 'predictions', 'nadi', 'report',
  'mangal-dosha', 'kaal-sarp-dosha', 'navamsa',
  'sade-sati', 'choghadiya',
] as const;

const MATRIX_ROUTES = ['chart', 'health', 'timeline', 'compatibility'] as const;

/**
 * Builds hreflang alternates for a given path.
 * English (default) → BASE_URL + path
 * Hindi             → BASE_URL + /hi + path
 */
function alternates(path: string): MetadataRoute.Sitemap[number]['alternates'] {
  return {
    languages: Object.fromEntries(
      LOCALES.map((locale) => [
        locale,
        locale === 'en' ? `${BASE_URL}${path}` : `${BASE_URL}/${locale}${path}`,
      ]),
    ),
  };
}

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
      alternates: alternates('/'),
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: alternates('/how-it-works'),
    },
    {
      url: `${BASE_URL}/settings`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: alternates('/settings'),
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: alternates('/tools'),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: alternates('/about'),
    },
    {
      url: `${BASE_URL}/methodology`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: alternates('/methodology'),
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: alternates('/privacy'),
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: alternates('/terms'),
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
      alternates: alternates('/disclaimer'),
    },
  ];

  // Hindi versions of static pages
  const hiStaticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/hi`, lastModified: now, changeFrequency: 'weekly', priority: 0.9, alternates: alternates('/') },
    { url: `${BASE_URL}/hi/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.5, alternates: alternates('/how-it-works') },
    { url: `${BASE_URL}/hi/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: alternates('/tools') },
    { url: `${BASE_URL}/hi/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.4, alternates: alternates('/about') },
    { url: `${BASE_URL}/hi/methodology`, lastModified: now, changeFrequency: 'monthly', priority: 0.4, alternates: alternates('/methodology') },
  ];

  // Nepali versions of static pages
  const neStaticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/ne`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: alternates('/') },
    { url: `${BASE_URL}/ne/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.4, alternates: alternates('/how-it-works') },
    { url: `${BASE_URL}/ne/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.7, alternates: alternates('/tools') },
    { url: `${BASE_URL}/ne/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.3, alternates: alternates('/about') },
    { url: `${BASE_URL}/ne/methodology`, lastModified: now, changeFrequency: 'monthly', priority: 0.3, alternates: alternates('/methodology') },
  ];

  // Portuguese versions of static pages
  const ptStaticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/pt`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: alternates('/') },
    { url: `${BASE_URL}/pt/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.4, alternates: alternates('/how-it-works') },
    { url: `${BASE_URL}/pt/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.7, alternates: alternates('/tools') },
    { url: `${BASE_URL}/pt/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.3, alternates: alternates('/about') },
    { url: `${BASE_URL}/pt/methodology`, lastModified: now, changeFrequency: 'monthly', priority: 0.3, alternates: alternates('/methodology') },
  ];

  // Spanish versions of static pages
  const esStaticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/es`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: alternates('/') },
    { url: `${BASE_URL}/es/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.4, alternates: alternates('/how-it-works') },
    { url: `${BASE_URL}/es/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.7, alternates: alternates('/tools') },
    { url: `${BASE_URL}/es/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.3, alternates: alternates('/about') },
    { url: `${BASE_URL}/es/methodology`, lastModified: now, changeFrequency: 'monthly', priority: 0.3, alternates: alternates('/methodology') },
  ];

  // Japanese versions of static pages
  const jaStaticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/ja`, lastModified: now, changeFrequency: 'weekly', priority: 0.8, alternates: alternates('/') },
    { url: `${BASE_URL}/ja/how-it-works`, lastModified: now, changeFrequency: 'monthly', priority: 0.4, alternates: alternates('/how-it-works') },
    { url: `${BASE_URL}/ja/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.7, alternates: alternates('/tools') },
    { url: `${BASE_URL}/ja/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.3, alternates: alternates('/about') },
    { url: `${BASE_URL}/ja/methodology`, lastModified: now, changeFrequency: 'monthly', priority: 0.3, alternates: alternates('/methodology') },
  ];

  const vedicPages: MetadataRoute.Sitemap = VEDIC_ROUTES.flatMap((route) => {
    const path = `/vedic/${route}`;
    return [
      {
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        images: [ogImageUrl],
        alternates: alternates(path),
      },
      {
        url: `${BASE_URL}/hi${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: alternates(path),
      },
      {
        url: `${BASE_URL}/ne${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: alternates(path),
      },
      {
        url: `${BASE_URL}/pt${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: alternates(path),
      },
      {
        url: `${BASE_URL}/es${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: alternates(path),
      },
      {
        url: `${BASE_URL}/ja${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: alternates(path),
      },
    ];
  });

  const matrixPages: MetadataRoute.Sitemap = MATRIX_ROUTES.flatMap((route) => {
    const path = `/matrix/${route}`;
    return [
      {
        url: `${BASE_URL}${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        images: [ogImageUrl],
        alternates: alternates(path),
      },
      {
        url: `${BASE_URL}/hi${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: alternates(path),
      },
      {
        url: `${BASE_URL}/ne${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
        alternates: alternates(path),
      },
      {
        url: `${BASE_URL}/pt${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
        alternates: alternates(path),
      },
      {
        url: `${BASE_URL}/es${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
        alternates: alternates(path),
      },
      {
        url: `${BASE_URL}/ja${path}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.5,
        alternates: alternates(path),
      },
    ];
  });

  const panchangDates: MetadataRoute.Sitemap = [];
  for (let i = -7; i <= 30; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const path = `/vedic/panchang/${dateStr}`;
    const pri = i === 0 ? 0.9 : 0.6;
    panchangDates.push(
      { url: `${BASE_URL}${path}`, lastModified: now, changeFrequency: 'daily' as const, priority: pri, alternates: alternates(path) },
      { url: `${BASE_URL}/hi${path}`, lastModified: now, changeFrequency: 'daily' as const, priority: pri - 0.1, alternates: alternates(path) },
      { url: `${BASE_URL}/ne${path}`, lastModified: now, changeFrequency: 'daily' as const, priority: pri - 0.2, alternates: alternates(path) },
      { url: `${BASE_URL}/pt${path}`, lastModified: now, changeFrequency: 'daily' as const, priority: pri - 0.2, alternates: alternates(path) },
      { url: `${BASE_URL}/es${path}`, lastModified: now, changeFrequency: 'daily' as const, priority: pri - 0.2, alternates: alternates(path) },
      { url: `${BASE_URL}/ja${path}`, lastModified: now, changeFrequency: 'daily' as const, priority: pri - 0.2, alternates: alternates(path) },
    );
  }

  const blogPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7, alternates: alternates('/blog') },
    { url: `${BASE_URL}/hi/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.6, alternates: alternates('/blog') },
    { url: `${BASE_URL}/ne/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.5, alternates: alternates('/blog') },
    { url: `${BASE_URL}/pt/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.5, alternates: alternates('/blog') },
    { url: `${BASE_URL}/es/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.5, alternates: alternates('/blog') },
    { url: `${BASE_URL}/ja/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.5, alternates: alternates('/blog') },
    ...BLOG_POSTS.flatMap(post => {
      const path = `/blog/${post.slug}`;
      return [
        { url: `${BASE_URL}${path}`, lastModified: new Date(post.date), changeFrequency: 'monthly' as const, priority: 0.6, alternates: alternates(path) },
        { url: `${BASE_URL}/hi${path}`, lastModified: new Date(post.date), changeFrequency: 'monthly' as const, priority: 0.5, alternates: alternates(path) },
        { url: `${BASE_URL}/ne${path}`, lastModified: new Date(post.date), changeFrequency: 'monthly' as const, priority: 0.4, alternates: alternates(path) },
        { url: `${BASE_URL}/pt${path}`, lastModified: new Date(post.date), changeFrequency: 'monthly' as const, priority: 0.4, alternates: alternates(path) },
        { url: `${BASE_URL}/es${path}`, lastModified: new Date(post.date), changeFrequency: 'monthly' as const, priority: 0.4, alternates: alternates(path) },
        { url: `${BASE_URL}/ja${path}`, lastModified: new Date(post.date), changeFrequency: 'monthly' as const, priority: 0.4, alternates: alternates(path) },
      ];
    }),
  ];

  const monthlyPanchang: MetadataRoute.Sitemap = [];
  for (let offset = -1; offset <= 6; offset++) {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    const slug = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const path = `/vedic/panchang/month/${slug}`;
    const pri = offset === 0 ? 0.8 : 0.5;
    monthlyPanchang.push(
      { url: `${BASE_URL}${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: pri, alternates: alternates(path) },
      { url: `${BASE_URL}/hi${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: pri - 0.1, alternates: alternates(path) },
      { url: `${BASE_URL}/ne${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: pri - 0.2, alternates: alternates(path) },
      { url: `${BASE_URL}/pt${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: pri - 0.2, alternates: alternates(path) },
      { url: `${BASE_URL}/es${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: pri - 0.2, alternates: alternates(path) },
      { url: `${BASE_URL}/ja${path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: pri - 0.2, alternates: alternates(path) },
    );
  }

  return [...staticPages, ...hiStaticPages, ...neStaticPages, ...ptStaticPages, ...esStaticPages, ...jaStaticPages, ...vedicPages, ...matrixPages, ...panchangDates, ...monthlyPanchang, ...blogPages];
}
