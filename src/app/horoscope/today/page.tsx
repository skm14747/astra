'use client';
import { useMemo, useState, useEffect } from 'react';
import { useSettings } from '@/lib/settings/context';
import { generateDailyHoroscopes, type DailyPrediction } from '@/lib/vedic/daily-horoscope';
import { RASHI_GLYPH } from '@/lib/vedic/glyphs';
import { RASHI_NAMES } from '@/lib/vedic/constants';
import SeoIntro from '@/components/seo/SeoIntro';
import { useT } from '@/lib/i18n';

const INTENSITY_LABELS = ['', '★', '★★', '★★★', '★★★★', '★★★★★'];
const INTENSITY_COLORS = ['', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-emerald-400', 'text-green-400'];

function SignCard({ p, isOpen, toggle, t }: { p: DailyPrediction; isOpen: boolean; toggle: () => void; t: ReturnType<typeof useT> }) {
  const glyph = RASHI_GLYPH[p.rashiName as keyof typeof RASHI_GLYPH] ?? '';

  return (
    <div className="glass-card rounded-2xl overflow-hidden transition-colors">
      <button
        onClick={toggle}
        className="w-full p-5 flex items-center gap-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-3xl">{glyph}</span>
        <div className="flex-1 min-w-0">
          <div className="font-display text-lg font-semibold text-white">
            {p.rashiName} <span className="text-zinc-500 text-sm font-normal">({p.rashiSanskrit})</span>
          </div>
          <div className="text-sm text-zinc-500 line-clamp-1">{p.overview}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-sm ${INTENSITY_COLORS[p.intensity]}`}>{INTENSITY_LABELS[p.intensity]}</span>
          <span className="text-xs text-zinc-600">{p.luckyNumber} · {p.luckyColor}</span>
        </div>
        <svg
          className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/[0.04]">
          {/* Overview */}
          <div className="pt-4">
            <div className="section-title mb-2">📋 {t('horoscope.overview')}</div>
            <p className="text-sm text-zinc-300 leading-relaxed">{p.overview}</p>
          </div>

          {/* Career */}
          <div>
            <div className="section-title mb-2">💼 {t('horoscope.career')}</div>
            <p className="text-sm text-zinc-300 leading-relaxed">{p.career}</p>
          </div>

          {/* Love */}
          <div>
            <div className="section-title mb-2">💕 {t('horoscope.love')}</div>
            <p className="text-sm text-zinc-300 leading-relaxed">{p.love}</p>
          </div>

          {/* Health */}
          <div>
            <div className="section-title mb-2">🏥 {t('horoscope.health')}</div>
            <p className="text-sm text-zinc-300 leading-relaxed">{p.health}</p>
          </div>

          {/* Lucky info */}
          <div className="flex gap-6 pt-2">
            <div>
              <span className="text-xs text-zinc-600">{t('horoscope.luckyNumber')}</span>
              <div className="text-lg font-bold text-amber-400">{p.luckyNumber}</div>
            </div>
            <div>
              <span className="text-xs text-zinc-600">{t('horoscope.luckyColor')}</span>
              <div className="text-lg font-bold text-pink-400">{p.luckyColor}</div>
            </div>
            <div>
              <span className="text-xs text-zinc-600">{t('horoscope.intensity')}</span>
              <div className={`text-lg ${INTENSITY_COLORS[p.intensity]}`}>{INTENSITY_LABELS[p.intensity]}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DailyHoroscopePage() {
  const { ayanamsaSystem } = useSettings();
  const t = useT();

  const [now, setNow] = useState<Date | null>(null);
  const [openSign, setOpenSign] = useState<number | null>(null);

  useEffect(() => { setNow(new Date()); }, []);

  const data = useMemo(() => {
    if (!now) return null;
    return generateDailyHoroscopes(now, ayanamsaSystem);
  }, [now, ayanamsaSystem]);

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <div className="glass-card rounded-2xl p-8 text-center">
        <span className="text-4xl block mb-3">🔮</span>
        <h1 className="font-display text-2xl font-bold text-white mb-2">{t('horoscope.title')}</h1>
        <p className="text-zinc-400">{t('horoscope.subtitle')}</p>
      </div>
      <SeoIntro headingKey="seo.horoscope.heading" textKey="seo.horoscope.text" />
    </div>
  );

  const dateStr = now!.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-amber-400/40">♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('horoscope.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('horoscope.subtitle')}</p>
        <p className="text-xs text-zinc-600 mt-2">
          📅 {dateStr} &nbsp;·&nbsp; {t('horoscope.moonTransit')}: <span className="text-violet-400">{data.moonRashi}</span>
        </p>
      </div>

      {/* Quick nav — all 12 signs as pills */}
      <div className="flex flex-wrap gap-2">
        {data.predictions.map((p) => {
          const glyph = RASHI_GLYPH[p.rashiName as keyof typeof RASHI_GLYPH] ?? '';
          return (
            <button
              key={p.rashi}
              onClick={() => {
                setOpenSign(openSign === p.rashi ? null : p.rashi);
                document.getElementById(`rashi-${p.rashi}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors border ${
                openSign === p.rashi
                  ? 'bg-violet-500/15 text-violet-400 border-violet-500/30'
                  : 'glass-card text-zinc-400 hover:text-white border-transparent'
              }`}
            >
              {glyph} {p.rashiName}
            </button>
          );
        })}
      </div>

      {/* Sign cards */}
      <div className="space-y-3">
        {data.predictions.map((p) => (
          <div key={p.rashi} id={`rashi-${p.rashi}`}>
            <SignCard
              p={p}
              isOpen={openSign === p.rashi}
              toggle={() => setOpenSign(openSign === p.rashi ? null : p.rashi)}
              t={t}
            />
          </div>
        ))}
      </div>

      <SeoIntro headingKey="seo.horoscope.heading" textKey="seo.horoscope.text" />
    </div>
  );
}
