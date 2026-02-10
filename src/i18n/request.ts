import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
    // Validate that the incoming `locale` parameter is valid
    const locale = await requestLocale;

    if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
        notFound();
    }

    return {
        locale,
        messages: (await import(`../locales/${locale}.json`)).default
    };
});
