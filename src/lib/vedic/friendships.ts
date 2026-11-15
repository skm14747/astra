import { PLANET_FRIENDSHIPS, RASHI_LORDS } from './constants';
import type { Planet, KundliChart, FriendshipResult } from './types';

type FriendLevel = 'friend' | 'neutral' | 'enemy';
type CompositeLevel = 'great_friend' | 'friend' | 'neutral' | 'enemy' | 'great_enemy';

export function getNaturalFriendship(planet: string, other: string): FriendLevel {
  if (planet === other) return 'friend';
  const data = PLANET_FRIENDSHIPS[planet];
  if (!data) return 'neutral';
  if (data.friends.includes(other)) return 'friend';
  if (data.enemies.includes(other)) return 'enemy';
  return 'neutral';
}

export function getTemporalFriendship(planetHouse: number, otherHouse: number): 'friend' | 'enemy' {
  const diff = ((otherHouse - planetHouse + 12) % 12) + 1;
  return [2, 3, 4, 10, 11, 12].includes(diff) ? 'friend' : 'enemy';
}

export function getCompositeFriendship(natural: FriendLevel, temporal: 'friend' | 'enemy'): CompositeLevel {
  if (natural === 'friend' && temporal === 'friend') return 'great_friend';
  if (natural === 'friend' && temporal === 'enemy') return 'neutral';
  if (natural === 'neutral' && temporal === 'friend') return 'friend';
  if (natural === 'neutral' && temporal === 'enemy') return 'enemy';
  if (natural === 'enemy' && temporal === 'friend') return 'neutral';
  return 'great_enemy';
}

export function calculateAllFriendships(chart: KundliChart): FriendshipResult[] {
  const results: FriendshipResult[] = [];
  const grahas: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

  for (const p of grahas) {
    for (const o of grahas) {
      if (p === o) continue;
      const natural = getNaturalFriendship(p, o);
      const temporal = getTemporalFriendship(chart.planets[p].house, chart.planets[o].house);
      const composite = getCompositeFriendship(natural, temporal);
      results.push({ planet: p, other: o, natural, temporal, composite });
    }
  }
  return results;
}
