import type { Metadata } from 'next';
import { buildVedicMetadata, VEDIC_SEO } from '../seo';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export async function generateMetadata(): Promise<Metadata> { return buildVedicMetadata('yogas'); }

const seo = VEDIC_SEO.yogas;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Vedic Astrology', href: '/vedic/kundli' }, { name: 'Yogas & Doshas', href: '/vedic/yogas' }]} />
      {seo.faqs && <FAQJsonLd faqs={seo.faqs} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Vedic Astrology', href: '/vedic/kundli' }, { label: 'Yogas & Doshas', href: '/vedic/yogas' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
