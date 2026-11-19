'use client';
import { useState, useMemo } from 'react';
import { useProfile } from '@/lib/profile/context';
import EmptyState from '@/components/shared/EmptyState';
import { calculateMatrix } from '@/lib/matrix/core';
import { calculateMatrixCompatibility } from '@/lib/matrix/compatibility';
import { useLocalizedArcana } from '@/lib/matrix/arcana-i18n';
import { useT } from '@/lib/i18n';

export default function MatrixCompatibilityPage() {
  const { profiles, activeProfileId } = useProfile();
  const t = useT();
  const arcana = useLocalizedArcana();
  const [p1Id, setP1Id] = useState<string | null>(null);
  const [p2Id, setP2Id] = useState<string | null>(null);

  const id1 = p1Id ?? activeProfileId;

  const result = useMemo(() => {
    const pr1 = profiles.find(p => p.id === id1);
    const pr2 = profiles.find(p => p.id === p2Id);
    if (!pr1 || !pr2) return null;
    const [y1, m1, d1] = pr1.dateOfBirth.split('-').map(Number);
    const [y2, m2, d2] = pr2.dateOfBirth.split('-').map(Number);
    const chart1 = calculateMatrix(d1, m1, y1);
    const chart2 = calculateMatrix(d2, m2, y2);
    return calculateMatrixCompatibility(chart1, chart2);
  }, [id1, p2Id, profiles]);

  if (profiles.length < 2) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="❤️" title={t('matrixCompat.title')} description={t('empty.matrixCompat')} />
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-pink-400/40">❤️ ✦ ◇</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('matrixCompat.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('matrixCompat.subtitle')}</p>
      </div>

      <div className="section-title mb-3">{t('matrixCompat.selectProfiles')}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-400" />
            <h3 className="font-semibold text-zinc-200">{t('matrixCompat.person1')}</h3>
          </div>
          <select value={id1 ?? ''} onChange={e => setP1Id(e.target.value || null)} className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm focus:border-violet-500 outline-none transition">
            <option value="">{t('common.select')}</option>
            {profiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-400" />
            <h3 className="font-semibold text-zinc-200">{t('matrixCompat.person2')}</h3>
          </div>
          <select value={p2Id ?? ''} onChange={e => setP2Id(e.target.value || null)} className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm focus:border-violet-500 outline-none transition">
            <option value="">{t('common.select')}</option>
            {profiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      </div>

      {result && (
        <>
          <div className="glass-card rounded-2xl p-8 text-center matrix-glow">
            <div className="section-title mb-2" style={{ color: '#e84393' }}>{t('matrixCompat.harmonyScore')}</div>
            <div className="text-5xl font-bold font-display text-pink-400">{result.scores.harmony}</div>
            <p className="text-zinc-400 mt-2">{arcana(result.scores.harmony).name}</p>
          </div>

          <div className="section-title mb-3" style={{ color: '#e84393' }}>{t('matrixCompat.dimensionScores')}</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(() => {
              const dims = [
                [t('matrixCompat.sky'), result.scores.sky],
                [t('matrixCompat.earth'), result.scores.earth],
                [t('matrixCompat.relationship'), result.scores.relationship],
                [t('matrixCompat.maleLine'), result.scores.male],
                [t('matrixCompat.femaleLine'), result.scores.female],
                [t('matrixCompat.union'), result.scores.union],
              ] as [string, number][];
              const maxVal = Math.max(...dims.map(d => d[1]));
              return dims.map(([label, val]) => (
                <div key={label} className={`glass-card rounded-xl p-4 text-center glow-hover ${val === maxVal ? 'matrix-glow' : ''}`}>
                  <div className="text-[10px] text-zinc-500 tracking-wider mb-1">{label}</div>
                  <div className={`text-2xl font-bold ${val === maxVal ? 'text-pink-400' : 'text-zinc-100'}`}>{val}</div>
                  <div className="text-[10px] text-zinc-600 mt-0.5">{arcana(val).name}</div>
                </div>
              ));
            })()}
          </div>
        </>
      )}
    </div>
  );
}
