'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { calculateCharaKarakas, getKarakamsha } from '@/lib/vedic/jaimini';
import { PLANET_GLYPH, RASHI_GLYPH } from '@/lib/vedic/glyphs';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { getAtmakarakaInterpretation, getKarakamshaInterpretation } from '@/lib/vedic/interpretations/jaimini';

const AK_LESSONS: Record<string, { lesson: string; desire: string; deity: string }> = {
  Sun: { lesson: 'Learning humility and selfless service', desire: 'Recognition and authority', deity: 'Shiva' },
  Moon: { lesson: 'Emotional detachment and inner peace', desire: 'Emotional security and nurturing', deity: 'Parvati / Gouri' },
  Mars: { lesson: 'Controlling anger and aggression', desire: 'Victory and dominance', deity: 'Skanda / Kartikeya' },
  Mercury: { lesson: 'Truthful speech and honest communication', desire: 'Knowledge and intellectual mastery', deity: 'Vishnu' },
  Jupiter: { lesson: 'Respecting all traditions equally', desire: 'Wisdom and spiritual expansion', deity: 'Samba Shiva' },
  Venus: { lesson: 'Moderation in desires and relationships', desire: 'Love, beauty, and pleasure', deity: 'Mahalakshmi' },
  Saturn: { lesson: 'Patience, endurance, and accepting duty', desire: 'Structure and lasting achievement', deity: 'Vishnu (Narayana)' },
};

export default function AtmakarakaPage() {
  const { chart } = useProfileChart();

  const data = useMemo(() => {
    if (!chart) return null;
    const karakas = calculateCharaKarakas(chart);
    const ak = karakas[0];
    const karakamsha = getKarakamsha(chart);
    const akInfo = AK_LESSONS[ak.planet] ?? AK_LESSONS.Sun;
    const akInterp = getAtmakarakaInterpretation(ak.planet);
    const kkInterp = getKarakamshaInterpretation(karakamsha.rashi);
    return { karakas, ak, karakamsha, akInfo, akInterp, kkInterp };
  }, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🔱" title="Atmakaraka Calculator" description="Enter your birth details to find your soul planet and Chara Karakas." />
      <SeoIntro headingKey="seo.atmakaraka.heading" textKey="seo.atmakaraka.text" />
      {VEDIC_SEO.atmakaraka.relatedTools && <RelatedTools tools={VEDIC_SEO.atmakaraka.relatedTools} />}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">🔱 Jaimini · Atmakaraka</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Atmakaraka Calculator</h1>
        <p className="text-zinc-400 mt-1">Your soul planet and Chara Karakas by degree</p>
      </div>

      {/* Hero: Atmakaraka */}
      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-28 h-28 bg-violet-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">Your Atmakaraka (Soul Planet)</div>
          <div className="text-3xl text-white font-display font-bold">
            {PLANET_GLYPH[data.ak.planet]} {data.ak.planet}
          </div>
          <div className="text-sm text-zinc-400 mt-1">{data.ak.degreeInSign.toFixed(2)}° in sign — highest degree among 7 planets</div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/[0.03] rounded-xl p-3">
              <div className="text-xs text-zinc-500">Soul Lesson</div>
              <div className="text-zinc-200 text-sm mt-1">{data.akInfo.lesson}</div>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-3">
              <div className="text-xs text-zinc-500">Soul Desire</div>
              <div className="text-zinc-200 text-sm mt-1">{data.akInfo.desire}</div>
            </div>
            <div className="bg-white/[0.03] rounded-xl p-3">
              <div className="text-xs text-zinc-500">Ishta Devata</div>
              <div className="text-zinc-200 text-sm mt-1">{data.akInfo.deity}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed AK Interpretation */}
      {data.akInterp && (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="font-semibold text-zinc-100 text-lg mb-3">{data.ak.planet} as Atmakaraka — Detailed Meaning</h2>
          <p className="text-zinc-300 text-sm leading-relaxed">{data.akInterp}</p>
        </div>
      )}

      {/* Karakamsha */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-3">Karakamsha (AK in Navamsa)</h2>
        <div className="flex items-center gap-4">
          <div className="text-3xl text-violet-400">
            {RASHI_GLYPH[RASHI_NAMES[data.karakamsha.rashi]]} {data.karakamsha.rashiName}
          </div>
        </div>
        <p className="text-sm text-zinc-400 mt-2">Your Atmakaraka {data.ak.planet} occupies {data.karakamsha.rashiName} in the Navamsa (D9) chart.</p>
        {data.kkInterp && <p className="text-zinc-300 text-sm mt-3 leading-relaxed">{data.kkInterp}</p>}
      </div>

      {/* All 7 Chara Karakas */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">All 7 Chara Karakas</h2>
        <div className="space-y-3">
          {data.karakas.map(k => (
            <div key={k.type} className={`flex items-center justify-between rounded-xl px-4 py-3 ${k.type === 'AK' ? 'bg-violet-600/20 border border-violet-500/30' : 'bg-white/[0.03]'}`}>
              <div>
                <span className="text-violet-400 font-mono text-sm mr-2">{k.type}</span>
                <span className="text-zinc-300 text-sm">{k.fullName}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-100 font-medium">{PLANET_GLYPH[k.planet]} {k.planet}</span>
                <span className="text-zinc-500 text-xs ml-2">{k.degreeInSign.toFixed(2)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SeoIntro headingKey="seo.atmakaraka.heading" textKey="seo.atmakaraka.text" />
      {VEDIC_SEO.atmakaraka.relatedTools && <RelatedTools tools={VEDIC_SEO.atmakaraka.relatedTools} />}
    </div>
  );
}
