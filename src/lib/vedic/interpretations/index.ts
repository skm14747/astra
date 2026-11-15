import type { Planet, Dignity, Lang } from '../types';

// ── English sources ──
import { getPlanetInSignText as getPlanetInSignTextEn } from './planet-in-sign';
import { getPlanetInHouseText as getPlanetInHouseTextEn, HOUSE_AREAS } from './planet-in-house';
export { HOUSE_AREAS };
import { getNakshatraProfile as getNakshatraProfileEn, NAKSHATRA_PROFILES } from './nakshatra-text';
export { NAKSHATRA_PROFILES };
export type { NakshatraProfile } from './nakshatra-text';
import {
  getDignityText as getDignityTextEn, DIGNITY_TEXT,
  RETRO_TEXT, COMBUST_TEXT, ASPECT_RECEIVED,
  getConjunctionText as getConjunctionTextEn,
} from './dignity-text';
export { DIGNITY_TEXT };
import { getMahadashaNarrative as getMahadashaNarrativeEn, MAHADASHA_TEXTS } from './dasha-text';
export { MAHADASHA_TEXTS };
export type { MahadashaNarrative } from './dasha-text';
import { getLocalizedMahadashaNarrative } from './dasha-narratives';
import { getLocalizedNakshatraProfile } from './nakshatra-profiles';
import {
  generateCareerReading as generateCareerReadingEn,
  generateMarriageReading as generateMarriageReadingEn,
  generateWealthReading as generateWealthReadingEn,
  generateHealthReading as generateHealthReadingEn,
  generateSpiritualReading as generateSpiritualReadingEn,
} from './life-areas';
export type { CareerReading, MarriageReading, WealthReading, HealthReading, SpiritualReading } from './life-areas';

// ── Hindi sources ──
import {
  ALL_PLANETS_HI,
  DIGNITY_TEXT_HI, RETRO_TEXT_HI, COMBUST_TEXT_HI, ASPECT_RECEIVED_HI,
  getConjunctionTextHi, HOUSE_AREAS_HI, ordinalHi, houseAreaHi, planetNameHi,
} from './hi';
import {
  generateCareerReadingHi, generateMarriageReadingHi,
  generateWealthReadingHi, generateHealthReadingHi,
  generateSpiritualReadingHi,
} from './life-areas-hi';

// ── Nepali sources ──
import {
  ALL_PLANETS_NE,
  DIGNITY_TEXT_NE, RETRO_TEXT_NE, COMBUST_TEXT_NE, ASPECT_RECEIVED_NE,
  HOUSE_AREA_MAP_NE, ordinalNe, houseAreaNe, planetNameNe,
} from './ne';
import {
  generateCareerReadingNe, generateMarriageReadingNe,
  generateWealthReadingNe, generateHealthReadingNe,
  generateSpiritualReadingNe,
} from './life-areas-ne';

// ── Portuguese sources ──
import {
  ALL_PLANETS_PT,
  DIGNITY_TEXT_PT, RETRO_TEXT_PT, COMBUST_TEXT_PT, ASPECT_RECEIVED_PT,
  HOUSE_AREA_MAP_PT, ordinalPt, houseAreaPt, planetNamePt,
} from './pt';
import {
  generateCareerReadingPt, generateMarriageReadingPt,
  generateWealthReadingPt, generateHealthReadingPt,
  generateSpiritualReadingPt,
} from './life-areas-pt';

// ── Spanish sources ──
import {
  ALL_PLANETS_ES,
  DIGNITY_TEXT_ES, RETRO_TEXT_ES, COMBUST_TEXT_ES, ASPECT_RECEIVED_ES,
  HOUSE_AREA_MAP_ES, ordinalEs, houseAreaEs, planetNameEs,
} from './es';
import {
  generateCareerReadingEs, generateMarriageReadingEs,
  generateWealthReadingEs, generateHealthReadingEs,
  generateSpiritualReadingEs,
} from './life-areas-es';

// ── French sources ──
import {
  DIGNITY_TEXT_FR, RETRO_TEXT_FR, COMBUST_TEXT_FR, ASPECT_RECEIVED_FR,
  HOUSE_AREA_MAP_FR, ordinalFr, houseAreaFr, planetNameFr,
} from './fr';

// ── Japanese sources ──
import {
  DIGNITY_TEXT_JA, RETRO_TEXT_JA, COMBUST_TEXT_JA, ASPECT_RECEIVED_JA,
  HOUSE_AREA_MAP_JA, ordinalJa, houseAreaJa, planetNameJa,
} from './ja';

// ── Korean sources ──
import {
  DIGNITY_TEXT_KO, RETRO_TEXT_KO, COMBUST_TEXT_KO, ASPECT_RECEIVED_KO,
  HOUSE_AREA_MAP_KO, ordinalKo, houseAreaKo, planetNameKo,
} from './ko';

// ══════════════════════════════════════════════════
// Language-aware API
// ══════════════════════════════════════════════════

export function getPlanetInSignText(planet: Planet, sign: string, lang: Lang = 'en') {
  const lookup = (tables: Record<string, Record<string, [string, string, string]>>) => {
    const table = tables[planet];
    if (table) {
      const entry = table[sign];
      if (entry) return { positive: entry[0], challenges: entry[1], nature: entry[2] };
    }
    return null;
  };
  if (lang === 'hi') return lookup(ALL_PLANETS_HI) ?? getPlanetInSignTextEn(planet, sign);
  if (lang === 'ne') return lookup(ALL_PLANETS_NE) ?? lookup(ALL_PLANETS_HI) ?? getPlanetInSignTextEn(planet, sign);
  if (lang === 'pt') return lookup(ALL_PLANETS_PT) ?? getPlanetInSignTextEn(planet, sign);
  if (lang === 'es') return lookup(ALL_PLANETS_ES) ?? getPlanetInSignTextEn(planet, sign);
  return getPlanetInSignTextEn(planet, sign);
}

export function getPlanetInHouseText(planet: Planet, house: number, lang: Lang = 'en') {
  const en = getPlanetInHouseTextEn(planet, house);
  if (lang === 'hi') {
    const pName = planetNameHi(planet);
    const area = (HOUSE_AREAS_HI[house - 1] || en.area) as string;
    const ord = ordinalHi(house);
    return {
      keywords: `${pName} ${ord} भाव में`,
      area,
      whenStrong: `${ord} भाव में ${pName} की बली स्थिति जातक के ${area} को विशेष सामर्थ्य, अनुकूलता और सकारात्मक दिशा प्रदान करती है। यह स्थिति जीवन में इस क्षेत्र से संबंधित कार्यों में सफलता और आत्मविश्वास सुनिश्चित करती है।`,
      whenWeak: `${ord} भाव में ${pName} के निर्बल अथवा पीड़ित होने पर ${area} के प्रसंग में अतिरिक्त सावधानी, धैर्य और शांति उपाय अपनाने की आवश्यकता होती है।`,
    };
  }
  if (lang === 'ne') {
    const pName = planetNameNe(planet);
    const area = HOUSE_AREA_MAP_NE[house - 1] || en.area;
    const ord = ordinalNe(house);
    return {
      keywords: `${pName} ${ord} भावमा`,
      area,
      whenStrong: `${ord} भावमा ${pName}को बली स्थितिले जातकको ${area}लाई विशेष सामर्थ्य, अनुकूलता र सकारात्मक दिशा प्रदान गर्दछ। यस स्थितिले जीवनमा यस क्षेत्रसँग सम्बन्धित कार्यहरूमा सफलता दिलाउँछ।`,
      whenWeak: `${ord} भावमा ${pName} कमजोर वा पीडित हुँदा ${area}का विषयहरूमा अतिरिक्त सावधानी र धैर्य अपनाउनुपर्ने हुन्छ।`,
    };
  }
  if (lang === 'pt') {
    const pName = planetNamePt(planet);
    const area = HOUSE_AREA_MAP_PT[house - 1] || en.area;
    const ord = ordinalPt(house);
    return {
      keywords: `${pName} na ${ord} casa`,
      area,
      whenStrong: `A presença harmoniosa de ${pName} na ${ord} casa infunde vitalidade, clareza e autoridade natural aos assuntos de ${area}, permitindo colher frutos sólidos e inspiradores neste setor da existência.`,
      whenWeak: `Caso ${pName} encontre-se sob aflição na ${ord} casa, os temas de ${area} demandam paciência, disciplina e atenção consciente para transcender atritos transitórios.`,
    };
  }
  if (lang === 'es') {
    const pName = planetNameEs(planet);
    const area = HOUSE_AREA_MAP_ES[house - 1] || en.area;
    const ord = ordinalEs(house);
    return {
      keywords: `${pName} en la ${ord} casa`,
      area,
      whenStrong: `La posición favorable de ${pName} en la ${ord} casa infunde vitalidad, lucidez y firmeza a las vivencias de ${area}, propiciando logros duraderos y madurez en este ámbito de la vida.`,
      whenWeak: `Si ${pName} sufre aflicciones en la ${ord} casa, los asuntos de ${area} reclaman templanza, prudencia y un cuidado preventivo para superar obstáculos cármicos.`,
    };
  }
  if (lang === 'fr') {
    const pName = planetNameFr(planet);
    const area = HOUSE_AREA_MAP_FR[house - 1] || en.area;
    const ord = ordinalFr(house);
    return {
      keywords: `${pName} en ${ord} maison`,
      area,
      whenStrong: `La présence harmonieuse de ${pName} en ${ord} maison apporte clarté, autorité naturelle et épanouissement aux domaines de ${area}, favorisant des réalisations pérennes et bienfaisantes.`,
      whenWeak: `Si ${pName} est affligé en ${ord} maison, les affaires relatives à ${area} requièrent discernement, patience et vigilance pour surmonter les obstacles karmiques passagers.`,
    };
  }
  if (lang === 'ja') {
    const pName = planetNameJa(planet);
    const area = HOUSE_AREA_MAP_JA[house - 1] || en.area;
    const ord = ordinalJa(house);
    return {
      keywords: `${ord}ハウスの${pName}`,
      area,
      whenStrong: `${ord}ハウスにおける${pName}の力強い配置は、${area}に格別のバイタリティと調和をもたらし、揺るぎない自信と確実な成果を約束します。`,
      whenWeak: `${ord}ハウスの${pName}が弱化している場合、${area}に関する事柄において焦りを戒め、丁寧な内省と誠実な努力を重ねることが開運の鍵となります。`,
    };
  }
  if (lang === 'ko') {
    const pName = planetNameKo(planet);
    const area = HOUSE_AREA_MAP_KO[house - 1] || en.area;
    const ord = ordinalKo(house);
    return {
      keywords: `${ord}하우스의 ${pName}`,
      area,
      whenStrong: `${ord}하우스에 자리한 ${pName}의 상서로운 배치는 ${area}에 특별한 활력과 조화를 더해주며, 확고한 성취와 내적 자신감을 안겨줍니다.`,
      whenWeak: `${ord}하우스의 ${pName}이 쇠약할 경우, ${area}와 관련된 사안에서 조급함을 내려놓고 겸손한 인내와 신중한 처신으로 카르마의 시련을 지혜롭게 넘어서야 합니다.`,
    };
  }
  return en;
}

export function getDignityText(d: Dignity, lang: Lang = 'en') {
  if (lang === 'hi') return DIGNITY_TEXT_HI[d];
  if (lang === 'ne') return DIGNITY_TEXT_NE[d];
  if (lang === 'pt') return DIGNITY_TEXT_PT[d];
  if (lang === 'es') return DIGNITY_TEXT_ES[d];
  if (lang === 'fr') return DIGNITY_TEXT_FR[d];
  if (lang === 'ja') return DIGNITY_TEXT_JA[d];
  if (lang === 'ko') return DIGNITY_TEXT_KO[d];
  return getDignityTextEn(d);
}

export function getRetroText(lang: Lang = 'en') {
  if (lang === 'hi') return RETRO_TEXT_HI;
  if (lang === 'ne') return RETRO_TEXT_NE;
  if (lang === 'pt') return RETRO_TEXT_PT;
  if (lang === 'es') return RETRO_TEXT_ES;
  if (lang === 'fr') return RETRO_TEXT_FR;
  if (lang === 'ja') return RETRO_TEXT_JA;
  if (lang === 'ko') return RETRO_TEXT_KO;
  return RETRO_TEXT;
}

export function getCombustText(lang: Lang = 'en') {
  if (lang === 'hi') return COMBUST_TEXT_HI;
  if (lang === 'ne') return COMBUST_TEXT_NE;
  if (lang === 'pt') return COMBUST_TEXT_PT;
  if (lang === 'es') return COMBUST_TEXT_ES;
  if (lang === 'fr') return COMBUST_TEXT_FR;
  if (lang === 'ja') return COMBUST_TEXT_JA;
  if (lang === 'ko') return COMBUST_TEXT_KO;
  return COMBUST_TEXT;
}

export function getAspectReceived(planet: string, lang: Lang = 'en') {
  if (lang === 'hi') return ASPECT_RECEIVED_HI[planet] || '';
  if (lang === 'ne') return ASPECT_RECEIVED_NE[planet] || '';
  if (lang === 'pt') return ASPECT_RECEIVED_PT[planet] || '';
  if (lang === 'es') return ASPECT_RECEIVED_ES[planet] || '';
  if (lang === 'fr') return ASPECT_RECEIVED_FR[planet] || '';
  if (lang === 'ja') return ASPECT_RECEIVED_JA[planet] || '';
  if (lang === 'ko') return ASPECT_RECEIVED_KO[planet] || '';
  return ASPECT_RECEIVED[planet] || '';
}

export function getConjunctionText(p1: Planet, p2: Planet, lang: Lang = 'en') {
  if (lang === 'hi') return getConjunctionTextHi(p1, p2);
  if (lang === 'ne') {
    const p1Ne = planetNameNe(p1);
    const p2Ne = planetNameNe(p2);
    return `${p1Ne} र ${p2Ne} यस भावमा एकापसमा युति गर्दछन्, जसले दुवै ग्रहका कारकत्वलाई सम्मिश्रित गरी जीवनका यी क्षेत्रहरूमा संयुक्त प्रभाव पार्दछ।`;
  }
  if (lang === 'pt') {
    const p1Pt = planetNamePt(p1);
    const p2Pt = planetNamePt(p2);
    return `A conjunção cósmica entre ${p1Pt} e ${p2Pt} nesta casa une as energias de ambos os astros, gerando uma força combinada e singular para os assuntos deste setor.`;
  }
  if (lang === 'es') {
    const p1Es = planetNameEs(p1);
    const p2Es = planetNameEs(p2);
    return `La conjunción cósmica entre ${p1Es} y ${p2Es} en esta casa amalgama las naturalezas de ambos planetas, desplegando un influjo combinado y distintivo sobre estas vivencias.`;
  }
  if (lang === 'fr') {
    const p1Fr = planetNameFr(p1);
    const p2Fr = planetNameFr(p2);
    return `La conjonction céleste entre ${p1Fr} et ${p2Fr} dans cette maison unit leurs rayonnements respectifs, créant une dynamique conjointe singulière qui marque profondément ce domaine de vie.`;
  }
  if (lang === 'ja') {
    const p1Ja = planetNameJa(p1);
    const p2Ja = planetNameJa(p2);
    return `このハウスにおける${p1Ja}と${p2Ja}のコンジャンクション（合）は、両惑星の特質を融合させ、この人生の領域に特有の強力な複合的影響をもたらします。`;
  }
  if (lang === 'ko') {
    const p1Ko = planetNameKo(p1);
    const p2Ko = planetNameKo(p2);
    return `이 하우스에서 형성된 ${p1Ko}와 ${p2Ko}의 컨junction(합)은 두 행성의 고유한 기운을 하나로 융합하여, 이 삶의 영역에 각별하고 복합적인 영향력을 발휘합니다.`;
  }
  return getConjunctionTextEn(p1, p2);
}

export function getNakshatraProfile(index: number, lang: Lang = 'en') {
  return getLocalizedNakshatraProfile(index, lang) ?? getNakshatraProfileEn(index);
}

export function getMahadashaNarrative(planet: string, lang: Lang = 'en') {
  return getLocalizedMahadashaNarrative(planet, lang) ?? getMahadashaNarrativeEn(planet);
}

export function generateCareerReading(chart: Parameters<typeof generateCareerReadingEn>[0], lang: Lang = 'en') {
  if (lang === 'hi') return generateCareerReadingHi(chart);
  if (lang === 'ne') return generateCareerReadingNe(chart);
  if (lang === 'pt') return generateCareerReadingPt(chart);
  if (lang === 'es') return generateCareerReadingEs(chart);
  return generateCareerReadingEn(chart);
}

export function generateMarriageReading(chart: Parameters<typeof generateMarriageReadingEn>[0], lang: Lang = 'en') {
  if (lang === 'hi') return generateMarriageReadingHi(chart);
  if (lang === 'ne') return generateMarriageReadingNe(chart);
  if (lang === 'pt') return generateMarriageReadingPt(chart);
  if (lang === 'es') return generateMarriageReadingEs(chart);
  return generateMarriageReadingEn(chart);
}

export function generateWealthReading(chart: Parameters<typeof generateWealthReadingEn>[0], lang: Lang = 'en') {
  if (lang === 'hi') return generateWealthReadingHi(chart);
  if (lang === 'ne') return generateWealthReadingNe(chart);
  if (lang === 'pt') return generateWealthReadingPt(chart);
  if (lang === 'es') return generateWealthReadingEs(chart);
  return generateWealthReadingEn(chart);
}

export function generateHealthReading(chart: Parameters<typeof generateHealthReadingEn>[0], lang: Lang = 'en') {
  if (lang === 'hi') return generateHealthReadingHi(chart);
  if (lang === 'ne') return generateHealthReadingNe(chart);
  if (lang === 'pt') return generateHealthReadingPt(chart);
  if (lang === 'es') return generateHealthReadingEs(chart);
  return generateHealthReadingEn(chart);
}

export function generateSpiritualReading(chart: Parameters<typeof generateSpiritualReadingEn>[0], lang: Lang = 'en') {
  if (lang === 'hi') return generateSpiritualReadingHi(chart);
  if (lang === 'ne') return generateSpiritualReadingNe(chart);
  if (lang === 'pt') return generateSpiritualReadingPt(chart);
  if (lang === 'es') return generateSpiritualReadingEs(chart);
  return generateSpiritualReadingEn(chart);
}

// Re-export English constants for backward compatibility
export { RETRO_TEXT, COMBUST_TEXT, ASPECT_RECEIVED };

// Language helpers for report.ts
export { ordinalHi, houseAreaHi, planetNameHi, SIGN_NAME_HI, PLANET_NAME_HI } from './hi';
export { ordinalNe, houseAreaNe, planetNameNe, SIGN_NAME_NE, PLANET_NAME_NE } from './ne';
export { ordinalPt, houseAreaPt, planetNamePt, SIGN_NAME_PT, PLANET_NAME_PT } from './pt';
export { ordinalEs, houseAreaEs, planetNameEs, SIGN_NAME_ES, PLANET_NAME_ES } from './es';
