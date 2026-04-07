import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";

export const metadata = {
    metadataBase: new URL('https://lesouschef.com'),
    title: {
        template: '%s | Le Sous Chef',
        default: 'Le Sous Chef — Kitchen OS for independent restaurants'
    },
    description: 'Built by a chef, for chefs. The operating system that gives you back the reason you cook.',
    openGraph: {
        title: 'Le Sous Chef — Kitchen OS for independent restaurants',
        description: 'Built by a chef, for chefs. The operating system that gives you back the reason you cook.',
        url: 'https://lesouschef.com',
        siteName: 'Le Sous Chef',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Le Sous Chef — Kitchen OS for independent restaurants',
        description: 'Built by a chef, for chefs. The operating system that gives you back the reason you cook.',
    },
};

import JsonLd from '../../components/atoms/JsonLd';

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className="antialiased">
                <NextIntlClientProvider messages={messages}>
                    <JsonLd />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
