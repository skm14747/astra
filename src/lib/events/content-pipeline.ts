/**
 * Event-driven content pipeline configuration.
 *
 * Defines blog post templates, publishing schedule, and content generation
 * rules for astronomical events. Each event type has a template that
 * specifies the content structure and recommended publish timing.
 */

import type { AstroEvent } from './astronomical-events';

export interface ContentTemplate {
  type: AstroEvent['type'];
  publishLeadDays: number;
  sections: string[];
  targetWordCount: number;
  internalLinks: string[];
  socialHooks: string[];
}

export const CONTENT_TEMPLATES: Record<AstroEvent['type'], ContentTemplate> = {
  'mercury-retrograde': {
    type: 'mercury-retrograde',
    publishLeadDays: 14,
    sections: [
      'What is Mercury Retrograde?',
      'Dates & Degree Range',
      'Which Signs Are Most Affected',
      'Effects on Communication & Technology',
      'Effects on Travel & Contracts',
      'Effects on Relationships',
      'Survival Tips & Do\'s / Don\'ts',
      'Vedic Remedies for Mercury (Budh)',
      'Sign-by-Sign Impact',
      'FAQ',
    ],
    targetWordCount: 2500,
    internalLinks: [
      '/vedic/transits',
      '/vedic/dashas',
      '/vedic/remedies',
      '/horoscope/today',
    ],
    socialHooks: [
      '🔄 Mercury goes retrograde on {startDate} — here\'s how to survive it',
      'Mercury Retrograde in {sign}: Don\'t sign contracts, DO review old plans',
      '{sign} & {oppositeSign} — you\'re feeling this retrograde the most 🌀',
    ],
  },
  'solar-eclipse': {
    type: 'solar-eclipse',
    publishLeadDays: 10,
    sections: [
      'Eclipse Overview & Visibility',
      'Nakshatra & Degree',
      'Vedic Significance of Surya Grahan',
      'Which Signs Are Most Affected',
      'New Beginnings & Reset Themes',
      'Eclipse Do\'s & Don\'ts (Vedic)',
      'Grahan Sutak Timing',
      'Mantras & Remedies',
      'Sign-by-Sign Impact',
      'FAQ',
    ],
    targetWordCount: 2000,
    internalLinks: [
      '/vedic/transits',
      '/vedic/panchang',
      '/vedic/remedies',
      '/vedic/nakshatra',
    ],
    socialHooks: [
      '🌑 Solar Eclipse on {startDate} — Vedic do\'s and don\'ts you need to know',
      'Surya Grahan in {sign}: What NOT to eat, drink, or start during the eclipse',
    ],
  },
  'lunar-eclipse': {
    type: 'lunar-eclipse',
    publishLeadDays: 10,
    sections: [
      'Eclipse Overview & Visibility',
      'Nakshatra & Degree',
      'Vedic Significance of Chandra Grahan',
      'Emotional & Psychological Impact',
      'Which Signs Are Most Affected',
      'Eclipse Do\'s & Don\'ts (Vedic)',
      'Grahan Sutak Timing',
      'Moon Sign-by-Sign Impact',
      'FAQ',
    ],
    targetWordCount: 2000,
    internalLinks: [
      '/vedic/transits',
      '/vedic/panchang',
      '/vedic/remedies',
      '/vedic/nakshatra',
    ],
    socialHooks: [
      '🌕 Lunar Eclipse on {startDate} — emotional storms ahead for these Moon signs',
      'Chandra Grahan: Your Moon sign determines how deeply this eclipse hits you',
    ],
  },
  festival: {
    type: 'festival',
    publishLeadDays: 14,
    sections: [
      'Festival Significance & Story',
      'Dates & Muhurat Timings',
      'Puja Vidhi (Step-by-Step)',
      'Mantras to Chant',
      'Auspicious Hours for Specific Activities',
      'Regional Variations',
      'Astrological Significance',
      'FAQ',
    ],
    targetWordCount: 1800,
    internalLinks: [
      '/vedic/panchang',
      '/vedic/muhurta',
      '/vedic/choghadiya',
    ],
    socialHooks: [
      '🪔 {title} — exact muhurat timings and puja vidhi',
      'Don\'t miss the Lakshmi Puja window! Exact hour-by-hour muhurat inside',
    ],
  },
  transit: {
    type: 'transit',
    publishLeadDays: 7,
    sections: [
      'Transit Overview',
      'Dates & Duration',
      'Which Signs Are Affected',
      'Career & Finance Impact',
      'Relationships & Family Impact',
      'Health & Wellness',
      'Remedies for Challenging Transits',
      'Sign-by-Sign Forecast',
      'FAQ',
    ],
    targetWordCount: 2200,
    internalLinks: [
      '/vedic/transits',
      '/vedic/dashas',
      '/vedic/remedies',
      '/horoscope/today',
    ],
    socialHooks: [
      '🪐 {title} — which Rashi benefits, which needs caution',
    ],
  },
};

export interface ContentCalendarEntry {
  event: AstroEvent;
  template: ContentTemplate;
  suggestedPublishDate: string;
  status: 'planned' | 'drafted' | 'published';
}

export function generateContentCalendar(events: AstroEvent[]): ContentCalendarEntry[] {
  return events.map(event => {
    const template = CONTENT_TEMPLATES[event.type];
    const publishDate = new Date(event.startDate);
    publishDate.setDate(publishDate.getDate() - template.publishLeadDays);

    return {
      event,
      template,
      suggestedPublishDate: publishDate.toISOString().slice(0, 10),
      status: 'planned' as const,
    };
  });
}

export function getNextContentToWrite(calendar: ContentCalendarEntry[], today: string): ContentCalendarEntry | undefined {
  return calendar
    .filter(entry => entry.status === 'planned' && entry.suggestedPublishDate <= today)
    .sort((a, b) => a.event.priority === 'high' && b.event.priority !== 'high' ? -1 : 1)[0];
}
