'use client';
import { useState } from 'react';
import type { HouseData, Planet } from '@/lib/vedic/types';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import { useT } from '@/lib/i18n';

interface Props {
  houses: HouseData[];
  ascendantRashi: number;
  title?: string;
  onPlanetSelect?: (planet: Planet) => void;
}

const CELL_SIZE = 80;
const GRID_SIZE = CELL_SIZE * 4;

const SOUTH_INDIAN_POSITIONS: [number, number][] = [
  [1, 0], [2, 0], [3, 0], [3, 1],
  [3, 2], [3, 3], [2, 3], [1, 3],
  [0, 3], [0, 2], [0, 1], [0, 0],
];

const FIXED_RASHI_ORDER = [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function shortPlanetName(p: Planet): string {
  return PLANET_GLYPH[p] || p.slice(0, 2);
}

export default function SouthIndianChart({ houses, ascendantRashi, title, onPlanetSelect }: Props) {
  const t = useT();
  const [hoveredHouse, setHoveredHouse] = useState<number | null>(null);

  const rashiToHouse: Record<number, HouseData> = {};
  for (const h of houses) rashiToHouse[h.rashi] = h;

  return (
    <div className="inline-block" role="img" aria-label={`South Indian chart${title ? `: ${title}` : ''}`}>
      {title && <h3 className="text-sm font-medium mb-1 text-center">{title}</h3>}
      <svg width={GRID_SIZE + 2} height={GRID_SIZE + 2} viewBox={`-1 -1 ${GRID_SIZE + 2} ${GRID_SIZE + 2}`}>
        <rect x={0} y={0} width={GRID_SIZE} height={GRID_SIZE} fill="none" stroke="currentColor" strokeWidth={1.5} />
        {FIXED_RASHI_ORDER.map((rashiIdx, cellIdx) => {
          const [col, row] = SOUTH_INDIAN_POSITIONS[cellIdx];
          const x = col * CELL_SIZE;
          const y = row * CELL_SIZE;
          const house = rashiToHouse[rashiIdx];
          const isCenter = col >= 1 && col <= 2 && row >= 1 && row <= 2;
          if (isCenter) return null;

          const isAsc = rashiIdx === ascendantRashi;
          const isHovered = hoveredHouse === rashiIdx;
          const planets = house?.planets || [];

          return (
            <g
              key={cellIdx}
              onMouseEnter={() => setHoveredHouse(rashiIdx)}
              onMouseLeave={() => setHoveredHouse(null)}
              style={{ cursor: planets.length > 0 ? 'pointer' : 'default' }}
            >
              <rect
                x={x} y={y} width={CELL_SIZE} height={CELL_SIZE}
                fill={isHovered ? 'rgba(212,168,67,0.08)' : isAsc ? 'rgba(212,168,67,0.05)' : 'transparent'}
                stroke="currentColor" strokeWidth={0.5}
              />
              <text x={x + 3} y={y + 12} fontSize={9} fill="currentColor" opacity={0.5}>
                {RASHI_NAMES[rashiIdx].slice(0, 3)}
              </text>
              {isAsc && <text x={x + CELL_SIZE - 14} y={y + 12} fontSize={8} fill="rgb(212,168,67)">Asc</text>}
              {planets.map((p, pi) => (
                <text
                  key={p}
                  x={x + 5 + (pi % 3) * 26}
                  y={y + 30 + Math.floor(pi / 3) * 16}
                  fontSize={13}
                  fontWeight="bold"
                  fill="currentColor"
                  style={{ cursor: 'pointer' }}
                  onClick={() => onPlanetSelect?.(p)}
                >
                  {shortPlanetName(p)}
                </text>
              ))}

              {isHovered && house && (
                <foreignObject x={x} y={y + CELL_SIZE - 18} width={CELL_SIZE} height={18}>
                  <div className="text-[8px] text-center text-astra-muted truncate px-1">
                    {t('common.lord')}: {house.lord}
                  </div>
                </foreignObject>
              )}
            </g>
          );
        })}
        <text x={GRID_SIZE / 2} y={GRID_SIZE / 2 - 4} textAnchor="middle" fontSize={11} fill="currentColor" fontWeight="bold">
          {title || t('tab.chart')}
        </text>
      </svg>
    </div>
  );
}
