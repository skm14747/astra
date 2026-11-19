import type { Metadata } from 'next';
import { buildVedicMetadata, VEDIC_SEO } from '../seo';
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export async function generateMetadata(): Promise<Metadata> { return buildVedicMetadata('atmakaraka'); }

const seo = VEDIC_SEO.atmakaraka;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Vedic Astrology', href: '/vedic/kundli' }, { name: 'Jaimini', href: '/vedic/jaimini' }, { name: 'Atmakaraka', href: '/vedic/atmakaraka' }]} />
      {seo.faqs && <FAQJsonLd faqs={seo.faqs} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Vedic Astrology', href: '/vedic/kundli' }, { label: 'Jaimini', href: '/vedic/jaimini' }, { label: 'Atmakaraka', href: '/vedic/atmakaraka' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
