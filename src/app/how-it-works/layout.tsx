import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How It Works — Calculation Methodology',
  description:
    'Learn how Astra Destiny calculates Vedic astrology charts using NASA JPL ephemeris, Lahiri Ayanamsa, BPHS rules, and client-side astronomy. 200+ tools explained.',
  alternates: {
    canonical: '/how-it-works',
    languages: {
      'en': '/how-it-works',
      'hi': '/hi/how-it-works',
      'ne': '/ne/how-it-works',
      'pt': '/pt/how-it-works',
      'es': '/es/how-it-works',
      'ja': '/ja/how-it-works',
      'x-default': '/how-it-works',
    },
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
