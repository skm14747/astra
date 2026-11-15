import type {
  MatrixPoints, MatrixPurposes, MatrixLoveMoney, MatrixKarmicTail,
  MatrixTalents, MatrixChart,
} from './types';
import { calculateHealthCard } from './health';
import { calculateAgeCycle } from './timeline';

export function reduce(n: number): number {
  let v = Math.abs(Math.trunc(n));
  while (v > 22) {
    v = String(v).split('').reduce((s, d) => s + Number(d), 0);
  }
  return v === 0 ? 22 : v;
}

function sumDigits(n: number): number {
  return String(Math.abs(Math.trunc(n))).split('').reduce((s, d) => s + Number(d), 0);
}

export function calculateCorePoints(day: number, month: number, year: number): MatrixPoints {
  const a = reduce(day);
  const b = month; // 1-12, never reduced
  const c = reduce(sumDigits(year));
  const d = reduce(a + b + c);
  const e = reduce(a + b + c + d);

  const f = reduce(a + b);
  const g = reduce(b + c);
  const h = reduce(c + d);
  const i = reduce(d + a);

  const j = reduce(a + e);
  const k = reduce(b + e);
  const l = reduce(c + e);
  const m = reduce(d + e);

  const outerLeft = reduce(a + j);
  const outerTop = reduce(b + k);
  const outerRight = reduce(c + l);
  const outerBottom = reduce(d + m);

  const nearCenterLeft = reduce(j + e);
  const nearCenterTop = reduce(k + e);

  return {
    a, b, c, d, e,
    f, g, h, i,
    j, k, l, m,
    outerLeft, outerTop, outerRight, outerBottom,
    nearCenterLeft, nearCenterTop,
  };
}

export function calculatePurposes(points: MatrixPoints): MatrixPurposes {
  const sky = reduce(points.b + points.d);
  const earth = reduce(points.a + points.c);
  const personal = reduce(sky + earth);
  const maleLine = reduce(points.f + points.i);
  const femaleLine = reduce(points.g + points.h);
  const social = reduce(maleLine + femaleLine);
  const general = reduce(personal + social);
  const planetary = reduce(social + general);

  return { sky, earth, personal, maleLine, femaleLine, social, general, planetary };
}

export function calculateLoveMoney(points: MatrixPoints): MatrixLoveMoney {
  const hub = reduce(points.m + points.l);
  const loveMid = reduce(hub + points.m);
  const moneyMid = reduce(hub + points.l);

  return {
    hub,
    love: [points.m, loveMid, hub],
    money: [points.l, moneyMid, hub],
  };
}

export function calculateKarmicTail(points: MatrixPoints): MatrixKarmicTail {
  const mid = reduce(points.m + points.d);
  return {
    points: [points.m, mid, points.d],
    description: `${points.m} (pattern carried) → ${mid} (how it repeats) → ${points.d} (lesson)`,
  };
}

export function calculateTalents(points: MatrixPoints): MatrixTalents {
  return {
    spiritual: points.b,
    intellect: points.outerTop,
    selfExpression: points.k,
  };
}

export function calculateMatrix(day: number, month: number, year: number): MatrixChart {
  const points = calculateCorePoints(day, month, year);
  const purposes = calculatePurposes(points);
  const loveMoney = calculateLoveMoney(points);
  const karmicTail = calculateKarmicTail(points);
  const talents = calculateTalents(points);
  const healthCard = calculateHealthCard(points);
  const ageCycle = calculateAgeCycle(points);

  return {
    birthDate: { day, month, year },
    points,
    purposes,
    loveMoney,
    karmicTail,
    talents,
    healthCard,
    ageCycle,
  };
}
