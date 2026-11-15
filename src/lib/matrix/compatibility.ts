import type { MatrixChart, MatrixCompatibility, MatrixCompatibilityScores, MatrixPoints } from './types';
import { reduce } from './core';

export function calculateMatrixCompatibility(chart1: MatrixChart, chart2: MatrixChart): MatrixCompatibility {
  const p1 = chart1.points;
  const p2 = chart2.points;

  const combinedPoints: Partial<MatrixPoints> = {
    a: reduce(p1.a + p2.a),
    b: reduce(p1.b + p2.b),
    c: reduce(p1.c + p2.c),
    d: reduce(p1.d + p2.d),
    e: reduce(p1.e + p2.e),
    f: reduce(p1.f + p2.f),
    g: reduce(p1.g + p2.g),
    h: reduce(p1.h + p2.h),
    i: reduce(p1.i + p2.i),
    j: reduce(p1.j + p2.j),
    k: reduce(p1.k + p2.k),
    l: reduce(p1.l + p2.l),
    m: reduce(p1.m + p2.m),
  };

  const sky = reduce(reduce(p1.b + p2.b) + reduce(p1.d + p2.d));
  const earth = reduce(reduce(p1.a + p2.a) + reduce(p1.c + p2.c));
  const relationship = reduce(sky + earth);

  const male = reduce(reduce(p1.f + p2.f) + reduce(p1.i + p2.i));
  const female = reduce(reduce(p1.g + p2.g) + reduce(p1.h + p2.h));
  const union = reduce(male + female);

  const harmony = reduce(relationship + union);

  const scores: MatrixCompatibilityScores = {
    sky, earth, relationship, male, female, union, harmony,
  };

  return { person1: chart1, person2: chart2, combinedPoints, scores };
}
