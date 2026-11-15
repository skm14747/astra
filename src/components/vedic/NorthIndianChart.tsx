'use client';
import { useState } from 'react';
import type { HouseData, Planet } from '@/lib/vedic/types';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';

interface Props {
  houses: HouseData[];
  title?: string;
  onPlanetSelect?: (planet: Planet) => void;
}

const SIZE = 320;
const MID = SIZE / 2;

const HOUSE_LABEL_POS: [number, number][] = [
  [MID, 30], [SIZE - 40, 40], [SIZE - 30, MID], [SIZE - 40, SIZE - 40],
  [MID, SIZE - 30], [40, SIZE - 40], [30, MID], [40, 40],
  [MID - 50, MID - 50], [MID + 50, MID - 50], [MID + 50, MID + 50], [MID - 50, MID + 50],
];

export default function NorthIndianChart({ houses, title, onPlanetSelect }: Props) {
  const [hoveredHouse, setHoveredHouse] = useState<number | null>(null);

  return (
    <div className="inline-block" role="img" aria-label={`North Indian chart${title ? `: ${title}` : ''}`}>
      {title && <h3 className="text-sm font-medium mb-1 text-center">{title}</h3>}
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <rect x={0} y={0} width={SIZE} height={SIZE} fill="none" stroke="currentColor" strokeWidth={1.5} />
        <line x1={MID} y1={0} x2={SIZE} y2={MID} stroke="currentColor" strokeWidth={0.5} />
        <line x1={SIZE} y1={MID} x2={MID} y2={SIZE} stroke="currentColor" strokeWidth={0.5} />
        <line x1={MID} y1={SIZE} x2={0} y2={MID} stroke="currentColor" strokeWidth={0.5} />
        <line x1={0} y1={MID} x2={MID} y2={0} stroke="currentColor" strokeWidth={0.5} />
        <line x1={MID} y1={MID / 2} x2={MID + MID / 2} y2={MID} stroke="currentColor" strokeWidth={0.5} />
        <line x1={MID + MID / 2} y1={MID} x2={MID} y2={MID + MID / 2} stroke="currentColor" strokeWidth={0.5} />
        <line x1={MID} y1={MID + MID / 2} x2={MID - MID / 2} y2={MID} stroke="currentColor" strokeWidth={0.5} />
        <line x1={MID - MID / 2} y1={MID} x2={MID} y2={MID / 2} stroke="currentColor" strokeWidth={0.5} />

        {houses.map((h, idx) => {
          const [lx, ly] = HOUSE_LABEL_POS[idx] ?? [MID, MID];
          const isHovered = hoveredHouse === idx;
          return (
            <g
              key={idx}
              onMouseEnter={() => setHoveredHouse(idx)}
              onMouseLeave={() => setHoveredHouse(null)}
            >
              {isHovered && (
                <circle cx={lx} cy={ly} r={30} fill="rgba(212,168,67,0.06)" />
              )}
              <text x={lx} y={ly - 2} textAnchor="middle" fontSize={8} fill="currentColor" opacity={0.4}>
                {h.rashiName.slice(0, 3)}
              </text>
              {isHovered && (
                <text x={lx} y={ly - 12} textAnchor="middle" fontSize={7} fill="rgb(212,168,67)" opacity={0.7}>
                  Lord: {h.lord}
                </text>
              )}
              {h.planets.map((p, pi) => (
                <text
                  key={p}
                  x={lx - 12 + (pi % 2) * 24}
                  y={ly + 12 + Math.floor(pi / 2) * 14}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight="bold"
                  fill="currentColor"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onPlanetSelect?.(p)}
                >
                  {PLANET_GLYPH[p] || p.slice(0, 2)}
                </text>
              ))}
            </g>
          );
        })}

        <text x={MID} y={MID + 4} textAnchor="middle" fontSize={10} fill="currentColor" fontWeight="bold">
          {title || 'Chart'}
        </text>
      </svg>
    </div>
  );
}
