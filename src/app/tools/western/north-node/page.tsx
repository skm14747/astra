'use client';
import { useMemo } from 'react';
import { useProfileChart } from '@/hooks/useProfileChart';
import EmptyState from '@/components/shared/EmptyState';
import { getNorthNodeSign } from '@/lib/astronomy/asteroids';
import { WESTERN_SEO } from '../seo';
import LocaleLink from '@/components/shared/LocaleLink';

const NODE_AXIS: Record<string, { north: string; south: string }> = {
  Aries: { north: 'Developing independence, courage, self-assertion. Learning to put yourself first. Taking initiative.', south: 'Releasing people-pleasing, codependency, and excessive compromise (Libra South Node).' },
  Taurus: { north: 'Building stability, self-worth, patience. Learning to trust the material world. Finding inner peace.', south: 'Releasing crisis-addiction, intensity, and fear of loss (Scorpio South Node).' },
  Gemini: { north: 'Developing curiosity, communication, local connections. Learning through diverse experiences.', south: 'Releasing dogmatism, over-philosophizing, and preachiness (Sagittarius South Node).' },
  Cancer: { north: 'Developing emotional awareness, nurturing, home life. Learning vulnerability and belonging.', south: 'Releasing workaholism, control, and emotional suppression (Capricorn South Node).' },
  Leo: { north: 'Developing creative self-expression, joy, leadership. Learning to shine individually.', south: 'Releasing groupthink, detachment, and hiding behind causes (Aquarius South Node).' },
  Virgo: { north: 'Developing practical skills, service, health awareness. Learning discernment and useful work.', south: 'Releasing escapism, victimhood, and boundary-lessness (Pisces South Node).' },
  Libra: { north: 'Developing partnership, diplomacy, fairness. Learning to see others\' perspectives.', south: 'Releasing selfishness, impulsiveness, and lone-wolf mentality (Aries South Node).' },
  Scorpio: { north: 'Developing depth, transformation, shared resources. Learning trust and emotional intimacy.', south: 'Releasing stubbornness, material attachment, and comfort-zone clinging (Taurus South Node).' },
  Sagittarius: { north: 'Developing faith, meaning, higher education, travel. Learning the big picture.', south: 'Releasing gossip, superficiality, and scattered attention (Gemini South Node).' },
  Capricorn: { north: 'Developing ambition, discipline, public achievement. Learning responsibility and structure.', south: 'Releasing emotional dependency, family enmeshment, and hiding at home (Cancer South Node).' },
  Aquarius: { north: 'Developing community, innovation, humanitarian vision. Learning to serve the collective.', south: 'Releasing ego-centrism, drama, and need for special treatment (Leo South Node).' },
  Pisces: { north: 'Developing spiritual awareness, compassion, surrender. Learning faith and letting go.', south: 'Releasing over-analysis, perfectionism, and anxiety about details (Virgo South Node).' },
};

export default function NorthNodePage() {
  const { chart } = useProfileChart();

  const data = useMemo(() => {
    if (!chart) return null;
    const rahuLon = chart.planets.Rahu?.siderealLongitude ?? chart.planets.Rahu?.longitude ?? 0;
    const tropicalLon = rahuLon; // Already in tropical for Western interpretation
    const nn = getNorthNodeSign(tropicalLon);
    const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const southSign = SIGNS[(nn.sign + 6) % 12];
    return { ...nn, southSign, longitude: tropicalLon };
  }, [chart]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <EmptyState icon="☊" title="North Node Calculator" description="Enter your birth details to find your North Node sign." />
      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{WESTERN_SEO['north-node'].seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{WESTERN_SEO['north-node'].seoIntro.text}</p>
      </div>
    </div>
  );

  const axis = NODE_AXIS[data.signName];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-indigo-400/40">☊ North Node</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">North Node Calculator</h1>
        <p className="text-zinc-400 mt-1">Your soul&apos;s evolutionary direction</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 vedic-glow">
          <div className="text-xs text-indigo-400/80 font-medium mb-1">North Node (Growth Direction)</div>
          <div className="text-3xl text-white font-display font-bold">☊ {data.signName}</div>
          <div className="text-sm text-zinc-400 mt-1">{data.degreeInSign.toFixed(2)}°</div>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <div className="text-xs text-orange-400/80 font-medium mb-1">South Node (Comfort Zone)</div>
          <div className="text-3xl text-white font-display font-bold">☋ {data.southSign}</div>
          <div className="text-sm text-zinc-400 mt-1">Opposite the North Node</div>
        </div>
      </div>

      {axis && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-indigo-400 text-lg mb-3">☊ Grow Toward ({data.signName})</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">{axis.north}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-orange-400 text-lg mb-3">☋ Release ({data.southSign})</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">{axis.south}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{WESTERN_SEO['north-node'].seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{WESTERN_SEO['north-node'].seoIntro.text}</p>
      </div>
      {WESTERN_SEO['north-node'].relatedTools && (
        <div className="flex flex-wrap gap-2">
          {WESTERN_SEO['north-node'].relatedTools.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">{t.label}</LocaleLink>
          ))}
        </div>
      )}
    </div>
  );
}
