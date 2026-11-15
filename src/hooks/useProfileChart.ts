'use client';
import { useMemo } from 'react';
import { useProfile } from '@/lib/profile/context';
import { useSettings } from '@/lib/settings/context';
import { generateKundli } from '@/lib/vedic/core';
import type { KundliChart, BirthData } from '@/lib/vedic/types';
import type { BirthProfile } from '@/lib/profile/types';

function profileToBirthData(profile: BirthProfile): BirthData {
  const [y, m, d] = profile.dateOfBirth.split('-').map(Number);
  const [hr, min] = profile.timeOfBirth.split(':').map(Number);
  return {
    date: new Date(y, m - 1, d, hr || 0, min || 0),
    observer: { latitude: profile.latitude, longitude: profile.longitude },
    name: profile.name,
  };
}

export function useProfileChart(): { chart: KundliChart | null; profile: BirthProfile | null; birthData: BirthData | null } {
  const { activeProfile } = useProfile();
  const { ayanamsaSystem } = useSettings();

  return useMemo(() => {
    if (!activeProfile) return { chart: null, profile: null, birthData: null };
    const birthData = profileToBirthData(activeProfile);
    const chart = generateKundli(birthData, ayanamsaSystem);
    return { chart, profile: activeProfile, birthData };
  }, [activeProfile, ayanamsaSystem]);
}

export function profileToDate(profile: BirthProfile): Date {
  const [y, m, d] = profile.dateOfBirth.split('-').map(Number);
  const [hr, min] = profile.timeOfBirth.split(':').map(Number);
  return new Date(y, m - 1, d, hr || 0, min || 0);
}
