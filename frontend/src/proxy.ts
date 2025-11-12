import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { detectLocale, getLocaleFromPathname } from '@/i18n/locale-detector';
import { isValidLocale } from '@/i18n/config';

export async function proxy(request: NextRequest) {
  const { pathname, search, hash } = request.nextUrl;

  // Skip middleware for Next.js internal paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Check if URL already contains a valid locale
  const localeInPath = getLocaleFromPathname(pathname);
  if (localeInPath && isValidLocale(localeInPath)) {
    // URL already has a valid locale, proceed
    return NextResponse.next();
  }

  // URL doesn't have a locale, detect and redirect
  const detectedLocale = await detectLocale(undefined, request.headers);

  // Build the new URL with locale prefix
  const newUrl = new URL(request.url);
  newUrl.pathname = `/${detectedLocale}${pathname}`;

  // Preserve query parameters and hash fragments
  newUrl.search = search;
  if (hash) {
    newUrl.hash = hash;
  }

  // Use 307 (Temporary Redirect) to preserve the request method
  return NextResponse.redirect(newUrl, { status: 307 });
}

export const config = {
  // Match all paths except for static files and Next.js internals
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|css|js)$).*)',
  ],
};
