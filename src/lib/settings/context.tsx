'use client';
import { createContext, useContext, useMemo, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { AyanamsaSystem, ChartStyle } from '@/lib/vedic/types';

export type FontSize = 'small' | 'default' | 'large' | 'xl';
export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'hi' | 'ne' | 'pt' | 'es';

const FONT_SCALE: Record<FontSize, number> = { small: 87.5, default: 100, large: 112.5, xl: 125 };

interface SettingsContextValue {
  ayanamsaSystem: AyanamsaSystem;
  chartStyle: ChartStyle | 'both';
  fontSize: FontSize;
  theme: ThemeMode;
  language: Language;
  setAyanamsaSystem: (s: AyanamsaSystem) => void;
  setChartStyle: (s: ChartStyle | 'both') => void;
  setFontSize: (s: FontSize) => void;
  setTheme: (s: ThemeMode) => void;
  setLanguage: (l: Language) => void;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

/**
 * Reads the locale cookie set by middleware for /hi/* routes.
 * Falls back to 'en' if no cookie is found.
 */
function getLocaleFromCookie(): Language {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/(?:^|;\s*)astra-locale=(\w+)/);
  const val = match?.[1];
  if (val === 'hi') return 'hi';
  if (val === 'ne') return 'ne';
  if (val === 'pt') return 'pt';
  if (val === 'es') return 'es';
  return 'en';
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [ayanamsaSystem, setAyanamsaSystem] = useLocalStorage<AyanamsaSystem>('astra-ayanamsa', 'lahiri');
  const [chartStyle, setChartStyle] = useLocalStorage<ChartStyle | 'both'>('astra-chart-style', 'both');
  const [fontSize, setFontSize] = useLocalStorage<FontSize>('astra-font-size', 'default');
  const [theme, setTheme] = useLocalStorage<ThemeMode>('astra-theme', 'dark');
  const [language, setLanguageRaw] = useLocalStorage<Language>('astra-language', 'en');

  // On first mount, sync with the locale cookie (set by middleware for /hi/* URLs)
  useEffect(() => {
    const cookieLocale = getLocaleFromCookie();
    if (cookieLocale !== language) {
      setLanguageRaw(cookieLocale);
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLanguage = (l: Language) => {
    setLanguageRaw(l);
    // Also update the cookie so middleware stays in sync
    document.cookie = `astra-locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  };

  useEffect(() => {
    document.documentElement.style.fontSize = `${FONT_SCALE[fontSize]}%`;
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<SettingsContextValue>(
    () => ({ ayanamsaSystem, chartStyle, fontSize, theme, language, setAyanamsaSystem, setChartStyle, setFontSize, setTheme, setLanguage }),
    [ayanamsaSystem, chartStyle, fontSize, theme, language, setAyanamsaSystem, setChartStyle, setFontSize, setTheme, setLanguage],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
