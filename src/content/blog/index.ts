export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  keywords: string[];
  readingTime: string;
  category: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'what-is-kundli-vedic-birth-chart-guide',
    title: 'What is a Kundli? Complete Guide to Your Vedic Birth Chart',
    description: 'Learn what a Kundli (Janam Kundli) is, how it is calculated, what the 12 houses and 9 planets mean, and how to read your Vedic birth chart for life predictions.',
    date: '2026-11-10',
    author: 'Astra Destiny',
    keywords: ['kundli', 'janam kundli', 'vedic birth chart', 'how to read kundli', 'kundli houses'],
    readingTime: '8 min',
    category: 'Vedic Basics',
  },
  {
    slug: 'mangal-dosha-complete-guide',
    title: 'Mangal Dosha (Manglik): Effects, Cancellation & Remedies',
    description: 'Everything about Mangal Dosha — how it forms, which houses create Manglik status, the 8 cancellation conditions, and proven Vedic remedies for marriage compatibility.',
    date: '2026-11-08',
    author: 'Astra Destiny',
    keywords: ['mangal dosha', 'manglik dosha', 'mangal dosha remedies', 'manglik marriage', 'kuja dosha'],
    readingTime: '10 min',
    category: 'Doshas',
  },
  {
    slug: 'vimshottari-dasha-guide',
    title: 'Vimshottari Dasha System Explained: Mahadasha, Antardasha & Timing',
    description: 'Master the Vimshottari Dasha system — learn how Mahadasha and Antardasha periods are calculated, what each planet\'s Dasha means, and how to time life events.',
    date: '2026-11-06',
    author: 'Astra Destiny',
    keywords: ['vimshottari dasha', 'mahadasha', 'antardasha', 'dasha periods', 'vedic timing'],
    readingTime: '12 min',
    category: 'Dashas',
  },
  {
    slug: 'navamsa-d9-chart-marriage',
    title: 'Navamsa (D9) Chart: The Key to Marriage & Soul Purpose',
    description: 'Understand the Navamsa chart — how to calculate D9, what Vargottama planets mean, reading the D9 for marriage, spouse prediction, and dharmic purpose.',
    date: '2026-11-04',
    author: 'Astra Destiny',
    keywords: ['navamsa chart', 'D9 chart', 'vargottama', 'navamsa marriage', 'navamsa spouse'],
    readingTime: '9 min',
    category: 'Divisional Charts',
  },
  {
    slug: 'sade-sati-saturn-transit-survival-guide',
    title: 'Sade Sati: Saturn\'s 7.5-Year Transit — Phases, Effects & Survival Guide',
    description: 'Navigate Sade Sati with confidence — understand the 3 phases of Saturn\'s 7.5-year transit, its effects on each Moon sign, and practical remedies to thrive during this period.',
    date: '2026-11-02',
    author: 'Astra Destiny',
    keywords: ['sade sati', 'saturn transit', 'sade sati remedies', 'shani sade sati', 'sade sati effects'],
    readingTime: '11 min',
    category: 'Transits',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
