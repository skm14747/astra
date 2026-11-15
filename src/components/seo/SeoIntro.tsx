'use client';

import { useState } from 'react';
import { useT } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/i18n';

export default function SeoIntro({
  headingKey,
  textKey,
  fallbackHeading,
  fallbackText,
}: {
  headingKey: TranslationKey;
  textKey: TranslationKey;
  fallbackHeading?: string;
  fallbackText?: string;
}) {
  const t = useT();
  const [expanded, setExpanded] = useState(false);
  const rawText = t(textKey);
  const rawHeading = t(headingKey);
  const text = rawText === textKey && fallbackText ? fallbackText : rawText;
  const heading = rawHeading === headingKey && fallbackHeading ? fallbackHeading : rawHeading;
  const isLong = text.length > 200;
  const display = isLong && !expanded ? text.slice(0, 200) + '…' : text;

  return (
    <section
      className="mt-12 border-t border-white/[0.04] pt-8"
      aria-label={heading}
    >
      <h2 className="font-display text-lg font-semibold text-zinc-300 mb-3">
        {heading}
      </h2>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-3xl">
        {display}
        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className="ml-1 text-violet-400 hover:text-violet-300 transition-colors text-sm"
          >
            {t('seo.readMore')}
          </button>
        )}
      </p>
    </section>
  );
}
