import type { Metadata } from 'next';
import { buildNumerologyMetadata } from '../seo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export const metadata: Metadata = buildNumerologyMetadata('personal-year');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }, { name: 'Numerology', href: '/tools/numerology' }, { name: 'Personal Year', href: '/tools/numerology/personal-year' }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Numerology', href: '/tools/numerology' }, { label: 'Personal Year', href: '/tools/numerology/personal-year' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
