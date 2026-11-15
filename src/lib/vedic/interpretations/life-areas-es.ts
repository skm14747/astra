/**
 * Spanish life-area interpretation generators.
 */
import type { Planet, KundliChart } from '../types';
import type { CareerReading, MarriageReading, WealthReading, HealthReading, SpiritualReading } from './life-areas';
import { PLANET_NAME_ES, SIGN_NAME_ES, ordinalEs, houseAreaEs } from './es';

function planetsInHouse(chart: KundliChart, house: number): Planet[] { return chart.houses[house - 1]?.planets ?? []; }
function houseLord(chart: KundliChart, house: number): string { return chart.houses[house - 1]?.lord ?? ''; }
function planetHouse(chart: KundliChart, planet: Planet): number { return chart.planets[planet]?.house ?? 0; }
function planetSign(chart: KundliChart, planet: Planet): string { return chart.planets[planet]?.rashiName ?? ''; }
function p(name: string): string { return PLANET_NAME_ES[name] || name; }
function s(name: string): string { return SIGN_NAME_ES[name] || name; }

export function generateCareerReadingEs(chart: KundliChart): CareerReading {
  const tenth = chart.houses[9];
  const tenthLordPlanet = tenth.lord;
  const tenthLordHouse = planetHouse(chart, tenthLordPlanet as Planet);
  const tenthSign = tenth.rashiName;
  const planetsIn10 = planetsInHouse(chart, 10);

  const tenthHouseAnalysis = `Su 10ª casa (Karma Bhava) está en ${s(tenthSign)}, regida por ${p(tenthLordPlanet)}. ${p(tenthLordPlanet)} está posicionado en su ${ordinalEs(tenthLordHouse)} casa${
    planetsIn10.length > 0
      ? `. ${planetsIn10.map(pp => p(pp)).join(', ')} están en su 10ª casa, influenciando directamente su vida profesional`
      : '. Ningún planeta está directamente en la 10ª casa, por lo que la posición del regente es el indicador primario de carrera'
  }.`;

  return {
    summary: `Su carrera está moldeada por la energía de ${s(tenthSign)}, guiada por ${p(tenthLordPlanet)}.`,
    tenthHouseAnalysis,
    suitableFields: [],
    timingHint: `El pico en la carrera es más probable durante el Mahadasha o Antardasha de ${p(tenthLordPlanet)}, o cuando Júpiter transita sobre su 10ª casa.`,
    jobVsBusiness: 'Su carta apoya tanto empleo como negocio propio, dependiendo del período de Dasha y soporte de tránsito.',
    foreignWork: 'La carrera está indicada principalmente en el país de origen, aunque tránsitos pueden abrir oportunidades temporales en el extranjero.',
  };
}

export function generateMarriageReadingEs(chart: KundliChart): MarriageReading {
  const seventh = chart.houses[6];
  const seventhLord = seventh.lord;
  const seventhSign = seventh.rashiName;
  const seventhLordHouse = planetHouse(chart, seventhLord as Planet);

  return {
    summary: `El matrimonio está indicado por su 7ª casa en ${s(seventhSign)}, con el regente ${p(seventhLord)} en la ${ordinalEs(seventhLordHouse)} casa.`,
    spouseNature: `Su 7ª casa en ${s(seventhSign)} sugiere la naturaleza del cónyuge.`,
    marriageTiming: `El momento del matrimonio es más favorable durante el Dasha de ${p(seventhLord)} o Venus, y cuando Júpiter transita sobre su 7ª casa.`,
    challenges: 'Indicadores generales de asociación — desafíos específicos dependen de los períodos de Dasha y tránsito en curso.',
    strengths: 'La fuerza de la asociación aumenta cuando planetas benéficos transitan sobre la 7ª casa y durante períodos favorables de Júpiter.',
  };
}

export function generateWealthReadingEs(chart: KundliChart): WealthReading {
  const secondLord = houseLord(chart, 2);
  const eleventhLord = houseLord(chart, 11);
  const secondLordHouse = planetHouse(chart, secondLord as Planet);
  const eleventhLordHouse = planetHouse(chart, eleventhLord as Planet);

  return {
    summary: `Su riqueza está moldeada por ${p(secondLord)} (regente de la 2ª casa, en casa ${secondLordHouse}) para ahorro, y ${p(eleventhLord)} (regente de la 11ª casa, en casa ${eleventhLordHouse}) para ingreso.`,
    wealthSources: `Los canales primarios de ingreso están vinculados a la naturaleza de ${p(eleventhLord)}.`,
    wealthTiming: `El pico de riqueza ocurre durante Dashas de ${p(secondLord)}, ${p(eleventhLord)} o Júpiter.`,
    propertyIndication: `Propiedades inmobiliarias están indicadas por el regente de su 4ª casa.`,
  };
}

export function generateHealthReadingEs(chart: KundliChart): HealthReading {
  const sixthLord = houseLord(chart, 6);
  const sixthLordHouse = planetHouse(chart, sixthLord as Planet);

  return {
    summary: `El regente de su 6ª casa, ${p(sixthLord)}, en la casa ${sixthLordHouse} moldea sus patrones de salud.`,
    vulnerableAreas: 'No se indican áreas vulnerables significativas — mantenga disciplina general de salud.',
    healthPeriods: `Atención extra a la salud es necesaria durante Dashas de ${p(sixthLord)} y planetas en la 6ª u 8ª casa.`,
    preventiveMeasures: 'Se recomiendan chequeos regulares, rutina de ejercicio y dieta de acuerdo con sus áreas vulnerables.',
  };
}

export function generateSpiritualReadingEs(chart: KundliChart): SpiritualReading {
  const ninthLord = houseLord(chart, 9);
  const twelfthLord = houseLord(chart, 12);
  const jupiterHouse = planetHouse(chart, 'Jupiter');
  const ketuHouse = planetHouse(chart, 'Ketu');

  return {
    summary: `Su camino espiritual está guiado por el regente de la 9ª casa ${p(ninthLord)} (dharma) y el regente de la 12ª casa ${p(twelfthLord)} (moksha). Júpiter en casa ${jupiterHouse} y Ketu en casa ${ketuHouse} refinan aún más su inclinación espiritual.`,
    spiritualStrengths: 'El crecimiento espiritual viene de la práctica consciente.',
    meditationStyle: ketuHouse <= 6 ? 'Prácticas espirituales activas y orientadas al servicio le convienen — Karma Yoga, canto de mantras en la actividad diaria.' :
      'Prácticas contemplativas e introspectivas le convienen — meditación sentada, visualización y Bhakti Yoga.',
    karmaTheme: `Ketu en casa ${ketuHouse} sugiere dominio de vidas pasadas. Su alma busca completar trabajo inconcluso aquí.`,
  };
}
