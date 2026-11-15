# Vedic Astrology (Jyotish) — Complete Reverse Engineered Algorithms (294)

> **Sources analyzed**: `@prisri/jyotish`, `@grahan/vedic`, `vpv-panchangam`, `@ishubhamx/panchangam-js`, `vedic-calc`, `mayaastrolib`, `VedAstro`, AstroSage  
> **Analysis tool**: REA (Reverse Engineer Anything) — 292 files, 194 JS files, 130,959 AST nodes parsed  
> **Astronomical engine**: `astronomy-engine` (NASA JPL DE precision) + Swiss Ephemeris (WASM)  
> **Total algorithms**: 294 across 20 categories

---

## Table of Contents

1. [Birth Chart & Foundational Tools (1-15)](#1-birth-chart--foundational-tools)
2. [Divisional Charts - Shodashvarga (16-31)](#2-divisional-charts--shodashvarga)
3. [Planetary Analysis - Graha Analysis (32-50)](#3-planetary-analysis--graha-analysis)
4. [Nakshatra Analysis (51-65)](#4-nakshatra-analysis)
5. [Dasha Systems (66-83)](#5-dasha-systems)
6. [Yoga Analysis (84-110)](#6-yoga-analysis)
7. [Dosha Analysis (111-125)](#7-dosha-analysis)
8. [Strength Calculation Systems (126-141)](#8-strength-calculation-systems)
9. [Transit Analysis - Gochar (142-156)](#9-transit-analysis--gochar)
10. [Marriage & Relationship Analysis (157-171)](#10-marriage--relationship-analysis)
11. [Career & Business Analysis (172-184)](#11-career--business-analysis)
12. [Wealth & Financial Analysis (185-194)](#12-wealth--financial-analysis)
13. [Health & Longevity Analysis (195-203)](#13-health--longevity-analysis)
14. [Timing & Predictive Astrology (204-214)](#14-timing--predictive-astrology)
15. [Panchang Calculations (215-228)](#15-panchang-calculations)
16. [Muhurta Astrology (229-239)](#16-muhurta-astrology)
17. [Jaimini Astrology (240-255)](#17-jaimini-astrology)
18. [Nadi Astrology & Specialized Methods (256-265)](#18-nadi-astrology--specialized-methods)
19. [Remedial Astrology - Upaya (266-277)](#19-remedial-astrology--upaya)
20. [Advanced Astronomical & Computational Tools (278-294)](#20-advanced-astronomical--computational-tools)

---

## 1. Birth Chart & Foundational Tools

### #1 Janma Kundli (Birth Chart)

The complete birth chart combining ascendant, planetary positions, house assignments, and nakshatra data.

```
Algorithm:
1. Convert birth date/time to UTC
2. Calculate ayanamsa for birth moment (see #279)
3. Calculate Udaya Lagna (Ascendant) from observer coordinates (see #15)
4. Calculate sidereal longitude for all 9 grahas:
   - Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn via astronomy-engine
   - Rahu via Mean Node formula; Ketu = (Rahu + 180) % 360
5. Assign planets to rashis: rashiIndex = floor(siderealLon / 30)
6. Assign planets to houses using house system (Whole Sign default)
7. Calculate nakshatras: nakshatraIndex = floor(siderealLon / 13.333)
8. Calculate padas: pada = floor((siderealLon % 13.333) / 3.333) + 1
9. Detect retrograde, combustion, dignity for each planet
10. Calculate special lagnas, arudha padas, and Vimshottari Dasha
```

### #2 Lagna Chart (Ascendant Chart)

The chart referenced from the Ascendant sign. In Whole Sign, House 1 = the entire sign containing the Ascendant.

```
ascendantRashi = floor(siderealAscendant / 30)  // 0-11
for house 1 to 12:
  houseRashi = (ascendantRashi + house - 1) % 12
  planets_in_house = planets where planet.rashiIndex == houseRashi
```

### #3 Rashi Chart (Zodiac Sign Chart)

```
siderealLongitude = (tropicalLongitude - ayanamsa + 360) % 360
rashiIndex = floor(siderealLongitude / 30)    // 0=Aries to 11=Pisces
degreeInSign = siderealLongitude % 30

Rashi Names: Aries(0), Taurus(1), Gemini(2), Cancer(3), Leo(4), Virgo(5),
             Libra(6), Scorpio(7), Sagittarius(8), Capricorn(9), Aquarius(10), Pisces(11)
```

### #4 Bhava Chalit Chart (House Placement Chart)

Sripati Bhava Chalit -- cusps based on trisection of diurnal/nocturnal arcs, not whole signs.

```
Algorithm (Sripati):
1. madhya[0] = ascendantLongitude           // H1 Madhya = Lagna
2. madhya[6] = (ascLon + 180) % 360         // H7 Madhya = Descendant
3. madhya[9] = MC (Midheaven via LMST)      // H10 Madhya
4. madhya[3] = (MC + 180) % 360             // H4 Madhya = IC

5. Trisect arc from MC to Asc:
   arc = (ascLon - mcLon + 360) % 360
   madhya[10] = (mcLon + arc/3) % 360       // H11
   madhya[11] = (mcLon + 2*arc/3) % 360     // H12

6. Trisect arc from Asc to IC:
   arc2 = (icLon - ascLon + 360) % 360
   madhya[1] = (ascLon + arc2/3) % 360      // H2
   madhya[2] = (ascLon + 2*arc2/3) % 360    // H3

7. Opposite houses: madhya[4] = (madhya[10]+180)%360, etc.

8. Sandhi (border) = midpoint between consecutive madhyas:
   sandhi[i] = midpoint(madhya[i-1], madhya[i])

9. Planet assignment: planet in bhava where sandhi[start] <= planetLon < sandhi[end]

10. Shift detection:
    rashiHouse = whole-sign house from D1
    chalitHouse = bhava from Chalit
    shift = chalitHouse - rashiHouse (clamped to -1, 0, +1)
```

### #5 Moon Chart (Chandra Kundli)

The chart with Moon's rashi as the 1st house.

```
moonRashi = floor(moonSiderealLon / 30)  // 0-11
for house 1 to 12:
  houseRashi = (moonRashi + house - 1) % 12
  planets_in_house = planets where planet.rashiIndex == houseRashi
```

### #6 Sun Chart (Surya Kundli)

The chart with Sun's rashi as the 1st house.

```
sunRashi = floor(sunSiderealLon / 30)
for house 1 to 12:
  houseRashi = (sunRashi + house - 1) % 12
  planets_in_house = planets where planet.rashiIndex == houseRashi
```

### #7 Arudha Lagna

The projected public persona point, calculated via Jaimini Arudha Pada formula.

```
Algorithm:
1. houseSign = (lagnaRashi + house - 1) % 12  // for house=1 -> lagna sign
2. lord = RASHI_LORDS[houseSign]
3. lordSign = sign where lord is placed (0-11)
4. distance D = ((lordSign - houseSign + 12) % 12) + 1
5. padaSign = (lordSign + D - 1) % 12

Exception (Parashara/Jaimini):
6. relFromHouse = ((padaSign - houseSign + 12) % 12) + 1
7. if relFromHouse == 1 OR relFromHouse == 7:
     padaSign = (padaSign + 9) % 12    // shift 10 houses forward

Arudha Lagna (AL) = pada of House 1
```

### #8 Upapada Lagna

```
Upapada Lagna (UL) = Arudha Pada of House 12 (A12)

Same algorithm as #7 but applied to the 12th house.
Used for marriage, spouse heritage, and marital concord analysis.
```

### #9 Hora Lagna

```
Algorithm (BPHS Chapter 5):
1. sunrise = getSunrise(birthDate, observer)
2. if born before sunrise: use previous day's sunrise
3. elapsedMinutes = (birthTime - sunrise) in minutes

Hora Lagna moves 1 sign per 2.5 Ghatis (60 minutes):
  rate = 0.5 degrees per minute
  horaLagnaLon = (sunLon + elapsedMinutes * 0.5) % 360

Used for: Financial riches and prosperity assessment.
```

### #10 Ghati Lagna

```
Algorithm (BPHS Chapter 5):
Ghati Lagna moves 1 sign per 1 Ghati (24 minutes):
  rate = 1.25 degrees per minute
  ghatiLagnaLon = (sunLon + elapsedMinutes * 1.25) % 360

Used for: Power, authority, government, and political assessment.
```

### #11 Vighati Lagna (Bhava Lagna)

```
Algorithm (BPHS Chapter 5):
Bhava Lagna moves 1 sign per 5 Ghatis (120 minutes):
  rate = 0.25 degrees per minute
  bhavaLagnaLon = (sunLon + elapsedMinutes * 0.25) % 360

Used for: Physical vitality and bodily strength assessment.
```

### #12 Indu Lagna

```
Algorithm (BPHS - Wealth Lagna):
INDU_KALAS = { Sun:30, Moon:16, Mars:6, Mercury:8, Jupiter:10, Venus:12, Saturn:1 }

1. ninthFromLagna = (lagnaRashi + 8) % 12
2. ninthFromMoon = (moonRashi + 8) % 12
3. lord9thLagna = RASHI_LORDS[ninthFromLagna]
4. lord9thMoon = RASHI_LORDS[ninthFromMoon]
5. totalKalas = INDU_KALAS[lord9thLagna] + INDU_KALAS[lord9thMoon]
6. remainder = totalKalas % 12; if remainder==0: remainder=12
7. induRashi = (moonRashi + remainder - 1) % 12

Used for: Billionaire wealth potential and Dhana Yoga assessment.
```

### #13 Bhava Madhya Calculation

```
Bhava Madhya = the midpoint longitude of each house.

Whole Sign:  madhya[h] = (ascendantRashi + h - 1) * 30 + 15
Equal House: madhya[h] = (ascendantLon + (h-1) * 30) % 360
Sripati:     See algorithm #4 (Bhava Chalit Chart)

madhyaDegree = floor(madhyaLon % 30)
madhyaMinute = floor((madhyaLon % 30 - madhyaDegree) * 60)
madhyaSecond = round(((madhyaLon % 30 - madhyaDegree) * 60 - madhyaMinute) * 60)
```

### #14 Planetary Longitude Calculation

```
Algorithm for each planet (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn):
1. vector = GeoVector(body, date, aberration=true)
2. ecliptic = Ecliptic(vector)
3. tropicalLon = ecliptic.elon
4. siderealLon = (tropicalLon - ayanamsa + 360) % 360
5. rashi = floor(siderealLon / 30)
6. degree = floor(siderealLon % 30)
7. minutes = floor((siderealLon % 30 - degree) * 60)
8. seconds = round(((siderealLon % 30 - degree) * 60 - minutes) * 60)

For Rahu (Mean Node):
  T = Julian Centuries from J2000.0
  omega = 125.04452 - 1934.136261*T + 0.0020708*T^2 + T^3/450000
  rahuLon = (omega - ayanamsa + 360) % 360

For Ketu:
  ketuLon = (rahuLon + 180) % 360
```

### #15 Ascendant Degree Calculation

```
Algorithm:
1. gmst = SiderealTime(date)                 // Greenwich Mean Sidereal Time in hours
2. lmstHours = gmst + (observerLongitude / 15.0)
3. lmstNorm = ((lmstHours % 24) + 24) % 24
4. ramc = lmstNorm * 15.0                    // Right Ascension of MC in degrees
5. eps = e_tilt(date).tobl                    // True Obliquity of ecliptic
6. phi = observer.latitude

7. numerator = cos(ramc)
8. denominator = -(sin(eps)*tan(phi) + cos(eps)*sin(ramc))
9. tropicalAscendant = atan2(numerator, denominator)
10. if tropicalAscendant < 0: tropicalAscendant += 360

11. siderealAscendant = (tropicalAscendant - ayanamsa + 360) % 360
```

---

## 2. Divisional Charts -- Shodashvarga

### Universal Pattern

Each divisional chart divides a 30-degree sign into N parts. The resulting sign depends on the part number, the natal sign, and sign classification (Odd/Even, Movable/Fixed/Dual, Element).

```
Helper:
  norm360(lon) = ((lon % 360) + 360) % 360
  rashi = floor(norm360(lon) / 30)        // 0-11
  degree = norm360(lon) % 30              // 0-29.999
  isOdd = (rashi % 2 == 0)               // Aries=Odd(0), Taurus=Even(1)
  isMovable = rashi in [0,3,6,9]
  isFixed = rashi in [1,4,7,10]
  isDual = rashi in [2,5,8,11]
```

### #16 D1 -- Rashi (Birth Chart)

```
sign = floor(longitude / 30)
```

### #17 D2 -- Hora (Wealth)

```
Parashara Hora:
if oddSign: degree < 15 -> Leo(4), else -> Cancer(3)
if evenSign: degree < 15 -> Cancer(3), else -> Leo(4)
```

### #18 D3 -- Drekkana (Siblings)

```
part = floor(degree / 10)   // 0, 1, 2
if part==0: same sign
if part==1: (sign + 4) % 12   // 5th from sign
if part==2: (sign + 8) % 12   // 9th from sign
```

### #19 D4 -- Chaturthamsa (Property)

```
part = min(3, floor(degree / 7.5))  // 0 to 3
result = (sign + part * 3) % 12
```

### #20 D7 -- Saptamsa (Children)

```
part = min(6, floor(degree / (30/7)))  // 0 to 6
if oddSign: result = (sign + part) % 12
else: result = ((sign + 6) + part) % 12
```

### #21 D9 -- Navamsa (Spouse & Dharma)

```
Method 1 (Universal):
  navamsaSpan = 360 / 108 = 3.333 degrees
  index = floor(longitude / navamsaSpan)
  sign = index % 12

Method 2 (Classical per Rashi type):
  NAVAMSA_SIZE = 30/9 = 3 deg 20 min
  navamsaIndex = floor(degreeInSign / NAVAMSA_SIZE)
  if Movable (0,3,6,9): startSign = rashiIndex
  if Fixed (1,4,7,10):  startSign = (rashiIndex + 8) % 12   // 9th from sign
  if Dual (2,5,8,11):   startSign = (rashiIndex + 4) % 12   // 5th from sign
  navamsaRashi = (startSign + navamsaIndex) % 12

Vargottama: navamsaRashi == rashiIndex (same sign in D1 and D9)
```

### #22 D10 -- Dasamsa (Career)

```
part = min(9, floor(degree / 3))  // 0 to 9
if oddSign: (sign + part) % 12
else: ((sign + 8) + part) % 12   // 9th from sign
```

### #23 D12 -- Dwadasamsa (Parents)

```
part = min(11, floor(degree / 2.5))  // 0 to 11
result = (sign + part) % 12
```

### #24 D16 -- Shodasamsa (Vehicles/Luxuries)

```
part = min(15, floor(degree / 1.875))  // 0 to 15
if Movable (0,3,6,9): startSign = 0 (Aries)
if Fixed (1,4,7,10):  startSign = 4 (Leo)
if Dual (2,5,8,11):   startSign = 8 (Sagittarius)
result = (startSign + part) % 12
```

### #25 D20 -- Vimsamsa (Spiritual Practices)

```
division = min(20, floor(degree / 1.5) + 1)  // 1 to 20
if sign % 3 == 0 (Movable): startSign = 0 (Aries)
if sign % 3 == 1 (Fixed):   startSign = 8 (Sagittarius)
if sign % 3 == 2 (Dual):    startSign = 4 (Leo)
result = (startSign + division - 1) % 12
```

### #26 D24 -- Chaturvimsamsa (Education)

```
division = min(23, floor(degree / 1.25))  // 0 to 23
if oddSign: result = (4 + division) % 12   // starts from Leo
if evenSign: result = (3 + division) % 12  // starts from Cancer
```

### #27 D27 -- Bhamsa / Saptavimshamsa (Strength)

```
division = min(26, floor(degree / (30/27)))  // 0 to 26
Starting sign based on element:
  Fiery (0,4,8):   startSign = 0 (Aries)
  Earthy (1,5,9):  startSign = 3 (Cancer)
  Airy (2,6,10):   startSign = 6 (Libra)
  Watery (3,7,11): startSign = 9 (Capricorn)
result = (startSign + division) % 12
```

### #28 D30 -- Trimsamsa (Misfortunes)

```
Odd Signs:
  0-5 deg   -> Aries(0)      [Mars]
  5-10 deg  -> Aquarius(10)   [Saturn]
  10-18 deg -> Sagittarius(8) [Jupiter]
  18-25 deg -> Gemini(2)      [Mercury]
  25-30 deg -> Libra(6)       [Venus]

Even Signs:
  0-5 deg   -> Taurus(1)      [Venus]
  5-12 deg  -> Virgo(5)       [Mercury]
  12-20 deg -> Pisces(11)     [Jupiter]
  20-25 deg -> Capricorn(9)   [Saturn]
  25-30 deg -> Scorpio(7)     [Mars]
```

### #29 D40 -- Khavedamsa (Maternal Lineage)

```
partSize = 0.75 deg (30/40)
division = min(40, floor(degree / partSize) + 1)  // 1 to 40
if oddSign:  startSign = 0 (Aries)
if evenSign: startSign = 6 (Libra)
result = (startSign + division - 1) % 12
```

### #30 D45 -- Akshavedamsa (Character/Reputation)

```
division = min(44, floor(degree / (40/60)))
if Movable (0,3,6,9): startSign = 0 (Aries)
if Fixed (1,4,7,10):  startSign = 4 (Leo)
if Dual (2,5,8,11):   startSign = 8 (Sagittarius)
result = (startSign + division) % 12
```

### #31 D60 -- Shashtiamsa (Past Life Karma)

```
part = min(59, floor(degreeInSign / 0.5))  // 0 to 59
result = (signIndex + part) % 12
```

**Additional vargas computed by the library** (D5, D6, D8, D11):

```
D5 -- Panchamsha (Fame/Power):
  part = min(4, floor(degree / 6))
  oddSigns:  [Aries(0), Aquarius(10), Sagittarius(8), Gemini(2), Libra(6)]
  evenSigns: [Taurus(1), Cancer(3), Virgo(5), Scorpio(7), Capricorn(9)]

D6 -- Shashthamsha (Health/Debts):
  part = min(5, floor(degree / 5))
  oddSigns:  (0 + part) % 12  // starts Aries
  evenSigns: (6 + part) % 12  // starts Libra

D8 -- Ashtamsha (Longevity):
  part = min(7, floor(degree / 3.75))
  Movable: startSign=0 (Aries)
  Fixed:   startSign=8 (Sagittarius)
  Dual:    startSign=4 (Leo)

D11 -- Rudramsha (Destruction/Crises):
  part = min(10, floor(degree / (30/11)))
  startSign = (12 - rashi) % 12
  result = (startSign + part) % 12
```

---

## 3. Planetary Analysis -- Graha Analysis

### #32-#40 Individual Planet Analysis (Sun through Ketu)

Each planet is analyzed with the following computed properties:

```
For each planet P:
  longitude     = sidereal longitude (0-360 deg)
  rashi         = floor(lon / 30) + 1    // 1-12
  rashiName     = RASHI_NAMES[rashi-1]
  rashiLord     = RASHI_LORDS[rashi-1]
  nakshatra     = NAKSHATRA_NAMES[floor(lon / 13.333)]
  nakshatraLord = lord from Vimshottari cycle
  pada          = floor((lon % 13.333) / 3.333) + 1
  degree        = DMS decomposition
  speed         = (position(t+30min) - position(t-30min)) * 24  // deg/day
  isRetrograde  = speed < 0
  dignity       = exalted | debilitated | own | neutral
  isCombust     = angular distance from Sun < combust limit
  isVargottama  = D9 sign == D1 sign
  navamsaRashi  = navamsa calculation
  house         = house placement from lagna
```

**#32** Sun (Surya): Body.Sun  
**#33** Moon (Chandra): Body.Moon  
**#34** Mars (Mangal): Body.Mars  
**#35** Mercury (Budha): Body.Mercury  
**#36** Jupiter (Guru): Body.Jupiter  
**#37** Venus (Shukra): Body.Venus  
**#38** Saturn (Shani): Body.Saturn  
**#39** Rahu: Mean Node formula (see #283)  
**#40** Ketu: (Rahu + 180) % 360  

### #41 Planetary Exaltation

```
Exaltation table (planet -> rashi 0-indexed):
  Sun->0(Aries), Moon->1(Taurus), Mars->9(Capricorn), Mercury->5(Virgo),
  Jupiter->3(Cancer), Venus->11(Pisces), Saturn->6(Libra),
  Rahu->1(Taurus), Ketu->7(Scorpio)

Check: if planetExaltation[planet] == currentRashi -> "exalted"
```

### #42 Planetary Debilitation

```
Debilitation = 180 deg opposite exaltation sign:
  Sun->6(Libra), Moon->7(Scorpio), Mars->3(Cancer), Mercury->11(Pisces),
  Jupiter->9(Capricorn), Venus->5(Virgo), Saturn->0(Aries),
  Rahu->7(Scorpio), Ketu->1(Taurus)

Check: if planetDebilitation[planet] == currentRashi -> "debilitated"
```

### #43 Own-Sign Placement

```
Own Signs (planet -> array of rashis):
  Sun->[4(Leo)], Moon->[3(Cancer)],
  Mars->[0(Aries), 7(Scorpio)], Mercury->[2(Gemini), 5(Virgo)],
  Jupiter->[8(Sagittarius), 11(Pisces)], Venus->[1(Taurus), 6(Libra)],
  Saturn->[9(Capricorn), 10(Aquarius)]

Check: if currentRashi in planetOwnSigns[planet] -> "own"
```

### #44 Moolatrikona Placement

```
Moolatrikona Signs (planet -> rashi, degree range):
  Sun -> Leo(4), 0-20 deg
  Moon -> Taurus(1), 4-20 deg
  Mars -> Aries(0), 0-12 deg
  Mercury -> Virgo(5), 16-20 deg
  Jupiter -> Sagittarius(8), 0-10 deg
  Venus -> Libra(6), 0-15 deg
  Saturn -> Aquarius(10), 0-20 deg

Check: if rashi matches AND degree within range -> "moolatrikona"
Priority: Exalted > Moolatrikona > Own > Neutral
```

### #45 Retrograde Analysis (Vakri)

```
// Finite difference method (30-minute half-window)
tMinus = date - 30 minutes
tPlus = date + 30 minutes

eMinus = Ecliptic(GeoVector(body, tMinus, true)).elon
ePlus = Ecliptic(GeoVector(body, tPlus, true)).elon

diff = ePlus - eMinus
if diff > 180:  diff -= 360   // handle 360->0 wrap
if diff < -180: diff += 360

speed = diff * 24              // degrees per day
isRetrograde = speed < 0

Note: Rahu/Ketu are always retrograde (speed approx -0.053 deg/day)
Sun and Moon never retrograde.
```

### #46 Combustion Analysis (Astangata)

```
combustLimits = {
  Moon: 12 deg, Mars: 17 deg,
  Mercury: 14 deg (retrograde: 12 deg),
  Jupiter: 11 deg, Venus: 10 deg (retrograde: 8 deg),
  Saturn: 15 deg
}

angularDiff = abs(planetLon - sunLon)
if angularDiff > 180: angularDiff = 360 - angularDiff
isCombust = angularDiff <= combustLimits[planet]

Note: Sun itself cannot be combust. Rahu/Ketu exempt.
```

### #47 Planetary Conjunctions

```
Two planets are in conjunction when they occupy the same rashi (house-sign):
  isConjunction = planet1.rashi == planet2.rashi

For degree-based conjunction:
  angularDiff = abs(planet1.longitude - planet2.longitude)
  if angularDiff > 180: angularDiff = 360 - angularDiff
  isTightConjunction = angularDiff <= orbLimit (typically 8-12 deg)
```

### #48 Planetary Aspects (Drishti)

```
All planets have 7th house aspect (offset +6).

Special aspects:
  Mars:    4th (offset 3), 7th (offset 6), 8th (offset 7)
  Jupiter: 5th (offset 4), 7th (offset 6), 9th (offset 8)
  Saturn:  3rd (offset 2), 7th (offset 6), 10th (offset 9)
  Rahu:    5th (offset 4), 7th (offset 6), 9th (offset 8)
  Ketu:    5th (offset 4), 7th (offset 6), 9th (offset 8)

Default for Sun, Moon, Mercury, Venus:
  [{ offset: 6, type: "7th" }]

targetHouse = ((sourceHouse - 1 + offset) % 12) + 1

Mutual Aspect: both planets aspect each other's house.
```

### #49 Planetary War (Graha Yuddha)

```
Conditions for Graha Yuddha:
1. Two non-luminary planets (Mars, Mercury, Jupiter, Venus, Saturn)
2. Must be within 1 deg of each other in longitude
3. Both in the same rashi

angularDiff = abs(planet1Lon - planet2Lon)
if angularDiff > 180: angularDiff = 360 - angularDiff
isGrahaYuddha = angularDiff <= 1.0 AND planet1Rashi == planet2Rashi

Winner determination:
- Planet with higher latitude (north) wins
- Or planet with lower longitude (ahead in zodiac) wins
- Winner gains strength, loser loses strength
```

### #50 Avastha Analysis (Planetary States)

```
Bala Avastha (5 states based on degree in sign):
  degreeInSign = longitude % 30
  if degree 0-6:   Bala (Infant) -- 25% strength
  if degree 6-12:  Kumara (Youth) -- 50% strength
  if degree 12-18: Yuva (Adult) -- 100% strength
  if degree 18-24: Vriddha (Old) -- 50% strength
  if degree 24-30: Mrita (Dead) -- 0% strength

Jagradadi Avastha (3 states):
  In own/exalted sign -> Jagrat (Awake) -- full results
  In friend's sign -> Swapna (Dreaming) -- partial results
  In enemy's sign -> Sushupti (Deep Sleep) -- minimal results

Deeptadi Avastha (9 states):
  Deepta (Exalted), Swastha (Own), Mudita (Friend), Shanta (Benefic varga),
  Shakta (Retrograde), Dukhi (Combust), Vikala (Defeated in war),
  Khala (Debilitated), Bhita (Accelerating/eclipsed)
```

---

## 4. Nakshatra Analysis

### #51 27 Nakshatra Analysis

```
nakshatraIndex = floor(siderealMoonLon / 13.333)  // 0-26

27 Nakshatras with lords (Vimshottari cycle):
  0: Ashwini->Ketu,      1: Bharani->Venus,    2: Krittika->Sun,
  3: Rohini->Moon,        4: Mrigashira->Mars,  5: Ardra->Rahu,
  6: Punarvasu->Jupiter,  7: Pushya->Saturn,    8: Ashlesha->Mercury,
  9: Magha->Ketu,        10: P.Phalguni->Venus, 11: U.Phalguni->Sun,
 12: Hasta->Moon,        13: Chitra->Mars,      14: Swati->Rahu,
 15: Vishakha->Jupiter,  16: Anuradha->Saturn,  17: Jyeshtha->Mercury,
 18: Mula->Ketu,         19: P.Ashadha->Venus,  20: U.Ashadha->Sun,
 21: Shravana->Moon,     22: Dhanishta->Mars,   23: Shatabhisha->Rahu,
 24: P.Bhadrapada->Jupiter, 25: U.Bhadrapada->Saturn, 26: Revati->Mercury

nakshatraLord = VIMSHOTTARI_LORDS[nakshatraIndex % 9]
```

### #52 Nakshatra Pada Analysis

```
padaLength = 3 deg 20 min = 3.333 deg
totalPadas = floor(siderealLon / padaLength)
pada = (totalPadas % 4) + 1   // 1 to 4

Each pada maps to a Navamsa sign:
  Pada 1 -> 1st Navamsa of that Nakshatra
  Pada 2 -> 2nd Navamsa
  Pada 3 -> 3rd Navamsa
  Pada 4 -> 4th Navamsa
```

### #53 Janma Nakshatra

```
janmaNakshatra = floor(birthMoonSiderealLon / 13.333)
janmaNakshatraName = NAKSHATRA_NAMES[janmaNakshatra]
janmaNakshatraLord = VIMSHOTTARI_LORDS[janmaNakshatra % 9]
janmaPada = getNakshatraPada(birthMoonSiderealLon)
```

### #54 Nakshatra Lord Analysis

```
Each nakshatra lord follows the Vimshottari cycle:
  lordSequence = [Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury]
  nakshatraLord = lordSequence[nakshatraIndex % 9]

The nakshatra lord determines:
- Starting Mahadasha in Vimshottari
- Tara Bala calculations
- KP sub-lord hierarchy
```

### #55 Nakshatra Compatibility

```
For two nakshatras (bride and groom):
  countGtoB = (boyNak - girlNak + 27) % 27 + 1
  countBtoG = (girlNak - boyNak + 27) % 27 + 1

Evaluate both directions using Tara classification (see #56).
Compatible if both directions yield good Tara positions.
```

### #56 Tara Bala (Star Strength)

```
diff = (transitNakshatra - birthNakshatra)
if diff < 0: diff += 27
count = diff + 1
remainder = count % 9   // if 0, treat as 9

Tara classification:
  1 -> Janma (Good per @prisri implementation)
  2 -> Sampat (Good - Wealth)
  3 -> Vipat (Bad - Danger)
  4 -> Kshema (Good - Well-being)
  5 -> Pratyak (Bad - Obstacles)
  6 -> Sadhana (Good - Achievement)
  7 -> Naidhana (Bad - Destruction)
  8 -> Mitra (Good - Friendship)
  9 -> Parama Mitra (Good - Supreme Friendship)

Good positions: [1, 2, 4, 6, 8, 9]
Note: Remainder 0 maps to 9 (Parama Mitra).
```

### #57 Chandra Bala (Moon Strength)

```
Moon strength from angular distance to Sun:
  angularDistance = abs(moonLon - sunLon)
  if angularDistance > 180: angularDistance = 360 - angularDistance
  chandraStrengthPercent = round((angularDistance / 180) * 100)
  // Full Moon (180 deg) = 100%, New Moon (0 deg) = 0%

Chandra Bala from Rashi:
  diff = (transitMoonRashi - birthMoonRashi + 12) % 12
  count = diff + 1
  Good positions: [1, 3, 6, 7, 10, 11]
  Bad positions:  [2, 4, 5, 8, 9, 12]
```

### #58 Gandanta Analysis

```
Gandanta points are junctions between Water and Fire signs:
  Cancer(3)->Leo(4):            26 deg 40 min Cancer to 3 deg 20 min Leo
  Scorpio(7)->Sagittarius(8):   26 deg 40 min Scorpio to 3 deg 20 min Sagittarius
  Pisces(11)->Aries(0):         26 deg 40 min Pisces to 3 deg 20 min Aries

Nakshatra-level Gandanta:
  Ashlesha(8)->Magha(9)         [Cancer/Leo junction]
  Jyeshtha(17)->Mula(18)        [Scorpio/Sagittarius junction]
  Revati(26)->Ashwini(0)        [Pisces/Aries junction]

Check: isGandanta = planet within +/- 3 deg 20 min of junction boundary
```

### #59 Nakshatra Gana

```
Three Ganas mapped from 27 nakshatras:
  Deva (Divine):    [0, 4, 6, 7, 12, 14, 16, 21, 26]
  Manushya (Human): [1, 3, 5, 11, 13, 15, 19, 20, 25]
  Rakshasa (Demon): [2, 8, 9, 10, 17, 18, 22, 23, 24]
```

### #60 Nadi Classification

```
Three Nadis mapped from 27 nakshatras (cycling 0,1,2):
  Aadi (Beginning): nakshatras 0,3,6,9,12,15,18,21,24
  Madhya (Middle):  nakshatras 1,4,7,10,13,16,19,22,25
  Antya (End):      nakshatras 2,5,8,11,14,17,20,23,26

nadiIndex = nakshatraIndex % 3
  0 -> Aadi, 1 -> Madhya, 2 -> Antya
```

### #61 Yoni Classification

```
14 animal types (Yoni) mapped from 27 nakshatras:
  0:Horse, 1:Elephant, 2:Sheep, 3:Serpent, 4:Dog, 5:Cat, 6:Rat,
  7:Cow, 8:Buffalo, 9:Tiger, 10:Deer, 11:Monkey, 12:Mongoose, 13:Lion

NAKSHATRA_YONI lookup table: maps each of 27 nakshatras to 0-13.

7 Great-enemy pairs:
  Horse-Buffalo, Elephant-Lion, Sheep-Monkey, Serpent-Mongoose,
  Dog-Deer, Cat-Rat, Cow-Tiger
```

### #62 Varna Classification

```
Four Varnas mapped from 12 rashis:
  0 -> Brahmin (scholarly/priestly)
  1 -> Kshatriya (warrior/ruling)
  2 -> Vaishya (trading/agricultural)
  3 -> Shudra (service/labor)

RASHI_VARNA = [1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0]
// Aries->Kshatriya, Taurus->Vaishya, Gemini->Shudra, Cancer->Brahmin, ...cycle
```

### #63 Vashya Classification

```
Five types mapped from 12 rashis:
  Chatushpad (Quadruped): [Aries, Taurus, 2nd half Sagittarius, 1st half Capricorn]
  Manav (Human):          [Gemini, Virgo, Libra, 1st half Sagittarius, Aquarius]
  Jalchar (Aquatic):      [Cancer, Pisces, 2nd half Capricorn]
  Vanchar (Wild/Forest):  [Leo]
  Keet (Insect/Reptile):  [Scorpio]

RASHI_VASHYA lookup table: maps each of 12 rashis to 0-4.
```

### #64 Mahendra Tara

```
count = (boyNakshatra - girlNakshatra + 27) % 27 + 1
isMahendra = (count % 7 == 4) OR (count % 7 == 1)
// Positions 4, 7, 10, 13, 16, 19, 22, 25 from girl's star

Result: Favorable for longevity and progeny.
```

### #65 Vedha Nakshatra

```
Specific nakshatra pairs that obstruct each other:
  Ashwini<->Jyeshtha, Bharani<->Anuradha, Krittika<->Vishakha,
  Rohini<->Swati, Ardra<->Shravana, Punarvasu<->U.Ashadha,
  Pushya<->P.Ashadha, Ashlesha<->Mula, Magha<->Revati,
  P.Phalguni<->U.Bhadrapada, U.Phalguni<->P.Bhadrapada,
  Hasta<->Shatabhisha, Chitra<->Dhanishta

If both partners' nakshatras form a Vedha pair -> negative effect.
```

---

## 5. Dasha Systems

### #66 Vimshottari Dasha (120-year cycle)

```
Lord sequence and durations (years):
  Ketu=7, Venus=20, Sun=6, Moon=10, Mars=7, Rahu=18, Jupiter=16, Saturn=19, Mercury=17
  Total = 120 years

Algorithm:
1. nakshatraIndex = floor(moonLon * 60 / 800)     // 800 arcmin = 13 deg 20 min
2. lordIndex = nakshatraIndex % 9
3. elapsedInNakshatra = (moonLon * 60) % 800
4. fractionRemaining = 1 - (elapsedInNakshatra / 800)
5. balanceYears = lordDuration[lordIndex] * fractionRemaining

6. Build Mahadasha timeline:
   First MD: birth -> birth + balanceYears
   Subsequent 8 MDs: cycle through lords in order

7. Antardasha within each Mahadasha:
   antarDuration = mahaDuration * (antarLordYears / 120)
   Starts with Mahadasha lord, then cycles all 9

8. Pratyantar within each Antar:
   pratyDuration = antarDuration * (pratyLordYears / 120)
   Starts with Antardasha lord, then cycles all 9

9. Current period: find where asOf falls in timeline
   progressPercent = (elapsed / totalDuration) * 100
```

### #67 Yogini Dasha (36-year cycle)

```
8 Yogini Lords and durations (years):
  Mangala=1, Pingala=2, Dhanya=3, Bhramari=4,
  Bhadrika=5, Ulka=6, Siddha=7, Sankata=8
  Total = 36 years

Yogini-Planet mapping:
  Mangala->Moon, Pingala->Sun, Dhanya->Jupiter, Bhramari->Mars,
  Bhadrika->Mercury, Ulka->Saturn, Siddha->Venus, Sankata->Rahu

Starting Yogini:
  yoginiIndex = (nakshatraIndex + 3) % 8
Balance calculation same as Vimshottari with 36-year total.
```

### #68 Ashtottari Dasha (108-year cycle)

```
Lords and durations (years):
  Sun=6, Moon=15, Mars=8, Mercury=17, Saturn=10, Jupiter=19, Rahu=12, Venus=21
  Total = 108 years

Applicability: Only when Rahu is in Kendra (1,4,7,10) or Trikona (1,5,9)
from Lagna lord. Starting lord from birth nakshatra mapping to 8-lord cycle.
```

### #69 Chara Dasha (Jaimini)

```
Algorithm:
1. Determine stronger between odd/even signs for each rashi pair
2. Starting sign = stronger sign (or Lagna sign in simplified version)
3. Duration = distance from sign to its lord (1-12 years)
4. For odd signs: count forward; for even signs: count backward
5. Sub-periods proportional to distance calculation for each sign

Chara Dasha is sign-based, not planet-based.
Duration per sign = number of signs between sign and its lord.
```

### #70 Kalachakra Dasha

```
Based on Nakshatra Pada (1-108 total padas across 27 nakshatras).
Two groups: Savya (clockwise) and Apsavya (counter-clockwise).

Duration cycle for Savya group:
  Specific to each Nakshatra group, varying durations per sign.

Duration cycle for Apsavya group:
  Different sequence, counted in reverse zodiacal order.

Starting pada determines group and initial sign.
```

### #71 Narayana Dasha (Jaimini)

```
Algorithm:
1. Start from the sign of the ascendant (or strongest)
2. Odd signs: count forward from sign; Even signs: count backward
3. Duration = number of signs lord is away from sign itself
4. If lord is in the same sign: duration = 12 years
5. Exception: if Ketu is in the sign, reverse the direction
```

### #72 Shoola Dasha

```
Based on Trishoola (trident) of 3 signs at a time.
Each group of 3 signs rules a phase. Duration based on house lord distances.
```

### #73 Mandooka Dasha

```
"Frog" Dasha -- signs progress by jumping (every other sign, then back).
Odd signs:  1->3->5->7->9->11
Even signs: 2->4->6->8->10->12
```

### #74 Sthira Dasha

```
Fixed durations: Movable=7, Fixed=8, Dual=9 years per sign.
Starting from Lagna sign.
```

### #75 Brahma Dasha

```
1. Find Atmakaraka (highest degree planet)
2. Determine Brahma, Maheshwara, Rudra from specific rules
3. Dasha runs from Brahma's sign
```

### #76 Dwisaptati Sama Dasha (72-year cycle)

```
Applicable when Lagna lord is in 7th house OR 7th lord in Lagna.
All 9 lords get equal 8-year periods. Total = 72 years.
```

### #77 Shattrimshat Sama Dasha (36-year cycle)

```
Applicable when Sun is in Lagna.
All 8 lords get 4.5-year periods. Total = 36 years.
```

### #78 Panchottari Dasha (105-year cycle)

```
Applicable when birth is in Cancer Lagna.
Lords: Sun=12, Moon=13, Mars=21, Mercury=18, Jupiter=18, Venus=13, Saturn=10
```

### #79 Shodasottari Dasha (116-year cycle)

```
Lords: Sun=11, Mars=12, Jupiter=13, Saturn=14, Ketu=15, Moon=16, Mercury=17, Venus=18
```

### #80 Dwadashottari Dasha (112-year cycle)

```
Applicable when Venus is in Lagna.
Lords: Sun=7, Jupiter=9, Ketu=11, Mercury=13, Rahu=15, Mars=17, Saturn=19, Moon=21
```

### #81 Shatabdika Dasha (100-year cycle)

```
Lords have fixed durations totaling 100 years.
Applicable under specific ascendant conditions.
```

### #82 Chaturashiti Sama Dasha (84-year cycle)

```
Applicable when 10th lord is in 10th house.
All 7 lords get equal 12-year periods. Total = 84 years.
```

### #83 Dwisaptati Sama Dasha (alternate verification)

```
Cross-library verification implementation of #76 with alternate tradition checks.
```

---

## 6. Yoga Analysis

### #84 Raj Yoga (Kendra-Trikona)

```
Kendra houses = [1, 4, 7, 10]
Trikona houses = [1, 5, 9]

For each Kendra lord K and Trikona lord T:
  if K != T AND getPlanetHouse(K) == getPlanetHouse(T):
    -> Raja Yoga formed (conjunction of Kendra and Trikona lords)
  houseJoined = K.house
  if houseJoined in [1,4,5,7,9,10]: strength = "Very Strong"
  else: strength = "Strong"
```

### #85 Dhan Yoga (Wealth Yoga)

```
Conditions:
1. Lords of 2nd and 11th houses in mutual Kendra
2. Lord of 5th in 2nd or 11th house
3. Lord of 9th with lord of 2nd or 11th
4. Jupiter in 2nd or 11th house in own/exalted sign
5. Venus in 2nd with benefic aspect
Also: Any lord of Trikona (1,5,9) with lord of 2nd or 11th.
```

### #86 Gajakesari Yoga

```
distMoonToJupiter = ((jupiterHouse - moonHouse + 12) % 12) + 1
if distMoonToJupiter in [1, 4, 7, 10]:
  -> Gaja Kesari Yoga (Jupiter in Kendra from Moon)
```

### #87 Budhaditya Yoga

```
if Sun.house == Mercury.house:
  -> Budhaditya Yoga (intelligence, academic brilliance)
```

### #88 Chandra-Mangal Yoga

```
if Moon.house == Mars.house:
  -> Chandra-Mangal Yoga (wealth through enterprise)
```

### #89 Vipareeta Raj Yoga

```
Harsha Yoga:  6th lord in [6, 8, 12]
Sarala Yoga:  8th lord in [6, 8, 12]
Vimala Yoga: 12th lord in [6, 8, 12]

Dusthana lords in Dusthana houses neutralize negative energy.
```

### #90 Neecha Bhanga Raj Yoga

```
Conditions for cancellation of debilitation:
1. Lord of debilitation sign is in Kendra from Lagna or Moon
2. Lord of exaltation sign is in Kendra from Lagna or Moon
3. Planet aspected by lord of debilitation sign
4. Planet aspected by lord of exaltation sign
5. Lord of debilitation sign is exalted
6. Debilitated planet in Kendra

If any condition met -> debilitation cancelled -> produces Raja Yoga equivalent.
```

### #91 Dharma-Karmadhipati Yoga

```
if lord9.house == lord10.house AND lord9 != lord10:
  -> "Supreme Raja Yoga" (9th Dharma + 10th Karma lords conjoined)
```

### #92 Panch Mahapurusha Yoga

Five sub-yogas when planet is in own/exalted sign AND in Kendra house [1,4,7,10]:

### #93 Hamsa Yoga

```
Jupiter in Kendra house AND in [Cancer(4), Sagittarius(9), Pisces(12)]
```

### #94 Malavya Yoga

```
Venus in Kendra house AND in [Taurus(2), Libra(7), Pisces(12)]
```

### #95 Ruchaka Yoga

```
Mars in Kendra house AND in [Aries(1), Scorpio(8), Capricorn(10)]
```

### #96 Bhadra Yoga

```
Mercury in Kendra house AND in [Gemini(3), Virgo(6)]
```

### #97 Sasa Yoga

```
Saturn in Kendra house AND in [Libra(7), Capricorn(10), Aquarius(11)]
```

### #98 Lakshmi Yoga

```
Conditions:
1. Lord of 9th house is strong (own/exalted/Kendra)
2. Venus is in own/exalted sign
3. Both in Kendra or Trikona from each other
```

### #99 Saraswati Yoga

```
saraswatiHouses = [1, 2, 4, 5, 7, 9, 10]
if Mercury.house in saraswatiHouses
   AND Jupiter.house in saraswatiHouses
   AND Venus.house in saraswatiHouses:
  -> Saraswati Yoga (scholarly fame, intellect)
```

### #100 Parivartana Yoga (Exchange Yoga)

```
Two planets in mutual exchange of signs:
  if lord_of_sign(planet1.rashi) == planet2
  AND lord_of_sign(planet2.rashi) == planet1:
    -> Parivartana Yoga

Three types:
  Maha Yoga: exchange between Kendra/Trikona lords
  Khala Yoga: exchange involving 3rd/6th house
  Dainya Yoga: exchange involving 6th/8th/12th
```

### #101 Kahala Yoga

```
Lord of 4th and Jupiter in mutual Kendras AND Lagna lord strong.
```

### #102 Amala Yoga

```
Natural benefic (Jupiter/Venus/Mercury) in 10th from Lagna or Moon.
-> Spotless reputation and philanthropic virtue.
```

### #103 Adhi Yoga

```
Benefics in 6th, 7th, 8th from Moon.
-> High ministerial authority.
```

### #104 Kemadruma Yoga

```
No planet (Mars/Mercury/Jupiter/Venus/Saturn) in 2nd or 12th from Moon.
-> Emotional isolation.
Cancellation: planets in Kendra from Lagna or Moon.
```

### #105 Vesi Yoga

```
Planet (not Moon/Rahu/Ketu) in 2nd from Sun.
-> Enhanced solar power in area governed by that planet.
```

### #106 Vosi Yoga

```
Planet (not Moon/Rahu/Ketu) in 12th from Sun.
-> Past-life spiritual merit manifesting.
```

### #107 Ubhayachari Yoga

```
Planets in both 2nd AND 12th from Sun.
-> Royalty, fame, success on all sides.
```

### #108 Anapha Yoga

```
Planet (not Sun/Rahu/Ketu) in 12th from Moon.
-> Self-made wealth, attractive personality.
```

### #109 Sunapha Yoga

```
Planet (not Sun/Rahu/Ketu) in 2nd from Moon.
-> Intelligence, fame, and prosperity.
```

### #110 Durudhara Yoga

```
Planets in both 2nd AND 12th from Moon.
-> Generous, wealthy, enjoys comforts.
```

---

## 7. Dosha Analysis

### #111 Mangal Dosha (Manglik)

```
Mars in houses [1, 2, 4, 7, 8, 12] from Lagna, Moon, or Venus.
if Mars.house in [1, 2, 4, 7, 8, 12]: isManglik = true

Severity:
  High: Mars in 7th or 8th house
  Medium: Mars in 1st, 4th, or 12th house
  Low: Mars in 2nd house

Cancellation:
1. Mars in own sign (Aries/Scorpio) or exaltation (Capricorn)
2. Mars conjunct or aspected by Jupiter
3. Mars in Kendra aspected by benefics
4. Both partners are Manglik
```

### #112 Kaal Sarp Dosha (12 types)

```
Algorithm:
1. For each of 7 planets (Sun..Saturn):
   distFromRahu = (planetLon - rahuLon + 360) % 360
   if distFromRahu < 1e-8 or |distFromRahu - 180| < 1e-8: onAxis++
   else if distFromRahu < 180: side1++
   else: side2++

2. Full Kaal Sarp:    side1 == 7 OR side2 == 7
3. Partial:           onAxis > 0 AND only one side has planets
4. Cancellation:      Jupiter in Kendra [1,4,7,10]

12 Types (by Rahu's house):
  1->Anant, 2->Kulik, 3->Vasuki, 4->Shankhpal, 5->Padma, 6->Mahapadma,
  7->Takshak, 8->Karkotak, 9->Shankhachood, 10->Ghatak, 11->Vishdhar, 12->Sheshnag
```

### #113 Pitru Dosha

```
Conditions:
1. Sun conjunct Rahu or Ketu (Surya Grahan)
2. 9th house afflicted by malefics
3. 9th lord in 6th, 8th, or 12th
4. Saturn aspects Sun
```

### #114 Nadi Dosha

```
boyNadi = NAKSHATRA_NADI[boyNakshatra]
girlNadi = NAKSHATRA_NADI[girlNakshatra]

if boyNadi == girlNadi -> Nadi Dosha present

Exception (cancellation):
  Same Rashi but different Nakshatra -> Nadi Dosha cancelled
```

### #115 Bhakoot Dosha

```
diff = (girlRashi - boyRashi + 12) % 12
position = diff + 1
isBad = position in [2, 12, 5, 9, 6, 8]

Exception: if RASHI_LORDS[boyRashi] == RASHI_LORDS[girlRashi] -> cancelled
```

### #116 Gana Dosha

```
if boyGana == Deva AND girlGana == Rakshasa -> Dosha
if boyGana == Manushya AND girlGana == Rakshasa -> Dosha
if boyGana == Rakshasa AND girlGana != Rakshasa -> Dosha

Gana matrix score == 0 indicates Gana Dosha.
```

### #117 Grahan Dosha

```
Sun + Rahu/Ketu in same house = Surya Grahan Dosha
Moon + Rahu/Ketu in same house = Chandra Grahan Dosha
```

### #118 Guru Chandal Dosha

```
Jupiter + Rahu in same house -> unorthodox beliefs, guru conflicts
```

### #119 Shrapit Dosha

```
Saturn + Rahu in same house -> ancestral karmic debt
```

### #120 Kemadruma Dosha

```
No planet (Mars/Mercury/Jupiter/Venus/Saturn) in 2nd or 12th from Moon.
house2FromMoon = (moonHouse % 12) + 1
house12FromMoon = ((moonHouse + 10) % 12) + 1

Cancellation: planet in Kendra from Lagna or Moon.
```

### #121 Angarak Dosha

```
Mars + Rahu or Mars + Ketu in same house -> volatility, impulsiveness
```

### #122 Vish Yoga

```
Saturn + Moon conjunction -> emotional suppression, chronic worry
```

### #123 Daridra Yoga/Dosha

```
Lords of 11th in 6th/8th/12th AND lords of 6th/8th/12th in 11th
-> Persistent financial hardship
```

### #124 Gandmool Dosha

```
Born in Gandanta nakshatras: Ashlesha, Jyeshtha, Revati,
Ashwini, Magha, Mula -> requires special birth rites
```

### #125 Naisargika Dosha

```
Natural malefics (Sun, Mars, Saturn, Rahu, Ketu) in specific houses
causing innate life challenges. Interpretive/traditional combination.
```

---

## 8. Strength Calculation Systems

### #126 Shadbala (Six-fold Strength)

```
Total Shadbala = Sum of 6 component strengths:
  Shadbala = Sthana + Dig + Kala + Cheshta + Naisargika + Drik

Each component measured in Shashtiamsas (60ths of a Rupa).
Required minimum Shadbala for each planet varies.
```

### #127 Sthana Bala (Positional Strength)

```
Components:
1. Uccha Bala (Exaltation strength):
   diff = |planetLon - exaltationPoint|
   if diff > 180: diff = 360 - diff
   ucchaStrength = (180 - diff) / 3  // 0-60 shashtiamsas

2. Sapta Vargaja Bala (strength from 7 vargas: D1,D2,D3,D7,D9,D12,D30):
   Points per varga: own=30, MT=45, exalted=60, friend=15, neutral=7.5, enemy=3.75

3. Ojha-Yugma Bala (Odd-Even sign/Navamsa strength):
   Male planets strong in odd signs, female in even signs. 15 points each.

4. Kendradi Bala:
   Kendra houses: 60, Panaphara: 30, Apoklima: 15 shashtiamsas

5. Drekkana Bala:
   Male planets strong in 1st drekkana, female in 3rd, neutral in 2nd
```

### #128 Dig Bala (Directional Strength)

```
Each planet has a direction of maximum strength:
  Jupiter/Mercury: East (1st house)  -> digPoint = Lagna degree
  Sun/Mars: South (10th house)       -> digPoint = MC degree
  Saturn: West (7th house)           -> digPoint = Desc degree
  Moon/Venus: North (4th house)      -> digPoint = IC degree

diff = |planetLon - digPoint|
if diff > 180: diff = 360 - diff
digBala = (180 - diff) / 3   // 0-60 shashtiamsas
```

### #129 Kala Bala (Temporal Strength)

```
Components:
1. Nathonnatha Bala: Day/night strength
   Diurnal planets (Sun, Jupiter, Venus) strong during day
   Nocturnal planets (Moon, Mars, Saturn) strong at night
   Mercury always strong (30 shashtiamsas)

2. Paksha Bala: Shukla/Krishna paksha strength
   Benefics strong in Shukla Paksha, malefics in Krishna

3. Tribhaga Bala: Day divided into 3 parts
   Mercury->1st third, Sun->2nd third, Saturn->3rd third of day
   Moon->1st third, Venus->2nd third, Mars->3rd third of night

4. Varsha-Maasa-Dina-Hora Bala:
   Lord of year/month/day/hora gets additional strength

5. Ayana Bala: Sun's declination strength
```

### #130 Cheshta Bala (Motional Strength)

```
Based on planetary motion (speed relative to mean):
  Vakra (retrograde): 60 shashtiamsas (maximum)
  Anuvakra (about to retrograde): 30
  Vikala (very slow): 15
  Manda (slow): 15
  Mandatara (slower than mean): 7.5
  Sama (same as mean): 30
  Chara (faster than mean): 45
  Atichara (very fast): 30

Sun/Moon: Cheshta Bala = Ayana Bala (no retrograde)
```

### #131 Naisargika Bala (Natural Strength)

```
Fixed values (inherent planetary strength):
  Sun = 60.00 shashtiamsas
  Moon = 51.43
  Mars = 17.14
  Mercury = 25.71
  Jupiter = 34.29
  Venus = 42.86
  Saturn = 8.57

These are constant and never change.
```

### #132 Drik Bala (Aspectual Strength)

```
Based on benefic/malefic aspects received:
  beneficAspect = Jupiter/Venus/waxingMoon/well-associated Mercury
  maleficAspect = Saturn/Mars/Sun/Rahu/Ketu/waningMoon

For each aspecting planet:
  aspectStrength = (aspectAngle strength factor) * (benefic: +1, malefic: -1)

Total DrikBala = sum of all aspect strengths / 4
Range: -60 to +60 shashtiamsas
```

### #133 Bhava Bala (House Strength)

```
Bhava Bala = Bhavadhipati Bala + Bhava Dig Bala + Bhava Drishti Bala

1. Bhavadhipati Bala: Shadbala of the house lord
2. Bhava Dig Bala: Directional strength of the house
3. Bhava Drishti Bala: Total aspects on the house
```

### #134 Ishta Phala (Desired Results)

```
Ishta Phala = sqrt(Uccha Bala * Cheshta Bala)
Represents the capacity of a planet to deliver positive results.
```

### #135 Kashta Phala (Undesired Results)

```
Kashta Phala = sqrt((60 - Uccha Bala) * (60 - Cheshta Bala))
Represents the capacity of a planet to deliver negative results.

Net effect: Ishta > Kashta -> predominantly good results
```

### #136 Ashtakavarga

```
7 planets contribute benefic points (bindus) to 12 signs.
Reference points: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Ascendant

For each planet P, for each reference point R:
  houseOffsets = CONTRIBUTIONS[P][R]   // array of 1-based house offsets
  For each offset:
    targetRashi = (referenceRashi + offset - 1) % 12
    byRashi[targetRashi]++

BAV = per-planet bindu table (12 rashis x 1 value each)
```

### #137 Sarvashtakavarga (SAV)

```
for each rashi r (0-11):
  SAV[r] = Sun_BAV[r] + Moon_BAV[r] + Mars_BAV[r] + Mercury_BAV[r]
           + Jupiter_BAV[r] + Venus_BAV[r] + Saturn_BAV[r]

House interpretation:
  >= 32 bindus: Exceptional
  28-31 bindus: Strong
  25-27 bindus: Average
  < 25 bindus:  Weak

Total SAV = 337 (constant sum across all 12 signs)
```

### #138 Bhinnashtakavarga (BAV)

```
Individual planet's contribution table.

Expected totals per planet:
  Sun=48, Moon=49, Mars=39, Mercury=54, Jupiter=56, Venus=52, Saturn=39

BPHS contribution tables (example for Sun):
  Sun from Sun: houses [1,2,4,7,8,9,10,11]
  Sun from Moon: houses [3,6,10,11]
  Sun from Mars: houses [1,2,4,7,8,9,10,11]
  Sun from Mercury: houses [3,5,6,9,10,11,12]
  Sun from Jupiter: houses [5,6,9,11]
  Sun from Venus: houses [6,7,12]
  Sun from Saturn: houses [1,2,4,7,8,9,10,11]
  Sun from Ascendant: houses [3,4,6,10,11,12]
```

### #139 Vimsopaka Bala

```
Vimsopaka (20-point scale) from Shodashvarga (16 divisional charts):

Points assigned based on dignity in each varga:
  Exalted: 20, Moolatrikona: 18, Own: 15, Great Friend: 12,
  Friend: 10, Neutral: 8, Enemy: 5, Great Enemy: 2, Debilitated: 0

Weighted average across vargas with specific weightage:
  Shadvarga (6 charts): D1(6), D2(2), D3(4), D9(5), D12(2), D30(1)
  Saptavarga adds D7
  Dashavarga adds D10, D16, D60
  Shodashvarga: all 16 with specific weights
```

### #140 Vaiseshikamsa

```
Count the number of vargas where a planet has favorable placement:
  In own sign, exalted, friend's sign -> counts as benefic varga

Classifications (from 16-chart analysis):
  1: Parijata, 2: Uttama, 3: Gopura, 4: Simhasana,
  5: Paravata, 6: Devaloka, 7+: Iravatamsa (highest)
```

### #141 Shadbala Ratio Analysis

```
Required minimum Shadbala (in Rupas):
  Sun: 6.5, Moon: 6.0, Mars: 5.0, Mercury: 7.0,
  Jupiter: 6.5, Venus: 5.5, Saturn: 5.0

Shadbala Ratio = Actual Shadbala / Required Shadbala
  Ratio > 1.0: Planet has sufficient strength
  Ratio < 1.0: Planet is weak (needs remedies)
```

---

## 9. Transit Analysis -- Gochar

### #142 Saturn Transit

```
saturnTransitRashi = floor(transitSaturnSiderealLon / 30)
houseFromMoon = ((saturnTransitRashi - natalMoonRashi + 12) % 12) + 1

Favorable Saturn houses from Moon: [3, 6, 11]
Unfavorable: [1, 2, 4, 5, 7, 8, 9, 10, 12]
```

### #143 Jupiter Transit

```
jupiterTransitRashi = floor(transitJupiterSiderealLon / 30)
houseFromMoon = ((jupiterTransitRashi - natalMoonRashi + 12) % 12) + 1

Favorable Jupiter houses from Moon: [2, 5, 7, 9, 11]
Jupiter aspects from transit: 5th, 7th, 9th from its position.
```

### #144 Rahu Transit

```
Rahu favorable from Moon: [3, 6, 11] (Upachaya houses)
```

### #145 Ketu Transit

```
Ketu favorable from Moon: [3, 6, 11]
```

### #146 Sade Sati

```
moonRashi = floor(natalMoonLon / 30)      // 0-11
saturnRashi = floor(transitSaturnLon / 30) // 0-11
diff = (saturnRashi - moonRashi + 12) % 12

Phase 1 (Rising):  diff == 11  (Saturn in 12th from Moon)
Phase 2 (Peak):    diff == 0   (Saturn on Moon's sign)
Phase 3 (Setting): diff == 1   (Saturn in 2nd from Moon)

Duration: ~7.5 years total (2.5 years per phase)
```

### #147 Dhaiya (Small Panoti)

```
diff = (saturnRashi - moonRashi + 12) % 12

Kantaka Shani (4th Dhaiya): diff == 3
Ashtama Shani (8th Dhaiya): diff == 7

Duration: ~2.5 years each
```

### #148 Ashtama Shani

```
diff = (saturnRashi - moonRashi + 12) % 12
isAshtamaShani = (diff == 7)
// Saturn in 8th from Moon -- most challenging transit
```

### #149 Jupiter Return

```
Jupiter orbital period ~ 11.86 years
Jupiter Return = transit Jupiter at same longitude as natal Jupiter
Approximate timing: every ~12 years from birth
```

### #150 Saturn Return

```
Saturn orbital period ~ 29.46 years
1st Return: Age ~29-30 (career maturation)
2nd Return: Age ~58-60 (wisdom phase)
3rd Return: Age ~87-90 (legacy phase)
```

### #151 Transit over Natal Moon

```
houseFromMoon = ((transitRashi - natalMoonRashi + 12) % 12) + 1
Apply FAVORABLE_GOCHAR_HOUSES[planet] lookup per planet.
```

### #152 Transit over Natal Ascendant

```
houseFromLagna = ((transitRashi - natalLagnaRashi + 12) % 12) + 1
```

### #153 Transit over Natal Planets

```
For each transit planet over each natal planet position.
Conjunction within orb triggers event activation.
```

### #154 Vedha Analysis

```
Each planet's favorable transit can be obstructed by another planet
in the Vedha (obstruction) house.

VEDHA_PAIRS[planet][favorableHouse] = obstructionHouse

checkVedha(planet, house, allTransitHouses):
  vedhaHouse = VEDHA_PAIRS[planet][house]
  if any other planet in vedhaHouse -> favorable transit obstructed

Exception: Sun-Saturn exempt from mutual Vedha.
```

### #155 Double Transit Analysis

```
When BOTH Jupiter AND Saturn aspect or occupy a house simultaneously.
Events manifest when both slow planets activate the same house.
Double Transit = intersection of Jupiter's and Saturn's influenced houses.
```

### #156 Gochar Dasha Integration

```
Combine transit (Gochar) positions with running Dasha period.
Transit effects amplified when transit planet = Dasha lord.
Most impactful: transit of Mahadasha lord over natal planets.
```

---

## 10. Marriage & Relationship Analysis

### #157 Ashtakoota Guna Milan (36-Point System)

```
Total = Varna(1) + Vashya(2) + Tara(3) + Yoni(4)
      + GrahaMaitri(5) + Gana(6) + Bhakoot(7) + Nadi(8) = 36

Scoring thresholds:
  >= 25: Excellent match
  18-24: Good match (recommended)
  < 18:  Not recommended
```

### #158 Varna Koota (1 point)

```
RASHI_VARNA maps each rashi to 0-3 (Brahmin, Kshatriya, Vaishya, Shudra)
score = 1 if boyVarna >= girlVarna, else 0
```

### #159 Vashya Koota (2 points)

```
5 types: Chatushpad(0), Manav(1), Jalchar(2), Vanchar(3), Keet(4)

5x5 scoring table:
       Chatu  Manav  Jalch  Vanch  Keet
Chatu: [ 2,    1,     1,    0.5,    1  ]
Manav: [ 1,    2,    0.5,    0,     1  ]
Jalch: [ 1,   0.5,    2,     1,     1  ]
Vanch: [0.5,   0,     1,     2,     0  ]
Keet:  [ 1,    1,     1,     0,     2  ]
```

### #160 Tara Koota (3 points)

```
countGB = (boyNak - girlNak + 27) % 27 + 1
countBG = (girlNak - boyNak + 27) % 27 + 1
remGB = countGB % 9;  remBG = countBG % 9
Good remainders: [1, 2, 4, 6, 8, 0]

Both good -> 3, one good -> 1.5, neither -> 0
```

### #161 Yoni Koota (4 points)

```
14 animals mapped from nakshatras.
Same yoni -> 4
Great enemies (7 fixed pairs) -> 0
Enemies -> 1
Neutral -> 2
```

### #162 Graha Maitri Koota (5 points)

```
Planetary friendship table:
  Friends: Sun<->Moon, Sun<->Mars, Sun<->Jupiter, Moon<->Mercury,
           Mars<->Jupiter, Mercury<->Venus, Venus<->Saturn
  Enemies: Sun<->Venus, Sun<->Saturn, Mars<->Mercury,
           Jupiter<->Mercury, Jupiter<->Venus, Saturn<->Sun, Saturn<->Moon, Saturn<->Mars

getRel(planet, other):
  same planet -> +1, friend -> +1, enemy -> -1, neutral -> 0

Scoring:
  Both friends -> 5, Friend+Neutral -> 4, Both neutral -> 3,
  Friend+Enemy -> 1, Neutral+Enemy -> 0.5, Both enemies -> 0
```

### #163 Gana Koota (6 points)

```
Gana matrix:
       Deva  Manush  Raksh
Deva: [  6,    6,      0  ]
Man:  [  5,    6,      0  ]
Rak:  [  0,    0,      6  ]
```

### #164 Bhakoot Koota (7 points)

```
diff = (girlRashi - boyRashi + 12) % 12
position = diff + 1
isBad = position in [2, 12, 5, 9, 6, 8]

if isBad AND sameLord(boyRashi, girlRashi) -> 7 (exception)
if isBad -> 0 (Bhakoot Dosha)
else -> 7
```

### #165 Nadi Koota (8 points)

```
3 Nadis: Aadi(0), Madhya(1), Antya(2)

if boyNadi == girlNadi -> 0 (Nadi Dosha)
  Exception: same Rashi but different Nakshatra -> 8
else -> 8
```

### #166 Manglik Matching

```
Both Manglik -> safe match
One Manglik -> Mangal Dosha (unless cancelled)
Neither -> no issue
```

### #167 Navamsa Compatibility

```
Compare D9 charts of both partners.
7th house, Venus placement, and Navamsa lord compatibility.
```

### #168 Seventh-house Analysis

```
Lord of 7th house, planets in 7th, aspects on 7th.
7th from Moon chart and Navamsa 7th.
```

### #169 Upapada Lagna Analysis

```
Upapada = A12 (Arudha Pada of 12th house).
Planets in/aspecting UL indicate spouse qualities.
```

### #170 Darakaraka Analysis

```
Darakaraka = planet with lowest degree in sign (Jaimini).
DK planet's nature describes spouse's core personality.
```

### #171 Marriage Timing Through Dasha

```
Marriage likely when:
- Dasha/Antar of 7th lord or Venus
- Dasha of Navamsa lagna lord
- Jupiter transiting 7th from Moon or Lagna
- Double transit of Jupiter-Saturn on 7th house
```

---

## 11. Career & Business Analysis

### #172 Dasamsa (D10) Analysis

```
Career chart. 10th house, Lagna lord, planets in D10 Kendras.
Strong planets in D10 -> professional success.
```

### #173 Tenth-house Analysis

```
Planets in 10th, aspects on 10th, strength of 10th house in SAV.
```

### #174 Tenth Lord Analysis

```
House placement, dignity, aspects, and Dasha timing of 10th lord.
```

### #175 Amatyakaraka Analysis (Jaimini)

```
2nd highest degree planet = career indicator.
Planet-specific career domains:
  Sun->Executive, Moon->Public/healthcare, Mars->Engineering/military,
  Mercury->IT/analytics, Jupiter->Advisory/legal, Venus->Design/luxury,
  Saturn->Infrastructure/operations
```

### #176 Atmakaraka Analysis

```
Highest degree planet = soul's deepest purpose.
AK's sign, house, and Navamsa reveal life mission.
```

### #177 Arudha Lagna Analysis

```
AL (A1) = public perception and worldly status.
Planets in/aspecting AL shape social reputation.
```

### #178 Raj Yoga for Career

```
Kendra-Trikona Raja Yogas active during career Dasha periods.
```

### #179 Dhana Yoga for Wealth

```
2nd/11th lords connected to Trikona lords.
```

### #180 Sixth-house Employment Analysis

```
6th house = service, competition, daily work routine.
6th lord placement and aspects.
```

### #181 Seventh-house Business Analysis

```
7th house = partnerships, business alliances, contracts.
Strong 7th -> successful business partnerships.
```

### #182 Eleventh-house Income Analysis

```
11th house = gains, income, fulfilled aspirations.
Planets and SAV bindus in 11th.
```

### #183 Career Timing Through Dasha

```
Career events when:
- Dasha/Antar of 10th lord
- Saturn/Jupiter transit over 10th house
- D10 activation periods
```

### #184 Saturn-Jupiter Career Transit Analysis

```
Career milestones when Saturn and Jupiter simultaneously
aspect or occupy the 10th house (double transit).
```

---

## 12. Wealth & Financial Analysis

### #185 Dhana Yoga

See #85.

### #186 Hora (D2) Analysis

```
D2 chart for wealth accumulation.
Planets in Leo (Sun's Hora) -> self-earned wealth
Planets in Cancer (Moon's Hora) -> inherited/liquid wealth
```

### #187 Second-house Analysis

```
2nd house = accumulated wealth, family resources, speech.
BAV/SAV bindus, lord placement, aspects.
```

### #188 Fifth-house Speculation Analysis

```
5th house governs stock market, gambling, speculation.
Strong 5th with Jupiter/Venus -> gains from speculation.
```

### #189 Ninth-house Fortune Analysis

```
9th house = bhagya (fortune), luck, divine grace.
Strong 9th lord -> fortunate life.
```

### #190 Eleventh-house Gains Analysis

```
11th = income, profits, fulfilled desires.
Multiple planets in 11th -> multiple income streams.
```

### #191 Indu Lagna Analysis

See #12.

### #192 Lakshmi Yoga

See #98.

### #193 Ashtakavarga Wealth Analysis

```
SAV bindus in 2nd, 11th houses indicate wealth potential.
BAV of Jupiter/Venus in wealth houses.
```

### #194 Wealth Timing Through Dasha

```
Wealth periods when:
- Dasha of 2nd/11th/9th lord
- Jupiter/Venus Mahadasha or Antardasha
- Transit Jupiter in 2nd, 5th, or 11th
```

---

## 13. Health & Longevity Analysis

### #195 Sixth-house Disease Analysis

```
6th house = acute diseases, enemies, debts.
Malefics in 6th -> chronic conditions related to that planet.
Planet-disease mapping: Saturn->bones/joints, Mars->blood/surgery, etc.
```

### #196 Eighth-house Longevity Analysis

```
8th house = longevity, chronic illness, transformation.
Strong 8th lord -> long life; weak -> health vulnerabilities.
```

### #197 Twelfth-house Hospitalization Analysis

```
12th house = hospitals, confinement, expenses.
Malefics in 12th -> periods of hospitalization.
```

### #198 Lagna and Lagna Lord Strength

```
Strong Lagna + strong Lagna lord = robust constitution.
Shadbala of Lagna lord indicates overall vitality.
```

### #199 Maraka Analysis

```
Maraka houses = 2nd and 7th (death-inflicting houses).
Maraka planets = lords of 2nd and 7th.
Maraka Dasha periods require health caution.
```

### #200 Badhaka Analysis

```
Badhaka houses:
  Movable Lagna (Aries/Cancer/Libra/Capricorn): 11th house
  Fixed Lagna (Taurus/Leo/Scorpio/Aquarius): 9th house
  Dual Lagna (Gemini/Virgo/Sagittarius/Pisces): 7th house
Badhaka lord causes obstruction during its Dasha.
```

### #201 Trimsamsa (D30) Analysis

```
D30 chart for misfortunes and health vulnerabilities.
Malefic placement -> area of chronic health weakness.
```

### #202 Ayush Calculation (Longevity Estimation)

```
Three tiers: Alpayu (Short: 0-32), Madhyayu (Medium: 33-66), Deerghayu (Long: 67-100+)
Based on:
- Lagna lord strength
- 8th lord and 8th house status
- Saturn's placement and strength
- Moon's strength (Paksha Bala)
```

### #203 Ashtakavarga Health Indicators

```
SAV bindus in 6th (< 25 = disease vulnerability)
SAV bindus in 8th (< 25 = longevity concerns)
BAV of Saturn in 1st and 8th houses.
```

---

## 14. Timing & Predictive Astrology

### #204 Varshaphal (Annual Horoscope)

```
Solar return chart -- re-cast chart when Sun returns to natal longitude.
Varsha Lagna = Ascendant at solar return moment.
```

### #205 Tajika Astrology

```
Annual chart aspects (Tajika Yogas):
Ithasala, Ishrafa, Nakta, Yamaya, Manau, Kamboola, Gairi-Kamboola,
Khalasara, Radda, Duphali-Kuttha, Dutthotta-Davira, Tambira, Kuttha
```

### #206 Muntha Calculation

```
muntha = (birthLagnaSign + currentAge) % 12
Muntha sign advances 1 rashi per year from birth Lagna.
Muntha in Kendra/Trikona = good year.
```

### #207 Mudda Dasha

```
Compressed Vimshottari within one year (365.25 days).
Same lord sequence, proportional periods scaled to 1 year.
```

### #208 Sahams Calculation

```
Tajika sensitive points:
Punya Saham = (Moon - Sun + Asc) in day chart
Vidya Saham, Yasas Saham, Mitra Saham, etc.
Each Saham = (A - B + C) % 360 with specific formulas.
```

### #209 Annual Planetary Return

```
Any planet returning to natal position.
Calculate exact return date via binary search.
```

### #210 Prashna Kundli (Horary)

```
Chart cast for the moment of question (not birth).
Same calculations as birth chart but using question time.
Lagna of Prashna determines the answer.
```

### #211 Horary Astrology

```
Extended Prashna system:
1. Note the Lagna at question time
2. Analyze Moon's position and aspects
3. 7th house for the querent's opponent/partner
4. Planetary hora at question time gives additional clue
```

### #212 Nimitta Analysis

```
Omens at the time of question:
Direction of questioner, first word spoken, objects in view.
Interpretive framework (not algorithmic).
```

### #213 Transit and Dasha Correlation

```
Events manifest when:
- Transit planet = Dasha lord
- Transit activates Dasha lord's natal house
- Double transit (Jupiter+Saturn) confirms Dasha promise
```

### #214 Event Timing Through Divisional Charts

```
D10 activation for career events
D9 activation for marriage events
D4 activation for property events
D7 activation for children events
Specific Dasha + transit + divisional chart alignment.
```

---

## 15. Panchang Calculations

### #215 Tithi (Lunar Day)

```
longitudeDifference = moonLon - sunLon
if diff < 0: diff += 360
tithiIndex = floor(diff / 12)   // 0-29

0-14 = Shukla Paksha: Prathama to Purnima
15-29 = Krishna Paksha: Prathama to Amavasya

Binary search for exact tithi transition:
  target = (tithiIndex + 1) * 12
  Search for moonLon - sunLon crossing target
```

### #216 Vara (Weekday)

```
if observer provided:
  tzOffsetMs = round(observer.longitude / 15.0) * 3600000
  localDate = new Date(date.getTime() + tzOffsetMs)
  vara = localDate.getUTCDay()   // 0=Sunday to 6=Saturday
else:
  vara = date.getUTCDay()
```

### #217 Nakshatra

```
nakshatraIndex = floor(siderealMoonLon / 13.333)

Binary search for transitions:
  target = (nakshatraIndex + 1) * 13.333
  Search for sidereal Moon crossing target longitude
```

### #218 Yoga (Sun-Moon Combination)

```
totalLongitude = siderealSunLon + siderealMoonLon
yogaIndex = floor(totalLongitude / 13.333) % 27

27 Yogas: Vishkambha, Priti, Ayushman, Saubhagya, Shobhana, Atiganda,
Sukarman, Dhriti, Shula, Ganda, Vriddhi, Dhruva, Vyaghata, Harshana,
Vajra, Siddhi, Vyatipata, Variyana, Parigha, Shiva, Siddha, Sadhya,
Shubha, Shukla, Brahma, Indra, Vaidhriti
```

### #219 Karana (Half-Tithi)

```
diff = moonLon - sunLon; if diff < 0: diff += 360
karanaIndex = floor(diff / 6)   // 0-59

Fixed Karanas: Kimstughna(0), Shakuni(57), Chatushpada(58), Naga(59)
Repeating 7 (indices 1-56): Bava, Balava, Kaulava, Taitila, Gara, Vanija, Vishti
repeatingIndex = (karanaIndex - 1) % 7
```

### #220 Sunrise Calculation

```
Uses astronomy-engine SearchRiseSet:
1. Calculate local midnight (based on observer longitude)
2. SearchRiseSet(Body.Sun, observer, direction=+1, startDate=localMidnight, limitDays=1)
3. Verify result falls within same local day
```

### #221 Sunset Calculation

```
SearchRiseSet(Body.Sun, observer, direction=-1, startDate=localMidnight, limitDays=1)
```

### #222 Rahu Kalam

```
portionMillis = (sunset - sunrise) / 8
portionIndex = [8, 2, 7, 5, 6, 4, 3]  // Sun, Mon, Tue, Wed, Thu, Fri, Sat

start = sunrise + (portionIndex[vara] - 1) * portionMillis
end = sunrise + portionIndex[vara] * portionMillis
```

### #223 Yamaganda

```
portionIndex = [5, 4, 3, 2, 1, 7, 6]  // Sun through Sat
Same formula as Rahu Kalam.
```

### #224 Gulika Kalam

```
portionIndex = [7, 6, 5, 4, 3, 2, 1]  // Sun through Sat
Same formula as Rahu Kalam.
```

### #225 Abhijit Muhurta

```
dayDuration = sunset - sunrise
muhurtaDuration = dayDuration / 15
abhijitStart = sunrise + 7 * muhurtaDuration   // 8th muhurta
abhijitEnd = sunrise + 8 * muhurtaDuration
```

### #226 Brahma Muhurta

```
nightDuration = sunrise - prevSunset
muhurtaDuration = nightDuration / 15
brahmaMuhurtaEnd = sunrise - 1 * muhurtaDuration
brahmaMuhurtaStart = sunrise - 2 * muhurtaDuration
// 2nd to last muhurta of the night
```

### #227 Amrit Kalam

```
Same framework as Varjyam but using amritKalamStartGhatis[] table:
  nakshatraDuration = nakshatraEnd - nakshatraStart
  startOffset = (nakshatraDuration * amritKalamStartGhatis[nakIndex]) / 60
  amritDuration = (nakshatraDuration * 4) / 60   // 4 Ghatis
```

### #228 Dur Muhurta

```
muhurtaDuration = dayDuration / 15
4th Muhurta:  sunrise + 3*muhurta to sunrise + 4*muhurta
6th Muhurta:  sunrise + 5*muhurta to sunrise + 6*muhurta
14th Muhurta: sunrise + 13*muhurta to sunrise + 14*muhurta
```

---

## 16. Muhurta Astrology

### Common Muhurta Selection Framework

```
1. Check Panchang: Tithi, Nakshatra, Yoga, Karana, Vara must be auspicious
2. Avoid Rahu Kalam, Yamaganda, Gulika, Dur Muhurta, Varjyam
3. Verify Tara Bala (good nakshatra from birth star)
4. Verify Chandra Bala (Moon in favorable house from birth Moon)
5. Check Lagna suitability for specific activity
6. Check planetary Hora
```

### #229 Marriage Muhurta

```
Required: Shukla Paksha (days 2,3,5,7,10,11,13,15)
Avoid: Panchak nakshatras, Krishna Ashtami/Navami
Nakshatra: Rohini, Mrigashira, Magha, U.Phalguni, Hasta, Swati,
           Anuradha, Mula, U.Ashadha, Shravana, Dhanishta, U.Bhadrapada, Revati
Lagna: 2nd, 7th favorable; avoid 1st, 6th, 8th, 12th
```

### #230 Griha Pravesh Muhurta

```
Favorable months: Vaishakh, Jyeshtha, Magha, Phalguna
Avoid: Ashadha, Bhadrapada
Lagna: Fixed signs preferred (Taurus, Leo, Scorpio, Aquarius)
```

### #231 Business Opening Muhurta

```
Favorable days: Wednesday (Mercury), Thursday (Jupiter), Friday (Venus)
Lagna: Movable/Dual signs
Mercury and Jupiter should be strong and unafflicted.
```

### #232 Vehicle Purchase Muhurta

```
Favorable nakshatras: Ashwini, Rohini, Punarvasu, Pushya, Hasta, Swati
Venus strong and unafflicted. Avoid Saturn conjunction.
```

### #233 Property Purchase Muhurta

```
Mars and Saturn well-placed. 4th house strong.
Favorable nakshatras: Rohini, U.Phalguni, U.Ashadha, U.Bhadrapada
```

### #234 Travel Muhurta

```
Check direction-specific nakshatras.
Avoid: Rahu Kalam, Chandrashtama period
Moon in 3rd, 6th, 10th, 11th from birth Moon.
```

### #235 Namkaran Muhurta (Naming Ceremony)

```
11th or 12th day after birth traditionally.
Favorable nakshatras based on birth star compatibility.
```

### #236 Upanayana Muhurta (Thread Ceremony)

```
Favorable months: Magha, Phalguna, Chaitra, Vaishakha
Jupiter and Sun strong.
```

### #237 Vidyarambha Muhurta (Education Start)

```
Wednesday or Thursday. Mercury strong.
Saraswati Puja alignment.
```

### #238 Foundation-laying Muhurta

```
Fixed Lagna signs. Mars and Saturn well-placed.
Avoid: Vishti Karana (Bhadra)
```

### #239 Medical Procedure Muhurta

```
Avoid: Mars affliction, 8th house activation
Moon should not be in patient's 8th house from birth Moon.
Favorable: waxing Moon, benefic hora.
```

**Additional Muhurta tools**:

```
Hora (Planetary Hour):
  dayStartPlanet = [0, 3, 6, 2, 5, 1, 4]  // Sun=0,Moon=3,Mars=6,...
  horaRulers = [Sun, Venus, Mercury, Moon, Saturn, Jupiter, Mars]
  hoursFromSunrise = (currentTime - sunrise) / 3600000
  horaIndex = (dayStartPlanet[weekday] + floor(hoursFromSunrise)) % 7

Varjyam:
  startOffset = (nakshatraDuration * varjyamStartGhatis[nakIndex]) / 60
  duration = (nakshatraDuration * 4) / 60   // 4 Ghatis

Special Yogas:
  Amrit Siddhi: Sun+Hasta, Mon+Mrigashira, Tue+Ashwini, Wed+Anuradha,
                Thu+Pushya, Fri+Revati, Sat+Rohini
  Ravi Pushya: Sunday + Pushya nakshatra
  Guru Pushya: Thursday + Pushya nakshatra
  Sarvartha Siddhi: specific day+nakshatra combinations (lookup table)
```

---

## 17. Jaimini Astrology

### #240 Atmakaraka (AK - Soul Planet)

```
Algorithm:
1. For 7 planets (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn):
   degreeInSign = longitude % 30
2. Sort by degreeInSign DESCENDING
3. Planet with HIGHEST degree = Atmakaraka

AK represents: Soul's deepest longing, spiritual lessons, primary life mission.
```

### #241 Amatyakaraka (AmK - Career Planet)

```
2nd highest degree in sign = Amatyakaraka
Dictates career trajectory, vocational talent, leadership authority.

Planet-specific career:
  Sun->Executive/governance, Moon->Public/healthcare, Mars->Engineering/military,
  Mercury->IT/analytics/media, Jupiter->Advisory/legal/education,
  Venus->Design/luxury/art, Saturn->Infrastructure/operations
```

### #242 Bhratrikaraka (BK)

```
3rd highest degree -> siblings, mentors, guides
```

### #243 Matrikaraka (MK)

```
4th highest degree -> mother, property, vehicles
```

### #244 Putrakaraka (PK)

```
5th highest degree -> children, intelligence, creativity
```

### #245 Gnatikaraka (GK)

```
6th highest degree -> rivals, obstacles, competitions
```

### #246 Darakaraka (DK)

```
7th (LOWEST) degree -> spouse, partnerships

DK planet-specific spouse traits:
  Sun->dignified/authoritative, Moon->nurturing/attractive,
  Mars->energetic/ambitious, Mercury->witty/intelligent,
  Jupiter->virtuous/wise, Venus->artistic/charming,
  Saturn->mature/responsible
```

### #247 Karakamsha

```
Karakamsha = Sign occupied by Atmakaraka in Navamsa (D9) chart.
1. Find AK planet
2. Look up AK's position in D9 chart
3. The D9 sign where AK sits = Karakamsha
```

### #248 Swamsha

```
Swamsha = Karakamsha when used as Lagna (reference point).
Chart read from Karakamsha as ascendant.
Planets relative to Karakamsha reveal deep karmic patterns.
```

### #249 Chara Karaka (Variable Significator)

```
Unlike fixed significations (Naisargika Karaka), Chara Karakas
change based on actual planetary degrees in the birth chart.

The 7 Chara Karakas are ranked by degree (see #240-#246).
Some traditions include Rahu as 8th karaka.
```

### #250 Jaimini Rashi Drishti (Sign Aspect)

```
Jaimini aspects are sign-based, not planet-based:
  Movable signs (0,3,6,9) aspect Fixed signs except the one adjacent
  Fixed signs (1,4,7,10) aspect Movable signs except the one adjacent
  Dual signs (2,5,8,11) aspect other Dual signs

Example:
  Aries aspects: Leo, Scorpio, Aquarius (not Capricorn)
  Taurus aspects: Cancer, Sagittarius, Pisces (not Aries)
  Gemini aspects: Virgo, Sagittarius, Pisces
```

### #251 Jaimini Graha Drishti

```
In Jaimini, all planets aspect the houses their sign aspects (Rashi Drishti).
A planet in a Movable sign aspects all planets in Fixed signs (except adjacent).
Supplemental to Parashari Graha Drishti.
```

### #252 Arudha Pada

```
A1 through A12 for all 12 houses. See algorithm #7.
Each Arudha Pada = projected point showing the external/worldly
manifestation of that house's significations.
```

### #253 Upapada

```
Upapada = A12 (Arudha Pada of 12th house). See #8.
Primary indicator for marriage and spouse in Jaimini.
```

### #254 Chara Dasha (Jaimini)

See algorithm #69.

### #255 Brahma, Maheshwara, and Rudra Analysis

```
Brahma:
  From the 6th, 8th, 12th from AK sign (in D1), find the strongest odd sign.
  Lord of that sign = Brahma. Brahma gives material creation/growth.

Maheshwara:
  6th from AK in the sign whose lord has most aspects/conjunctions.
  Lord of the 8th from AK sign = Maheshwara. Indicates death circumstances.

Rudra:
  Planet causing maximum harm (malefic in 8th from AL or 2nd from AL).
  Rudra Dasha = most challenging period.
```

---

## 18. Nadi Astrology & Specialized Methods

### #256 Bhrigu Nandi Nadi

```
Every planet pair tells a story based on their house relationship.
Read planets as subjects: "Planet A in Nth house from Planet B means..."
Systematic pair-wise reading of all 45 planet pairs (9C2 = 36 + self).
```

### #257 Dhruva Nadi

```
Based on sub-sub-divisions of nakshatras (Nadi Amsha = D150 level).
Each person born in a specific Nadi Amsha has pre-written leaf predictions.
```

### #258 Chandra Kala Nadi

```
Moon-based Nadi system. Moon's exact position in nakshatra pada
determines the chapter of prediction.
```

### #259 Nadi Amsha

```
Ultra-fine divisional level (D150 or finer).
150 divisions of each sign = 0.2 deg per division.
```

### #260 Nadiamsa D60 Interpretation

```
Each of 60 Shashtiamsas has a deity name and specific prediction:
Ghora, Rakshasa, Deva, Kubera, Yaksha, Kinnara, etc.
(60 named divisions with specific fortunate/unfortunate markers)
```

### #261 Nadi Planetary Chaining

```
Read chart as a narrative chain:
Start from Lagna Lord -> go to its sign -> read its lord -> continue chain.
Each link in the chain reveals a life chapter.
```

### #262 Transit-based Nadi Predictions

```
Combine natal Nadi Amsha with current transit positions.
When transit planet crosses natal Nadi boundary -> event triggers.
```

### #263 Bhrigu Bindu

```
bhriguBindu = (rahuLon + moonLon) / 2
Or: midpoint of Rahu and Moon on the ecliptic.
Transit of Jupiter/Saturn over Bhrigu Bindu triggers major events.
```

### #264 Pranapada Lagna

```
Algorithm (BPHS):
1. elapsedVighatis = (elapsedMinutes / 24) * 60
2. Base point depends on Sun's sign type:
   Movable: ppBase = sunLon
   Fixed:   ppBase = (sunLon + 240) % 360
   Dual:    ppBase = (sunLon + 120) % 360
3. pranapada = (ppBase + elapsedVighatis * 0.4) % 360
```

### #265 Gulika and Mandi Analysis

```
Gulika = Saturn's upagraha (sub-planet).
Position derived from Gulika Kalam time:
  gulikaLon = ascendant at the start of Gulika Kalam period.
Mandi = a specific point within Gulika's duration.
Both are malefic shadow points that afflict the house they occupy.
```

---

## 19. Remedial Astrology -- Upaya

### #266 Gemstone Recommendation

```
Multi-chart cross-verification:
1. D1: Check Lagnesh, Yogakaraka, Trikona lords
2. Exclude: Trishadaya (3,6,11) lords, Dusthana (6,8,12) lords, Maraka (2,7) lords
3. Bhava Chalit: Verify no house shift disqualifies
4. KP Sub-lord: Confirm benefic sub-lord for gemstone planet
5. D9 (Navamsa): Confirm dignity maintained
6. Ashtakavarga: BAV points for gemstone planet's house

Gemstone catalog:
  Sun->Ruby (Manikya), Moon->Pearl (Moti), Mars->Red Coral (Moonga),
  Mercury->Emerald (Panna), Jupiter->Yellow Sapphire (Pukhraj),
  Venus->Diamond (Heera), Saturn->Blue Sapphire (Neelam),
  Rahu->Hessonite (Gomed), Ketu->Cat's Eye (Lehsunia)

Each gemstone specifies: minRatti, maxRatti, metal, finger, hand,
day, paksha, beejMantra, chantCount (108), purification ritual,
conflictingPlanets (never wear together).
```

### #267 Rudraksha Recommendation

```
Based on afflicted planet:
  Sun->1 Mukhi, Moon->2 Mukhi, Mars->3 Mukhi, Mercury->4 Mukhi,
  Jupiter->5 Mukhi, Venus->6 Mukhi, Saturn->7 Mukhi,
  Rahu->8 Mukhi, Ketu->9 Mukhi
```

### #268 Mantra Remedies

```
Beej Mantras per planet:
  Sun:     "Om Hraam Hreem Hraum Sah Suryaya Namah"
  Moon:    "Om Shraam Shreem Shraum Sah Chandraya Namah"
  Mars:    "Om Kraam Kreem Kraum Sah Bhaumaya Namah"
  Mercury: "Om Braam Breem Braum Sah Budhaya Namah"
  Jupiter: "Om Graam Greem Graum Sah Gurave Namah"
  Venus:   "Om Draam Dreem Draum Sah Shukraya Namah"
  Saturn:  "Om Praam Preem Praum Sah Shanaischaraya Namah"
  Rahu:    "Om Bhraam Bhreem Bhraum Sah Rahave Namah"
  Ketu:    "Om Sraam Sreem Sraum Sah Ketave Namah"

Chant count: 108 per sitting.
```

### #269 Yantra Remedies

```
Geometric mystical diagrams specific to each planet.
Installed on specific day/nakshatra with mantra activation.
```

### #270 Graha Shanti

```
Planetary pacification rituals based on afflicted planet.
Includes homa (fire ritual), puja, and specific offerings.
```

### #271 Navagraha Puja

```
Complete worship of all 9 planets.
Performed for overall planetary balance.
```

### #272 Charity (Daan)

```
Planet-specific donations:
  Sun->wheat/gold/jaggery, Moon->rice/silver/white cloth,
  Mars->red lentils/copper, Mercury->green moong/emerald items,
  Jupiter->turmeric/yellow cloth/gold, Venus->white items/perfume/silk,
  Saturn->black sesame/iron/mustard oil, Rahu->coconut/blanket,
  Ketu->dog food/blanket/sesame
```

### #273 Fasting (Vrat)

```
Planet-specific fasting days:
  Sun->Sunday, Moon->Monday, Mars->Tuesday, Mercury->Wednesday,
  Jupiter->Thursday, Venus->Friday, Saturn->Saturday
```

### #274 Temple Rituals

```
Planet-specific temples and deities:
  Sun->Surya Mandir, Saturn->Shani Mandir, etc.
```

### #275 Ratna Pariksha (Gemstone Testing)

```
Verify gemstone purity, weight (ratti), color, clarity.
Test against specific criteria before wearing.
```

### #276 Beej Mantra

```
Seed mantras for each planet (see #268).
Chant count: 108 (one mala) per sitting.
```

### #277 Stotra Recitation

```
Extended hymns:
  Sun: Aditya Hridaya Stotram
  Moon: Shiv Mahimna Stotram
  Mars: Hanuman Chalisa
  Jupiter: Vishnu Sahasranama
  etc.
```

---

## 20. Advanced Astronomical & Computational Tools

### #278 Swiss Ephemeris

```
High-precision planetary position computation.
Uses JPL DE431 ephemeris data.
WASM implementation for browser: @swisseph/browser
Precision: sub-arcsecond for all planets.
```

### #279 Lahiri Ayanamsa

```
T = Julian Centuries from J2000.0
JD = (dateMs / 86400000) + 2440587.5
T = (JD - 2451545.0) / 36525.0

offsetSeconds = 5029.0966 * T + 1.11161 * T^2
initialAyanamsaSeconds = 23 deg 51 min 25.532 sec = 85885.532 arcsec
lahiriSeconds = initialAyanamsaSeconds + offsetSeconds
lahiriAyanamsa = lahiriSeconds / 3600   // in degrees

Approx 24.17 deg for year 2026
```

### #280 Raman Ayanamsa

```
ramanAyanamsa = (lahiriSeconds - 5207.0) / 3600
// Approximately 1 deg 26 min 47 sec less than Lahiri
```

### #281 KP Ayanamsa

```
kpAyanamsa = (lahiriSeconds - 354.0) / 3600
// Approximately 5 min 54 sec less than Lahiri
```

### #282 True Rahu-Ketu Calculation

```
Uses astronomy-engine's GeoVector for Moon's true node.
True node oscillates around mean node with ~18.6-year period.
More accurate for daily predictions; used by Drik Panchang.
```

### #283 Mean Rahu-Ketu Calculation

```
Mean Node formula (Meeus Chapter 47):
T = Julian Centuries from J2000.0
omega = 125.04452 - 1934.136261*T + 0.0020708*T^2 + T^3/450000
Rahu = (omega - ayanamsa + 360) % 360
Ketu = (Rahu + 180) % 360
Speed approx -0.053 deg/day (always retrograde)
```

### #284 Sidereal Zodiac Calculation

```
siderealLongitude = (tropicalLongitude - ayanamsa + 360) % 360

All Vedic calculations use sidereal (Nirayana) zodiac.
Reference star: Chitra (Spica) at 180 deg in Lahiri system.
```

### #285 Tropical Zodiac Conversion

```
tropicalLongitude = (siderealLongitude + ayanamsa) % 360

For Western astrology comparison or mixed systems.
```

### #286 Local Mean Time Calculation

```
LMT = UTC + (observerLongitude / 15.0) hours

More precise than timezone:
  tzOffsetMs = round(observerLongitude / 15.0) * 3600000
  localDate = new Date(utcDate.getTime() + tzOffsetMs)
```

### #287 Local Sidereal Time

```
gmst = SiderealTime(date)           // Greenwich MST in hours
lmst = gmst + (observerLon / 15.0)  // Local MST in hours
lmst = ((lmst % 24) + 24) % 24      // normalize to 0-24
```

### #288 Ayanamsa Calculation

```
See #279 (Lahiri), #280 (Raman), #281 (KP).

General framework:
  ayanamsa = getAyanamsa(date, type)
  where type = 'lahiri' | 'kp' | 'raman'
```

### #289 Planetary Speed Calculation

```
halfWindow = 30 minutes (1800000 ms)
tMinus = date - halfWindow
tPlus = date + halfWindow

lonMinus = Ecliptic(GeoVector(body, tMinus)).elon
lonPlus = Ecliptic(GeoVector(body, tPlus)).elon

diff = lonPlus - lonMinus
if diff > 180: diff -= 360
if diff < -180: diff += 360

speed = diff * 24   // degrees per day
```

### #290 Retrograde Station Detection

```
A planet stations (speed = 0) when transitioning direct<->retrograde.

Algorithm:
1. Calculate speed at regular intervals
2. Find sign change in speed (positive -> negative or vice versa)
3. Binary search for exact zero-crossing

Station Direct (SD): speed goes from negative to positive
Station Retrograde (SR): speed goes from positive to negative
```

### #291 Eclipse Calculation

```
Solar Eclipse: New Moon (tithi 29->0) when Moon is near Rahu/Ketu axis.
  |moonLon - rahuLon| < ~18 deg or |moonLon - ketuLon| < ~18 deg

Lunar Eclipse: Full Moon (tithi 14->15) when Moon is near nodal axis.
  |moonLon - rahuLon| < ~12 deg or |moonLon - ketuLon| < ~12 deg

astronomy-engine provides: SearchLunarEclipse, SearchSolarEclipse
```

### #292 Planetary Ingress Calculation

```
Ingress = moment a planet enters a new rashi.

Algorithm (same as Sankranti for Sun):
1. Get current rashi: currentRashi = floor(siderealLon / 30)
2. Target boundary = (currentRashi + 1) * 30
3. Binary search for siderealLon crossing target
4. 50 iterations for sub-minute precision

For Sun ingress (Sankranti):
  Makar Sankranti (Capricorn entry): special 16-hour punya kalam
  Others: 6h 24min punya kalam
```

### #293 Sunrise-based Panchang Calculation

```
Vedic day starts at sunrise, not midnight.

Algorithm:
1. Calculate sunrise for the date
2. If current time < sunrise: use previous day's sunrise as day start
3. All Panchang elements (Tithi, Nakshatra, Yoga, Karana) calculated at sunrise
4. Transitions within the day tracked via binary search
5. "Udaya Tithi" = tithi running at sunrise = tithi of that Vedic day
```

### #294 House Cusp Calculation

```
Supported systems:

1. Whole Sign (BPHS standard):
   ascRashi = floor(ascLon / 30)
   house[i].start = (ascRashi + i) * 30
   house[i].end = house[i].start + 30

2. Equal House:
   house[i].start = (ascLon + i * 30) % 360
   house[i].end = (house[i].start + 30) % 360

3. Sripati (Bhava Chalit): See #4

4. Placidus (for KP):
   Uses time-based trisection of semi-arcs.
   Requires exact birth time, latitude, and obliquity.
   Implemented via KP chart module.

5. KP Sublord System:
   Nakshatra divided into 9 unequal parts proportional to Vimshottari durations.

   SignLord = RASHI_LORDS[floor(lon / 30)]
   StarLord = vimshottariLords[nakshatraIndex % 9]

   Sub-Lord: Starting from StarLord, divide nakshatra into 9 parts:
     span[i] = (lordYears[i] / 120) * 13.333 deg
     Find which part contains the longitude offset

   Sub-Sub Lord: Same process, dividing Sub span into 9 further parts.
```

---

## Key Implementation Constants

```javascript
// Astronomical
MS_PER_DAY = 86400000
MS_PER_HOUR = 3600000
MS_PER_MINUTE = 60000
JD_UNIX_EPOCH = 2440587.5
JD_J2000 = 2451545.0
DAYS_PER_CENTURY = 36525.0

// Vedic
NAKSHATRA_SPAN = 13.333   // degrees (13 deg 20 min = 800 arcminutes)
PADA_SPAN = 3.333          // degrees (3 deg 20 min = 200 arcminutes)
NAVAMSA_SPAN = 3.333       // degrees (360/108)
TITHI_SPAN = 12             // degrees (360/30)
YOGA_SPAN = 13.333          // degrees (360/27)
KARANA_SPAN = 6              // degrees (360/60)

// Vimshottari
VIMSHOTTARI_CYCLE = 120     // years
VIMSHOTTARI_LORDS = [Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury]
VIMSHOTTARI_DURATIONS = [7, 20, 6, 10, 7, 18, 16, 19, 17]

// Rashi Lords
RASHI_LORDS = [Mars, Venus, Mercury, Moon, Sun, Mercury, Venus, Mars,
               Jupiter, Saturn, Saturn, Jupiter]

MS_PER_YEAR = 365.2425 * 86400000
```

---

## NPM Packages for Implementation

| Package | Features | Engine |
|---------|----------|--------|
| `@prisri/jyotish` | Most complete: Kundli, D1-D60, Vimshottari, Ashtakavarga, Matching, KP, Gemstones, Jaimini, Transit, Yogas, Doshas | `astronomy-engine` |
| `vpv-panchangam` | Swiss Ephemeris WASM, D1-D60, Ashtakavarga, Jaimini, Chara Karakas, Friendships | `@swisseph/browser` |
| `@grahan/vedic` | Panchang, Kundali, SVG charts, Vimshottari, Gun Milan | `@grahan/core` (VSOP87) |
| `@ishubhamx/panchangam-js` | 80+ festivals, 98.64% accuracy, offline | Swiss Ephemeris |
| `vedic-calc` (Python) | 4 Dasha systems, Prashna, Muhurta solver, SVG rendering | `pyswisseph` |
| `mayaastrolib` (Python) | Western+Vedic, KP, Tajika, Varshaphal, ~3600 LOC | `pyswisseph` |
| `VedAstro` (.NET/Python) | MCP server, 200+ API endpoints, AI astrologer | Swiss Ephemeris |

---
---

# Matrix of Destiny -- Reverse Engineered Algorithms

> **Sites analyzed**: matrixdestinycalculator.com, matrix-destiny.com, thematrixofdestiny.com, destinymatrixai.com, astroludico.com  
> **npm package**: `destiny-matrix-core` (MIT, 500+ lines analyzed)  
> **Open-source refs**: AhmadHassan-BTed/SoulMatrix, samwega/Destiny-Matrix-Calculator, chartdestinymatrix.com/formulas  
> **Method origin**: Natalia Ladini, 2006 -- "Diagnosis of Purpose and Correction of Destiny" (ISBN 978-5-902525-66-0)

---

## System Overview

The **Matrix of Destiny** (also: Destiny Matrix, Matrix of Fate) is a numerology system that:
- Uses **ONLY date of birth** (no time, no location, no name)
- Maps values to the **22 Major Arcana** (Tarot)
- Arranges them on an **octagram** (8-pointed star = two overlapping squares)
- Combines Numerology + Tarot + Kabbalah + Chakra concepts

Unlike Vedic astrology, there are **no astronomical calculations** -- it is pure numerological reduction.

---

## 1. The Reduction Rule (Core of Everything)

```javascript
// THE fundamental operation: reduce any number to range 1-22
// Canonical (Ladini) method -- iterate until <= 22:
function reduceArcana(n) {
  let v = Math.abs(Math.trunc(n));
  while (v > 22) {
    v = String(v).split('').reduce((s, d) => s + Number(d), 0);
  }
  return v === 0 ? 22 : v;   // 0 maps to 22 (The Fool/World)
}
```

**Examples**: r(46) = 4+6 = 10 | r(29) = 2+9 = 11 | r(22) = 22 | r(19) = 19

> Variant methods exist: single reduction (`destiny-matrix-core`), subtract-22 (non-Ladini).

---

## 2. Five Core Points (The Straight Square + Center)

From birth date `DD / MM / YYYY`:

```
A (Left)    = reduce(day)
B (Top)     = month                          // 1-12, never reduced
C (Right)   = reduce(sumDigits(year))
D (Bottom)  = reduce(A + B + C)              // "Karmic Task"
E (Center)  = reduce(A + B + C + D)          // "Soul Comfort"
```

### Worked Example: 19 April 1979

```
A = 19, B = 4, C = r(1+9+7+9) = r(26) = 8
D = r(19+4+8) = r(31) = 4
E = r(19+4+8+4) = r(35) = 8
```

---

## 3. Diagonal Corners (The Rotated Square)

```
F (Top-Left)     = reduce(A + B)
G (Top-Right)    = reduce(B + C)
H (Bottom-Right) = reduce(C + D)
I (Bottom-Left)  = reduce(D + A)
```

---

## 4. Axis Points (Lines from Corners to Center)

```
Inner:  J = reduce(A+E), K = reduce(B+E), L = reduce(C+E), M = reduce(D+E)
Outer:  reduce(A+J), reduce(B+K), reduce(C+L), reduce(D+M)
Near-center: reduce(J+E), reduce(K+E)
```

---

## 5. Purpose Lines

```
Sky Point   = reduce(B + D)
Earth Point = reduce(A + C)

Personal Purpose  = reduce(Sky + Earth)
Male Line         = reduce(F + I)
Female Line       = reduce(G + H)
Social Purpose    = reduce(Male + Female)
General Purpose   = reduce(Personal + Social)
Planetary Purpose = reduce(Social + General)
```

---

## 6. Love Line & Money Line

```
Hub R = reduce(M + L)

LOVE LINE:  [M, reduce(R+M), R]
MONEY LINE: [L, reduce(R+L), R]
```

---

## 7. Karmic Tail

```
[M, reduce(M + D), D]
```

---

## 8. Talents

```
Talent 1 (Spiritual)       = B (top/month)
Talent 2 (Intellect)       = Outer-top axis point
Talent 3 (Self-Expression) = K (inner-top)
```

---

## 9. Health Card (Chakra Map)

| Chakra | Physics | Energy | Emotions |
|--------|---------|--------|----------|
| Sahasrara (Crown) | A | B | reduce(A+B) |
| Ajna (Third Eye) | Outer-left | Outer-top | reduce(OL+OT) |
| Vishuddha (Throat) | J | K | reduce(J+K) |
| Anahata (Heart) | Near-center-left | Near-center-top | reduce(NCL+NCT) |
| Manipura (Solar Plexus) | E | E | reduce(E+E) |
| Svadhisthana (Sacral) | M | L | reduce(M+L) |
| Muladhara (Root) | C | D | reduce(C+D) |

**Result row**: Sum each column over 7 rows, then reduce.

---

## 10. Age Cycle / Life Timeline

```
Age  0 -> A (left)         Age 40 -> C (right)
Age 10 -> F (top-left)     Age 50 -> H (bottom-right)
Age 20 -> B (top)          Age 60 -> D (bottom)
Age 30 -> G (top-right)    Age 70 -> I (bottom-left)

Cycle repeats every 80 years.
Between each decade vertex, 7 intermediate nodes (56 total).
Spacing: 1.25 years per node.
Each sub-point = reduce(neighbor1 + neighbor2)
```

---

## 11. Compatibility Matrix

```javascript
compatPoint[x] = reduce(P1[x] + P2[x])   // for all points

sky      = reduce( reduce(P1.B + P2.B) + reduce(P1.D + P2.D) )
earth    = reduce( reduce(P1.A + P2.A) + reduce(P1.C + P2.C) )
relationship = reduce(sky + earth)

male     = reduce( reduce(P1.F + P2.F) + reduce(P1.I + P2.I) )
female   = reduce( reduce(P1.G + P2.G) + reduce(P1.H + P2.H) )
union    = reduce(male + female)

harmony  = reduce(relationship + union)
```

---

## 12. The 22 Major Arcana Meanings

| # | Arcana | Core Theme |
|---|--------|------------|
| 1 | The Magician | Willpower, initiative, skill |
| 2 | The High Priestess | Intuition, secrets, patience |
| 3 | The Empress | Creativity, abundance, nurture |
| 4 | The Emperor | Structure, authority, stability |
| 5 | The Hierophant | Tradition, teaching, guidance |
| 6 | The Lovers | Choices, relationships, values |
| 7 | The Chariot | Determination, victory, control |
| 8 | Justice/Strength | Balance, fairness, inner power |
| 9 | The Hermit | Introspection, wisdom, solitude |
| 10 | Wheel of Fortune | Cycles, fate, turning points |
| 11 | Strength/Justice | Courage, patience, soft power |
| 12 | The Hanged Man | Surrender, new perspective, sacrifice |
| 13 | Death/Transformation | Endings, rebirth, deep change |
| 14 | Temperance | Balance, moderation, integration |
| 15 | The Devil | Shadows, attachments, temptation |
| 16 | The Tower | Sudden change, upheaval, awakening |
| 17 | The Star | Hope, inspiration, serenity |
| 18 | The Moon | Illusion, fear, subconscious |
| 19 | The Sun | Joy, success, vitality |
| 20 | Judgement | Reckoning, calling, renewal |
| 21 | The World | Completion, wholeness, fulfillment |
| 22 | The Fool | New beginnings, leap of faith, freedom |

---

## Quick Implementation

```javascript
import { fromDate, calculateCompatibility } from 'destiny-matrix-core';

const chart = fromDate('1979-04-19');
console.log(chart.points);       // All octagram nodes
console.log(chart.purposes);     // Sky, Earth, Personal, Social, General, Planetary
console.log(chart.chartHeart);   // 7-chakra health card
console.log(chart.years);        // 56 age-timeline nodes

const alice = fromDate('1990-06-15');
const bob = fromDate('1988-11-23');
const compat = calculateCompatibility(alice.points, bob.points);
console.log(compat.scores);      // sky, earth, relationship, union, harmony
```
