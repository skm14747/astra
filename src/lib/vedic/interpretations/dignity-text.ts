/**
 * Dignity modifiers, aspect texts, and conjunction effects.
 * Sources: BPHS Ch.3 (dignities), Ch.28 (aspects), Phaladeepika.
 */
import type { Planet, Dignity } from '../types';

export const DIGNITY_TEXT: Record<Dignity, { label: string; effect: string; modifier: string }> = {
  exalted: {
    label: 'Exalted (Uchcha)',
    effect: 'at its absolute peak of power. It bestows its finest, most elevated results in full measure',
    modifier: 'This is the highest dignity — the planet delivers its best significations with ease, confidence, and abundance.',
  },
  own: {
    label: 'Own Sign (Swakshetra)',
    effect: 'comfortable and strong in its own territory. It protects and steadily supports its significations',
    modifier: 'Like a person in their own home — confident, relaxed, and fully in control. Results are reliable and self-sustaining.',
  },
  moolatrikona: {
    label: 'Moolatrikona',
    effect: 'in its office or place of work — highly functional, productive, and authoritative',
    modifier: 'Moolatrikona is the planet\'s "workplace" — slightly less comfortable than home but maximally productive and efficient.',
  },
  friendly: {
    label: 'Friendly Sign (Mitra Rashi)',
    effect: 'in a friend\'s house — welcomed, supported, and able to express its nature with ease',
    modifier: 'Good results come naturally with some support from the sign lord. The planet functions well here.',
  },
  neutral: {
    label: 'Neutral Sign (Sama Rashi)',
    effect: 'in a neutral territory — results are mixed, workable, and shaped by other factors in the chart',
    modifier: 'Neither helped nor hindered by the sign — other aspects, conjunctions, and the house lord determine the final outcome.',
  },
  enemy: {
    label: 'Enemy Sign (Shatru Rashi)',
    effect: 'in hostile territory — its significations face resistance and require extra effort to manifest',
    modifier: 'Like working in an unsupportive environment. Results come, but with delays, friction, or compromise.',
  },
  debilitated: {
    label: 'Debilitated (Neecha)',
    effect: 'at its weakest point. Its significations struggle and may produce difficulties or unconventional results',
    modifier: 'The planet is at minimum strength, but Neecha Bhanga (cancellation of debility) through specific conditions can transform weakness into unique strength.',
  },
};

export function getDignityText(d: Dignity): typeof DIGNITY_TEXT[Dignity] {
  return DIGNITY_TEXT[d];
}

export const RETRO_TEXT = {
  label: 'Retrograde (Vakri)',
  effect: 'Its energy turns inward, intensifying self-reflection and often producing results through unconventional or delayed channels.',
  modifier: 'Retrograde planets are considered strong in Vedic astrology (Vakri = Cheshta Bala bonus). Their effects are internalized, karmic, and may manifest differently than expected.',
};

export const COMBUST_TEXT = {
  label: 'Combust (Asta)',
  effect: 'Hidden in the Sun\'s blaze, its significations are overshadowed by the ego or authority figures.',
  modifier: 'The planet\'s qualities merge with the Sun — its independent expression is reduced, but it gains proximity to power and authority.',
};

export const ASPECT_RECEIVED: Record<string, string> = {
  Sun: 'The Sun\'s aspect brings authority, visibility, and the pressure of ego or government influence to these matters.',
  Moon: 'The Moon\'s aspect brings emotional involvement, public attention, and fluctuating conditions to these matters.',
  Mars: 'Mars\'s aspect brings energy, courage, and potential conflict or aggression to these matters.',
  Mercury: 'Mercury\'s aspect brings intellectual analysis, communication, and business thinking to these matters.',
  Jupiter: 'Jupiter\'s aspect brings wisdom, expansion, protection, and fortune to these matters — this is considered highly beneficial.',
  Venus: 'Venus\'s aspect brings beauty, comfort, artistic refinement, and relationship dynamics to these matters.',
  Saturn: 'Saturn\'s aspect brings discipline, delay, restriction, and lasting endurance to these matters — results come slowly but are durable.',
  Rahu: 'Rahu\'s aspect brings unconventional influences, foreign elements, and amplified desire to these matters.',
  Ketu: 'Ketu\'s aspect brings spiritual detachment, past-life influence, and a sense of incompleteness to these matters.',
};

export const CONJUNCTION_TEXT: Record<string, string> = {
  'Sun-Moon': 'The Amavasya combination — ego and mind merge, creating focused but emotionally intense personality. New Moon birth indicates a powerful fresh start in this life.',
  'Sun-Mars': 'Fiery combination of authority and energy. Courageous, commanding, but prone to anger and conflict with authority. Good for military, police, or competitive fields.',
  'Sun-Mercury': 'Budha-Aditya Yoga potential — intelligence combined with authority. Excellent for government advisory, academic leadership, and authoritative communication.',
  'Sun-Jupiter': 'Noble combination of wisdom and authority. Natural teacher, religious leader, or government advisor. Generous and principled.',
  'Sun-Venus': 'Authority and pleasure combine. Creative leadership, luxury, and artistic authority. May struggle balancing ego with relationships.',
  'Sun-Saturn': 'Tension between authority and restriction. Father-figure issues, delayed recognition, but tremendous persistence. Career success comes late.',
  'Sun-Rahu': 'Amplified ego and unconventional authority. Dramatic public life, possible government work in unusual fields. Eclipse-like effect on the ego.',
  'Sun-Ketu': 'Ego dissolution and spiritual authority. Past-life leadership skills, but difficulty with conventional power. Spiritual or healing vocation.',
  'Moon-Mars': 'Chandra-Mangal Yoga — emotional energy, courage, and business drive. Wealth through real estate or action-oriented businesses. Can indicate emotional volatility.',
  'Moon-Mercury': 'Emotional intelligence meets analytical mind. Excellent for writing, counseling, and public communication. The mind processes emotions through logic.',
  'Moon-Jupiter': 'Gajakesari Yoga potential — wisdom meets emotional depth. Generous, popular, and spiritually inclined. Excellent for teaching and counseling.',
  'Moon-Venus': 'Emotional beauty and artistic sensitivity. Strong romantic nature, love of luxury, and creative arts. Popular and charming.',
  'Moon-Saturn': 'Emotional discipline and delayed happiness. Serious, responsible, but prone to depression. Mother-related difficulties. Emotional maturity comes late.',
  'Moon-Rahu': 'Amplified emotions and unconventional thinking. Intense mental activity, possible anxiety, but brilliant unconventional ideas.',
  'Moon-Ketu': 'Spiritual emotions and past-life memories. Intuitive, psychic, but emotionally detached. May feel like an outsider emotionally.',
  'Mars-Mercury': 'Action meets intellect. Sharp debater, technical skill, and engineering ability. Can indicate aggressive communication.',
  'Mars-Jupiter': 'Energy meets wisdom. Dharmic warrior, courageous teacher, and ethical leader. Good for law, military leadership, or sports coaching.',
  'Mars-Venus': 'Passion meets beauty. Intense romantic energy, artistic drive, and creative passion. May indicate excessive sensual appetite.',
  'Mars-Saturn': 'Energy meets restriction. Tremendous disciplined energy, but also frustration, accidents, and mechanical skill. Good for engineering and surgery.',
  'Mars-Rahu': 'Amplified aggression and unconventional action. Powerful drive in technology, foreign ventures, or unconventional battles.',
  'Mars-Ketu': 'Spiritual warrior energy. Past-life martial skill, interest in moksha through action, and surgical or technical intuition.',
  'Mercury-Jupiter': 'Intellect meets wisdom. Exceptional learning ability, writing, teaching, and philosophical communication. Highly educated.',
  'Mercury-Venus': 'Communication meets beauty. Artistic writing, music, design, and charming speech. Good for fashion, media, and entertainment.',
  'Mercury-Saturn': 'Intellect meets discipline. Deep, structured thinking. Good for research, accounting, and technical writing. Slow but thorough learning.',
  'Mercury-Rahu': 'Amplified intellect and unconventional communication. Brilliant in technology, foreign languages, and media. May be deceptive.',
  'Mercury-Ketu': 'Intuitive intellect. Past-life knowledge surfaces as intuition. Good for astrology, programming, and spiritual writing.',
  'Jupiter-Venus': 'Wisdom meets beauty. Appreciation for art, culture, and refined pleasures. Excellent for teaching arts, luxury businesses, and diplomacy.',
  'Jupiter-Saturn': 'Expansion meets restriction. Disciplined wisdom, responsible growth. Good for law, government, banking, and long-term institution building.',
  'Jupiter-Rahu': 'Guru Chandal Yoga — amplified wisdom with unconventional or foreign spiritual interests. Breaks religious norms for growth.',
  'Jupiter-Ketu': 'Spiritual wisdom and detachment. Deep meditation ability, interest in moksha, and past-life spiritual merit. May reject organized religion.',
  'Venus-Saturn': 'Beauty meets discipline. Delayed romance, mature relationships, and appreciation for classical arts. Love comes late but lasts.',
  'Venus-Rahu': 'Amplified desire and unconventional romance. Foreign spouse possibility, luxury through unusual means, glamour industry.',
  'Venus-Ketu': 'Spiritual beauty and detachment from romance. Past-life artistic mastery, interest in divine beauty over worldly romance.',
  'Saturn-Rahu': 'Discipline meets amplified ambition. Powerful drive for worldly achievement through persistent unconventional means.',
  'Saturn-Ketu': 'Discipline meets spiritual detachment. Ascetic tendencies, interest in meditation, and detachment from worldly structure.',
  'Rahu-Ketu': 'The nodal axis — always 180° apart, never conjunct in the standard sense. If within a sign, extreme karmic intensity.',
};

export function getConjunctionText(p1: Planet, p2: Planet): string {
  const key1 = `${p1}-${p2}`;
  const key2 = `${p2}-${p1}`;
  return CONJUNCTION_TEXT[key1] || CONJUNCTION_TEXT[key2] || `${p1} and ${p2} combine their energies in this house, blending their significations and modifying each other's expression.`;
}
