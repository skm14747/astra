'use client';

import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { detectKaalSarpDosha } from '@/lib/vedic/doshas';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';
import { useSettings } from '@/lib/settings/context';
import type { Lang } from '@/lib/vedic/types';
import { getPlanetName, getRashiNameByKey } from '@/lib/vedic/domain-i18n';

const KAAL_SARP_TYPES_INFO: Record<number, { name: string; meaning: string; area: string }> = {
  1: { name: 'Anant', meaning: 'Infinite serpent (Shesha)', area: 'Personality, health, and overall life path' },
  2: { name: 'Kulik', meaning: 'Venomous serpent', area: 'Wealth, family, and speech' },
  3: { name: 'Vasuki', meaning: 'King of serpents', area: 'Siblings, courage, and communication' },
  4: { name: 'Shankhapal', meaning: 'Conch serpent', area: 'Home, mother, and mental peace' },
  5: { name: 'Padma', meaning: 'Lotus serpent', area: 'Children, education, and creativity' },
  6: { name: 'Mahapadma', meaning: 'Great lotus serpent', area: 'Enemies, debts, and health issues' },
  7: { name: 'Takshak', meaning: 'Treasurer serpent', area: 'Marriage, partnerships, and business' },
  8: { name: 'Karkotak', meaning: 'Coiled serpent', area: 'Longevity, sudden events, and occult' },
  9: { name: 'Shankhachur', meaning: 'Crest jewel serpent', area: 'Fortune, dharma, and father' },
  10: { name: 'Ghatak', meaning: 'Deadly serpent', area: 'Career, authority, and public image' },
  11: { name: 'Vishdhar', meaning: 'Poison-bearing serpent', area: 'Income, gains, and elder siblings' },
  12: { name: 'Sheshnag', meaning: 'Final serpent', area: 'Expenses, foreign lands, and liberation' },
};

const seo = VEDIC_SEO['kaal-sarp-dosha'];

export default function KaalSarpDoshaPage() {
  const { chart } = useProfileChart();
  const { language } = useSettings();
  const t = useT();
  const lang = language as Lang;

  const result = useMemo(() => {
    if (!chart) return null;
    return detectKaalSarpDosha(chart);
  }, [chart]);

  const rahuHouse = chart ? chart.planets.Rahu?.house ?? 0 : 0;
  const typeInfo = KAAL_SARP_TYPES_INFO[rahuHouse];

  if (!chart) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
        <EmptyState icon="🐍" title={t('kaalSarp.title')} description={t('kaalSarp.subtitle')} />
        <SeoIntro headingKey={'seo.yogas.heading'} textKey={'seo.yogas.text'} fallbackHeading={seo.seoIntro.heading} fallbackText={seo.seoIntro.text} />
        {seo.relatedTools && <RelatedTools tools={seo.relatedTools} />}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-purple-400/40">☊ ✦ ☋</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('kaalSarp.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('kaalSarp.subtitle')}</p>
      </div>

      {/* Status card */}
      {result && (
        <div className={`glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden border-l-4 ${
          result.isActive ? 'border-l-purple-500' : 'border-l-emerald-500'
        }`}>
          <div className="flex items-start gap-4">
            <span className="text-4xl">{result.isActive ? '🐍' : '🟢'}</span>
            <div>
              <h2 className="text-xl font-display font-bold text-white">
                {result.isActive ? t('kaalSarp.present') : t('kaalSarp.notPresent')}
              </h2>
              <p className="text-zinc-400 mt-1">{result.description}</p>
              {result.type && result.isActive && (
                <p className="text-purple-400/80 mt-2 text-sm">🔮 {t('kaalSarp.type')}: {result.type}</p>
              )}
              {result.severity && result.isActive && (
                <span className={`inline-block mt-2 planet-badge ${
                  result.severity === 'severe' ? '!bg-red-500/12 !border-red-500/20 !text-red-400' : '!bg-yellow-500/12 !border-yellow-500/20 !text-yellow-400'
                }`}>
                  {result.severity === 'severe' ? t('kaalSarp.full') : t('kaalSarp.partial')}
                </span>
              )}
              {result.cancellation && (
                <p className="text-emerald-400/80 mt-2 text-sm">✓ {result.cancellation}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rahu-Ketu axis */}
      {chart && (
        <section>
          <h2 className="section-title mb-4">{t('kaalSarp.axis')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg">☊</div>
                <div>
                  <div className="text-sm font-semibold text-zinc-300">{getPlanetName('Rahu', lang)} ({t('rpt.th.house')} {chart.planets.Rahu.house})</div>
                  <div className="text-xs text-zinc-500">{getRashiNameByKey(chart.planets.Rahu.rashiName, lang)} · {chart.planets.Rahu.degree.toFixed(1)}°</div>
                </div>
              </div>
              <div className="text-xs text-zinc-400">
                {t('kaalSarp.rahuDesc', { h: chart.planets.Rahu.house })}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-lg">☋</div>
                <div>
                  <div className="text-sm font-semibold text-zinc-300">{getPlanetName('Ketu', lang)} ({t('rpt.th.house')} {chart.planets.Ketu.house})</div>
                  <div className="text-xs text-zinc-500">{getRashiNameByKey(chart.planets.Ketu.rashiName, lang)} · {chart.planets.Ketu.degree.toFixed(1)}°</div>
                </div>
              </div>
              <div className="text-xs text-zinc-400">
                {t('kaalSarp.ketuDesc', { h: chart.planets.Ketu.house })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Type info */}
      {result?.isActive && typeInfo && (
        <section>
          <h2 className="section-title mb-4">{typeInfo.name} Kaal Sarp Dosha</h2>
          <div className="glass-card rounded-2xl p-5">
            <div className="text-sm text-zinc-400 leading-relaxed space-y-3">
              <p><strong className="text-zinc-200">Name:</strong> {typeInfo.name} ({typeInfo.meaning})</p>
              <p><strong className="text-zinc-200">Rahu position:</strong> House {rahuHouse}</p>
              <p><strong className="text-zinc-200">Primary area affected:</strong> {typeInfo.area}</p>
              <p>
                In {typeInfo.name} Kaal Sarp, Rahu in the {rahuHouse === 1 ? '1st' : rahuHouse === 2 ? '2nd' : rahuHouse === 3 ? '3rd' : `${rahuHouse}th`} house
                directs the serpent&apos;s energy toward {typeInfo.area.toLowerCase()}. The native may experience recurring cycles of effort
                and setback in these areas until the karmic lesson is learned.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 12 Types reference */}
      <section>
        <h2 className="section-title mb-4">{t('kaalSarp.types')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {Object.entries(KAAL_SARP_TYPES_INFO).map(([house, info]) => (
            <div key={house} className={`glass-card rounded-xl px-4 py-3 ${
              +house === rahuHouse && result?.isActive ? 'ring-1 ring-purple-500/40 bg-purple-500/5' : ''
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-zinc-300">{info.name}</span>
                <span className="text-xs text-zinc-500">Rahu in H{house}</span>
              </div>
              <div className="text-xs text-zinc-500 mt-1">{info.area}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Remedies */}
      {result?.isActive && (
        <section>
          <h2 className="section-title mb-4">{t('kaalSarp.remedies')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: '🕉️', title: 'Kaal Sarp Puja', text: 'Perform Kaal Sarp Dosha Nivaran Puja at Trimbakeshwar, Ujjain, or any Nag temple on Nag Panchami or during Rahu-Kaal.' },
              { icon: '💎', title: 'Gemstones', text: 'Wear Gomed (Hessonite) for Rahu and Lehsunia (Cat\'s Eye) for Ketu in silver rings on the middle and little fingers respectively.' },
              { icon: '🐍', title: 'Nag Puja', text: 'Offer milk to a silver snake idol on Nag Panchami. Donate to snake conservation or Nag temples.' },
              { icon: '📿', title: 'Mantras', text: 'Chant "Om Rahuve Namaha" (18,000 times) and "Om Ketuve Namaha" (7,000 times) during a 40-day discipline.' },
            ].map(r => (
              <div key={r.title} className="glass-card rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{r.icon}</span>
                  <span className="font-semibold text-zinc-200">{r.title}</span>
                </div>
                <p className="text-sm text-zinc-400">{r.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <SeoIntro headingKey={'seo.yogas.heading'} textKey={'seo.yogas.text'} fallbackHeading={seo.seoIntro.heading} fallbackText={seo.seoIntro.text} />
      {seo.relatedTools && <RelatedTools tools={seo.relatedTools} />}
    </div>
  );
}
