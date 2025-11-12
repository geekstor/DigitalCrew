# Internationalization (i18n) Guide

This project uses react-intl for internationalization with Next.js App Router.

## Usage

### Navigation with Locale Preservation

#### Links
Use `LocaleLink` instead of Next.js `Link` to automatically preserve locale:

```tsx
import { LocaleLink } from '@/components/LocaleLink';

<LocaleLink href="/about">About</LocaleLink>
// Renders as /en/about or /ja/about depending on current locale
```

#### Programmatic Navigation
Use the custom `useRouter` hook for locale-aware navigation:

```tsx
import { useRouter } from '@/i18n/navigation';

const router = useRouter();
router.push('/contact'); // Navigates to /en/contact or /ja/contact
```

#### Forms
Use `LocaleForm` to preserve locale in form submissions:

```tsx
import { LocaleForm } from '@/components/LocaleForm';

<LocaleForm action="/api/submit">
  <input name="email" type="email" />
  <button type="submit">Submit</button>
</LocaleForm>
```

### Translations

#### Client Components
```tsx
'use client';
import { useTranslation } from '@/i18n/hooks';

export function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('common.app.title')}</h1>;
}
```

#### Server Components
```tsx
import { useServerTranslation } from '@/i18n/server-hooks';

export default async function Page({ params }) {
  const { t } = await useServerTranslation(params.lang);
  return <h1>{t('common.app.title')}</h1>;
}
```

## Supported Locales

- English (en)
- Japanese (ja)
