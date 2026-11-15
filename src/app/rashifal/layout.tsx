import type { Metadata } from 'next';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export const metadata: Metadata = {
  title: 'राशिफल (Rashifal) — आज का राशिफल | Daily Rashifal for All 12 Rashis',
  description:
    'आज का राशिफल (Today\'s Rashifal) — मेष से मीन तक सभी 12 राशियों का दैनिक राशिफल। करियर, प्रेम, स्वास्थ्य और शुभ अंक। NASA-precision चंद्र गोचर पर आधारित।',
  keywords: [
    'rashifal', 'राशिफल', 'आज का राशिफल', 'aaj ka rashifal',
    'daily rashifal', 'dainik rashifal', 'दैनिक राशिफल',
    'rashifal today', 'today rashifal in hindi',
    'mesh rashifal', 'vrishabha rashifal', 'mithun rashifal',
  ],
  alternates: {
    canonical: '/rashifal',
    languages: {
      'en': '/horoscope/today',
      'hi': '/hi/rashifal',
      'ne': '/ne/horoscope/today',
      'pt': '/pt/horoscope/today',
      'es': '/es/horoscope/today',
      'ja': '/ja/horoscope/today',
      'fr': '/fr/horoscope/today',
      'ko': '/ko/horoscope/today',
      'x-default': '/horoscope/today',
    },
  },
  openGraph: {
    title: 'आज का राशिफल — राशिफल Today | All 12 Rashis',
    description: 'मुफ्त दैनिक राशिफल — करियर, प्रेम, स्वास्थ्य और शुभ अंक। चंद्र गोचर पर आधारित।',
    url: '/rashifal',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?tool=rashifal&title=आज%20का%20राशिफल`, width: 1200, height: 630 }],
  },
};

const faqs = [
  { question: 'राशिफल क्या है?', answer: 'राशिफल (Rashifal) का अर्थ है राशि का फल — चंद्र राशि के गोचर के आधार पर दैनिक भविष्यवाणी। यह वैदिक ज्योतिष में चंद्रमा की स्थिति पर आधारित होता है।' },
  { question: 'राशिफल चंद्र राशि से देखें या सूर्य राशि से?', answer: 'वैदिक ज्योतिष में राशिफल हमेशा चंद्र राशि (Chandra Rashi) से देखा जाता है। अपनी चंद्र राशि जानने के लिए हमारा मुफ्त कुंडली कैलकुलेटर उपयोग करें।' },
  { question: 'यह राशिफल कितना सटीक है?', answer: 'यह राशिफल NASA JPL DE-series एफेमेरिस और लाहिरी अयनांश पर आधारित चंद्र गोचर स्थिति का उपयोग करता है। गणना भारतीय खगोलीय एफेमेरिस मानक से मेल खाती है।' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'राशिफल (Rashifal)', href: '/rashifal' }]} />
      <FAQJsonLd faqs={faqs} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'राशिफल', href: '/rashifal' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
