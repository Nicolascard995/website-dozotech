'use client';

import { useTranslations } from 'next-intl';

export default function FounderBanner() {
    const t = useTranslations('FounderBanner');
    const repeats = Array.from({ length: 6 });

    return (
        <div className="w-full bg-ink py-3 overflow-hidden whitespace-nowrap border-y border-cream/10">
            <div className="flex animate-marquee min-w-max">
                {repeats.map((_, i) => (
                    <span
                        key={i}
                        className="text-cream/76 font-mono text-[11px] uppercase tracking-[0.32em] mx-8"
                    >
                        {t('text')}
                    </span>
                ))}
            </div>
        </div>
    );
}
