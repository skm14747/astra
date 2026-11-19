'use client';
import { useState, useMemo } from 'react';
import { useProfile } from '@/lib/profile/context';
import { useSettings } from '@/lib/settings/context';
import EmptyState from '@/components/shared/EmptyState';
import { generateKundli } from '@/lib/vedic/core';
import { calculateFullCompatibility } from '@/lib/vedic/matching';
import type { CompatibilityResult, Lang } from '@/lib/vedic/types';
import { getKootaName, getKootaArea, getCompatibilityDescription, getVerdict } from '@/lib/vedic/domain-i18n';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

export default function CompatibilityPage() {
  const { profiles, activeProfileId } = useProfile();
  const { ayanamsaSystem, language } = useSettings();
  const t = useT();
  const lang = language as Lang;
  const [profile1Id, setProfile1Id] = useState<string | null>(null);
  const [profile2Id, setProfile2Id] = useState<string | null>(null);

  const p1 = profile1Id ?? activeProfileId;
  const p2 = profile2Id;

  const result = useMemo<CompatibilityResult | null>(() => {
    const pr1 = profiles.find(p => p.id === p1);
    const pr2 = profiles.find(p => p.id === p2);
    if (!pr1 || !pr2) return null;
    const [y1, m1, d1] = pr1.dateOfBirth.split('-').map(Number);
    const [h1, min1] = pr1.timeOfBirth.split(':').map(Number);
    const [y2, m2, d2] = pr2.dateOfBirth.split('-').map(Number);
    const [h2, min2] = pr2.timeOfBirth.split(':').map(Number);
    const chart1 = generateKundli({ date: new Date(y1, m1 - 1, d1, h1, min1), observer: { latitude: pr1.latitude, longitude: pr1.longitude } }, ayanamsaSystem);
    const chart2 = generateKundli({ date: new Date(y2, m2 - 1, d2, h2, min2), observer: { latitude: pr2.latitude, longitude: pr2.longitude } }, ayanamsaSystem);
    return calculateFullCompatibility(chart1, chart2);
  }, [p1, p2, profiles, ayanamsaSystem]);

  if (profiles.length < 2) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
        <EmptyState icon="💫" title={t('compat.title')} description={t('empty.compat')} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-rose-400/40">💫 ☽ ♀ ❤</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('compat.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('compat.subtitle')}</p>
      </div>

      <div className="section-title mb-3">{t('compat.selectPartners')}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-400" />
            <h3 className="font-semibold text-zinc-200">{t('compat.partner1')}</h3>
          </div>
          <select value={p1 ?? ''} onChange={e => setProfile1Id(e.target.value || null)} className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm focus:border-violet-500 outline-none transition">
            <option value="">{t('common.selectProfile')}</option>
            {profiles.map(p => <option key={p.id} value={p.id}>{p.name} — {p.dateOfBirth}</option>)}
          </select>
        </div>
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-pink-400" />
            <h3 className="font-semibold text-zinc-200">{t('compat.partner2')}</h3>
          </div>
          <select value={p2 ?? ''} onChange={e => setProfile2Id(e.target.value || null)} className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-sm focus:border-violet-500 outline-none transition">
            <option value="">{t('common.selectProfile')}</option>
            {profiles.map(p => <option key={p.id} value={p.id}>{p.name} — {p.dateOfBirth}</option>)}
          </select>
        </div>
      </div>

      {result && (
        <>
          <div className={`glass-card rounded-2xl p-8 text-center ${result.totalScore >= 18 ? 'vedic-glow' : ''}`}>
            <div className="section-title mb-3">{t('compat.ashtakootaScore')}</div>
            <div className={`text-5xl font-bold font-display ${result.totalScore >= 18 ? 'text-green-400' : 'text-red-400'}`}>
              {result.totalScore}<span className="text-xl text-zinc-600"> / {result.maxScore}</span>
            </div>
            <p className="text-zinc-400 mt-2">{getVerdict(result.verdict, lang)}</p>
            {(result.mangalDosha.boy || result.mangalDosha.girl) && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 text-xs">
                ⚠ {t('compat.mangalDosha')}: {[result.mangalDosha.boy && t('compat.partner1'), result.mangalDosha.girl && t('compat.partner2')].filter(Boolean).join(' & ')}
              </div>
            )}
          </div>

          <div>
            <div className="section-title mb-4">{t('compat.kootaBreakdown')}</div>
            <div className="space-y-2">
              {result.kootas.map(k => {
                const kootaBg = k.score === k.maxScore ? 'bg-emerald-500/[0.04]' : k.score === 0 ? 'bg-red-500/[0.04]' : '';
                return (
                <div key={k.name} className={`glass-card rounded-xl px-5 py-3 flex items-center justify-between ${kootaBg}`}>
                  <div>
                    <span className="font-medium text-zinc-200 text-sm">{getKootaName(k.name, lang)}</span>
                    <span className="text-xs text-zinc-600 ml-2">({getKootaArea(k.name, lang)})</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-zinc-500 hidden sm:inline">{getCompatibilityDescription(k.description, lang)}</span>
                    <span className={`font-bold text-sm min-w-[40px] text-right ${
                      k.score === k.maxScore ? 'text-green-400' : k.score === 0 ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {k.score}/{k.maxScore}
                    </span>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      <SeoIntro headingKey="seo.compatibility.heading" textKey="seo.compatibility.text" />
      {VEDIC_SEO.compatibility.relatedTools && <RelatedTools tools={VEDIC_SEO.compatibility.relatedTools} />}
    </div>
  );
}
