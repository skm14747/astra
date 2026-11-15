'use client';
import { useState } from 'react';
import type { MatrixPoints } from '@/lib/matrix/types';
import { getArcana } from '@/lib/matrix/arcana';

interface Props {
  points: MatrixPoints;
  title?: string;
  onNodeSelect?: (value: number, label: string) => void;
}

const SIZE = 360;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R_OUTER = 140;

function polarToCart(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function NodeCircle({ x, y, value, label, small, hovered, onHover, onLeave, onClick }: {
  x: number; y: number; value: number; label?: string; small?: boolean;
  hovered?: boolean; onHover?: () => void; onLeave?: () => void; onClick?: () => void;
}) {
  const r = small ? 14 : 18;
  return (
    <g
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {hovered && (
        <circle cx={x} cy={y} r={r + 6} fill="rgba(212,168,67,0.15)" />
      )}
      <circle
        cx={x} cy={y} r={r}
        fill={hovered ? 'rgba(212,168,67,0.2)' : 'rgba(139,92,246,0.15)'}
        stroke={hovered ? 'rgb(212,168,67)' : 'rgb(139,92,246)'}
        strokeWidth={1.5}
      />
      <text x={x} y={y + 4} textAnchor="middle" fontSize={small ? 11 : 14} fontWeight="bold" fill="currentColor">
        {value}
      </text>
      {label && (
        <text x={x} y={y + r + 12} textAnchor="middle" fontSize={8} fill="currentColor" opacity={0.6}>
          {label}
        </text>
      )}
    </g>
  );
}

export default function Octagram({ points, title, onNodeSelect }: Props) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const straightPoints = [
    { val: points.a, label: 'A', angle: 180, key: 'a' },
    { val: points.b, label: 'B', angle: 270, key: 'b' },
    { val: points.c, label: 'C', angle: 0, key: 'c' },
    { val: points.d, label: 'D', angle: 90, key: 'd' },
  ];

  const diagonalPoints = [
    { val: points.f, label: 'F', angle: 225, key: 'f' },
    { val: points.g, label: 'G', angle: 315, key: 'g' },
    { val: points.h, label: 'H', angle: 45, key: 'h' },
    { val: points.i, label: 'I', angle: 135, key: 'i' },
  ];

  const straightCoords = straightPoints.map(p => polarToCart(CX, CY, R_OUTER, p.angle));
  const diagonalCoords = diagonalPoints.map(p => polarToCart(CX, CY, R_OUTER, p.angle));

  const sq1 = straightCoords.map(([x, y]) => `${x},${y}`).join(' ');
  const sq2 = diagonalCoords.map(([x, y]) => `${x},${y}`).join(' ');

  const hoveredArcana = hoveredNode
    ? getArcana(
        hoveredNode === 'center' ? points.e :
        straightPoints.find(p => p.key === hoveredNode)?.val ??
        diagonalPoints.find(p => p.key === hoveredNode)?.val ?? 1
      )
    : null;

  return (
    <div className="inline-block" role="img" aria-label={`Matrix of Destiny octagram${title ? `: ${title}` : ''}`}>
      {title && <h3 className="text-sm font-medium mb-2 text-center">{title}</h3>}
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <polygon points={sq1} fill="none" stroke="rgb(139,92,246)" strokeWidth={1} opacity={0.5} />
        <polygon points={sq2} fill="none" stroke="rgb(199,75,143)" strokeWidth={1} opacity={0.5} />

        {straightCoords.map(([x, y], i) => (
          <line key={`sl${i}`} x1={x} y1={y} x2={CX} y2={CY} stroke="currentColor" strokeWidth={0.3} opacity={0.2} />
        ))}
        {diagonalCoords.map(([x, y], i) => (
          <line key={`dl${i}`} x1={x} y1={y} x2={CX} y2={CY} stroke="currentColor" strokeWidth={0.3} opacity={0.2} />
        ))}

        <NodeCircle
          x={CX} y={CY} value={points.e} label="Center"
          hovered={hoveredNode === 'center'}
          onHover={() => setHoveredNode('center')}
          onLeave={() => setHoveredNode(null)}
          onClick={() => onNodeSelect?.(points.e, 'Center (Soul)')}
        />

        {straightPoints.map((p, i) => {
          const [x, y] = straightCoords[i];
          return (
            <NodeCircle
              key={`s${i}`} x={x} y={y} value={p.val} label={p.label}
              hovered={hoveredNode === p.key}
              onHover={() => setHoveredNode(p.key)}
              onLeave={() => setHoveredNode(null)}
              onClick={() => onNodeSelect?.(p.val, p.label)}
            />
          );
        })}

        {diagonalPoints.map((p, i) => {
          const [x, y] = diagonalCoords[i];
          return (
            <NodeCircle
              key={`d${i}`} x={x} y={y} value={p.val} label={p.label}
              hovered={hoveredNode === p.key}
              onHover={() => setHoveredNode(p.key)}
              onLeave={() => setHoveredNode(null)}
              onClick={() => onNodeSelect?.(p.val, p.label)}
            />
          );
        })}

        {[
          { val: points.j, angle: 180, r: R_OUTER * 0.5, key: 'j' },
          { val: points.k, angle: 270, r: R_OUTER * 0.5, key: 'k' },
          { val: points.l, angle: 0, r: R_OUTER * 0.5, key: 'l' },
          { val: points.m, angle: 90, r: R_OUTER * 0.5, key: 'm' },
        ].map((p) => {
          const [x, y] = polarToCart(CX, CY, p.r, p.angle);
          return (
            <NodeCircle
              key={p.key} x={x} y={y} value={p.val} small
              hovered={hoveredNode === p.key}
              onHover={() => setHoveredNode(p.key)}
              onLeave={() => setHoveredNode(null)}
            />
          );
        })}

        {[
          { val: points.outerLeft, angle: 180, r: R_OUTER * 0.75, key: 'ol' },
          { val: points.outerTop, angle: 270, r: R_OUTER * 0.75, key: 'ot' },
          { val: points.outerRight, angle: 0, r: R_OUTER * 0.75, key: 'or' },
          { val: points.outerBottom, angle: 90, r: R_OUTER * 0.75, key: 'ob' },
        ].map((p) => {
          const [x, y] = polarToCart(CX, CY, p.r, p.angle);
          return (
            <NodeCircle
              key={p.key} x={x} y={y} value={p.val} small
              hovered={hoveredNode === p.key}
              onHover={() => setHoveredNode(p.key)}
              onLeave={() => setHoveredNode(null)}
            />
          );
        })}
      </svg>

      {hoveredArcana && (
        <div className="mt-1 text-center text-xs text-zinc-400">
          <span className="font-medium text-zinc-200">{hoveredArcana.name}</span>
          {' — '}
          <span>{hoveredArcana.theme}</span>
        </div>
      )}
    </div>
  );
}
