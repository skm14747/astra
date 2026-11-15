'use client';

import { useMemo, useRef } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import ExportButton from '@/components/shared/ExportButton';
import SouthIndianChart from '@/components/vedic/SouthIndianChart';
import { getAllVargas } from '@/lib/vedic/vargas';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';
import type { Planet } from '@/lib/vedic/types';

const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const DISPLAY_PLANETS: Planet[] = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'];

const seo = VEDIC_SEO['navamsa'];

export default function NavamsaPage() {
  const { chart } = useProfileChart();
  const t = useT();
  const chartRef = useRef<HTMLDivElement>(null);

  const vargas = useMemo(() => {
    if (!chart) return null;
    return getAllVargas(chart.ascendant.longitude, chart.planets);
  }, [chart]);

  const d9 = vargas?.d9;
  const d1 = vargas?.d1;

  const vargottamaPlanets = useMemo(() => {
    if (!d1 || !d9) return [];
    return DISPLAY_PLANETS.filter(p => {
      const d1Rashi = d1.planets[p]?.rashi;
      const d9Rashi = d9.planets[p]?.rashi;
      return d1Rashi !== undefined && d1Rashi === d9Rashi;
    });
  }, [d1, d9]);

  if (!chart || !d9) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
        <EmptyState icon="◎" title={t('navamsa.title')} description={t('navamsa.subtitle')} />
        <SeoIntro headingKey={'seo.divisional.heading'} textKey={'seo.divisional.text'} fallbackHeading={seo.seoIntro.heading} fallbackText={seo.seoIntro.text} />
        {seo.relatedTools && <RelatedTools tools={seo.relatedTools} />}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">◎ D9 ✦</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('navamsa.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('navamsa.subtitle')}</p>
      </div>

      {/* Vargottama strip */}
      {vargottamaPlanets.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          <span className="planet-badge !bg-emerald-500/12 !border-emerald-500/20 !text-emerald-400">
            {t('navamsa.vargottamaCount', { n: vargottamaPlanets.length, s: vargottamaPlanets.length > 1 ? 's' : '' })}
          </span>
          {vargottamaPlanets.map(p => (
            <span key={p} className="planet-badge">{p}</span>
          ))}
        </div>
      )}

      {/* Side-by-side charts */}
      <section>
        <h2 className="section-title mb-4">{t('navamsa.d1vsd9')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {d1 && (
            <div className="glass-card rounded-2xl p-4">
              <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium mb-3 text-center">{t('navamsa.d1Chart')}</div>
              <SouthIndianChart houses={d1.houses} ascendantRashi={d1.ascendantRashi} title="D1 Rashi" />
            </div>
          )}
          <div ref={chartRef} className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium text-center flex-1">{t('navamsa.d9Chart')}</div>
              <ExportButton targetRef={chartRef} filename="navamsa-d9" />
            </div>
            <SouthIndianChart houses={d9.houses} ascendantRashi={d9.ascendantRashi} title="D9 Navamsa" />
          </div>
        </div>
      </section>

      {/* Planetary positions table */}
      <section>
        <h2 className="section-title mb-4">{t('navamsa.positions')}</h2>
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-4 py-3 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">Planet</th>
                  <th className="px-4 py-3 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">D1 Sign</th>
                  <th className="px-4 py-3 text-left text-xs text-zinc-500 uppercase tracking-wider font-medium">D9 Sign</th>
                  <th className="px-4 py-3 text-center text-xs text-zinc-500 uppercase tracking-wider font-medium">Vargottama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {DISPLAY_PLANETS.map(p => {
                  const d1Rashi = d1?.planets[p]?.rashi ?? 0;
                  const d9Rashi = d9.planets[p]?.rashi ?? 0;
                  const isVargottama = d1Rashi === d9Rashi;
                  return (
                    <tr key={p} className={isVargottama ? 'bg-emerald-500/5' : ''}>
                      <td className="px-4 py-2.5 font-medium text-zinc-200">{p}</td>
                      <td className="px-4 py-2.5 text-zinc-400">{SIGNS[d1Rashi]}</td>
                      <td className="px-4 py-2.5 text-zinc-400">{SIGNS[d9Rashi]}</td>
                      <td className="px-4 py-2.5 text-center">
                        {isVargottama ? <span className="text-emerald-400 font-semibold">✓</span> : <span className="text-zinc-600">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* D9 Lagna analysis */}
      <section>
        <h2 className="section-title mb-4">{t('navamsa.lagnaInterpret')}</h2>
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-lg">☍</div>
            <div>
              <div className="text-sm font-semibold text-zinc-300">Navamsa Lagna: {SIGNS[d9.ascendantRashi]}</div>
              <div className="text-xs text-zinc-500">The inner self that emerges after marriage and in spiritual pursuits</div>
            </div>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed border-t border-white/[0.04] pt-3">
            The Navamsa Lagna ({SIGNS[d9.ascendantRashi]}) reveals the core of your personality that manifests more
            clearly through partnerships and dharmic activity. While the D1 Lagna shows how the world sees you,
            the D9 Lagna shows who you truly become. Planets in Kendra houses of the D9 chart (1, 4, 7, 10)
            gain strength to deliver their promises from the birth chart.
          </p>
        </div>
      </section>

      <SeoIntro headingKey={'seo.divisional.heading'} textKey={'seo.divisional.text'} fallbackHeading={seo.seoIntro.heading} fallbackText={seo.seoIntro.text} />
      {seo.relatedTools && <RelatedTools tools={seo.relatedTools} />}
    </div>
  );
}
