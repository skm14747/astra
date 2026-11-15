'use client';
import { useState, useEffect } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import DashaTimeline from '@/components/vedic/DashaTimeline';
import EmptyState from '@/components/shared/EmptyState';
import { calculateVimshottariDasha, getCurrentDashaPeriod } from '@/lib/vedic/dashas';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';

export default function DashasPage() {
  const { chart, birthData } = useProfileChart();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => { setNow(new Date()); }, []);
    
  if (!chart || !birthData) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="⏳" title="Dasha Timeline" description="Create a birth profile to see your Vimshottari Dasha periods." />
      <SeoIntro heading="What is Vimshottari Dasha?" text="The Vimshottari Dasha system is the most widely used timing technique in Vedic astrology. It divides life into 120 years governed by 9 planetary periods (Mahadasha), each further divided into sub-periods (Antardasha) and sub-sub-periods (Pratyantardasha)." />
    </div>
  );

  const moonLon = chart.planets.Moon.siderealLongitude;
  const dasha = calculateVimshottariDasha(moonLon, birthData.date);
  const current = now ? getCurrentDashaPeriod(dasha, now) : null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">⏳ ☽ ☉</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Dasha Timeline</h1>
        <p className="text-zinc-400 mt-1">Vimshottari Mahadasha and Antardasha periods</p>
      </div>

      {current && (() => {
        const mahaStart = current.maha.startDate.getTime();
        const mahaEnd = current.maha.endDate.getTime();
        const nowMs = now!.getTime();
        const mahaProgress = Math.max(0, Math.min(100, ((nowMs - mahaStart) / (mahaEnd - mahaStart)) * 100));
        const yearsLeft = Math.max(0, (mahaEnd - nowMs) / (365.25 * 86400000));
        return (
          <div className="glass-card vedic-glow rounded-2xl p-6 relative overflow-hidden">
            <div className="cosmic-orb w-24 h-24 bg-violet-600/10 -top-6 -right-6" />
            <div className="relative z-10">
              <div className="section-title mb-3">Current Period</div>
              <p className="text-xl text-zinc-100">
                <span className="text-2xl mr-2 drop-shadow-[0_0_8px_rgba(124,92,252,0.4)]">{PLANET_GLYPH[current.maha.lord]}</span>
                <strong>{current.maha.lord}</strong> Mahadasha
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

      {now && (
        <div>
          <div className="section-title mb-4">Full Timeline</div>
          <div className="glass-card rounded-2xl p-6">
            <DashaTimeline dasha={dasha} currentDate={now} />
          </div>
        </div>
      )}
    </div>
  );
}
