'use client';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useProfile } from '@/lib/profile/context';
import { useSettings } from '@/lib/settings/context';
import { calculatePanchang } from '@/lib/vedic/panchang';
import { getFullDayHoras, type HoraPeriod } from '@/lib/vedic/muhurta';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

const DEFAULT_LOCATION = { latitude: 28.6139, longitude: 77.209, label: 'New Delhi' };

const HORA_QUALITIES: Record<string, { quality: string; suitable: string; color: string; badge: string }> = {
  Sun:     { quality: '☀️ Authority',  suitable: 'Government work, leadership, father-related matters', color: 'text-amber-400',   badge: 'bg-amber-500/15 text-amber-400 border-amber-500/25' },
  Moon:    { quality: '🌙 Public',     suitable: 'Travel, public dealing, mother, water-related work',  color: 'text-blue-300',    badge: 'bg-blue-500/15 text-blue-300 border-blue-500/25' },
  Mars:    { quality: '🔥 Courage',    suitable: 'Surgery, competition, property, courage, engineering', color: 'text-red-400',     badge: 'bg-red-500/15 text-red-400 border-red-500/25' },
  Mercury: { quality: '📊 Business',   suitable: 'Trade, communication, education, writing, accounts',  color: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' },
  Jupiter: { quality: '🙏 Auspicious', suitable: 'Education, spirituality, marriage, new ventures',     color: 'text-yellow-300',  badge: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/25' },
  Venus:   { quality: '💎 Creative',   suitable: 'Romance, art, music, luxury, creative pursuits',      color: 'text-pink-400',    badge: 'bg-pink-500/15 text-pink-400 border-pink-500/25' },
  Saturn:  { quality: '⚙️ Labor',      suitable: 'Iron/oil trade, agriculture, labor, real estate',     color: 'text-zinc-400',    badge: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25' },
};

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function HoraRow({ period, isNow, t }: { period: HoraPeriod; isNow: boolean; t: ReturnType<typeof useT> }) {
  const info = HORA_QUALITIES[period.planet] ?? HORA_QUALITIES.Sun;
  const glyph = PLANET_GLYPH[period.planet as keyof typeof PLANET_GLYPH] ?? '';

  return (
    <div className={`glass-card rounded-xl p-4 flex items-center gap-4 transition-all ${isNow ? 'vedic-glow border-violet-500/30' : ''}`}>
      <span className="text-xl w-8 text-center">{glyph}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`font-semibold ${info.color}`}>{period.planet}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${info.badge}`}>
            {info.quality}
          </span>
          {isNow && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-500/15 text-violet-400 border border-violet-500/25">
              {t('hora.now')}
            </span>
          )}
        </div>
        <div className="text-sm text-zinc-500 font-mono">
          {formatTime(period.start)} — {formatTime(period.end)}
        </div>
        <div className="text-xs text-zinc-600 mt-0.5">{info.suitable}</div>
      </div>
    </div>
  );
}

export default function HoraPage() {
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
      { timeout: 8000, maximumAge: 300_000 },
    );
  }, []);

  useEffect(() => {
    if (!activeProfile) requestGeo();
  }, [activeProfile, requestGeo]);

  const { observer, locationLabel } = useMemo(() => {
    if (activeProfile) return { observer: { latitude: activeProfile.latitude, longitude: activeProfile.longitude }, locationLabel: activeProfile.city };
    if (geoLocation) return { observer: geoLocation, locationLabel: `${geoLocation.latitude.toFixed(2)}°N, ${geoLocation.longitude.toFixed(2)}°E` };
    return { observer: { latitude: DEFAULT_LOCATION.latitude, longitude: DEFAULT_LOCATION.longitude }, locationLabel: DEFAULT_LOCATION.label };
  }, [activeProfile, geoLocation]);

  const locationSource: string = activeProfile
    ? activeProfile.city
    : geoStatus === 'granted'
      ? t('panchang.yourLocation')
      : `${DEFAULT_LOCATION.label} ${t('panchang.default')}`;

  const data = useMemo(() => {
    if (!now) return null;
    const panchang = calculatePanchang(now, observer, ayanamsaSystem);
    if (!panchang.sunrise || !panchang.sunset) return null;
    const nextDay = new Date(now.getTime() + 86400000);
    const nextPanchang = calculatePanchang(nextDay, observer, ayanamsaSystem);
    const nextSunrise = nextPanchang.sunrise ?? new Date(panchang.sunrise.getTime() + 86400000);
    const horas = getFullDayHoras(panchang.sunrise, panchang.sunset, nextSunrise, panchang.vara.index);
    const current = [...horas.day, ...horas.night].find(
      (h) => now.getTime() >= h.start.getTime() && now.getTime() < h.end.getTime(),
    );
    return { horas, sunrise: panchang.sunrise, sunset: panchang.sunset, vara: panchang.vara, current };
  }, [now, observer, ayanamsaSystem]);

  const seo = VEDIC_SEO.hora;

  const isCurrentPeriod = (period: HoraPeriod): boolean => {
    if (!now) return false;
    return now.getTime() >= period.start.getTime() && now.getTime() < period.end.getTime();
  };

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <div className="glass-card rounded-2xl p-8 text-center">
        <span className="text-4xl block mb-3">🕐</span>
        <h1 className="font-display text-2xl font-bold text-white mb-2">{t('hora.title')}</h1>
        <p className="text-zinc-400">{t('hora.subtitle')}</p>
      </div>
      <SeoIntro headingKey="seo.hora.heading" textKey="seo.hora.text" />
      {seo.relatedTools && <RelatedTools tools={seo.relatedTools} />}
    </div>
  );

  const currentInfo = data.current ? HORA_QUALITIES[data.current.planet] : null;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-amber-400/40">☉ ☽ ♂ ☿ ♃ ♀ ♄</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('hora.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('hora.subtitle')}</p>
        <p className="text-xs text-zinc-600 mt-2">
          📍 {locationSource} &nbsp;·&nbsp; ☀ {formatTime(data.sunrise)} — {formatTime(data.sunset)} &nbsp;·&nbsp; {data.vara.name}
        </p>
      </div>

      {/* Current Hora highlight */}
      {data.current && currentInfo && (
        <div className="glass-card rounded-2xl p-6 vedic-glow border-violet-500/30">
          <div className="section-title mb-3">⏰ {t('hora.currentHora')}</div>
          <div className="flex items-center gap-4">
            <span className="text-4xl">{PLANET_GLYPH[data.current.planet as keyof typeof PLANET_GLYPH]}</span>
            <div>
              <div className={`text-2xl font-bold ${currentInfo.color}`}>{data.current.planet} {t('hora.now')}</div>
              <div className="text-sm text-zinc-400 font-mono">
                {formatTime(data.current.start)} — {formatTime(data.current.end)}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{currentInfo.suitable}</div>
            </div>
          </div>
        </div>
      )}

      {/* Day & Night Horas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="section-title mb-4">☀ {t('hora.dayHoras')}</div>
          <div className="space-y-2">
            {data.horas.day.map((h, i) => (
              <HoraRow key={`day-${i}`} period={h} isNow={isCurrentPeriod(h)} t={t} />
            ))}
          </div>
        </div>
        <div>
          <div className="section-title mb-4">🌙 {t('hora.nightHoras')}</div>
          <div className="space-y-2">
            {data.horas.night.map((h, i) => (
              <HoraRow key={`night-${i}`} period={h} isNow={isCurrentPeriod(h)} t={t} />
            ))}
          </div>
        </div>
      </div>

      <SeoIntro headingKey="seo.hora.heading" textKey="seo.hora.text" />
      {seo.relatedTools && <RelatedTools tools={seo.relatedTools} />}
    </div>
  );
}
