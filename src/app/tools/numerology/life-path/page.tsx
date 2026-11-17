'use client';
import { useState, useMemo } from 'react';
import { calculateLifePath } from '@/lib/numerology/core';
import { LIFE_PATH_MEANINGS } from '@/lib/numerology/interpretations';
import { NUMEROLOGY_SEO } from '../seo';
import LocaleLink from '@/components/shared/LocaleLink';

export default function LifePathPage() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    if (!calculated || !day || !month || !year) return null;
    const d = parseInt(day, 10), m = parseInt(month, 10), y = parseInt(year, 10);
    if (isNaN(d) || isNaN(m) || isNaN(y) || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900) return null;
    return calculateLifePath(d, m, y);
  }, [calculated, day, month, year]);

  const meaning = result ? LIFE_PATH_MEANINGS[result.number] : null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-emerald-400/40">🔢 Life Path</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Life Path Number Calculator</h1>
        <p className="text-zinc-400 mt-1">Discover your life purpose from your date of birth</p>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <div className="grid grid-cols-3 gap-3 max-w-md">
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Day</label>
            <input type="number" min="1" max="31" value={day} onChange={e => { setDay(e.target.value); setCalculated(false); }} placeholder="DD" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
          </div>
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Month</label>
            <input type="number" min="1" max="12" value={month} onChange={e => { setMonth(e.target.value); setCalculated(false); }} placeholder="MM" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
          </div>
          <div>
            <label className="text-sm text-zinc-400 block mb-1">Year</label>
            <input type="number" min="1900" max="2030" value={year} onChange={e => { setYear(e.target.value); setCalculated(false); }} placeholder="YYYY" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40" />
          </div>
        </div>
        <button onClick={() => setCalculated(true)} disabled={!day || !month || !year} className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
          Calculate Life Path
        </button>
      </div>

      {result && meaning && (
        <>
          <div className="glass-card rounded-2xl p-6 vedic-glow">
            <div className="text-xs text-emerald-400/80 uppercase tracking-wider font-medium mb-1">Your Life Path Number</div>
            <div className="text-4xl text-white font-display font-bold">{result.number}</div>
            <div className="text-lg text-emerald-400 mt-1">{meaning.title}</div>
            <div className="text-xs text-zinc-500 mt-2">
              Month ({result.monthReduced}) + Day ({result.dayReduced}) + Year ({result.yearReduced}) = {result.monthReduced + result.dayReduced + result.yearReduced} → {result.number}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-zinc-100 text-lg mb-3">Life Path {result.number} — {meaning.title}</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">{meaning.overview}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="bg-white/[0.03] rounded-xl p-3">
                <div className="text-xs text-emerald-400 uppercase mb-1">Strengths</div>
                <ul className="text-zinc-300 text-sm space-y-1">{meaning.strengths.map(s => <li key={s}>• {s}</li>)}</ul>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-3">
                <div className="text-xs text-amber-400 uppercase mb-1">Challenges</div>
                <ul className="text-zinc-300 text-sm space-y-1">{meaning.challenges.map(c => <li key={c}>• {c}</li>)}</ul>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-3">
                <div className="text-xs text-cyan-400 uppercase mb-1">Best Careers</div>
                <ul className="text-zinc-300 text-sm space-y-1">{meaning.careers.map(c => <li key={c}>• {c}</li>)}</ul>
              </div>
            </div>
          </div>

          {/* All Life Path meanings reference */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-semibold text-zinc-100 text-lg mb-4">All Life Path Numbers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(LIFE_PATH_MEANINGS).map(([num, m]) => (
                <div key={num} className={`bg-white/[0.03] rounded-xl p-3 ${String(result.number) === num ? 'ring-2 ring-emerald-500/40' : ''}`}>
                  <div className="text-lg font-bold text-emerald-400">{num}</div>
                  <div className="text-sm text-zinc-300">{m.title}</div>
                  <div className="text-xs text-zinc-500 mt-1">{m.keywords.slice(0, 2).join(', ')}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-zinc-100">{NUMEROLOGY_SEO['life-path'].seoIntro.heading}</h2>
        <p className="text-zinc-400 text-sm leading-relaxed">{NUMEROLOGY_SEO['life-path'].seoIntro.text}</p>
      </div>

      {NUMEROLOGY_SEO['life-path'].relatedTools && (
        <div className="flex flex-wrap gap-2">
          {NUMEROLOGY_SEO['life-path'].relatedTools!.map(t => (
            <LocaleLink key={t.href} href={t.href} className="text-sm text-violet-400 hover:text-violet-300 bg-violet-600/10 rounded-lg px-3 py-1.5 transition-colors">{t.label}</LocaleLink>
          ))}
        </div>
      )}
    </div>
  );
}
