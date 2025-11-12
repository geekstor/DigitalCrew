'use client';

import { useTranslation } from '@/i18n/hooks';
import { locales } from '@/i18n/config';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export function LanguageSwitcher() {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return;

    // Save locale preference to cookie
    document.cookie = `${LOCALE_COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    // Save to localStorage as backup
    try {
      localStorage.setItem(LOCALE_COOKIE_NAME, newLocale);
    } catch (error) {
      console.warn('Failed to save locale to localStorage:', error);
    }

    // Replace the locale in the pathname while preserving the rest of the path
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = newLocale;
    const newPath = `/${segments.join('/')}`;

    // Use startTransition for smoother navigation
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-md p-2 flex gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          disabled={isPending}
          className={`px-3 py-1 rounded transition-colors ${
            locale === loc
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={`Switch to ${loc}`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
