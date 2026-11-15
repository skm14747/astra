'use client';
import { useEffect, useRef } from 'react';

type AdFormat = 'auto' | 'rectangle' | 'horizontal' | 'vertical';

interface AdSlotProps {
  /** AdSense ad slot ID (from your AdSense dashboard) */
  slot?: string;
  format?: AdFormat;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

/**
 * Google AdSense display ad unit.
 * Renders a responsive ad that blends with the Astra dark theme.
 * Replace the default `slot` value once you create ad units in AdSense.
 */
export default function AdSlot({ slot = '', format = 'auto', className = '' }: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // adsbygoogle not loaded yet — graceful no-op
    }
  }, []);

  return (
    <div className={`ad-container w-full flex justify-center my-6 ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4058029196087745"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
}
