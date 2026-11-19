'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

function readStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Always init with defaultValue for SSR. Sync real value in a single post-mount effect.
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const mounted = useRef(false);

  // One-shot sync after hydration — only sets state if the stored value differs
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    const stored = readStorage(key, defaultValue);
    if (JSON.stringify(stored) !== JSON.stringify(defaultValue)) {
      setStoredValue(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue(prev => {
        const next = value instanceof Function ? value(prev) : value;
        try { window.localStorage.setItem(key, JSON.stringify(next)); } catch { /* quota */ }
        return next;
      });
    },
    [key],
  );

  // Cross-tab sync
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try { setStoredValue(JSON.parse(e.newValue) as T); } catch { /* ignore */ }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [storedValue, setValue];
}
