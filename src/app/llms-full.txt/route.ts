const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

const CONTENT = `# Astra — Complete Tool Inventory (205 Vedic Astrology Calculations)

> Free Vedic astrology calculator with 205 Jyotish tools built on BPHS rules and NASA JPL DE-series ephemeris. All calculations run client-side in the browser.

## Calculation Engine

- **Astronomical Backend:** NASA JPL DE-series ephemeris via astronomy-engine for sub-arc-second planetary positions
- **Ayanamsa:** Lahiri (Chitrapaksha), KP (Krishnamurti), and Raman — user-selectable
- **House System:** Whole-sign (Vedic default), Sripati Chalit (Bhava), Placidus (KP)
- **Reference Texts:** Brihat Parashara Hora Shastra (BPHS), Uttara Kalamrita, Jaimini Sutras, Tajaka Shastra

## Birth Chart (Kundli) — ${BASE_URL}/vedic/kundli

1. Complete birth chart generation with all planet positions
2. Ascendant (Lagna) calculation from RAMC and obliquity
3. Sidereal planet positions with rashi, nakshatra, pada, house
4. Whole-sign house system from ascendant rashi
5. Planet dignity: Exalted / Moolatrikona / Own / Friendly / Neutral / Enemy / Debilitated
6. Combustion check with retrograde adjustment
7. Graha Drishti — special aspects for Mars (4/8), Jupiter (5/9), Saturn (3/10)
8. Mutual aspect detection
9. Conjunction detection (tight vs wide orb)
10. Graha Yuddha (planetary war within 1 degree)

## Special Lagnas

11. Hora Lagna — wealth lagna
12. Ghati Lagna — power lagna
13. Bhava Lagna — vitality lagna
14. Indu Lagna — wealth indicator (Uttara Kalamrita)
15. Arudha Pada — Jaimini Arudha with Parashara exception
16. All Arudha Padas (A1–A12)

## Bhava Chalit — ${BASE_URL}/vedic/kundli

17. MC (Medium Coeli) calculation
18. Sripati Chalit with madhya, sandhi, and planet reassignment
19. Moon Chart (Chandra Kundli)
20. Sun Chart (Surya Kundli)

## Planetary Analysis

21. Bala Avastha (5 states by degree)
22. Jagradadi Avastha (3 states: awake/dreaming/sleeping)
23. Deeptadi Avastha (9 states)
24. Natural, Temporal, and Composite Friendships (5-level)

## Nakshatra — ${BASE_URL}/vedic/nakshatra

25. Nakshatra details with index, lord, pada, degree
26. Tara Bala (9-fold cycle)
27. Panchak detection with type
28. Gandanta detection at water-fire junctions
29. Gana, Nadi, Yoni classifications
30. Chandra Bala (Moon strength)
31. Vedha Nakshatra (obstructing pairs)

## Shadbala — ${BASE_URL}/vedic/shadbala

32. Composite Shadbala (6 components summed)
33. Sthana Bala (Uccha + Sapta Vargaja + Ojha-Yugma + Kendradi + Drekkana)
34. Dig Bala (directional strength)
35. Kala Bala (Nathonnatha + Paksha)
36. Cheshta Bala (speed-based)
37. Naisargika Bala (fixed natural values)
38. Drik Bala (aspectual strength)
39. Ishta Phala and Kashta Phala
40. Vimsopaka Bala (20-point scale)
41. Vaiseshikamsa classification
42. Bhava Bala per house

## Jaimini — ${BASE_URL}/vedic/jaimini

43. 7 Chara Karakas (AK to DK)
44. Karakamsha and Swamsha
45. Jaimini Rashi Drishti (sign aspects)
46. Chara Dasha (sign-based timing)
47. Brahma/Maheshwara/Rudra significators
48. Amatyakaraka career indication

## Dashas — ${BASE_URL}/vedic/dashas

49. Vimshottari Dasha (120-year, 9 lords, 3 levels)
50. Current Dasha period finder
51. Yogini Dasha (36-year cycle)
52. Ashtottari Dasha (108-year cycle)
53. Sthira Dasha (fixed sign durations)

## Divisional Charts — ${BASE_URL}/vedic/divisional

54. All 20 Varga charts: D1, D2, D3, D4, D7, D9, D10, D12, D16, D20, D24, D27, D30, D40, D45, D60
55. Standalone Navamsa (D9)
56. Vargottama check (same rashi in D1 and D9)

## Yogas & Doshas — ${BASE_URL}/vedic/yogas

57. Kendra-Trikona Raja Yoga
58. Dharma-Karmadhipati Yoga
59. Gaja Kesari Yoga
60. Pancha Mahapurusha Yogas (Ruchaka/Bhadra/Hamsa/Malavya/Sasa)
61. Budhaditya Yoga
62. Chandra-Mangala Yoga
63. Saraswati Yoga
64. Vipreet Raja Yogas (Harsha/Sarala/Vimala)
65. Dhana Yoga
66. Neecha Bhanga Raja Yoga
67. Lakshmi Yoga
68. Parivartana Yoga (Maha/Khala/Dainya)
69. Amala Yoga, Adhi Yoga
70. Vesi, Vosi, Ubhayachari Yogas
71. Anapha, Sunapha, Durudhara Yogas
72. Kaal Sarp Dosha (12 types)
73. Kemadruma Dosha
74. Guru Chandal Yoga
75. Grahan Dosha, Angarak Dosha
76. Shrapit Dosha, Mangal Dosha
77. Pitru Dosha, Vish Yoga
78. Daridra Yoga, Gandmool Dosha
79. Nadi Dosha assessment

## Panchang — ${BASE_URL}/vedic/panchang

80. Tithi (30 lunar days)
81. Yoga (27 Sun-Moon angular combinations)
82. Karana (11 types)
83. Vara (sunrise-based weekday)
84. Nakshatra with lord and pada
85. Paksha (Shukla/Krishna)
86. Masa (12 lunar months)
87. Samvatsara (60-year cycle)
88. Ayana and Ritu (season)

## Muhurta — ${BASE_URL}/vedic/muhurta

89. Rahu Kalam
90. Yamaganda
91. Gulika Kalam
92. Abhijit Muhurta
93. Brahma Muhurta
94. Dur Muhurta
95. Current Hora (planetary hour)
96. Varjyam and Amrit Kalam
97. Amrit Siddhi Yoga, Ravi Pushya Yoga, Guru Pushya Yoga

## Transits — ${BASE_URL}/vedic/transits

98. Sade Sati detection (3-phase)
99. Kantaka Shani, Ashtama Shani
100. Guru Balam
101. Transit score (composite 30–95)
102. Vedha check with exemptions
103. Double Transit (Jupiter + Saturn)
104. Dhaiya (Small Panoti)

## Ashtakavarga — ${BASE_URL}/vedic/ashtakavarga

105. Bhinna Ashtakavarga (BAV) for 7 planets
106. Sarva Ashtakavarga (SAV)
107. Weak houses identification (SAV < 27)

## KP System — ${BASE_URL}/vedic/kp

108. KP Sub-Lord calculation from unequal nakshatra divisions

## Compatibility — ${BASE_URL}/vedic/compatibility

109. Varna Koota (1 pt)
110. Vashya Koota (2 pts)
111. Tara Koota (3 pts)
112. Yoni Koota (4 pts)
113. Graha Maitri Koota (5 pts)
114. Gana Koota (6 pts)
115. Bhakoot Koota (7 pts)
116. Nadi Koota (8 pts)
117. Full 36-point Ashtakoota score
118. Mangal Dosha comparison

## Applied Analysis

119. Career Analysis — ${BASE_URL}/vedic/career (10th house + D10 + Amatyakaraka)
120. Wealth Analysis — ${BASE_URL}/vedic/wealth (2nd/11th + Indu Lagna + Dhana Yoga)
121. Health Analysis — ${BASE_URL}/vedic/health (Maraka + Badhaka + Ayush tier)

## Predictions — ${BASE_URL}/vedic/predictions

122. Solar Return (binary search for Sun returning to natal degree)
123. Muntha progression
124. Varshaphal (annual horoscope)
125. Punya Saham
126. Prashna Kundli (horary chart)

## Nadi — ${BASE_URL}/vedic/nadi

127. Bhrigu Bindu (Rahu-Moon midpoint)
128. Pranapada Lagna
129. Gulika and Mandi (upagrahas)
130. Nadi Amsha (D150)
131. Bhrigu Nandi pair-wise reading

## Remedies — ${BASE_URL}/vedic/remedies

132. Gemstone recommendations
133. Beej Mantra for all 9 Navagrahas
134. Rudraksha lookup by planet
135. Charity recommendations by day
136. Fasting recommendations
137. Stotra recommendations
138. Expanded remedies (all combined)

## Matrix of Destiny — ${BASE_URL}/matrix/chart

139. Personal octagram with 22 Major Arcana
140. Core energies (Day, Month, Year, Karmic, Soul)
141. Life purposes (Personal, Social, General, Planetary)
142. Love and Money lines
143. Talents (Spiritual, Intellect, Self-Expression)
144. 7-Chakra health card — ${BASE_URL}/matrix/health
145. Age-by-age life timeline — ${BASE_URL}/matrix/timeline
146. Couples compatibility — ${BASE_URL}/matrix/compatibility

## Astronomy Engine

147–205. NASA JPL DE-series ephemeris calculations including tropical/sidereal longitude conversion, planet ecliptic coordinates, planetary speed, Moon speed, mean/true lunar nodes, sunrise/sunset, GMST, obliquity, retrograde station detection, planetary ingress, Sankranti, local mean/sidereal time, and multi-system Ayanamsa support (Lahiri, KP, Raman).
`;

export function GET() {
  return new Response(CONTENT.trim(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
