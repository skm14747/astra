'use client';
import { useMemo } from 'react';
import { useProfile } from '@/lib/profile/context';
import EmptyState from '@/components/shared/EmptyState';
import { calculateMatrix } from '@/lib/matrix/core';
import { getArcana } from '@/lib/matrix/arcana';
import Octagram from '@/components/matrix/Octagram';

export default function MatrixChartPage() {
  const { activeProfile } = useProfile();

  const chart = useMemo(() => {
    if (!activeProfile) return null;
    const [y, m, d] = activeProfile.dateOfBirth.split('-').map(Number);
    return calculateMatrix(d, m, y);
  }, [activeProfile]);

  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="✦" title="Matrix of Destiny" description="Create a birth profile to generate your personal Matrix of Destiny chart." />
    </div>
  );

  const corePoints = [
    { label: 'Day', key: 'A', val: chart.points.a },
    { label: 'Month', key: 'B', val: chart.points.b },
    { label: 'Year', key: 'C', val: chart.points.c },
    { label: 'Karmic', key: 'D', val: chart.points.d },
    { label: 'Soul', key: 'E', val: chart.points.e },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-pink-400/40">✦ ◇ ❋ ✧ ⬡</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Matrix of Destiny</h1>
        <p className="text-zinc-400 mt-1">Your personal octagram with 22 Major Arcana energies</p>
      </div>

      <div className="flex gap-8 flex-wrap items-start">
        <div className="glass-card rounded-2xl p-5 matrix-glow">
          <Octagram points={chart.points} title="Octagram" />
        </div>

        <div className="flex-1 min-w-[280px] space-y-6">
          {/* Core Points */}
          <div>
            <div className="section-title mb-3">Core Energies</div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {corePoints.map(p => (
                <div key={p.key} className="glass-card rounded-xl p-3 text-center glow-hover group relative">
                  <div className="text-2xl font-bold text-violet-400">{p.val}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5">{p.label}</div>
                  <div className="text-[10px] text-zinc-600 truncate">{getArcana(p.val).name}</div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-[10px] text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-20">
                    {getArcana(p.val).name} — Arcana {p.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Purposes */}
          <div>
            <div className="section-title mb-3">Life Purposes</div>
            <div className="glass-card rounded-xl divide-y divide-white/[0.03]">
              {[['Personal', chart.purposes.personal], ['Social', chart.purposes.social], ['General', chart.purposes.general], ['Planetary', chart.purposes.planetary]].map(([label, val]) => (
                <div key={String(label)} className="flex justify-between items-center px-4 py-2.5 text-sm">
                  <span className="text-zinc-400">{String(label)}</span>
                  <span className="font-medium text-zinc-200">{String(val)} — <span className="text-zinc-400">{getArcana(val as number).name}</span></span>
                </div>
              ))}
            </div>
          </div>

          {/* Love & Money */}
          <div>
            <div className="section-title mb-3">Love & Money Lines</div>
            <div className="grid grid-cols-1 gap-2">
              <div className="glass-card rounded-xl p-4 matrix-glow">
                <div className="text-xs text-pink-400 font-medium mb-1">❤ Love Line</div>
                <div className="text-sm text-zinc-300">{chart.loveMoney.love.map(v => `${v} (${getArcana(v).name})`).join(' → ')}</div>
              </div>
              <div className="glass-card rounded-xl p-4 matrix-glow">
                <div className="text-xs text-yellow-400 font-medium mb-1">💰 Money Line</div>
                <div className="text-sm text-zinc-300">{chart.loveMoney.money.map(v => `${v} (${getArcana(v).name})`).join(' → ')}</div>
              </div>
            </div>
          </div>

          {/* Talents */}
          <div>
            <div className="section-title mb-3">Talents</div>
            <div className="glass-card rounded-xl divide-y divide-white/[0.03]">
              {[['Spiritual', chart.talents.spiritual], ['Intellect', chart.talents.intellect], ['Self-Expression', chart.talents.selfExpression]].map(([label, val]) => (
                <div key={String(label)} className="flex justify-between items-center px-4 py-2.5 text-sm">
                  <span className="text-zinc-400">{String(label)}</span>
                  <span className="font-medium text-zinc-200">{String(val)} — <span className="text-zinc-400">{getArcana(val as number).name}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
