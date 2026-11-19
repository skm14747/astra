'use client';
import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useProfile } from '@/lib/profile/context';
import EmptyState from '@/components/shared/EmptyState';
import { calculateMatrix, calculateYearArcana } from '@/lib/matrix/core';
import { useLocalizedArcana } from '@/lib/matrix/arcana-i18n';
import Octagram from '@/components/matrix/Octagram';
const ArcanaDetailPanel = dynamic(() => import('@/components/matrix/ArcanaDetailPanel'), { ssr: false });
import ExportButton from '@/components/shared/ExportButton';
import type { PositionKey } from '@/lib/matrix/interpretations';
import { useT } from '@/lib/i18n';

const LABEL_TO_POSITION: Record<string, PositionKey> = {
  A: 'a', B: 'b', C: 'c', D: 'd', E: 'e', F: 'f', G: 'g', H: 'h', I: 'i',
  a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f', g: 'g', h: 'h', i: 'i',
  center: 'e',
  'Center (Soul)': 'e',
};

export default function MatrixChartPage() {
  const { activeProfile } = useProfile();

  const t = useT();
  const arcana = useLocalizedArcana();
  const octagramRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<{ value: number; position: PositionKey } | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(null);
  useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);
  useEffect(() => { return () => { if (toastTimer.current) clearTimeout(toastTimer.current); }; }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  }, []);

  const chart = useMemo(() => {
    if (!activeProfile) return null;
    const [y, m, d] = activeProfile.dateOfBirth.split('-').map(Number);
    return calculateMatrix(d, m, y);
  }, [activeProfile]);

  const yearArcana = useMemo(() => {
    if (!activeProfile || !currentYear) return null;
    const [y, m, d] = activeProfile.dateOfBirth.split('-').map(Number);
    return {
      current: calculateYearArcana(d, m, currentYear),
      prev: calculateYearArcana(d, m, currentYear - 1),
      next: calculateYearArcana(d, m, currentYear + 1),
    };
  }, [activeProfile, currentYear]);

  const handleNodeSelect = useCallback((value: number, label: string) => {
    const position = LABEL_TO_POSITION[label] ?? 'e';
    setSelectedNode(prev =>
      prev?.value === value && prev?.position === position ? null : { value, position }
    );
  }, []);

  const buildAISummary = useCallback(() => {
    if (!chart || !activeProfile) return '';
    const a = arcana;
    const lines = [
      `Matrix of Destiny — ${activeProfile.name}`,
      `Birth: ${activeProfile.dateOfBirth}`,
      '',
      `A (Day/Body): ${chart.points.a} — ${a(chart.points.a).name}`,
      `B (Month/Spirit): ${chart.points.b} — ${a(chart.points.b).name}`,
      `C (Year/Mind): ${chart.points.c} — ${a(chart.points.c).name}`,
      `D (Karmic Lesson): ${chart.points.d} — ${a(chart.points.d).name}`,
      `E (Soul Center): ${chart.points.e} — ${a(chart.points.e).name}`,
      '',
      `Purposes: Personal=${chart.purposes.personal}, Social=${chart.purposes.social}, General=${chart.purposes.general}, Planetary=${chart.purposes.planetary}`,
      `Love Line: ${chart.loveMoney.love.map(v => `${v}(${a(v).name})`).join(' → ')}`,
      `Money Line: ${chart.loveMoney.money.map(v => `${v}(${a(v).name})`).join(' → ')}`,
      `Karmic Tail: ${chart.karmicTail.points.map(v => `${v}(${a(v).name})`).join(' → ')}`,
      '',
      yearArcana && currentYear ? `Year Arcana ${currentYear}: ${yearArcana.current} — ${a(yearArcana.current).name}` : '',
      '',
      'Analyze my Matrix of Destiny chart. What patterns do you see?',
    ];
    return lines.filter(Boolean).join('\n');
  }, [chart, activeProfile, arcana, yearArcana, currentYear]);

  const handleCopyAI = useCallback(async () => {
    const text = buildAISummary();
    if (text) {
      await navigator.clipboard.writeText(text);
      showToast('✅ Copied for AI');
    }
  }, [buildAISummary, showToast]);

  const handleShare = useCallback(async () => {
    const text = buildAISummary();
    if (navigator.share) {
      try {
        await navigator.share({ title: t('matrixChart.title'), text, url: window.location.href });
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${text}\n\n${window.location.href}`);
      showToast('✅ Link copied');
    }
  }, [buildAISummary, t, showToast]);

  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="✦" title={t('matrixChart.title')} description={t('empty.matrix')} />
    </div>
  );

  const corePoints = [
    { label: t('matrixChart.day'), key: 'A', val: chart.points.a },
    { label: t('matrixChart.month'), key: 'B', val: chart.points.b },
    { label: t('matrixChart.year'), key: 'C', val: chart.points.c },
    { label: t('matrixChart.karmic'), key: 'D', val: chart.points.d },
    { label: t('matrixChart.soul'), key: 'E', val: chart.points.e },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-pink-400/40">✦ ◇ ❋ ✧ ⬡</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('matrixChart.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('matrixChart.subtitle')}</p>
      </div>

      {/* Octagram */}
      <div className="flex justify-center">
        <div ref={octagramRef} className="glass-card rounded-2xl p-5 matrix-glow inline-block">
          <Octagram points={chart.points} title="Octagram" onNodeSelect={handleNodeSelect} />
          <p className="text-[10px] text-zinc-600 text-center mt-2">{t('matrixChart.tapToExplore')}</p>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <ExportButton targetRef={octagramRef} filename="matrix-of-destiny" />
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-sm font-medium transition cursor-pointer"
        >
          🔗 {t('matrixChart.share')}
        </button>
        <button
          onClick={handleCopyAI}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-sm font-medium transition cursor-pointer"
        >
          🤖 {t('matrixChart.copyForAI')}
        </button>
      </div>

      {/* Detail Panel (shown when a node is selected) */}
      {selectedNode && (
        <ArcanaDetailPanel
          arcanaNumber={selectedNode.value}
          positionKey={selectedNode.position}
          onClose={() => setSelectedNode(null)}
        />
      )}

      {/* Core Points */}
      <div>
        <div className="section-title mb-3">{t('matrixChart.coreEnergies')}</div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {corePoints.map(p => (
            <button
              key={p.key}
              onClick={() => handleNodeSelect(p.val, p.key)}
              className="glass-card rounded-xl p-3 text-center glow-hover group relative cursor-pointer transition-colors hover:border-violet-500/30"
            >
              <div className="text-2xl font-bold text-violet-400">{p.val}</div>
              <div className="text-[10px] text-zinc-500 mt-0.5">{p.label}</div>
              <div className="text-[10px] text-zinc-600 truncate">{arcana(p.val).name}</div>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 text-[10px] text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-20">
                {arcana(p.val).name} — {t('matrixHealth.arcana')} {p.val}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Year Arcana */}
      {yearArcana && currentYear && (
        <div>
          <div className="section-title mb-3">{t('matrixChart.yearArcana')}</div>
          <div className="glass-card rounded-xl p-4 matrix-glow">
            <div className="text-xs text-cyan-400 font-medium mb-3">{t('matrixChart.currentYearEnergy')}</div>
            <div className="flex items-end gap-4 justify-center">
              <div className="text-center opacity-50">
                <div className="text-lg font-bold text-zinc-400">{yearArcana.prev}</div>
                <div className="text-[10px] text-zinc-600">{currentYear - 1}</div>
                <div className="text-[10px] text-zinc-600">{arcana(yearArcana.prev).name}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{yearArcana.current}</div>
                <div className="text-xs text-zinc-400 font-medium">{currentYear}</div>
                <div className="text-xs text-zinc-300">{arcana(yearArcana.current).name}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{arcana(yearArcana.current).theme}</div>
              </div>
              <div className="text-center opacity-50">
                <div className="text-lg font-bold text-zinc-400">{yearArcana.next}</div>
                <div className="text-[10px] text-zinc-600">{currentYear + 1}</div>
                <div className="text-[10px] text-zinc-600">{arcana(yearArcana.next).name}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Life Purposes */}
      <div>
        <div className="section-title mb-3">{t('matrixChart.lifePurposes')}</div>
        <div className="glass-card rounded-xl divide-y divide-white/[0.03]">
          {[[t('matrixChart.personal'), chart.purposes.personal], [t('matrixChart.social'), chart.purposes.social], [t('matrixChart.general'), chart.purposes.general], [t('matrixChart.planetary'), chart.purposes.planetary]].map(([label, val]) => (
            <div key={String(label)} className="flex justify-between items-center px-4 py-2.5 text-sm">
              <span className="text-zinc-400">{String(label)}</span>
              <span className="font-medium text-zinc-200">{String(val)} — <span className="text-zinc-400">{arcana(val as number).name}</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* Love & Money */}
      <div>
        <div className="section-title mb-3">{t('matrixChart.loveMoney')}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="glass-card rounded-xl p-4 matrix-glow">
            <div className="text-xs text-pink-400 font-medium mb-1">❤ {t('matrixChart.loveLine')}</div>
            <div className="text-sm text-zinc-300">{chart.loveMoney.love.map(v => `${v} (${arcana(v).name})`).join(' → ')}</div>
          </div>
          <div className="glass-card rounded-xl p-4 matrix-glow">
            <div className="text-xs text-yellow-400 font-medium mb-1">💰 {t('matrixChart.moneyLine')}</div>
            <div className="text-sm text-zinc-300">{chart.loveMoney.money.map(v => `${v} (${arcana(v).name})`).join(' → ')}</div>
          </div>
        </div>
      </div>

      {/* Talents */}
      <div>
        <div className="section-title mb-3">{t('matrixChart.talents')}</div>
        <div className="glass-card rounded-xl divide-y divide-white/[0.03]">
          {[[t('matrixChart.spiritual'), chart.talents.spiritual], [t('matrixChart.intellect'), chart.talents.intellect], [t('matrixChart.selfExpression'), chart.talents.selfExpression]].map(([label, val]) => (
            <div key={String(label)} className="flex justify-between items-center px-4 py-2.5 text-sm">
              <span className="text-zinc-400">{String(label)}</span>
              <span className="font-medium text-zinc-200">{String(val)} — <span className="text-zinc-400">{arcana(val as number).name}</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* Karmic Tail */}
      <div>
        <div className="section-title mb-3">{t('matrixChart.karmicTail')}</div>
        <div className="glass-card rounded-xl p-4 matrix-glow">
          <div className="flex items-center gap-3 justify-center">
            {chart.karmicTail.points.map((v, i) => (
              <div key={i} className="flex items-center gap-3">
                <button
                  onClick={() => handleNodeSelect(v, i === 2 ? 'D' : 'E')}
                  className="text-center cursor-pointer transition-colors active:scale-95"
                >
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto">
                    <span className="text-lg font-bold text-purple-400">{v}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">
                    {i === 0 ? t('matrixChart.karmicPattern') : i === 1 ? t('matrixChart.karmicRepeat') : t('matrixChart.karmicLesson')}
                  </div>
                  <div className="text-[10px] text-zinc-600">{arcana(v).name}</div>
                </button>
                {i < 2 && <span className="text-zinc-600 text-lg">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ancestral Lines */}
      <div>
        <div className="section-title mb-3">{t('matrixChart.ancestralLines')}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="glass-card rounded-xl p-4">
            <div className="text-xs text-blue-400 font-medium mb-2">{t('matrixChart.paternalLine')}</div>
            <div className="flex items-center gap-2 justify-center">
              {[chart.points.f, chart.points.h].map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button onClick={() => handleNodeSelect(v, i === 0 ? 'F' : 'H')} className="text-center cursor-pointer active:scale-95 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto">
                      <span className="font-bold text-blue-400">{v}</span>
                    </div>
                    <div className="text-[10px] text-zinc-600 mt-0.5">{arcana(v).name}</div>
                  </button>
                  {i === 0 && <span className="text-zinc-600">⟷</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card rounded-xl p-4">
            <div className="text-xs text-rose-400 font-medium mb-2">{t('matrixChart.maternalLine')}</div>
            <div className="flex items-center gap-2 justify-center">
              {[chart.points.g, chart.points.i].map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                  <button onClick={() => handleNodeSelect(v, i === 0 ? 'G' : 'I')} className="text-center cursor-pointer active:scale-95 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
                      <span className="font-bold text-rose-400">{v}</span>
                    </div>
                    <div className="text-[10px] text-zinc-600 mt-0.5">{arcana(v).name}</div>
                  </button>
                  {i === 0 && <span className="text-zinc-600">⟷</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Formula Transparency */}
      <details className="glass-card rounded-2xl overflow-hidden">
        <summary className="px-5 py-4 cursor-pointer text-sm font-medium text-zinc-300 hover:text-white transition flex items-center gap-2">
          <span className="text-violet-400">⚙</span> {t('matrixChart.formulaTitle')}
        </summary>
        <div className="px-5 pb-5 space-y-3 text-sm text-zinc-400 leading-relaxed border-t border-white/[0.03] pt-4">
          <p><strong className="text-zinc-300">A</strong> = reduce(day) — digit-sum until ≤ 22, 0 → 22</p>
          <p><strong className="text-zinc-300">B</strong> = month (never reduced)</p>
          <p><strong className="text-zinc-300">C</strong> = reduce(year)</p>
          <p><strong className="text-zinc-300">D</strong> = reduce(A + B + C)</p>
          <p><strong className="text-zinc-300">E</strong> = reduce(A + B + C + D)</p>
          <p><strong className="text-zinc-300">F–I</strong> = reduce(adjacent pair sums on the octagram)</p>
          <p><strong className="text-zinc-300">Year Arcana</strong> = reduce(reduce(day) + month + reduce(sumDigits(targetYear)))</p>
          <p><strong className="text-zinc-300">Karmic Tail</strong> = M → reduce(M+D) → D (center → outward)</p>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.03]">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400">
              🔒 {t('matrixChart.formulaDisclaimer')}
            </span>
          </div>
        </div>
      </details>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="px-4 py-2.5 rounded-xl bg-zinc-900/95 border border-white/10 text-sm text-white shadow-2xl backdrop-blur-sm">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
