import type { MatrixPoints, MatrixHealthCard, ChakraRow } from './types';
import { reduce } from './core';

export function calculateHealthCard(points: MatrixPoints): MatrixHealthCard {
  const chakras: ChakraRow[] = [
    { name: 'Sahasrara (Crown)', physics: points.a, energy: points.b, emotions: reduce(points.a + points.b) },
    { name: 'Ajna (Third Eye)', physics: points.outerLeft, energy: points.outerTop, emotions: reduce(points.outerLeft + points.outerTop) },
    { name: 'Vishuddha (Throat)', physics: points.j, energy: points.k, emotions: reduce(points.j + points.k) },
    { name: 'Anahata (Heart)', physics: points.nearCenterLeft, energy: points.nearCenterTop, emotions: reduce(points.nearCenterLeft + points.nearCenterTop) },
    { name: 'Manipura (Solar Plexus)', physics: points.e, energy: points.e, emotions: reduce(points.e + points.e) },
    { name: 'Svadhisthana (Sacral)', physics: points.m, energy: points.l, emotions: reduce(points.m + points.l) },
    { name: 'Muladhara (Root)', physics: points.c, energy: points.d, emotions: reduce(points.c + points.d) },
  ];

  const sumPhysics = chakras.reduce((s, r) => s + r.physics, 0);
  const sumEnergy = chakras.reduce((s, r) => s + r.energy, 0);
  const sumEmotions = chakras.reduce((s, r) => s + r.emotions, 0);

  return {
    chakras,
    totals: {
      physics: reduce(sumPhysics),
      energy: reduce(sumEnergy),
      emotions: reduce(sumEmotions),
    },
  };
}
