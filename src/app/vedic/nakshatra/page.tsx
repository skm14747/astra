'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { getNakshatraDetails, isPanchak, getNakshatraCharacteristics } from '@/lib/vedic/nakshatra';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

export default function NakshatraPage() {
  const { chart } = useProfileChart();
  const t = useT();

  const data = useMemo(() => {
    if (!chart) return null;
    const moonLon = chart.planets.Moon.siderealLongitude;
    const details = getNakshatraDetails(moonLon);
    const chars = getNakshatraCharacteristics(details.index);
    const panchak = isPanchak(details.index);
    return { details, chars, panchak };
  }, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="⭐" title={t('nakshatra.title')} description={t('empty.nakshatra')} />
      <SeoIntro headingKey="seo.nakshatra.heading" textKey="seo.nakshatra.text" />
      {VEDIC_SEO.nakshatra.relatedTools && <RelatedTools tools={VEDIC_SEO.nakshatra.relatedTools} />}
    </div>
  );

  const items = [
    { label: 'Nakshatra', value: `${data.details.name} (#${data.details.index + 1})`, icon: '⭐' },
    { label: 'Pada', value: String(data.details.pada), icon: '◈' },
    { label: 'Lord', value: data.details.lord, icon: '👑' },
    { label: 'Degree in Nakshatra', value: `${data.details.degreeInNakshatra.toFixed(2)}°`, icon: '📐' },
    { label: 'Progress', value: `${data.details.percentComplete.toFixed(1)}%`, icon: '📊' },
    { label: 'Deity', value: data.chars.deity, icon: '🙏' },
    { label: 'Symbol', value: data.chars.symbol, icon: '🔱' },
    { label: 'Nature', value: data.chars.nature, icon: '🌿' },
    { label: 'Panchak', value: data.panchak?.isPanchak ? `Yes (${data.panchak.type})` : 'No', icon: '⚠' },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-cyan-400/40">⭐ ☽ ✧</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('nakshatra.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('nakshatra.subtitle')}</p>
      </div>

      {/* Hero card */}
      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-28 h-28 bg-violet-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('nakshatra.birthNakshatra')}</div>
          <div className="text-2xl text-white font-display font-bold">{data.details.name} <span className="text-lg text-zinc-500">#{data.details.index + 1}</span></div>
          <div className="flex items-center gap-3 mt-2 text-sm text-zinc-400">
            <span className="planet-badge">{t('panchang.pada')} {data.details.pada}</span>
            <span>{t('common.lord')}: {data.details.lord}</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
              <span>0°</span>
              <span>{t('nakshatra.throughNakshatra', { n: data.details.percentComplete.toFixed(1) })}</span>
              <span>13°20&apos;</span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.04] overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all" style={{ width: `${data.details.percentComplete}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Characteristics */}
      <div>
        <div className="section-title mb-3">{t('nakshatra.characteristics')}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: t('nakshatra.deity'), value: data.chars.deity, icon: '🙏' },
            { label: t('nakshatra.symbol'), value: data.chars.symbol, icon: '🔱' },
            { label: t('nakshatra.nature'), value: data.chars.nature, icon: '🌿' },
            { label: t('nakshatra.panchak'), value: data.panchak?.isPanchak ? `${t('common.yes')} (${data.panchak.type})` : t('common.no'), icon: '⚠' },
          ].map(item => (
            <div key={item.label} className="glass-card rounded-xl p-4 glow-hover">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">{item.label}</span>
              </div>
              <div className="text-sm font-semibold text-zinc-100">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Position Details */}
      <div>
        <div className="section-title mb-3">{t('nakshatra.positionDetails')}</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: t('nakshatra.degreeIn'), value: `${data.details.degreeInNakshatra.toFixed(2)}°`, icon: '📐' },
            { label: t('nakshatra.progress'), value: `${data.details.percentComplete.toFixed(1)}%`, icon: '📊' },
          ].map(item => (
            <div key={item.label} className="glass-card rounded-xl p-4 glow-hover">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">{item.label}</span>
              </div>
              <div className="text-sm font-semibold text-zinc-100">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
