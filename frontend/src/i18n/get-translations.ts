import 'server-only';
import { defaultLocale, type Locale } from './config';

export type Translations = {
  common: Record<string, any>;
  home: Record<string, any>;
};

const translationCache = new Map<Locale, Translations>();

/**
 * Loads a single translation file with fallback to default locale
 */
async function loadTranslationFile(
  locale: Locale,
  namespace: keyof Translations
): Promise<Record<string, any>> {
  try {
    const module = await import(`./locales/${locale}/${namespace}.json`);
    return module.default;
  } catch (error) {
    console.warn(
      `Failed to load translation file for locale "${locale}", namespace "${namespace}". Falling back to default locale "${defaultLocale}".`,
      error
    );

    // Fallback to default locale if current locale fails
    if (locale !== defaultLocale) {
      try {
        const fallbackModule = await import(`./locales/${defaultLocale}/${namespace}.json`);
        return fallbackModule.default;
      } catch (fallbackError) {
        console.error(
          `Failed to load fallback translation file for default locale "${defaultLocale}", namespace "${namespace}".`,
          fallbackError
        );
        return {}; // Return empty object as last resort
      }
    }

    return {}; // Return empty object if default locale also fails
  }
}

/**
 * Loads all translations for a given locale with caching
 * Gracefully handles missing files by falling back to default locale
 */
export async function getTranslations(locale: Locale): Promise<Translations> {
  // Check cache first for performance
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  // Load all translation files for the locale
  const [common, home] = await Promise.all([
    loadTranslationFile(locale, 'common'),
    loadTranslationFile(locale, 'home'),
  ]);

  const translations: Translations = {
    common,
    home,
  };

  // Cache the translations for future requests
  translationCache.set(locale, translations);

  return translations;
}

/**
 * Loads a specific namespace for a given locale
 */
export async function getNamespace<T extends keyof Translations>(
  locale: Locale,
  namespace: T
): Promise<Translations[T]> {
  const translations = await getTranslations(locale);
  return translations[namespace];
}
