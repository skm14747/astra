/**
 * Daily Rashifal (Horoscope) Generator
 *
 * Generates daily predictions for all 12 rashis (zodiac signs) based on the
 * Moon's current sidereal transit position. Uses a deterministic seed from
 * the date so predictions are consistent within a day.
 */
import { getTropicalMoonLongitude, getTropicalSunLongitude } from '../astronomy/engine';
import { getAyanamsa, toSidereal } from '../astronomy/ayanamsa';
import { RASHI_NAMES, RASHI_NAMES_SANSKRIT } from './constants';
import type { AyanamsaSystem } from './types';

export type DailyPrediction = {
  rashi: number;
  rashiName: string;
  rashiSanskrit: string;
  overview: string;
  career: string;
  love: string;
  health: string;
  luckyNumber: number;
  luckyColor: string;
  intensity: 1 | 2 | 3 | 4 | 5;
};

const LUCKY_COLORS = ['Red', 'Blue', 'Green', 'Yellow', 'White', 'Purple', 'Orange', 'Pink', 'Gold', 'Silver', 'Turquoise', 'Maroon'];

const OVERVIEW_TEMPLATES = [
  'The Moon transiting through {moonRashi} favors your {house} house today. A good day for reflection and planning ahead.',
  'With the Moon in {moonRashi}, your {house} house is activated. New opportunities may appear from unexpected directions.',
  'Today\'s lunar energy in {moonRashi} touches your {house} house. Focus on building connections and nurturing existing relationships.',
  'The Moon\'s transit through {moonRashi} highlights your {house} house. Patience will be your greatest asset today.',
  'Lunar energy in {moonRashi} illuminates your {house} house. A productive day for tackling long-pending tasks.',
  'The Moon passing through {moonRashi} activates your {house} house. Creative ideas flow freely — capture them.',
  'With the Moon transiting {moonRashi}, your {house} house receives energy. Diplomacy serves you better than confrontation today.',
  'Today\'s Moon in {moonRashi} energizes your {house} house. Focus on personal growth and self-improvement.',
  'The lunar transit through {moonRashi} touches your {house} house. Financial decisions should be made carefully today.',
  'Moon\'s energy in {moonRashi} highlights your {house} house. Good day for spiritual practices and meditation.',
  'The transit Moon in {moonRashi} activates your {house} house. Collaborations and teamwork are favored today.',
  'With the Moon in {moonRashi}, your {house} house is energized. Health and wellness activities bring excellent results.',
];

const CAREER_TEMPLATES = [
  'Professional endeavors gain momentum. A senior colleague may offer valuable guidance. Stay focused on deliverables.',
  'Financial matters need attention. Review your budget before making commitments. A business idea may show promise.',
  'Workplace dynamics shift in your favor. Your communication skills shine in meetings. Lead by example.',
  'A challenging project yields progress with persistence. Avoid making hasty decisions about career changes.',
  'Business opportunities related to partnerships look favorable. Networking brings unexpected professional benefits.',
  'Creative solutions to workplace problems earn recognition. Financial gains from past investments are possible.',
  'A slow start to the day gives way to productive afternoon hours. Legal or contractual matters need careful review.',
  'Leadership qualities are recognized by peers. New responsibilities may come your way. Prepare to step up.',
  'Financial discipline pays off. Avoid lending money today. A professional training or course could be beneficial.',
  'Collaborative projects flourish. Remote work brings better focus. Government-related work shows positive results.',
  'A mentor figure offers practical advice. Income from secondary sources possible. Keep documentation thorough.',
  'Steady progress on ongoing projects. Avoid speculative investments today. Hard work builds lasting results.',
];

const LOVE_TEMPLATES = [
  'Relationships benefit from honest conversations. Single natives may receive an unexpected proposal or connection.',
  'Express gratitude to your partner. Family bonds strengthen. A social gathering brings pleasant interactions.',
  'Minor misunderstandings need patience. Avoid arguments over trivial matters. Evening brings romantic possibilities.',
  'Your charm is at its peak. Singles may attract attention. Couples should plan quality time together.',
  'Family harmony is favored. Elders\' blessings bring good fortune. A long-distance relationship shows positive signs.',
  'Communication is key in relationships today. Express your feelings openly. Old friendships may be rekindled.',
  'Emotional depth enriches partnerships. A surprise from a loved one lifts your spirits. Be receptive.',
  'Domestic matters need attention. Home improvement activities bring joy. Parent-child relationships strengthen.',
  'Social connections expand. A friend introduces someone interesting. Committed couples find deeper understanding.',
  'Romantic gestures make a lasting impression. Family members show support for your plans. Heart-to-heart talks favored.',
  'Patience brings rewards in relationships. Avoid possessiveness. A family celebration may be in the works.',
  'Love life gains positive momentum. New relationships may begin with an intellectual connection. Respect boundaries.',
];

const HEALTH_TEMPLATES = [
  'Energy levels are steady. Morning exercise brings vitality. Stay hydrated and avoid heavy meals late in the day.',
  'Digestive health needs attention. Include more fiber and fresh vegetables. Avoid processed foods and excess sugar.',
  'Mental well-being improves through meditation or yoga. Eye strain from screens — take regular breaks.',
  'Physical activity brings renewed energy. Joint or muscle care is important. An evening walk calms the mind.',
  'Stress management is today\'s priority. Deep breathing exercises help. Avoid skipping meals or irregular sleep.',
  'Overall vitality is good. Focus on preventive care. Herbal teas and warm drinks benefit your constitution.',
  'Minor ailments may surface — don\'t ignore early symptoms. Rest adequately. Breathing exercises strengthen immunity.',
  'Energy peaks in the morning. Use it for demanding tasks. Afternoon rest improves evening productivity.',
  'Skin and hair care routines show results. Adequate water intake is essential. Reduce caffeine if anxious.',
  'Balanced meals and moderate exercise maintain good health. Mental clarity improves with quality sleep tonight.',
  'Immune system is strong. A good day for health check-ups or starting a new fitness routine.',
  'Emotional well-being benefits from creative expression. Physical stamina is good. Avoid overexertion in the heat.',
];

const HOUSE_NAMES = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function dateSeed(date: Date): number {
  const y = date.getFullYear();
  const m = date.getMonth();
  const d = date.getDate();
  return y * 10000 + m * 100 + d;
}

export function generateDailyHoroscopes(
  date: Date,
  system: AyanamsaSystem = 'lahiri',
): { predictions: DailyPrediction[]; moonRashi: string; moonRashiIndex: number } {
  const ayanamsa = getAyanamsa(date, system);
  const tropMoon = getTropicalMoonLongitude(date);
  const sidMoon = toSidereal(tropMoon, ayanamsa);
  const moonRashiIndex = Math.floor(sidMoon / 30) % 12;
  const moonRashi = RASHI_NAMES[moonRashiIndex];

  const seed = dateSeed(date);

  const predictions: DailyPrediction[] = [];
  for (let i = 0; i < 12; i++) {
    const rng = seededRandom(seed + i * 7919);

    const houseFromMoon = ((moonRashiIndex - i + 12) % 12);
    const house = HOUSE_NAMES[houseFromMoon];

    const overview = OVERVIEW_TEMPLATES[Math.floor(rng() * OVERVIEW_TEMPLATES.length)]
      .replace('{moonRashi}', moonRashi)
      .replace('{house}', house);
    const career = CAREER_TEMPLATES[Math.floor(rng() * CAREER_TEMPLATES.length)];
    const love = LOVE_TEMPLATES[Math.floor(rng() * LOVE_TEMPLATES.length)];
    const health = HEALTH_TEMPLATES[Math.floor(rng() * HEALTH_TEMPLATES.length)];

    const luckyNumber = Math.floor(rng() * 9) + 1;
    const luckyColor = LUCKY_COLORS[Math.floor(rng() * LUCKY_COLORS.length)];
    const intensity = (Math.floor(rng() * 5) + 1) as 1 | 2 | 3 | 4 | 5;

    predictions.push({
      rashi: i,
      rashiName: RASHI_NAMES[i],
      rashiSanskrit: RASHI_NAMES_SANSKRIT[i],
      overview,
      career,
      love,
      health,
      luckyNumber,
      luckyColor,
      intensity,
    });
  }

  return { predictions, moonRashi, moonRashiIndex };
}
