/**
 * Nakshatra article data for 27 programmatic SEO pages.
 * Extends existing NAKSHATRA_PROFILES with slug mapping and SEO metadata.
 */

import { NAKSHATRA_PROFILES, type NakshatraProfile } from '@/lib/vedic/interpretations/nakshatra-text';

export interface NakshatraArticle {
  index: number;
  slug: string;
  profile: NakshatraProfile;
  title: string;
  description: string;
  keywords: string[];
  degreeRange: string;
  rashi: string;
  pada: string[];
}

const NAKSHATRA_META: { slug: string; degreeRange: string; rashi: string; pada: string[] }[] = [
  { slug: 'ashwini', degreeRange: '0°00\' – 13°20\' Aries', rashi: 'Aries', pada: ['Aries', 'Taurus', 'Gemini', 'Cancer'] },
  { slug: 'bharani', degreeRange: '13°20\' – 26°40\' Aries', rashi: 'Aries', pada: ['Leo', 'Virgo', 'Libra', 'Scorpio'] },
  { slug: 'krittika', degreeRange: '26°40\' Aries – 10°00\' Taurus', rashi: 'Aries/Taurus', pada: ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
  { slug: 'rohini', degreeRange: '10°00\' – 23°20\' Taurus', rashi: 'Taurus', pada: ['Aries', 'Taurus', 'Gemini', 'Cancer'] },
  { slug: 'mrigashira', degreeRange: '23°20\' Taurus – 6°40\' Gemini', rashi: 'Taurus/Gemini', pada: ['Leo', 'Virgo', 'Libra', 'Scorpio'] },
  { slug: 'ardra', degreeRange: '6°40\' – 20°00\' Gemini', rashi: 'Gemini', pada: ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
  { slug: 'punarvasu', degreeRange: '20°00\' Gemini – 3°20\' Cancer', rashi: 'Gemini/Cancer', pada: ['Aries', 'Taurus', 'Gemini', 'Cancer'] },
  { slug: 'pushya', degreeRange: '3°20\' – 16°40\' Cancer', rashi: 'Cancer', pada: ['Leo', 'Virgo', 'Libra', 'Scorpio'] },
  { slug: 'ashlesha', degreeRange: '16°40\' – 30°00\' Cancer', rashi: 'Cancer', pada: ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
  { slug: 'magha', degreeRange: '0°00\' – 13°20\' Leo', rashi: 'Leo', pada: ['Aries', 'Taurus', 'Gemini', 'Cancer'] },
  { slug: 'purva-phalguni', degreeRange: '13°20\' – 26°40\' Leo', rashi: 'Leo', pada: ['Leo', 'Virgo', 'Libra', 'Scorpio'] },
  { slug: 'uttara-phalguni', degreeRange: '26°40\' Leo – 10°00\' Virgo', rashi: 'Leo/Virgo', pada: ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
  { slug: 'hasta', degreeRange: '10°00\' – 23°20\' Virgo', rashi: 'Virgo', pada: ['Aries', 'Taurus', 'Gemini', 'Cancer'] },
  { slug: 'chitra', degreeRange: '23°20\' Virgo – 6°40\' Libra', rashi: 'Virgo/Libra', pada: ['Leo', 'Virgo', 'Libra', 'Scorpio'] },
  { slug: 'swati', degreeRange: '6°40\' – 20°00\' Libra', rashi: 'Libra', pada: ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
  { slug: 'vishakha', degreeRange: '20°00\' Libra – 3°20\' Scorpio', rashi: 'Libra/Scorpio', pada: ['Aries', 'Taurus', 'Gemini', 'Cancer'] },
  { slug: 'anuradha', degreeRange: '3°20\' – 16°40\' Scorpio', rashi: 'Scorpio', pada: ['Leo', 'Virgo', 'Libra', 'Scorpio'] },
  { slug: 'jyeshtha', degreeRange: '16°40\' – 30°00\' Scorpio', rashi: 'Scorpio', pada: ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
  { slug: 'mula', degreeRange: '0°00\' – 13°20\' Sagittarius', rashi: 'Sagittarius', pada: ['Aries', 'Taurus', 'Gemini', 'Cancer'] },
  { slug: 'purva-ashadha', degreeRange: '13°20\' – 26°40\' Sagittarius', rashi: 'Sagittarius', pada: ['Leo', 'Virgo', 'Libra', 'Scorpio'] },
  { slug: 'uttara-ashadha', degreeRange: '26°40\' Sagittarius – 10°00\' Capricorn', rashi: 'Sagittarius/Capricorn', pada: ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
  { slug: 'shravana', degreeRange: '10°00\' – 23°20\' Capricorn', rashi: 'Capricorn', pada: ['Aries', 'Taurus', 'Gemini', 'Cancer'] },
  { slug: 'dhanishta', degreeRange: '23°20\' Capricorn – 6°40\' Aquarius', rashi: 'Capricorn/Aquarius', pada: ['Leo', 'Virgo', 'Libra', 'Scorpio'] },
  { slug: 'shatabhisha', degreeRange: '6°40\' – 20°00\' Aquarius', rashi: 'Aquarius', pada: ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
  { slug: 'purva-bhadrapada', degreeRange: '20°00\' Aquarius – 3°20\' Pisces', rashi: 'Aquarius/Pisces', pada: ['Aries', 'Taurus', 'Gemini', 'Cancer'] },
  { slug: 'uttara-bhadrapada', degreeRange: '3°20\' – 16°40\' Pisces', rashi: 'Pisces', pada: ['Leo', 'Virgo', 'Libra', 'Scorpio'] },
  { slug: 'revati', degreeRange: '16°40\' – 30°00\' Pisces', rashi: 'Pisces', pada: ['Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] },
];

export const ALL_NAKSHATRA_SLUGS = NAKSHATRA_META.map(m => m.slug);

export function getNakshatraArticle(slug: string): NakshatraArticle | null {
  const idx = NAKSHATRA_META.findIndex(m => m.slug === slug);
  if (idx === -1) return null;
  const meta = NAKSHATRA_META[idx];
  const profile = NAKSHATRA_PROFILES[idx];
  if (!profile) return null;

  return {
    index: idx,
    slug: meta.slug,
    profile,
    title: `${profile.name} Nakshatra — Personality, Compatibility & Career`,
    description: `Complete guide to ${profile.name} Nakshatra (${meta.degreeRange}): personality traits, deity ${profile.deity}, strengths, challenges, career paths, and compatibility in Vedic astrology.`,
    keywords: [
      `${profile.name.toLowerCase()} nakshatra`,
      `${profile.name.toLowerCase()} nakshatra characteristics`,
      `${profile.name.toLowerCase()} nakshatra personality`,
      `${profile.name.toLowerCase()} nakshatra compatibility`,
      `${profile.name.toLowerCase()} nakshatra career`,
    ],
    degreeRange: meta.degreeRange,
    rashi: meta.rashi,
    pada: meta.pada,
  };
}
