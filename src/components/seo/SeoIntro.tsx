'use client';

import { useState } from 'react';

export default function SeoIntro({
  heading,
  text,
}: {
  heading: string;
  text: string;
}) {
  const [expanded, setExpanded] = useState(false);
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
            Read more
          </button>
        )}
      </p>
    </section>
  );
}
