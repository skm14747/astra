'use client';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useProfile } from '@/lib/profile/context';
import { useSettings } from '@/lib/settings/context';
import { calculatePanchang } from '@/lib/vedic/panchang';
import { calculateChoghadiya, type ChoghadiyaPeriod } from '@/lib/vedic/muhurta';
import { PLANET_GLYPH } from '@/lib/vedic/glyphs';
import SeoIntro from '@/components/seo/SeoIntro';
import RelatedTools from '@/components/seo/RelatedTools';
import { VEDIC_SEO } from '../seo';
import { useT } from '@/lib/i18n';

const DEFAULT_LOCATION = { latitude: 28.6139, longitude: 77.209, label: 'New Delhi' };

const TYPE_STYLES: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  Amrit: { bg: 'bg-emerald-500/8', border: 'border-emerald-500/20', text: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' },
  Shubh: { bg: 'bg-green-500/8', border: 'border-green-500/20', text: 'text-green-400', badge: 'bg-green-500/15 text-green-400 border-green-500/25' },
  Labh: { bg: 'bg-teal-500/8', border: 'border-teal-500/20', text: 'text-teal-400', badge: 'bg-teal-500/15 text-teal-400 border-teal-500/25' },
  Char: { bg: 'bg-blue-500/8', border: 'border-blue-500/20', text: 'text-blue-400', badge: 'bg-blue-500/15 text-blue-400 border-blue-500/25' },
  Udveg: { bg: 'bg-red-500/8', border: 'border-red-500/20', text: 'text-red-400', badge: 'bg-red-500/15 text-red-400 border-red-500/25' },
  Kaal: { bg: 'bg-zinc-500/8', border: 'border-zinc-500/20', text: 'text-zinc-400', badge: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25' },
  Rog: { bg: 'bg-orange-500/8', border: 'border-orange-500/20', text: 'text-orange-400', badge: 'bg-orange-500/15 text-orange-400 border-orange-500/25' },
};

function formatTime(d: Date): string {
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function ChoghadiyaRow({ period, isNow, t }: { period: ChoghadiyaPeriod; isNow: boolean; t: ReturnType<typeof useT> }) {
  const style = TYPE_STYLES[period.type] ?? TYPE_STYLES.Kaal;
  const planetGlyph = PLANET_GLYPH[period.ruler as keyof typeof PLANET_GLYPH] ?? '';
  const typeKey = `choghadiya.${period.type.toLowerCase()}` as Parameters<typeof t>[0];
  const typeLabel = t(typeKey) !== typeKey ? t(typeKey) : period.type;

  return (
    <div className={`glass-card rounded-xl p-4 flex items-center gap-4 transition-all ${isNow ? `vedic-glow ${style.border}` : ''}`}>
      <span className="text-xl w-8 text-center">{planetGlyph}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={`font-semibold ${style.text}`}>{typeLabel}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${style.badge}`}>
            {period.ruler}
          </span>
          {isNow && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-violet-500/15 text-violet-400 border border-violet-500/25">
              {t('common.now')}
            </span>
          )}
        </div>
        <div className="text-sm text-zinc-500 font-mono">
          {formatTime(period.start)} — {formatTime(period.end)}
        </div>
      </div>
      <span className={`w-2 h-2 rounded-full ${period.isAuspicious ? 'bg-green-400' : 'bg-red-400'}`} />
    </div>
  );
}

export default function ChoghadiyaPage() {
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
    const choghadiya = calculateChoghadiya(panchang.sunrise, panchang.sunset, nextSunrise, panchang.vara.index);
    return { choghadiya, sunrise: panchang.sunrise, sunset: panchang.sunset, vara: panchang.vara };
  }, [now, observer, ayanamsaSystem]);

  const seo = VEDIC_SEO.choghadiya;

  const isCurrentPeriod = (period: ChoghadiyaPeriod): boolean => {
    if (!now) return false;
    return now.getTime() >= period.start.getTime() && now.getTime() < period.end.getTime();
  };

  if (!data) return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-8">
      <div className="glass-card rounded-2xl p-8 text-center">
        <span className="text-4xl block mb-3">🕐</span>
        <h1 className="font-display text-2xl font-bold text-white mb-2">{t('choghadiya.title')}</h1>
        <p className="text-zinc-400">{t('choghadiya.subtitle')}</p>
      </div>
      <SeoIntro headingKey="seo.choghadiya.heading" textKey="seo.choghadiya.text" />
      {seo.relatedTools && <RelatedTools tools={seo.relatedTools} />}
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-8">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-amber-400/40">🕐 ☀ ☽</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('choghadiya.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('choghadiya.subtitle')}</p>
        <p className="text-xs text-zinc-600 mt-2">
          📍 {locationSource} &nbsp;·&nbsp; ☀ {formatTime(data.sunrise)} — {formatTime(data.sunset)} &nbsp;·&nbsp; {data.vara.name}
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        <span className="flex items-center gap-1.5 text-xs text-zinc-500"><span className="w-2 h-2 rounded-full bg-green-400" /> {t('common.auspicious')}</span>
        <span className="flex items-center gap-1.5 text-xs text-zinc-500"><span className="w-2 h-2 rounded-full bg-red-400" /> {t('common.inauspicious')}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Day Choghadiya */}
        <div>
          <div className="section-title mb-4">☀ {t('choghadiya.day')}</div>
          <div className="space-y-2">
            {data.choghadiya.day.map((p, i) => (
              <ChoghadiyaRow key={`day-${i}`} period={p} isNow={isCurrentPeriod(p)} t={t} />
            ))}
          </div>
        </div>

        {/* Night Choghadiya */}
        <div>
          <div className="section-title mb-4">🌙 {t('choghadiya.night')}</div>
          <div className="space-y-2">
            {data.choghadiya.night.map((p, i) => (
              <ChoghadiyaRow key={`night-${i}`} period={p} isNow={isCurrentPeriod(p)} t={t} />
            ))}
          </div>
        </div>
      </div>

      <SeoIntro headingKey="seo.choghadiya.heading" textKey="seo.choghadiya.text" />
      {seo.relatedTools && <RelatedTools tools={seo.relatedTools} />}
    </div>
  );
}
