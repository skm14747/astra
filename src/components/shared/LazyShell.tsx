'use client';

import dynamic from 'next/dynamic';

const CosmicBackground = dynamic(() => import('./CosmicBackground'), { ssr: false });
const CommandPalette = dynamic(() => import('./CommandPalette'), { ssr: false });

export function LazyCosmicBackground() {
  return <CosmicBackground />;
}

export function LazyCommandPalette() {
  return <CommandPalette />;
}
