import { MakeTime } from 'astronomy-engine';
import type { AyanamsaSystem } from '../vedic/types';

export function getLahiriAyanamsa(date: Date): number {
  const T = MakeTime(date).tt / 36525.0;
  const ayan = 23.85 + (50.27 / 3600) * (T * 100);
  return ayan;
}

export function getKPAyanamsa(date: Date): number {
  const T = MakeTime(date).tt / 36525.0;
  const ayan = 23.86667 + (50.2388475 / 3600) * (T * 100);
  return ayan;
}

export function getRamanAyanamsa(date: Date): number {
  const T = MakeTime(date).tt / 36525.0;
  const ayan = 22.37 + (50.27 / 3600) * (T * 100);
  return ayan;
}

export function getAyanamsa(date: Date, system: AyanamsaSystem = 'lahiri'): number {
  switch (system) {
    case 'lahiri': return getLahiriAyanamsa(date);
    case 'kp': return getKPAyanamsa(date);
    case 'raman': return getRamanAyanamsa(date);
    default: return getLahiriAyanamsa(date);
  }
}

export function toSidereal(tropicalLon: number, ayanamsa: number): number {
  return ((tropicalLon - ayanamsa) % 360 + 360) % 360;
}
