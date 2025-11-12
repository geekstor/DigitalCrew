'use client';

import { IntlProvider as ReactIntlProvider } from 'react-intl';
import type { ReactNode } from 'react';
import type { Locale } from './config';

interface IntlProviderProps {
  locale: Locale;
  messages: Record<string, any>;
  children: ReactNode;
}

export function IntlProvider({ locale, messages, children }: IntlProviderProps) {
  return (
    <ReactIntlProvider
      locale={locale}
      messages={messages}
      defaultLocale="en"
      onError={(err) => {
        if (err.code === 'MISSING_TRANSLATION') {
          console.warn('Missing translation', err.message);
          return;
        }
        throw err;
      }}
    >
      {children}
    </ReactIntlProvider>
  );
}
