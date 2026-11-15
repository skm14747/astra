import { NextResponse, type NextRequest } from 'next/server';

export const LOCALES = ['en', 'hi', 'ne', 'pt', 'es', 'ja', 'fr'] as const;
export const DEFAULT_LOCALE = 'en';
const LOCALE_COOKIE = 'astra-locale';

/**
 * Middleware handles locale-prefixed URLs for crawler indexability:
 *
 *   /hi/vedic/kundli → rewrite to /vedic/kundli with locale=hi cookie
 *   /vedic/kundli    → serves as English (default, no prefix)
 *   /en/vedic/kundli → redirect to /vedic/kundli (canonical English has no prefix)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, API routes, Next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.') // static files like .png, .ico, .txt, .xml
  ) {
    return NextResponse.next();
  }

  // Check if path starts with a locale prefix
  const segments = pathname.split('/');
  const maybeLocale = segments[1];

  // /en/* → redirect to /* (English is the default, no prefix needed)
  if (maybeLocale === 'en') {
    const rest = segments.slice(2).join('/');
    const url = request.nextUrl.clone();
    url.pathname = rest ? `/${rest}` : '/';
    return NextResponse.redirect(url, 301);
  }

  // /hi/*, /ne/*, /pt/* → rewrite to /* and set locale cookie
  if (maybeLocale === 'hi' || maybeLocale === 'ne' || maybeLocale === 'pt' || maybeLocale === 'es' || maybeLocale === 'ja' || maybeLocale === 'fr') {
    const rest = segments.slice(2).join('/');
    const url = request.nextUrl.clone();
    url.pathname = rest ? `/${rest}` : '/';
    const response = NextResponse.rewrite(url);
    response.cookies.set(LOCALE_COOKIE, maybeLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    response.headers.set('x-locale', maybeLocale);
    return response;
  }

  // No locale prefix → English (default)
  const response = NextResponse.next();
  // Only set cookie if not already set (don't override user's choice from settings)
  if (!request.cookies.get(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, 'en', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }
  response.headers.set('x-locale', request.cookies.get(LOCALE_COOKIE)?.value || 'en');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|woff|woff2|ttf|css|js)$).*)'],
};
