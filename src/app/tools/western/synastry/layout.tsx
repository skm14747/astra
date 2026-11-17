import type { Metadata } from 'next';
import { buildWesternMetadata } from '../seo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import PageAdWrapper from '@/components/ads/PageAdWrapper';

export const metadata: Metadata = buildWesternMetadata('synastry');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Tools', href: '/tools' }, { name: 'Synastry', href: '/tools/western/synastry' }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }, { label: 'Synastry Calculator', href: '/tools/western/synastry' }]} />
      </div>
      <PageAdWrapper>{children}</PageAdWrapper>
    </>
  );
}
