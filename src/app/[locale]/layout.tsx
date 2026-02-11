import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import "../globals.css";

const bricolage = Bricolage_Grotesque({
    subsets: ['latin'],
    variable: '--font-bricolage',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL('https://dozo.tech'),
    title: {
        template: '%s | Dozo Tech',
        default: 'Dozo Tech'
    },
    description: 'Sistemas que respiran.',
    openGraph: {
        title: 'Dozo Tech',
        description: 'Sistemas que respiran.',
        url: 'https://dozo.tech',
        siteName: 'Dozo Tech',
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dozo Tech',
        description: 'Sistemas que respiran.',
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
        <html lang={locale} className={`${GeistSans.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}>
            <body className="font-sans antialiased bg-obsidian text-foreground custom-scrollbar overflow-x-hidden selection:bg-acid-lime selection:text-obsidian">
                <NextIntlClientProvider messages={messages}>
                    <JsonLd />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
