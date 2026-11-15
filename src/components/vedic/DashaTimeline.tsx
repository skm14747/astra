'use client';
import { useState } from 'react';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import type { VimshottariDasha, DashaPeriod } from '@/lib/vedic/types';
import { useT } from '@/lib/i18n';

interface Props {
  dasha: VimshottariDasha;
  currentDate?: Date;
}

const COLORS = [
  '#7c5cfc', '#e84393', '#38bdf8', '#f0c45a',
  '#00e676', '#ff6b6b', '#a78bfa', '#f472b6', '#6c3ce0',
];

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function DashaTimeline({ dasha, currentDate }: Props) {
  const t = useT();
  const now = currentDate?.getTime() ?? Date.now();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(() => {
    const idx = dasha.mahadashas.findIndex(m => now >= m.startDate.getTime() && now < m.endDate.getTime());
    return idx >= 0 ? idx : null;
  });

  const firstStart = dasha.mahadashas[0]?.startDate.getTime() ?? 0;
  const lastEnd = dasha.mahadashas[dasha.mahadashas.length - 1]?.endDate.getTime() ?? 0;
  const totalSpan = lastEnd - firstStart;
  const nowPct = totalSpan > 0 ? ((now - firstStart) / totalSpan) * 100 : 0;

  return (
    <div className="space-y-3">
      <div className="text-sm text-zinc-400">
        {t('nakshatra.birthNakshatra')} {t('common.lord')}: <span className="text-white font-medium">{PLANET_GLYPH[dasha.birthDashaLord] ?? ''} {dasha.birthDashaLord}</span>
        {' · '}{t('common.balance')}: <span className="text-white font-medium">{dasha.balanceYears.toFixed(2)} {t('common.years')}</span>
      </div>

      {/* Horizontal timeline bar */}
      <div className="relative">
        <div className="flex h-10 rounded-lg overflow-hidden border border-zinc-800">
          {dasha.mahadashas.map((md, i) => {
            const pct = totalSpan > 0 ? ((md.endDate.getTime() - md.startDate.getTime()) / totalSpan) * 100 : 0;
            const isCurrent = now >= md.startDate.getTime() && now < md.endDate.getTime();
            const isExpanded = expandedIdx === i;
            return (
              <button
                key={i}
                onClick={() => setExpandedIdx(isExpanded ? null : i)}
                className="relative flex items-center justify-center text-[10px] font-bold text-white transition-all hover:brightness-110"
                style={{
                  width: `${pct}%`,
                  backgroundColor: COLORS[i % COLORS.length],
                  opacity: isExpanded ? 1 : isCurrent ? 0.9 : 0.6,
                }}
                title={`${md.lord}: ${formatDate(md.startDate)} — ${formatDate(md.endDate)}`}
              >
                {pct > 5 && <span>{md.lord.slice(0, 3)}</span>}
                {isCurrent && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Now indicator line */}
        {nowPct > 0 && nowPct < 100 && (
          <div
            className="absolute top-0 h-10 w-0.5 bg-white/80 pointer-events-none"
            style={{ left: `${nowPct}%` }}
          />
        )}
      </div>

      {/* Expanded detail */}
      {expandedIdx !== null && dasha.mahadashas[expandedIdx] && (() => {
        const md = dasha.mahadashas[expandedIdx];
        const isCurrent = now >= md.startDate.getTime() && now < md.endDate.getTime();
        return (
          <div className={`p-4 rounded-lg border ${isCurrent ? 'border-violet-600 bg-violet-600/5' : 'border-zinc-800 bg-zinc-900'}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">{PLANET_GLYPH[md.lord] ?? ''} {md.lord} {t('dashas.mahadasha')} ({md.durationYears.toFixed(1)} {t('common.years')})</h3>
              <span className="text-xs text-zinc-500">{formatDate(md.startDate)} — {formatDate(md.endDate)}</span>
            </div>
            {md.subPeriods && md.subPeriods.length > 0 && (
              <div className="space-y-1">
                {md.subPeriods.map((ad, j) => {
                  const isAdCurrent = now >= ad.startDate.getTime() && now < ad.endDate.getTime();
                  return (
                    <div key={j} className={`flex justify-between text-xs px-2 py-1 rounded ${isAdCurrent ? 'bg-violet-600/15 text-violet-300 font-medium' : 'text-zinc-500 hover:bg-zinc-800'}`}>
                      <span>{PLANET_GLYPH[ad.lord] ?? ''} {ad.lord} Antardasha</span>
                      <span>{formatDate(ad.startDate)} — {formatDate(ad.endDate)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
