'use client';
import { useState, useMemo, useEffect } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateVarshaphal } from '@/lib/vedic/predictions';
import { detectTajikaYogas, calculateSahams } from '@/lib/vedic/tajika';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import { RASHI_GLYPH, PLANET_GLYPH } from '@/lib/vedic/glyphs';
import type { Lang } from '@/lib/vedic/types';
import { getPlanetName, getRashiNameByKey } from '@/lib/vedic/domain-i18n';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';
import { useSettings } from '@/lib/settings/context';

export default function VarshphalPage() {
  const { chart } = useProfileChart();
  const { language } = useSettings();
  const t = useT();
  const lang = language as Lang;
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
      <EmptyState icon="📅" title={t('varshphal.title')} description={t('varshphal.subtitle')} />
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
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('varshphal.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('varshphal.subtitle')}</p>
      </div>

      {/* Year Selector */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-zinc-400">{t('varshphal.selectYear')}</label>
        <select
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40"
        >
          {yearOptions.map(y => (
            <option key={y} value={y} className="bg-zinc-900">{y}{y === currentYear ? ` ${t('varshphal.current')}` : ''}</option>
          ))}
        </select>
      </div>

      {/* Hero: Key Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 vedic-glow">
          <div className="text-xs text-amber-400/80 font-medium mb-1">{t('varshphal.solarReturn')}</div>
          <div className="text-zinc-200 font-medium">{data.vp.solarReturnDate.toLocaleDateString(language === 'en' ? 'en-IN' : language, { day: 'numeric', month: 'long', year: 'numeric' })}</div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="text-xs text-amber-400/80 font-medium mb-1">{t('varshphal.varshaLagna')}</div>
          <div className="text-xl text-white font-display font-bold">
            {RASHI_GLYPH[data.varshaLagnaName]} {getRashiNameByKey(data.varshaLagnaName, lang)}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="text-xs text-amber-400/80 font-medium mb-1">{t('varshphal.muntha')}</div>
          <div className="text-xl text-white font-display font-bold">
            {RASHI_GLYPH[data.munthaName]} {getRashiNameByKey(data.munthaName, lang)}
          </div>
          <div className="text-xs text-zinc-500 mt-1">{t('rpt.lord')}: {PLANET_GLYPH[data.vp.munthaLord]} {getPlanetName(data.vp.munthaLord, lang)}</div>
        </div>
        <div className="glass-card rounded-2xl p-5">
          <div className="text-xs text-amber-400/80 font-medium mb-1">{t('varshphal.yearLord')}</div>
          <div className="text-xl text-white font-display font-bold">
            {PLANET_GLYPH[data.vp.yearLord]} {getPlanetName(data.vp.yearLord, lang)}
          </div>
        </div>
      </div>

      {/* Tajaka Yogas */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('varshphal.tajikaYogas')} ({year})</h2>
        {data.tajikaYogas.length === 0 ? (
          <p className="text-zinc-400 text-sm">{t('varshphal.noYogas')}</p>
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
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('varshphal.sahams')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {data.sahams.map(s => (
            <div key={s.name} className="bg-white/[0.03] rounded-xl p-3">
              <div className="text-xs text-zinc-500">{s.name}</div>
              <div className="text-zinc-200 font-medium mt-1">
                {RASHI_GLYPH[s.rashiName]} {getRashiNameByKey(s.rashiName, lang)} {s.degree.toFixed(1)}°
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
