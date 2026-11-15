import type { Metadata } from 'next';
import { buildVedicMetadata } from '../seo';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = buildVedicMetadata('yogas');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Home', href: '/' }, { name: 'Vedic Astrology', href: '/vedic/kundli' }, { name: 'Yogas & Doshas', href: '/vedic/yogas' }]} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6">
        <Breadcrumbs items={[{ label: 'Vedic Astrology', href: '/vedic/kundli' }, { label: 'Yogas & Doshas', href: '/vedic/yogas' }]} />
      </div>
      {children}
    </>
  );
}
