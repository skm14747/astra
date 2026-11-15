import type { Planet, GrahaPlanet, RashiIndex } from './types';

export const RASHI_NAMES = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
] as const;

export const RASHI_NAMES_SANSKRIT = [
  'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
  'Tula', 'Vrishchika', 'Dhanu', 'Makara', 'Kumbha', 'Meena',
] as const;

export const NAKSHATRA_NAMES = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Moola', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
] as const;

export const NAKSHATRA_LORDS: Record<string, string> = {
  Ashwini: 'Ketu', Bharani: 'Venus', Krittika: 'Sun',
  Rohini: 'Moon', Mrigashira: 'Mars', Ardra: 'Rahu',
  Punarvasu: 'Jupiter', Pushya: 'Saturn', Ashlesha: 'Mercury',
  Magha: 'Ketu', 'Purva Phalguni': 'Venus', 'Uttara Phalguni': 'Sun',
  Hasta: 'Moon', Chitra: 'Mars', Swati: 'Rahu',
  Vishakha: 'Jupiter', Anuradha: 'Saturn', Jyeshtha: 'Mercury',
  Moola: 'Ketu', 'Purva Ashadha': 'Venus', 'Uttara Ashadha': 'Sun',
  Shravana: 'Moon', Dhanishta: 'Mars', Shatabhisha: 'Rahu',
  'Purva Bhadrapada': 'Jupiter', 'Uttara Bhadrapada': 'Saturn', Revati: 'Mercury',
};

export const VIMSHOTTARI_LORDS: string[] = [
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury',
];

export const VIMSHOTTARI_DURATIONS: number[] = [
  7, 20, 6, 10, 7, 18, 16, 19, 17,
];

export const VIMSHOTTARI_TOTAL = 120;

export const PLANET_EXALTATION: Partial<Record<Planet, RashiIndex>> = {
  Sun: 0, Moon: 1, Mars: 9, Mercury: 5,
  Jupiter: 3, Venus: 11, Saturn: 6, Rahu: 1, Ketu: 7,
};

export const PLANET_DEBILITATION: Partial<Record<Planet, RashiIndex>> = {
  Sun: 6, Moon: 7, Mars: 3, Mercury: 11,
  Jupiter: 9, Venus: 5, Saturn: 0, Rahu: 7, Ketu: 1,
};

export const PLANET_OWN_SIGNS: Partial<Record<Planet, RashiIndex[]>> = {
  Sun: [4],
  Moon: [3],
  Mars: [0, 7],
  Mercury: [2, 5],
  Jupiter: [8, 11],
  Venus: [1, 6],
  Saturn: [9, 10],
};

export const RASHI_LORDS: string[] = [
  'Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury',
  'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter',
];

export const COMBUST_LIMITS: Partial<Record<Planet, number>> = {
  Moon: 12, Mars: 17, Mercury: 14, Jupiter: 11, Venus: 10, Saturn: 15,
};

export const COMBUST_LIMITS_RETRO: Partial<Record<Planet, number>> = {
  Mercury: 12, Venus: 8,
};

export const TITHI_NAMES = [
  'Shukla Prathama', 'Shukla Dwitiya', 'Shukla Tritiya', 'Shukla Chaturthi',
  'Shukla Panchami', 'Shukla Shashthi', 'Shukla Saptami', 'Shukla Ashtami',
  'Shukla Navami', 'Shukla Dashami', 'Shukla Ekadashi', 'Shukla Dwadashi',
  'Shukla Trayodashi', 'Shukla Chaturdashi', 'Purnima',
  'Krishna Prathama', 'Krishna Dwitiya', 'Krishna Tritiya', 'Krishna Chaturthi',
  'Krishna Panchami', 'Krishna Shashthi', 'Krishna Saptami', 'Krishna Ashtami',
  'Krishna Navami', 'Krishna Dashami', 'Krishna Ekadashi', 'Krishna Dwadashi',
  'Krishna Trayodashi', 'Krishna Chaturdashi', 'Amavasya',
] as const;

export const YOGA_NAMES = [
  'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda',
  'Sukarman', 'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva',
  'Vyaghata', 'Harshana', 'Vajra', 'Siddhi', 'Vyatipata', 'Variyana',
  'Parigha', 'Shiva', 'Siddha', 'Sadhya', 'Shubha', 'Shukla',
  'Brahma', 'Indra', 'Vaidhriti',
] as const;

export const REPEATING_KARANA_NAMES = [
  'Bava', 'Balava', 'Kaulava', 'Taitila', 'Gara', 'Vanija', 'Vishti',
] as const;

export const FIXED_KARANA_NAMES = ['Kimstughna', 'Shakuni', 'Chatushpada', 'Naga'] as const;

export const DAY_NAMES = [
  'Ravivara', 'Somavara', 'Mangalavara', 'Budhavara',
  'Guruvara', 'Shukravara', 'Shanivara',
] as const;

export const MASA_NAMES = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana',
  'Bhadrapada', 'Ashwina', 'Kartika', 'Margashirsha', 'Pausha',
  'Magha', 'Phalguna',
] as const;

export const RITU_NAMES = ['Vasant', 'Grishma', 'Varsha', 'Sharad', 'Hemant', 'Shishir'] as const;

export const AYANA_NAMES = ['Uttarayana', 'Dakshinayana'] as const;

export const SAMVATSARA_NAMES = [
  'Prabhava', 'Vibhava', 'Shukla', 'Pramodoota', 'Prajothpatti',
  'Angirasa', 'Srimukha', 'Bhava', 'Yuva', 'Dhaatri',
  'Eeshvara', 'Bahudhanya', 'Pramaadhi', 'Vikrama', 'Vrisha',
  'Chitrabhanu', 'Svabhanu', 'Taarana', 'Paarthiva', 'Vyaya',
  'Sarvajit', 'Sarvadhari', 'Virodhi', 'Vikrita', 'Khara',
  'Nandana', 'Vijaya', 'Jaya', 'Manmatha', 'Durmukhi',
  'Hevilambi', 'Vilambi', 'Vikari', 'Sharvari', 'Plava',
  'Shubhakrit', 'Shobhakrit', 'Krodhi', 'Vishvavasu', 'Parabhava',
  'Plavanga', 'Keelaka', 'Saumya', 'Sadharana', 'Virodhikrit',
  'Paridhavi', 'Pramaadeecha', 'Aananda', 'Rakshasa', 'Nala',
  'Pingala', 'Kalayukti', 'Siddharthi', 'Raudri', 'Durmathi',
  'Dundubhi', 'Rudhirodgari', 'Raktakshi', 'Krodhana', 'Akshaya',
] as const;

export const HORA_RULERS = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'] as const;

export const RAHU_KALAM_PORTIONS = [8, 2, 7, 5, 6, 4, 3] as const;
export const YAMAGANDA_PORTIONS = [5, 4, 3, 2, 1, 7, 6] as const;
export const GULIKA_PORTIONS = [7, 6, 5, 4, 3, 2, 1] as const;

export const VARJYAM_START_GHATIS: number[] = [
  50, 4, 30, 20, 32, 22, 16, 26, 12,
  6, 16, 38, 44, 8, 14, 8, 20, 40,
  40, 48, 54, 8, 14, 4, 30, 24, 30,
];

export const AMRIT_KALAM_START_GHATIS: number[] = [
  2, 28, 54, 32, 8, 46, 40, 50, 36,
  30, 40, 14, 20, 32, 38, 32, 44, 16,
  16, 24, 30, 32, 38, 28, 6, 48, 54,
];

export const KENDRA_HOUSES = [1, 4, 7, 10] as const;
export const TRIKONA_HOUSES = [1, 5, 9] as const;
export const UPACHAYA_HOUSES = [3, 6, 10, 11] as const;
export const DUSTHANA_HOUSES = [6, 8, 12] as const;
export const TRISHADAYA_HOUSES = [3, 6, 11] as const;
export const MARAKA_HOUSES = [2, 7] as const;

export const GRAHA_DRISHTI: Partial<Record<Planet, number[]>> = {
  Mars: [3, 6, 7],
  Jupiter: [4, 6, 8],
  Saturn: [2, 6, 9],
  Rahu: [4, 6, 8],
  Ketu: [4, 6, 8],
};

export const PANCHA_MAHAPURUSHA: Record<string, { planet: GrahaPlanet; signs: RashiIndex[] }> = {
  Ruchaka: { planet: 'Mars', signs: [0, 7, 9] },
  Bhadra: { planet: 'Mercury', signs: [2, 5] },
  Hamsa: { planet: 'Jupiter', signs: [3, 8, 11] },
  Malavya: { planet: 'Venus', signs: [1, 6, 11] },
  Sasa: { planet: 'Saturn', signs: [6, 9, 10] },
};

export const KAAL_SARP_TYPES: Record<number, string> = {
  1: 'Anant', 2: 'Kulik', 3: 'Vasuki', 4: 'Shankhpal',
  5: 'Padma', 6: 'Mahapadma', 7: 'Takshak', 8: 'Karkotak',
  9: 'Shankhachood', 10: 'Ghatak', 11: 'Vishdhar', 12: 'Sheshnag',
};

export const RASHI_VARNA = [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0] as const;
export const VARNA_NAMES = ['Brahmin', 'Kshatriya', 'Vaishya', 'Shudra'] as const;

export const RASHI_VASHYA = [1, 0, 1, 2, 3, 1, 1, 4, 0, 2, 1, 2] as const;
export const VASHYA_TYPES = ['Chatushpad', 'Manav', 'Jalchar', 'Vanchar', 'Keet'] as const;

export const NAKSHATRA_YONI: number[] = [
  0, 1, 2, 3, 3, 4, 5, 6, 5, 7, 7, 8,
  8, 9, 8, 9, 10, 10, 4, 11, 11, 12, 0, 0,
  0, 8, 1,
];

export const YONI_NAMES = [
  'Ashwa', 'Gaja', 'Mesha', 'Sarpa', 'Shwana', 'Marjara',
  'Mushaka', 'Gau', 'Mahisha', 'Vyaghra', 'Mriga', 'Vanara',
  'Nakula',
] as const;

export const YONI_ENEMIES: [number, number][] = [
  [0, 8], [1, 0], [2, 12], [3, 11],
  [4, 10], [5, 7], [6, 5],
];

export const NAKSHATRA_GANA = [
  0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1,
  0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2,
  1, 1, 0,
] as const;
export const GANA_NAMES = ['Deva', 'Manushya', 'Rakshasa'] as const;

export const GANA_MATRIX = [
  [6, 6, 0],
  [5, 6, 0],
  [0, 0, 6],
] as const;

export const NAKSHATRA_NADI = [
  0, 0, 0, 1, 1, 1, 2, 2, 2,
  0, 0, 0, 1, 1, 1, 2, 2, 2,
  0, 0, 0, 1, 1, 1, 2, 2, 2,
] as const;
export const NADI_NAMES = ['Aadi', 'Madhya', 'Antya'] as const;

export const PLANET_FRIENDSHIPS: Record<string, { friends: string[]; enemies: string[] }> = {
  Sun: { friends: ['Moon', 'Mars', 'Jupiter'], enemies: ['Venus', 'Saturn'] },
  Moon: { friends: ['Sun', 'Mercury'], enemies: [] },
  Mars: { friends: ['Sun', 'Moon', 'Jupiter'], enemies: ['Mercury'] },
  Mercury: { friends: ['Sun', 'Venus'], enemies: ['Moon'] },
  Jupiter: { friends: ['Sun', 'Moon', 'Mars'], enemies: ['Mercury', 'Venus'] },
  Venus: { friends: ['Mercury', 'Saturn'], enemies: ['Sun', 'Moon'] },
  Saturn: { friends: ['Mercury', 'Venus'], enemies: ['Sun', 'Moon', 'Mars'] },
};

export const PANCHAK_NAKSHATRAS = [22, 23, 24, 25, 26] as const;
export const PANCHAK_TYPES: Record<number, string> = {
  22: 'Mrityu', 23: 'Agni', 24: 'Raja', 25: 'Chora', 26: 'Roga',
};

export const AMRIT_SIDDHI_YOGA: Record<number, number> = {
  0: 12, 1: 4, 2: 0, 3: 16, 4: 7, 5: 26, 6: 3,
};

export const MOOLATRIKONA: Partial<Record<Planet, { rashi: RashiIndex; startDeg: number; endDeg: number }>> = {
  Sun: { rashi: 4, startDeg: 0, endDeg: 20 },
  Moon: { rashi: 1, startDeg: 3, endDeg: 30 },
  Mars: { rashi: 0, startDeg: 0, endDeg: 12 },
  Mercury: { rashi: 5, startDeg: 15, endDeg: 20 },
  Jupiter: { rashi: 8, startDeg: 0, endDeg: 10 },
  Venus: { rashi: 6, startDeg: 0, endDeg: 15 },
  Saturn: { rashi: 10, startDeg: 0, endDeg: 20 },
};

export const INDU_KALAS: Record<string, number> = {
  Sun: 30, Moon: 16, Mars: 6, Mercury: 8, Jupiter: 10, Venus: 12, Saturn: 1,
};

export const VEDHA_NAKSHATRA_PAIRS: [number, number][] = [
  [0, 17], [1, 16], [2, 15], [3, 14], [5, 21], [6, 20],
  [7, 19], [8, 18], [9, 26], [10, 25], [11, 24], [12, 23], [13, 22],
];

export const GANDANTA_JUNCTIONS: { fromRashi: number; toRashi: number; nakshatraEnd: number; nakshatraStart: number }[] = [
  { fromRashi: 3, toRashi: 4, nakshatraEnd: 8, nakshatraStart: 9 },
  { fromRashi: 7, toRashi: 8, nakshatraEnd: 17, nakshatraStart: 18 },
  { fromRashi: 11, toRashi: 0, nakshatraEnd: 26, nakshatraStart: 0 },
];

export const NAISARGIKA_BALA: Record<string, number> = {
  Sun: 60.00, Moon: 51.43, Venus: 42.86, Jupiter: 34.29,
  Mercury: 25.71, Mars: 17.14, Saturn: 8.57,
};

export const SHADBALA_REQUIRED: Record<string, number> = {
  Sun: 390, Moon: 360, Mars: 300, Mercury: 420,
  Jupiter: 390, Venus: 330, Saturn: 300,
};

export const MS_PER_DAY = 86400000;
export const MS_PER_HOUR = 3600000;
export const JD_UNIX_EPOCH = 2440587.5;
export const JD_J2000 = 2451545.0;
export const DAYS_PER_CENTURY = 36525.0;
export const NAKSHATRA_SPAN = 13 + 1 / 3;
export const PADA_SPAN = NAKSHATRA_SPAN / 4;
export const TITHI_SPAN = 12;
export const YOGA_SPAN = NAKSHATRA_SPAN;
export const KARANA_SPAN = 6;
export const MS_PER_YEAR = 365.2425 * MS_PER_DAY;
