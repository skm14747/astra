'use client';
import { useState, useEffect, useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import DashaTimeline from '@/components/vedic/DashaTimeline';
import EmptyState from '@/components/shared/EmptyState';
import {
  calculateVimshottariDasha, getCurrentDashaPeriod,
  calculateYoginiDasha, calculateAshtottariDasha, calculateSthiraDasha,
  calculateKalachakraDasha, calculateNarayanaDasha, calculateShoolaDasha,
  calculateMandookaDasha, calculateBrahmaDasha,
  calculateDwisaptatiSamaDasha, isDwisaptatiApplicable,
  calculateShattrimshatSamaDasha, isShattrimshatApplicable,
  calculatePanchottariDasha, isPanchottariApplicable,
  calculateShodasottariDasha, calculateDwadashottariDasha, isDwadashottariApplicable,
  calculateShatabdikaDasha, calculateChaturashitiSamaDasha, isChaturashitiApplicable,
  DASHA_SYSTEM_LABELS,
  type DashaSystem,
} from '@/lib/vedic/dashas';
import { calculateCharaDasha } from '@/lib/vedic/jaimini';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';
import type { DashaPeriod, VimshottariDasha } from '@/lib/vedic/types';

export default function DashasPage() {
  const { chart, birthData } = useProfileChart();
  const [now, setNow] = useState<Date | null>(null);
  const [system, setSystem] = useState<DashaSystem>('vimshottari');
  const t = useT();

  useEffect(() => { setNow(new Date()); }, []);

  const { dasha, periods, applicability } = useMemo(() => {
    if (!chart || !birthData) return { dasha: null, periods: [] as DashaPeriod[], applicability: {} as Record<string, boolean> };
    const moonLon = chart.planets.Moon.siderealLongitude;
    const bd = birthData.date;
    const lr = chart.ascendant.rashi;

    const app: Record<string, boolean> = {
      dwisaptati: isDwisaptatiApplicable(chart),
      shattrimshat: isShattrimshatApplicable(chart),
      panchottari: isPanchottariApplicable(chart),
      dwadashottari: isDwadashottariApplicable(chart),
      chaturashiti: isChaturashitiApplicable(chart),
    };

    const vim = calculateVimshottariDasha(moonLon, bd);
    let p: DashaPeriod[];
    switch (system) {
      case 'yogini': p = calculateYoginiDasha(moonLon, bd); break;
      case 'ashtottari': p = calculateAshtottariDasha(moonLon, bd); break;
      case 'sthira': p = calculateSthiraDasha(lr, bd); break;
      case 'chara': p = calculateCharaDasha(chart); break;
      case 'kalachakra': p = calculateKalachakraDasha(moonLon, bd); break;
      case 'narayana': p = calculateNarayanaDasha(chart); break;
      case 'shoola': p = calculateShoolaDasha(lr, bd); break;
      case 'mandooka': p = calculateMandookaDasha(lr, bd); break;
      case 'brahma': p = calculateBrahmaDasha(chart); break;
      case 'dwisaptati': p = calculateDwisaptatiSamaDasha(moonLon, bd); break;
      case 'shattrimshat': p = calculateShattrimshatSamaDasha(moonLon, bd); break;
      case 'panchottari': p = calculatePanchottariDasha(moonLon, bd); break;
      case 'shodasottari': p = calculateShodasottariDasha(moonLon, bd); break;
      case 'dwadashottari': p = calculateDwadashottariDasha(moonLon, bd); break;
      case 'shatabdika': p = calculateShatabdikaDasha(moonLon, bd); break;
      case 'chaturashiti': p = calculateChaturashitiSamaDasha(moonLon, bd); break;
      default: p = vim.mahadashas; break;
    }
    return { dasha: vim, periods: p, applicability: app };
  }, [chart, birthData, system]);

  if (!chart || !birthData) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="⏳" title={t('dashas.title')} description={t('empty.dashas')} />
      <SeoIntro headingKey="seo.dashas.heading" textKey="seo.dashas.text" />
      {VEDIC_SEO.dashas.relatedTools && <RelatedTools tools={VEDIC_SEO.dashas.relatedTools} />}
    </div>
  );

  const current = now && dasha ? getCurrentDashaPeriod(dasha, now) : null;

  const CONDITIONAL: DashaSystem[] = ['dwisaptati', 'shattrimshat', 'panchottari', 'dwadashottari', 'chaturashiti'];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">⏳ ☽ ☉</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('dashas.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('dashas.subtitle')}</p>
      </div>

      {/* System selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(DASHA_SYSTEM_LABELS) as DashaSystem[]).filter(s => s !== 'mudda').map(s => {
          const isConditional = CONDITIONAL.includes(s);
          const applicable = !isConditional || applicability[s];
          return (
            <button
              key={s}
              onClick={() => setSystem(s)}
              disabled={!applicable}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                system === s
                  ? 'bg-violet-600 text-white'
                  : applicable
                    ? 'bg-white/[0.04] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08]'
                    : 'bg-white/[0.02] text-zinc-600 cursor-not-allowed'
              }`}
              title={!applicable ? 'Not applicable to this chart' : undefined}
            >
              {DASHA_SYSTEM_LABELS[s]}
              {isConditional && !applicable && ' ✗'}
            </button>
          );
        })}
      </div>

      {/* Current Vimshottari period (always shown) */}
      {current && system === 'vimshottari' && (() => {
        const mahaStart = current.maha.startDate.getTime();
        const mahaEnd = current.maha.endDate.getTime();
        const nowMs = now!.getTime();
        const mahaProgress = Math.max(0, Math.min(100, ((nowMs - mahaStart) / (mahaEnd - mahaStart)) * 100));
        const yearsLeft = Math.max(0, (mahaEnd - nowMs) / (365.25 * 86400000));
        return (
          <div className="glass-card vedic-glow rounded-2xl p-6 relative overflow-hidden">
            <div className="cosmic-orb w-24 h-24 bg-violet-600/10 -top-6 -right-6" />
            <div className="relative z-10">
              <div className="section-title mb-3">{t('dashas.currentPeriod')}</div>
              <p className="text-xl text-zinc-100">
                <span className="text-2xl mr-2 drop-shadow-[0_0_8px_rgba(124,92,252,0.4)]">{PLANET_GLYPH[current.maha.lord]}</span>
                <strong>{current.maha.lord}</strong> {t('print.mahadasha')}
                {current.antar && <> → <span className="mr-1">{PLANET_GLYPH[current.antar.lord]}</span><strong>{current.antar.lord}</strong></>}
                {current.pratyantar && <> → <strong>{current.pratyantar.lord}</strong></>}
              </p>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
                  <span>{current.maha.startDate.getFullYear()}</span>
                  <span>{mahaProgress.toFixed(1)}% elapsed · {yearsLeft.toFixed(1)}y remaining</span>
                  <span>{current.maha.endDate.getFullYear()}</span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all" style={{ width: `${mahaProgress}%` }} />
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Timeline */}
      {now && (
        <div>
          <div className="section-title mb-4">{DASHA_SYSTEM_LABELS[system]} Timeline</div>
          <div className="glass-card rounded-2xl p-6">
            {system === 'vimshottari' && dasha ? (
              <DashaTimeline dasha={dasha} currentDate={now} />
            ) : (
              <div className="space-y-2">
                {periods.map((p, i) => {
                  const isActive = now.getTime() >= p.startDate.getTime() && now.getTime() < p.endDate.getTime();
                  return (
                    <div key={i} className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition ${isActive ? 'bg-violet-500/10 ring-1 ring-violet-500/30' : 'bg-white/[0.02]'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-semibold ${isActive ? 'text-violet-300' : 'text-zinc-300'}`}>{p.lord}</span>
                        {isActive && <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full font-medium">ACTIVE</span>}
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-zinc-500">{p.startDate.getFullYear()} – {p.endDate.getFullYear()}</span>
                        <span className="text-xs text-zinc-600 ml-2">({p.durationYears.toFixed(1)}y)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
