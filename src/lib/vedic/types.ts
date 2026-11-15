export type Planet = 'Sun' | 'Moon' | 'Mars' | 'Mercury' | 'Jupiter' | 'Venus' | 'Saturn' | 'Rahu' | 'Ketu';
export type GrahaPlanet = Exclude<Planet, 'Rahu' | 'Ketu'>;

export type RashiIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type Lang = 'en' | 'hi';

export type AyanamsaSystem = 'lahiri' | 'kp' | 'raman';

export type ChartStyle = 'south-indian' | 'north-indian';

export interface Observer {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface BirthData {
  date: Date;
  observer: Observer;
  name?: string;
}

export interface PlanetPosition {
  planet: Planet;
  longitude: number;
  siderealLongitude: number;
  rashi: RashiIndex;
  rashiName: string;
  degree: number;
  minutes: number;
  seconds: number;
  nakshatra: number;
  nakshatraName: string;
  nakshatraLord: string;
  pada: number;
  speed: number;
  isRetrograde: boolean;
  house: number;
}

export interface HouseData {
  house: number;
  rashi: RashiIndex;
  rashiName: string;
  lord: string;
  planets: Planet[];
}

export interface KundliChart {
  birthData: BirthData;
  ayanamsa: number;
  ayanamsaSystem: AyanamsaSystem;
  ascendant: {
    longitude: number;
    rashi: RashiIndex;
    rashiName: string;
    degree: number;
    nakshatra: number;
    nakshatraName: string;
    pada: number;
  };
  planets: Record<Planet, PlanetPosition>;
  houses: HouseData[];
}

export interface VargaChart {
  name: string;
  division: number;
  ascendantRashi: RashiIndex;
  planets: Record<Planet, { rashi: RashiIndex; rashiName: string }>;
  houses: HouseData[];
}

export interface DashaPeriod {
  lord: string;
  startDate: Date;
  endDate: Date;
  durationYears: number;
  subPeriods?: DashaPeriod[];
}

export interface VimshottariDasha {
  birthMoonNakshatra: number;
  birthDashaLord: string;
  balanceYears: number;
  mahadashas: DashaPeriod[];
}

export interface Tithi {
  index: number;
  name: string;
  paksha: 'Shukla' | 'Krishna';
  number: number;
}

export interface Nakshatra {
  index: number;
  name: string;
  lord: string;
  pada: number;
}

export interface PanchangData {
  date: Date;
  observer: Observer;
  sunrise: Date | null;
  sunset: Date | null;
  tithi: Tithi;
  nakshatra: Nakshatra;
  yoga: { index: number; name: string };
  karana: { index: number; name: string };
  vara: { index: number; name: string };
  paksha: 'Shukla' | 'Krishna';
  masa: { index: number; name: string; isAdhika: boolean };
  samvat: { shaka: number; vikram: number; samvatsara: string };
  ayana: string;
  ritu: string;
}

export interface MuhurtaTime {
  name: string;
  start: Date;
  end: Date;
  isAuspicious: boolean;
}

export interface YogaResult {
  name: string;
  type: 'benefic' | 'malefic';
  strength: string;
  description: string;
  planets: Planet[];
  houses: number[];
}

export interface DoshaResult {
  name: string;
  isActive: boolean;
  severity: 'mild' | 'moderate' | 'severe';
  type?: string;
  cancellation?: string;
  description: string;
}

export interface TransitResult {
  planet: Planet;
  transitRashi: RashiIndex;
  houseFromMoon: number;
  effect: string;
  isFavorable: boolean;
}

export interface SadeSatiResult {
  isActive: boolean;
  phase: 'rising' | 'peak' | 'setting' | null;
  description: string;
}

export interface KootaScore {
  name: string;
  score: number;
  maxScore: number;
  area: string;
  description: string;
  boyValue: string;
  girlValue: string;
}

export interface CompatibilityResult {
  kootas: KootaScore[];
  totalScore: number;
  maxScore: number;
  verdict: string;
  mangalDosha: {
    boy: boolean;
    girl: boolean;
  };
}

export interface AshtakavargaData {
  bav: Record<GrahaPlanet, number[]>;
  sav: number[];
}

export interface KPData {
  signLord: string;
  starLord: string;
  subLord: string;
  subSubLord: string;
}

export type Dignity = 'exalted' | 'own' | 'moolatrikona' | 'friendly' | 'neutral' | 'enemy' | 'debilitated';

export interface RemedyRecommendation {
  type: 'gemstone' | 'mantra' | 'lifestyle' | 'ritual';
  planet: Planet;
  recommendation: string;
  details: string;
  priority: 'high' | 'medium' | 'low';
}

// --- Phase 1: Special Lagnas & Chalit ---

export interface SpecialLagna {
  name: string;
  longitude: number;
  rashi: RashiIndex;
  rashiName: string;
  degree: number;
  description: string;
}

export interface ArudhaPada {
  house: number;
  padaRashi: RashiIndex;
  padaRashiName: string;
  lord: string;
  exceptionApplied: boolean;
}

export interface BhavaMadhya {
  house: number;
  longitude: number;
  rashi: RashiIndex;
  degree: number;
}

export interface BhavaSandhi {
  house: number;
  longitude: number;
}

export interface ChalitChart {
  madhyas: BhavaMadhya[];
  sandhis: BhavaSandhi[];
  planetBhavas: Record<Planet, { chalitHouse: number; rashiHouse: number; shift: number }>;
}

// --- Phase 2: Planetary Analysis ---

export interface ConjunctionResult {
  planet1: Planet;
  planet2: Planet;
  house: number;
  orbDegrees: number;
  isTight: boolean;
}

export interface GrahaYuddhaResult {
  planet1: Planet;
  planet2: Planet;
  winner: Planet;
  loser: Planet;
  angularDiff: number;
}

export type BalaAvastha = 'Bala' | 'Kumara' | 'Yuva' | 'Vriddha' | 'Mrita';
export type JagraduAvastha = 'Jagrat' | 'Swapna' | 'Sushupti';
export type DeeptadiAvastha = 'Deepta' | 'Swastha' | 'Mudita' | 'Shanta' | 'Shakta' | 'Dukhi' | 'Vikala' | 'Khala' | 'Bhita';

export interface AvasthaResult {
  planet: Planet;
  bala: BalaAvastha;
  balaStrength: number;
  jagradadi: JagraduAvastha;
  deeptadi: DeeptadiAvastha;
}

export interface FriendshipResult {
  planet: Planet;
  other: Planet;
  natural: 'friend' | 'neutral' | 'enemy';
  temporal: 'friend' | 'enemy';
  composite: 'great_friend' | 'friend' | 'neutral' | 'enemy' | 'great_enemy';
}

// --- Phase 3: Shadbala ---

export interface ShadBalaComponent {
  sthanaBala: number;
  digBala: number;
  kalaBala: number;
  cheshtaBala: number;
  naisargikaBala: number;
  drikBala: number;
  total: number;
  required: number;
  ratio: number;
}

export interface ShadBalaData {
  planets: Record<GrahaPlanet, ShadBalaComponent>;
  ishtaPhala: Record<GrahaPlanet, number>;
  kashtaPhala: Record<GrahaPlanet, number>;
}

export interface BhavaBalaData {
  houses: { house: number; bhavadhipatiBala: number; bhavaDigBala: number; bhavaDrishtiBala: number; total: number }[];
}

// --- Phase 4: Jaimini ---

export type CharaKarakaType = 'AK' | 'AmK' | 'BK' | 'MK' | 'PK' | 'GK' | 'DK';

export interface CharaKaraka {
  type: CharaKarakaType;
  planet: Planet;
  degreeInSign: number;
  fullName: string;
}

export interface JaiminiData {
  charaKarakas: CharaKaraka[];
  karakamsha: RashiIndex;
  karakamshaName: string;
  arudhaPadas: ArudhaPada[];
  rashiDrishti: Record<number, number[]>;
}

// --- Phase 5: Extended Dashas ---

export interface YoginiDasha {
  birthNakshatra: number;
  startingYogini: number;
  balanceYears: number;
  periods: DashaPeriod[];
}

export interface AshtottariDasha {
  birthNakshatra: number;
  startingLord: number;
  balanceYears: number;
  periods: DashaPeriod[];
}

export type DashaSystemType = 'vimshottari' | 'yogini' | 'ashtottari';

// --- Phase 6: Applied Modules ---

export interface CareerAnalysis {
  tenthLord: string;
  tenthLordHouse: number;
  tenthLordDignity: Dignity;
  planetsInTenth: Planet[];
  amatyakaraka: Planet;
  amatyakarakaCareer: string;
  d10Strength: string;
  d10Planets: { planet: string; rashi: string; dignity: string }[];
  tenthHouseSAV: number;
  tenthHouseAspects: string[];
  atmakarakaAnalysis: { planet: Planet; mission: string; navamsaSign: string };
  arudhaLagnaSign: string;
  arudhaLagnaPlanets: string[];
  sixthHouseAnalysis: { lord: string; planets: Planet[]; strength: string };
  seventhHouseAnalysis: { lord: string; planets: Planet[]; strength: string };
  eleventhHouseAnalysis: { lord: string; planets: Planet[]; incomeStreams: number };
  activeRajYogas: string[];
  careerTimingDashaLords: string[];
}

export interface WealthAnalysis {
  secondLord: string;
  eleventhLord: string;
  induLagna: RashiIndex;
  dhanaYogas: string[];
  savSecondHouse: number;
  savEleventhHouse: number;
  horaAnalysis: { leoCount: number; cancerCount: number; selfEarned: boolean };
  secondHouseDetail: { lord: string; lordHouse: number; planets: Planet[]; bav: number };
  fifthHouseSpeculation: { lord: string; planets: Planet[]; hasJupiterVenus: boolean; potential: string };
  ninthHouseFortune: { lord: string; lordDignity: string; strength: string };
  eleventhHouseGains: { lord: string; planets: Planet[]; incomeStreams: number };
  ashtakavargaWealth: { jupiterBAVin2: number; venusBAVin2: number; jupiterBAVin11: number };
  wealthTimingLords: string[];
}

export interface HealthAnalysis {
  marakaLords: string[];
  badhakaLord: string;
  badhakaHouse: number;
  ayushTier: 'Alpayu' | 'Madhyayu' | 'Deerghayu';
  vulnerableAreas: string[];
  sixthHouseDisease: { planets: Planet[]; conditions: string[] };
  eighthHouseLongevity: { lord: string; lordDignity: string; score: string };
  twelfthHouseHospitalization: { planets: Planet[]; risk: string };
  lagnaStrength: { lord: string; shadbalaRatio: number; constitution: string };
  marakaAnalysis: { marakaLords: string[]; marakaDashaWarning: string };
  badhakaAnalysis: { house: number; lord: string; effect: string };
  d30Analysis: { maleficCount: number; vulnerabilities: string[] };
  ashtakavargaHealth: { sav6th: number; sav8th: number; healthScore: string };
}

export interface VarshaphalData {
  year: number;
  solarReturnDate: Date;
  varshaLagna: RashiIndex;
  muntha: RashiIndex;
  munthaLord: string;
  yearLord: string;
}

export interface VedhaResult {
  planet: Planet;
  favorableHouse: number;
  isObstructed: boolean;
  obstructingPlanet?: Planet;
  vedhaHouse?: number;
}

export interface MuhurtaElection {
  type: string;
  isAuspicious: boolean;
  score: number;
  factors: { name: string; passed: boolean; detail: string }[];
}

// --- Phase 7: Nadi & Astronomical ---

export interface NadiPoint {
  name: string;
  longitude: number;
  rashi: RashiIndex;
  rashiName: string;
  description: string;
}

export interface EclipseData {
  type: 'solar' | 'lunar';
  date: Date;
  kind: string;
}

export interface IngressData {
  planet: string;
  enteringRashi: RashiIndex;
  date: Date;
}

export interface StationData {
  planet: string;
  type: 'direct' | 'retrograde';
  date: Date;
  longitude: number;
}
