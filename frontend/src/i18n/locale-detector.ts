import { cookies } from 'next/headers';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { type Locale, locales, defaultLocale, isValidLocale } from './config';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

/**
 * Detects the user's preferred locale based on multiple sources in priority order:
 * 1. URL path (handled by routing, passed as parameter)
 * 2. Cookie preference
 * 3. Accept-Language header
 * 4. Default locale fallback
 */
export async function detectLocale(
  urlLocale: string | undefined,
  headers: Headers
): Promise<Locale> {
  // Priority 1: Check URL path for locale
  if (urlLocale && isValidLocale(urlLocale)) {
    return urlLocale;
  }

  // Priority 2: Check cookie for saved user preference
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // Priority 3: Parse Accept-Language header
  try {
    const acceptLanguage = headers.get('accept-language');
    if (acceptLanguage) {
      const languages = new Negotiator({
        headers: { 'accept-language': acceptLanguage },
      }).languages();

      const matchedLocale = match(languages, locales as unknown as string[], defaultLocale);
      if (isValidLocale(matchedLocale)) {
        return matchedLocale;
      }
    }
  } catch (error) {
    console.warn('Failed to parse Accept-Language header:', error);
  }

  // Priority 4: Fallback to default locale
  return defaultLocale;
}

/**
 * Gets locale from URL pathname
 */
export function getLocaleFromPathname(pathname: string): string | undefined {
  const segments = pathname.split('/').filter(Boolean);
  const potentialLocale = segments[0];

  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale;
  }

  return undefined;
}
