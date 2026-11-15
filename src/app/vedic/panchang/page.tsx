'use client';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useProfile } from '@/lib/profile/context';
import { useSettings } from '@/lib/settings/context';
import { calculatePanchang } from '@/lib/vedic/panchang';
import { getAllMuhurtas } from '@/lib/vedic/muhurta';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

const DEFAULT_LOCATION = { latitude: 28.6139, longitude: 77.209, label: 'New Delhi' };

const MOON_PHASES = [
  '🌑','🌒','🌒','🌒','🌓','🌓','🌔','🌔',
  '🌕','🌕','🌖','🌖','🌗','🌗','🌘','🌘',
  '🌑','🌒','🌒','🌒','🌓','🌓','🌔','🌔',
  '🌕','🌕','🌖','🌖','🌗','🌗','🌘',
];

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(start: Date, end: Date): string {
  const diffMs = end.getTime() - start.getTime();
  const h = Math.floor(diffMs / 3600000);
  const m = Math.floor((diffMs % 3600000) / 60000);
  return `${h}h ${m}m`;
}

export default function PanchangPage() {
  const { activeProfile } = useProfile();
  const { ayanamsaSystem } = useSettings();
  const t = useT();

  const [now, setNow] = useState<Date | null>(null);
  const [geoLocation, setGeoLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<'idle' | 'granted' | 'denied'>('idle');

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const requestGeo = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeoStatus('denied');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setGeoStatus('granted');
      },
      () => setGeoStatus('denied'),
      { timeout: 8000, maximumAge: 300_000 }
    );
  }, []);

  useEffect(() => {
    if (!activeProfile) requestGeo();
  }, [activeProfile, requestGeo]);

  const { observer, locationLabel } = useMemo(() => {
    if (activeProfile) {
      return {
        observer: { latitude: activeProfile.latitude, longitude: activeProfile.longitude },
        locationLabel: activeProfile.city,
      };
    }
    if (geoLocation) {
      return {
        observer: geoLocation,
        locationLabel: `${geoLocation.latitude.toFixed(2)}°N, ${geoLocation.longitude.toFixed(2)}°E`,
      };
    }
    return {
      observer: { latitude: DEFAULT_LOCATION.latitude, longitude: DEFAULT_LOCATION.longitude },
      locationLabel: DEFAULT_LOCATION.label,
    };
  }, [activeProfile, geoLocation]);

  const locationSource: string = activeProfile
    ? activeProfile.city
    : geoStatus === 'granted'
      ? t('panchang.yourLocation')
      : `${DEFAULT_LOCATION.label} ${t('panchang.default')}`;

  const { panchang, muhurtas } = useMemo(() => {
    if (!now) return { panchang: null, muhurtas: [] as ReturnType<typeof getAllMuhurtas> };
    const p = calculatePanchang(now, observer, ayanamsaSystem);
    let m: ReturnType<typeof getAllMuhurtas> = [];
    if (p.sunrise && p.sunset) {
      const prevSunset = new Date(p.sunrise.getTime() - 12 * 3600000);
      m = getAllMuhurtas(p.sunrise, p.sunset, prevSunset, p.vara.index);
    }
    return { panchang: p, muhurtas: m };
  }, [now, observer, ayanamsaSystem]);

  if (!panchang || !now) {
    return (
      <article className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">☽ ☉ ✦</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('panchang.title')}</h1>
        <p className="text-zinc-400 mt-2">{t('panchang.loading')}</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3" aria-label="Loading panchang data">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-5 h-24 animate-pulse-subtle" />
          ))}
        </div>
      </article>
    );
  }

  const moonPhase = MOON_PHASES[panchang.tithi.index] || '🌙';
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const dayProgress = panchang.sunrise && panchang.sunset
    ? Math.max(0, Math.min(100, ((now.getTime() - panchang.sunrise.getTime()) / (panchang.sunset.getTime() - panchang.sunrise.getTime())) * 100))
    : 50;
  const isDaytime = dayProgress > 0 && dayProgress < 100;
  const dayLength = panchang.sunrise && panchang.sunset ? formatDuration(panchang.sunrise, panchang.sunset) : '';

  return (
    <article className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-10">

      {/* ── Header ── */}
      <section aria-labelledby="panchang-heading">
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">☽ ☉ ✦</span>
        </div>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 id="panchang-heading" className="font-display text-3xl sm:text-4xl font-bold text-white">{t('panchang.title')}</h1>
            <p className="text-zinc-400 mt-1">{dateStr}</p>
            <p className="text-xs text-zinc-500 mt-1">
              {locationSource} · {locationLabel}
              {geoStatus === 'denied' && !activeProfile && (
                <button onClick={requestGeo} className="ml-2 text-violet-400 hover:text-violet-300 hover:underline transition">
                  {t('panchang.allowLocation')}
                </button>
              )}
            </p>
          </div>
          <div className="text-right">
            <span className="font-mono text-sm text-zinc-400">{timeStr}</span>
            <div className="text-3xl mt-1">{moonPhase}</div>
          </div>
        </div>
      </section>

      {/* ── Sunrise / Sunset Bar ── */}
      {panchang.sunrise && panchang.sunset && (
        <div className="glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌅</span>
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{t('panchang.sunrise')}</div>
                <div className="text-lg text-white font-semibold font-mono">{formatTime(panchang.sunrise)}</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                {isDaytime ? t('panchang.dayLength') : t('panchang.night')}
              </div>
              <div className="text-sm text-zinc-300 font-mono">{dayLength}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{t('panchang.sunset')}</div>
                <div className="text-lg text-white font-semibold font-mono">{formatTime(panchang.sunset)}</div>
              </div>
              <span className="text-2xl">🌇</span>
            </div>
          </div>
          {/* Sun progress bar */}
          <div className="relative h-2 rounded-full bg-white/[0.04] overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
              style={{
                width: `${dayProgress}%`,
                background: isDaytime
                  ? 'linear-gradient(90deg, #f59e0b, #f0c45a, #fbbf24)'
                  : 'linear-gradient(90deg, #312e81, #4338ca)',
              }}
            />
            {isDaytime && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-yellow-300 shadow-[0_0_12px_rgba(250,204,21,0.7)] transition-all duration-1000"
                style={{ left: `calc(${dayProgress}% - 7px)` }}
              />
            )}
          </div>
        </div>
      )}

      {/* ── Core Five (Panchangam) ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="section-title">{t('panchang.section.panchangam')}</span>
          <span className="text-[10px] text-zinc-600">{t('panchang.section.panchangam.sub')}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tithi — hero card */}
          <div className="glass-card rounded-2xl p-5 sm:col-span-2 lg:col-span-1 vedic-glow relative overflow-hidden">
            <div className="absolute top-4 right-4 text-4xl opacity-30">{moonPhase}</div>
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('panchang.tithi')}</div>
            <div className="text-xl text-white font-display font-bold">{panchang.tithi.name}</div>
            <div className="flex items-center gap-2 mt-2 text-sm text-zinc-400">
              <span className="planet-badge">{panchang.tithi.paksha}</span>
              <span>{t('panchang.tithi')} {panchang.tithi.number} {t('common.of')} 15</span>
            </div>
          </div>

          {/* Nakshatra */}
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('panchang.nakshatra')}</div>
            <div className="text-lg text-white font-display font-bold">{panchang.nakshatra.name}</div>
            <div className="flex items-center gap-2 mt-2 text-sm text-zinc-400">
              <span className="planet-badge">{t('panchang.pada')} {panchang.nakshatra.pada}</span>
              <span>{t('common.lord')}: {panchang.nakshatra.lord}</span>
            </div>
          </div>

          {/* Yoga */}
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('panchang.yoga')}</div>
            <div className="text-lg text-white font-display font-bold">{panchang.yoga.name}</div>
            <div className="text-xs text-zinc-500 mt-2">{t('panchang.yoga')} #{panchang.yoga.index + 1} {t('common.of')} 27</div>
          </div>

          {/* Karana */}
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('panchang.karana')}</div>
            <div className="text-lg text-white font-display font-bold">{panchang.karana.name}</div>
            <div className="text-xs text-zinc-500 mt-2">{t('panchang.karana')} #{panchang.karana.index + 1} {t('common.of')} 60</div>
          </div>

          {/* Vara */}
          <div className="glass-card rounded-2xl p-5">
            <div className="text-xs text-violet-400/80 uppercase tracking-wider font-medium mb-1">{t('panchang.vara')}</div>
            <div className="text-lg text-white font-display font-bold">{panchang.vara.name}</div>
            <div className="text-xs text-zinc-500 mt-2">{t('panchang.vara')} #{panchang.vara.index + 1}</div>
          </div>
        </div>
      </div>

      {/* ── Hindu Calendar ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="section-title">{t('panchang.section.calendar')}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: t('panchang.paksha'), value: panchang.paksha },
            { label: t('panchang.masa'), value: `${panchang.masa.name}${panchang.masa.isAdhika ? ' (Adhika)' : ''}` },
            { label: t('panchang.samvatsara'), value: panchang.samvat.samvatsara, sub: `Shaka ${panchang.samvat.shaka}` },
            { label: t('panchang.ayana'), value: panchang.ayana },
            { label: t('panchang.ritu'), value: panchang.ritu },
          ].map(item => (
            <div key={item.label} className="glass-card rounded-xl p-4">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-medium mb-1">{item.label}</div>
              <div className="text-sm font-semibold text-zinc-100">{item.value}</div>
              {item.sub && <div className="text-[10px] text-zinc-500 mt-1">{item.sub}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Muhurta Timings ── */}
      {muhurtas.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="section-title">{t('panchang.section.muhurta')}</span>
            <span className="text-[10px] text-zinc-600">{t('panchang.section.muhurta.sub', { n: muhurtas.filter(m => m.isAuspicious).length })}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {muhurtas.map((m, i) => {
              const isNow = now >= m.start && now < m.end;
              return (
                <div
                  key={i}
                  className={`glass-card rounded-xl px-4 py-3 flex justify-between items-center transition-all ${
                    isNow ? 'vedic-glow ring-1 ring-violet-500/30' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${m.isAuspicious ? 'bg-emerald-400' : 'bg-red-400/80'}`} />
                    <span className={`font-medium text-sm ${isNow ? 'text-white' : 'text-zinc-300'}`}>{m.name}</span>
                    {isNow && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                        {t('common.now')}
                      </span>
                    )}
                  </div>
                  <span className={`text-sm font-mono ${isNow ? 'text-zinc-200' : 'text-zinc-500'}`}>
                    {formatTime(m.start)} — {formatTime(m.end)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <SeoIntro headingKey="seo.panchang.heading" textKey="seo.panchang.text" />
      {VEDIC_SEO.panchang.relatedTools && <RelatedTools tools={VEDIC_SEO.panchang.relatedTools} />}
    </article>
  );
}
