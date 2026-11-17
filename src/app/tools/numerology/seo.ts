import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export type NumerologyPageSeo = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  seoIntro: {
    heading: string;
    text: string;
  };
  faqs?: { question: string; answer: string }[];
  relatedTools?: { href: string; label: string }[];
};

export const NUMEROLOGY_SEO: Record<string, NumerologyPageSeo> = {
  hub: {
    title: 'Free Numerology Calculator — Life Path, Destiny & Lo Shu Grid',
    description:
      'Free Pythagorean numerology calculator — Life Path number, Destiny number, Soul Urge, Personality, Personal Year & Lo Shu Grid from your name and birth date.',
    canonical: '/tools/numerology',
    keywords: ['numerology calculator', 'free numerology calculator', 'numerology by date of birth', 'life path number', 'destiny number', 'numerology chart', 'numerology calculator free', 'numerology reading free'],
    seoIntro: {
      heading: 'What is Numerology?',
      text: 'Numerology is the study of numbers and their vibrational influence on human life. The Pythagorean system — the most widely used in the West — assigns numbers 1-9 to each letter of the alphabet and reduces birth dates and names to single digits (or Master Numbers 11, 22, 33). Your Life Path Number (from your birth date) reveals your life purpose. Your Destiny Number (from your full birth name) shows your natural talents. Together with Soul Urge, Personality, and Personal Year numbers, they create a complete numerological profile.',
    },
    faqs: [
      { question: 'How is Life Path number calculated?', answer: 'Add each component of your birth date separately (month, day, year), reduce each to a single digit or master number, then add and reduce again. Example: March 15, 1990 → 3 + 6 + 19 → 3 + 6 + 1 → 10 → 1. Master numbers (11, 22, 33) are not reduced.' },
      { question: 'What are Master Numbers in numerology?', answer: '11, 22, and 33 are Master Numbers — they carry intensified energy and are not reduced to single digits. Life Path 11 is the Intuitive, 22 is the Master Builder, and 33 is the Master Teacher.' },
      { question: 'What is the Lo Shu Grid?', answer: 'The Lo Shu Grid is a 3×3 magic square (based on the ancient Chinese Lo Shu turtle legend) where digits from your birth date are placed. Missing numbers reveal karmic lessons, while repeated numbers show concentrated strengths.' },
    ],
    relatedTools: [
      { href: '/tools/numerology/life-path', label: 'Life Path Number' },
      { href: '/tools/numerology/destiny-number', label: 'Destiny Number' },
      { href: '/tools/numerology/personal-year', label: 'Personal Year' },
      { href: '/tools/numerology/lo-shu-grid', label: 'Lo Shu Grid' },
      { href: '/vedic/kundli', label: 'Vedic Birth Chart' },
    ],
  },
  'life-path': {
    title: 'Life Path Number Calculator — Free Numerology by Date of Birth',
    description:
      'Free Life Path Number calculator — discover your life purpose from your date of birth. Full meaning for numbers 1-9, 11, 22 & 33 with career, relationship & spiritual insights.',
    canonical: '/tools/numerology/life-path',
    keywords: ['life path number calculator', 'life path number', 'numerology life path', 'life path number meaning', 'free life path calculator', 'life path by date of birth'],
    seoIntro: {
      heading: 'What is Your Life Path Number?',
      text: 'Your Life Path Number is the single most important number in your numerology chart — it reveals your life purpose, natural strengths, and the challenges you will face. Calculated from your complete date of birth, it remains constant throughout your life. Unlike zodiac signs which change monthly, Life Path numbers are unique to your exact birth date. Numbers 1-9 each carry distinct vibrations, while Master Numbers 11, 22, and 33 indicate intensified spiritual missions.',
    },
    relatedTools: [
      { href: '/tools/numerology', label: 'Full Numerology Profile' },
      { href: '/tools/numerology/destiny-number', label: 'Destiny Number' },
      { href: '/tools/numerology/personal-year', label: 'Personal Year' },
      { href: '/vedic/kundli', label: 'Vedic Birth Chart' },
    ],
  },
  'destiny-number': {
    title: 'Destiny Number Calculator — Free Expression Number by Name',
    description:
      'Free Destiny (Expression) Number calculator — reduce your full birth name to a single number revealing natural talents, abilities & life purpose.',
    canonical: '/tools/numerology/destiny-number',
    keywords: ['destiny number calculator', 'expression number', 'destiny number meaning', 'numerology by name', 'name numerology calculator', 'free destiny number calculator'],
    seoIntro: {
      heading: 'What is Your Destiny Number?',
      text: 'Your Destiny Number (also called Expression Number) is calculated from the full name given at birth. Each letter is assigned a Pythagorean number value (A=1, B=2... Z=8), and the total is reduced to a single digit or Master Number. While your Life Path reveals your life purpose, the Destiny Number reveals your natural talents and the tools you have to fulfill that purpose. It describes what you are naturally good at, your inherent abilities, and the impression you make on others.',
    },
    relatedTools: [
      { href: '/tools/numerology', label: 'Full Numerology Profile' },
      { href: '/tools/numerology/life-path', label: 'Life Path Number' },
      { href: '/tools/numerology/personal-year', label: 'Personal Year' },
    ],
  },
  'personal-year': {
    title: 'Personal Year Number Calculator — Free Numerology Forecast',
    description:
      'Free Personal Year Number calculator — discover the theme and energy of your current year. 9-year numerology cycle forecast with monthly breakdowns.',
    canonical: '/tools/numerology/personal-year',
    keywords: ['personal year number calculator', 'personal year numerology', 'numerology forecast', 'personal year meaning', 'free personal year calculator', 'numerology year calculator'],
    seoIntro: {
      heading: 'What is Your Personal Year Number?',
      text: 'Your Personal Year Number reveals the theme and energy of each year in your life. Numerology operates in 9-year cycles: Year 1 initiates new beginnings, Year 9 brings completion and endings, and each year between carries its own specific energy. Your Personal Year is calculated by adding your birth month + birth day + the current calendar year and reducing to a single digit. Understanding your current Personal Year helps you align your actions with natural timing.',
    },
    relatedTools: [
      { href: '/tools/numerology', label: 'Full Numerology Profile' },
      { href: '/tools/numerology/life-path', label: 'Life Path Number' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/predictions', label: 'Vedic Predictions' },
    ],
  },
  'lo-shu-grid': {
    title: 'Lo Shu Grid Calculator — Free Numerology Grid by Birth Date',
    description:
      'Free Lo Shu Grid numerology calculator — map your birth date digits onto the 3×3 magic square. Discover missing numbers, arrows, and planes revealing karmic lessons.',
    canonical: '/tools/numerology/lo-shu-grid',
    keywords: ['lo shu grid calculator', 'lo shu grid numerology', 'numerology grid', 'lo shu missing numbers', 'free lo shu calculator', 'lo shu grid birth date'],
    seoIntro: {
      heading: 'What is the Lo Shu Grid?',
      text: 'The Lo Shu Grid is a 3×3 magic square used in numerology to reveal personality traits and karmic lessons from your birth date. Based on the ancient Chinese legend of a divine turtle emerging from the Lo River with a pattern of dots on its shell, the grid maps digits 1-9 into three planes: Mental (4-9-2), Emotional (3-5-7), and Practical (8-1-6). Digits from your full birth date (DD/MM/YYYY) are placed in their corresponding positions. Missing numbers indicate areas that need development, while repeated numbers show concentrated strengths.',
    },
    relatedTools: [
      { href: '/tools/numerology', label: 'Full Numerology Profile' },
      { href: '/tools/numerology/life-path', label: 'Life Path Number' },
      { href: '/matrix/chart', label: 'Matrix of Destiny' },
    ],
  },
};

export function buildNumerologyMetadata(slug: string): Metadata {
  const seo = NUMEROLOGY_SEO[slug];
  if (!seo) return {};
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `${BASE_URL}${seo.canonical}`,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${BASE_URL}${seo.canonical}`,
      siteName: 'Astra Destiny',
      type: 'website',
    },
  };
}
