'use client';
import { useState } from 'react';
import { useSettings, type FontSize, type ThemeMode } from '@/lib/settings/context';
import { useProfile } from '@/lib/profile/context';
import ProfileModal from '@/components/shared/ProfileModal';
import type { AyanamsaSystem, ChartStyle } from '@/lib/vedic/types';

export default function SettingsPage() {
  const { ayanamsaSystem, setAyanamsaSystem, chartStyle, setChartStyle, fontSize, setFontSize, theme, setTheme } = useSettings();
  const { profiles, removeProfile, activeProfileId, setActiveProfile } = useProfile();
  const [editModal, setEditModal] = useState<string | null>(null);
  const editingProfile = editModal ? profiles.find(p => p.id === editModal) ?? null : null;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-10">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">⚙ ✦</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 mt-1">Customize your Astra experience · {profiles.length} profile{profiles.length !== 1 ? 's' : ''} saved</p>
      </div>

      <section className="space-y-4">
        <div className="section-title mb-1">Calculation</div>
        <h2 className="font-display text-lg font-semibold text-white">Ayanamsa System</h2>
        <div className="flex gap-3 flex-wrap">
          {(['lahiri', 'kp', 'raman'] as AyanamsaSystem[]).map(sys => (
            <button
              key={sys}
              onClick={() => setAyanamsaSystem(sys)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                ayanamsaSystem === sys
                  ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30 shadow-[0_0_12px_rgba(124,92,252,0.15)]'
                  : 'glass-card text-zinc-400 hover:text-white'
              }`}
            >
              {sys === 'lahiri' ? 'Lahiri (Chitrapaksha)' : sys === 'kp' ? 'Krishnamurti (KP)' : 'Raman'}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-title mb-1">Display</div>
        <h2 className="font-display text-lg font-semibold text-white">Chart Style</h2>
        <div className="flex gap-3 flex-wrap">
          {([['south-indian', 'South Indian'], ['north-indian', 'North Indian'], ['both', 'Both']] as [ChartStyle | 'both', string][]).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setChartStyle(val)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                chartStyle === val
                  ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30 shadow-[0_0_12px_rgba(124,92,252,0.15)]'
                  : 'glass-card text-zinc-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-title mb-1">Accessibility</div>
        <h2 className="font-display text-lg font-semibold text-white">Font Size</h2>
        <p className="text-sm text-zinc-400 -mt-2">Larger text is easier to read. All pages scale with this setting.</p>
        <div className="flex gap-3 flex-wrap">
          {(['small', 'default', 'large', 'xl'] as FontSize[]).map(size => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={`px-5 py-2.5 rounded-full font-medium transition ${
                fontSize === size
                  ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30 shadow-[0_0_12px_rgba(124,92,252,0.15)]'
                  : 'glass-card text-zinc-400 hover:text-white'
              }`}
              style={{ fontSize: size === 'small' ? '0.8rem' : size === 'default' ? '0.875rem' : size === 'large' ? '1rem' : '1.125rem' }}
            >
              {size === 'small' ? 'Small' : size === 'default' ? 'Default' : size === 'large' ? 'Large' : 'Extra Large'}
            </button>
          ))}
        </div>

        <h2 className="font-display text-lg font-semibold text-white mt-6">Appearance</h2>
        <p className="text-sm text-zinc-400 -mt-2">Choose light or dark mode based on your preference.</p>
        <div className="flex gap-3">
          {(['dark', 'light'] as ThemeMode[]).map(mode => (
            <button
              key={mode}
              onClick={() => setTheme(mode)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium transition ${
                theme === mode
                  ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30 shadow-[0_0_12px_rgba(124,92,252,0.15)]'
                  : 'glass-card text-zinc-400 hover:text-white'
              }`}
            >
              {mode === 'dark' ? (
                <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg> Dark</>
              ) : (
                <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg> Light</>
              )}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="section-title mb-1">Data</div>
        <h2 className="font-display text-lg font-semibold text-white">
          Saved Profiles
          <span className="text-sm font-normal text-zinc-500 ml-2">({profiles.length})</span>
        </h2>
        {profiles.length === 0 ? (
          <p className="text-sm text-zinc-500">No profiles saved yet. Create one from the navigation bar.</p>
        ) : (
          <div className="space-y-2">
            {profiles.map(p => (
              <div key={p.id} className={`glass-card rounded-xl flex items-center justify-between p-4 ${
                p.id === activeProfileId ? 'vedic-glow border-violet-500/20' : ''
              }`}>
                <div>
                  <div className="flex items-center gap-2">
                    {p.id === activeProfileId && <span className="w-2 h-2 rounded-full bg-violet-400" />}
                    <span className="font-medium text-sm text-zinc-200">{p.name}</span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-0.5 ml-4">{p.dateOfBirth} · {p.timeOfBirth} · {p.city}</div>
                </div>
                <div className="flex gap-3">
                  {p.id !== activeProfileId && (
                    <button onClick={() => setActiveProfile(p.id)} className="text-xs text-violet-400 hover:text-violet-300 transition">Activate</button>
                  )}
                  <button onClick={() => setEditModal(p.id)} className="text-xs text-zinc-400 hover:text-zinc-200 transition">Edit</button>
                  <button onClick={() => removeProfile(p.id)} className="text-xs text-red-400 hover:text-red-300 transition">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {editModal && <ProfileModal open={true} onClose={() => setEditModal(null)} editProfile={editingProfile} />}
    </div>
  );
}
