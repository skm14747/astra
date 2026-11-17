import type { Metadata } from 'next';
import { buildVedicMetadata } from '../seo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export const metadata: Metadata = buildVedicMetadata('arudha-pada');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Vedic Astrology', href: '/vedic/kundli' }, { name: 'Jaimini', href: '/vedic/jaimini' }, { name: 'Arudha Pada', href: '/vedic/arudha-pada' }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Vedic Astrology', href: '/vedic/kundli' }, { label: 'Jaimini', href: '/vedic/jaimini' }, { label: 'Arudha Pada', href: '/vedic/arudha-pada' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
