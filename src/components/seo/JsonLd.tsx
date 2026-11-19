import { Suspense } from 'react';

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astradestiny.com';

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Astra Destiny',
        url: BASE_URL,
        description: 'Free Vedic astrology calculators with 200+ Jyotish tools — Kundli, Dasha, Yogas, Nakshatra, Kundli Milan & more.',
        inLanguage: ['en', 'hi', 'ne', 'pt', 'es', 'ja', 'fr', 'ko'],
        potentialAction: {
          '@type': 'SearchAction',
          target: `${BASE_URL}/vedic/{search_term}`,
          'query-input': 'required name=search_term',
        },
      }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Astra Destiny',
        url: BASE_URL,
        logo: `${BASE_URL}/og-image.png`,
        description: 'Free Vedic astrology calculator platform with NASA-precision ephemeris and BPHS-accurate algorithms.',
        sameAs: [],
      }}
    />
  );
}

export function WebAppJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Astra Destiny',
        applicationCategory: 'LifestyleApplication',
        operatingSystem: 'Web',
        description:
          'Free Vedic astrology calculator with 200+ Jyotish tools — Kundli, Dasha timelines, Yogas, Nakshatra, Kundli Milan & more.',
        url: BASE_URL,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '150',
          bestRating: '5',
          worstRating: '1',
        },
        screenshot: `${BASE_URL}/og-image.png`,
        featureList: [
          'Kundli (Birth Chart)',
          'Vimshottari Dasha Timeline',
          'Yoga & Dosha Analysis',
          'Kundli Milan (Compatibility)',
          'Daily Panchang',
          'Muhurta Finder',
          'Shadbala Calculator',
          'Jaimini Astrology',
          'Nadi Astrology',
          'KP System',
          'Ashtakavarga',
          'Divisional Charts (D1-D60)',
          'Career, Wealth & Health Analysis',
          'Vedic Remedies',
        ],
      }}
    />
  );
}

/** Ensure path has a trailing slash to match next.config.ts `trailingSlash: true`. */
function withTrailingSlash(path: string): string {
  return path.endsWith('/') ? path : `${path}/`;
}

async function BreadcrumbJsonLdInner({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const { headers } = await import('next/headers');
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `${BASE_URL}${prefix}${withTrailingSlash(item.href)}`,
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return (
    <Suspense fallback={null}>
      <BreadcrumbJsonLdInner items={items} />
    </Suspense>
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        step: steps.map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
      }}
    />
  );
}
