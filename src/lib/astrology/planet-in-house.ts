/**
 * Planet-in-House article data for 108 programmatic SEO pages.
 * Uses existing interpretation data from vedic/interpretations/planet-in-house.ts
 */

const PLANETS = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'] as const;
const PLANET_NAMES: Record<string, string> = {
  sun: 'Sun', moon: 'Moon', mars: 'Mars', mercury: 'Mercury',
  jupiter: 'Jupiter', venus: 'Venus', saturn: 'Saturn', rahu: 'Rahu', ketu: 'Ketu',
};

const HOUSE_NAMES = [
  '1st House (Lagna)', '2nd House (Dhana)', '3rd House (Sahaja)',
  '4th House (Sukha)', '5th House (Putra)', '6th House (Ari)',
  '7th House (Yuvati)', '8th House (Randhra)', '9th House (Dharma)',
  '10th House (Karma)', '11th House (Labha)', '12th House (Vyaya)',
];

const HOUSE_THEMES = [
  'Self, identity, appearance, vitality, and overall life direction',
  'Wealth, speech, family values, food, and early education',
  'Siblings, courage, communication, short journeys, and skills',
  'Home, mother, vehicles, property, and emotional foundation',
  'Children, intelligence, creativity, romance, and past-life merit',
  'Health, enemies, debts, daily work, and service',
  'Marriage, partnerships, business, and foreign connections',
  'Longevity, sudden changes, occult, inheritance, and transformation',
  'Fortune, dharma, father, guru, higher learning, and pilgrimage',
  'Career, public status, authority, government, and reputation',
  'Income, gains, elder siblings, social networks, and desires',
  'Expenditure, losses, foreign lands, spirituality, and liberation',
];

export interface PlanetInHouseArticle {
  slug: string;
  planet: string;
  planetName: string;
  house: number;
  houseName: string;
  houseTheme: string;
  title: string;
  description: string;
  keywords: string[];
}

export function generateAllSlugs(): string[] {
  const slugs: string[] = [];
  for (const planet of PLANETS) {
    for (let house = 1; house <= 12; house++) {
      slugs.push(`${planet}-in-${house}${getOrdinalSuffix(house)}-house`);
    }
  }
  return slugs;
}

function getOrdinalSuffix(n: number): string {
  if (n === 1) return 'st';
  if (n === 2) return 'nd';
  if (n === 3) return 'rd';
  return 'th';
}

export function parseSlug(slug: string): { planet: string; house: number } | null {
  const match = slug.match(/^(sun|moon|mars|mercury|jupiter|venus|saturn|rahu|ketu)-in-(\d+)(?:st|nd|rd|th)-house$/);
  if (!match) return null;
  return { planet: match[1], house: parseInt(match[2], 10) };
}

export function getArticleData(slug: string): PlanetInHouseArticle | null {
  const parsed = parseSlug(slug);
  if (!parsed || parsed.house < 1 || parsed.house > 12) return null;

  const { planet, house } = parsed;
  const planetName = PLANET_NAMES[planet];
  const houseName = HOUSE_NAMES[house - 1];
  const houseTheme = HOUSE_THEMES[house - 1];
  const ord = `${house}${getOrdinalSuffix(house)}`;

  return {
    slug,
    planet,
    planetName,
    house,
    houseName,
    houseTheme,
    title: `${planetName} in ${ord} House — Vedic Astrology Meaning & Effects`,
    description: `${planetName} in the ${ord} house in Vedic astrology: effects on ${houseTheme.toLowerCase()}. Complete interpretation with strong & weak placement results.`,
    keywords: [
      `${planet} in ${ord} house`,
      `${planet} in ${ord} house vedic astrology`,
      `${planetName} in ${ord} house effects`,
      `${planetName} ${ord} house meaning`,
    ],
  };
}

export const ALL_SLUGS = generateAllSlugs();
