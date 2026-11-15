'use client';

import LocaleLink from '../shared/LocaleLink';
import { useT } from '@/lib/i18n';
import type { TranslationKey } from '@/lib/i18n';

/** Map href slug to a `related.*` translation key. */
function hrefToKey(href: string): TranslationKey | null {
  const parts = href.split('/').filter(Boolean);
  if (parts[0] === 'matrix') {
    const map: Record<string, string> = {
      chart: 'matrixChart',
      health: 'matrixHealth',
      timeline: 'matrixTimeline',
      compatibility: 'matrixCompat',
    };
    const k = map[parts[1]];
    return k ? (`related.${k}` as TranslationKey) : null;
  }
  return parts[1] ? (`related.${parts[1]}` as TranslationKey) : null;
}

export default function RelatedTools({
  tools,
}: {
  tools: { href: string; label: string }[];
}) {
  const t = useT();
  if (!tools.length) return null;
  return (
    <nav aria-label="Related tools" className="mt-12 pt-8 border-t border-white/[0.04]">
      <h2 className="text-sm font-semibold text-zinc-400 tracking-wide uppercase mb-4">
        {t('related.title')}
      </h2>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => {
          const key = hrefToKey(tool.href);
          return (
            <LocaleLink
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 rounded-full text-sm text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.04] hover:border-violet-500/30 transition-all"
            >
              {key ? t(key) : tool.label}
            </LocaleLink>
          );
        })}
      </div>
    </nav>
  );
}
