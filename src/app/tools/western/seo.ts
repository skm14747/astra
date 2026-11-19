import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export type WesternPageSeo = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  seoIntro: { heading: string; text: string };
  faqs?: { question: string; answer: string }[];
  relatedTools?: { href: string; label: string }[];
};

export const WESTERN_SEO: Record<string, WesternPageSeo> = {
  lilith: {
    title: 'Black Moon Lilith Calculator — Free Lilith Sign Finder',
    description: 'Free Black Moon Lilith calculator — find your Lilith sign and degree from your birth date. Discover your shadow self, hidden desires, and repressed feminine energy.',
    canonical: '/tools/western/lilith',
    keywords: ['lilith calculator', 'black moon lilith calculator', 'lilith sign calculator', 'lilith in signs', 'free lilith calculator', 'dark moon lilith'],
    seoIntro: {
      heading: 'What is Black Moon Lilith?',
      text: 'Black Moon Lilith (Mean Lilith, h13) is the lunar apogee — the point in the Moon\'s orbit farthest from Earth. In astrology, Lilith represents the shadow self: repressed desires, raw feminine power, sexuality, and the parts of ourselves we hide from social view. Your Lilith sign reveals where you feel shame, rage, or compulsive attraction. Unlike planets, Lilith is a mathematical point — it has no physical body, but its influence on the psyche is profound.',
    },
    relatedTools: [
      { href: '/tools/western/chiron', label: 'Chiron Calculator' },
      { href: '/tools/western/north-node', label: 'North Node' },
      { href: '/vedic/kundli', label: 'Vedic Birth Chart' },
    ],
  },
  chiron: {
    title: 'Chiron Sign Calculator — Free Wounded Healer Finder',
    description: 'Free Chiron sign calculator — find your Chiron placement by birth date. Discover your core wound and unique healing gift in the birth chart.',
    canonical: '/tools/western/chiron',
    keywords: ['chiron calculator', 'chiron sign calculator', 'chiron in signs', 'wounded healer astrology', 'free chiron calculator', 'chiron placement'],
    seoIntro: {
      heading: 'What is Chiron in Astrology?',
      text: 'Chiron (asteroid 2060) is known as the "Wounded Healer" in astrology. Discovered in 1977, it orbits between Saturn and Uranus with a period of ~50.4 years. In the birth chart, Chiron shows your deepest wound — the area of life where you carry pain that seems impossible to fully heal, yet through that very wound, you develop the ability to heal others. Chiron\'s sign reveals the nature of the wound; its house shows where in life it manifests.',
    },
    relatedTools: [
      { href: '/tools/western/lilith', label: 'Lilith Calculator' },
      { href: '/tools/western/saturn-return', label: 'Saturn Return' },
      { href: '/vedic/remedies', label: 'Vedic Remedies' },
    ],
  },
  'saturn-return': {
    title: 'Saturn Return Calculator — Free Dates & Meaning',
    description: 'Free Saturn Return calculator — find your exact Saturn Return dates, ages, and what each return means. First return (~29), second (~58), third (~87) with full interpretation.',
    canonical: '/tools/western/saturn-return',
    keywords: ['saturn return calculator', 'saturn return dates', 'saturn return meaning', 'when is my saturn return', 'free saturn return calculator', 'saturn return age'],
    seoIntro: {
      heading: 'What is Saturn Return?',
      text: 'Saturn Return occurs when transiting Saturn returns to the exact zodiac position it occupied at your birth — approximately every 29.5 years. The first Saturn Return (ages 27-30) marks the true beginning of adulthood: career crystallization, relationship commitments, and confronting whether you\'re living authentically. The second return (ages 56-60) brings re-evaluation of life\'s achievements. The third (ages 84-90) is a final wisdom integration. Saturn Returns are periods of intense pressure, maturation, and lasting change.',
    },
    relatedTools: [
      { href: '/vedic/sade-sati', label: 'Sade Sati (Vedic Saturn)' },
      { href: '/tools/western/chiron', label: 'Chiron Calculator' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
    ],
  },
  'north-node': {
    title: 'North Node Calculator — Free Lunar Node Sign Finder',
    description: 'Free North Node (Rahu) calculator — find your North Node sign revealing your soul\'s evolutionary direction, karmic purpose, and growth path.',
    canonical: '/tools/western/north-node',
    keywords: ['north node calculator', 'north node sign', 'north node meaning', 'lunar node calculator', 'free north node calculator', 'true node calculator'],
    seoIntro: {
      heading: 'What is the North Node?',
      text: 'The North Node (also called Rahu in Vedic astrology, or the Dragon\'s Head) is one of two lunar nodes — the points where the Moon\'s orbit intersects the ecliptic. The North Node represents your soul\'s evolutionary direction: the qualities, experiences, and life areas you\'re meant to develop in this lifetime. It\'s uncomfortable and unfamiliar territory, but growth lies there. The South Node (Ketu) opposite it shows what you\'ve already mastered in past lives — comfortable but stagnant.',
    },
    relatedTools: [
      { href: '/vedic/kundli', label: 'Vedic Birth Chart (Rahu/Ketu)' },
      { href: '/tools/western/lilith', label: 'Lilith Calculator' },
      { href: '/vedic/nakshatra', label: 'Nakshatra' },
    ],
  },
  synastry: {
    title: 'Synastry Calculator — Free Relationship Astrology',
    description: 'Free synastry calculator — compare two birth charts to find relationship compatibility through planetary aspects, house overlays, and composite patterns.',
    canonical: '/tools/western/synastry',
    keywords: ['synastry calculator', 'synastry chart', 'relationship astrology', 'compatibility chart', 'free synastry calculator', 'synastry aspects'],
    seoIntro: {
      heading: 'What is Synastry?',
      text: 'Synastry is the astrological technique of comparing two birth charts to understand relationship dynamics. By overlaying one person\'s planets onto another\'s houses, astrologers can identify areas of harmony, tension, attraction, and growth. Key aspects to watch include conjunctions (intense connection), trines (easy flow), squares (friction that drives growth), and oppositions (magnetic attraction with tension). Venus-Mars aspects indicate physical chemistry; Moon aspects show emotional compatibility; Saturn aspects indicate longevity.',
    },
    relatedTools: [
      { href: '/vedic/compatibility', label: 'Kundli Matching (Vedic)' },
      { href: '/vedic/darakaraka', label: 'Darakaraka (Spouse)' },
      { href: '/vedic/upapada', label: 'Upapada Lagna' },
    ],
  },
};

/** Ensure path has a trailing slash to match next.config.ts `trailingSlash: true`. */
function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

export function buildWesternMetadata(slug: string): Metadata {
  const seo = WESTERN_SEO[slug];
  if (!seo) return {};
  const canonical = withTrailingSlash(seo.canonical);
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: `${BASE_URL}${canonical}` },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${BASE_URL}${canonical}`,
      siteName: 'Astra Destiny',
      type: 'website',
    },
  };
}
