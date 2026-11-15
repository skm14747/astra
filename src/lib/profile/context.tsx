'use client';
import { createContext, useContext, useMemo, useCallback, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { BirthProfile } from './types';

interface ProfileContextValue {
  profiles: BirthProfile[];
  activeProfileId: string | null;
  activeProfile: BirthProfile | null;
  addProfile: (profile: BirthProfile) => void;
  updateProfile: (id: string, updates: Partial<BirthProfile>) => void;
  removeProfile: (id: string) => void;
  setActiveProfile: (id: string | null) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profiles, setProfiles] = useLocalStorage<BirthProfile[]>('astra-profiles', []);
  const [activeProfileId, setActiveProfileId] = useLocalStorage<string | null>('astra-active-profile', null);

  const activeProfile = useMemo(
    () => profiles.find(p => p.id === activeProfileId) ?? null,
    [profiles, activeProfileId],
  );

  const addProfile = useCallback(
    (profile: BirthProfile) => {
      setProfiles(prev => [...prev, profile]);
      setActiveProfileId(profile.id);
    },
    [setProfiles, setActiveProfileId],
  );

  const updateProfile = useCallback(
    (id: string, updates: Partial<BirthProfile>) => {
      setProfiles(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    },
    [setProfiles],
  );

  const removeProfile = useCallback(
    (id: string) => {
      setProfiles(prev => prev.filter(p => p.id !== id));
      setActiveProfileId(prev => (prev === id ? null : prev));
    },
    [setProfiles, setActiveProfileId],
  );

  const setActiveProfile = useCallback(
    (id: string | null) => setActiveProfileId(id),
    [setActiveProfileId],
  );

  const value = useMemo<ProfileContextValue>(
    () => ({ profiles, activeProfileId, activeProfile, addProfile, updateProfile, removeProfile, setActiveProfile }),
    [profiles, activeProfileId, activeProfile, addProfile, updateProfile, removeProfile, setActiveProfile],
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
