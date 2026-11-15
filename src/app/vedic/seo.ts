import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export type VedicPageSeo = {
  title: string;
  description: string;
  canonical: string;
  keywords?: string[];
  seoIntro: {
    heading: string;
    text: string;
  };
  faqs?: { question: string; answer: string }[];
  howTo?: {
    name: string;
    description: string;
    steps: { name: string; text: string }[];
  };
  relatedTools?: { href: string; label: string }[];
};

export const VEDIC_SEO: Record<string, VedicPageSeo> = {
  kundli: {
    title: 'Free Online Kundali (कुंडली) — Janam Kundli Calculator',
    description:
      'Generate your free online Kundali (Janam Kundli) with planetary positions, houses, nakshatras & dignities. NASA-precision Vedic birth chart calculator with Lahiri Ayanamsa.',
    canonical: '/vedic/kundli',
    keywords: ['free online kundali', 'janam kundli', 'kundli online', 'free kundali', 'vedic birth chart calculator', 'janam kundali', 'kundali by date of birth', 'birth chart astrology', 'lagna chart', 'free birth chart analysis'],
    seoIntro: {
      heading: 'What is a Kundli?',
      text: 'A Kundli (also called Janam Kundli or Vedic birth chart) is a map of the sky at the exact moment of your birth. It shows the positions of the Sun, Moon, and planets across the 12 zodiac signs and houses. In Vedic astrology (Jyotish), the Kundli is the foundation for all predictions — from personality traits to life events, career timing, and relationship compatibility. Our calculator uses NASA JPL DE-series ephemeris for sub-arc-second precision and the Lahiri Ayanamsa for sidereal corrections, matching the standards used by the Indian Astronomical Ephemeris.',
    },
    faqs: [
      { question: 'What is a Kundli (Janam Kundli)?', answer: 'A Kundli is a Vedic birth chart that maps the positions of the Sun, Moon, and planets across 12 zodiac signs and houses at the exact moment of your birth. It is the foundation of all Vedic astrology predictions.' },
      { question: 'How accurate is this Kundli calculator?', answer: 'Astra Destiny uses NASA JPL DE-series ephemeris for sub-arc-second planetary precision and the Lahiri Ayanamsa (Chitrapaksha) for sidereal corrections, matching the Indian Astronomical Ephemeris standard.' },
      { question: 'What information do I need to generate my Kundli?', answer: 'You need your date of birth, exact time of birth, and place of birth. The time of birth is critical for accurate Ascendant (Lagna) calculation.' },
      { question: 'What is the difference between Kundli and horoscope?', answer: 'A Kundli is the Vedic (sidereal) birth chart used in Jyotish, while a Western horoscope uses the tropical zodiac. They differ by approximately 24 degrees due to the precession of equinoxes (Ayanamsa).' },
      { question: 'Is this Kundli generator free?', answer: 'Yes, Astra Destiny is completely free. All calculations run in your browser — no data is sent to any server, and no account is required.' },
    ],
    howTo: {
      name: 'How to Generate Your Free Kundli',
      description: 'Generate your Vedic birth chart (Kundli) with planetary positions, houses, and dignities.',
      steps: [
        { name: 'Enter birth details', text: 'Click "Create Your Birth Chart" and enter your full name, date of birth, exact time of birth, and place of birth.' },
        { name: 'View your chart', text: 'Your Kundli appears instantly with all 9 planets placed in their sidereal positions across 12 houses in South Indian or North Indian chart format.' },
        { name: 'Explore planetary details', text: 'Review each planet\'s rashi, nakshatra, pada, house placement, dignity (exalted/debilitated), and combustion status in the detailed table.' },
        { name: 'Check related analyses', text: 'Navigate to Yogas, Dashas, Divisional Charts, and more for deeper analysis of your birth chart.' },
      ],
    },
    relatedTools: [
      { href: '/vedic/divisional', label: 'Divisional Charts (D1–D60)' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/shadbala', label: 'Shadbala (Strength)' },
      { href: '/vedic/compatibility', label: 'Kundli Milan' },
    ],
  },
  divisional: {
    title: 'Navamsa (D9) & Divisional Charts — D1 to D60 Varga Calculator',
    description:
      'Free Navamsa (D9) and divisional chart calculator — all 16 Varga charts (D1–D60) including Dasamsa D10, Dwadasamsa D12. Vargottama check, career & marriage analysis.',
    canonical: '/vedic/divisional',
    keywords: ['navamsa chart calculator', 'D9 chart calculator', 'divisional charts', 'varga charts', 'dasamsa D10', 'vargottama check', 'navamsa calculator free'],
    seoIntro: {
      heading: 'What are Divisional Charts (Varga)?',
      text: 'Divisional charts (Varga Kundli) are sub-divisions of the birth chart described by Maharishi Parashara in BPHS. Each division zooms into a specific area of life: the Navamsa (D9) reveals marriage and dharma, the Dasamsa (D10) shows career and public life, and the Dwadasamsa (D12) indicates ancestral karma. There are 16 primary divisions (Shodasha Varga) used for Vimsopaka Bala strength assessment. This calculator generates all charts with correct Parashari division rules.',
    },
    relatedTools: [
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/shadbala', label: 'Shadbala (Strength)' },
      { href: '/vedic/career', label: 'Career Analysis' },
      { href: '/vedic/compatibility', label: 'Kundli Milan' },
    ],
  },
  yogas: {
    title: 'Yoga & Dosha Calculator — Raja Yoga, Kaal Sarp Dosha',
    description:
      'Detect all major Yogas (Raja, Dhana, Pancha Mahapurusha, Gajakesari) and Doshas (Manglik, Kaal Sarp, Pitra) in your Vedic birth chart with BPHS-accurate rules.',
    canonical: '/vedic/yogas',
    keywords: ['yoga calculator', 'raja yoga', 'kaal sarp dosha', 'manglik dosha', 'gajakesari yoga'],
    seoIntro: {
      heading: 'What are Yogas and Doshas?',
      text: 'Yogas are specific planetary combinations that produce auspicious or inauspicious results in a birth chart. Raja Yoga (royal combination) can indicate fame and authority, while Dhana Yoga signals wealth accumulation. Doshas are afflictions — Manglik Dosha (Mars in certain houses) affects marriage compatibility, Kaal Sarp Dosha (all planets hemmed between Rahu-Ketu) creates recurring life obstacles, and Pitra Dosha indicates ancestral karma. Our engine checks 60+ Yoga patterns and all major Doshas following BPHS and Uttara Kalamrita rules.',
    },
    faqs: [
      { question: 'What is Raja Yoga in Vedic astrology?', answer: 'Raja Yoga forms when lords of Kendra houses (1, 4, 7, 10) and Trikona houses (1, 5, 9) conjoin, aspect each other, or exchange signs. It indicates authority, fame, and success. The Dharma-Karmadhipati Yoga (9th and 10th lord conjunction) is considered the supreme Raja Yoga.' },
      { question: 'How do I know if I have Kaal Sarp Dosha?', answer: 'Kaal Sarp Dosha exists when all seven planets (Sun through Saturn) are hemmed between Rahu and Ketu in the birth chart. There are 12 types based on which house Rahu occupies. It can cause recurring obstacles and delays in life.' },
      { question: 'What is Manglik Dosha and does it affect marriage?', answer: 'Manglik Dosha occurs when Mars is placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house of the birth chart. It is believed to cause delays or conflicts in marriage. Several cancellation conditions exist, such as Mars in its own sign or Jupiter aspecting Mars.' },
      { question: 'How many Yogas does Astra detect?', answer: 'Astra Destiny detects 20+ auspicious Yogas (Raja Yoga, Gajakesari, Pancha Mahapurusha, Dhana Yoga, Lakshmi Yoga, and more) and 12+ Doshas (Kaal Sarp, Manglik, Pitra, Kemadruma, and others) following BPHS and Uttara Kalamrita rules.' },
    ],
    relatedTools: [
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/remedies', label: 'Vedic Remedies' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/compatibility', label: 'Kundli Milan' },
      { href: '/vedic/shadbala', label: 'Shadbala (Strength)' },
    ],
  },
  remedies: {
    title: 'Vedic Astrology Remedies — Gemstones, Mantras & Rudraksha',
    description:
      'Personalized Vedic remedies for your chart — gemstones, mantras, Rudraksha, charity, fasting, and Stotra for each planet affliction.',
    canonical: '/vedic/remedies',
    keywords: ['vedic remedies', 'astrology gemstones', 'mantra for planets', 'rudraksha recommendation'],
    seoIntro: {
      heading: 'Vedic Astrological Remedies',
      text: 'Vedic astrology prescribes specific remedies (Upaya) to strengthen weak planets and mitigate afflictions. These include wearing gemstones on the correct finger and metal, chanting Beej Mantras and Stotras a prescribed number of times, wearing the appropriate Mukhi Rudraksha, performing charity on specific days, and observing fasts. Our system analyzes your chart for debilitated, combust, or afflicted planets and generates a complete remedial prescription following traditional Jyotish guidelines.',
    },
    relatedTools: [
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/health', label: 'Health & Longevity' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
    ],
  },
  dashas: {
    title: 'Mahadasha Calculator — Vimshottari Dasha & Antardasha Dates Free',
    description:
      'Free Mahadasha calculator with Vimshottari Dasha timeline — Mahadasha, Antardasha & Pratyantardasha dates. Also includes Yogini, Ashtottari & Sthira Dasha systems.',
    canonical: '/vedic/dashas',
    keywords: ['mahadasha calculator', 'vimshottari dasha calculator', 'dasha calculator free', 'antardasha calculator', 'mahadasha dates by date of birth', 'yogini dasha', 'ashtottari dasha', 'current mahadasha'],
    seoIntro: {
      heading: 'What is Vimshottari Dasha?',
      text: 'The Vimshottari Dasha system is the most widely used timing technique in Vedic astrology. It divides life into 120 years governed by 9 planetary periods (Mahadasha), each further divided into sub-periods (Antardasha) and sub-sub-periods (Pratyantardasha). The starting planet is determined by your birth Nakshatra. Each Dasha activates the houses and signs ruled by that planet, triggering specific life events. This tool calculates all three levels of Dasha with exact dates, plus Yogini Dasha (36-year cycle) and Ashtottari Dasha (108-year cycle) alternatives.',
    },
    faqs: [
      { question: 'How is Vimshottari Dasha calculated?', answer: 'Vimshottari Dasha is calculated from the Moon\'s Nakshatra at birth. The balance of the first Mahadasha is determined by how far the Moon has traversed the birth Nakshatra. Each of the 9 planets rules a Mahadasha of fixed duration totaling 120 years: Sun (6), Moon (10), Mars (7), Rahu (18), Jupiter (16), Saturn (19), Mercury (17), Ketu (7), Venus (20).' },
      { question: 'What is the difference between Mahadasha and Antardasha?', answer: 'Mahadasha is the major planetary period lasting several years. Antardasha (Bhukti) is a sub-period within each Mahadasha. Pratyantardasha is a further sub-division. Events during a Dasha period are colored by both the Mahadasha lord and Antardasha lord together.' },
      { question: 'Which Dasha system is most accurate?', answer: 'Vimshottari Dasha is the most widely used and trusted system, recommended by Maharishi Parashara in BPHS. Yogini Dasha (36-year cycle) is preferred for shorter-term predictions, while Ashtottari Dasha (108-year cycle) is used when Rahu is in a Kendra or Trikona from the Lagna lord.' },
    ],
    relatedTools: [
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
      { href: '/vedic/predictions', label: 'Annual Predictions' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/nakshatra', label: 'Nakshatra Analysis' },
    ],
  },
  transits: {
    title: 'Sade Sati Calculator — Saturn Transit & Planetary Gochar',
    description:
      'Free Sade Sati calculator with Saturn transit detection, Kantaka Shani, Dhaiya, and Ashtakavarga transit strength for Saturn, Jupiter, Rahu & Ketu.',
    canonical: '/vedic/transits',
    keywords: ['sade sati calculator', 'sade sati by date of birth', 'saturn transit', 'kantaka shani', 'dhaiya calculator', 'gochar', 'jupiter transit', 'rahu transit'],
    seoIntro: {
      heading: 'Understanding Transits (Gochar)',
      text: 'Transits (Gochar) track current planetary positions relative to your birth chart. Saturn\'s 7.5-year Sade Sati (transit through the 12th, 1st, and 2nd houses from natal Moon) is the most feared transit period, bringing challenges and transformation. Jupiter transits bring expansion and opportunity every 12 years. Rahu-Ketu transits (18-month cycles) activate karmic patterns. Our transit tracker uses real-time NASA ephemeris positions and evaluates transit strength through Ashtakavarga Bindu scores.',
    },
    faqs: [
      { question: 'What is Sade Sati and how long does it last?', answer: 'Sade Sati is Saturn\'s 7.5-year transit through the 12th, 1st, and 2nd houses from your natal Moon. It occurs approximately every 29.5 years. It brings challenges, transformation, and maturity. Each of the three phases (rising, peak, setting) lasts about 2.5 years.' },
      { question: 'How do I know if I have Sade Sati?', answer: 'Enter your birth details in the calculator. If Saturn is currently transiting through the sign before, the same as, or after your natal Moon sign, you are in Sade Sati. The calculator shows your exact phase and dates.' },
      { question: 'What is Kantaka Shani?', answer: 'Kantaka Shani occurs when Saturn transits through the 4th, 8th, or 10th house from your natal Moon. It can create career obstacles (10th), domestic disturbances (4th), or health concerns (8th). It is checked separately from Sade Sati.' },
      { question: 'How do planetary transits affect my Dasha?', answer: 'Transits (Gochar) and Dashas work together. A favorable Dasha with difficult transits may see delays, while a challenging Dasha with strong transits can mitigate problems. Ashtakavarga Bindu scores indicate the strength of each transit.' },
    ],
    relatedTools: [
      { href: '/vedic/sade-sati', label: 'Sade Sati Calculator' },
      { href: '/vedic/ashtakavarga', label: 'Ashtakavarga' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/remedies', label: 'Vedic Remedies' },
      { href: '/vedic/panchang', label: 'Daily Panchang' },
      { href: '/vedic/nadi', label: 'Nadi Astrology' },
    ],
  },
  nakshatra: {
    title: 'Nakshatra Calculator — Find Your Birth Star & Pada Free',
    description:
      'Free Nakshatra calculator — find your Janma Nakshatra (birth star), Pada, ruling deity, Gana, Nadi & Tara Bala. All 27 Nakshatras with detailed interpretations.',
    canonical: '/vedic/nakshatra',
    keywords: ['nakshatra calculator', 'nakshatra finder', 'birth star calculator', 'janma nakshatra', 'nakshatra pada', 'my nakshatra', 'tara bala', '27 nakshatras'],
    seoIntro: {
      heading: 'What is a Nakshatra?',
      text: 'Nakshatras are the 27 lunar mansions of Vedic astrology, each spanning 13°20\' of the zodiac. Your birth Nakshatra (determined by the Moon\'s position) reveals your emotional nature, instinctive reactions, and deep personality traits. Each Nakshatra has a ruling deity, planetary lord, Gana (temperament), Nadi (pulse), and animal symbol used in compatibility matching. Tara Bala (star strength) analysis compares your birth Nakshatra against current transiting Nakshatra to determine daily auspiciousness.',
    },
    faqs: [
      { question: 'How do I find my Nakshatra by date of birth?', answer: 'Enter your date, time, and place of birth in the Nakshatra calculator. It computes the Moon\'s sidereal position using the Lahiri Ayanamsa and shows your Janma Nakshatra, Pada (quarter), ruling planet, and Moon sign.' },
      { question: 'Can I find my Nakshatra without a birth time?', answer: 'Usually not accurately. The Moon moves through one Nakshatra roughly every day, so near a boundary the birth time determines which Nakshatra is yours. The Pada changes approximately every 6 hours.' },
      { question: 'What is a Nakshatra Pada?', answer: 'Each of the 27 Nakshatras is divided into 4 Padas (quarters) of 3°20\' each, creating 108 Padas across the zodiac. The Pada determines the first syllable of your Vedic name and connects each Nakshatra to the Navamsa (D9) chart.' },
      { question: 'What is the difference between Nakshatra and Rashi?', answer: 'Rashi (Moon sign) is one of 12 zodiac signs spanning 30° each. Nakshatra is a finer 27-part division of 13°20\' each. Your Nakshatra reveals deeper personality traits and is used for Dasha calculation and compatibility matching.' },
    ],
    relatedTools: [
      { href: '/vedic/compatibility', label: 'Kundli Milan' },
      { href: '/vedic/panchang', label: 'Daily Panchang' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
    ],
  },
  kp: {
    title: 'KP System — Krishnamurti Paddhati Sub-Lord Calculator',
    description:
      'Calculate KP System sub-lords, significators, and ruling planets. Krishnamurti Paddhati analysis with house cusps using Placidus system and KP Ayanamsa.',
    canonical: '/vedic/kp',
    keywords: ['kp system', 'sub lord calculator', 'krishnamurti paddhati', 'kp astrology', 'ruling planets'],
    seoIntro: {
      heading: 'What is the KP System?',
      text: 'The Krishnamurti Paddhati (KP System) is a modern refinement of Vedic astrology developed by Prof. K.S. Krishnamurti. It divides each Nakshatra into 9 sub-divisions governed by Vimshottari Dasha lords, creating a finer 249-level zodiac segmentation. The Sub-Lord of a house cusp determines whether that house\'s significations will manifest. KP System uses Placidus house cusps (unlike Vedic equal houses) and its own Ayanamsa. It\'s especially prized for precise event timing and horary (Prashna) astrology.',
    },
    relatedTools: [
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/nakshatra', label: 'Nakshatra Analysis' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/predictions', label: 'Annual Predictions' },
    ],
  },
  panchang: {
    title: 'Panchang Today — Tithi, Nakshatra, Yoga & Hindu Calendar',
    description:
      "Today's Panchang with Tithi, Nakshatra, Yoga, Karana & Vara. Includes sunrise/sunset, Rahu Kalam, Gulika Kalam, and auspicious periods. Daily Hindu calendar for any location.",
    canonical: '/vedic/panchang',
    keywords: ['panchang today', 'today panchang', 'today tithi', 'tithi today', 'daily panchang', 'hindu calendar', 'hindu panchang', 'rahu kalam today', 'aaj ka panchang'],
    seoIntro: {
      heading: "Today's Hindu Panchang",
      text: 'The Panchang is the traditional Hindu almanac based on five elements (Pancha Anga): Tithi (lunar day), Vara (weekday), Nakshatra (lunar mansion), Yoga (Sun-Moon angular relationship), and Karana (half-Tithi). It has been used for millennia to determine auspicious and inauspicious times for ceremonies, travel, and daily activities. Our Panchang calculates all five elements plus Rahu Kalam (inauspicious Saturn-ruled period), Gulika Kalam, Yamaganda, and Abhijit Muhurta for any date and location.',
    },
    faqs: [
      { question: 'What are the 5 elements of Panchang?', answer: 'The five elements (Pancha Anga) are: Tithi (lunar day, 30 per month), Vara (weekday), Nakshatra (lunar mansion, 27 total), Yoga (27 Sun-Moon angular combinations), and Karana (half-Tithi, 11 types). Together they determine the quality of any given moment.' },
      { question: 'What is Rahu Kalam and when should I avoid it?', answer: 'Rahu Kalam is an inauspicious period ruled by Rahu that occurs daily. Its timing varies by weekday — for example, on Monday it is 7:30-9:00 AM (approximately). Starting new ventures, important meetings, or auspicious activities during Rahu Kalam is traditionally avoided.' },
      { question: 'How is Tithi calculated?', answer: 'Tithi is determined by the angular distance between the Moon and Sun. Each 12-degree increment equals one Tithi. There are 30 Tithis in a lunar month — 15 in Shukla Paksha (waxing) and 15 in Krishna Paksha (waning).' },
    ],
    relatedTools: [
      { href: '/vedic/muhurta', label: 'Muhurta Finder' },
      { href: '/vedic/nakshatra', label: 'Nakshatra Analysis' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
    ],
  },
  muhurta: {
    title: 'Choghadiya Today & Shubh Muhurat — Rahu Kaal Timings',
    description:
      "Today's Choghadiya timings with Shubh Muhurat, Rahu Kaal, Abhijit Muhurta & auspicious windows. Find the best Muhurta for marriage, griha pravesh, travel and 20+ activities.",
    canonical: '/vedic/muhurta',
    keywords: ['choghadiya today', 'shubh muhurat today', 'rahu kaal today', 'auspicious time today', 'muhurta today', 'din ka choghadiya', 'muhurta finder', 'marriage muhurta', 'griha pravesh muhurta'],
    seoIntro: {
      heading: 'What is Muhurta?',
      text: 'Muhurta (Electional Astrology) is the science of choosing the most auspicious moment to begin an important activity. Vedic Muhurta considers the Tithi, Nakshatra, Yoga, Karana, Vara, and planetary positions to find windows of maximal cosmic support. Key rules include avoiding Rahu Kalam and Gulika periods, selecting favorable Nakshatras for specific activities, and ensuring strong Lagna and benefic transits. Our Muhurta Finder scans upcoming time windows and rates them for 20+ activity types.',
    },
    faqs: [
      { question: 'What is the most auspicious Muhurta?', answer: 'Abhijit Muhurta — a 48-minute window at local solar noon — is considered universally auspicious for all activities. It occurs daily and is free from most doshas. For specific events like marriage, additional Nakshatra and Tithi conditions must also be met.' },
      { question: 'What is Rahu Kalam and should I avoid it?', answer: 'Rahu Kalam is an inauspicious daily period ruled by Rahu, lasting about 1.5 hours. Its timing varies by weekday. Starting new ventures, signing contracts, or beginning journeys during Rahu Kalam is traditionally avoided.' },
      { question: 'How is a marriage Muhurta selected?', answer: 'A marriage Muhurta requires favorable Tithi (avoiding Rikta Tithis), auspicious Nakshatra (like Rohini, Mrigashira, Uttara Phalguni), strong Lagna, absence of Rahu Kalam and Gulika, and no combustion of Venus or Jupiter. Personal Tarabala and Chandrabala are also checked.' },
    ],
    relatedTools: [
      { href: '/vedic/choghadiya', label: "Today's Choghadiya" },
      { href: '/vedic/panchang', label: 'Daily Panchang' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
      { href: '/vedic/nakshatra', label: 'Nakshatra Analysis' },
      { href: '/vedic/compatibility', label: 'Kundli Milan' },
    ],
  },
  ashtakavarga: {
    title: 'Ashtakavarga Calculator — BAV & SAV Bindus',
    description:
      'Calculate Ashtakavarga with Bhinna (BAV) and Sarva (SAV) Bindu tables for all 7 planets. Identify strong and weak houses for transits.',
    canonical: '/vedic/ashtakavarga',
    keywords: ['ashtakavarga calculator', 'BAV SAV', 'bindu points', 'ashtakavarga chart'],
    seoIntro: {
      heading: 'What is Ashtakavarga?',
      text: 'Ashtakavarga is a quantitative scoring system from BPHS that assigns Bindu (benefic points) to each sign from each planet and the Ascendant. The Bhinna Ashtakavarga (BAV) shows individual planet contributions (0-8 points per sign), while the Sarva Ashtakavarga (SAV) sums all contributions (0-56 per sign). Signs with high SAV scores (28+) give strong transit results; low scores (<25) indicate challenging transit periods. Ashtakavarga is essential for predicting the actual impact of planetary transits.',
    },
    faqs: [
      { question: 'What is Ashtakavarga in Vedic astrology?', answer: 'Ashtakavarga is a point-based scoring system where each planet and the Ascendant contribute Bindus (benefic points) to each sign. Signs with high Bindu scores support favorable results when transiting planets pass through them.' },
      { question: 'What is the difference between BAV and SAV?', answer: 'BAV (Bhinna Ashtakavarga) shows individual planet contributions (0-8 per sign). SAV (Sarva Ashtakavarga) is the sum of all 7 planets\' BAV tables, giving a composite score (0-56) per sign. SAV total is always 337.' },
      { question: 'What is a good SAV score for a house?', answer: 'An SAV score of 28+ in a sign indicates strong support for transiting planets. Below 25 suggests challenging transits through that sign. The average is about 28 (337 ÷ 12).' },
    ],
    relatedTools: [
      { href: '/vedic/transits', label: 'Planetary Transits' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/shadbala', label: 'Shadbala (Strength)' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
    ],
  },
  compatibility: {
    title: 'Kundli Milan — Free Ashtakoota Matching (36 Points)',
    description:
      'Free Kundli Milan with Ashtakoota (8-factor) compatibility matching. Check Nadi, Bhakoot, Gana, Maitri, Yoni, Tara, Vashya & Varna scores out of 36 points.',
    canonical: '/vedic/compatibility',
    keywords: ['kundli matching online free', 'kundli milan', 'gun milan', 'ashtakoota matching', '36 guna milan calculator', 'marriage compatibility', 'horoscope matching for marriage', 'nadi dosha', 'mangal dosha matching'],
    seoIntro: {
      heading: 'What is Kundli Milan?',
      text: 'Kundli Milan (Ashtakoota Guna Matching) is the traditional Vedic method for assessing marriage compatibility between two horoscopes. It evaluates 8 factors (Kootas): Varna (spiritual compatibility, 1 point), Vashya (mutual attraction, 2 points), Tara (birth star harmony, 3 points), Yoni (sexual compatibility, 4 points), Graha Maitri (mental compatibility, 5 points), Gana (temperament, 6 points), Bhakoot (health & wealth, 7 points), and Nadi (health & genes, 8 points). A score of 18+ out of 36 is considered acceptable for marriage.',
    },
    faqs: [
      { question: 'How many points are needed for a good Kundli match?', answer: 'A score of 18 or above out of 36 is considered acceptable for marriage. Scores above 25 indicate excellent compatibility. Below 18 is generally considered unfavorable, though other chart factors may compensate.' },
      { question: 'What is Nadi Koota and why is it important?', answer: 'Nadi Koota carries the highest weight (8 points) in Ashtakoota matching. It assesses health and genetic compatibility. Same Nadi (Aadi-Aadi, Madhya-Madhya, or Antya-Antya) scores 0 points and is considered a Nadi Dosha, which may affect offspring health.' },
      { question: 'What is Manglik Dosha in marriage matching?', answer: 'Manglik Dosha (Mangal Dosha) occurs when Mars is placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house of the birth chart. It is checked separately from Ashtakoota matching and is important for marriage compatibility assessment.' },
      { question: 'Can Kundli Milan predict a successful marriage?', answer: 'Kundli Milan is one important factor in Vedic marriage compatibility assessment. While a high score indicates natural harmony between partners, a successful marriage also depends on individual chart strengths, Dasha timing, and personal effort.' },
    ],
    howTo: {
      name: 'How to Check Kundli Milan Compatibility',
      description: 'Match two birth charts using the 36-point Ashtakoota system for marriage compatibility.',
      steps: [
        { name: 'Create both profiles', text: 'Add birth profiles for both partners with accurate date, time, and place of birth.' },
        { name: 'Select profiles to match', text: 'Choose the two profiles you want to compare from the compatibility page.' },
        { name: 'Review Ashtakoota scores', text: 'Check individual scores for all 8 Kootas (Varna, Vashya, Tara, Yoni, Maitri, Gana, Bhakoot, Nadi) and the total out of 36.' },
        { name: 'Check Manglik Dosha', text: 'Review Mangal Dosha status for both partners and any cancellation conditions that may apply.' },
      ],
    },
    relatedTools: [
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/nakshatra', label: 'Nakshatra Analysis' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/remedies', label: 'Vedic Remedies' },
      { href: '/matrix/compatibility', label: 'Matrix Compatibility' },
    ],
  },
  shadbala: {
    title: 'Shadbala Calculator — Planetary Strength Analysis',
    description:
      'Calculate Shadbala (six-fold strength) of each planet — Sthana, Dig, Kala, Cheshta, Naisargika, Drig Bala. Includes Ishta/Kashta Phala.',
    canonical: '/vedic/shadbala',
    keywords: ['shadbala calculator', 'planetary strength', 'shashtiamsa', 'ishta phala', 'vimsopaka bala'],
    seoIntro: {
      heading: 'What is Shadbala?',
      text: 'Shadbala (six-fold strength) is the most comprehensive planetary strength assessment in Vedic astrology, described in detail in BPHS chapters 27-28. It measures six types of strength: Sthana Bala (positional — exaltation, own sign, Moolatrikona), Dig Bala (directional — angular houses), Kala Bala (temporal — day/night, year lord, hora), Cheshta Bala (motional — speed and retrograde), Naisargika Bala (natural — Sun is strongest, Saturn weakest), and Drig Bala (aspectual — benefic/malefic aspects). Planets must meet minimum strength thresholds in Shashtiamsas (60ths) to deliver their full promise.',
    },
    relatedTools: [
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/ashtakavarga', label: 'Ashtakavarga' },
      { href: '/vedic/divisional', label: 'Divisional Charts' },
    ],
  },
  jaimini: {
    title: 'Jaimini Astrology — Chara Karakas & Chara Dasha',
    description:
      'Explore Jaimini Astrology with 7 Chara Karakas (Atmakaraka to Darakaraka), Karakamsha, Rashi Drishti, Chara Dasha, and Arudha Pada analysis.',
    canonical: '/vedic/jaimini',
    keywords: ['jaimini astrology', 'chara karaka', 'atmakaraka', 'karakamsha', 'chara dasha'],
    seoIntro: {
      heading: 'What is Jaimini Astrology?',
      text: 'Jaimini Sutras present a parallel system of Vedic astrology attributed to Sage Jaimini (disciple of Vyasa). Unlike Parashari astrology which focuses on planets, Jaimini emphasizes signs (Rashi) and their lords. The 7 Chara Karakas are planets ranked by degree — Atmakaraka (highest degree) represents the soul, Amatyakaraka represents career, and Darakaraka (lowest) represents spouse. Karakamsha (Atmakaraka\'s Navamsa sign in the birth chart) reveals spiritual purpose and career direction. Chara Dasha provides sign-based timing periods unique to this system.',
    },
    relatedTools: [
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/career', label: 'Career Analysis' },
      { href: '/vedic/divisional', label: 'Divisional Charts' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
    ],
  },
  career: {
    title: 'Career Astrology — Job Prediction by Date of Birth Free',
    description:
      'Free career astrology prediction by date of birth. Analyze job timing with 10th house, Dasamsa (D10) chart, Amatyakaraka & Dasha periods. When will I get a job?',
    canonical: '/vedic/career',
    keywords: ['career astrology', 'job prediction astrology', 'career prediction by date of birth', 'career horoscope', 'job kab milegi', '10th house career', 'dasamsa chart', 'profession astrology', 'career change astrology'],
    seoIntro: {
      heading: 'Career Analysis in Vedic Astrology',
      text: 'Career analysis in Vedic astrology examines the 10th house (Karma Bhava), its lord, planets placed there, and the Dasamsa (D10) divisional chart. The 10th house represents public life, profession, authority, and reputation. Key indicators include the 10th lord\'s sign placement, aspects from benefics/malefics, and Dasha timing for career changes. The Amatyakaraka (Jaimini career significator), strong planets in the D10, and Shadbala strength of the 10th lord all contribute to a comprehensive career prediction.',
    },
    relatedTools: [
      { href: '/vedic/jaimini', label: 'Jaimini Astrology' },
      { href: '/vedic/divisional', label: 'Divisional Charts' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/wealth', label: 'Wealth Analysis' },
    ],
  },
  wealth: {
    title: 'Wealth Astrology — Dhana Yoga & Indu Lagna',
    description:
      'Analyze wealth potential with Dhana Yogas, Indu Lagna (wealth ascendant), 2nd/11th house analysis, and financial timing through Dasha periods.',
    canonical: '/vedic/wealth',
    keywords: ['wealth astrology', 'dhana yoga', 'indu lagna', 'financial astrology', 'money prediction'],
    seoIntro: {
      heading: 'Wealth Analysis in Vedic Astrology',
      text: 'Vedic astrology assesses wealth potential through the 2nd house (accumulated wealth), 11th house (income and gains), and their lords. Dhana Yogas are specific combinations between lords of wealth houses (1, 2, 5, 9, 11) that indicate financial prosperity. Indu Lagna (from Uttara Kalamrita) is a special wealth ascendant calculated from the 9th lords of the Ascendant and Moon, revealing the magnitude of wealth. Lakshmi Yoga and other prosperity indicators combine with Dasha timing to predict when wealth will manifest.',
    },
    relatedTools: [
      { href: '/vedic/career', label: 'Career Analysis' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/ashtakavarga', label: 'Ashtakavarga' },
    ],
  },
  health: {
    title: 'Health & Longevity — Ayush & Maraka Analysis',
    description:
      'Assess health and longevity with Ayush tiers, Maraka lords, Badhaka planets, and vulnerable body areas mapped from house significations.',
    canonical: '/vedic/health',
    keywords: ['health astrology', 'longevity prediction', 'maraka lord', 'ayush calculator', 'medical astrology'],
    seoIntro: {
      heading: 'Health & Longevity in Vedic Astrology',
      text: 'Health analysis in Vedic astrology examines the 1st house (constitution), 6th house (diseases), 8th house (longevity), and their lords. Ayush (lifespan) is classified into Balarishta (infant risk), Alpa Ayu (short), Madhya Ayu (medium), and Purna Ayu (full life) based on the 8th house, its lord, and Saturn\'s condition. Maraka lords (2nd and 7th house rulers) are timing indicators for health crises. Badhaka planets create hidden obstructions. Each house maps to specific body parts, allowing identification of vulnerable health areas.',
    },
    relatedTools: [
      { href: '/vedic/remedies', label: 'Vedic Remedies' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
      { href: '/matrix/health', label: 'Matrix Health Card' },
    ],
  },
  predictions: {
    title: 'Horary Astrology (Prashna Kundli) & Varshaphal Calculator',
    description:
      'Free horary astrology calculator (Prashna Kundli) for instant question answers. Plus Varshaphal annual horoscope with Solar Return, Muntha & Tajaka Yogas.',
    canonical: '/vedic/predictions',
    keywords: ['horary astrology', 'prashna kundli', 'varshaphal', 'annual horoscope', 'solar return', 'yearly prediction', 'tajaka yoga', 'horary chart calculator'],
    seoIntro: {
      heading: 'What is Varshaphal?',
      text: 'Varshaphal (Tajaka annual chart) is a Solar Return chart cast for the exact moment the Sun returns to its natal position each year. Derived from Tajaka Shastra (Indo-Persian tradition), it provides detailed predictions for the year ahead. Key components include the Muntha (a progressed point advancing one sign per year), the Year Lord (Varsha Pati — the planet ruling the year), and Tajaka Yogas (annual combination patterns like Ithasala, Ishrafa, and Kamboola). This system complements Vimshottari Dasha for fine-grained annual predictions.',
    },
    relatedTools: [
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/matrix/timeline', label: 'Matrix Life Timeline' },
    ],
  },
  nadi: {
    title: 'Nadi Astrology — Bhrigu Bindu Calculator',
    description:
      'Calculate Nadi Astrology points — Bhrigu Bindu, Pranapada Lagna, Gulika, Mandi, and Nadi Amsha (D150). Transit triggers for major life events.',
    canonical: '/vedic/nadi',
    keywords: ['nadi astrology', 'bhrigu bindu', 'pranapada lagna', 'gulika', 'nadi amsha'],
    seoIntro: {
      heading: 'What is Nadi Astrology?',
      text: 'Nadi Astrology encompasses several specialized techniques from the Bhrigu and Dhruva Nadi traditions of South India. The Bhrigu Bindu is the sensitive midpoint of Rahu and Moon — when transiting Jupiter or Saturn crosses this degree, major life events are triggered. Pranapada Lagna (vital breath ascendant) provides additional timing information. Gulika and Mandi are mathematical shadow points derived from Saturn that indicate karmic challenges. The Nadi Amsha (D150) is the finest divisional chart used for extremely detailed delineation.',
    },
    relatedTools: [
      { href: '/vedic/transits', label: 'Planetary Transits' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/divisional', label: 'Divisional Charts' },
    ],
  },
  report: {
    title: 'Free Kundli Report — 294-Algorithm Vedic Analysis',
    description:
      'Get a free comprehensive Kundli report powered by 294 Vedic astrology algorithms — birth chart, Yogas, Dashas, Shadbala, transits, career, wealth, health & remedies.',
    canonical: '/vedic/report',
    keywords: ['free kundli report', 'detailed birth chart analysis', 'vedic astrology report', 'complete kundli analysis', 'kundli pdf download', 'full horoscope report', 'jyotish report'],
    seoIntro: {
      heading: 'Complete Vedic Astrology Report',
      text: 'The Full Report combines all major Vedic astrology analyses into one comprehensive view: birth chart with planetary positions and dignities, Yoga and Dosha detection, Vimshottari Dasha timeline, Shadbala planetary strengths, current transit effects, career and wealth indicators, health assessment, and personalized remedies. It provides a complete picture of your chart without navigating between individual tool pages.',
    },
    relatedTools: [
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/remedies', label: 'Vedic Remedies' },
    ],
  },
  'mangal-dosha': {
    title: 'Mangal Dosha Calculator — Free Manglik Check by Birth Chart',
    description:
      'Check if you are Manglik with our free Mangal Dosha calculator. Detect Mars placement in 1st, 2nd, 4th, 7th, 8th, 12th house and cancellation conditions from your Kundli.',
    canonical: '/vedic/mangal-dosha',
    keywords: ['mangal dosha calculator', 'manglik check', 'mangal dosha remedies', 'manglik dosha by date of birth', 'is i am manglik', 'mars dosha marriage', 'mangal dosha cancellation'],
    seoIntro: {
      heading: 'What is Mangal Dosha (Manglik Dosha)?',
      text: 'Mangal Dosha (also called Manglik Dosha, Kuja Dosha, or Bhom Dosha) is one of the most feared afflictions in Vedic astrology for marriage. It occurs when Mars (Mangal) is placed in the 1st, 2nd, 4th, 7th, 8th, or 12th house from the Ascendant, Moon, or Venus in the birth chart. Approximately 40-50% of people have some form of Mangal Dosha. However, many cancellation conditions exist — such as Mars in its own sign, Jupiter aspecting Mars, or Venus conjunct Mars — which reduce or nullify the dosha entirely. Our calculator checks all conditions from your birth chart.',
    },
    faqs: [
      { question: 'What is Mangal Dosha and how does it affect marriage?', answer: 'Mangal Dosha occurs when Mars occupies the 1st, 2nd, 4th, 7th, 8th, or 12th house in the birth chart. It is believed to cause delays, conflicts, or incompatibility in marriage. When both partners are Manglik, the dosha is considered mutually cancelled.' },
      { question: 'How to check if I am Manglik?', answer: 'Enter your birth date, time, and place in the calculator. It checks Mars placement from the Ascendant (Lagna) and identifies which house Mars occupies. If Mars is in houses 1, 2, 4, 7, 8, or 12, you have Mangal Dosha.' },
      { question: 'What are the cancellation conditions for Mangal Dosha?', answer: 'Mangal Dosha is cancelled when: Mars is in its own sign (Aries/Scorpio) or exalted (Capricorn), Jupiter aspects or conjoins Mars, Mars is in the 2nd house in Gemini or Virgo, Saturn occupies 1st or 7th house, or Venus conjoins Mars in certain signs.' },
      { question: 'Can a Manglik marry a non-Manglik?', answer: 'Yes. If cancellation conditions are present, the dosha is neutralized. Also, after age 28, the effect of Mangal Dosha is believed to diminish. Remedies like Kumbh Vivah (symbolic marriage to a pot) are traditionally performed.' },
    ],
    howTo: {
      name: 'How to Check Mangal Dosha',
      description: 'Detect Mangal Dosha (Manglik) status from your Vedic birth chart.',
      steps: [
        { name: 'Enter birth details', text: 'Click "Create Your Birth Chart" and enter your date, time, and place of birth.' },
        { name: 'View Mangal Dosha status', text: 'The calculator instantly shows whether Mars is in a Manglik house (1, 2, 4, 7, 8, or 12) and the severity.' },
        { name: 'Check cancellation conditions', text: 'Review if any classical cancellation rules apply — Jupiter\'s aspect, Mars in own sign, Saturn in Kendra, etc.' },
        { name: 'See remedies', text: 'If Mangal Dosha is active, view recommended Vedic remedies including gemstones, mantras, and rituals.' },
      ],
    },
    relatedTools: [
      { href: '/vedic/compatibility', label: 'Kundli Milan (Marriage Match)' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/remedies', label: 'Vedic Remedies' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/kaal-sarp-dosha', label: 'Kaal Sarp Dosha Check' },
    ],
  },
  'kaal-sarp-dosha': {
    title: 'Kaal Sarp Dosha Calculator — Free Check by Birth Chart',
    description:
      'Check Kaal Sarp Dosha in your Kundli free. Identify the 12 types (Anant to Sheshnag), severity, Jupiter cancellation, and Vedic remedies.',
    canonical: '/vedic/kaal-sarp-dosha',
    keywords: ['kaal sarp dosha calculator', 'kaal sarp dosha check', 'kaal sarp dosha remedies', 'kaal sarp yog', '12 types kaal sarp dosha', 'kaal sarp dosha by date of birth', 'kaal sarp dosha effects'],
    seoIntro: {
      heading: 'What is Kaal Sarp Dosha?',
      text: 'Kaal Sarp Dosha (Kaal Sarp Yog) occurs when all seven visible planets (Sun through Saturn) are hemmed between Rahu and Ketu in the birth chart. There are 12 types based on which house Rahu occupies — from Anant (Rahu in 1st) to Sheshnag (Rahu in 12th). It is associated with recurring obstacles, karmic debt, and unexpected life reversals. However, if Jupiter is placed in a Kendra house (1, 4, 7, 10), the dosha is considered cancelled. Partial Kaal Sarp (some planets on the Rahu-Ketu axis) has milder effects.',
    },
    faqs: [
      { question: 'What is Kaal Sarp Dosha?', answer: 'Kaal Sarp Dosha exists when all 7 planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn) are located on one side of the Rahu-Ketu axis. It causes recurring life obstacles, delays, and karmic challenges. There are 12 types based on Rahu\'s house position.' },
      { question: 'What are the 12 types of Kaal Sarp Dosha?', answer: 'The 12 types correspond to Rahu\'s house: Anant (1st), Kulik (2nd), Vasuki (3rd), Shankhapal (4th), Padma (5th), Mahapadma (6th), Takshak (7th), Karkotak (8th), Shankhachur (9th), Ghatak (10th), Vishdhar (11th), Sheshnag (12th). Each affects different life areas.' },
      { question: 'How to check if I have Kaal Sarp Dosha?', answer: 'Enter your birth details in the calculator. It checks whether all 7 planets fall between Rahu and Ketu. Partial Kaal Sarp (planets exactly on the axis) is also detected with its milder effects.' },
      { question: 'What is the remedy for Kaal Sarp Dosha?', answer: 'Traditional remedies include performing Kaal Sarp Dosha Puja at Trimbakeshwar temple, chanting Rahu and Ketu mantras, wearing Gomed (Hessonite) and Lehsunia (Cat\'s Eye) gemstones, and donating to serpent-related charities on Nag Panchami.' },
    ],
    howTo: {
      name: 'How to Check Kaal Sarp Dosha',
      description: 'Detect Kaal Sarp Dosha type and severity from your Vedic birth chart.',
      steps: [
        { name: 'Enter birth details', text: 'Click "Create Your Birth Chart" and enter your date, time, and place of birth.' },
        { name: 'View Kaal Sarp status', text: 'The calculator checks all 7 planets against the Rahu-Ketu axis and shows Full, Partial, or No Kaal Sarp Dosha.' },
        { name: 'Identify the type', text: 'If present, the specific type (Anant, Kulik, etc.) is identified based on which house Rahu occupies.' },
        { name: 'Check Jupiter cancellation', text: 'Jupiter in a Kendra (1, 4, 7, 10) cancels the dosha. The calculator automatically checks this condition.' },
      ],
    },
    relatedTools: [
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
      { href: '/vedic/remedies', label: 'Vedic Remedies' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/mangal-dosha', label: 'Mangal Dosha Check' },
      { href: '/vedic/compatibility', label: 'Kundli Milan' },
    ],
  },
  navamsa: {
    title: 'Navamsa Chart Calculator — Free D9 Chart Analysis',
    description:
      'Free Navamsa (D9) chart calculator with Vargottama status, Navamsa Lagna, planet dignities, and marriage/dharma analysis. Instant D9 chart from birth details.',
    canonical: '/vedic/navamsa',
    keywords: ['navamsa chart calculator', 'D9 chart calculator', 'navamsa chart free', 'navamsa lagna', 'vargottama planets', 'navamsa chart marriage', 'D9 chart interpretation'],
    seoIntro: {
      heading: 'What is the Navamsa (D9) Chart?',
      text: 'The Navamsa (D9) is the most important divisional chart in Vedic astrology after the birth chart (D1). It divides each sign into 9 equal parts of 3°20\', creating a 108-part zodiac that reveals the soul\'s deeper nature, marriage quality, and dharmic path. Planets that occupy the same sign in both D1 and D9 are called Vargottama and gain exceptional strength. The Navamsa Lagna indicates the inner self and spouse characteristics, while the 7th house of D9 reveals marriage dynamics. Maharishi Parashara stated that no prediction should be made without consulting the Navamsa chart.',
    },
    faqs: [
      { question: 'What is the Navamsa chart used for?', answer: 'The Navamsa (D9) chart is primarily used for marriage analysis, assessing the true strength of planets, and understanding the native\'s dharmic purpose. The 7th house of D9 describes the spouse, Venus/Jupiter dignity in D9 indicates marriage quality, and Vargottama planets show confirmed strengths.' },
      { question: 'What is a Vargottama planet?', answer: 'A planet is Vargottama when it occupies the same zodiac sign in both the birth chart (D1) and the Navamsa chart (D9). Vargottama planets are considered very strong — like being exalted — and deliver their results with greater certainty.' },
      { question: 'How to read the Navamsa chart for marriage?', answer: 'Check the 7th house of D9, its lord, planets in it, and Venus (for men) / Jupiter (for women) placement. The Navamsa Lagna sign indicates the native\'s inner nature that emerges after marriage. Benefics in D9 Kendra indicate a harmonious married life.' },
      { question: 'What is the difference between D1 and D9 chart?', answer: 'The D1 (Rashi/birth chart) shows the external life, physical body, and worldly circumstances. The D9 (Navamsa) reveals the inner soul, marriage, and the fruits of dharmic actions. D1 is the tree; D9 is the fruit it bears.' },
    ],
    relatedTools: [
      { href: '/vedic/divisional', label: 'All Divisional Charts (D1–D60)' },
      { href: '/vedic/compatibility', label: 'Kundli Milan' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
      { href: '/vedic/yogas', label: 'Yogas & Doshas' },
    ],
  },
  'sade-sati': {
    title: 'Sade Sati Calculator — Is Shani Sade Sati Running? Free Check',
    description:
      'Free Sade Sati calculator — check if Saturn\'s 7.5-year Sade Sati is running for your Moon sign. Detect phase (rising/peak/setting), Dhaiya, Kantaka Shani & remedies.',
    canonical: '/vedic/sade-sati',
    keywords: ['sade sati calculator', 'shani sade sati', 'sade sati by date of birth', 'is sade sati running', 'saturn transit', 'kantaka shani', 'dhaiya calculator', 'ashtama shani', 'sade sati for moon sign'],
    seoIntro: {
      heading: 'What is Sade Sati?',
      text: 'Sade Sati (साढ़े साती) is Saturn\'s 7.5-year transit through the 12th, 1st, and 2nd houses from your natal Moon sign. It occurs approximately every 29.5 years when Saturn returns to the signs surrounding your Moon. The transit is divided into three phases: Rising (12th house — preparation and inner challenges), Peak (1st house — maximum intensity, transformation), and Setting (2nd house — gradual release and lessons learned). Kantaka Shani (Saturn in 4th/8th/10th from Moon) and Dhaiya (Small Panoti — 2.5-year sub-cycle) are related Saturn afflictions also checked here. Our calculator uses real-time NASA ephemeris positions and the Lahiri Ayanamsa.',
    },
    faqs: [
      { question: 'What is Sade Sati and how long does it last?', answer: 'Sade Sati is Saturn\'s 7.5-year transit through the 12th, 1st, and 2nd houses from your natal Moon sign. Each of the three phases lasts approximately 2.5 years. It brings challenges, transformation, and karmic lessons.' },
      { question: 'How do I check if Sade Sati is running for me?', answer: 'Enter your birth details or select your Moon sign (Rashi). The calculator checks Saturn\'s current sidereal position against your natal Moon and shows whether you are in Phase 1 (Rising), Phase 2 (Peak), Phase 3 (Setting), or free from Sade Sati.' },
      { question: 'What is Kantaka Shani?', answer: 'Kantaka Shani occurs when Saturn transits the 4th, 8th, or 10th house from your natal Moon. It creates career obstacles (10th), domestic disturbances (4th), or health concerns (8th). It is checked separately from Sade Sati.' },
      { question: 'What are the remedies for Sade Sati?', answer: 'Traditional remedies include chanting the Shani Mantra (Om Sham Shanaishcharaya Namah), wearing a Blue Sapphire (Neelam) after consultation, donating black sesame and mustard oil on Saturdays, fasting on Saturdays, and visiting Shani temples.' },
    ],
    relatedTools: [
      { href: '/vedic/transits', label: 'Full Transit Analysis' },
      { href: '/vedic/remedies', label: 'Vedic Remedies' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/ashtakavarga', label: 'Ashtakavarga' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
    ],
  },
  choghadiya: {
    title: 'Choghadiya Today — Shubh Muhurat & Auspicious Timings',
    description:
      'Today\'s Choghadiya (चौघड़िया) timings with Shubh, Labh, Amrit, Char periods for your location. Day and night Choghadiya table with Rahu Kaal overlay.',
    canonical: '/vedic/choghadiya',
    keywords: ['choghadiya', 'choghadiya today', 'today choghadiya', 'din ka choghadiya', 'shubh choghadiya', 'aaj ka choghadiya', 'choghadiya table', 'raat ka choghadiya'],
    seoIntro: {
      heading: 'What is Choghadiya?',
      text: 'Choghadiya (चौघड़िया, also spelled Chogadia or Chaughadia) is a Vedic time-division system that splits each day and night into 8 equal periods, each ruled by a planet. The 7 types — Udveg (Sun), Char (Venus), Labh (Mercury), Amrit (Moon), Kaal (Saturn), Shubh (Jupiter), and Rog (Mars) — cycle in a fixed order starting from the Vara (weekday) lord. Amrit is the most auspicious for all activities, Shubh and Labh are good, Char suits travel, while Kaal, Rog, and Udveg are inauspicious (though Kaal Choghadiya is considered good for wealth). This calculator shows today\'s Choghadiya table for your location based on actual sunrise and sunset times.',
    },
    faqs: [
      { question: 'What is Choghadiya and how is it calculated?', answer: 'Choghadiya divides daytime (sunrise to sunset) and nighttime (sunset to next sunrise) into 8 equal periods each. Each period is assigned one of 7 types (Udveg, Char, Labh, Amrit, Kaal, Shubh, Rog) based on the weekday. The starting type depends on the Vara lord.' },
      { question: 'Which Choghadiya is best for starting new work?', answer: 'Amrit Choghadiya (ruled by Moon) is the most auspicious for all activities. Shubh (Jupiter) is ideal for marriage, education, and religious work. Labh (Mercury) is best for starting a business or education. Char (Venus) suits travel and cultural activities.' },
      { question: 'Is Kaal Choghadiya always bad?', answer: 'While Kaal Choghadiya (ruled by Saturn) is generally inauspicious, it is considered favorable for wealth-related activities, debt collection, and dealing with property. Avoid starting new ventures or journeys during this period.' },
      { question: 'What is the difference between Choghadiya and Muhurta?', answer: 'Choghadiya is a simpler daily timing system based on weekday and sunrise/sunset. Muhurta (Electional Astrology) is more detailed, considering Tithi, Nakshatra, Yoga, Karana, and planetary positions for specific activities like marriage or griha pravesh.' },
    ],
    relatedTools: [
      { href: '/vedic/muhurta', label: 'Muhurta Finder' },
      { href: '/vedic/panchang', label: 'Daily Panchang' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
      { href: '/vedic/nakshatra', label: 'Nakshatra Analysis' },
    ],
  },
};

export function buildVedicMetadata(slug: string): Metadata {
  const seo = VEDIC_SEO[slug];
  if (!seo) return {};
  const ogUrl = `/api/og?tool=${encodeURIComponent(slug)}&title=${encodeURIComponent(seo.title)}`;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonical,
      languages: {
        'en': seo.canonical,
        'hi': `/hi${seo.canonical}`,
        'ne': `/ne${seo.canonical}`,
        'pt': `/pt${seo.canonical}`,
        'es': `/es${seo.canonical}`,
        'ja': `/ja${seo.canonical}`,
        'fr': `/fr${seo.canonical}`,
        'x-default': seo.canonical,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      type: 'website',
      images: [{ url: ogUrl, width: 1200, height: 630, alt: seo.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [ogUrl],
    },
  };
}
