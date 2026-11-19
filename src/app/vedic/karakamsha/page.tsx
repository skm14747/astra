'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateCharaKarakas, getKarakamsha, getSwamsha } from '@/lib/vedic/jaimini';
import { PLANET_GLYPH, RASHI_GLYPH } from '@/lib/vedic/glyphs';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import type { Lang } from '@/lib/vedic/types';
import { getPlanetName, getRashiNameByKey, getRashiName } from '@/lib/vedic/domain-i18n';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { getKarakamshaInterpretation } from '@/lib/vedic/interpretations/jaimini';
import { useT } from '@/lib/i18n';
import { useSettings } from '@/lib/settings/context';

const ISHTA_DEVATA: Record<string, string> = {
  Sun: 'Shiva (Rudra)', Moon: 'Gouri (Parvati)', Mars: 'Skanda (Kartikeya)',
  Mercury: 'Vishnu', Jupiter: 'Samba Shiva (Shiva with family)',
  Venus: 'Mahalakshmi', Saturn: 'Vishnu (Narayana)',
  Rahu: 'Durga (Tamasi)', Ketu: 'Ganesha (Ganapati)',
};

export default function KarakamshaPage() {
  const { chart } = useProfileChart();
  const { language } = useSettings();
  const t = useT();
  const lang = language as Lang;

  const data = useMemo(() => {
    if (!chart) return null;
    const karakas = calculateCharaKarakas(chart);
    const ak = karakas[0];
    const karakamsha = getKarakamsha(chart);
    const swamsha = getSwamsha(chart);

    const twelfthFromKK = ((karakamsha.rashi + 11) % 12);
    const twelfthName = RASHI_NAMES[twelfthFromKK];
    const tenthFromKK = ((karakamsha.rashi + 9) % 12);
    const tenthName = RASHI_NAMES[tenthFromKK];
    const fifthFromKK = ((karakamsha.rashi + 4) % 12);
    const fifthName = RASHI_NAMES[fifthFromKK];

    const planetsIn12th: string[] = [];
    for (const [planet, info] of Object.entries(chart.planets)) {
      if (info.rashi === twelfthFromKK) planetsIn12th.push(planet);
    }
    const ishtaDevata = planetsIn12th.length > 0
      ? planetsIn12th.map(p => ISHTA_DEVATA[p] ?? p).join(' / ')
      : `Ruled by ${ISHTA_DEVATA[Object.keys(ISHTA_DEVATA).find(k => k === RASHI_NAMES[twelfthFromKK]) ?? 'Sun'] ?? 'the sign lord'}`;

    const kkInterp = getKarakamshaInterpretation(karakamsha.rashi);

    return { ak, karakamsha, swamsha, twelfthName, tenthName, fifthName, planetsIn12th, ishtaDevata, kkInterp };
  }, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🕉" title="Karakamsha Calculator" description="Enter your birth details to discover your soul purpose through the Karakamsha." />
      <SeoIntro headingKey="seo.karakamsha.heading" textKey="seo.karakamsha.text" />
      {VEDIC_SEO.karakamsha.relatedTools && <RelatedTools tools={VEDIC_SEO.karakamsha.relatedTools} />}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-amber-400/40">🕉 Jaimini · Karakamsha</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('karakamsha.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('karakamsha.subtitle')}</p>
      </div>

      {/* Hero: Karakamsha */}
      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-28 h-28 bg-amber-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="text-xs text-amber-400/80 tracking-wider font-medium mb-1">{t('karakamsha.yourKK')}</div>
          <div className="text-3xl text-white font-display font-bold">
            {RASHI_GLYPH[data.karakamsha.rashiName]} {getRashiNameByKey(data.karakamsha.rashiName, lang)}
          </div>
          <div className="text-sm text-zinc-400 mt-1">
            {getPlanetName(data.ak.planet, lang)} — {getRashiNameByKey(data.karakamsha.rashiName, lang)} (D9)
          </div>
        </div>
      </div>

      {/* Karakamsha Interpretation */}
      {data.kkInterp && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">{t('karakamsha.kkMeaning')} — {getRashiNameByKey(data.karakamsha.rashiName, lang)}</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">{data.kkInterp}</p>
        </div>
      )}

      {/* Houses from Karakamsha */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">{t('karakamsha.12thFromKK')}</h2>
          <div className="text-xl text-amber-400 mb-2">{RASHI_GLYPH[data.twelfthName]} {getRashiNameByKey(data.twelfthName, lang)}</div>
          <p className="text-sm text-zinc-400">{data.planetsIn12th.length > 0 ? data.planetsIn12th.map(p => `${PLANET_GLYPH[p]} ${getPlanetName(p, lang)}`).join(', ') : t('rpt.none')}</p>
          <p className="text-sm text-zinc-300 mt-2">Ishta Devata: {data.ishtaDevata}</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">{t('karakamsha.10thFromKK')}</h2>
          <div className="text-xl text-amber-400">{RASHI_GLYPH[data.tenthName]} {getRashiNameByKey(data.tenthName, lang)}</div>
          <p className="text-sm text-zinc-400 mt-2">{t('karakamsha.10thDesc')}</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">{t('karakamsha.5thFromKK')}</h2>
          <div className="text-xl text-amber-400">{RASHI_GLYPH[data.fifthName]} {getRashiNameByKey(data.fifthName, lang)}</div>
          <p className="text-sm text-zinc-400 mt-2">{t('karakamsha.5thDesc')}</p>
        </div>
      </div>

      {/* Swamsha Houses */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">{t('karakamsha.swamshaHouses')}</h2>
        <p className="text-sm text-zinc-500 mb-4">{t('karakamsha.swamshaDesc')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {data.swamsha.houses.map(h => (
            <div key={h.house} className="bg-white/[0.03] rounded-xl p-3 text-center">
              <div className="text-xs text-zinc-500">House {h.house}</div>
              <div className="text-zinc-100 font-medium mt-1">
                {RASHI_GLYPH[h.rashiName]} {getRashiNameByKey(h.rashiName, lang)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SeoIntro headingKey="seo.karakamsha.heading" textKey="seo.karakamsha.text" />
      {VEDIC_SEO.karakamsha.relatedTools && <RelatedTools tools={VEDIC_SEO.karakamsha.relatedTools} />}
    </div>
  );
}
