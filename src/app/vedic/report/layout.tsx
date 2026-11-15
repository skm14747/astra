import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export const metadata: Metadata = {
  title: 'Free Vedic Astrology Report — 22-Chapter Birth Chart Analysis',
  description:
    'Generate a free, comprehensive Vedic astrology report with 22 chapters: planet-by-planet analysis, house-by-house reading, Yogas, Doshas, career, marriage, health, Dasha narratives, Jaimini, Nadi, and personalized remedies. 200+ BPHS-accurate algorithms.',
  keywords: ['vedic astrology report', 'free kundli report', 'birth chart analysis', 'detailed horoscope', 'jyotish report PDF'],
  alternates: { canonical: '/vedic/report' },
  openGraph: {
    title: 'Free Vedic Astrology Report — 22-Chapter Birth Chart Analysis',
    description: 'Free comprehensive Vedic birth chart report with 200+ algorithms. Planet-by-planet, Yogas, Doshas, career, marriage, Dasha timelines, and remedies.',
    url: '/vedic/report',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Vedic Astrology Report — 22 Chapters',
    description: 'Free comprehensive birth chart report with planet analysis, career, marriage, health, Dasha narratives & remedies.',
    images: ['/og-image.png'],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Vedic Astrology', href: '/vedic/kundli' }, { name: 'Detailed Report', href: '/vedic/report' }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Vedic Astrology', href: '/vedic/kundli' }, { label: 'Detailed Report', href: '/vedic/report' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
