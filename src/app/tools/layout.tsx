import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Vedic Astrology Calculators & Tools',
  description: 'Browse all Astra Destiny astrology calculators — Kundli generator, Dasha calculator, Kundli Milan, Panchang, Nakshatra finder, Dosha checks, and 20+ more free Jyotish tools.',
  alternates: {
    canonical: '/tools/',
    languages: {
      'en': '/tools/',
      'hi': '/hi/tools/',
      'ne': '/ne/tools/',
      'pt': '/pt/tools/',
      'es': '/es/tools/',
      'ja': '/ja/tools/',
      'fr': '/fr/tools/',
      'x-default': '/tools/',
    },
  },
  openGraph: {
    title: 'Free Vedic Astrology Calculators & Tools | Astra Destiny',
    description: 'Browse 200+ free Vedic astrology calculators — Kundli, Dasha, Kundli Milan, Panchang, Nakshatra, and more.',
    url: '/tools/',
    type: 'website',
  },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
