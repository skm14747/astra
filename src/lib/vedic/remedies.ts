import type { Planet, KundliChart, RemedyRecommendation, GrahaPlanet } from './types';
import { PLANET_EXALTATION, PLANET_DEBILITATION } from './constants';
import { calculateAshtakavarga, getWeakHouses } from './ashtakavarga';
import { isCombust } from './core';

const PLANET_GEMSTONES: Record<string, { stone: string; finger: string; metal: string; day: string }> = {
  Sun: { stone: 'Ruby', finger: 'Ring finger', metal: 'Gold', day: 'Sunday' },
  Moon: { stone: 'Pearl', finger: 'Little finger', metal: 'Silver', day: 'Monday' },
  Mars: { stone: 'Red Coral', finger: 'Ring finger', metal: 'Gold/Copper', day: 'Tuesday' },
  Mercury: { stone: 'Emerald', finger: 'Little finger', metal: 'Gold', day: 'Wednesday' },
  Jupiter: { stone: 'Yellow Sapphire', finger: 'Index finger', metal: 'Gold', day: 'Thursday' },
  Venus: { stone: 'Diamond', finger: 'Middle finger', metal: 'Platinum/Silver', day: 'Friday' },
  Saturn: { stone: 'Blue Sapphire', finger: 'Middle finger', metal: 'Iron/Silver', day: 'Saturday' },
  Rahu: { stone: 'Hessonite (Gomed)', finger: 'Middle finger', metal: 'Silver', day: 'Saturday' },
  Ketu: { stone: 'Cat\'s Eye (Lehsunia)', finger: 'Little finger', metal: 'Silver', day: 'Tuesday' },
};

const PLANET_MANTRAS: Record<string, string> = {
  Sun: 'Om Suryaya Namah (108x on Sundays)',
  Moon: 'Om Chandraya Namah (108x on Mondays)',
  Mars: 'Om Mangalaya Namah (108x on Tuesdays)',
  Mercury: 'Om Budhaya Namah (108x on Wednesdays)',
  Jupiter: 'Om Gurave Namah (108x on Thursdays)',
  Venus: 'Om Shukraya Namah (108x on Fridays)',
  Saturn: 'Om Shanaishcharaya Namah (108x on Saturdays)',
  Rahu: 'Om Rahave Namah (108x on Saturdays)',
  Ketu: 'Om Ketave Namah (108x on Tuesdays)',
};

export function generateRemedies(chart: KundliChart): RemedyRecommendation[] {
  const remedies: RemedyRecommendation[] = [];
  const sunLon = chart.planets.Sun.siderealLongitude;

  const { sav } = calculateAshtakavarga(chart);
  const weakHouses = getWeakHouses(sav);

  for (const planet of ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'] as Planet[]) {
    const pos = chart.planets[planet];
    const isDebilitated = PLANET_DEBILITATION[planet] === pos.rashi;
    const planetCombust = isCombust(planet, pos.siderealLongitude, sunLon, pos.isRetrograde);

    if (isDebilitated || planetCombust) {
      const gem = PLANET_GEMSTONES[planet];
      if (gem) {
        remedies.push({
          type: 'gemstone',
          planet,
          recommendation: `Wear ${gem.stone}`,
          details: `${gem.stone} on ${gem.finger} in ${gem.metal}, start on ${gem.day}`,
          priority: isDebilitated ? 'high' : 'medium',
        });
      }

      const mantra = PLANET_MANTRAS[planet];
      if (mantra) {
        remedies.push({
          type: 'mantra',
          planet,
          recommendation: `Chant ${planet} mantra`,
          details: mantra,
          priority: 'medium',
        });
      }
    }
  }

  if (chart.planets.Moon && isCombust('Moon', chart.planets.Moon.siderealLongitude, sunLon, false)) {
    remedies.push({
      type: 'lifestyle',
      planet: 'Moon',
      recommendation: 'Daily meditation and regular sleep',
      details: 'Combust Moon: practice calm routines, avoid overwork, meditate daily',
      priority: 'high',
    });
  }

  for (const houseNum of weakHouses) {
    const house = chart.houses.find(h => h.house === houseNum);
    if (!house) continue;
    const lord = house.lord as Planet;
    const mantra = PLANET_MANTRAS[lord];
    if (mantra) {
      remedies.push({
        type: 'mantra',
        planet: lord,
        recommendation: `Strengthen house ${houseNum} (${lord})`,
        details: `House ${houseNum} is weak (SAV < 27). ${mantra}`,
        priority: 'low',
      });
    }
  }

  remedies.push({
    type: 'mantra',
    planet: 'Sun',
    recommendation: 'Gayatri Mantra',
    details: 'Chant Gayatri Mantra 24/108 times at sunrise — universal remedy',
    priority: 'medium',
  });

  return remedies;
}

// --- Phase 7: Expanded Remedies ---

const RUDRAKSHA: Record<string, { mukhi: number; description: string }> = {
  Sun: { mukhi: 1, description: '1 Mukhi Rudraksha — Supreme consciousness, self-realization' },
  Moon: { mukhi: 2, description: '2 Mukhi Rudraksha — Emotional balance, relationships' },
  Mars: { mukhi: 3, description: '3 Mukhi Rudraksha — Self-confidence, courage, digestion' },
  Mercury: { mukhi: 4, description: '4 Mukhi Rudraksha — Knowledge, speech, creativity' },
  Jupiter: { mukhi: 5, description: '5 Mukhi Rudraksha — Health, peace, spiritual growth' },
  Venus: { mukhi: 6, description: '6 Mukhi Rudraksha — Willpower, focus, grounding' },
  Saturn: { mukhi: 7, description: '7 Mukhi Rudraksha — Luck, wealth, Saturn pacification' },
  Rahu: { mukhi: 8, description: '8 Mukhi Rudraksha — Obstacle removal, Rahu pacification' },
  Ketu: { mukhi: 9, description: '9 Mukhi Rudraksha — Energy, Ketu pacification, Durga blessings' },
};

const CHARITY: Record<string, string> = {
  Sun: 'Donate wheat, jaggery, gold, or red items on Sundays',
  Moon: 'Donate rice, silver, white cloth, or milk on Mondays',
  Mars: 'Donate red lentils, copper, or red cloth on Tuesdays',
  Mercury: 'Donate green moong, emerald items, or green cloth on Wednesdays',
  Jupiter: 'Donate turmeric, yellow cloth, gold, or bananas on Thursdays',
  Venus: 'Donate white items, perfume, silk, or sugar on Fridays',
  Saturn: 'Donate black sesame, iron, mustard oil, or blankets on Saturdays',
  Rahu: 'Donate coconut, blue cloth, or blankets on Saturdays',
  Ketu: 'Donate dog food, blankets, or sesame on Tuesdays',
};

const FASTING: Record<string, string> = {
  Sun: 'Fast on Sundays — eat one meal before sunset',
  Moon: 'Fast on Mondays — Shiva worship',
  Mars: 'Fast on Tuesdays — Hanuman worship',
  Mercury: 'Fast on Wednesdays — Vishnu worship',
  Jupiter: 'Fast on Thursdays — Brihaspati worship',
  Venus: 'Fast on Fridays — Lakshmi worship',
  Saturn: 'Fast on Saturdays — Shani worship with mustard oil lamp',
};

const STOTRA: Record<string, string> = {
  Sun: 'Aditya Hridaya Stotram — powerful Sun remedy',
  Moon: 'Shiv Mahimna Stotram — Moon strengthening',
  Mars: 'Hanuman Chalisa — Mars pacification',
  Mercury: 'Vishnu Sahasranama — Mercury remedy',
  Jupiter: 'Guru Stotram — Jupiter strengthening',
  Venus: 'Shri Suktam — Venus remedy',
  Saturn: 'Shani Stotram — Saturn pacification',
};

const BEEJ_MANTRAS: Record<string, string> = {
  Sun: 'Om Hraam Hreem Hraum Sah Suryaya Namah',
  Moon: 'Om Shraam Shreem Shraum Sah Chandraya Namah',
  Mars: 'Om Kraam Kreem Kraum Sah Bhaumaya Namah',
  Mercury: 'Om Braam Breem Braum Sah Budhaya Namah',
  Jupiter: 'Om Graam Greem Graum Sah Gurave Namah',
  Venus: 'Om Draam Dreem Draum Sah Shukraya Namah',
  Saturn: 'Om Praam Preem Praum Sah Shanaischaraya Namah',
  Rahu: 'Om Bhraam Bhreem Bhraum Sah Rahave Namah',
  Ketu: 'Om Sraam Sreem Sraum Sah Ketave Namah',
};

export function getRudraksha(planet: string): { mukhi: number; description: string } | null {
  return RUDRAKSHA[planet] ?? null;
}

export function getCharity(planet: string): string {
  return CHARITY[planet] ?? 'General charitable activities';
}

export function getFasting(planet: string): string {
  return FASTING[planet] ?? 'Observe periodic fasting';
}

export function getStotra(planet: string): string {
  return STOTRA[planet] ?? 'Navagraha Stotram — universal planetary hymn';
}

export function getBeejMantra(planet: string): string {
  return BEEJ_MANTRAS[planet] ?? '';
}

export function generateExpandedRemedies(chart: KundliChart): RemedyRecommendation[] {
  const base = generateRemedies(chart);

  // Add Rudraksha for debilitated/combust planets
  const sunLon = chart.planets.Sun.siderealLongitude;
  for (const planet of ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'] as Planet[]) {
    const pos = chart.planets[planet];
    const isDebilitated = PLANET_DEBILITATION[planet] === pos.rashi;
    const planetCombust = isCombust(planet, pos.siderealLongitude, sunLon, pos.isRetrograde);

    if (isDebilitated || planetCombust) {
      const rudraksha = getRudraksha(planet);
      if (rudraksha) {
        base.push({
          type: 'ritual', planet,
          recommendation: `Wear ${rudraksha.mukhi} Mukhi Rudraksha`,
          details: rudraksha.description,
          priority: 'medium',
        });
      }

      base.push({
        type: 'lifestyle', planet,
        recommendation: `Charity for ${planet}`,
        details: getCharity(planet),
        priority: 'low',
      });

      base.push({
        type: 'lifestyle', planet,
        recommendation: `Fasting for ${planet}`,
        details: getFasting(planet),
        priority: 'low',
      });

      base.push({
        type: 'ritual', planet,
        recommendation: `Recite ${planet} Stotra`,
        details: getStotra(planet),
        priority: 'medium',
      });
    }
  }

  return base;
}
