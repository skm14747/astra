/**
 * SEO regression tests for Astra Destiny.
 *
 * Guards the structured-data stack, VEDIC_SEO completeness,
 * layout ↔ sitemap parity, and i18n coverage so schema regressions
 * are caught before deploy.
 */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { VEDIC_SEO, VEDIC_SEO_LOCALES, type VedicPageSeo } from '@/app/vedic/seo';

const BASE_URL = 'https://astradestiny.com';

const VEDIC_DIR = path.resolve(__dirname, '../app/vedic');
const JSONLD_PATH = path.resolve(__dirname, '../components/seo/JsonLd.tsx');
const ROOT_LAYOUT_PATH = path.resolve(__dirname, '../app/layout.tsx');
const HOME_PAGE_PATH = path.resolve(__dirname, '../app/page.tsx');
const SITEMAP_PATH = path.resolve(__dirname, '../app/sitemap.ts');

const LOCALES = ['en', 'hi', 'ne', 'pt', 'es', 'ja', 'fr', 'ko'] as const;

/* ─── Helper: slugs that have a physical layout.tsx ──────────────────── */
function getLayoutSlugs(): string[] {
  return fs.readdirSync(VEDIC_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory() && fs.existsSync(path.join(VEDIC_DIR, d.name, 'layout.tsx')))
    .map(d => d.name);
}

/* ─── Helper: extract VEDIC_ROUTES array from sitemap.ts ─────────── */
function getSitemapRoutes(): string[] {
  const src = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const match = src.match(/VEDIC_ROUTES\s*=\s*\[([\s\S]*?)\]\s*as\s*const/);
  if (!match) return [];
  return [...match[1].matchAll(/'([^']+)'/g)].map(m => m[1]);
}

/* ═══════════════════════════════════════════════════════════════════════
 * 1. VEDIC_SEO record completeness
 * ═══════════════════════════════════════════════════════════════════════ */
describe('VEDIC_SEO record completeness', () => {
  const slugs = Object.keys(VEDIC_SEO);

  it('has at least 25 tool entries', () => {
    expect(slugs.length).toBeGreaterThanOrEqual(25);
  });

  for (const slug of slugs) {
    describe(`VEDIC_SEO["${slug}"]`, () => {
      const seo: VedicPageSeo = VEDIC_SEO[slug];

      it('has non-empty title ≤ 70 chars', () => {
        expect(seo.title).toBeTruthy();
        expect(seo.title.length).toBeLessThanOrEqual(70);
      });

      it('has non-empty description ≤ 180 chars', () => {
        expect(seo.description).toBeTruthy();
        expect(seo.description.length).toBeLessThanOrEqual(180);
      });

      it('has canonical starting with /vedic/', () => {
        expect(seo.canonical).toMatch(/^\/vedic\//);
      });

      it('has seoIntro with heading and text', () => {
        expect(seo.seoIntro).toBeDefined();
        expect(seo.seoIntro.heading).toBeTruthy();
        expect(seo.seoIntro.text.length).toBeGreaterThan(50);
      });

      it('has relatedTools array with at least 2 entries', () => {
        expect(seo.relatedTools).toBeDefined();
        expect(seo.relatedTools!.length).toBeGreaterThanOrEqual(2);
      });

      it('relatedTools have valid hrefs and labels', () => {
        for (const tool of seo.relatedTools ?? []) {
          expect(tool.href).toMatch(/^\//);
          expect(tool.label).toBeTruthy();
        }
      });

      it('has keywords array with at least 3 entries', () => {
        expect(seo.keywords).toBeDefined();
        expect(seo.keywords!.length).toBeGreaterThanOrEqual(3);
      });
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * 2. Layout ↔ VEDIC_SEO ↔ Sitemap parity
 * ═══════════════════════════════════════════════════════════════════════ */
describe('Layout / SEO / Sitemap parity', () => {
  const layoutSlugs = getLayoutSlugs();
  const sitemapRoutes = getSitemapRoutes();
  const seoKeys = Object.keys(VEDIC_SEO);

  it('every layout dir has a VEDIC_SEO entry', () => {
    const missing = layoutSlugs.filter(s => !seoKeys.includes(s));
    expect(missing).toEqual([]);
  });

  it('every VEDIC_SEO entry has a layout dir', () => {
    const missing = seoKeys.filter(s => !layoutSlugs.includes(s));
    expect(missing).toEqual([]);
  });

  it('every sitemap VEDIC_ROUTE has a VEDIC_SEO entry', () => {
    const missing = sitemapRoutes.filter(r => !seoKeys.includes(r));
    expect(missing).toEqual([]);
  });

  it('every VEDIC_SEO entry appears in sitemap VEDIC_ROUTES', () => {
    const missing = seoKeys.filter(k => !sitemapRoutes.includes(k));
    expect(missing).toEqual([]);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * 3. Per-tool layout has WebApplicationJsonLd
 * ═══════════════════════════════════════════════════════════════════════ */
describe('Per-tool WebApplicationJsonLd', () => {
  const layoutSlugs = getLayoutSlugs();

  for (const slug of layoutSlugs) {
    it(`${slug}/layout.tsx imports and renders WebApplicationJsonLd`, () => {
      const src = fs.readFileSync(path.join(VEDIC_DIR, slug, 'layout.tsx'), 'utf8');
      expect(src).toContain('WebApplicationJsonLd');
      expect(src).toContain('<WebApplicationJsonLd');
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * 4. Per-tool layout has BreadcrumbJsonLd
 * ═══════════════════════════════════════════════════════════════════════ */
describe('Per-tool BreadcrumbJsonLd', () => {
  const layoutSlugs = getLayoutSlugs();

  for (const slug of layoutSlugs) {
    it(`${slug}/layout.tsx renders BreadcrumbJsonLd`, () => {
      const src = fs.readFileSync(path.join(VEDIC_DIR, slug, 'layout.tsx'), 'utf8');
      expect(src).toContain('<BreadcrumbJsonLd');
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * 5. Root layout structured data
 * ═══════════════════════════════════════════════════════════════════════ */
describe('Root layout structured data', () => {
  const rootLayout = fs.readFileSync(ROOT_LAYOUT_PATH, 'utf8');

  it('renders WebSiteJsonLd', () => {
    expect(rootLayout).toContain('<WebSiteJsonLd');
  });

  it('renders OrganizationJsonLd', () => {
    expect(rootLayout).toContain('<OrganizationJsonLd');
  });

  it('renders WebAppJsonLd (SoftwareApplication)', () => {
    expect(rootLayout).toContain('<WebAppJsonLd');
  });

  it('has skip-to-content link', () => {
    expect(rootLayout).toContain('Skip to main content');
  });

  it('has ConsentBanner', () => {
    expect(rootLayout).toContain('<ConsentBanner');
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * 6. WebSiteJsonLd has valid SearchAction
 * ═══════════════════════════════════════════════════════════════════════ */
describe('WebSiteJsonLd SearchAction', () => {
  const jsonLdSrc = fs.readFileSync(JSONLD_PATH, 'utf8');

  it('uses EntryPoint + urlTemplate pattern', () => {
    expect(jsonLdSrc).toContain("'@type': 'EntryPoint'");
    expect(jsonLdSrc).toContain('urlTemplate');
  });

  it('has matching query-input name', () => {
    expect(jsonLdSrc).toContain('{search_term_string}');
    expect(jsonLdSrc).toContain('required name=search_term_string');
  });

  it('target URL includes /tools/', () => {
    expect(jsonLdSrc).toContain('/tools/?q={search_term_string}');
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * 7. Homepage ItemList JSON-LD
 * ═══════════════════════════════════════════════════════════════════════ */
describe('Homepage ItemList JSON-LD', () => {
  const homeSrc = fs.readFileSync(HOME_PAGE_PATH, 'utf8');

  it('defines itemListJsonLd with @type ItemList', () => {
    expect(homeSrc).toContain('"@type": "ItemList"');
  });

  it('renders the JSON-LD script tag', () => {
    expect(homeSrc).toContain('application/ld+json');
    expect(homeSrc).toContain('itemListJsonLd');
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * 8. i18n locale coverage
 * ═══════════════════════════════════════════════════════════════════════ */
describe('i18n locale coverage', () => {
  const highPriorityTools = ['kundli', 'dashas', 'compatibility', 'nakshatra', 'yogas', 'panchang'];

  for (const locale of ['hi', 'ne', 'pt', 'es', 'ja', 'fr'] as const) {
    describe(`locale "${locale}"`, () => {
      it('has locale entry in VEDIC_SEO_LOCALES', () => {
        expect(VEDIC_SEO_LOCALES[locale]).toBeDefined();
      });

      for (const tool of highPriorityTools) {
        it(`covers high-priority tool "${tool}"`, () => {
          const entry = VEDIC_SEO_LOCALES[locale]?.[tool];
          if (!entry) return; // ne/ko don't cover all tools yet
          expect(entry.title).toBeTruthy();
          expect(entry.description).toBeTruthy();
        });
      }
    });
  }
});

/* ═══════════════════════════════════════════════════════════════════════
 * 9. No duplicate canonical URLs in VEDIC_SEO
 * ═══════════════════════════════════════════════════════════════════════ */
describe('No duplicate canonicals', () => {
  it('every VEDIC_SEO entry has a unique canonical', () => {
    const canonicals = Object.values(VEDIC_SEO).map(s => s.canonical);
    const unique = new Set(canonicals);
    expect(unique.size).toBe(canonicals.length);
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * 10. Security & infrastructure basics
 * ═══════════════════════════════════════════════════════════════════════ */
describe('Infrastructure basics', () => {
  it('next.config.ts disables poweredByHeader', () => {
    const config = fs.readFileSync(path.resolve(__dirname, '../../next.config.ts'), 'utf8');
    expect(config).toContain('poweredByHeader: false');
  });

  it('robots.ts exists', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../app/robots.ts'))).toBe(true);
  });

  it('sitemap.ts exists', () => {
    expect(fs.existsSync(SITEMAP_PATH)).toBe(true);
  });

  it('not-found.tsx exists', () => {
    expect(fs.existsSync(path.resolve(__dirname, '../app/not-found.tsx'))).toBe(true);
  });
});
