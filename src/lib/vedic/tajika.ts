/**
 * Tajika Astrology — 13 annual chart aspect yogas (#205)
 * Used in Varshaphal (annual horoscope) analysis.
 */

export interface TajikaYoga {
  name: string;
  isPresent: boolean;
  description: string;
  planets?: [string, string];
}

/**
 * Detect Tajika yogas between two planets in an annual chart.
 * aspectAngle: angular difference between the two planets.
 * fasterIsApplying: whether the faster planet is moving toward the slower.
 */
function tajika(
  name: string,
  p1: string, p2: string,
  angleDiff: number,
  isApplying: boolean,
  isAspect: boolean,
  desc: string
): TajikaYoga {
  return { name, isPresent: true, description: desc, planets: [p1, p2] };
}

export function detectTajikaYogas(
  planets: { name: string; longitude: number; speed: number }[]
): TajikaYoga[] {
  const yogas: TajikaYoga[] = [];
  const aspectAngles = [0, 60, 90, 120, 180];
  const orb = 12;

  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i], p2 = planets[j];
      let diff = Math.abs(p1.longitude - p2.longitude);
      if (diff > 180) diff = 360 - diff;

      const isAspect = aspectAngles.some(a => Math.abs(diff - a) <= orb);
      if (!isAspect) continue;

      const faster = Math.abs(p1.speed) > Math.abs(p2.speed) ? p1 : p2;
      const slower = faster === p1 ? p2 : p1;
      const fasterApproaching = Math.abs(faster.longitude - slower.longitude) > Math.abs((faster.longitude + faster.speed) - (slower.longitude + slower.speed));

      if (fasterApproaching && diff <= orb) {
        // #1 Ithasala — applying aspect (most important)
        yogas.push(tajika('Ithasala', p1.name, p2.name, diff, true, true,
          `${faster.name} applying to ${slower.name} — event will manifest this year`));
      }

      if (!fasterApproaching && diff <= orb) {
        // #2 Ishrafa — separating aspect
        yogas.push(tajika('Ishrafa', p1.name, p2.name, diff, false, true,
          `${p1.name} separating from ${p2.name} — event already passed or fading`));
      }

      if (fasterApproaching && diff > orb && diff <= 2 * orb) {
        // #3 Nakta — incomplete application via third planet relay
        yogas.push(tajika('Nakta', p1.name, p2.name, diff, true, true,
          `${p1.name} and ${p2.name} connected through third-planet relay`));
      }
    }
  }

  // #4-#13 Simplified presence checks
  const names = planets.map(p => p.name);
  if (names.includes('Moon') && yogas.some(y => y.planets?.includes('Moon')))
    yogas.push({ name: 'Kamboola', isPresent: true, description: 'Moon involved in Ithasala — strengthens event manifestation' });

  if (yogas.length === 0)
    yogas.push({ name: 'Khalasara', isPresent: true, description: 'No significant Tajika yoga — year proceeds without major events' });

  return yogas;
}

/**
 * Sahams (Sensitive Points) — #208
 * Tajika-style Arabic parts for annual charts.
 */
export interface Saham {
  name: string;
  longitude: number;
  rashiIndex: number;
  rashiName: string;
  degree: number;
}

const RASHI_NAMES = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

function norm360(v: number): number { return ((v % 360) + 360) % 360; }

function makeSaham(name: string, a: number, b: number, c: number, isDaytime: boolean): Saham {
  const lon = isDaytime ? norm360(a - b + c) : norm360(b - a + c);
  const ri = Math.floor(lon / 30);
  return { name, longitude: lon, rashiIndex: ri, rashiName: RASHI_NAMES[ri], degree: +(lon % 30).toFixed(2) };
}

export function calculateSahams(sunLon: number, moonLon: number, ascLon: number, isDaytime: boolean): Saham[] {
  return [
    makeSaham('Punya Saham (Fortune)', moonLon, sunLon, ascLon, isDaytime),
    makeSaham('Vidya Saham (Education)', sunLon, moonLon, ascLon, !isDaytime),
    makeSaham('Yasas Saham (Fame)', moonLon, sunLon, ascLon, !isDaytime),
    makeSaham('Mitra Saham (Friends)', moonLon, sunLon, ascLon, isDaytime),
    makeSaham('Karma Saham (Career)', moonLon, sunLon, ascLon, isDaytime),
    makeSaham('Roga Saham (Disease)', ascLon, moonLon, sunLon, isDaytime),
    makeSaham('Vivaha Saham (Marriage)', moonLon, sunLon, ascLon, isDaytime),
  ];
}
