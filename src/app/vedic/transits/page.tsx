'use client';
import { useMemo, useState, useEffect } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import { useProfile } from '@/lib/profile/context';
import { useSettings } from '@/lib/settings/context';
import EmptyState from '@/components/shared/EmptyState';
import { generateKundli } from '@/lib/vedic/core';
import { detectSadeSati, calculateTransitScore, getTransitEffect } from '@/lib/vedic/transits';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import type { Planet } from '@/lib/vedic/types';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

export default function TransitsPage() {
  const { chart } = useProfileChart();
  const { activeProfile } = useProfile();
  const { ayanamsaSystem } = useSettings();
  const [clientNow, setClientNow] = useState<Date | null>(null);

  const t = useT();
  useEffect(() => { setClientNow(new Date()); }, []);

  const data = useMemo(() => {
    if (!chart || !activeProfile || !clientNow) return null;
    const now = generateKundli({ date: clientNow, observer: { latitude: activeProfile.latitude, longitude: activeProfile.longitude } }, ayanamsaSystem);
    const moonRashi = chart.planets.Moon.rashi;
    const sadeSati = detectSadeSati(now.planets.Saturn.rashi, moonRashi);
    const score = calculateTransitScore(now.planets.Saturn.rashi, now.planets.Jupiter.rashi, now.planets.Rahu.rashi, moonRashi);
    const transitPlanets: Planet[] = ['Jupiter', 'Saturn', 'Rahu', 'Ketu', 'Mars'];
    const transits = transitPlanets.map(p => getTransitEffect(p, now.planets[p].rashi, moonRashi));
    return { sadeSati, score, transits };
  }, [chart, activeProfile, ayanamsaSystem, clientNow]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🪐" title={t('transits.title')} description={t('empty.transits')} />
      <SeoIntro headingKey="seo.transits.heading" textKey="seo.transits.text" />
      {VEDIC_SEO.transits.relatedTools && <RelatedTools tools={VEDIC_SEO.transits.relatedTools} />}
    </div>
  );

  const scoreColor = data.score >= 70 ? 'text-green-400' : data.score >= 50 ? 'text-yellow-400' : 'text-red-400';
  const barColor = data.score >= 70 ? 'bg-green-500' : data.score >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-amber-400/40">🪐 ♄ ♃ ☊</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('transits.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('transits.subtitle')}</p>
      </div>

      {/* Summary pills */}
      <div className="flex gap-3 flex-wrap">
        <span className="planet-badge !bg-emerald-500/12 !border-emerald-500/20 !text-emerald-400">{t('transits.favorable', { n: data.transits.filter(tr => tr.isFavorable).length })}</span>
        <span className="planet-badge !bg-red-500/12 !border-red-500/20 !text-red-400">{t('transits.challenging', { n: data.transits.filter(tr => !tr.isFavorable).length })}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`glass-card rounded-2xl p-5 ${data.sadeSati.isActive ? 'vedic-glow border-yellow-500/20' : ''}`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{PLANET_GLYPH.Saturn}</span>
            <h2 className="font-semibold text-zinc-100">{t('transits.sadeSati')}</h2>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">{data.sadeSati.description}</p>
          <div className="mt-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              data.sadeSati.isActive ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
            }`}>
              {data.sadeSati.isActive ? t('common.active') : t('common.notActive')}
            </span>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5">
          <div className="section-title mb-2">{t('transits.transitScore')}</div>
          <div className={`text-4xl font-bold font-display ${scoreColor}`}>{data.score}<span className="text-lg text-zinc-600"> / 95</span></div>
          <div className="w-full bg-white/[0.04] rounded-full h-2 mt-3">
            <div className={`h-2 rounded-full transition-all ${barColor}`} style={{ width: `${(data.score / 95) * 100}%` }} />
          </div>
        </div>
      </div>

      <div>
        <div className="section-title mb-4">{t('transits.planetEffects')}</div>
        <div className="space-y-3">
          {data.transits.map((tr, i) => (
            <div key={i} className={`glass-card rounded-xl p-4 flex items-start gap-4 ${tr.isFavorable ? 'vedic-glow' : 'border-red-500/10'}`}>
              <span className="text-2xl mt-0.5">{PLANET_GLYPH[tr.planet]}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-zinc-100">{tr.planet}</span>
                  <span className="text-xs text-zinc-500">{t('transits.fromMoon', { n: tr.houseFromMoon })}</span>
                  <span className={`ml-auto w-2 h-2 rounded-full ${tr.isFavorable ? 'bg-green-400' : 'bg-red-400'}`} />
                </div>
                <p className="text-sm text-zinc-400">{tr.effect}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
