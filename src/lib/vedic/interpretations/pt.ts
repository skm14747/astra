/**
 * Portuguese interpretation templates for Vedic astrology content.
 * Uses Brazilian Portuguese with adapted Vedic terminology.
 */
import type { Dignity } from '../types';

type SignText = [positive: string, challenges: string, nature: string];

const SUN_PT: Record<string, SignText> = {
  Aries:    ['Líder nato com presença imponente, corajoso e pioneiro. Forte vitalidade e espírito independente.', 'Pode ser agressivo, impaciente ou dominador quando descontrolado.', 'O Sol está exaltado aqui, dando máxima força ao ego, ambição e autoridade.'],
  Taurus:   ['Determinado, prático e firme em seus propósitos. Aprecia confortos materiais e tem sensibilidade artística.', 'Pode ser teimoso, possessivo ou excessivamente apegado à segurança.', 'Sol no signo de Vênus dá amor ao luxo e beleza com um ego confiável e centrado.'],
  Gemini:   ['Intelectualmente versátil, excelente comunicador, curioso e adaptável. Aprendiz rápido.', 'Pode dispersar energia, faltar foco ou ser superficial em compromissos.', 'Sol no signo de Mercúrio canaliza a identidade pelo intelecto, comunicação e conexões sociais.'],
  Cancer:   ['Emocionalmente perceptivo, protetor da família. Profunda intuição e forte apego às raízes.', 'Pode ser temperamental, excessivamente sensível ou dependente de segurança emocional.', 'Sol no signo da Lua dá uma natureza carinhosa, patriótica e caseira com fortes instintos parentais.'],
  Leo:      ['Confiante, magnânimo, autoridade natural. Expressão criativa e disposição régia e generosa.', 'O ego pode inflar para arrogância, teimosia ou necessidade constante de reconhecimento.', 'Sol em seu próprio signo é muito forte — identidade clara, força de vontade robusta e liderança natural.'],
  Virgo:    ['Analítico, orientado ao serviço, consciente da saúde. Atenção precisa aos detalhes.', 'Pode ser excessivamente crítico, ansioso ou fixado em imperfeições.', 'Sol no signo terrestre de Mercúrio dá um ego prático e modesto que encontra propósito no trabalho útil.'],
  Libra:    ['Diplomático, justo, socialmente gracioso. Busca harmonia nos relacionamentos.', 'Pode comprometer identidade pelos outros, ser indeciso ou evitar conflitos necessários.', 'Sol está debilitado aqui — o ego luta com assertividade, mas ganha refinamento e habilidades de parceria.'],
  Scorpio:  ['Intensamente focado, profundamente perceptivo, resiliente. Forte vontade e capacidade de transformação.', 'Pode ser secretivo, controlador, desconfiado ou vingativo quando ferido.', 'Sol no signo aquático de Marte dá um ego penetrante e investigativo com interesse em conhecimento oculto.'],
  Sagittarius: ['Otimista, filosófico, amante da liberdade. Forte bússola moral e amor ao conhecimento.', 'Pode ser pregador, excessivamente confiante, sem tato ou inquieto.', 'Sol no signo de fogo de Júpiter dá um ego nobre e dhármico movido pela busca da verdade, viagem e sabedoria.'],
  Capricorn: ['Disciplinado, ambicioso, responsável. Ascensão firme rumo à autoridade com paciência.', 'Pode ser frio, excessivamente sério, obcecado por status ou emocionalmente distante.', 'Sol no signo terrestre de Saturno dá um ego devotado e autoritário que conquista respeito pelo esforço persistente.'],
  Aquarius:  ['Humanitário, inovador, pensador independente. Visionário com abordagens não convencionais.', 'Pode ser emocionalmente desapegado, rebelde sem causa ou excêntrico.', 'Sol no signo aéreo de Saturno dá um ego orientado ao bem-estar coletivo, reforma e independência intelectual.'],
  Pisces:   ['Compassivo, intuitivo, espiritualmente inclinado. Natureza artística e profundamente empática.', 'Pode faltar limites, ser escapista ou sacrificar identidade pelos outros.', 'Sol no signo aquático de Júpiter dá um ego altruísta e espiritualmente orientado com dons artísticos e de cura.'],
};

const MOON_PT: Record<string, SignText> = {
  Aries:    ['Emocionalmente ousado e espontâneo, rápido para agir sobre sentimentos.', 'Impulsividade emocional, temperamento rápido, dificuldade com paciência.', 'Lua no signo de Marte dá uma natureza emocional ardente e orientada à ação — sentimentos são expressos imediata e diretamente.'],
  Taurus:   ['Emocionalmente estável, paciente, sensual. Profunda apreciação por beleza e segurança material.', 'Teimosia emocional, possessividade, resistência à mudança.', 'Lua está exaltada aqui — natureza emocional em sua máxima força. Paz interior, sensibilidade artística e contentamento são naturais.'],
  Gemini:   ['Emocionalmente adaptável, comunicativo, intelectualmente curioso.', 'Inquietação emocional, sentimentos dispersos, dificuldade com compromisso emocional profundo.', 'Lua no signo de Mercúrio dá uma mente que intelectualiza emoções — sentimentos são analisados em vez de simplesmente sentidos.'],
  Cancer:   ['Profundamente protetor, intuitivo, cuidador. Forte apego ao lar e segurança emocional.', 'Excessivamente sensível, apegado, temperamental, propenso a sobrecarga emocional.', 'Lua em seu próprio signo é muito forte — inteligência emocional, instintos maternais e sensibilidade psíquica são elevados.'],
  Leo:      ['Emocionalmente generoso, afetuoso, orgulhoso. Precisa se sentir especial e apreciado.', 'Drama emocional, necessidade de atenção, orgulho ferido quando não reconhecido.', 'Lua no signo do Sol dá uma natureza emocional digna e calorosa que anseia por expressão criativa.'],
  Virgo:    ['Emocionalmente analítico, orientado ao serviço, consciente da saúde.', 'Ansiedade emocional, autocrítica, preocupação com imperfeições.', 'Lua no signo terrestre de Mercúrio dá uma natureza emocional nervosa e detalhista.'],
  Libra:    ['Emocionalmente equilibrado, orientado a relacionamentos, esteticamente refinado.', 'Indecisão emocional, dependência dos outros para o humor.', 'Lua no signo de Vênus dá uma natureza emocional graciosa e sociável.'],
  Scorpio:  ['Emocionalmente intenso, profundamente perceptivo, transformador.', 'Turbulência emocional, ciúme, tendência a guardar rancores.', 'Lua está debilitada aqui — emoções são profundas e turbulentas. Grande força psicológica vem de enfrentar a escuridão interior.'],
  Sagittarius: ['Emocionalmente otimista, aventureiro, filosoficamente inclinado.', 'Inquietação emocional, evitação de emoções pesadas.', 'Lua no signo de fogo de Júpiter dá uma natureza emocional entusiasmada e amante da liberdade.'],
  Capricorn: ['Emocionalmente reservado, disciplinado, maduro além da idade.', 'Frieza emocional, dificuldade em expressar vulnerabilidade.', 'Lua no signo de Saturno dá uma natureza emocional séria e estruturada.'],
  Aquarius:  ['Emocionalmente independente, humanitário, intelectualmente orientado.', 'Desapego emocional, dificuldade com intimidade.', 'Lua no signo aéreo de Saturno dá uma natureza emocional progressista e orientada ao grupo.'],
  Pisces:   ['Emocionalmente compassivo, intuitivo, espiritualmente sensível.', 'Absorção da dor alheia, escapismo, dificuldade com limites.', 'Lua no signo aquático de Júpiter dá uma natureza emocional profundamente compassiva e mística.'],
};

export const ALL_PLANETS_PT: Record<string, Record<string, SignText>> = {
  Sun: SUN_PT, Moon: MOON_PT,
};

export const DIGNITY_TEXT_PT: Record<Dignity, { label: string; effect: string; modifier: string }> = {
  exalted: { label: 'Exaltado (Uchcha)', effect: 'em seu pico absoluto de poder. Concede seus melhores e mais elevados resultados em plena medida', modifier: 'Esta é a mais alta dignidade — o planeta entrega suas melhores significações com facilidade, confiança e abundância.' },
  own: { label: 'Domicílio (Swakshetra)', effect: 'confortável e forte em seu próprio território. Protege e sustenta firmemente suas significações', modifier: 'Como uma pessoa em sua própria casa — confiante, relaxada e em total controle. Resultados são confiáveis.' },
  moolatrikona: { label: 'Moolatrikona', effect: 'em seu escritório ou local de trabalho — altamente funcional, produtivo e autoritário', modifier: 'Moolatrikona é o "local de trabalho" do planeta — um pouco menos confortável que casa, mas maximamente produtivo.' },
  friendly: { label: 'Signo Amigo (Mitra Rashi)', effect: 'na casa de um amigo — acolhido, apoiado e capaz de expressar sua natureza com facilidade', modifier: 'Bons resultados vêm naturalmente com algum apoio do senhor do signo.' },
  neutral: { label: 'Signo Neutro (Sama Rashi)', effect: 'em território neutro — resultados são mistos, viáveis e moldados por outros fatores do mapa', modifier: 'Nem ajudado nem prejudicado pelo signo — outros aspectos e conjunções determinam o resultado final.' },
  enemy: { label: 'Signo Inimigo (Shatru Rashi)', effect: 'em território hostil — suas significações enfrentam resistência e requerem esforço extra', modifier: 'Como trabalhar em um ambiente sem apoio. Resultados vêm, mas com atrasos ou compromissos.' },
  debilitated: { label: 'Debilitado (Neecha)', effect: 'em seu ponto mais fraco. Suas significações lutam e podem produzir dificuldades', modifier: 'O planeta está em força mínima, mas Neecha Bhanga pode transformar fraqueza em força única.' },
};

export const RETRO_TEXT_PT = {
  label: 'Retrógrado (Vakri)',
  effect: 'Sua energia se volta para dentro, intensificando a autorreflexão e frequentemente produzindo resultados por canais não convencionais.',
  modifier: 'Planetas retrógrados são considerados fortes na astrologia védica (Vakri = bônus de Cheshta Bala).',
};

export const COMBUST_TEXT_PT = {
  label: 'Combusto (Asta)',
  effect: 'Escondido no brilho do Sol, suas significações são ofuscadas pelo ego ou figuras de autoridade.',
  modifier: 'As qualidades do planeta se fundem com o Sol — sua expressão independente é reduzida, mas ganha proximidade ao poder.',
};

export const ASPECT_RECEIVED_PT: Record<string, string> = {
  Sun: 'O aspecto do Sol traz autoridade, visibilidade e pressão do ego a estes assuntos.',
  Moon: 'O aspecto da Lua traz envolvimento emocional, atenção pública e condições flutuantes.',
  Mars: 'O aspecto de Marte traz energia, coragem e potencial conflito.',
  Mercury: 'O aspecto de Mercúrio traz análise intelectual, comunicação e pensamento comercial.',
  Jupiter: 'O aspecto de Júpiter traz sabedoria, expansão, proteção e fortuna — considerado altamente benéfico.',
  Venus: 'O aspecto de Vênus traz beleza, conforto, refinamento artístico e dinâmicas de relacionamento.',
  Saturn: 'O aspecto de Saturno traz disciplina, atraso, restrição e resistência duradoura.',
  Rahu: 'O aspecto de Rahu traz influências não convencionais, elementos estrangeiros e desejo amplificado.',
  Ketu: 'O aspecto de Ketu traz desapego espiritual, influência de vidas passadas e sensação de incompletude.',
};

export const HOUSE_AREA_MAP_PT = [
  'eu, corpo e vitalidade', 'riqueza, fala e família',
  'irmãos, coragem e comunicação', 'lar, mãe e paz interior',
  'filhos, inteligência e criatividade', 'saúde, inimigos e serviço',
  'casamento, parcerias e negócios', 'longevidade, transformação e ocultismo',
  'fortuna, dharma e educação superior', 'carreira, status e autoridade',
  'renda, ganhos e redes sociais', 'despesas, espiritualidade e libertação',
];

const PT_ORDINALS: Record<number, string> = {
  1: '1ª', 2: '2ª', 3: '3ª', 4: '4ª', 5: '5ª', 6: '6ª',
  7: '7ª', 8: '8ª', 9: '9ª', 10: '10ª', 11: '11ª', 12: '12ª',
};

export function ordinalPt(n: number): string { return PT_ORDINALS[n] || `${n}ª`; }
export function houseAreaPt(h: number): string { return HOUSE_AREA_MAP_PT[h - 1] || ''; }

export const PLANET_NAME_PT: Record<string, string> = {
  Sun: 'Sol', Moon: 'Lua', Mars: 'Marte', Mercury: 'Mercúrio',
  Jupiter: 'Júpiter', Venus: 'Vênus', Saturn: 'Saturno', Rahu: 'Rahu', Ketu: 'Ketu',
};

export const SIGN_NAME_PT: Record<string, string> = {
  Aries: 'Áries', Taurus: 'Touro', Gemini: 'Gêmeos', Cancer: 'Câncer',
  Leo: 'Leão', Virgo: 'Virgem', Libra: 'Libra', Scorpio: 'Escorpião',
  Sagittarius: 'Sagitário', Capricorn: 'Capricórnio', Aquarius: 'Aquário', Pisces: 'Peixes',
};

export function planetNamePt(p: string): string { return PLANET_NAME_PT[p] || p; }
