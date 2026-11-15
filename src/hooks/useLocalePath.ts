'use client';
import { useCallback } from 'react';
import { useSettings } from '@/lib/settings/context';

/**
 * Returns a function that prepends the current locale prefix to a path.
 * English (default) has no prefix; all others get /<lang>/path.
 *
 * Usage:
 *   const lp = useLocalePath();
 *   <Link href={lp('/vedic/kundli')} />
 */
export function useLocalePath() {
  const { language } = useSettings();

  return useCallback(
    (path: string): string => {
      if (language === 'en') return path;
      // Avoid double-prefixing
      const locales = ['hi', 'ne', 'pt', 'es', 'ja', 'fr', 'ko'];
      const firstSeg = path.split('/')[1];
      if (locales.includes(firstSeg)) return path;
      return `/${language}${path}`;
    },
    [language],
  );
}
