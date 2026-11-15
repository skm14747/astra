import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Astra — Vedic Astrology Calculator',
    short_name: 'Astra',
    description:
      'Free Vedic astrology calculator with Kundli, Dasha timelines, Yogas, compatibility matching, and 200+ Jyotish tools.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050510',
    theme_color: '#7c5cfc',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
