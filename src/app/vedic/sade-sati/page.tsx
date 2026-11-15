'use client';
import { useMemo, useState, useEffect } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import { useProfile } from '@/lib/profile/context';
import { useSettings } from '@/lib/settings/context';
import EmptyState from '@/components/shared/EmptyState';
import { generateKundli } from '@/lib/vedic/core';
import { detectSadeSati, isKantakaShani, isAshtamaShani, detectDhaiya } from '@/lib/vedic/transits';
import { RASHI_NAMES, RASHI_NAMES_SANSKRIT } from '@/lib/vedic/constants';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

const PHASE_COLORS = {
  rising: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', text: 'text-yellow-400' },
  peak: { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400' },
  setting: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
} as const;

export default function SadeSatiPage() {
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
    const saturnRashi = now.planets.Saturn.rashi;
    const sadeSati = detectSadeSati(saturnRashi, moonRashi);
    const kantaka = isKantakaShani(saturnRashi, moonRashi);
    const ashtama = isAshtamaShani(saturnRashi, moonRashi);
    const dhaiya = detectDhaiya(saturnRashi, moonRashi);
    return { sadeSati, kantaka, ashtama, dhaiya, moonRashi, saturnRashi };
  }, [chart, activeProfile, ayanamsaSystem, clientNow]);

  const seo = VEDIC_SEO['sade-sati'];

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🪐" title={t('sadeSati.title')} description={t('empty.sadeSati')} />
      <SeoIntro headingKey="seo.sadeSati.heading" textKey="seo.sadeSati.text" />
      {seo.relatedTools && <RelatedTools tools={seo.relatedTools} />}
    </div>
  );

  const { sadeSati, kantaka, ashtama, dhaiya, moonRashi, saturnRashi } = data;
  const phaseStyle = sadeSati.phase ? PHASE_COLORS[sadeSati.phase] : null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-amber-400/40">{PLANET_GLYPH.Saturn} ♄</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('sadeSati.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('sadeSati.subtitle')}</p>
      </div>

      {/* Sade Sati Status */}
      <div className={`glass-card rounded-2xl p-6 ${sadeSati.isActive ? 'vedic-glow border-yellow-500/20' : ''}`}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{PLANET_GLYPH.Saturn}</span>
          <div>
            <h2 className="font-semibold text-lg text-zinc-100">{t('transits.sadeSati')}</h2>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${
              sadeSati.isActive
                ? `${phaseStyle!.bg} ${phaseStyle!.text} border ${phaseStyle!.border}`
                : 'bg-green-500/10 text-green-400 border border-green-500/20'
            }`}>
              {sadeSati.isActive ? `Active — ${sadeSati.phase!.charAt(0).toUpperCase() + sadeSati.phase!.slice(1)} Phase` : 'Not Active'}
            </span>
          </div>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed">{sadeSati.description}</p>
      </div>

      {/* Position Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-5">
          <div className="section-title mb-2">{t('sadeSati.saturnPosition')}</div>
          <div className="text-2xl font-bold font-display text-violet-400">
            {RASHI_NAMES[saturnRashi]} <span className="text-sm text-zinc-500">({RASHI_NAMES_SANSKRIT[saturnRashi]})</span>
          </div>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="section-title mb-2">{t('sadeSati.moonSign')}</div>
          <div className="text-2xl font-bold font-display text-amber-400">
            {RASHI_NAMES[moonRashi]} <span className="text-sm text-zinc-500">({RASHI_NAMES_SANSKRIT[moonRashi]})</span>
          </div>
        </div>
      </div>

      {/* Related Afflictions */}
      <div>
        <div className="section-title mb-4">Related Saturn Afflictions</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`glass-card rounded-xl p-4 ${kantaka ? 'border-red-500/20' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${kantaka ? 'bg-red-400' : 'bg-green-400'}`} />
              <h3 className="font-semibold text-zinc-100 text-sm">{t('sadeSati.kantaka')}</h3>
            </div>
            <p className="text-xs text-zinc-500">{kantaka ? 'Active — Saturn in 4th/8th/10th from Moon' : 'Not active'}</p>
          </div>
          <div className={`glass-card rounded-xl p-4 ${ashtama ? 'border-red-500/20' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${ashtama ? 'bg-red-400' : 'bg-green-400'}`} />
              <h3 className="font-semibold text-zinc-100 text-sm">{t('sadeSati.ashtama')}</h3>
            </div>
            <p className="text-xs text-zinc-500">{ashtama ? 'Active — Saturn in 8th from Moon' : 'Not active'}</p>
          </div>
          <div className={`glass-card rounded-xl p-4 ${dhaiya?.isActive ? 'border-orange-500/20' : ''}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${dhaiya?.isActive ? 'bg-orange-400' : 'bg-green-400'}`} />
              <h3 className="font-semibold text-zinc-100 text-sm">{t('sadeSati.dhaiya')}</h3>
            </div>
            <p className="text-xs text-zinc-500">{dhaiya?.isActive ? `Active — ${dhaiya.type}` : 'Not active'}</p>
          </div>
        </div>
      </div>

      {/* Remedies */}
      {sadeSati.isActive && (
        <div className="glass-card rounded-2xl p-6">
          <div className="section-title mb-4">{t('sadeSati.remedies')}</div>
          <ul className="space-y-3">
            {(['remedy1', 'remedy2', 'remedy3', 'remedy4', 'remedy5'] as const).map(key => (
              <li key={key} className="flex items-start gap-3 text-sm text-zinc-400">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>{t(`sadeSati.${key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <SeoIntro headingKey="seo.sadeSati.heading" textKey="seo.sadeSati.text" />
      {seo.relatedTools && <RelatedTools tools={seo.relatedTools} />}
    </div>
  );
}
