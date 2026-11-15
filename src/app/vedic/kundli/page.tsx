'use client';
import { useRef } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import { useSettings } from '@/lib/settings/context';
import SouthIndianChart from '@/components/vedic/SouthIndianChart';
import NorthIndianChart from '@/components/vedic/NorthIndianChart';
import ExportButton from '@/components/shared/ExportButton';
import EmptyState from '@/components/shared/EmptyState';
import { getPlanetDignity, isCombust } from '@/lib/vedic/core';
import { PLANET_GLYPH, RASHI_GLYPH } from '@/lib/vedic/glyphs';
import type { Planet } from '@/lib/vedic/types';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import SeoIntro from '@/components/seo/SeoIntro';

export default function KundliPage() {
  const { chart } = useProfileChart();
  const { chartStyle } = useSettings();
  const chartRef = useRef<HTMLDivElement>(null);

  if (!chart) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="☉" title="Kundli / Birth Chart" description="Create a birth profile to generate your Vedic birth chart with planetary positions, houses, and aspects." />
      <SeoIntro heading="What is a Kundli?" text="A Kundli (also called Janam Kundli or Vedic birth chart) is a map of the sky at the exact moment of your birth. It shows the positions of the Sun, Moon, and planets across the 12 zodiac signs and houses. In Vedic astrology (Jyotish), the Kundli is the foundation for all predictions — from personality traits to life events, career timing, and relationship compatibility. Our calculator uses NASA JPL DE-series ephemeris for sub-arc-second precision and the Lahiri Ayanamsa for sidereal corrections." />
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      {/* Page header */}
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">☉ ☽ ♂ ☿ ♃ ♀ ♄</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Kundli</h1>
        <p className="text-zinc-400 mt-1">Your Vedic birth chart and planetary positions</p>
      </div>

      {/* Ascendant card */}
      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-32 h-32 bg-violet-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl drop-shadow-[0_0_8px_rgba(124,92,252,0.5)]">☉</span>
            <h2 className="font-semibold text-zinc-100 text-lg">Ascendant (Lagna)</h2>
          </div>
          <p className="text-zinc-200 ml-10 text-lg">
            <span className="mr-1">{RASHI_GLYPH[RASHI_NAMES[chart.ascendant.rashi]]}</span>
            {RASHI_NAMES[chart.ascendant.rashi]} · {chart.ascendant.degree}° · {chart.ascendant.nakshatraName} Pada {chart.ascendant.pada}
          </p>
          <p className="text-xs text-zinc-500 ml-10 mt-1">
            Ayanamsa ({chart.ayanamsaSystem}): {chart.ayanamsa.toFixed(4)}°
          </p>
        </div>
      </div>

      {/* Summary strip */}
      {(() => {
        const planets: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];
        const retroCount = planets.filter(p => chart.planets[p].isRetrograde).length;
        const exaltedCount = planets.filter(p => getPlanetDignity(p, chart.planets[p].rashi) === 'exalted').length;
        const combustCount = planets.filter(p => p !== 'Sun' && isCombust(p, chart.planets[p].siderealLongitude, chart.planets.Sun.siderealLongitude, chart.planets[p].isRetrograde)).length;
        return (
          <div className="flex gap-3 flex-wrap">
            {exaltedCount > 0 && <span className="planet-badge !bg-emerald-500/12 !border-emerald-500/20 !text-emerald-400">{exaltedCount} Exalted</span>}
            {retroCount > 0 && <span className="planet-badge !bg-amber-500/12 !border-amber-500/20 !text-amber-400">{retroCount} Retrograde</span>}
            {combustCount > 0 && <span className="planet-badge !bg-red-500/12 !border-red-500/20 !text-red-400">{combustCount} Combust</span>}
          </div>
        );
      })()}

      {/* Charts */}
      <div>
        <div className="section-title mb-4">Birth Charts</div>
      </div>
      <div ref={chartRef} className="flex gap-6 flex-wrap items-start">
        {(chartStyle === 'south-indian' || chartStyle === 'both') && (
          <div className="glass-card rounded-2xl p-6 vedic-glow">
            <SouthIndianChart houses={chart.houses} ascendantRashi={chart.ascendant.rashi} title="D1 Rashi (South)" />
          </div>
        )}
        {(chartStyle === 'north-indian' || chartStyle === 'both') && (
          <div className="glass-card rounded-2xl p-6 vedic-glow">
            <NorthIndianChart houses={chart.houses} title="D1 Rashi (North)" />
          </div>
        )}
      </div>
      <ExportButton targetRef={chartRef} filename="astra-kundli" />

      {/* Planet table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-violet-500/[0.06]">
          <div className="section-title mb-1">Graha Positions</div>
          <h2 className="font-display text-lg font-semibold text-white">Planetary Positions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-zinc-400 text-[11px] uppercase tracking-wider border-b border-violet-500/[0.06]">
                <th className="text-left py-3 px-6 font-medium">Planet</th>
                <th className="text-left py-3 px-3 font-medium">Sign</th>
                <th className="text-left py-3 px-3 font-medium">Degree</th>
                <th className="text-left py-3 px-3 font-medium">Nakshatra</th>
                <th className="text-left py-3 px-3 font-medium">Pada</th>
                <th className="text-left py-3 px-3 font-medium">House</th>
                <th className="text-left py-3 px-3 font-medium">Dignity</th>
                <th className="text-left py-3 px-3 font-medium">R</th>
              </tr>
            </thead>
            <tbody>
              {(['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'] as Planet[]).map((p, i) => {
                const pos = chart.planets[p];
                const dignity = getPlanetDignity(p, pos.rashi);
                const combust = isCombust(p, pos.siderealLongitude, chart.planets.Sun.siderealLongitude, pos.isRetrograde);
                return (
                  <tr key={p} className={`border-b border-white/[0.02] transition hover:bg-violet-600/[0.03] ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                    <td className="py-3.5 px-6 font-medium text-zinc-100">
                      <span className="mr-2 text-lg drop-shadow-[0_0_4px_rgba(124,92,252,0.3)]">{PLANET_GLYPH[p]}</span>{p}
                    </td>
                    <td className="py-3.5 px-3 text-zinc-300">
                      <span className="mr-1 text-violet-300/60">{RASHI_GLYPH[pos.rashiName]}</span>{pos.rashiName}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-zinc-400 text-xs">{pos.degree}°{pos.minutes}&apos;{pos.seconds}&quot;</td>
                    <td className="py-3.5 px-3 text-zinc-300">{pos.nakshatraName}</td>
                    <td className="py-3.5 px-3 text-zinc-400">{pos.pada}</td>
                    <td className="py-3.5 px-3 text-zinc-400">{pos.house}</td>
                    <td className="py-3.5 px-3">
                      <span className={`planet-badge ${
                        dignity === 'exalted' ? '!bg-emerald-500/12 !border-emerald-500/20 !text-emerald-400' :
                        dignity === 'debilitated' ? '!bg-red-500/12 !border-red-500/20 !text-red-400' :
                        dignity === 'own' ? '!bg-blue-500/12 !border-blue-500/20 !text-blue-400' : ''
                      }`}>
                        {dignity}{combust ? ' 🔥' : ''}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      {pos.isRetrograde && <span className="text-amber-400 font-bold text-xs drop-shadow-[0_0_4px_rgba(251,191,36,0.4)]">R</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
