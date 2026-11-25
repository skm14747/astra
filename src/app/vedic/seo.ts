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
    title: 'Free Birth Chart & Kundali (कुंडली) Calculator Online',
    description:
      'Free birth chart calculator & online Kundali (Janam Kundli) with planetary positions, houses, nakshatras & dignities. NASA-precision Vedic astrology chart with Lahiri Ayanamsa.',
    canonical: '/vedic/kundli',
    keywords: ['free birth chart', 'birth chart calculator', 'free online kundali', 'janam kundli', 'kundli online', 'free kundali', 'vedic birth chart calculator', 'janam kundali', 'kundali by date of birth', 'birth chart astrology', 'lagna chart', 'free birth chart analysis', 'free astrology chart'],
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
    title: 'Free Yoga & Dosha Calculator (योग दोष) — Raja Yoga Check',
    description:
      'Detect all major Yogas (Raja, Dhana, Pancha Mahapurusha, Gajakesari) and Doshas (Manglik, Kaal Sarp, Pitra) in your Vedic birth chart with BPHS-accurate rules.',
    canonical: '/vedic/yogas',
    keywords: ['yoga calculator astrology', 'raj yoga calculator', 'dhan yoga calculator', 'yoga calculator', 'free yoga calculator', 'raja yoga', 'dhana yoga', 'kaal sarp dosha', 'manglik dosha', 'gajakesari yoga', 'yoga dosha calculator free'],
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
    keywords: ['vedic remedies', 'free vedic remedies', 'astrology gemstones', 'mantra for planets', 'rudraksha recommendation', 'astrology remedies free'],
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
    title: 'Free Dasha Calculator (दशा) — 16 Systems, Mahadasha Dates',
    description:
      'Free Dasha calculator — Vimshottari, Yogini, Ashtottari & 13 more systems. Mahadasha, Antardasha & Pratyantardasha dates by date of birth. No signup required.',
    canonical: '/vedic/dashas',
    keywords: ['vimshottari dasha calculator', 'mahadasha calculator', 'dasha calculator free', 'antardasha calculator', 'mahadasha dates by date of birth', 'yogini dasha calculator', 'ashtottari dasha', 'current mahadasha', 'free dasha calculator'],
    seoIntro: {
      heading: 'What is Vimshottari Dasha?',
      text: 'The Vimshottari Dasha system is the most widely used timing technique in Vedic astrology. It divides life into 120 years governed by 9 planetary periods (Mahadasha), each further divided into sub-periods (Antardasha) and sub-sub-periods (Pratyantardasha). The starting planet is determined by your birth Nakshatra. Each Dasha activates the houses and signs ruled by that planet, triggering specific life events. This tool calculates all three levels of Dasha with exact dates, plus Yogini Dasha (36-year cycle) and Ashtottari Dasha (108-year cycle) alternatives.',
    },
    faqs: [
      { question: 'How is Vimshottari Dasha calculated?', answer: 'Vimshottari Dasha is calculated from the Moon\'s Nakshatra at birth. The balance of the first Mahadasha is determined by how far the Moon has traversed the birth Nakshatra. Each of the 9 planets rules a Mahadasha of fixed duration totaling 120 years: Sun (6), Moon (10), Mars (7), Rahu (18), Jupiter (16), Saturn (19), Mercury (17), Ketu (7), Venus (20).' },
      { question: 'What is the difference between Mahadasha and Antardasha?', answer: 'Mahadasha is the major planetary period lasting several years. Antardasha (Bhukti) is a sub-period within each Mahadasha. Pratyantardasha is a further sub-division. Events during a Dasha period are colored by both the Mahadasha lord and Antardasha lord together.' },
      { question: 'Which Dasha system is most accurate?', answer: 'Vimshottari Dasha is the most widely used and trusted system, recommended by Maharishi Parashara in BPHS. Yogini Dasha (36-year cycle) is preferred for shorter-term predictions, while Ashtottari Dasha (108-year cycle) is used when Rahu is in a Kendra or Trikona from the Lagna lord.' },
      { question: 'How do I find my current Mahadasha by date of birth?', answer: 'Enter your date, time, and place of birth. The calculator determines your Moon Nakshatra, computes the starting Dasha balance, and shows your current Mahadasha, Antardasha, and Pratyantardasha with exact start and end dates. The currently active period is highlighted automatically.' },
    ],
    howTo: {
      name: 'How to Calculate Your Dasha by Date of Birth',
      description: 'Generate your complete Vimshottari Dasha timeline with Mahadasha, Antardasha and Pratyantardasha dates.',
      steps: [
        { name: 'Enter birth details', text: 'Click "Create Your Birth Chart" and enter your full name, date of birth, exact time of birth, and place of birth.' },
        { name: 'View your Dasha timeline', text: 'Your Vimshottari Dasha appears instantly with all Mahadasha periods, their start and end dates, and the currently active period highlighted.' },
        { name: 'Explore sub-periods', text: 'Click any Mahadasha to see its Antardasha and Pratyantardasha sub-periods with exact dates.' },
        { name: 'Try other Dasha systems', text: 'Switch between 16 Dasha systems including Yogini, Ashtottari, Chara, Kalachakra, and more using the system selector.' },
      ],
    },
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
    title: 'Free Nakshatra Calculator (नक्षत्र) by Date of Birth',
    description:
      'Free Nakshatra calculator by date of birth — find your Janma Nakshatra (birth star), Pada, ruling deity, Gana, Nadi & Tara Bala. All 27 Nakshatras with detailed interpretations.',
    canonical: '/vedic/nakshatra',
    keywords: ['nakshatra calculator', 'birth nakshatra calculator', 'nakshatra by date of birth', 'nakshatra calculator by date of birth', 'nakshatra finder', 'birth star calculator', 'janma nakshatra', 'nakshatra pada', 'my nakshatra', 'tara bala', '27 nakshatras', 'free nakshatra calculator'],
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
    title: 'Free KP Astrology Calculator — Sub-Lord & Significator Chart',
    description:
      'Free KP astrology calculator — Krishnamurti Paddhati sub-lord table, significators, ruling planets & house cusps. Placidus system with KP Ayanamsa. No signup required.',
    canonical: '/vedic/kp',
    keywords: ['kp astrology calculator', 'kp chart calculator', 'kp significator calculator', 'kp system', 'sub lord calculator', 'krishnamurti paddhati', 'kp astrology', 'ruling planets', 'kp horary chart'],
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
    title: 'Shubh Muhurat Finder (शुभ मुहूर्त) — Marriage & Griha Pravesh',
    description:
      'Free Shubh Muhurat finder for marriage, griha pravesh, naamkaran & 20+ activities. Checks Tithi, Nakshatra, Rahu Kaal & Abhijit Muhurta.',
    canonical: '/vedic/muhurta',
    keywords: ['shubh muhurat today', 'shubh muhurat for marriage', 'vivah muhurat 2027', 'griha pravesh muhurta', 'rahu kaal today', 'auspicious time today', 'muhurta today', 'muhurta finder', 'marriage muhurta', 'naamkaran muhurta', 'abhijit muhurta'],
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
    title: 'Free Ashtakavarga Calculator — BAV & SAV Bindu Points',
    description:
      'Free Ashtakavarga calculator with Bhinna (BAV) and Sarva (SAV) Bindu tables for all 7 planets. Identify strong and weak houses for transit predictions.',
    canonical: '/vedic/ashtakavarga',
    keywords: ['ashtakavarga calculator', 'free ashtakavarga calculator', 'BAV SAV calculator', 'bindu points', 'ashtakavarga chart', 'sarvashtakavarga'],
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
    title: 'Free Kundli Matching — Ashtakoota Gun Milan (36 Points)',
    description:
      'Free Kundli matching calculator with Ashtakoota (8-factor) Gun Milan. Check Nadi, Bhakoot, Gana, Maitri, Yoni, Tara, Vashya & Varna scores out of 36 points.',
    canonical: '/vedic/compatibility',
    keywords: ['free kundli matching', 'kundli matching online free', 'kundli milan', 'gun milan', 'ashtakoota matching', '36 guna milan calculator', 'marriage compatibility', 'horoscope matching for marriage', 'nadi dosha', 'mangal dosha matching', 'free kundli matching for marriage'],
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
    keywords: ['shadbala calculator', 'free shadbala calculator', 'planetary strength', 'shashtiamsa', 'ishta phala', 'vimsopaka bala'],
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
    keywords: ['jaimini astrology', 'chara karaka', 'atmakaraka', 'atmakaraka calculator', 'darakaraka', 'darakaraka calculator', 'karakamsha', 'chara dasha', 'upapada lagna', 'arudha pada', 'amatyakaraka'],
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
    keywords: ['career astrology', 'free career prediction', 'job prediction astrology', 'career prediction by date of birth free', 'career horoscope', 'job kab milegi', '10th house career', 'dasamsa chart', 'profession astrology', 'career change astrology'],
    seoIntro: {
      heading: 'Career Analysis in Vedic Astrology',
      text: 'Career analysis in Vedic astrology examines the 10th house (Karma Bhava), its lord, planets placed there, and the Dasamsa (D10) divisional chart. The 10th house represents public life, profession, authority, and reputation. Key indicators include the 10th lord\'s sign placement, aspects from benefics/malefics, and Dasha timing for career changes. The Amatyakaraka (Jaimini career significator), strong planets in the D10, and Shadbala strength of the 10th lord all contribute to a comprehensive career prediction.',
    },
    faqs: [
      { question: 'Can astrology predict my career?', answer: 'Yes. Vedic astrology analyzes the 10th house (profession), its lord, planets placed there, the Dasamsa (D10) divisional chart, and the Amatyakaraka (Jaimini career significator) to identify career aptitude, ideal professions, and timing of career changes through Dasha periods.' },
      { question: 'When will I get a job? (Job kab milegi?)', answer: 'Job timing depends on the activation of the 10th house lord through Dasha periods. When the Mahadasha or Antardasha of the 10th lord, or planets connected to the 10th house, become active — and transiting Jupiter or Saturn aspects the 10th house — that period is most likely to bring a job or career change.' },
      { question: 'Which planet is responsible for career success?', answer: 'Saturn rules career and hard work. Sun gives authority and government positions. Mercury governs business and communication. Jupiter rules education, law, and finance. Mars indicates engineering, military, and surgery. Venus governs arts, luxury, and hospitality. The strongest of these in your 10th house or D10 chart indicates your career direction.' },
      { question: 'What is the best career according to my birth chart?', answer: 'Your ideal career is determined by the 10th lord\'s sign and Nakshatra, planets in the 10th house, the Dasamsa (D10) chart, and the Amatyakaraka planet. For example, Sun in the 10th suggests government or leadership, Mercury suggests business or writing, and Jupiter suggests teaching, law, or banking.' },
    ],
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
    keywords: ['wealth astrology', 'free wealth astrology', 'dhana yoga', 'indu lagna', 'financial astrology', 'money prediction'],
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
    keywords: ['health astrology', 'free health astrology', 'longevity prediction', 'maraka lord', 'ayush calculator', 'medical astrology'],
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
    keywords: ['nadi astrology', 'free nadi astrology', 'bhrigu bindu calculator', 'pranapada lagna', 'gulika', 'nadi amsha'],
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
    title: 'Manglik Dosha Calculator — Free Mangal Dosha Check Online',
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
    title: 'Free Navamsa Chart Calculator — D9 Marriage & Dharma Analysis',
    description:
      'Free Navamsa (D9) chart calculator with Vargottama status, Navamsa Lagna, planet dignities, and marriage/dharma analysis. Instant D9 chart from birth details.',
    canonical: '/vedic/navamsa',
    keywords: ['navamsa chart calculator', 'free navamsa chart calculator', 'D9 chart calculator', 'navamsa chart free', 'navamsa lagna', 'vargottama planets', 'navamsa chart marriage', 'D9 chart interpretation', 'free D9 chart'],
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
    title: 'Free Sade Sati Calculator (साढ़े साती) — Saturn Transit Check',
    description:
      'Free Sade Sati calculator by date of birth — check if Shani Sade Sati is running, current phase (rising/peak/setting), Dhaiya, Kantaka Shani & Saturn transit remedies.',
    canonical: '/vedic/sade-sati',
    keywords: ['sade sati calculator', 'current sade sati', 'saturn transit calculator', 'shani sade sati', 'sade sati by date of birth', 'is sade sati running', 'saturn transit', 'kantaka shani', 'dhaiya calculator', 'ashtama shani', 'sade sati for moon sign'],
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
  hora: {
    title: 'Hora Today — Planetary Hours for Today (Free Calculator)',
    description:
      'Check today\'s Hora timings — all 24 planetary hours from sunrise to next sunrise for your location. Know the ruling planet for every hour to plan auspicious activities.',
    canonical: '/vedic/hora',
    keywords: ['hora today', 'hora calculator', 'planetary hours today', 'hora timings', 'hora chart today', 'vedic hora', 'today hora', 'aaj ka hora', 'hora table', 'shubh hora'],
    seoIntro: {
      heading: 'What is Hora? Planetary Hours in Vedic Astrology',
      text: 'Hora is the Vedic system of planetary hours where each hour of the day and night is ruled by one of the 7 classical planets. The sequence starts from the weekday lord — Sun on Sunday, Moon on Monday, Mars on Tuesday, Mercury on Wednesday, Jupiter on Thursday, Venus on Friday, Saturn on Saturday — and cycles through Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars. Each day has 12 day horas (sunrise to sunset) and 12 night horas (sunset to next sunrise), totaling 24 periods. Knowing the current Hora helps choose the right time for important activities: Sun Hora for authority and government work, Jupiter Hora for education and spirituality, Venus Hora for romance and creativity, Mercury Hora for business and communication, Moon Hora for travel and public dealing, Mars Hora for courage and surgery, and Saturn Hora for iron/oil trade and labor.',
    },
    faqs: [
      { question: 'What is Hora in Vedic astrology?', answer: 'Hora is a Vedic system dividing each day into 24 planetary hours (12 day + 12 night), each ruled by one of the 7 classical planets: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn. The sequence depends on the weekday.' },
      { question: 'Which Hora is best for starting new work?', answer: 'Jupiter Hora is best for education, religious work, and new ventures. Mercury Hora is ideal for business and trade. Sun Hora suits government work. Venus Hora is best for creative pursuits and romantic matters.' },
      { question: 'How is Hora calculated?', answer: 'Day Horas divide sunrise-to-sunset into 12 equal parts. Night Horas divide sunset-to-next-sunrise into 12 equal parts. The first Hora starts with the weekday lord, then cycles: Sun→Venus→Mercury→Moon→Saturn→Jupiter→Mars.' },
      { question: 'Is Saturn Hora always bad?', answer: 'No. Saturn Hora is considered good for activities related to iron, oil, agriculture, labor, real estate, and dealing with servants. It is unfavorable for starting new ventures, journeys, or auspicious ceremonies.' },
    ],
    howTo: {
      name: 'How to Check Today\'s Hora',
      description: 'Find the current planetary hour and plan your activities.',
      steps: [
        { name: 'Allow location access', text: 'Grant location access for accurate sunrise/sunset times, or the calculator defaults to New Delhi.' },
        { name: 'View current Hora', text: 'The current active Hora is highlighted with the ruling planet and time remaining.' },
        { name: 'Check the full table', text: 'See all 24 Hora periods (12 day + 12 night) with their ruling planets and time ranges.' },
        { name: 'Plan your activity', text: 'Choose the Hora matching your activity — Jupiter for education, Mercury for business, Venus for romance, Sun for authority.' },
      ],
    },
    relatedTools: [
      { href: '/vedic/choghadiya', label: 'Choghadiya Today' },
      { href: '/vedic/muhurta', label: 'Muhurta Finder' },
      { href: '/vedic/panchang', label: 'Daily Panchang' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
    ],
  },
  choghadiya: {
    title: 'Free Choghadiya Today (चौघड़िया) — Shubh Muhurat Timings',
    description:
      'Today\'s Choghadiya (चौघड़िया) — day & night muhurat timings with Amrit, Shubh, Labh, Char, Kaal, Rog & Udveg. Rahu Kaal overlay. Free for any location.',
    canonical: '/vedic/choghadiya',
    keywords: ['choghadiya', 'choghadiya today', 'today choghadiya', 'din ka choghadiya', 'shubh choghadiya', 'aaj ka choghadiya', 'choghadiya table', 'raat ka choghadiya', 'choghadiya mumbai', 'choghadiya delhi'],
    seoIntro: {
      heading: 'What is Choghadiya?',
      text: 'Choghadiya (चौघड़िया, also spelled Chogadia or Chaughadia) is a Vedic time-division system that splits each day and night into 8 equal periods, each ruled by a planet. The 7 types — Udveg (Sun), Char (Venus), Labh (Mercury), Amrit (Moon), Kaal (Saturn), Shubh (Jupiter), and Rog (Mars) — cycle in a fixed order starting from the Vara (weekday) lord. Amrit is the most auspicious for all activities, Shubh and Labh are good, Char suits travel, while Kaal, Rog, and Udveg are inauspicious (though Kaal Choghadiya is considered good for wealth). Day Choghadiya (din ka choghadiya) runs from sunrise to sunset and night Choghadiya (raat ka choghadiya) runs from sunset to next sunrise, with each period lasting roughly 90 minutes depending on the day length. This calculator shows today\'s Choghadiya table for your location based on actual sunrise and sunset times.',
    },
    faqs: [
      { question: 'What is Choghadiya and how is it calculated?', answer: 'Choghadiya divides daytime (sunrise to sunset) and nighttime (sunset to next sunrise) into 8 equal periods each. Each period is assigned one of 7 types (Udveg, Char, Labh, Amrit, Kaal, Shubh, Rog) based on the weekday. The starting type depends on the Vara lord.' },
      { question: 'Which Choghadiya is best for starting new work?', answer: 'Amrit Choghadiya (ruled by Moon) is the most auspicious for all activities. Shubh (Jupiter) is ideal for marriage, education, and religious work. Labh (Mercury) is best for starting a business or education. Char (Venus) suits travel and cultural activities.' },
      { question: 'Is Kaal Choghadiya always bad?', answer: 'While Kaal Choghadiya (ruled by Saturn) is generally inauspicious, it is considered favorable for wealth-related activities, debt collection, and dealing with property. Avoid starting new ventures or journeys during this period.' },
      { question: 'What is the difference between Choghadiya and Muhurta?', answer: 'Choghadiya is a simpler daily timing system based on weekday and sunrise/sunset. Muhurta (Electional Astrology) is more detailed, considering Tithi, Nakshatra, Yoga, Karana, and planetary positions for specific activities like marriage or griha pravesh.' },
      { question: 'What is Din Ka Choghadiya and Raat Ka Choghadiya?', answer: 'Din Ka Choghadiya (day Choghadiya) covers the 8 muhurat periods from sunrise to sunset. Raat Ka Choghadiya (night Choghadiya) covers the 8 periods from sunset to next sunrise. Both follow the same 7-type cycle but start from different lords based on the weekday.' },
      { question: 'How long does each Choghadiya period last?', answer: 'Each day Choghadiya period lasts one-eighth of the total daytime (sunrise to sunset), and each night period lasts one-eighth of the total nighttime. On average this is about 90 minutes, but the exact duration varies by season and location since day and night lengths change throughout the year.' },
    ],
    howTo: {
      name: 'How to Check Today\'s Choghadiya',
      description: 'Find the current Choghadiya muhurat and plan your activities for the day.',
      steps: [
        { name: 'Allow location access', text: 'Grant location access for accurate sunrise and sunset times based on your city, or the calculator defaults to New Delhi.' },
        { name: 'View current period', text: 'The currently active Choghadiya period is highlighted with its type (Amrit, Shubh, Labh, etc.) and the time remaining.' },
        { name: 'Check day and night tables', text: 'See all 8 day Choghadiya periods (sunrise to sunset) and 8 night Choghadiya periods (sunset to next sunrise) with their types and time ranges.' },
        { name: 'Plan your activity', text: 'Choose Amrit for any important work, Shubh for ceremonies, Labh for business, or Char for travel. Avoid Kaal, Rog, and Udveg for new ventures.' },
      ],
    },
    relatedTools: [
      { href: '/vedic/muhurta', label: 'Muhurta Finder' },
      { href: '/vedic/panchang', label: 'Daily Panchang' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
      { href: '/vedic/nakshatra', label: 'Nakshatra Analysis' },
    ],
  },
  atmakaraka: {
    title: 'Atmakaraka Calculator — Free Soul Planet Finder (Jaimini)',
    description:
      'Free Atmakaraka calculator — find your soul planet and all 7 Jaimini Chara Karakas ranked by degree. Discover your Atmakaraka meaning, Navamsa placement & spiritual path.',
    canonical: '/vedic/atmakaraka',
    keywords: ['atmakaraka calculator', 'atmakaraka meaning', 'soul planet astrology', 'chara karaka calculator', 'jaimini karaka', 'atmakaraka in navamsa', 'free atmakaraka calculator'],
    seoIntro: {
      heading: 'What is Atmakaraka?',
      text: 'The Atmakaraka (AK) is the planet with the highest degree in any sign in your birth chart — it represents your soul\'s deepest desire and the lesson it must master in this lifetime. In Jaimini astrology, the 7 visible planets (Sun through Saturn) are ranked by their degrees within their sign, creating the Chara Karakas: Atmakaraka (soul), Amatyakaraka (career), Bhratrikaraka (siblings), Matrikaraka (mother), Putrakaraka (children), Gnatikaraka (rivals), and Darakaraka (spouse). The Atmakaraka\'s placement in the Navamsa (D9) chart — called the Karakamsha — reveals your soul\'s true purpose, Ishta Devata (personal deity), and spiritual direction.',
    },
    faqs: [
      { question: 'What is the Atmakaraka in Vedic astrology?', answer: 'The Atmakaraka is the planet with the highest degree in any sign in your birth chart. It is the soul significator in Jaimini astrology, revealing your deepest karmic lessons, desires, and the area of life where spiritual growth occurs.' },
      { question: 'How is Atmakaraka calculated?', answer: 'List the degree (0-30°) of each of the 7 planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn) within their respective signs. The planet with the highest degree becomes the Atmakaraka. Rahu may be included by counting 30° minus its degree.' },
      { question: 'What does each planet mean as Atmakaraka?', answer: 'Sun AK = learning humility; Moon AK = emotional detachment; Mars AK = controlling aggression; Mercury AK = truthful speech; Jupiter AK = respecting tradition; Venus AK = moderation in desires; Saturn AK = patience and endurance.' },
      { question: 'What is the Karakamsha and why does it matter?', answer: 'The Karakamsha is the sign your Atmakaraka occupies in the Navamsa (D9) chart. It reveals your soul\'s true calling, career direction, and spiritual path. The 12th house from the Karakamsha indicates your Ishta Devata (personal deity).' },
    ],
    relatedTools: [
      { href: '/vedic/jaimini', label: 'Jaimini Astrology' },
      { href: '/vedic/darakaraka', label: 'Darakaraka (Spouse)' },
      { href: '/vedic/karakamsha', label: 'Karakamsha' },
      { href: '/vedic/navamsa', label: 'Navamsa Chart (D9)' },
      { href: '/vedic/career', label: 'Career Analysis' },
    ],
  },
  darakaraka: {
    title: 'Darakaraka Calculator — Free Spouse Planet Finder (Jaimini)',
    description:
      'Free Darakaraka calculator — find the Jaimini spouse significator planet in your chart. Discover spouse characteristics, appearance, career & marriage timing from Darakaraka.',
    canonical: '/vedic/darakaraka',
    keywords: ['darakaraka calculator', 'darakaraka spouse', 'darakaraka meaning', 'spouse planet astrology', 'jaimini spouse significator', 'darakaraka spouse prediction', 'free darakaraka calculator'],
    seoIntro: {
      heading: 'What is Darakaraka?',
      text: 'The Darakaraka (DK) is the planet with the lowest degree in any sign among the 7 Chara Karakas — it is the Jaimini spouse significator. While the 7th house lord describes the quality of marriage, the Darakaraka specifically describes your spouse: their personality, physical appearance, career, and the nature of the bond you will share. If the Darakaraka is strong (exalted, in own sign, or well-aspected), the spouse will be supportive and accomplished. If afflicted, challenges in partnership are indicated. The Darakaraka\'s Navamsa placement and its connection to the Upapada Lagna provide deeper insights into married life.',
    },
    faqs: [
      { question: 'What is Darakaraka in Jaimini astrology?', answer: 'The Darakaraka is the planet with the lowest degree in any sign among the 7 Chara Karakas (Sun through Saturn). It is the Jaimini significator for spouse and partnership, revealing your partner\'s nature, appearance, and the quality of your marriage.' },
      { question: 'How does Darakaraka describe my spouse?', answer: 'Each planet as Darakaraka indicates different spouse traits: Sun DK = authoritative, dignified spouse; Moon DK = nurturing, emotional; Mars DK = energetic, courageous; Mercury DK = intellectual, communicative; Jupiter DK = wise, traditional; Venus DK = attractive, artistic; Saturn DK = mature, hardworking.' },
      { question: 'What is the difference between Darakaraka and 7th lord?', answer: 'The 7th house lord describes the institution of marriage and its quality. The Darakaraka specifically describes the spouse as a person — their personality, appearance, and nature. Both should be analyzed together for complete marriage analysis.' },
    ],
    relatedTools: [
      { href: '/vedic/atmakaraka', label: 'Atmakaraka (Soul)' },
      { href: '/vedic/compatibility', label: 'Kundli Milan' },
      { href: '/vedic/upapada', label: 'Upapada Lagna' },
      { href: '/vedic/jaimini', label: 'Jaimini Astrology' },
      { href: '/vedic/navamsa', label: 'Navamsa Chart (D9)' },
    ],
  },
  upapada: {
    title: 'Upapada Lagna Calculator — Free Marriage Indicator (Jaimini)',
    description:
      'Free Upapada Lagna (UL) calculator — find the Jaimini marriage indicator from the Arudha of the 12th house. Analyze spouse background, marriage quality & timing.',
    canonical: '/vedic/upapada',
    keywords: ['upapada lagna calculator', 'upapada lagna', 'UL calculator', 'jaimini marriage indicator', 'arudha 12th house', 'free upapada calculator'],
    seoIntro: {
      heading: 'What is Upapada Lagna?',
      text: 'Upapada Lagna (UL) is the Arudha Pada of the 12th house — it is one of the most important marriage indicators in Jaimini astrology. While the 7th house shows the nature of partnership and the Darakaraka describes the spouse, the Upapada Lagna reveals the circumstances of marriage: the spouse\'s family background, social status, and the conditions under which marriage occurs. Planets aspecting or conjoining the UL modify these indications. The 2nd house from UL (called Gaunapada) sustains the marriage — malefics here or its lord\'s affliction can indicate separation.',
    },
    faqs: [
      { question: 'How is Upapada Lagna calculated?', answer: 'Upapada Lagna is the Arudha Pada of the 12th house. Find the lord of the 12th house from the Ascendant, then count the same distance from the lord\'s position. If the result falls in the 12th house itself or the 6th from it, special exception rules apply.' },
      { question: 'What does Upapada Lagna show about marriage?', answer: 'UL reveals the circumstances of marriage — spouse\'s family background, social status, and marriage conditions. Benefics in UL indicate a harmonious union; malefics suggest challenges. The 2nd from UL (Gaunapada) determines if the marriage sustains.' },
      { question: 'What is the difference between Upapada and 7th house?', answer: 'The 7th house describes partnership as a life area. Upapada Lagna specifically shows how the marriage manifests in the world — the external reality of the union, the spouse\'s social standing, and the sustainability of the bond.' },
    ],
    relatedTools: [
      { href: '/vedic/darakaraka', label: 'Darakaraka (Spouse)' },
      { href: '/vedic/compatibility', label: 'Kundli Milan' },
      { href: '/vedic/arudha-pada', label: 'Arudha Padas' },
      { href: '/vedic/jaimini', label: 'Jaimini Astrology' },
    ],
  },
  karakamsha: {
    title: 'Karakamsha Calculator — Free Soul Purpose Analysis (Jaimini)',
    description:
      'Free Karakamsha calculator — find your Atmakaraka\'s Navamsa sign to reveal spiritual purpose, career direction & Ishta Devata (personal deity) in Jaimini astrology.',
    canonical: '/vedic/karakamsha',
    keywords: ['karakamsha calculator', 'karakamsha lagna', 'atmakaraka navamsa', 'ishta devata calculator', 'jaimini career', 'soul purpose astrology', 'free karakamsha calculator'],
    seoIntro: {
      heading: 'What is Karakamsha?',
      text: 'The Karakamsha is the sign occupied by the Atmakaraka (soul planet) in the Navamsa (D9) chart — it is placed in the birth chart (D1) as a reference lagna to read soul-level indications. The houses from the Karakamsha reveal: career direction (10th from KK), spiritual practice (5th from KK), Ishta Devata or personal deity (12th from KK), and the soul\'s accumulated wisdom (1st house itself). Jaimini Sutras provide detailed results for each planet placed in or aspecting the Karakamsha. This is distinct from Swamsha, which reads the Karakamsha within the D9 chart itself.',
    },
    faqs: [
      { question: 'What is the Karakamsha in Jaimini astrology?', answer: 'The Karakamsha is the sign your Atmakaraka (soul planet) occupies in the Navamsa (D9) chart. It serves as a special ascendant revealing your soul\'s purpose, career calling, and spiritual path.' },
      { question: 'How do I find my Ishta Devata from Karakamsha?', answer: 'The 12th house from the Karakamsha indicates your Ishta Devata (personal deity). The planet in or ruling the 12th from KK determines which deity: Sun = Shiva, Moon = Gouri, Mars = Skanda, Mercury = Vishnu, Jupiter = Samba Shiva, Venus = Lakshmi, Saturn = Vishnu, Rahu = Durga, Ketu = Ganesha.' },
      { question: 'What is the difference between Karakamsha and Swamsha?', answer: 'Karakamsha is the AK\'s Navamsa sign read in the D1 (birth chart). Swamsha is the same sign read within the D9 (Navamsa) itself. Both provide soul-level insights but from different chart perspectives.' },
    ],
    relatedTools: [
      { href: '/vedic/atmakaraka', label: 'Atmakaraka' },
      { href: '/vedic/navamsa', label: 'Navamsa Chart (D9)' },
      { href: '/vedic/jaimini', label: 'Jaimini Astrology' },
      { href: '/vedic/career', label: 'Career Analysis' },
    ],
  },
  'arudha-pada': {
    title: 'Arudha Pada Calculator — Free 12 Bhava Padas (Jaimini)',
    description:
      'Free Arudha Pada calculator — compute all 12 Arudha Padas (A1 through A12) including Arudha Lagna (AL) and Upapada (UL). Understand your public image in Jaimini astrology.',
    canonical: '/vedic/arudha-pada',
    keywords: ['arudha pada calculator', 'arudha lagna calculator', 'arudha pada', 'jaimini arudha', '12 bhava padas', 'AL calculator', 'free arudha pada calculator'],
    seoIntro: {
      heading: 'What are Arudha Padas?',
      text: 'Arudha Padas are special Jaimini reference points that show how each house of the birth chart manifests in the external world — the "public perception" or "maya" of each life area. For each of the 12 houses, the Arudha Pada is calculated by finding the lord of that house and counting the same distance from the lord\'s position. The most important Arudha is the Arudha Lagna (A1 or AL) — it shows your public image, reputation, and how the world perceives you, which may differ significantly from your true Lagna (Ascendant). Other key Arudhas include A7 (Darapada — public perception of partnerships), A10 (Rajapada — career reputation), and A12 (Upapada — marriage manifestation).',
    },
    faqs: [
      { question: 'What is Arudha Pada in Jaimini astrology?', answer: 'Arudha Pada is the external manifestation or "illusion" (Maya) of each house. It shows how the world perceives that area of your life, which may differ from the internal reality shown by the house itself. Each of the 12 houses has its own Arudha Pada.' },
      { question: 'How is Arudha Pada calculated?', answer: 'For any house: (1) Find the lord of that house. (2) Count how many signs the lord is from the house sign. (3) Count the same number of signs from the lord\'s position. That sign is the Arudha Pada. Exception: if the result falls in the original house or the 7th from it, move 10 signs forward.' },
      { question: 'What is the difference between Arudha Lagna and regular Lagna?', answer: 'The regular Lagna (Ascendant) shows your true nature, health, and personality. The Arudha Lagna (AL) shows your public image — how others perceive you, your social status, and reputation. A person can have a weak Lagna but strong AL, appearing successful outwardly.' },
    ],
    relatedTools: [
      { href: '/vedic/upapada', label: 'Upapada Lagna (A12)' },
      { href: '/vedic/atmakaraka', label: 'Atmakaraka' },
      { href: '/vedic/jaimini', label: 'Jaimini Astrology' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
    ],
  },
  varshphal: {
    title: 'Varshphal Calculator — Free Annual Horoscope (Solar Return)',
    description:
      'Free Varshphal (Annual Horoscope) calculator — Solar Return chart with Muntha, Year Lord, Tajaka Yogas & Sahams. Vedic annual prediction for your current year.',
    canonical: '/vedic/varshphal',
    keywords: ['varshphal calculator', 'annual horoscope calculator', 'solar return chart', 'varshaphal', 'muntha', 'tajaka yoga', 'year lord calculator', 'vedic annual prediction', 'free varshphal calculator'],
    seoIntro: {
      heading: 'What is Varshphal?',
      text: 'Varshphal (also spelled Varshaphal) is the Vedic annual horoscope system based on the Solar Return — the exact moment the Sun returns to its natal position each year. Derived from the Tajaka tradition (Indo-Persian astrology), it provides detailed predictions for the year ahead. Key components include the Muntha (a progressed ascendant advancing one sign per year), the Varsha Pati (Year Lord — the planet with the most influence on that year), and Tajaka Yogas (annual combination patterns like Ithasala, Ishrafa, Kamboola, and Nakta). Sahams are sensitive points for specific life themes. This system complements Vimshottari Dasha by providing year-specific detail.',
    },
    faqs: [
      { question: 'What is Varshphal in Vedic astrology?', answer: 'Varshphal is the Vedic annual prediction system based on the Solar Return chart — cast for the exact moment the Sun returns to its birth position each year. It reveals the themes, opportunities, and challenges of that specific year.' },
      { question: 'What is Muntha in Varshphal?', answer: 'Muntha is a progressed point that advances one sign per year from the Ascendant. Its sign placement and the planets aspecting it indicate the dominant theme of the year. Muntha in a Kendra or Trikona from the annual Ascendant is favorable.' },
      { question: 'What are Tajaka Yogas?', answer: 'Tajaka Yogas are annual chart combinations from the Indo-Persian tradition: Ithasala (applying aspect — promises fulfillment), Ishrafa (separating aspect — missed opportunity), Kamboola (Moon transfers light), and Nakta (hidden opportunity). They predict whether specific desires manifest that year.' },
    ],
    relatedTools: [
      { href: '/vedic/predictions', label: 'Predictions & Prashna' },
      { href: '/vedic/dashas', label: 'Dasha Timeline' },
      { href: '/vedic/transits', label: 'Planetary Transits' },
      { href: '/vedic/kundli', label: 'Birth Chart (Kundli)' },
    ],
  },
};

/* ──────────────────────────────────────────────────────────────────────────
 * Locale-specific title & description overrides.
 * When a visitor arrives via /hi/vedic/dashas the middleware sets x-locale=hi.
 * buildVedicMetadata reads that header and returns the correct locale copy.
 * Only pages with locale entries get translated metadata; the rest fall back
 * to the English defaults in VEDIC_SEO.
 * ────────────────────────────────────────────────────────────────────────── */
export const VEDIC_SEO_LOCALES: Record<string, Record<string, { title: string; description: string }>> = {
  /* ── Hindi (hi) ────────────────────────────────────────────────────────── */
  hi: {
    kundli: {
      title: 'फ्री जन्म कुंडली (कुंडली) कैलकुलेटर — ऑनलाइन जन्मपत्री बनाएं',
      description: 'मुफ्त ऑनलाइन कुंडली कैलकुलेटर — NASA JPL डेटा और लाहिरी अयनांश से सटीक जन्म कुंडली, ग्रह स्थिति, दशा और योग। तुरंत जन्मपत्री बनाएं।',
    },
    dashas: {
      title: 'फ्री दशा कैलकुलेटर (दशा) — 16 पद्धतियाँ, महादशा तिथियाँ',
      description: 'मुफ्त दशा कैलकुलेटर — विंशोत्तरी, योगिनी, अष्टोत्तरी सहित 16 दशा पद्धतियाँ। महादशा, अंतर्दशा और प्रत्यंतर्दशा तिथियाँ तुरंत देखें।',
    },
    yogas: {
      title: 'फ्री योग और दोष कैलकुलेटर (योग दोष) — राजयोग जाँच',
      description: 'मुफ्त योग-दोष कैलकुलेटर — राजयोग, धनयोग, कालसर्प दोष, मांगलिक दोष सहित 60+ शास्त्रीय योगों की जाँच। NASA JPL सटीक गणना।',
    },
    nakshatra: {
      title: 'फ्री नक्षत्र कैलकुलेटर (नक्षत्र) — जन्म नक्षत्र खोजें',
      description: 'मुफ्त नक्षत्र कैलकुलेटर — जन्म तिथि से 27 नक्षत्रों में आपका जन्म नक्षत्र, चरण, नामाक्षर और स्वामी ग्रह तुरंत जानें।',
    },
    compatibility: {
      title: 'फ्री कुंडली मिलान (गुण मिलान) — अष्टकूट स्कोर',
      description: 'मुफ्त कुंडली मिलान कैलकुलेटर — 36 में से अष्टकूट गुण मिलान, मांगलिक दोष जाँच और विवाह अनुकूलता रिपोर्ट। सटीक गुण मिलान करें।',
    },
    panchang: {
      title: 'आज का पंचांग — तिथि, नक्षत्र, शुभ मुहूर्त',
      description: 'आज का पंचांग — तिथि, वार, नक्षत्र, योग, करण और शुभ-अशुभ समय। चौघड़िया, राहुकाल और होरा सहित दैनिक पंचांग।',
    },
    choghadiya: {
      title: 'आज का चौघड़िया (चौघड़िया) — शुभ मुहूर्त समय',
      description: 'आज का चौघड़िया — दिन और रात का चौघड़िया, शुभ-लाभ-अमृत समय, राहुकाल। मुंबई, दिल्ली, जयपुर सभी शहरों के लिए मुफ्त चौघड़िया।',
    },
    'sade-sati': {
      title: 'फ्री साढ़े साती कैलकुलेटर — शनि साढ़े साती की स्थिति जानें',
      description: 'मुफ्त साढ़े साती कैलकुलेटर — जन्म कुंडली से शनि साढ़े साती शुरू, मध्य और अंत की तिथियाँ। उपाय और प्रभाव जानें।',
    },
    'mangal-dosha': {
      title: 'फ्री मांगलिक दोष कैलकुलेटर — मंगल दोष जाँच',
      description: 'मुफ्त मांगलिक दोष कैलकुलेटर — जन्म कुंडली से मंगल दोष है या नहीं, तुरंत जानें। दोष निवारण के उपाय और विवाह पर प्रभाव।',
    },
    muhurta: {
      title: 'शुभ मुहूर्त कैलकुलेटर — विवाह मुहूर्त, गृह प्रवेश',
      description: 'मुफ्त शुभ मुहूर्त कैलकुलेटर — विवाह, गृह प्रवेश, नामकरण और व्यापार के लिए शास्त्रोक्त शुभ मुहूर्त खोजें।',
    },
    hora: {
      title: 'आज का होरा (होरा) — ग्रह होरा समय सारणी',
      description: 'आज का होरा — सूर्योदय से सूर्यास्त तक प्रत्येक घंटे का ग्रह स्वामी। शुभ होरा में कार्य करें, मुफ्त होरा कैलकुलेटर।',
    },
    navamsa: {
      title: 'फ्री नवमांश (D9) कैलकुलेटर — विवाह और भाग्य चार्ट',
      description: 'मुफ्त नवमांश कुंडली (D9 चार्ट) कैलकुलेटर — विवाह, जीवनसाथी और धर्म भाग्य का सटीक विश्लेषण। NASA डेटा आधारित।',
    },
    'kaal-sarp-dosha': {
      title: 'फ्री कालसर्प दोष कैलकुलेटर — राहु-केतु दोष जाँच',
      description: 'मुफ्त कालसर्प दोष कैलकुलेटर — 12 प्रकार के कालसर्प दोष की जाँच, प्रभाव और निवारण उपाय। जन्म कुंडली से तुरंत जानें।',
    },
  },

  /* ── Nepali (ne) ───────────────────────────────────────────────────────── */
  ne: {
    kundli: {
      title: 'नि:शुल्क जन्म कुण्डली क्यालकुलेटर — अनलाइन चिना बनाउनुहोस्',
      description: 'नि:शुल्क जन्म कुण्डली क्यालकुलेटर — NASA JPL डेटा र लाहिरी अयनांशबाट सटीक जन्म कुण्डली, ग्रह स्थिति र दशा। तुरुन्तै कुण्डली बनाउनुहोस्।',
    },
    dashas: {
      title: 'नि:शुल्क दशा क्यालकुलेटर — १६ पद्धति, महादशा मिति',
      description: 'नि:शुल्क दशा क्यालकुलेटर — विंशोत्तरी, योगिनी सहित १६ दशा पद्धति। महादशा, अन्तर्दशा र प्रत्यन्तर्दशा मिति तुरुन्तै हेर्नुहोस्।',
    },
    nakshatra: {
      title: 'नि:शुल्क नक्षत्र क्यालकुलेटर — जन्म नक्षत्र पत्ता लगाउनुहोस्',
      description: 'नि:शुल्क नक्षत्र क्यालकुलेटर — जन्म मितिबाट २७ नक्षत्रमा तपाईंको जन्म नक्षत्र, चरण र नामाक्षर तुरुन्तै पत्ता लगाउनुहोस्।',
    },
    compatibility: {
      title: 'नि:शुल्क कुण्डली मिलान — गुण मिलान र विवाह अनुकूलता',
      description: 'नि:शुल्क कुण्डली मिलान क्यालकुलेटर — ३६ गुण अष्टकूट मिलान, मांगलिक दोष जाँच र विवाह अनुकूलता रिपोर्ट।',
    },
    panchang: {
      title: 'आजको पञ्चाङ्ग — तिथि, नक्षत्र, शुभ साइत',
      description: 'आजको नेपाली पञ्चाङ्ग — तिथि, वार, नक्षत्र, योग, करण र शुभ-अशुभ समय। राहुकाल र शुभ साइत सहित।',
    },
  },

  /* ── Portuguese (pt) ───────────────────────────────────────────────────── */
  pt: {
    kundli: {
      title: 'Mapa Astral Grátis (Carta Natal) — Calculadora Online',
      description: 'Calculadora de mapa astral gratuita — ascendente, planetas, casas e aspectos com efemérides NASA JPL. Gere seu mapa astral védico completo online.',
    },
    dashas: {
      title: 'Calculadora de Dasha Grátis — 16 Sistemas, Mahadasha',
      description: 'Calculadora gratuita de Dasha védico — Vimshottari, Yogini e mais 14 sistemas. Veja períodos de Mahadasha e Antardasha com datas exatas.',
    },
    compatibility: {
      title: 'Compatibilidade Astral Grátis — Sinastria Védica',
      description: 'Calculadora de compatibilidade astral gratuita — sinastria védica com Ashtakoot, Gun Milan e análise de Mangal Dosha para casais.',
    },
    nakshatra: {
      title: 'Calculadora de Nakshatra Grátis — Estrela de Nascimento',
      description: 'Calculadora de Nakshatra gratuita — descubra sua estrela de nascimento, pada e símbolo entre os 27 Nakshatras pela data de nascimento.',
    },
    yogas: {
      title: 'Calculadora de Yoga e Dosha Grátis — Raja Yoga',
      description: 'Calculadora gratuita de Yogas e Doshas — verifique Raja Yoga, Dhana Yoga, Kaal Sarp e Mangal Dosha no seu mapa astral védico.',
    },
    panchang: {
      title: 'Panchang de Hoje — Calendário Lunar Védico',
      description: 'Panchang diário gratuito — Tithi, Nakshatra, Yoga, Karana e horários auspiciosos para hoje. Calendário lunar hindu.',
    },
  },

  /* ── Spanish (es) ──────────────────────────────────────────────────────── */
  es: {
    kundli: {
      title: 'Carta Natal Gratis (Kundli) — Calculadora Online',
      description: 'Calculadora de carta natal gratuita — ascendente, planetas, casas y aspectos con efemérides NASA JPL. Genera tu carta astral védica completa.',
    },
    dashas: {
      title: 'Calculadora de Dasha Gratis — 16 Sistemas, Mahadasha',
      description: 'Calculadora gratuita de Dasha védico — Vimshottari, Yogini y 14 sistemas más. Consulta períodos Mahadasha y Antardasha con fechas exactas.',
    },
    compatibility: {
      title: 'Compatibilidad Zodiacal Gratis — Sinastria Védica',
      description: 'Calculadora de compatibilidad astral gratuita — sinastria védica con Ashtakoot, Gun Milan y análisis de Mangal Dosha para parejas.',
    },
    nakshatra: {
      title: 'Calculadora de Nakshatra Gratis — Estrella de Nacimiento',
      description: 'Calculadora de Nakshatra gratuita — descubre tu estrella de nacimiento, pada y símbolo entre los 27 Nakshatras por fecha de nacimiento.',
    },
    yogas: {
      title: 'Calculadora de Yoga y Dosha Gratis — Raja Yoga',
      description: 'Calculadora gratuita de Yogas y Doshas — verifica Raja Yoga, Dhana Yoga, Kaal Sarp y Mangal Dosha en tu carta astral védica.',
    },
    panchang: {
      title: 'Panchang de Hoy — Calendario Lunar Védico',
      description: 'Panchang diario gratuito — Tithi, Nakshatra, Yoga, Karana y horarios auspiciosos para hoy. Calendario lunar hindú.',
    },
  },

  /* ── Japanese (ja) ─────────────────────────────────────────────────────── */
  ja: {
    kundli: {
      title: '無料ホロスコープ計算（クンドリ）— 出生図を作成',
      description: '無料ホロスコープ計算ツール — NASA JPLデータとラヒリ・アヤナムシャによる精密な出生図、惑星配置、ダシャー。ヴェーディック占星術の本格鑑定。',
    },
    dashas: {
      title: '無料ダシャー計算（दशा）— 16システム対応',
      description: '無料ダシャー計算ツール — ヴィムショッタリ、ヨーギニーなど16種のダシャー体系。マハダシャーとアンタルダシャーの正確な期間を表示。',
    },
    compatibility: {
      title: '無料相性占い — ヴェーディック・シナストリー',
      description: '無料ヴェーディック相性占い計算ツール — アシュタクートによる36ポイント評価、マンガル・ドーシャ診断。結婚相性を精密分析。',
    },
    nakshatra: {
      title: '無料ナクシャトラ計算 — 誕生星を調べる',
      description: '無料ナクシャトラ計算ツール — 生年月日から27ナクシャトラのうちあなたの誕生星、パダ、シンボルを瞬時に判定。',
    },
    yogas: {
      title: '無料ヨーガ・ドーシャ計算 — ラージャ・ヨーガ鑑定',
      description: '無料ヨーガ・ドーシャ計算ツール — ラージャ・ヨーガ、ダナ・ヨーガ、カール・サルプ、マンガル・ドーシャなど60以上の配置を鑑定。',
    },
    panchang: {
      title: '今日のパンチャーンガ — ヒンドゥー暦・吉時',
      description: '今日のパンチャーンガ — ティティ、ナクシャトラ、ヨーガ、カラナと吉凶時間帯。毎日更新のヴェーディック暦。',
    },
  },

  /* ── French (fr) ───────────────────────────────────────────────────────── */
  fr: {
    kundli: {
      title: 'Thème Astral Gratuit (Kundli) — Calculateur en Ligne',
      description: 'Calculateur de thème astral gratuit — ascendant, planètes, maisons et aspects avec éphémérides NASA JPL. Carte du ciel védique complète.',
    },
    dashas: {
      title: 'Calculateur Dasha Gratuit — 16 Systèmes, Mahadasha',
      description: 'Calculateur de Dasha védique gratuit — Vimshottari, Yogini et 14 autres systèmes. Consultez les périodes Mahadasha et Antardasha avec dates.',
    },
    compatibility: {
      title: 'Compatibilité Astrologique Gratuite — Synastrie Védique',
      description: 'Calculateur de compatibilité astrologique gratuit — synastrie védique avec Ashtakoot, Gun Milan et analyse du Mangal Dosha.',
    },
    nakshatra: {
      title: 'Calculateur Nakshatra Gratuit — Étoile de Naissance',
      description: 'Calculateur de Nakshatra gratuit — découvrez votre étoile de naissance, pada et symbole parmi les 27 Nakshatras par date de naissance.',
    },
    yogas: {
      title: 'Calculateur Yoga et Dosha Gratuit — Raja Yoga',
      description: 'Calculateur gratuit de Yogas et Doshas — vérifiez Raja Yoga, Dhana Yoga, Kaal Sarp et Mangal Dosha dans votre thème astral védique.',
    },
    panchang: {
      title: 'Panchang du Jour — Calendrier Lunaire Védique',
      description: 'Panchang quotidien gratuit — Tithi, Nakshatra, Yoga, Karana et heures propices du jour. Calendrier lunaire hindou.',
    },
  },

  /* ── Korean (ko) ───────────────────────────────────────────────────────── */
  ko: {
    kundli: {
      title: '무료 출생 차트 계산기 (쿤들리) — 온라인 호로스코프',
      description: '무료 출생 차트 계산기 — NASA JPL 데이터와 라히리 아야남샤 기반 정밀 출생도, 행성 배치, 다샤. 베딕 점성술 본격 감정.',
    },
    dashas: {
      title: '무료 다샤 계산기 — 16개 시스템, 마하다샤 날짜',
      description: '무료 다샤 계산기 — 빔쇼타리, 요기니 등 16가지 다샤 체계. 마하다샤와 안타르다샤의 정확한 기간을 확인하세요.',
    },
    compatibility: {
      title: '무료 궁합 계산기 — 베딕 시나스트리',
      description: '무료 베딕 궁합 계산기 — 아슈타쿳 36포인트 평가, 망갈 도샤 진단. 결혼 궁합을 정밀 분석합니다.',
    },
    nakshatra: {
      title: '무료 낙샤트라 계산기 — 탄생별 찾기',
      description: '무료 낙샤트라 계산기 — 생년월일로 27 낙샤트라 중 당신의 탄생별, 파다, 상징을 즉시 확인하세요.',
    },
    yogas: {
      title: '무료 요가·도샤 계산기 — 라자 요가 감정',
      description: '무료 요가·도샤 계산기 — 라자 요가, 다나 요가, 칼 사르프, 망갈 도샤 등 60가지 이상의 배치를 감정합니다.',
    },
    panchang: {
      title: '오늘의 판창 — 힌두 달력·길일',
      description: '오늘의 판창 — 티티, 낙샤트라, 요가, 카라나와 길흉 시간대. 매일 업데이트되는 베딕 달력.',
    },
  },
};

const SUPPORTED_LOCALES = ['en', 'hi', 'ne', 'pt', 'es', 'ja', 'fr', 'ko'] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const OG_LOCALE_MAP: Record<SupportedLocale, string> = {
  en: 'en_US', hi: 'hi_IN', ne: 'ne_NP', pt: 'pt_BR',
  es: 'es_MX', ja: 'ja_JP', fr: 'fr_FR', ko: 'ko_KR',
};

/** Ensure path has a trailing slash to match next.config.ts `trailingSlash: true`. */
function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

/**
 * Build locale-aware metadata for a vedic page.
 * Reads `x-locale` header set by middleware to pick the right title/description.
 * Falls back to English defaults when no locale override exists.
 *
 * NOTE: Using headers() makes metadata dynamic (blocks prerendering).
 * This is intentional — locale-specific <title> tags are critical for
 * international SEO and worth the trade-off.
 */
export async function buildVedicMetadata(slug: string): Promise<Metadata> {
  const { headers } = await import('next/headers');
  const headersList = await headers();
  const locale = (headersList.get('x-locale') || 'en') as SupportedLocale;

  const seo = VEDIC_SEO[slug];
  if (!seo) return {};

  const localeOverride = VEDIC_SEO_LOCALES[locale]?.[slug];
  const title = localeOverride?.title ?? seo.title;
  const description = localeOverride?.description ?? seo.description;

  const canonical = withTrailingSlash(seo.canonical);
  const localeCanonical = locale === 'en' ? canonical : `/${locale}${canonical}`;
  const ogUrl = `/api/og?tool=${encodeURIComponent(slug)}&title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    keywords: seo.keywords,
    alternates: {
      canonical: localeCanonical,
      languages: {
        'en': canonical,
        'hi': `/hi${canonical}`,
        'ne': `/ne${canonical}`,
        'pt': `/pt${canonical}`,
        'es': `/es${canonical}`,
        'ja': `/ja${canonical}`,
        'fr': `/fr${canonical}`,
        'ko': `/ko${canonical}`,
        'x-default': canonical,
      },
    },
    openGraph: {
      title,
      description,
      url: localeCanonical,
      type: 'website',
      locale: OG_LOCALE_MAP[locale],
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogUrl],
    },
  };
}
