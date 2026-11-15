import { useSettings } from '../settings/context';
import { en, type TranslationKey } from './en';
import { hi } from './hi';
import { ne } from './ne';
import { pt } from './pt';
import { es } from './es';
import { ja } from './ja';

const dicts: Record<string, Record<string, string>> = { en, hi, ne, pt, es, ja };

/**
 * Returns a translation function `t(key, params?)` that looks up the
 * current language dictionary and interpolates `{param}` placeholders.
 *
 * Usage:
 *   const t = useT();
 *   t('panchang.title')                     → "Daily Panchang" / "दैनिक पंचांग"
 *   t('yogas.found', { n: 5 })              → "5 Yogas found" / "5 योग पाए गए"
 *   t('settings.profileCount', { n: 2, s: 's' }) → "2 profiles saved"
 */
export function useT() {
  const { language } = useSettings();
  return (key: TranslationKey, params?: Record<string, string | number>): string => {
    let str: string = dicts[language]?.[key] ?? dicts.en[key] ?? key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return str;
  };
}

export type { TranslationKey };
