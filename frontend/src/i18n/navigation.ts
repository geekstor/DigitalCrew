'use client';

import { useRouter as useNextRouter, usePathname } from 'next/navigation';
import { useTranslation } from './hooks';
import { useCallback } from 'react';

/**
 * Custom router hook that preserves locale in navigation
 * Wraps Next.js router with locale-aware navigation
 */
export function useRouter() {
  const router = useNextRouter();
  const { locale } = useTranslation();
  const pathname = usePathname();

  /**
   * Navigate to a path while preserving the current locale
   * @param path - The path to navigate to (without locale prefix)
   * @param options - Next.js navigation options
   */
  const push = useCallback(
    (path: string, options?: { scroll?: boolean }) => {
      // If path already includes locale, use it as-is
      if (path.startsWith(`/${locale}`) || !path.startsWith('/')) {
        router.push(path, options);
        return;
      }

      // Prepend current locale to the path
      const localizedPath = `/${locale}${path}`;
      router.push(localizedPath, options);
    },
    [router, locale]
  );

  /**
   * Replace current route while preserving locale
   */
  const replace = useCallback(
    (path: string, options?: { scroll?: boolean }) => {
      if (path.startsWith(`/${locale}`) || !path.startsWith('/')) {
        router.replace(path, options);
        return;
      }

      const localizedPath = `/${locale}${path}`;
      router.replace(localizedPath, options);
    },
    [router, locale]
  );

  /**
   * Get current pathname without locale prefix
   */
  const getPathnameWithoutLocale = useCallback(() => {
    return pathname.replace(`/${locale}`, '') || '/';
  }, [pathname, locale]);

  return {
    push,
    replace,
    back: router.back,
    forward: router.forward,
    refresh: router.refresh,
    prefetch: router.prefetch,
    pathname: getPathnameWithoutLocale(),
    locale,
  };
}
