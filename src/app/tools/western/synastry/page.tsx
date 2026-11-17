'use client';
import { WESTERN_SEO } from '../seo';
import LocaleLink from '@/components/shared/LocaleLink';

export default function SynastryPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3"><span className="text-xs text-rose-400/40">💞 Synastry</span></div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Synastry Calculator</h1>
        <p className="text-zinc-400 mt-1">Compare two birth charts for relationship compatibility</p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <p className="text-zinc-300 text-sm mb-4">The Synastry Calculator compares two birth charts to reveal relationship dynamics. For now, use our Vedic Kundli Matching tool for a complete compatibility analysis:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LocaleLink href="/vedic/compatibility" className="glass-card rounded-xl p-4 hover:bg-white/5 transition-colors block">
            <div className="text-lg font-semibold text-violet-400">♥ Kundli Milan (Vedic)</div>
            <p className="text-zinc-400 text-sm mt-1">Ashtakoota 36-point Guna Milan for marriage compatibility</p>
          </LocaleLink>
          <LocaleLink href="/vedic/darakaraka" className="glass-card rounded-xl p-4 hover:bg-white/5 transition-colors block">
            <div className="text-lg font-semibold text-rose-400">💑 Darakaraka</div>
            <p className="text-zinc-400 text-sm mt-1">Jaimini spouse significator for partner traits</p>
          </LocaleLink>
        </div>
      </div>

      {/* Key Synastry Concepts */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="font-semibold text-zinc-100 text-lg mb-4">Key Synastry Aspects</h2>
        <div className="space-y-3">
          {[
            { aspect: 'Sun-Moon', meaning: 'Core identity meets emotional nature. Conjunction = deep understanding. Opposition = magnetic attraction.', type: 'Essential' },
            { aspect: 'Venus-Mars', meaning: 'Physical chemistry and romantic attraction. The spark that ignites passion.', type: 'Chemistry' },
            { aspect: 'Moon-Moon', meaning: 'Emotional compatibility. How you feel at home with each other.', type: 'Comfort' },
            { aspect: 'Saturn aspects', meaning: 'Longevity and commitment. Saturn contacts = staying power but also restriction.', type: 'Stability' },
            { aspect: 'Jupiter aspects', meaning: 'Growth and expansion together. Joy, generosity, shared vision.', type: 'Growth' },
            { aspect: 'Pluto aspects', meaning: 'Transformation and power dynamics. Intense, life-changing connections.', type: 'Depth' },
          ].map(a => (
            <div key={a.aspect} className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-4 py-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-600/20 text-rose-400 shrink-0">{a.type}</span>
              <div>
                <div className="text-zinc-200 text-sm font-medium">{a.aspect}</div>
                <div className="text-zinc-400 text-xs mt-0.5">{a.meaning}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{WESTERN_SEO.synastry.seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{WESTERN_SEO.synastry.seoIntro.text}</p>
      </div>
      {WESTERN_SEO.synastry.relatedTools && (
        <div className="flex flex-wrap gap-2">
          {WESTERN_SEO.synastry.relatedTools.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">{t.label}</LocaleLink>
          ))}
        </div>
      )}
    </div>
  );
}
