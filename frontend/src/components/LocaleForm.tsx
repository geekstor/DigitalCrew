'use client';

import { useTranslation } from '@/i18n/hooks';
import { type FormEvent, type ReactNode } from 'react';

interface LocaleFormProps {
  action: string;
  method?: 'GET' | 'POST';
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  className?: string;
}

/**
 * Form component that automatically includes locale in the action URL
 * Usage: <LocaleForm action="/api/submit">...</LocaleForm>
 * Will submit to: /en/api/submit or /ja/api/submit depending on current locale
 */
export function LocaleForm({
  action,
  method = 'POST',
  onSubmit,
  children,
  className,
}: LocaleFormProps) {
  const { locale } = useTranslation();

  // Prepend locale to action if not already present
  const localizedAction = action.startsWith('/') && !action.startsWith(`/${locale}`)
    ? `/${locale}${action}`
    : action;

  return (
    <form
      action={localizedAction}
      method={method}
      onSubmit={onSubmit}
      className={className}
    >
      <input type="hidden" name="locale" value={locale} />
      {children}
    </form>
  );
}
