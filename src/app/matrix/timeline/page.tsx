'use client';
import { useMemo, useState, useEffect } from 'react';
import { useProfile } from '@/lib/profile/context';
import EmptyState from '@/components/shared/EmptyState';
import { calculateMatrix } from '@/lib/matrix/core';
import { getArcana } from '@/lib/matrix/arcana';
import { useT } from '@/lib/i18n';

export default function MatrixTimelinePage() {
  const { activeProfile } = useProfile();
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  const t = useT();
  useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);

  const chart = useMemo(() => {
    if (!activeProfile) return null;
    const [y, m, d] = activeProfile.dateOfBirth.split('-').map(Number);
    return calculateMatrix(d, m, y);
  }, [activeProfile]);

  const currentAge = activeProfile && currentYear
    ? currentYear - parseInt(activeProfile.dateOfBirth.split('-')[0])
    : 0;

  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="📊" title={t('matrixTimeline.title')} description={t('empty.matrixTimeline')} />
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">📊 ✦ ◇ ❋</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('matrixTimeline.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('matrixTimeline.subtitle')}</p>
      </div>

      {/* Current decade hero */}
      {(() => {
        const currentVertex = chart.ageCycle.vertices.find(v => currentAge >= v.age && currentAge < v.age + 10);
        if (!currentVertex) return null;
        const arcana = getArcana(currentVertex.energy);
        return (
          <div className="glass-card rounded-2xl p-6 matrix-glow relative overflow-hidden">
            <div className="cosmic-orb w-24 h-24 bg-pink-600/8 -top-6 -right-6" />
            <div className="relative z-10">
              <div className="section-title mb-2" style={{ color: '#e84393' }}>{t('matrixTimeline.currentDecade')}</div>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-pink-400">{currentVertex.energy}</div>
                <div>
                  <div className="text-lg text-zinc-100 font-semibold">{arcana.name}</div>
                  <div className="text-xs text-zinc-500">{t('common.age')} {currentVertex.age}–{currentVertex.age + 9} · {t('matrixTimeline.youAre', { n: currentAge })}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      <div>
        <div className="section-title mb-4">{t('matrixTimeline.decadeVertices')}</div>
        <div className="flex gap-3 flex-wrap">
          {chart.ageCycle.vertices.map(v => {
            const isCurrent = currentAge >= v.age && currentAge < v.age + 10;
            return (
              <div key={v.age} className={`glass-card rounded-xl p-4 text-center min-w-[80px] transition ${
                isCurrent ? 'matrix-glow border-pink-500/30' : 'glow-hover'
              }`}>
                <div className="text-[10px] text-zinc-500 mb-1">{t('common.age')} {v.age}</div>
                <div className="text-2xl font-bold text-pink-400">{v.energy}</div>
                <div className="text-[10px] text-zinc-600 mt-0.5">{getArcana(v.energy).name}</div>
                {isCurrent && <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 animate-pulse-subtle" />}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="section-title mb-4">{t('matrixTimeline.yearByYear')}</div>
        <div className="flex flex-wrap gap-1.5">
          {chart.ageCycle.yearNodes.map((n, i) => {
            const age = n.year;
            const isCurrent = Math.abs(currentAge - age) < 0.625;
            return (
              <div
                key={i}
                className={`w-12 h-14 flex flex-col items-center justify-center rounded-lg text-[10px] transition ${
                  isCurrent
                    ? 'glass-card border-pink-500/40 matrix-glow'
                    : 'bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04]'
                }`}
                title={`${t('common.age')} ${age.toFixed(1)}: ${getArcana(n.energy).name}`}
              >
                <span className="text-zinc-500">{age % 1 === 0 ? age : ''}</span>
                <span className="font-bold text-zinc-200">{n.energy}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
