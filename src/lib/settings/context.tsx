'use client';
import { createContext, useContext, useMemo, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { AyanamsaSystem, ChartStyle } from '@/lib/vedic/types';

export type FontSize = 'small' | 'default' | 'large' | 'xl';
export type ThemeMode = 'dark' | 'light';
export type Language = 'en' | 'hi';

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

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [ayanamsaSystem, setAyanamsaSystem] = useLocalStorage<AyanamsaSystem>('astra-ayanamsa', 'lahiri');
  const [chartStyle, setChartStyle] = useLocalStorage<ChartStyle | 'both'>('astra-chart-style', 'both');
  const [fontSize, setFontSize] = useLocalStorage<FontSize>('astra-font-size', 'default');
  const [theme, setTheme] = useLocalStorage<ThemeMode>('astra-theme', 'dark');
  const [language, setLanguage] = useLocalStorage<Language>('astra-language', 'en');

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
