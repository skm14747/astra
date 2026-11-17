'use client';
import { useState, useMemo } from 'react';
import { calculateDestinyNumber, calculateSoulUrge, calculatePersonality } from '@/lib/numerology/core';
import { LIFE_PATH_MEANINGS } from '@/lib/numerology/interpretations';
import { NUMEROLOGY_SEO } from '../seo';
import LocaleLink from '@/components/shared/LocaleLink';

export default function DestinyNumberPage() {
  const [name, setName] = useState('');
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    if (!calculated || !name.trim()) return null;
    const destiny = calculateDestinyNumber(name);
    const soulUrge = calculateSoulUrge(name);
    const personality = calculatePersonality(name);
    return { destiny, soulUrge, personality };
  }, [calculated, name]);

  const destinyMeaning = result ? LIFE_PATH_MEANINGS[result.destiny.number] : null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">🔢 Destiny</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Destiny Number Calculator</h1>
        <p className="text-zinc-400 mt-1">Expression Number from your full birth name</p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <label className="text-sm text-zinc-400 block mb-1">Full Birth Name (as given at birth)</label>
        <input
          type="text"
          value={name}
          onChange={e => { setName(e.target.value); setCalculated(false); }}
          placeholder="e.g. John Michael Smith"
          className="w-full max-w-md bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40"
        />
        <button onClick={() => setCalculated(true)} disabled={!name.trim()} className="mt-4 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
          Calculate
        </button>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card rounded-2xl p-5 vedic-glow text-center">
              <div className="text-xs text-violet-400/80 uppercase tracking-wider mb-1">Destiny Number</div>
              <div className="text-4xl text-white font-display font-bold">{result.destiny.number}</div>
              {destinyMeaning && <div className="text-sm text-violet-400 mt-1">{destinyMeaning.title}</div>}
            </div>
            <div className="glass-card rounded-2xl p-5 text-center">
              <div className="text-xs text-rose-400/80 uppercase tracking-wider mb-1">Soul Urge</div>
              <div className="text-4xl text-white font-display font-bold">{result.soulUrge.number}</div>
              <div className="text-xs text-zinc-500 mt-1">From vowels</div>
            </div>
            <div className="glass-card rounded-2xl p-5 text-center">
              <div className="text-xs text-amber-400/80 uppercase tracking-wider mb-1">Personality</div>
              <div className="text-4xl text-white font-display font-bold">{result.personality.number}</div>
              <div className="text-xs text-zinc-500 mt-1">From consonants</div>
            </div>
          </div>

          {/* Letter Breakdown */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-zinc-100 text-lg mb-4">Letter-by-Letter Breakdown</h2>
            <div className="flex flex-wrap gap-1">
              {result.destiny.letterBreakdown.map((l, i) => (
                <div key={i} className="w-10 h-14 flex flex-col items-center justify-center bg-white/[0.03] rounded-lg">
                  <div className="text-sm text-zinc-200 font-medium">{l.letter}</div>
                  <div className="text-xs text-violet-400">{l.value}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-zinc-400">
              Total: {result.destiny.letterBreakdown.reduce((s, l) => s + l.value, 0)} → <span className="text-violet-400 font-bold">{result.destiny.number}</span>
            </div>
          </div>

          {destinyMeaning && (
            <div className="glass-card rounded-2xl p-6">
              <h2 className="font-semibold text-zinc-100 text-lg mb-3">Destiny {result.destiny.number}: {destinyMeaning.title}</h2>
              <p className="text-zinc-300 text-sm leading-relaxed">{destinyMeaning.overview}</p>
            </div>
          )}
        </>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{NUMEROLOGY_SEO['destiny-number'].seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{NUMEROLOGY_SEO['destiny-number'].seoIntro.text}</p>
      </div>

      {NUMEROLOGY_SEO['destiny-number'].relatedTools && (
        <div className="flex flex-wrap gap-2">
          {NUMEROLOGY_SEO['destiny-number'].relatedTools!.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">{t.label}</LocaleLink>
          ))}
        </div>
      )}
    </div>
  );
}
