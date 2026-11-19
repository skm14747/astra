'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { getChiron } from '@/lib/astronomy/asteroids';
import { WESTERN_SEO } from '../seo';
import LocaleLink from '@/components/shared/LocaleLink';

const CHIRON_IN_SIGNS: Record<string, { wound: string; gift: string }> = {
  Aries: { wound: 'Identity and self-assertion. You may feel invisible or question your right to exist as yourself.', gift: 'Helping others find their courage and reclaim their identity.' },
  Taurus: { wound: 'Self-worth and material security. You may feel fundamentally undeserving of comfort and abundance.', gift: 'Teaching others to value themselves and find security within.' },
  Gemini: { wound: 'Communication and intellect. You may feel misunderstood or doubt your intelligence.', gift: 'Helping others express their truth and bridge communication gaps.' },
  Cancer: { wound: 'Family and emotional belonging. You may feel like you never had a true home or nurturing.', gift: 'Creating safe emotional spaces for others and healing family patterns.' },
  Leo: { wound: 'Creative expression and recognition. You may feel your uniqueness is unwelcome or unsafe.', gift: 'Empowering others to shine, perform, and express their creative fire.' },
  Virgo: { wound: 'Imperfection and health. You may feel fundamentally flawed or obsess over fixing yourself.', gift: 'Healing others through practical service and accepting imperfection as natural.' },
  Libra: { wound: 'Relationships and balance. You may sacrifice yourself for harmony or fear being alone.', gift: 'Mediating conflicts and teaching others healthy relationship dynamics.' },
  Scorpio: { wound: 'Power, trust, and betrayal. Deep wounds around loss, abandonment, or violation of trust.', gift: 'Profound psychological healing ability and comfort with life\'s darkest moments.' },
  Sagittarius: { wound: 'Meaning and belief. You may feel life has no purpose or that your beliefs are wrong.', gift: 'Guiding others toward authentic meaning and inclusive wisdom traditions.' },
  Capricorn: { wound: 'Achievement and authority. You may feel like a failure despite external success, or fear authority.', gift: 'Mentoring others in building lasting structures and ethical leadership.' },
  Aquarius: { wound: 'Belonging and individuality. You may feel like a permanent outsider or too different to belong.', gift: 'Creating inclusive communities where uniqueness is celebrated.' },
  Pisces: { wound: 'Spiritual connection and boundaries. You may feel spiritually abandoned or absorb others\' pain.', gift: 'Deep compassion, intuitive healing, and connecting others to the transcendent.' },
};

export default function ChironPage() {
  const { chart } = useProfileChart();
  const data = useMemo(() => chart ? getChiron(chart.birthData.date) : null, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="🏥" title="Chiron Calculator" description="Enter your birth details to find your Chiron sign." />
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{WESTERN_SEO.chiron.seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{WESTERN_SEO.chiron.seoIntro.text}</p>
      </div>
    </div>
  );

  const interp = CHIRON_IN_SIGNS[data.signName];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-teal-400/40">🏥 Chiron</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Chiron Calculator</h1>
        <p className="text-zinc-400 mt-1">The Wounded Healer in your birth chart</p>
      </div>

      <div className="glass-card rounded-2xl p-6 vedic-glow">
        <div className="text-xs text-teal-400/80 tracking-wider font-medium mb-1">Your Chiron</div>
        <div className="text-3xl text-white font-display font-bold">{data.signName}</div>
        <div className="text-sm text-zinc-400 mt-1">{data.degreeInSign.toFixed(2)}° {data.signName} (Chiron orbital period ~50.4 years)</div>
      </div>

      {interp && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-zinc-100 text-lg mb-3">The Wound</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">{interp.wound}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-zinc-100 text-lg mb-3">The Healing Gift</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">{interp.gift}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{WESTERN_SEO.chiron.seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{WESTERN_SEO.chiron.seoIntro.text}</p>
      </div>
      {WESTERN_SEO.chiron.relatedTools && (
        <div className="flex flex-wrap gap-2">
          {WESTERN_SEO.chiron.relatedTools.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">{t.label}</LocaleLink>
          ))}
        </div>
      )}
    </div>
  );
}
