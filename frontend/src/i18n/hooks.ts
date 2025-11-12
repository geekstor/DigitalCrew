'use client';

import { useIntl } from 'react-intl';
import type { PrimitiveType, FormatXMLElementFn } from 'intl-messageformat';

/**
 * Hook to access translations in client components
 * Wraps react-intl's useIntl hook with a simplified API
 */
export function useTranslation() {
  const intl = useIntl();

  /**
   * Get translated message by key
   * Supports variable interpolation and handles missing keys gracefully
   *
   * @param key - Translation key (e.g., 'common.app.title')
   * @param values - Optional values for interpolation
   * @returns Translated string
   *
   * @example
   * const t = useTranslation();
   * t('common.app.title') // 'Kaizen AI'
   * t('common.greeting', { name: 'John' }) // 'Hello, John!'
   */
  const t = (
    key: string,
    values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>
  ): string => {
    try {
      return intl.formatMessage({ id: key }, values);
    } catch (error) {
      console.warn(`Missing translation for key: "${key}"`, error);
      // Return the key itself as fallback
      return key;
    }
  };

  return {
    t,
    locale: intl.locale,
    formatDate: intl.formatDate,
    formatTime: intl.formatTime,
    formatNumber: intl.formatNumber,
    formatRelativeTime: intl.formatRelativeTime,
    formatPlural: intl.formatPlural,
    formatList: intl.formatList,
  };
}

/**
 * Type-safe translation key helper
 * Can be extended to provide autocomplete for translation keys
 */
export type TranslationKey = string;
