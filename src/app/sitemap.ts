import type { MetadataRoute } from 'next';
import { BLOG_POSTS } from '@/content/blog';
import { ALL_SLUGS as PLANET_IN_HOUSE_ROUTES } from '@/lib/astrology/planet-in-house';
import { ALL_NAKSHATRA_SLUGS } from '@/lib/astrology/nakshatra-articles';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

const LOCALES = ['en', 'hi', 'ne', 'pt', 'es', 'ja', 'fr', 'ko'] as const;
type Locale = (typeof LOCALES)[number];

const VEDIC_ROUTES = [
  'kundli', 'divisional', 'yogas', 'remedies',
  'dashas', 'transits', 'nakshatra', 'kp',
  'panchang', 'muhurta', 'ashtakavarga',
  'compatibility',
  'shadbala', 'jaimini', 'career', 'wealth',
  'health', 'predictions', 'nadi', 'report',
  'mangal-dosha', 'kaal-sarp-dosha', 'navamsa',
  'sade-sati', 'choghadiya', 'hora',
  'atmakaraka', 'darakaraka', 'upapada', 'karakamsha', 'arudha-pada', 'varshphal',
] as const;

const NUMEROLOGY_ROUTES = ['', 'life-path', 'destiny-number', 'personal-year', 'lo-shu-grid'] as const;

const WESTERN_ROUTES = ['lilith', 'chiron', 'saturn-return', 'north-node', 'synastry'] as const;

const MATRIX_ROUTES = ['chart', 'health', 'timeline', 'compatibility'] as const;

/**
 * Normalizes URL with trailing slash matching next.config.ts `trailingSlash: true`.
 * Root:
 *   en → https://astradestiny.com/
 *   hi → https://astradestiny.com/hi/
 * Path:
 *   en → https://astradestiny.com/vedic/kundli/
 *   hi → https://astradestiny.com/hi/vedic/kundli/
 */
function formatUrl(locale: Locale, path: string): string {
  const cleanPath = path === '/' ? '' : path.replace(/^\/+/, '').replace(/\/+$/, '');
  if (locale === 'en') {
    return cleanPath ? `${BASE_URL}/${cleanPath}/` : `${BASE_URL}/`;
  }
  return cleanPath ? `${BASE_URL}/${locale}/${cleanPath}/` : `${BASE_URL}/${locale}/`;
}

function alternates(path: string): MetadataRoute.Sitemap[number]['alternates'] {
  return {
    languages: Object.fromEntries(
      LOCALES.map((locale) => [locale, formatUrl(locale, path)]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const ogImageUrl = `${BASE_URL}/og-image.png`;

  const STATIC_PATHS: { path: string; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'; priority: number; hasImage?: boolean }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0, hasImage: true },
    { path: '/tools', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/methodology', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/horoscope/today', changeFrequency: 'daily', priority: 0.9 },
    { path: '/rashifal', changeFrequency: 'daily', priority: 0.9 },
    { path: '/settings', changeFrequency: 'monthly', priority: 0.3 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/disclaimer', changeFrequency: 'yearly', priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(item => {
    return LOCALES.map(locale => {
      const isDefault = locale === 'en';
      return {
        url: formatUrl(locale, item.path),
        lastModified: now,
        changeFrequency: item.changeFrequency,
        priority: isDefault ? item.priority : Math.max(0.3, Number((item.priority - 0.1).toFixed(1))),
        images: item.hasImage && isDefault ? [ogImageUrl] : undefined,
        alternates: alternates(item.path),
      };
    });
  });

  const vedicEntries: MetadataRoute.Sitemap = VEDIC_ROUTES.flatMap(route => {
    const path = `/vedic/${route}`;
    return LOCALES.map(locale => {
      const isDefault = locale === 'en';
      return {
        url: formatUrl(locale, path),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: isDefault ? 0.8 : 0.7,
        images: isDefault ? [ogImageUrl] : undefined,
        alternates: alternates(path),
      };
    });
  });

  const numerologyEntries: MetadataRoute.Sitemap = NUMEROLOGY_ROUTES.flatMap(route => {
    const path = route ? `/tools/numerology/${route}` : '/tools/numerology';
    return LOCALES.map(locale => {
      const isDefault = locale === 'en';
      return {
        url: formatUrl(locale, path),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: isDefault ? 0.7 : 0.6,
        images: isDefault ? [ogImageUrl] : undefined,
        alternates: alternates(path),
      };
    });
  });

  const westernEntries: MetadataRoute.Sitemap = WESTERN_ROUTES.flatMap(route => {
    const path = `/tools/western/${route}`;
    return LOCALES.map(locale => {
      const isDefault = locale === 'en';
      return {
        url: formatUrl(locale, path),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: isDefault ? 0.7 : 0.6,
        images: isDefault ? [ogImageUrl] : undefined,
        alternates: alternates(path),
      };
    });
  });

  const matrixEntries: MetadataRoute.Sitemap = MATRIX_ROUTES.flatMap(route => {
    const path = `/matrix/${route}`;
    return LOCALES.map(locale => {
      const isDefault = locale === 'en';
      return {
        url: formatUrl(locale, path),
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: isDefault ? 0.7 : 0.6,
        images: isDefault ? [ogImageUrl] : undefined,
        alternates: alternates(path),
      };
    });
  });

  const panchangDates: MetadataRoute.Sitemap = [];
  for (let i = 0; i <= 30; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    const path = `/vedic/panchang/${dateStr}`;
    const basePri = i === 0 ? 0.9 : 0.6;
    for (const locale of LOCALES) {
      panchangDates.push({
        url: formatUrl(locale, path),
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: locale === 'en' ? basePri : Math.max(0.3, Number((basePri - 0.1).toFixed(1))),
        alternates: alternates(path),
      });
    }
  }

  const blogEntries: MetadataRoute.Sitemap = [
    ...LOCALES.map(locale => ({
      url: formatUrl(locale, '/blog'),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: locale === 'en' ? 0.7 : 0.6,
      alternates: alternates('/blog'),
    })),
    ...BLOG_POSTS.map(post => ({
      url: formatUrl('en', `/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  const monthlyPanchang: MetadataRoute.Sitemap = [];
  for (let offset = 0; offset <= 6; offset++) {
    const d = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    const slug = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const path = `/vedic/panchang/month/${slug}`;
    const basePri = offset === 0 ? 0.8 : 0.5;
    for (const locale of LOCALES) {
      monthlyPanchang.push({
        url: formatUrl(locale, path),
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: locale === 'en' ? basePri : Math.max(0.3, Number((basePri - 0.1).toFixed(1))),
        alternates: alternates(path),
      });
    }
  }

  const planetInHouseEntries: MetadataRoute.Sitemap = [
    ...LOCALES.map(locale => ({
      url: formatUrl(locale, '/astrology'),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: locale === 'en' ? 0.8 : 0.7,
      alternates: alternates('/astrology'),
    })),
    ...PLANET_IN_HOUSE_ROUTES.map(slug => ({
      url: formatUrl('en', `/astrology/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  const nakshatraEntries: MetadataRoute.Sitemap = [
    ...LOCALES.map(locale => ({
      url: formatUrl(locale, '/nakshatras'),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: locale === 'en' ? 0.8 : 0.7,
      alternates: alternates('/nakshatras'),
    })),
    ...ALL_NAKSHATRA_SLUGS.map(slug => ({
      url: formatUrl('en', `/nakshatras/${slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  const LOVE_ROUTES = [
    '/horoscope/love',
    '/astrology/venus-mars-compatibility',
    '/astrology/darakaraka-spouse',
    '/astrology/marriage-timing',
    '/astrology/synastry-aspects',
  ];
  const loveEntries: MetadataRoute.Sitemap = LOVE_ROUTES.map(path => ({
    url: formatUrl('en', path),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...vedicEntries, ...numerologyEntries, ...westernEntries, ...matrixEntries, ...planetInHouseEntries, ...nakshatraEntries, ...loveEntries, ...panchangDates, ...monthlyPanchang, ...blogEntries];
}
