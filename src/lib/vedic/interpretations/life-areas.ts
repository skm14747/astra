/**
 * Life-area interpretation generators.
 * Takes chart data and produces structured prose for career, marriage,
 * wealth, health, education, children, foreign travel, and spirituality.
 * Sources: BPHS, Phaladeepika, Uttara Kalamrita.
 */
import type { Planet, KundliChart, Dignity, RashiIndex } from '../types';
import { RASHI_NAMES, RASHI_LORDS } from '../constants';

// ── Helpers ──

function planetsInHouse(chart: KundliChart, house: number): Planet[] {
  return chart.houses[house - 1]?.planets ?? [];
}

function houseLord(chart: KundliChart, house: number): string {
  return chart.houses[house - 1]?.lord ?? '';
}

function planetHouse(chart: KundliChart, planet: Planet): number {
  return chart.planets[planet]?.house ?? 0;
}

function planetSign(chart: KundliChart, planet: Planet): string {
  return chart.planets[planet]?.rashiName ?? '';
}

// ── Career ──

export interface CareerReading {
  summary: string;
  tenthHouseAnalysis: string;
  suitableFields: string[];
  timingHint: string;
  jobVsBusiness: string;
  foreignWork: string;
}

const SIGN_CAREER_FIELDS: Record<string, string[]> = {
  Aries: ['military', 'police', 'surgery', 'sports', 'engineering', 'entrepreneurship'],
  Taurus: ['finance', 'banking', 'agriculture', 'food industry', 'luxury goods', 'real estate'],
  Gemini: ['media', 'journalism', 'writing', 'IT', 'teaching', 'advertising'],
  Cancer: ['nursing', 'hospitality', 'real estate', 'food', 'caregiving', 'public service'],
  Leo: ['government', 'politics', 'entertainment', 'leadership', 'management', 'performing arts'],
  Virgo: ['accounting', 'healthcare', 'editing', 'research', 'auditing', 'quality control'],
  Libra: ['law', 'diplomacy', 'fashion', 'interior design', 'counseling', 'partnership business'],
  Scorpio: ['research', 'investigation', 'insurance', 'occult', 'psychology', 'mining'],
  Sagittarius: ['teaching', 'law', 'publishing', 'travel industry', 'religion', 'philosophy'],
  Capricorn: ['government', 'administration', 'construction', 'mining', 'agriculture', 'management'],
  Aquarius: ['technology', 'social work', 'science', 'aviation', 'networking', 'humanitarian work'],
  Pisces: ['healthcare', 'spiritual work', 'film', 'music', 'charity', 'foreign service'],
};

const PLANET_CAREER: Record<string, string[]> = {
  Sun: ['government', 'politics', 'administration', 'medicine', 'authority positions'],
  Moon: ['nursing', 'hospitality', 'food', 'travel', 'public relations', 'water-related'],
  Mars: ['military', 'engineering', 'surgery', 'police', 'sports', 'real estate', 'fire services'],
  Mercury: ['IT', 'writing', 'accounting', 'teaching', 'media', 'trade', 'astrology'],
  Jupiter: ['education', 'law', 'banking', 'priesthood', 'advisory', 'publishing'],
  Venus: ['fashion', 'film', 'music', 'luxury', 'hospitality', 'beauty', 'art', 'design'],
  Saturn: ['construction', 'mining', 'oil', 'agriculture', 'labor', 'government service'],
  Rahu: ['technology', 'foreign trade', 'aviation', 'media', 'pharmaceuticals', 'unconventional fields'],
  Ketu: ['spiritual work', 'alternative healing', 'programming', 'research', 'languages'],
};

export function generateCareerReading(chart: KundliChart): CareerReading {
  const tenth = chart.houses[9];
  const tenthLordPlanet = tenth.lord;
  const tenthLordHouse = planetHouse(chart, tenthLordPlanet as Planet);
  const tenthSign = tenth.rashiName;
  const planetsIn10 = planetsInHouse(chart, 10);

  const fields = new Set<string>();
  (SIGN_CAREER_FIELDS[tenthSign] ?? []).forEach(f => fields.add(f));
  planetsIn10.forEach(p => (PLANET_CAREER[p] ?? []).forEach(f => fields.add(f)));
  (PLANET_CAREER[tenthLordPlanet] ?? []).forEach(f => fields.add(f));

  const tenthHouseAnalysis = `Your 10th house of career falls in ${tenthSign}, ruled by ${tenthLordPlanet}. ${
    tenthLordPlanet
  } is placed in your ${tenthLordHouse}${getOrdinal(tenthLordHouse)} house${
    planetsIn10.length > 0
      ? `. The planets ${planetsIn10.join(', ')} occupy your 10th house, directly influencing your professional life`
      : '. No planets directly occupy the 10th house, so the lord\'s placement becomes the primary career indicator'
  }.`;

  const rahu12 = planetHouse(chart, 'Rahu') === 12 || planetHouse(chart, 'Rahu') === 9;
  const ketu12 = planetHouse(chart, 'Ketu') === 12 || planetHouse(chart, 'Ketu') === 9;
  const foreignWork = (rahu12 || ketu12)
    ? 'There are indications of foreign work or travel in your career. Rahu/Ketu involvement with the 9th or 12th house suggests international opportunities.'
    : 'Career is primarily indicated in your homeland, though transits may open temporary foreign windows.';

  const saturn10 = planetsIn10.includes('Saturn');
  const sun10 = planetsIn10.includes('Sun');
  const jobVsBusiness = saturn10
    ? 'Saturn in the 10th house strongly favors structured employment — government service, large organizations, or disciplined corporate environments.'
    : sun10
    ? 'Sun in the 10th house favors independent authority — leadership roles, self-employment, or government positions where you direct others.'
    : planetsIn10.includes('Mercury')
    ? 'Mercury in the 10th favors business, trade, and communication-based professions. Multiple ventures or advisory roles suit you.'
    : 'Your chart supports both employment and business, depending on the Dasha period and transit support.';

  return {
    summary: `Your career is shaped by ${tenthSign} energy, guided by ${tenthLordPlanet}. The fields most aligned with your chart include ${[...fields].slice(0, 6).join(', ')}.`,
    tenthHouseAnalysis,
    suitableFields: [...fields].slice(0, 8),
    timingHint: `Career peaks are most likely during the Mahadasha or Antardasha of ${tenthLordPlanet}, or when Jupiter transits your 10th house.`,
    jobVsBusiness,
    foreignWork,
  };
}

// ── Marriage ──

export interface MarriageReading {
  summary: string;
  spouseNature: string;
  marriageTiming: string;
  challenges: string;
  strengths: string;
}

export function generateMarriageReading(chart: KundliChart): MarriageReading {
  const seventh = chart.houses[6];
  const seventhLord = seventh.lord;
  const seventhSign = seventh.rashiName;
  const seventhLordHouse = planetHouse(chart, seventhLord as Planet);
  const planetsIn7 = planetsInHouse(chart, 7);
  const venusSign = planetSign(chart, 'Venus');
  const venusHouse = planetHouse(chart, 'Venus');

  const spouseNature = `Your 7th house in ${seventhSign} suggests a spouse who is ${getSignTraits(seventhSign)}. ` +
    `Venus in ${venusSign} (house ${venusHouse}) adds ${getVenusLoveStyle(venusSign)} to your love nature.` +
    (planetsIn7.length > 0 ? ` ${planetsIn7.join(' and ')} in the 7th house ${planetsIn7.length > 1 ? 'bring' : 'brings'} additional complexity to partnership dynamics.` : '');

  const hasJupiterAspect7 = planetHouse(chart, 'Jupiter') === 7 || [1, 5, 9].some(offset => {
    const jh = planetHouse(chart, 'Jupiter');
    return (jh + offset - 1) % 12 + 1 === 7;
  });

  return {
    summary: `Marriage is primarily indicated through your ${seventhSign} 7th house, ruled by ${seventhLord} placed in the ${seventhLordHouse}${getOrdinal(seventhLordHouse)} house.`,
    spouseNature,
    marriageTiming: `Marriage timing is most favorable during the Dasha of ${seventhLord} or Venus, and when Jupiter transits over your 7th house or its lord.`,
    challenges: planetsIn7.includes('Saturn') ? 'Saturn in the 7th may delay marriage or bring a mature, responsible partner. Patience in relationships is your lesson.' :
      planetsIn7.includes('Rahu') ? 'Rahu in the 7th may bring an unconventional spouse — possibly from a different background, culture, or nationality.' :
      planetsIn7.includes('Mars') ? 'Mars in the 7th (Manglik consideration) brings passion but also potential conflicts. A partner with matching Mars energy creates balance.' :
      'Standard partnership indications — specific challenges depend on the ongoing Dasha and transit periods.',
    strengths: hasJupiterAspect7 ? 'Jupiter\'s benefic influence on the 7th house is a strong positive — it protects marriage, brings a wise partner, and supports lasting partnership.' :
      'Your partnership potential improves when benefic planets transit the 7th house and during Jupiter\'s favorable periods.',
  };
}

// ── Wealth ──

export interface WealthReading {
  summary: string;
  wealthSources: string;
  wealthTiming: string;
  propertyIndication: string;
}

export function generateWealthReading(chart: KundliChart): WealthReading {
  const secondLord = houseLord(chart, 2);
  const eleventhLord = houseLord(chart, 11);
  const secondLordHouse = planetHouse(chart, secondLord as Planet);
  const eleventhLordHouse = planetHouse(chart, eleventhLord as Planet);
  const planetsIn2 = planetsInHouse(chart, 2);
  const planetsIn11 = planetsInHouse(chart, 11);

  const fourthLord = houseLord(chart, 4);
  const marsHouse = planetHouse(chart, 'Mars');

  return {
    summary: `Your wealth is shaped by ${secondLord} (2nd lord in house ${secondLordHouse}) for savings and ${eleventhLord} (11th lord in house ${eleventhLordHouse}) for income. ${
      planetsIn2.length > 0 ? `${planetsIn2.join(', ')} in the 2nd house directly influence your wealth accumulation.` : ''
    }`,
    wealthSources: `Primary income channels align with the nature of ${eleventhLord} (${(PLANET_CAREER[eleventhLord] ?? ['general profession']).slice(0, 3).join(', ')}). ${
      planetsIn11.length > 0 ? `${planetsIn11.join(', ')} in the 11th amplify gains through ${planetsIn11.map(p => (PLANET_CAREER[p] ?? ['various'])[0]).join(' and ')}.` : ''
    }`,
    wealthTiming: `Peak wealth periods occur during the Dasha of ${secondLord}, ${eleventhLord}, or Jupiter. Jupiter\'s transit over the 2nd or 11th house also triggers financial growth.`,
    propertyIndication: `Property is indicated through your 4th lord ${fourthLord}. Mars in house ${marsHouse} ${marsHouse === 4 ? 'directly blesses property matters' : 'influences property through its ' + marsHouse + getOrdinal(marsHouse) + ' house placement'}.`,
  };
}

// ── Health ──

export interface HealthReading {
  summary: string;
  vulnerableAreas: string;
  healthPeriods: string;
  preventiveMeasures: string;
}

const HOUSE_BODY: Record<number, string> = {
  1: 'head, brain, overall constitution',
  2: 'face, teeth, right eye, throat',
  3: 'arms, shoulders, right ear, upper chest',
  4: 'chest, heart, lungs, breast area',
  5: 'stomach, upper abdomen, liver, mind',
  6: 'intestines, kidneys, lower abdomen',
  7: 'lower back, kidneys, reproductive organs',
  8: 'genitals, chronic conditions, anus',
  9: 'hips, thighs, arteries',
  10: 'knees, joints, bones, skin',
  11: 'calves, ankles, left ear',
  12: 'feet, left eye, sleep, hospitalization',
};

export function generateHealthReading(chart: KundliChart): HealthReading {
  const sixthLord = houseLord(chart, 6);
  const sixthLordHouse = planetHouse(chart, sixthLord as Planet);
  const planetsIn6 = planetsInHouse(chart, 6);
  const planetsIn8 = planetsInHouse(chart, 8);

  const vulnerable: string[] = [];
  if (planetsIn6.length > 0) {
    planetsIn6.forEach(p => { vulnerable.push(`${p} in 6th house affects ${HOUSE_BODY[6]}`); });
  }
  if (planetsIn8.length > 0) {
    planetsIn8.forEach(p => { vulnerable.push(`${p} in 8th house affects ${HOUSE_BODY[8]}`); });
  }
  const ascLord = chart.houses[0].lord;
  const ascLordHouse = planetHouse(chart, ascLord as Planet);
  if (ascLordHouse === 6 || ascLordHouse === 8 || ascLordHouse === 12) {
    vulnerable.push(`Ascendant lord ${ascLord} in the ${ascLordHouse}${getOrdinal(ascLordHouse)} house needs health attention`);
  }

  return {
    summary: `Your 6th lord ${sixthLord} placed in house ${sixthLordHouse} shapes your health patterns. ${
      planetsIn6.length > 0 ? `${planetsIn6.join(', ')} in the 6th house indicate active health themes.` : 'No planets in the 6th suggest fewer direct health challenges.'
    }`,
    vulnerableAreas: vulnerable.length > 0 ? vulnerable.join('. ') + '.' : 'No major vulnerable areas indicated — maintain general health discipline.',
    healthPeriods: `Health needs extra attention during the Dasha of ${sixthLord} and planets placed in the 6th or 8th house. Saturn and Rahu transits over the Ascendant or 6th house also require vigilance.`,
    preventiveMeasures: 'Regular health checkups aligned with your vulnerable areas, exercise routine matching your Mars placement energy, and diet aligned with your Moon sign preferences are recommended.',
  };
}

// ── Spiritual Path ──

export interface SpiritualReading {
  summary: string;
  spiritualStrengths: string;
  meditationStyle: string;
  karmaTheme: string;
}

export function generateSpiritualReading(chart: KundliChart): SpiritualReading {
  const ninthLord = houseLord(chart, 9);
  const twelfthLord = houseLord(chart, 12);
  const jupiterHouse = planetHouse(chart, 'Jupiter');
  const ketuHouse = planetHouse(chart, 'Ketu');
  const planetsIn9 = planetsInHouse(chart, 9);
  const planetsIn12 = planetsInHouse(chart, 12);

  const mokshaTrikona = [4, 8, 12];
  const mokshaCount = mokshaTrikona.reduce((n, h) => n + planetsInHouse(chart, h).length, 0);

  return {
    summary: `Your spiritual path is guided by the 9th lord ${ninthLord} (dharma) and 12th lord ${twelfthLord} (liberation). Jupiter in house ${jupiterHouse} and Ketu in house ${ketuHouse} further shape your spiritual orientation.`,
    spiritualStrengths: `${
      planetsIn9.length > 0 ? `${planetsIn9.join(', ')} in the 9th house strengthen dharmic inclination. ` : ''
    }${
      planetsIn12.length > 0 ? `${planetsIn12.join(', ')} in the 12th house support meditation and liberation. ` : ''
    }${
      mokshaCount >= 3 ? 'Strong moksha triangle activation — multiple planets in the 4th, 8th, and 12th houses indicate deep spiritual potential.' :
      'Spiritual growth comes through conscious practice rather than innate inclination.'
    }`,
    meditationStyle: ketuHouse <= 6 ? 'Active, service-oriented spiritual practice suits you — karma yoga, mantra repetition during daily activities, and finding the sacred in the mundane.' :
      'Contemplative, inward-focused practice suits you — seated meditation, visualization, and surrender-based approaches like bhakti yoga.',
    karmaTheme: `Ketu in house ${ketuHouse} suggests past-life mastery of ${HOUSE_BODY[ketuHouse] ? 'matters related to ' + HOUSE_BODY[ketuHouse] : 'these house themes'}. Your soul seeks to complete unfinished business here while developing Rahu\'s house ${planetHouse(chart, 'Rahu')} themes as new growth.`,
  };
}

// ── Utility ──

function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function getSignTraits(sign: string): string {
  const traits: Record<string, string> = {
    Aries: 'bold, energetic, and independent', Taurus: 'patient, beautiful, and comfort-loving',
    Gemini: 'witty, communicative, and intellectually curious', Cancer: 'caring, emotionally deep, and nurturing',
    Leo: 'confident, warm-hearted, and dignified', Virgo: 'analytical, health-conscious, and service-oriented',
    Libra: 'charming, fair-minded, and aesthetically refined', Scorpio: 'intense, mysterious, and deeply loyal',
    Sagittarius: 'adventurous, philosophical, and freedom-loving', Capricorn: 'disciplined, responsible, and ambitious',
    Aquarius: 'independent, innovative, and humanitarian', Pisces: 'compassionate, artistic, and spiritually inclined',
  };
  return traits[sign] || 'unique';
}

function getVenusLoveStyle(sign: string): string {
  const styles: Record<string, string> = {
    Aries: 'a passionate, direct, and spontaneous love style', Taurus: 'a sensual, loyal, and luxury-loving romantic nature',
    Gemini: 'a charming, witty, and communicative approach to love', Cancer: 'a nurturing, emotional, and home-centered love',
    Leo: 'a grand, generous, and dramatic romantic expression', Virgo: 'a devoted, service-oriented, and practical love nature',
    Libra: 'a harmonious, partnership-driven, and graceful romance', Scorpio: 'an intense, all-or-nothing, and deeply passionate love',
    Sagittarius: 'an adventurous, freedom-loving, and philosophical romance', Capricorn: 'a mature, committed, and enduring love style',
    Aquarius: 'an independent, friendship-first, and unconventional romance', Pisces: 'a deeply romantic, spiritual, and selflessly devoted love',
  };
  return styles[sign] || 'a distinctive approach to love';
}
