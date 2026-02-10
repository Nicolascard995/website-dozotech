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

    return (
        <div className="flex items-center gap-3 text-xs font-bold tracking-widest">
            <button
                onClick={() => switchLocale('es')}
                className={`transition-colors duration-300 ${locale === 'es' ? 'text-cyan' : 'text-slate-500 hover:text-white'}`}
            >
                ES
            </button>
            <span className="text-slate-700">/</span>
            <button
                onClick={() => switchLocale('en')}
                className={`transition-colors duration-300 ${locale === 'en' ? 'text-cyan' : 'text-slate-500 hover:text-white'}`}
            >
                EN
            </button>
            <span className="text-slate-700">/</span>
            <button
                onClick={() => switchLocale('de')}
                className={`transition-colors duration-300 ${locale === 'de' ? 'text-cyan' : 'text-slate-500 hover:text-white'}`}
            >
                DE
            </button>
        </div>
    );
}
