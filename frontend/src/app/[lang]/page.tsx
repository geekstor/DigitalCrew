import { isValidLocale, type Locale } from "@/i18n/config";
import { useServerTranslation } from "@/i18n/server-hooks";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? (lang as Locale) : 'en';
  const { t } = await useServerTranslation(locale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <main className="flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('home.hero.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('home.hero.subtitle')}
        </p>
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
          <p className="text-gray-700">
            {t('home.content.ready')}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {t('home.content.waiting')} ({t('common.status.ready')} - {locale})
          </p>
        </div>
      </main>
    </div>
  );
}
