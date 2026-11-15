'use client';

import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { detectMangalDosha } from '@/lib/vedic/doshas';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

const MANGLIK_HOUSES = [1, 2, 4, 7, 8, 12];
const HOUSE_EFFECTS: Record<number, string> = {
  1: 'Mars in the 1st house (Lagna) makes the native aggressive and dominating in relationships, causing friction with the spouse.',
  2: 'Mars in the 2nd house affects family harmony and can cause harsh speech, leading to disputes in married life.',
  4: 'Mars in the 4th house creates domestic unrest, property disputes, and lack of mental peace in married life.',
  7: 'Mars in the 7th house directly aspects the partner, causing the strongest Mangal Dosha — arguments, ego clashes, and potential separation.',
  8: 'Mars in the 8th house affects longevity of the spouse and can bring sudden crises, accidents, or health issues related to marriage.',
  12: 'Mars in the 12th house causes financial losses through the spouse, dissatisfaction in physical intimacy, and possible separation or living apart.',
};

const seo = VEDIC_SEO['mangal-dosha'];

export default function MangalDoshaPage() {
  const { chart } = useProfileChart();
  const t = useT();

  const result = useMemo(() => {
    if (!chart) return null;
    return detectMangalDosha(chart);
  }, [chart]);

  const marsHouse = chart ? chart.planets.Mars?.house ?? 0 : 0;

  if (!chart) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
        <EmptyState icon="♂" title={t('mangalDosha.title')} description={t('mangalDosha.subtitle')} />
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
          <span className="text-xs text-red-400/40">♂ ✦ ♂</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('mangalDosha.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('mangalDosha.subtitle')}</p>
      </div>

      {/* Status card */}
      {result && (
        <div className={`glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden border-l-4 ${
          result.isActive ? 'border-l-red-500' : result.cancellation ? 'border-l-yellow-500' : 'border-l-emerald-500'
        }`}>
          <div className="flex items-start gap-4">
            <span className="text-4xl">{result.isActive ? '🔴' : result.cancellation ? '🟡' : '🟢'}</span>
            <div>
              <h2 className="text-xl font-display font-bold text-white">
                {result.isActive ? t('mangalDosha.present') : result.cancellation ? t('mangalDosha.cancelled') : t('mangalDosha.notPresent')}
              </h2>
              <p className="text-zinc-400 mt-1">{result.description}</p>
              {result.cancellation && (
                <p className="text-yellow-400/80 mt-2 text-sm">⚡ {t('mangalDosha.cancellation')}: {result.cancellation}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mars placement */}
      <section>
        <h2 className="section-title mb-4">{t('mangalDosha.placement')}</h2>
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl">♂</div>
            <div>
              <div className="text-lg font-display font-bold text-white">{t('mangalDosha.marsInHouse', { h: marsHouse })}</div>
              <div className="text-sm text-zinc-400">
                {MANGLIK_HOUSES.includes(marsHouse) ? t('mangalDosha.isManglikHouse') : t('mangalDosha.isNonManglikHouse')}
              </div>
            </div>
          </div>
          {HOUSE_EFFECTS[marsHouse] && (
            <p className="text-sm text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-4">
              {HOUSE_EFFECTS[marsHouse]}
            </p>
          )}
        </div>
      </section>

      {/* House grid */}
      <section>
        <h2 className="section-title mb-4">{t('mangalDosha.housesOverview')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MANGLIK_HOUSES.map(h => (
            <div key={h} className={`glass-card rounded-xl p-4 ${marsHouse === h ? 'ring-1 ring-red-500/40 bg-red-500/5' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-zinc-300">House {h}</span>
                {marsHouse === h && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">♂ Mars</span>}
              </div>
              <div className="text-xs text-zinc-500">
                {h === 1 && 'Personality & Self'}
                {h === 2 && 'Family & Wealth'}
                {h === 4 && 'Home & Peace'}
                {h === 7 && 'Marriage & Partner'}
                {h === 8 && 'Longevity & Crisis'}
                {h === 12 && 'Losses & Separation'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Remedies section */}
      {result?.isActive && (
        <section>
          <h2 className="section-title mb-4">{t('mangalDosha.remedies')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: '💎', title: 'Gemstone', text: 'Wear a Red Coral (Moonga) in gold ring on the ring finger on Tuesday morning.' },
              { icon: '🕉️', title: 'Mantra', text: 'Chant "Om Angarakaya Namaha" 108 times daily, especially on Tuesdays.' },
              { icon: '🪔', title: 'Ritual', text: 'Perform Mangal Shanti Puja or Kumbh Vivah (symbolic marriage to a banana tree or clay pot).' },
              { icon: '🙏', title: 'Charity', text: 'Donate red lentils (masoor dal), red cloth, and jaggery on Tuesdays at a Hanuman temple.' },
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
