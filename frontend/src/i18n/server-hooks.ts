import 'server-only';
import { getTranslations } from './get-translations';
import type { Locale } from './config';
import { flattenMessages } from './flatten-messages';

/**
 * Server-side translation helper
 * Use this in Server Components to access translations
 *
 * @param locale - Current locale
 * @returns Translation function
 *
 * @example
 * const t = await useServerTranslation('en');
 * const title = t('common.app.title');
 */
export async function useServerTranslation(locale: Locale) {
  const translations = await getTranslations(locale);
  const flatMessages = flattenMessages(translations);

  /**
   * Get translated message by key
   * Supports variable interpolation (basic string replacement)
   *
   * @param key - Translation key (e.g., 'common.app.title')
   * @param values - Optional values for interpolation
   * @returns Translated string
   */
  const t = (key: string, values?: Record<string, string | number>): string => {
    let message = flatMessages[key];

    if (!message) {
      console.warn(`Missing translation for key: "${key}"`);
      return key;
    }

    // Simple variable interpolation for server components
    if (values) {
      Object.keys(values).forEach((varKey) => {
        message = message.replace(
          new RegExp(`\\{${varKey}\\}`, 'g'),
          String(values[varKey])
        );
      });
    }

    return message;
  };

  return { t, locale };
}
