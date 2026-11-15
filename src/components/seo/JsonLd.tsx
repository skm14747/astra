export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://astra.goeasytool.com';

export function WebAppJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Astra',
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

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `${BASE_URL}${item.href}`,
        })),
      }}
    />
  );
}
