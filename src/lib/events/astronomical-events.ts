/**
 * Astronomical event data for event-driven content pipeline.
 * Events are pre-computed for 2025-2028 to enable static generation.
 * Includes Mercury retrograde periods, eclipses, and major Indian festival muhurats.
 */

export interface AstroEvent {
  id: string;
  type: 'mercury-retrograde' | 'solar-eclipse' | 'lunar-eclipse' | 'festival' | 'transit';
  title: string;
  startDate: string;
  endDate?: string;
  description: string;
  signs?: string[];
  blogSlug?: string;
  keywords: string[];
  priority: 'high' | 'medium' | 'low';
}

export const MERCURY_RETROGRADES: AstroEvent[] = [
  {
    id: 'mercury-rx-2025-mar',
    type: 'mercury-retrograde',
    title: 'Mercury Retrograde in Pisces — March 2025',
    startDate: '2025-03-14',
    endDate: '2025-04-07',
    description: 'Mercury stations retrograde at 9°35\' Pisces. Communication, travel, and technology disruptions peak. Excellent for spiritual introspection and creative review.',
    signs: ['Pisces', 'Virgo'],
    blogSlug: 'mercury-retrograde-march-2025',
    keywords: ['mercury retrograde march 2025', 'mercury retrograde pisces', 'budh vakri 2025'],
    priority: 'high',
  },
  {
    id: 'mercury-rx-2025-jul',
    type: 'mercury-retrograde',
    title: 'Mercury Retrograde in Leo — July 2025',
    startDate: '2025-07-18',
    endDate: '2025-08-11',
    description: 'Mercury retrogrades through Leo. Creative projects, self-expression, and leadership communications need extra care. Review past creative work.',
    signs: ['Leo', 'Aquarius'],
    blogSlug: 'mercury-retrograde-july-2025',
    keywords: ['mercury retrograde july 2025', 'mercury retrograde leo'],
    priority: 'high',
  },
  {
    id: 'mercury-rx-2025-nov',
    type: 'mercury-retrograde',
    title: 'Mercury Retrograde in Sagittarius — November 2025',
    startDate: '2025-11-09',
    endDate: '2025-11-29',
    description: 'Mercury retrogrades in Sagittarius. International travel, higher education, legal matters, and philosophical beliefs are up for review.',
    signs: ['Sagittarius', 'Gemini'],
    blogSlug: 'mercury-retrograde-november-2025',
    keywords: ['mercury retrograde november 2025', 'mercury retrograde sagittarius'],
    priority: 'high',
  },
  {
    id: 'mercury-rx-2026-mar',
    type: 'mercury-retrograde',
    title: 'Mercury Retrograde in Aries — March 2026',
    startDate: '2026-03-02',
    endDate: '2026-03-25',
    description: 'Mercury retrogrades in Aries. Impulsive decisions, rushed communication, and identity-related confusion. Slow down and think before speaking.',
    signs: ['Aries', 'Libra'],
    blogSlug: 'mercury-retrograde-march-2026',
    keywords: ['mercury retrograde march 2026', 'mercury retrograde aries 2026'],
    priority: 'high',
  },
  {
    id: 'mercury-rx-2026-jul',
    type: 'mercury-retrograde',
    title: 'Mercury Retrograde in Virgo — July 2026',
    startDate: '2026-07-04',
    endDate: '2026-07-28',
    description: 'Mercury retrogrades in its own sign Virgo. Health routines, work procedures, and analytical projects need careful review.',
    signs: ['Virgo', 'Pisces'],
    blogSlug: 'mercury-retrograde-july-2026',
    keywords: ['mercury retrograde july 2026', 'mercury retrograde virgo 2026'],
    priority: 'high',
  },
  {
    id: 'mercury-rx-2026-oct',
    type: 'mercury-retrograde',
    title: 'Mercury Retrograde in Scorpio — October 2026',
    startDate: '2026-10-25',
    endDate: '2026-11-15',
    description: 'Mercury retrogrades in Scorpio. Secrets resurface, debts and shared finances need review, and psychological insights deepen.',
    signs: ['Scorpio', 'Taurus'],
    blogSlug: 'mercury-retrograde-october-2026',
    keywords: ['mercury retrograde october 2026', 'mercury retrograde scorpio 2026'],
    priority: 'high',
  },
];

export const ECLIPSES: AstroEvent[] = [
  {
    id: 'solar-eclipse-2025-mar',
    type: 'solar-eclipse',
    title: 'Partial Solar Eclipse — March 29, 2025',
    startDate: '2025-03-29',
    description: 'Partial solar eclipse at 8°41\' Pisces (Revati nakshatra). New beginnings in spirituality, foreign connections, and closure of old chapters. Visible from Europe, North Africa, and Russia.',
    signs: ['Pisces'],
    blogSlug: 'solar-eclipse-march-2025',
    keywords: ['solar eclipse march 2025', 'surya grahan 2025', 'eclipse pisces'],
    priority: 'high',
  },
  {
    id: 'lunar-eclipse-2025-sep',
    type: 'lunar-eclipse',
    title: 'Total Lunar Eclipse — September 7, 2025',
    startDate: '2025-09-07',
    description: 'Total lunar eclipse at 15° Pisces (Uttara Bhadrapada nakshatra). Emotional culmination in spiritual matters, foreign connections, and subconscious patterns.',
    signs: ['Pisces', 'Virgo'],
    blogSlug: 'lunar-eclipse-september-2025',
    keywords: ['lunar eclipse september 2025', 'chandra grahan 2025', 'blood moon 2025'],
    priority: 'high',
  },
  {
    id: 'solar-eclipse-2025-sep',
    type: 'solar-eclipse',
    title: 'Partial Solar Eclipse — September 21, 2025',
    startDate: '2025-09-21',
    description: 'Partial solar eclipse at 28° Virgo (Chitra nakshatra). New career initiatives, health protocols, and analytical projects gain momentum.',
    signs: ['Virgo'],
    blogSlug: 'solar-eclipse-september-2025',
    keywords: ['solar eclipse september 2025', 'surya grahan september 2025'],
    priority: 'high',
  },
  {
    id: 'lunar-eclipse-2026-mar',
    type: 'lunar-eclipse',
    title: 'Total Lunar Eclipse — March 3, 2026',
    startDate: '2026-03-03',
    description: 'Total lunar eclipse at 12° Virgo (Hasta nakshatra). Culmination of health, work, and service matters. Emotional release around daily routines.',
    signs: ['Virgo', 'Pisces'],
    blogSlug: 'lunar-eclipse-march-2026',
    keywords: ['lunar eclipse march 2026', 'chandra grahan 2026'],
    priority: 'high',
  },
  {
    id: 'solar-eclipse-2026-aug',
    type: 'solar-eclipse',
    title: 'Annular Solar Eclipse — August 12, 2026',
    startDate: '2026-08-12',
    description: 'Annular solar eclipse at 19° Cancer (Ashlesha nakshatra). Powerful reset for home, family, emotional foundations, and maternal relationships.',
    signs: ['Cancer'],
    blogSlug: 'solar-eclipse-august-2026',
    keywords: ['solar eclipse august 2026', 'annular eclipse 2026'],
    priority: 'high',
  },
];

export const FESTIVALS: AstroEvent[] = [
  {
    id: 'navratri-2025-oct',
    type: 'festival',
    title: 'Sharad Navratri 2025 — 9 Nights of Divine Feminine',
    startDate: '2025-10-02',
    endDate: '2025-10-10',
    description: 'Sharad Navratri celebrates the nine forms of Goddess Durga. Each night has specific puja vidhi, mantra, and colour. Fasting, meditation, and devotion bring powerful blessings.',
    keywords: ['navratri 2025', 'navratri dates', 'navratri muhurat', 'शारदीय नवरात्रि 2025'],
    priority: 'high',
  },
  {
    id: 'diwali-2025',
    type: 'festival',
    title: 'Diwali 2025 — Lakshmi Puja Muhurat & Timing',
    startDate: '2025-10-20',
    description: 'Diwali Lakshmi Puja muhurat, Dhanteras timing, and Govardhan Puja dates for 2025. Auspicious hours for puja, new purchases, and business openings.',
    keywords: ['diwali 2025', 'lakshmi puja muhurat 2025', 'diwali date', 'दीपावली 2025'],
    priority: 'high',
  },
  {
    id: 'chhath-2025',
    type: 'festival',
    title: 'Chhath Puja 2025 — Surya Worship Muhurat',
    startDate: '2025-10-28',
    endDate: '2025-10-31',
    description: 'Chhath Puja dedicated to Sun God (Surya Dev). Nahay Khay, Lohanda, Sandhya Arghya, and Usha Arghya muhurats for 2025.',
    keywords: ['chhath puja 2025', 'chhath muhurat', 'छठ पूजा 2025'],
    priority: 'high',
  },
  {
    id: 'makar-sankranti-2026',
    type: 'festival',
    title: 'Makar Sankranti 2026 — Sun Transit into Capricorn',
    startDate: '2026-01-14',
    description: 'Makar Sankranti marks the Sun\'s transit into Capricorn (Makar Rashi). Auspicious for charity, sesame donations, and new ventures. Punya Kaal muhurat for daan.',
    keywords: ['makar sankranti 2026', 'sankranti muhurat', 'मकर संक्रांति 2026'],
    priority: 'high',
  },
  {
    id: 'chaitra-navratri-2026',
    type: 'festival',
    title: 'Chaitra Navratri 2026 — Hindu New Year Celebrations',
    startDate: '2026-03-19',
    endDate: '2026-03-27',
    description: 'Chaitra Navratri marks the beginning of the Hindu New Year. Nine nights of worship, Ghatasthapana muhurat, and Rama Navami celebration.',
    keywords: ['chaitra navratri 2026', 'hindu new year 2026', 'चैत्र नवरात्रि 2026'],
    priority: 'high',
  },
  {
    id: 'diwali-2026',
    type: 'festival',
    title: 'Diwali 2026 — Lakshmi Puja Muhurat & Timing',
    startDate: '2026-11-08',
    description: 'Diwali 2026 Lakshmi Puja muhurat, Dhanteras timing, and festival calendar. Best hours for puja, purchases, and business inaugurations.',
    keywords: ['diwali 2026', 'lakshmi puja muhurat 2026', 'दीपावली 2026'],
    priority: 'high',
  },
];

export const MAJOR_TRANSITS: AstroEvent[] = [
  {
    id: 'jupiter-gemini-2025',
    type: 'transit',
    title: 'Jupiter in Gemini — June 2025 to June 2026',
    startDate: '2025-06-14',
    endDate: '2026-06-22',
    description: 'Jupiter transits Gemini, expanding communication, learning, sibling relationships, and short travels. Gemini, Libra, and Aquarius benefit most.',
    signs: ['Gemini', 'Libra', 'Aquarius'],
    keywords: ['jupiter in gemini 2025', 'guru mithun rashi', 'jupiter transit 2025'],
    priority: 'medium',
  },
  {
    id: 'saturn-pisces-2025',
    type: 'transit',
    title: 'Saturn in Pisces — Ongoing through 2025',
    startDate: '2025-01-01',
    endDate: '2025-03-29',
    description: 'Saturn continues its transit through Pisces, testing spiritual boundaries, dissolving rigid structures, and demanding realistic spirituality.',
    signs: ['Pisces', 'Virgo', 'Gemini', 'Sagittarius'],
    keywords: ['saturn in pisces 2025', 'shani meen rashi', 'saturn transit 2025'],
    priority: 'medium',
  },
  {
    id: 'rahu-ketu-shift-2025',
    type: 'transit',
    title: 'Rahu-Ketu Axis Shift — Pisces/Virgo to Aquarius/Leo',
    startDate: '2025-05-30',
    description: 'The nodal axis shifts from Pisces-Virgo to Aquarius-Leo, activating new karmic themes around innovation vs. ego, technology vs. tradition for 18 months.',
    signs: ['Aquarius', 'Leo'],
    keywords: ['rahu ketu transit 2025', 'rahu aquarius ketu leo', 'nodal shift 2025'],
    priority: 'high',
  },
];

export const ALL_EVENTS: AstroEvent[] = [
  ...MERCURY_RETROGRADES,
  ...ECLIPSES,
  ...FESTIVALS,
  ...MAJOR_TRANSITS,
].sort((a, b) => a.startDate.localeCompare(b.startDate));

export function getUpcomingEvents(fromDate: string, count = 5): AstroEvent[] {
  return ALL_EVENTS.filter(e => e.startDate >= fromDate || (e.endDate && e.endDate >= fromDate)).slice(0, count);
}

export function getEventsByType(type: AstroEvent['type']): AstroEvent[] {
  return ALL_EVENTS.filter(e => e.type === type);
}
