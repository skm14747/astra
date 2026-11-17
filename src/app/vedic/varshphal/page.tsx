'use client';
import { useState, useMemo, useEffect } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateVarshaphal } from '@/lib/vedic/predictions';
import { detectTajikaYogas, calculateSahams } from '@/lib/vedic/tajika';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import { RASHI_GLYPH, PLANET_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';

export default function VarshphalPage() {
  const { chart } = useProfileChart();
  const [currentYear, setCurrentYear] = useState(2026);
  const [year, setYear] = useState(2026);

  useEffect(() => {
    const cy = new Date().getFullYear();
    setCurrentYear(cy);
    setYear(cy);
  }, []);

  const data = useMemo(() => {
    if (!chart) return null;
    const vp = calculateVarshaphal(chart, year);
    const varshaLagnaName = RASHI_NAMES[vp.varshaLagna];
    const munthaName = RASHI_NAMES[vp.muntha];

    const annualPlanets = Object.entries(chart.planets).map(([name, info]) => ({
      name,
      longitude: info.siderealLongitude,
      speed: info.speed ?? 1,
    }));
    const tajikaYogas = detectTajikaYogas(annualPlanets);

    const sunLon = chart.planets.Sun.siderealLongitude;
    const moonLon = chart.planets.Moon.siderealLongitude;
    const ascLon = chart.ascendant.longitude;
    const isDaytime = sunLon > 0 && sunLon < 180;
    const sahams = calculateSahams(sunLon, moonLon, ascLon, isDaytime);

    return { vp, varshaLagnaName, munthaName, tajikaYogas, sahams };
  }, [chart, year]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="📅" title="Varshphal Calculator" description="Enter your birth details to generate your annual horoscope." />
      <SeoIntro headingKey="seo.varshphal.heading" textKey="seo.varshphal.text" />
      {VEDIC_SEO.varshphal.relatedTools && <RelatedTools tools={VEDIC_SEO.varshphal.relatedTools} />}
    </div>
  );

  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-amber-400/40">📅 Varshphal</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Varshphal Calculator</h1>
        <p className="text-zinc-400 mt-1">Annual Horoscope (Solar Return) with Muntha, Year Lord &amp; Tajaka Yogas</p>
      </div>

      {/* Year Selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-zinc-400">Select Year:</label>
        <select
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        >
          {yearOptions.map(y => (
            <option key={y} value={y} className="bg-zinc-900">{y}{y === currentYear ? ' (Current)' : ''}</option>
          ))}
        </select>
      </div>

      {/* Hero: Key Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 vedic-glow">
          <div className="text-xs text-amber-400/80 uppercase tracking-wider font-medium mb-1">Solar Return</div>
          <div className="text-zinc-200 font-medium">{data.vp.solarReturnDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="text-xs text-amber-400/80 uppercase tracking-wider font-medium mb-1">Varsha Lagna</div>
          <div className="text-xl text-white font-display font-bold">
            {RASHI_GLYPH[data.varshaLagnaName]} {data.varshaLagnaName}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="text-xs text-amber-400/80 uppercase tracking-wider font-medium mb-1">Muntha</div>
          <div className="text-xl text-white font-display font-bold">
            {RASHI_GLYPH[data.munthaName]} {data.munthaName}
          </div>
          <div className="text-xs text-zinc-500 mt-1">Lord: {PLANET_GLYPH[data.vp.munthaLord]} {data.vp.munthaLord}</div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="text-xs text-amber-400/80 uppercase tracking-wider font-medium mb-1">Year Lord</div>
          <div className="text-xl text-white font-display font-bold">
            {PLANET_GLYPH[data.vp.yearLord]} {data.vp.yearLord}
          </div>
        </div>
      </div>

      {/* Tajaka Yogas */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">Tajaka Yogas ({year})</h2>
        {data.tajikaYogas.length === 0 ? (
          <p className="text-zinc-400 text-sm">No Tajaka yogas detected for this year.</p>
        ) : (
          <div className="space-y-3">
            {data.tajikaYogas.map((y, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${y.name === 'Ithasala' ? 'bg-green-600/20 text-green-400' : y.name === 'Ishrafa' ? 'bg-red-600/20 text-red-400' : 'bg-zinc-700/40 text-zinc-400'}`}>
                  {y.name}
                </span>
                <span className="text-zinc-300 text-sm">{y.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sahams */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">Sahams (Sensitive Points)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.sahams.map(s => (
            <div key={s.name} className="bg-white/[0.03] rounded-xl p-3">
              <div className="text-xs text-zinc-500">{s.name}</div>
              <div className="text-zinc-200 font-medium mt-1">
                {RASHI_GLYPH[s.rashiName]} {s.rashiName} {s.degree.toFixed(1)}°
              </div>
            </div>
          ))}
        </div>
      </div>

      <SeoIntro headingKey="seo.varshphal.heading" textKey="seo.varshphal.text" />
      {VEDIC_SEO.varshphal.relatedTools && <RelatedTools tools={VEDIC_SEO.varshphal.relatedTools} />}
    </div>
  );
}
