'use client';
import { useState } from 'react';
import CitySearch from './CitySearch';
import { useProfile } from '@/lib/profile/context';
import { useT } from '@/lib/i18n';
import type { BirthProfile } from '@/lib/profile/types';

interface Props {
  open: boolean;
  onClose: () => void;
  editProfile?: BirthProfile | null;
}

export default function ProfileModal({ open, onClose, editProfile }: Props) {
  const { addProfile, updateProfile } = useProfile();
  const t = useT();
  const [name, setName] = useState(editProfile?.name ?? '');
  const [dateOfBirth, setDateOfBirth] = useState(editProfile?.dateOfBirth ?? '1990-01-15');
  const [timeOfBirth, setTimeOfBirth] = useState(editProfile?.timeOfBirth ?? '06:00');
  const [city, setCity] = useState(editProfile?.city ?? '');
  const [latitude, setLatitude] = useState(editProfile?.latitude ?? 0);
  const [longitude, setLongitude] = useState(editProfile?.longitude ?? 0);

  if (!open) return null;

  const handleSave = () => {
    if (!name.trim() || !city) return;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (editProfile) {
      updateProfile(editProfile.id, { name, dateOfBirth, timeOfBirth, city, latitude, longitude, timezone: tz });
    } else {
      const profile: BirthProfile = {
        id: typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
        name: name.trim(),
        dateOfBirth,
        timeOfBirth,
        city,
        latitude,
        longitude,
        timezone: tz,
        createdAt: Date.now(),
      };
      addProfile(profile);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="glass-card rounded-2xl p-7 w-full max-w-md space-y-5 shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div>
          <h2 className="font-display text-xl font-bold text-white">{editProfile ? t('profile.edit') : t('profile.create')}</h2>
          <p className="text-xs text-zinc-500 mt-1">{t('profile.enterDetails')}</p>
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">{t('profile.name')}</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t('profile.namePlaceholder')} className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm w-full focus:border-violet-500 outline-none transition" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">{t('profile.dob')}</label>
            <input type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm w-full focus:border-violet-500 outline-none transition" />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1.5">{t('profile.tob')}</label>
            <input type="time" value={timeOfBirth} onChange={e => setTimeOfBirth(e.target.value)} className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 text-sm w-full focus:border-violet-500 outline-none transition" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-zinc-400 mb-1.5">{t('profile.city')}</label>
          <CitySearch
            initialValue={city}
            onSelect={r => { setCity(r.city); setLatitude(r.latitude); setLongitude(r.longitude); }}
          />
          {latitude !== 0 && (
            <p className="text-[10px] text-zinc-500 mt-1">{latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm text-zinc-400 hover:text-zinc-200 transition">{t('profile.cancel')}</button>
          <button onClick={handleSave} disabled={!name.trim() || !city} className="cosmic-btn !py-2.5 !px-6 !text-sm disabled:opacity-40">
            {editProfile ? t('profile.save') : t('profile.createCta')}
          </button>
        </div>
      </div>
    </div>
  );
}
