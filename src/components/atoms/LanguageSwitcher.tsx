'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    const langs = ['es', 'en', 'de'] as const;

    return (
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest">
            {langs.map((lang, i) => (
                <span key={lang} className="flex items-center gap-3">
                    <button
                        onClick={() => switchLocale(lang)}
                        className={`transition-colors duration-200 uppercase ${
                            locale === lang
                                ? 'text-ember font-medium'
                                : 'text-ink-muted hover:text-ink'
                        }`}
                    >
                        {lang}
                    </button>
                    {i < langs.length - 1 && (
                        <span className="text-ink-muted/40">/</span>
                    )}
                </span>
            ))}
        </div>
    );
}
