'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSettings, type FontSize, type ThemeMode, type Language } from '@/lib/settings/context';
import { useProfile } from '@/lib/profile/context';
import { useT } from '@/lib/i18n';
import ProfileModal from '@/components/shared/ProfileModal';
import type { AyanamsaSystem, ChartStyle } from '@/lib/vedic/types';

export default function SettingsPage() {
  const { ayanamsaSystem, setAyanamsaSystem, chartStyle, setChartStyle, fontSize, setFontSize, theme, setTheme, language, setLanguage } = useSettings();
  const { profiles, removeProfile, activeProfileId, setActiveProfile } = useProfile();
  const [editModal, setEditModal] = useState<string | null>(null);
  const editingProfile = editModal ? profiles.find(p => p.id === editModal) ?? null : null;
  const t = useT();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    // Navigate to the locale-prefixed URL so crawlers see the correct version
    const cleanPath = pathname.replace(/^\/(hi|ne|pt|es|ja)/, '') || '/';
    if (lang === 'en') {
      router.push(cleanPath);
    } else {
      router.push(`/${lang}${cleanPath}`);
    }
  };

  const pill = (active: boolean) =>
    `px-5 py-2.5 rounded-full text-sm font-medium transition ${
      active
        ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30 shadow-[0_0_12px_rgba(124,92,252,0.15)]'
        : 'glass-card text-zinc-400 hover:text-white'
    }`;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-10">
      <div>
        <div className="zodiac-divider mb-3">
          <span className="text-xs text-violet-400/40">⚙ ✦</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white">{t('settings.title')}</h1>
        <p className="text-zinc-400 mt-1">{t('settings.subtitle')} · {t('settings.profileCount', { n: profiles.length, s: profiles.length !== 1 ? 's' : '' })}</p>
      </div>

      {/* ── Calculation ── */}
      <section className="space-y-4">
        <div className="section-title mb-1">{t('settings.calculation')}</div>
        <h2 className="font-display text-lg font-semibold text-white">{t('settings.ayanamsa')}</h2>
        <div className="flex gap-3 flex-wrap">
          {(['lahiri', 'kp', 'raman'] as AyanamsaSystem[]).map(sys => (
            <button key={sys} onClick={() => setAyanamsaSystem(sys)} className={pill(ayanamsaSystem === sys)}>
              {sys === 'lahiri' ? t('settings.lahiri') : sys === 'kp' ? t('settings.kp') : t('settings.raman')}
            </button>
          ))}
        </div>
      </section>

      {/* ── Display ── */}
      <section className="space-y-4">
        <div className="section-title mb-1">{t('settings.display')}</div>
        <h2 className="font-display text-lg font-semibold text-white">{t('settings.chartStyle')}</h2>
        <div className="flex gap-3 flex-wrap">
          {([['south-indian', t('settings.southIndian')], ['north-indian', t('settings.northIndian')], ['both', t('settings.both')]] as [ChartStyle | 'both', string][]).map(([val, label]) => (
            <button key={val} onClick={() => setChartStyle(val)} className={pill(chartStyle === val)}>{label}</button>
          ))}
        </div>
      </section>

      {/* ── Accessibility ── */}
      <section className="space-y-4">
        <div className="section-title mb-1">{t('settings.accessibility')}</div>

        <h2 className="font-display text-lg font-semibold text-white">{t('settings.fontSize')}</h2>
        <p className="text-sm text-zinc-400 -mt-2">{t('settings.fontDesc')}</p>
        <div className="flex gap-3 flex-wrap">
          {(['small', 'default', 'large', 'xl'] as FontSize[]).map(size => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={pill(fontSize === size)}
              style={{ fontSize: size === 'small' ? '0.8rem' : size === 'default' ? '0.875rem' : size === 'large' ? '1rem' : '1.125rem' }}
            >
              {size === 'small' ? t('settings.fontSmall') : size === 'default' ? t('settings.fontDefault') : size === 'large' ? t('settings.fontLarge') : t('settings.fontXl')}
            </button>
          ))}
        </div>

        <h2 className="font-display text-lg font-semibold text-white mt-6">{t('settings.appearance')}</h2>
        <p className="text-sm text-zinc-400 -mt-2">{t('settings.appearanceDesc')}</p>
        <div className="flex gap-3">
          {(['dark', 'light'] as ThemeMode[]).map(mode => (
            <button key={mode} onClick={() => setTheme(mode)} className={`flex items-center gap-2.5 ${pill(theme === mode)}`}>
              {mode === 'dark' ? (
                <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg> {t('settings.dark')}</>
              ) : (
                <><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg> {t('settings.light')}</>
              )}
            </button>
          ))}
        </div>

        <h2 className="font-display text-lg font-semibold text-white mt-6">{t('settings.language')}</h2>
        <p className="text-sm text-zinc-400 -mt-2">{t('settings.langDesc')}</p>
        <div className="flex gap-3">
          {([['en', 'English'], ['hi', 'हिन्दी'], ['ne', 'नेपाली'], ['pt', 'Português'], ['es', 'Español'], ['ja', '日本語']] as [Language, string][]).map(([lang, label]) => (
            <button key={lang} onClick={() => handleLanguageChange(lang)} className={pill(language === lang)}>
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* ── Data ── */}
      <section className="space-y-4">
        <div className="section-title mb-1">{t('settings.data')}</div>
        <h2 className="font-display text-lg font-semibold text-white">
          {t('settings.savedProfiles')}
          <span className="text-sm font-normal text-zinc-500 ml-2">({profiles.length})</span>
        </h2>
        {profiles.length === 0 ? (
          <p className="text-sm text-zinc-500">{t('profile.noneYet')}</p>
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
                    <button onClick={() => setActiveProfile(p.id)} className="text-xs text-violet-400 hover:text-violet-300 transition">{t('profile.activate')}</button>
                  )}
                  <button onClick={() => setEditModal(p.id)} className="text-xs text-zinc-400 hover:text-zinc-200 transition">{t('profile.editBtn')}</button>
                  <button onClick={() => removeProfile(p.id)} className="text-xs text-red-400 hover:text-red-300 transition">{t('profile.delete')}</button>
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
