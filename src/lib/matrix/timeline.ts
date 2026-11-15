import type { MatrixPoints, MatrixAgeCycle } from './types';
import { reduce } from './core';

export function calculateAgeCycle(points: MatrixPoints): MatrixAgeCycle {
  const vertices = [
    { age: 0, energy: points.a },
    { age: 10, energy: points.f },
    { age: 20, energy: points.b },
    { age: 30, energy: points.g },
    { age: 40, energy: points.c },
    { age: 50, energy: points.h },
    { age: 60, energy: points.d },
    { age: 70, energy: points.i },
  ];

  const yearNodes: { year: number; energy: number }[] = [];

  for (let v = 0; v < 8; v++) {
    const startEnergy = vertices[v].energy;
    const endEnergy = vertices[(v + 1) % 8].energy;
    const startAge = vertices[v].age;

    yearNodes.push({ year: startAge, energy: startEnergy });

    let prevEnergy = startEnergy;
    for (let sub = 1; sub <= 7; sub++) {
      const age = startAge + sub * 1.25;
      const nextRef = sub < 7 ? prevEnergy : endEnergy;
      const subEnergy = reduce(prevEnergy + nextRef);
      yearNodes.push({ year: age, energy: subEnergy });
      prevEnergy = subEnergy;
    }
  }

  return { vertices, yearNodes };
}

export function getEnergyForAge(ageCycle: MatrixAgeCycle, age: number): number {
  const normalizedAge = age % 80;
  let closest = ageCycle.yearNodes[0];
  let minDiff = Infinity;

  for (const node of ageCycle.yearNodes) {
    const diff = Math.abs(node.year - normalizedAge);
    if (diff < minDiff) {
      minDiff = diff;
      closest = node;
    }
  }

  return closest.energy;
}
