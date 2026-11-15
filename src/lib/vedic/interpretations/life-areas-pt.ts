/**
 * Portuguese (Brazilian) life-area interpretation generators.
 */
import type { Planet, KundliChart } from '../types';
import type { CareerReading, MarriageReading, WealthReading, HealthReading, SpiritualReading } from './life-areas';
import { PLANET_NAME_PT, SIGN_NAME_PT, ordinalPt, houseAreaPt } from './pt';

function planetsInHouse(chart: KundliChart, house: number): Planet[] { return chart.houses[house - 1]?.planets ?? []; }
function houseLord(chart: KundliChart, house: number): string { return chart.houses[house - 1]?.lord ?? ''; }
function planetHouse(chart: KundliChart, planet: Planet): number { return chart.planets[planet]?.house ?? 0; }
function planetSign(chart: KundliChart, planet: Planet): string { return chart.planets[planet]?.rashiName ?? ''; }
function p(name: string): string { return PLANET_NAME_PT[name] || name; }
function s(name: string): string { return SIGN_NAME_PT[name] || name; }

export function generateCareerReadingPt(chart: KundliChart): CareerReading {
  const tenth = chart.houses[9];
  const tenthLordPlanet = tenth.lord;
  const tenthLordHouse = planetHouse(chart, tenthLordPlanet as Planet);
  const tenthSign = tenth.rashiName;
  const planetsIn10 = planetsInHouse(chart, 10);

  const tenthHouseAnalysis = `Sua 10ª casa (Karma Bhava) está em ${s(tenthSign)}, regida por ${p(tenthLordPlanet)}. ${p(tenthLordPlanet)} está posicionado na sua ${ordinalPt(tenthLordHouse)} casa${
    planetsIn10.length > 0
      ? `. ${planetsIn10.map(pp => p(pp)).join(', ')} estão na sua 10ª casa, influenciando diretamente sua vida profissional`
      : '. Nenhum planeta está diretamente na 10ª casa, então a posição do regente é o indicador primário de carreira'
  }.`;

  return {
    summary: `Sua carreira é moldada pela energia de ${s(tenthSign)}, guiada por ${p(tenthLordPlanet)}.`,
    tenthHouseAnalysis,
    suitableFields: [],
    timingHint: `O pico na carreira é mais provável durante o Mahadasha ou Antardasha de ${p(tenthLordPlanet)}, ou quando Júpiter transita sobre sua 10ª casa.`,
    jobVsBusiness: 'Seu mapa suporta tanto emprego quanto negócios, dependendo do período de Dasha e suporte de trânsito.',
    foreignWork: 'A carreira é indicada principalmente no país de origem, embora trânsitos possam abrir oportunidades temporárias no exterior.',
  };
}

export function generateMarriageReadingPt(chart: KundliChart): MarriageReading {
  const seventh = chart.houses[6];
  const seventhLord = seventh.lord;
  const seventhSign = seventh.rashiName;
  const seventhLordHouse = planetHouse(chart, seventhLord as Planet);

  return {
    summary: `O casamento é indicado pela sua 7ª casa em ${s(seventhSign)}, com o regente ${p(seventhLord)} na ${ordinalPt(seventhLordHouse)} casa.`,
    spouseNature: `Sua 7ª casa em ${s(seventhSign)} sugere a natureza do cônjuge.`,
    marriageTiming: `O momento do casamento é mais favorável durante o Dasha de ${p(seventhLord)} ou Vênus, e quando Júpiter transita sobre sua 7ª casa.`,
    challenges: 'Indicadores gerais de parceria — desafios específicos dependem dos períodos de Dasha e trânsito em andamento.',
    strengths: 'A força da parceria aumenta quando planetas benéficos transitam sobre a 7ª casa e durante períodos favoráveis de Júpiter.',
  };
}

export function generateWealthReadingPt(chart: KundliChart): WealthReading {
  const secondLord = houseLord(chart, 2);
  const eleventhLord = houseLord(chart, 11);
  const secondLordHouse = planetHouse(chart, secondLord as Planet);
  const eleventhLordHouse = planetHouse(chart, eleventhLord as Planet);

  return {
    summary: `Sua riqueza é moldada por ${p(secondLord)} (regente da 2ª casa, na casa ${secondLordHouse}) para poupança, e ${p(eleventhLord)} (regente da 11ª casa, na casa ${eleventhLordHouse}) para renda.`,
    wealthSources: `Os canais primários de renda estão vinculados à natureza de ${p(eleventhLord)}.`,
    wealthTiming: `O pico de riqueza ocorre durante Dashas de ${p(secondLord)}, ${p(eleventhLord)} ou Júpiter.`,
    propertyIndication: `Propriedades imobiliárias são indicadas pelo regente da sua 4ª casa.`,
  };
}

export function generateHealthReadingPt(chart: KundliChart): HealthReading {
  const sixthLord = houseLord(chart, 6);
  const sixthLordHouse = planetHouse(chart, sixthLord as Planet);

  return {
    summary: `O regente da sua 6ª casa, ${p(sixthLord)}, na casa ${sixthLordHouse} molda seus padrões de saúde.`,
    vulnerableAreas: 'Nenhuma área vulnerável significativa indicada — mantenha disciplina geral de saúde.',
    healthPeriods: `Atenção extra à saúde é necessária durante Dashas de ${p(sixthLord)} e planetas na 6ª ou 8ª casa.`,
    preventiveMeasures: 'Check-ups regulares, rotina de exercícios e dieta são recomendados de acordo com suas áreas vulneráveis.',
  };
}

export function generateSpiritualReadingPt(chart: KundliChart): SpiritualReading {
  const ninthLord = houseLord(chart, 9);
  const twelfthLord = houseLord(chart, 12);
  const jupiterHouse = planetHouse(chart, 'Jupiter');
  const ketuHouse = planetHouse(chart, 'Ketu');

  return {
    summary: `Seu caminho espiritual é guiado pelo regente da 9ª casa ${p(ninthLord)} (dharma) e pelo regente da 12ª casa ${p(twelfthLord)} (moksha). Júpiter na casa ${jupiterHouse} e Ketu na casa ${ketuHouse} refinam ainda mais sua inclinação espiritual.`,
    spiritualStrengths: 'O crescimento espiritual vem da prática consciente.',
    meditationStyle: ketuHouse <= 6 ? 'Práticas espirituais ativas e orientadas ao serviço combinam com você — Karma Yoga, canto de mantras na atividade diária.' :
      'Práticas contemplativas e introspectivas combinam com você — meditação sentada, visualização e Bhakti Yoga.',
    karmaTheme: `Ketu na casa ${ketuHouse} sugere domínio de vidas passadas. Sua alma busca completar trabalho inacabado aqui.`,
  };
}
