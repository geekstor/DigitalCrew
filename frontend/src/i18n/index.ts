// Config
export { locales, defaultLocale, isValidLocale, type Locale } from './config';

// Client-side hooks
export { useTranslation, type TranslationKey } from './hooks';

// Navigation
export { useRouter } from './navigation';

// Server-side utilities
export { useServerTranslation } from './server-hooks';
export { getTranslations, getNamespace } from './get-translations';

// Provider
export { IntlProvider } from './IntlProvider';

// Types
export type { Translations } from './get-translations';
