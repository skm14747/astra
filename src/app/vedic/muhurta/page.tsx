'use client';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useProfile } from '@/lib/profile/context';
import { useSettings } from '@/lib/settings/context';
import { getSunrise, getSunset } from '@/lib/astronomy/engine';
import { getAllMuhurtas, getCurrentHora, isAmritSiddhiYoga, isRaviPushyaYoga, isGuruPushyaYoga } from '@/lib/vedic/muhurta';
import { calculatePanchang } from '@/lib/vedic/panchang';
import SeoIntro from '@/components/seo/SeoIntro';

const DEFAULT_LOCATION = { latitude: 28.6139, longitude: 77.209, label: 'New Delhi' };

function fmt(d: Date): string { return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }); }

export default function MuhurtaPage() {
  const { activeProfile } = useProfile();
  const { ayanamsaSystem } = useSettings();

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
      ? 'Your location'
      : `${DEFAULT_LOCATION.label} (default)`;

  const data = useMemo(() => {
    if (!now) return null;
    const sunrise = getSunrise(now, observer);
    const sunset = getSunset(now, observer);
    if (!sunrise || !sunset) return null;
    const prevSunset = new Date(sunrise.getTime() - 12 * 3600000);
    const panchang = calculatePanchang(now, observer, ayanamsaSystem);
    const vara = panchang.vara.index;
    const muhurtas = getAllMuhurtas(sunrise, sunset, prevSunset, vara);
    const hora = getCurrentHora(sunrise, now, vara);
    const specials: string[] = [];
    const nak = panchang.nakshatra.index;
    if (isAmritSiddhiYoga(vara, nak)) specials.push('Amrit Siddhi Yoga');
    if (isRaviPushyaYoga(vara, nak)) specials.push('Ravi Pushya Yoga');
    if (isGuruPushyaYoga(vara, nak)) specials.push('Guru Pushya Yoga');
    return { muhurtas, hora, specials };
  }, [now, observer, ayanamsaSystem]);

  if (!data || !now) {
    return (
      <article className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">⏰ ☉ ☽</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Muhurta Finder</h1>
        <p className="text-zinc-400 mt-2">Loading auspicious timing data…</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2" aria-label="Loading muhurta slots">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card rounded-xl h-12 animate-pulse-subtle" />
          ))}
        </div>
      </article>
    );
  }

  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const auspiciousCount = data.muhurtas.filter(m => m.isAuspicious).length;

  return (
    <article className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <section aria-labelledby="muhurta-heading">
        <div className="zodiac-divider mb-4">
          <span className="text-xs text-violet-400/40">⏰ ☉ ☽</span>
        </div>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 id="muhurta-heading" className="font-display text-3xl sm:text-4xl font-bold text-white">Muhurta Finder</h1>
            <p className="text-zinc-400 mt-1">{dateStr}</p>
            <p className="text-xs text-zinc-500 mt-1">
              {locationSource} · {locationLabel}
              {geoStatus === 'denied' && !activeProfile && (
                <button onClick={requestGeo} className="ml-2 text-violet-400 hover:text-violet-300 hover:underline transition">
                  Allow location
                </button>
              )}
            </p>
          </div>
          <span className="font-mono text-sm text-zinc-400">{timeStr}</span>
        </div>
      </section>

      {/* Hora + Special Yogas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.hora && (
          <div className="glass-card rounded-2xl p-5 vedic-glow relative overflow-hidden">
            <div className="cosmic-orb w-20 h-20 bg-violet-600/8 -top-6 -right-6" />
            <div className="relative z-10">
              <div className="section-title mb-2">Current Hora</div>
              <p className="text-xl text-white font-display font-bold">{data.hora.planet}</p>
              <p className="text-xs text-zinc-500 mt-1">Hora #{data.hora.horaNumber} of 24</p>
            </div>
          </div>
        )}
        {data.specials.length > 0 && (
          <div className="glass-card rounded-2xl p-5 vedic-glow">
            <div className="section-title mb-3">Special Yogas Active</div>
            <div className="flex flex-wrap gap-2">
              {data.specials.map(s => (
                <span key={s} className="px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Muhurta Timings */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="section-title">Muhurta Timings</span>
          <span className="text-[10px] text-zinc-600">— {auspiciousCount} auspicious today</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.muhurtas.map((m, i) => {
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
                      NOW
                    </span>
                  )}
                </div>
                <span className={`text-sm font-mono ${isNow ? 'text-zinc-200' : 'text-zinc-500'}`}>
                  {fmt(m.start)} — {fmt(m.end)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <SeoIntro heading="What is Muhurta?" text="Muhurta (Electional Astrology) is the science of choosing the most auspicious moment to begin an important activity. Vedic Muhurta considers the Tithi, Nakshatra, Yoga, Karana, Vara, and planetary positions to find windows of maximal cosmic support." />
    </article>
  );
}
