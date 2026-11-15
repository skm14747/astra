'use client';
import { useMemo } from 'react';
import { useProfile } from '@/lib/profile/context';
import EmptyState from '@/components/shared/EmptyState';
import { calculateMatrix } from '@/lib/matrix/core';
import { getArcana } from '@/lib/matrix/arcana';
import { useT } from '@/lib/i18n';

export default function MatrixHealthPage() {
  const { activeProfile } = useProfile();

  const t = useT();
  const chart = useMemo(() => {
    if (!activeProfile) return null;
    const [y, m, d] = activeProfile.dateOfBirth.split('-').map(Number);
    return calculateMatrix(d, m, y);
  }, [activeProfile]);

  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🧘" title={t('matrixHealth.title')} description={t('empty.matrixHealth')} />
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-fuchsia-400/40">🧘 ✦ ◇</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('matrixHealth.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('matrixHealth.subtitle')}</p>
      </div>

      {/* Summary hero */}
      {(() => {
        const chakras = chart.healthCard.chakras;
        const totals = chakras.map(c => c.physics + c.energy + c.emotions);
        const maxIdx = totals.indexOf(Math.max(...totals));
        const minIdx = totals.indexOf(Math.min(...totals));
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="glass-card rounded-xl p-4 text-center matrix-glow">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Strongest Chakra</div>
              <div className="text-lg font-bold text-pink-400">{chakras[maxIdx].name}</div>
              <div className="text-xs text-zinc-500 mt-0.5">Total: {totals[maxIdx]}</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Weakest Chakra</div>
              <div className="text-lg font-bold text-zinc-300">{chakras[minIdx].name}</div>
              <div className="text-xs text-zinc-500 mt-0.5">Total: {totals[minIdx]}</div>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Dominant Column</div>
              <div className="text-lg font-bold text-zinc-300">
                {(() => {
                  const pSum = chakras.reduce((a, c) => a + c.physics, 0);
                  const eSum = chakras.reduce((a, c) => a + c.energy, 0);
                  const emSum = chakras.reduce((a, c) => a + c.emotions, 0);
                  const max = Math.max(pSum, eSum, emSum);
                  return max === pSum ? 'Physics' : max === eSum ? 'Energy' : 'Emotions';
                })()}
              </div>
            </div>
          </div>
        );
      })()}

      <div className="section-title mb-3">{t('matrixHealth.chakraMatrix')}</div>
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 px-5 text-zinc-400 text-xs font-medium uppercase tracking-wider">Chakra</th>
                <th className="text-center py-3 px-3 text-zinc-400 text-xs font-medium uppercase tracking-wider">Physics</th>
                <th className="text-center py-3 px-3 text-zinc-500 text-[10px]">Arcana</th>
                <th className="text-center py-3 px-3 text-zinc-400 text-xs font-medium uppercase tracking-wider">Energy</th>
                <th className="text-center py-3 px-3 text-zinc-500 text-[10px]">Arcana</th>
                <th className="text-center py-3 px-3 text-zinc-400 text-xs font-medium uppercase tracking-wider">Emotions</th>
                <th className="text-center py-3 px-3 text-zinc-500 text-[10px]">Arcana</th>
              </tr>
            </thead>
            <tbody>
              {chart.healthCard.chakras.map((c, i) => (
                <tr key={c.name} className={`border-b border-white/[0.03] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                  <td className="py-3 px-5 font-medium text-zinc-200">{c.name}</td>
                  <td className="py-3 px-3 text-center text-lg font-bold text-violet-400">{c.physics}</td>
                  <td className="py-3 px-3 text-center text-[10px] text-zinc-600">{getArcana(c.physics).name}</td>
                  <td className="py-3 px-3 text-center text-lg font-bold text-pink-400">{c.energy}</td>
                  <td className="py-3 px-3 text-center text-[10px] text-zinc-600">{getArcana(c.energy).name}</td>
                  <td className="py-3 px-3 text-center text-lg font-bold text-yellow-400">{c.emotions}</td>
                  <td className="py-3 px-3 text-center text-[10px] text-zinc-600">{getArcana(c.emotions).name}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-white/[0.08] font-bold bg-white/[0.02]">
                <td className="py-3 px-5 text-zinc-100">Totals</td>
                <td className="py-3 px-3 text-center text-lg text-violet-300">{chart.healthCard.totals.physics}</td>
                <td className="py-3 px-3 text-center text-[10px] text-zinc-500">{getArcana(chart.healthCard.totals.physics).name}</td>
                <td className="py-3 px-3 text-center text-lg text-pink-300">{chart.healthCard.totals.energy}</td>
                <td className="py-3 px-3 text-center text-[10px] text-zinc-500">{getArcana(chart.healthCard.totals.energy).name}</td>
                <td className="py-3 px-3 text-center text-lg text-yellow-300">{chart.healthCard.totals.emotions}</td>
                <td className="py-3 px-3 text-center text-[10px] text-zinc-500">{getArcana(chart.healthCard.totals.emotions).name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
