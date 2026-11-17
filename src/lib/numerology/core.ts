/**
 * Pythagorean Numerology Engine
 *
 * Calculates Life Path, Destiny (Expression), Soul Urge (Heart's Desire),
 * Personality, Personal Year, Maturity Number, and Lo Shu Grid.
 *
 * Master Numbers: 11, 22, 33 are preserved during reduction.
 */

const MASTER_NUMBERS = [11, 22, 33];

/**
 * Reduces a number to a single digit (1-9) or master number (11, 22, 33).
 */
export function reduceToSingle(n: number): number {
  let v = Math.abs(Math.trunc(n));
  while (v > 9 && !MASTER_NUMBERS.includes(v)) {
    v = String(v).split('').reduce((s, d) => s + Number(d), 0);
  }
  return v;
}

// Pythagorean letter-to-number mapping
const PYTHAGOREAN: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

function letterValue(ch: string): number {
  return PYTHAGOREAN[ch.toUpperCase()] ?? 0;
}

function isVowel(ch: string): boolean {
  return VOWELS.has(ch.toUpperCase());
}

// ─── Life Path Number ───
// Calculated by reducing each component (month, day, year) separately,
// then summing and reducing. This preserves master numbers at each stage.

export function calculateLifePath(day: number, month: number, year: number): {
  number: number;
  monthReduced: number;
  dayReduced: number;
  yearReduced: number;
} {
  const monthReduced = reduceToSingle(month);
  const dayReduced = reduceToSingle(day);
  const yearReduced = reduceToSingle(
    String(year).split('').reduce((s, d) => s + Number(d), 0)
  );
  const sum = monthReduced + dayReduced + yearReduced;
  return {
    number: reduceToSingle(sum),
    monthReduced,
    dayReduced,
    yearReduced,
  };
}

// ─── Destiny (Expression) Number ───
// Full birth name reduced to a single digit or master number.

export function calculateDestinyNumber(fullName: string): {
  number: number;
  letterBreakdown: { letter: string; value: number }[];
} {
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '').split('');
  const breakdown = letters.map(l => ({ letter: l, value: letterValue(l) }));
  const total = breakdown.reduce((s, b) => s + b.value, 0);
  return {
    number: reduceToSingle(total),
    letterBreakdown: breakdown,
  };
}

// ─── Soul Urge (Heart's Desire) Number ───
// Sum of vowels in the full birth name.

export function calculateSoulUrge(fullName: string): {
  number: number;
  vowels: { letter: string; value: number }[];
} {
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '').split('');
  const vowels = letters
    .filter(l => isVowel(l))
    .map(l => ({ letter: l, value: letterValue(l) }));
  const total = vowels.reduce((s, v) => s + v.value, 0);
  return {
    number: reduceToSingle(total),
    vowels,
  };
}

// ─── Personality Number ───
// Sum of consonants in the full birth name.

export function calculatePersonality(fullName: string): {
  number: number;
  consonants: { letter: string; value: number }[];
} {
  const letters = fullName.toUpperCase().replace(/[^A-Z]/g, '').split('');
  const consonants = letters
    .filter(l => !isVowel(l))
    .map(l => ({ letter: l, value: letterValue(l) }));
  const total = consonants.reduce((s, c) => s + c.value, 0);
  return {
    number: reduceToSingle(total),
    consonants,
  };
}

// ─── Birthday Number ───
// Simply the day of birth reduced.

export function calculateBirthdayNumber(day: number): number {
  return reduceToSingle(day);
}

// ─── Maturity Number ───
// Life Path + Destiny = reduced.

export function calculateMaturityNumber(lifePath: number, destiny: number): number {
  return reduceToSingle(lifePath + destiny);
}

// ─── Personal Year Number ───
// Current year + birth month + birth day = reduced.

export function calculatePersonalYear(birthDay: number, birthMonth: number, currentYear: number): {
  number: number;
  year: number;
} {
  const sum = reduceToSingle(birthMonth) + reduceToSingle(birthDay) + reduceToSingle(
    String(currentYear).split('').reduce((s, d) => s + Number(d), 0)
  );
  return {
    number: reduceToSingle(sum),
    year: currentYear,
  };
}

// ─── Personal Month and Day ───

export function calculatePersonalMonth(personalYear: number, currentMonth: number): number {
  return reduceToSingle(personalYear + currentMonth);
}

export function calculatePersonalDay(personalMonth: number, currentDay: number): number {
  return reduceToSingle(personalMonth + currentDay);
}

// ─── Lo Shu Grid (3×3 Magic Square) ───
// Maps digits from the full birth date into a 3×3 grid.
// Grid positions: 1=bottom-left, 2=top-center, 3=bottom-right,
// 4=center-left, 5=center, 6=center-right,
// 7=top-left, 8=bottom-center, 9=top-right.

export interface LoShuGrid {
  grid: number[][]; // 3×3 matrix, grid[row][col]
  digitCounts: Record<number, number>; // count of each digit 1-9
  missingNumbers: number[];
  presentNumbers: number[];
  planes: {
    name: string;
    numbers: number[];
    present: number;
    total: number;
    type: 'row' | 'column' | 'diagonal';
    meaning: string;
  }[];
}

// Lo Shu magic square layout:
// Row 0 (top):    4, 9, 2
// Row 1 (middle): 3, 5, 7
// Row 2 (bottom): 8, 1, 6

const LO_SHU_PLANES = [
  { name: 'Mental Plane', numbers: [4, 9, 2], type: 'row' as const, meaning: 'Thinking, memory, and analytical ability' },
  { name: 'Emotional Plane', numbers: [3, 5, 7], type: 'row' as const, meaning: 'Feelings, intuition, and spiritual awareness' },
  { name: 'Practical Plane', numbers: [8, 1, 6], type: 'row' as const, meaning: 'Physical ability, creativity, and business sense' },
  { name: 'Thought Plane', numbers: [4, 3, 8], type: 'column' as const, meaning: 'Ideas, planning, and organizational ability' },
  { name: 'Will Plane', numbers: [9, 5, 1], type: 'column' as const, meaning: 'Determination, patience, and persistence' },
  { name: 'Action Plane', numbers: [2, 7, 6], type: 'column' as const, meaning: 'Activity, accomplishment, and application' },
  { name: 'Soul Arrow', numbers: [4, 5, 6], type: 'diagonal' as const, meaning: 'Balance and spiritual purpose' },
  { name: 'Mind Arrow', numbers: [2, 5, 8], type: 'diagonal' as const, meaning: 'Emotional balance and sensitivity' },
];

export function calculateLoShuGrid(day: number, month: number, year: number): LoShuGrid {
  const dateStr = `${day}${month}${year}`;
  const digits = dateStr.split('').map(Number).filter(d => d >= 1 && d <= 9);

  const digitCounts: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) digitCounts[i] = 0;
  for (const d of digits) digitCounts[d]++;

  const grid: number[][] = [
    [digitCounts[4], digitCounts[9], digitCounts[2]],
    [digitCounts[3], digitCounts[5], digitCounts[7]],
    [digitCounts[8], digitCounts[1], digitCounts[6]],
  ];

  const missingNumbers = Object.entries(digitCounts)
    .filter(([, count]) => count === 0)
    .map(([num]) => Number(num));

  const presentNumbers = Object.entries(digitCounts)
    .filter(([, count]) => count > 0)
    .map(([num]) => Number(num));

  const planes = LO_SHU_PLANES.map(plane => ({
    ...plane,
    present: plane.numbers.filter(n => digitCounts[n] > 0).length,
    total: plane.numbers.length,
  }));

  return { grid, digitCounts, missingNumbers, presentNumbers, planes };
}

// ─── Full Numerology Profile ───

export interface NumerologyProfile {
  lifePath: ReturnType<typeof calculateLifePath>;
  destiny: ReturnType<typeof calculateDestinyNumber>;
  soulUrge: ReturnType<typeof calculateSoulUrge>;
  personality: ReturnType<typeof calculatePersonality>;
  birthdayNumber: number;
  maturityNumber: number;
  personalYear: ReturnType<typeof calculatePersonalYear>;
  loShuGrid: LoShuGrid;
}

export function calculateNumerologyProfile(
  fullName: string,
  day: number,
  month: number,
  year: number,
): NumerologyProfile {
  const lifePath = calculateLifePath(day, month, year);
  const destiny = calculateDestinyNumber(fullName);
  const soulUrge = calculateSoulUrge(fullName);
  const personality = calculatePersonality(fullName);
  const birthdayNumber = calculateBirthdayNumber(day);
  const maturityNumber = calculateMaturityNumber(lifePath.number, destiny.number);
  const personalYear = calculatePersonalYear(day, month, new Date().getFullYear());
  const loShuGrid = calculateLoShuGrid(day, month, year);

  return {
    lifePath,
    destiny,
    soulUrge,
    personality,
    birthdayNumber,
    maturityNumber,
    personalYear,
    loShuGrid,
  };
}
