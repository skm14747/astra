'use client';
import { createContext, useContext, useMemo, useEffect, useState, useCallback, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { AyanamsaSystem, ChartStyle } from '@/lib/vedic/types';

export type FontSize = 'small' | 'default' | 'large' | 'xl';
export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'hi' | 'ne' | 'pt' | 'es' | 'ja' | 'fr' | 'ko';

const FONT_SCALE: Record<FontSize, number> = { small: 93.75, default: 106.25, large: 118.75, xl: 131.25 };

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
 * Extracts language prefix from pathname.
 * Works symmetrically in SSR and client hydration to prevent mismatches.
 */
function getLocaleFromPathname(pathname: string | null): Language | null {
  if (!pathname) return null;
  if (pathname.startsWith('/hi/') || pathname === '/hi') return 'hi';
  if (pathname.startsWith('/ne/') || pathname === '/ne') return 'ne';
  if (pathname.startsWith('/pt/') || pathname === '/pt') return 'pt';
  if (pathname.startsWith('/es/') || pathname === '/es') return 'es';
  if (pathname.startsWith('/ja/') || pathname === '/ja') return 'ja';
  if (pathname.startsWith('/fr/') || pathname === '/fr') return 'fr';
  if (pathname.startsWith('/ko/') || pathname === '/ko') return 'ko';
  return null;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const routeLocale = getLocaleFromPathname(pathname);

  const [ayanamsaSystem, setAyanamsaSystem] = useLocalStorage<AyanamsaSystem>('astra-ayanamsa', 'lahiri');
  const [chartStyle, setChartStyle] = useLocalStorage<ChartStyle | 'both'>('astra-chart-style', 'both');
  const [fontSize, setFontSize] = useLocalStorage<FontSize>('astra-font-size', 'default');
  const [theme, setTheme] = useLocalStorage<ThemeMode>('astra-theme', 'dark');

  // Authoritative language: Route prefix has highest priority for crawler & SSR determinism
  const [language, setLanguageState] = useState<Language>(routeLocale || 'en');

  // Keep language in sync with route changes
  useEffect(() => {
    if (routeLocale && routeLocale !== language) {
      setLanguageState(routeLocale);
      try {
        localStorage.setItem('astra-language', JSON.stringify(routeLocale));
        document.cookie = `astra-locale=${routeLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
      } catch { /* ignore */ }
    } else if (!routeLocale) {
      // Non-prefixed route is English default
      if (language !== 'en') {
        setLanguageState('en');
      }
    }
  }, [routeLocale, language]);

  const setLanguage = useCallback((l: Language) => {
    setLanguageState(l);
    try {
      localStorage.setItem('astra-language', JSON.stringify(l));
      document.cookie = `astra-locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch { /* ignore */ }
  }, []);

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
