export interface MatrixPoints {
  a: number; b: number; c: number; d: number; e: number;
  f: number; g: number; h: number; i: number;
  j: number; k: number; l: number; m: number;
  outerLeft: number; outerTop: number; outerRight: number; outerBottom: number;
  nearCenterLeft: number; nearCenterTop: number;
}

export interface MatrixPurposes {
  sky: number;
  earth: number;
  personal: number;
  maleLine: number;
  femaleLine: number;
  social: number;
  general: number;
  planetary: number;
}

export interface MatrixLoveMoney {
  hub: number;
  love: [number, number, number];
  money: [number, number, number];
}

export interface MatrixKarmicTail {
  points: [number, number, number];
  description: string;
}

export interface MatrixTalents {
  spiritual: number;
  intellect: number;
  selfExpression: number;
}

export interface ChakraRow {
  name: string;
  physics: number;
  energy: number;
  emotions: number;
}

export interface MatrixHealthCard {
  chakras: ChakraRow[];
  totals: { physics: number; energy: number; emotions: number };
}

export interface MatrixAgeCycle {
  vertices: { age: number; energy: number }[];
  yearNodes: { year: number; energy: number }[];
}

export interface MatrixChart {
  birthDate: { day: number; month: number; year: number };
  points: MatrixPoints;
  purposes: MatrixPurposes;
  loveMoney: MatrixLoveMoney;
  karmicTail: MatrixKarmicTail;
  talents: MatrixTalents;
  healthCard: MatrixHealthCard;
  ageCycle: MatrixAgeCycle;
}

export interface MatrixCompatibilityScores {
  sky: number;
  earth: number;
  relationship: number;
  male: number;
  female: number;
  union: number;
  harmony: number;
}

export interface MatrixCompatibility {
  person1: MatrixChart;
  person2: MatrixChart;
  combinedPoints: Partial<MatrixPoints>;
  scores: MatrixCompatibilityScores;
}

export interface ArcanaInfo {
  number: number;
  name: string;
  theme: string;
}
