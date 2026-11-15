/**
 * Portuguese (Brazilian) life-area interpretation generators.
 * Provides authentic, culturally rooted, language-native astrological readings for:
 * Career, Marriage, Wealth, Health, and Spirituality in fluent Portuguese.
 */
import type { Planet, KundliChart } from '../types';
import type { CareerReading, MarriageReading, WealthReading, HealthReading, SpiritualReading } from './life-areas';
import { PLANET_NAME_PT, SIGN_NAME_PT, ordinalPt } from './pt';

function planetsInHouse(chart: KundliChart, house: number): Planet[] { return chart.houses[house - 1]?.planets ?? []; }
function houseLord(chart: KundliChart, house: number): string { return chart.houses[house - 1]?.lord ?? ''; }
function planetHouse(chart: KundliChart, planet: Planet): number { return chart.planets[planet]?.house ?? 0; }
function planetSign(chart: KundliChart, planet: Planet): string { return chart.planets[planet]?.rashiName ?? ''; }
function p(name: string): string { return PLANET_NAME_PT[name] || name; }
function s(name: string): string { return SIGN_NAME_PT[name] || name; }

const SIGN_CAREER_PT: Record<string, string[]> = {
  Aries: ['Forças de Segurança', 'Engenharia Mecânica', 'Cirurgia', 'Esportes de Alto Rendimento', 'Empreendedorismo Inovador'],
  Taurus: ['Mercado Financeiro', 'Agronegócio', 'Gastronomia', 'Bens de Luxo', 'Arquitetura e Patrimônio'],
  Gemini: ['Comunicação e Mídia', 'Tecnologia da Informação (TI)', 'Jornalismo', 'Comércio Exterior', 'Publicidade'],
  Cancer: ['Saúde e Enfermagem', 'Hotelaria e Turismo', 'Mercado Imobiliário', 'Serviço Social', 'Alimentação'],
  Leo: ['Governança e Política', 'Liderança Corporativa', 'Artes Cênicas', 'Gestão de Grandes Equipes', 'Entretenimento'],
  Virgo: ['Auditoria e Controladoria', 'Medicina Diagnóstica', 'Edição', 'Engenharia de Qualidade', 'Pesquisa Científica'],
  Libra: ['Direito e Magistratura', 'Diplomacia Internacional', 'Design e Moda', 'Relações Públicas', 'Sociedades Comerciais'],
  Scorpio: ['Investigação e Perícia', 'Psicologia Profunda', 'Mercado de Seguros', 'Mineração', 'Pesquisa Oculta'],
  Sagittarius: ['Ensino Superior e Filosofia', 'Direito Internacional', 'Editoração', 'Turismo Global', 'Comércio Transnacional'],
  Capricorn: ['Administração Pública', 'Engenharia Civil e Infraestrutura', 'Mineração', 'Gestão Estratégica', 'Indústria Pesada'],
  Aquarius: ['Tecnologia de Ponta e IA', 'Aeroespacial', 'Causas Humanitárias', 'Ciências Sociais', 'Telecomunicações'],
  Pisces: ['Medicina Integrativa', 'Artes Visuais e Cinema', 'Diplomacia Humanitária', 'Fotografia', 'Psicologia Transpessoal'],
};

const PLANET_CAREER_PT: Record<string, string[]> = {
  Sun: ['Cargos de Chefia Governamental', 'Administração de Empresas', 'Medicina', 'Liderança Pública', 'Políticas Estratégicas'],
  Moon: ['Comércio e Vendas ao Público', 'Hotelaria', 'Enfermagem', 'Psicologia', 'Recursos Hídricos e Navegação'],
  Mars: ['Engenharia e Obras', 'Cirurgia', 'Segurança e Defesa', 'Setor Imobiliário', 'Esportes Competitivos'],
  Mercury: ['Software e Tecnologia', 'Análise Financeira', 'Comunicação e Redação', 'Comércio Eletrônico', 'Consultoria'],
  Jupiter: ['Magistratura e Direito', 'Educação Superior', 'Consultoria de Investimentos', 'Filosofia e Ética', 'Editoras'],
  Venus: ['Design e Alta Moda', 'Cinema e Produção Musical', 'Gastronomia de Luxo', 'Arquitetura de Interiores', 'Diplomacia'],
  Saturn: ['Indústria Manufatureira', 'Construção Civil', 'Agronomia', 'Gestão Pública', 'Sindicatos e Relações de Trabalho'],
  Rahu: ['Tecnologia Disruptiva', 'Aviação', 'Mídia Digital', 'Indústria Farmacêutica', 'Importação e Exportação'],
  Ketu: ['Pesquisa Avançada', 'Terapias Alternativas', 'Programação de Sistemas', 'Astrologia e Ciências Ocultas', 'Filantropia'],
};

export function generateCareerReadingPt(chart: KundliChart): CareerReading {
  const tenth = chart.houses[9];
  const tenthLordPlanet = tenth.lord;
  const tenthLordHouse = planetHouse(chart, tenthLordPlanet as Planet);
  const tenthSign = tenth.rashiName;
  const planetsIn10 = planetsInHouse(chart, 10);

  const fields = new Set<string>();
  (SIGN_CAREER_PT[tenthSign] ?? []).forEach(f => fields.add(f));
  planetsIn10.forEach(pp => (PLANET_CAREER_PT[pp] ?? []).forEach(f => fields.add(f)));
  (PLANET_CAREER_PT[tenthLordPlanet] ?? []).forEach(f => fields.add(f));

  const tenthHouseAnalysis = `Sua 10ª casa (Karma Bhava — o setor da vocação e realização no mundo) está situada no signo sideral de ${s(tenthSign)}, sob a tutela de ${p(tenthLordPlanet)}. Este regente posiciona-se na sua ${ordinalPt(tenthLordHouse)} casa natal${
    planetsIn10.length > 0
      ? `, enquanto a presença de ${planetsIn10.map(pp => p(pp)).join(', ')} na 10ª casa infunde magnetismo e dinamismo direto à sua atuação profissional`
      : ', indicando que seu prestígio se constrói primordialmente através da dignidade e das relações cósmicas do regente'
  }.`;

  const rahu12 = planetHouse(chart, 'Rahu') === 12 || planetHouse(chart, 'Rahu') === 9;
  const ketu12 = planetHouse(chart, 'Ketu') === 12 || planetHouse(chart, 'Ketu') === 9;
  const foreignWork = (rahu12 || ketu12)
    ? 'A ativação do eixo da 9ª ou 12ª casa por nós lunares favorece expressivamente carreiras internacionais, multinacionais, viagens de negócios e conexões além das fronteiras natais.'
    : 'A trajetória profissional consolida-se com firmeza no território de origem, embora períodos de trânsito benéfico possam abrir portas para parcerias externas ocasionais.';

  const saturn10 = planetsIn10.includes('Saturn');
  const sun10 = planetsIn10.includes('Sun');
  const jobVsBusiness = saturn10
    ? 'Saturno na 10ª casa favorece carreiras estruturadas, sólidas e hierárquicas — como o serviço público concursado ou corporações consolidadas com planos de carreira claros.'
    : sun10
    ? 'O Sol na 10ª casa aponta vocação inata para o comando autônomo, liderança empreendedora ou cargos diretivos onde você seja a autoridade decisória.'
    : planetsIn10.includes('Mercury')
    ? 'Mercúrio na 10ª casa beneficia fortemente o comércio, a intermediação de negócios, a tecnologia, a consultoria e empreendimentos múltiplos.'
    : 'Seu mapa oferece flexibilidade para transitar harmoniosamente entre cargos estáveis de prestígio e empreendimentos comerciais próprios.';

  return {
    summary: `Sua carreira é impulsionada pela energia arquetípica de ${s(tenthSign)} e guiada pelo talento de ${p(tenthLordPlanet)}. Os campos com maior ressonância e potencial de prosperidade são: ${[...fields].slice(0, 6).join(', ')}.`,
    tenthHouseAnalysis,
    suitableFields: [...fields].slice(0, 8),
    timingHint: `O ápice de expansão profissional ocorre durante os períodos de Mahadasha ou Antardasha de ${p(tenthLordPlanet)}, ou quando Júpiter transita favoravelmente sobre sua 10ª casa.`,
    jobVsBusiness,
    foreignWork,
  };
}

const SIGN_TRAITS_PT: Record<string, string> = {
  Aries: 'corajosa, enérgica, pioneira e decidida', Taurus: 'leal, paciente, serena e amante do conforto',
  Gemini: 'comunicativa, bem-humorada, articulada e mentalmente curiosa', Cancer: 'afetuosa, protetora, empática e acolhedora',
  Leo: 'nobre, generosa, leal e de presença marcante', Virgo: 'atenciosa aos detalhes, dedicada, prática e prestativa',
  Libra: 'harmoniosa, refinada, diplomática e companheira', Scorpio: 'profunda, magnética, fiel e intensamente protetora',
  Sagittarius: 'otimista, livre, culta e de horizontes amplos', Capricorn: 'comprometida, madura, leal e de conduta exemplar',
  Aquarius: 'independente, visionária, justa e companheira', Pisces: 'sensível, compreensiva, compassiva e de alma poética',
};

export function generateMarriageReadingPt(chart: KundliChart): MarriageReading {
  const seventh = chart.houses[6];
  const seventhLord = seventh.lord;
  const seventhSign = seventh.rashiName;
  const seventhLordHouse = planetHouse(chart, seventhLord as Planet);
  const planetsIn7 = planetsInHouse(chart, 7);
  const venusSign = planetSign(chart, 'Venus');
  const venusHouse = planetHouse(chart, 'Venus');

  const spouseNature = `Sua 7ª casa (o templo das parcerias e do casamento) localiza-se em ${s(seventhSign)}, revelando um(a) parceiro(a) de natureza ${SIGN_TRAITS_PT[seventhSign] || 'singular e marcante'}. ` +
    `Vênus posicionado em ${s(venusSign)} (na ${ordinalPt(venusHouse)} casa) adiciona afeto sincero, elegância de sentimentos e busca mútua por cumplicidade duradoura.` +
    (planetsIn7.length > 0 ? ` A presença de ${planetsIn7.map(pp => p(pp)).join(', ')} na 7ª casa infunde dinâmicas adicionais de aprendizado e intensidade à convivência a dois.` : '');

  const hasJupiterAspect7 = planetHouse(chart, 'Jupiter') === 7 || [1, 5, 9].some(offset => {
    const jh = planetHouse(chart, 'Jupiter');
    return (jh + offset - 1) % 12 + 1 === 7;
  });

  return {
    summary: `A vida conjugal e as alianças de alma são delineadas primordialmente pela 7ª casa em ${s(seventhSign)}, cujo regente ${p(seventhLord)} habita a sua ${ordinalPt(seventhLordHouse)} casa natal.`,
    spouseNature,
    marriageTiming: `Os períodos mais promissores para o matrimônio ou consolidação de vínculos coincidem com a Dasha de ${p(seventhLord)} ou de Vênus, e durante trânsitos de bênção de Júpiter sobre o eixo da 7ª casa.`,
    challenges: planetsIn7.includes('Saturn') ? 'Saturno na 7ª casa tende a trazer casamentos mais maduros ou ligeiramente postergados, onde o cultivo da paciência e da lealdade sólida é a grande lição.' :
      planetsIn7.includes('Rahu') ? 'Rahu na 7ª casa atrai parceiros de origens não convencionais ou culturas diversas, pedindo diálogo aberto e tolerância recíproca.' :
      planetsIn7.includes('Mars') ? 'Marte na 7ª casa traz paixão vibrante, exigindo sabedoria para canalizar assertividade em companheirismo sem atritos de ego.' :
      'Tendências relacionais harmônicas — nuances específicas serão moduladas pela Dasha ativa e pelos trânsitos do momento.',
    strengths: hasJupiterAspect7 ? 'A mirada benéfica de Júpiter sobre a 7ª casa constitui uma sublime proteção cósmica para o casamento, promovendo respeito recíproco, sabedoria ética e alianças perenes.' :
      'A predisposição ao diálogo maduro e a valorização das virtudes do parceiro asseguram estabilidade e realização no lar.',
  };
}

export function generateWealthReadingPt(chart: KundliChart): WealthReading {
  const secondLord = houseLord(chart, 2);
  const eleventhLord = houseLord(chart, 11);
  const secondLordHouse = planetHouse(chart, secondLord as Planet);
  const eleventhLordHouse = planetHouse(chart, eleventhLord as Planet);
  const planetsIn2 = planetsInHouse(chart, 2);
  const planetsIn11 = planetsInHouse(chart, 11);
  const fourthLord = houseLord(chart, 4);
  const marsHouse = planetHouse(chart, 'Mars');

  return {
    summary: `Seu fluxo de prosperidade é ancorado pela 2ª casa (riqueza acumulada e reservas) regida por ${p(secondLord)} na ${ordinalPt(secondLordHouse)} casa, e dinamizado pela 11ª casa (ganhos, lucros e redes) regida por ${p(eleventhLord)} na ${ordinalPt(eleventhLordHouse)} casa. ${
      planetsIn2.length > 0 ? `A presença de ${planetsIn2.map(pp => p(pp)).join(', ')} na 2ª casa potencializa a capacidade natural de acumulação patrimonial.` : ''
    }`,
    wealthSources: `Os canais prioritários de renda alinham-se às áreas vocacionais de ${p(eleventhLord)}. ${
      planetsIn11.length > 0 ? `A presença de ${planetsIn11.map(pp => p(pp)).join(', ')} na 11ª casa expande os lucros através de redes de contatos e projetos de grande escala.` : ''
    }`,
    wealthTiming: `Os ápices de consolidação financeira coincidem com os ciclos preditivos de ${p(secondLord)}, ${p(eleventhLord)} ou de Júpiter, potencializados quando Júpiter transita pelas casas do dinheiro.`,
    propertyIndication: `A aquisição de imóveis, terras e patrimônio estável é indicada pelo regente da 4ª casa, ${p(fourthLord)}, e pela força de Marte na ${ordinalPt(marsHouse)} casa.`,
  };
}

const HOUSE_BODY_PT: Record<number, string> = {
  1: 'cabeça, vitalidade física geral e compleição',
  2: 'face, garganta, dentes e visão direita',
  3: 'braços, ombros, audição e trato respiratório superior',
  4: 'peito, coração, pulmões e bem-estar emocional',
  5: 'estômago, fígado, digestão e sistema nervoso central',
  6: 'intestinos, rins e imunidade primária contra infecções',
  7: 'região lombar, rins e órgãos do sistema reprodutor',
  8: 'vitalidade profunda, longevidade e regeneração celular',
  9: 'quadris, coxas e artérias maiores',
  10: 'joelhos, esqueleto ósseo, articulações e pele',
  11: 'pernas, tornozelos e audição esquerda',
  12: 'pés, sistema linfático, sono e visão esquerda',
};

export function generateHealthReadingPt(chart: KundliChart): HealthReading {
  const sixthLord = houseLord(chart, 6);
  const sixthLordHouse = planetHouse(chart, sixthLord as Planet);
  const planetsIn6 = planetsInHouse(chart, 6);
  const planetsIn8 = planetsInHouse(chart, 8);

  const vulnerable: string[] = [];
  if (planetsIn6.length > 0) {
    planetsIn6.forEach(pp => { vulnerable.push(`${p(pp)} na 6ª casa — atenção voltada para ${HOUSE_BODY_PT[6]}`); });
  }
  if (planetsIn8.length > 0) {
    planetsIn8.forEach(pp => { vulnerable.push(`${p(pp)} na 8ª casa — necessidade de cuidado com ${HOUSE_BODY_PT[8]}`); });
  }
  const ascLord = chart.houses[0].lord;
  const ascLordHouse = planetHouse(chart, ascLord as Planet);
  if (ascLordHouse === 6 || ascLordHouse === 8 || ascLordHouse === 12) {
    vulnerable.push(`O regente do Ascendente, ${p(ascLord)}, na ${ordinalPt(ascLordHouse)} casa recomenda hábitos diários disciplinados para manter a vitalidade sempre plena`);
  }

  return {
    summary: `O regente da 6ª casa, ${p(sixthLord)}, na ${ordinalPt(sixthLordHouse)} casa indica que a vitalidade física se sustenta pelo equilíbrio da rotina, moderação nos hábitos e alimentação ajustada ao seu biotipo natural.`,
    vulnerableAreas: vulnerable.length > 0 ? vulnerable.slice(0, 3).join('; ') : 'Nenhum foco de vulnerabilidade crônica acentuada identificado — medidas preventivas regulares mantêm a excelente vitalidade.',
    healthPeriods: `Exames preventivos e disciplina alimentar tornam-se essenciais durante os ciclos de ${p(sixthLord)} ou dos regentes de casas de esforço.`,
    preventiveMeasures: 'A harmonia entre repouso adequado, exercícios respiratórios, contato com a natureza e nutrição sutil previne desgastes e preserva a longevidade com vigor.',
  };
}

export function generateSpiritualReadingPt(chart: KundliChart): SpiritualReading {
  const ninth = chart.houses[8];
  const ninthLord = ninth.lord;
  const ninthSign = ninth.rashiName;
  const ninthLordHouse = planetHouse(chart, ninthLord as Planet);
  const ketuHouse = planetHouse(chart, 'Ketu');

  return {
    summary: `A evolução espiritual e o senso de propósito cósmico são iluminados pela 9ª casa em ${s(ninthSign)}, sob a nobreza de ${p(ninthLord)} na ${ordinalPt(ninthLordHouse)} casa. A posição de Ketu na ${ordinalPt(ketuHouse)} casa fortalece a intuição transcendental e a libertação de apegos menores.`,
    spiritualStrengths: 'Retidão moral, inclinação espontânea à generosidade, amor pelo conhecimento sagrado e profunda sensibilidade intuitiva.',
    meditationStyle: 'Práticas de silêncio interior, contemplação da natureza, entoação de mantras e reflexões éticas profundas trazem clareza cristalina à mente.',
    karmaTheme: 'O grande propósito desta encarnação é harmonizar os compromissos materiais do dia a dia com uma visão espiritual compassiva e desprendida.',
  };
}
