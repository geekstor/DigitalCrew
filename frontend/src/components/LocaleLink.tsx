'use client';

import Link, { type LinkProps } from 'next/link';
import { useTranslation } from '@/i18n/hooks';
import type { ReactNode } from 'react';

interface LocaleLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: ReactNode;
  className?: string;
}

/**
 * Link component that automatically preserves the current locale
 * Usage: <LocaleLink href="/about">About</LocaleLink>
 * Will render as: /en/about or /ja/about depending on current locale
 */
export function LocaleLink({ href, children, className, ...props }: LocaleLinkProps) {
  const { locale } = useTranslation();

  // Prepend locale to href if not already present
  const localizedHref = href.startsWith('/') && !href.startsWith(`/${locale}`)
    ? `/${locale}${href}`
    : href;

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
}
