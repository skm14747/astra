import type { ArcanaInfo } from './types';

export const ARCANA_TABLE: ArcanaInfo[] = [
  { number: 1, name: 'The Magician', theme: 'Willpower, initiative, skill' },
  { number: 2, name: 'The High Priestess', theme: 'Intuition, secrets, patience' },
  { number: 3, name: 'The Empress', theme: 'Creativity, abundance, nurture' },
  { number: 4, name: 'The Emperor', theme: 'Structure, authority, stability' },
  { number: 5, name: 'The Hierophant', theme: 'Tradition, teaching, guidance' },
  { number: 6, name: 'The Lovers', theme: 'Choices, relationships, values' },
  { number: 7, name: 'The Chariot', theme: 'Determination, victory, control' },
  { number: 8, name: 'Justice / Strength', theme: 'Balance, fairness, inner power' },
  { number: 9, name: 'The Hermit', theme: 'Introspection, wisdom, solitude' },
  { number: 10, name: 'Wheel of Fortune', theme: 'Cycles, fate, turning points' },
  { number: 11, name: 'Strength / Justice', theme: 'Courage, patience, soft power' },
  { number: 12, name: 'The Hanged Man', theme: 'Surrender, new perspective, sacrifice' },
  { number: 13, name: 'Transformation', theme: 'Endings, rebirth, deep change' },
  { number: 14, name: 'Temperance', theme: 'Balance, moderation, integration' },
  { number: 15, name: 'The Devil', theme: 'Shadows, attachments, temptation' },
  { number: 16, name: 'The Tower', theme: 'Sudden change, upheaval, awakening' },
  { number: 17, name: 'The Star', theme: 'Hope, inspiration, serenity' },
  { number: 18, name: 'The Moon', theme: 'Illusion, fear, subconscious' },
  { number: 19, name: 'The Sun', theme: 'Joy, success, vitality' },
  { number: 20, name: 'Judgement', theme: 'Reckoning, calling, renewal' },
  { number: 21, name: 'The World', theme: 'Completion, wholeness, fulfillment' },
  { number: 22, name: 'The Fool', theme: 'New beginnings, leap of faith, freedom' },
];

export function getArcana(num: number): ArcanaInfo {
  const idx = num - 1;
  if (idx < 0 || idx >= ARCANA_TABLE.length) {
    return { number: num, name: 'Unknown', theme: '' };
  }
  return ARCANA_TABLE[idx];
}
