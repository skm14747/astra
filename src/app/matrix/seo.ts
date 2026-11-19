import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export type MatrixPageSeo = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  seoIntro: {
    heading: string;
    text: string;
  };
  relatedTools?: { href: string; label: string }[];
};

export const MATRIX_SEO: Record<string, MatrixPageSeo> = {
  chart: {
    title: 'Matrix of Destiny Calculator — Birth Number Chart',
    description:
      'Free Matrix of Destiny calculator. Decode your personal octagram with 22 Major Arcana energies, life purposes, love & money lines, and talents from your birth date.',
    canonical: '/matrix/chart',
    keywords: ['matrix of destiny', 'matrix of destiny calculator', 'birth number chart', 'arcana energy', 'destiny matrix'],
    seoIntro: {
      heading: 'What is the Matrix of Destiny?',
      text: 'The Matrix of Destiny is a numerological system that maps 22 Major Arcana energies onto an octagram (8-pointed star) derived from your birth date. Each position reveals a core energy governing your personality, karmic lessons, talents, and life purposes. The system decodes personal, social, general, and planetary purposes alongside love and money lines to provide a comprehensive life-path blueprint.',
    },
    relatedTools: [
      { href: '/matrix/health', label: 'Health Card' },
      { href: '/matrix/timeline', label: 'Life Timeline' },
      { href: '/matrix/compatibility', label: 'Matrix Compatibility' },
      { href: '/vedic/kundli', label: 'Vedic Birth Chart' },
    ],
  },
  health: {
    title: 'Matrix Health Card — 7-Chakra Analysis',
    description:
      'Discover your health strengths and vulnerabilities through a 7-chakra analysis based on your Matrix of Destiny birth numbers. Free chakra health mapping.',
    canonical: '/matrix/health',
    keywords: ['matrix health card', 'chakra analysis', 'birth number health', 'destiny matrix health'],
    seoIntro: {
      heading: 'Matrix of Destiny Health Analysis',
      text: 'The Matrix Health Card maps your birth number energies to the 7 chakra system, revealing which energy centers are naturally strong and which may need attention. Each chakra corresponds to specific physical and emotional health areas. This analysis provides actionable insights for preventive health awareness based on your unique birth date configuration.',
    },
    relatedTools: [
      { href: '/matrix/chart', label: 'Matrix of Destiny' },
      { href: '/vedic/health', label: 'Vedic Health Analysis' },
      { href: '/matrix/timeline', label: 'Life Timeline' },
    ],
  },
  timeline: {
    title: 'Life Timeline — Age-by-Age Energy Cycles',
    description:
      'View your Matrix of Destiny life timeline with age-by-age energy cycles and yearly forecasts based on your birth date arcana progression.',
    canonical: '/matrix/timeline',
    keywords: ['life timeline', 'energy cycles', 'yearly forecast', 'destiny matrix timeline', 'age prediction'],
    seoIntro: {
      heading: 'Matrix Life Timeline',
      text: 'The Life Timeline tracks how your Matrix of Destiny energies unfold across different ages. Each year activates a specific Major Arcana energy, creating distinct cycles of growth, challenge, and opportunity. By understanding which energy governs your current and upcoming years, you can align your decisions with the natural rhythm of your personal matrix.',
    },
    relatedTools: [
      { href: '/matrix/chart', label: 'Matrix of Destiny' },
      { href: '/vedic/dashas', label: 'Vedic Dasha Timeline' },
      { href: '/vedic/predictions', label: 'Annual Predictions' },
    ],
  },
  compatibility: {
    title: 'Matrix Compatibility — Couples Harmony Analysis',
    description:
      'Compare two Matrix of Destiny charts for relationship harmony. Analyze arcana overlay, energy alignment, and couples compatibility from birth dates.',
    canonical: '/matrix/compatibility',
    keywords: ['matrix compatibility', 'couples harmony', 'destiny matrix matching', 'relationship analysis'],
    seoIntro: {
      heading: 'Matrix Compatibility Analysis',
      text: 'Matrix Compatibility overlays two personal octagram charts to reveal where partners\' energies align and where they create dynamic tension. It examines how your core arcana interact with your partner\'s, identifying areas of natural harmony, complementary strengths, and growth opportunities within the relationship.',
    },
    relatedTools: [
      { href: '/matrix/chart', label: 'Matrix of Destiny' },
      { href: '/vedic/compatibility', label: 'Kundli Milan (Vedic)' },
      { href: '/matrix/health', label: 'Health Card' },
    ],
  },
};

/** Ensure path has a trailing slash to match next.config.ts `trailingSlash: true`. */
function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

export function buildMatrixMetadata(slug: string): Metadata {
  const seo = MATRIX_SEO[slug];
  if (!seo) return {};
  const canonical = withTrailingSlash(seo.canonical);
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical,
      languages: {
        'en': canonical,
        'hi': `/hi${canonical}`,
        'ne': `/ne${canonical}`,
        'pt': `/pt${canonical}`,
        'es': `/es${canonical}`,
        'ja': `/ja${canonical}`,
        'fr': `/fr${canonical}`,
        'ko': `/ko${canonical}`,
        'x-default': canonical,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: ['/og-image.png'],
    },
  };
}
