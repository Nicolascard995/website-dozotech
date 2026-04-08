'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

interface LanguageSwitcherProps {
    theme?: 'light' | 'dark';
}

export default function LanguageSwitcher({ theme = 'light' }: LanguageSwitcherProps) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    const langs = ['es', 'en', 'de'] as const;
    const inactiveClass =
        theme === 'dark'
            ? 'text-cream/70 hover:text-cream'
            : 'text-ink-muted hover:text-ink';
    const separatorClass = theme === 'dark' ? 'text-cream/30' : 'text-ink-muted/40';

    return (
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest">
            {langs.map((lang, i) => (
                <span key={lang} className="flex items-center gap-3">
                    <button
                        onClick={() => switchLocale(lang)}
                        className={`transition-colors duration-200 uppercase ${
                            locale === lang ? 'text-ember font-medium' : inactiveClass
                        }`}
                    >
                        {lang}
                    </button>
                    {i < langs.length - 1 && <span className={separatorClass}>/</span>}
                </span>
            ))}
        </div>
    );
}
