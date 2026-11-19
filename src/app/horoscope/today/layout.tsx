import type { Metadata } from 'next';
import { BreadcrumbJsonLd, FAQJsonLd, HowToJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export const metadata: Metadata = {
  title: 'Today\'s Rashifal (राशिफल) — Free Daily Horoscope for All 12 Signs',
  description:
    'Get your free daily rashifal (राशिफल) based on Vedic Moon sign transits. Daily horoscope for Aries to Pisces — career, love, health & lucky numbers. Updated daily with NASA-precision lunar positions.',
  keywords: [
    'rashifal', 'daily rashifal', 'today rashifal', 'आज का राशिफल',
    'horoscope today', 'daily horoscope', 'today horoscope',
    'rashifal today', 'aaj ka rashifal', 'dainik rashifal',
    'moon sign horoscope', 'vedic horoscope', 'free horoscope',
    'aries horoscope today', 'taurus horoscope today',
  ],
  alternates: {
    canonical: '/horoscope/today/',
    languages: {
      'en': '/horoscope/today/',
      'hi': '/hi/horoscope/today/',
      'ne': '/ne/horoscope/today/',
      'pt': '/pt/horoscope/today/',
      'es': '/es/horoscope/today/',
      'ja': '/ja/horoscope/today/',
      'fr': '/fr/horoscope/today/',
      'ko': '/ko/horoscope/today/',
      'x-default': '/horoscope/today/',
    },
  },
  openGraph: {
    title: 'Today\'s Rashifal — Free Daily Horoscope for 12 Signs',
    description: 'Free daily rashifal based on Vedic Moon transits. Career, love, health predictions for all 12 zodiac signs.',
    url: '/horoscope/today/',
    type: 'website',
    images: [{ url: `${BASE_URL}/api/og?tool=rashifal&title=Today's%20Rashifal`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Today\'s Rashifal — Free Daily Horoscope',
    description: 'Free daily rashifal for all 12 signs. Career, love, health, lucky numbers.',
  },
};

const faqs = [
  { question: 'What is Rashifal?', answer: 'Rashifal (राशिफल) means "zodiac prediction" in Hindi. It is a daily horoscope based on the Moon\'s transit through the 12 zodiac signs (rashis) in Vedic astrology. Unlike Western horoscopes that use the Sun sign, Vedic rashifal uses your Moon sign (Chandra Rashi) for predictions.' },
  { question: 'How is daily rashifal calculated?', answer: 'Daily rashifal is based on the Moon\'s current sidereal position and its transit through each rashi (zodiac sign). The Moon changes signs approximately every 2.25 days. The house position of the transiting Moon from your birth Moon sign determines the predictions for career, love, and health.' },
  { question: 'Should I check rashifal by Moon sign or Sun sign?', answer: 'In Vedic astrology (Jyotish), always check rashifal by your Moon sign (Chandra Rashi), not Sun sign. The Moon sign is determined by the Moon\'s sidereal position at birth. If you don\'t know your Moon sign, use our free Kundli calculator to find it.' },
  { question: 'How often is this rashifal updated?', answer: 'This rashifal is generated based on real-time astronomical positions of the Moon using NASA-precision ephemeris. Predictions update automatically each day based on the Moon\'s transit through the sidereal zodiac.' },
];

const howTo = {
  name: 'How to Check Your Daily Rashifal',
  description: 'Read your free daily horoscope based on Vedic Moon sign transit.',
  steps: [
    { name: 'Know your Moon sign', text: 'Find your Moon sign (Chandra Rashi) using our free Kundli calculator, or check if you already know it from your birth chart.' },
    { name: 'Select your rashi', text: 'Scroll to or click your zodiac sign from the 12 rashis listed below.' },
    { name: 'Read predictions', text: 'View your daily overview, career, love, and health predictions along with lucky number and color.' },
    { name: 'Check regularly', text: 'Predictions change daily as the Moon transits through different signs. Check back each morning for fresh insights.' },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Daily Rashifal', href: '/horoscope/today' }]} />
      <FAQJsonLd faqs={faqs} />
      <HowToJsonLd name={howTo.name} description={howTo.description} steps={howTo.steps} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Daily Rashifal', href: '/horoscope/today' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
