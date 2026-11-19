'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { getMeanLilith } from '@/lib/astronomy/asteroids';
import { WESTERN_SEO } from '../seo';
import LocaleLink from '@/components/shared/LocaleLink';

const LILITH_IN_SIGNS: Record<string, string> = {
  Aries: 'Lilith in Aries: Your shadow self is fiercely independent, competitive, and refuses to be tamed. You may suppress your anger or assertiveness to appear "nice." Reclaiming your Lilith means owning your right to take up space, fight for yourself, and lead without apology.',
  Taurus: 'Lilith in Taurus: Your shadow revolves around material security, sensuality, and self-worth. You may feel shame around money, body image, or pleasure. Reclaiming your Lilith means embracing your physical desires without guilt and knowing your worth isn\'t negotiable.',
  Gemini: 'Lilith in Gemini: Your shadow lies in communication — the things you dare not say, forbidden knowledge, and intellectual rebellion. You may suppress your true opinions to fit in. Reclaiming your Lilith means speaking uncomfortable truths and trusting your mind.',
  Cancer: 'Lilith in Cancer: Your shadow is connected to family, motherhood, and emotional security. You may have a complicated relationship with nurturing — either suppressing your needs or over-giving. Reclaiming Lilith means setting emotional boundaries without guilt.',
  Leo: 'Lilith in Leo: Your shadow craves recognition, creative expression, and center stage. You may suppress your desire for attention or feel shame about wanting to be special. Reclaiming Lilith means stepping into the spotlight and owning your creative power.',
  Virgo: 'Lilith in Virgo: Your shadow is perfectionism, shame about the body, and the compulsion to serve. You may suppress your own needs by constantly fixing others. Reclaiming Lilith means accepting imperfection and claiming your right to rest and pleasure.',
  Libra: 'Lilith in Libra: Your shadow lies in relationships — the power dynamics you suppress to maintain harmony. You may lose yourself in partnerships or avoid conflict at all costs. Reclaiming Lilith means asserting your needs in relationships even when it disrupts peace.',
  Scorpio: 'Lilith in Scorpio: Your shadow is intense — sex, death, power, and transformation. This is Lilith\'s most powerful placement. You may suppress your depth, intensity, or psychic awareness. Reclaiming Lilith means embracing your power to transform and your comfort with darkness.',
  Sagittarius: 'Lilith in Sagittarius: Your shadow is wild freedom, philosophical rebellion, and the refusal to be boxed in. You may suppress your adventurous spirit or unconventional beliefs. Reclaiming Lilith means living by your own moral code and exploring without limits.',
  Capricorn: 'Lilith in Capricorn: Your shadow revolves around ambition, authority, and control. You may suppress your desire for power or feel shame about your ambition. Reclaiming Lilith means owning your authority, building your empire, and refusing to play small.',
  Aquarius: 'Lilith in Aquarius: Your shadow is the outsider — the part of you that is too weird, too different, too ahead of its time. You may suppress your uniqueness to belong. Reclaiming Lilith means being unapologetically yourself, even if it alienates the mainstream.',
  Pisces: 'Lilith in Pisces: Your shadow is the mystic, the martyr, and the boundary-dissolver. You may suppress your spiritual gifts or escape into fantasy/addiction. Reclaiming Lilith means trusting your intuition, setting psychic boundaries, and channeling your sensitivity into art or healing.',
};

export default function LilithPage() {
  const { chart } = useProfileChart();

  const data = useMemo(() => {
    if (!chart) return null;
    const birthDate = chart.birthData.date;
    return getMeanLilith(birthDate);
  }, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🌑" title="Black Moon Lilith Calculator" description="Enter your birth details to find your Lilith sign." />
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{WESTERN_SEO.lilith.seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{WESTERN_SEO.lilith.seoIntro.text}</p>
      </div>
      {WESTERN_SEO.lilith.relatedTools && (
        <div className="flex flex-wrap gap-2 mt-6">
          {WESTERN_SEO.lilith.relatedTools.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">{t.label}</LocaleLink>
          ))}
        </div>
      )}
    </div>
  );

  const interp = LILITH_IN_SIGNS[data.signName] ?? '';

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-purple-400/40">🌑 Black Moon Lilith</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Black Moon Lilith Calculator</h1>
        <p className="text-zinc-400 mt-1">Your shadow self and hidden desires</p>
      </div>

      <div className="glass-card rounded-2xl p-6 vedic-glow relative overflow-hidden">
        <div className="cosmic-orb w-28 h-28 bg-purple-600/8 -top-8 -right-8" />
        <div className="relative z-10">
          <div className="text-xs text-purple-400/80 tracking-wider font-medium mb-1">Your Black Moon Lilith</div>
          <div className="text-3xl text-white font-display font-bold">{data.signName}</div>
          <div className="text-sm text-zinc-400 mt-1">{data.degreeInSign.toFixed(2)}° {data.signName} (tropical longitude {data.longitude.toFixed(2)}°)</div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-3">Lilith in {data.signName}</h2>
        <p className="text-zinc-300 text-sm leading-relaxed">{interp}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{WESTERN_SEO.lilith.seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{WESTERN_SEO.lilith.seoIntro.text}</p>
      </div>

      {WESTERN_SEO.lilith.relatedTools && (
        <div className="flex flex-wrap gap-2">
          {WESTERN_SEO.lilith.relatedTools.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">{t.label}</LocaleLink>
          ))}
        </div>
      )}
    </div>
  );
}
