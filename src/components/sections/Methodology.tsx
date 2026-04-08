'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '../atoms/ScrollReveal';

const stepIds = ['01', '02', '03'] as const;

export default function Methodology() {
    const t = useTranslations('Methodology');

    return (
        <section
            id="how-it-works"
            className="py-24 md:py-32 bg-ink relative overflow-hidden"
            style={{ paddingLeft: 'clamp(20px,5vw,80px)', paddingRight: 'clamp(20px,5vw,80px)' }}
        >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <span className="absolute right-[-8%] top-12 font-display italic text-[22vw] leading-none text-cream/[0.05]">
                    service
                </span>
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                <ScrollReveal mode="slide-up">
                    <div className="max-w-[660px] mb-16 md:mb-20">
                        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember mb-4">
                            {t('badge')}
                        </p>
                        <h2
                            className="font-display italic text-cream leading-[1.08]"
                            style={{ fontSize: 'clamp(34px,4vw,58px)' }}
                        >
                            {t('title')}
                        </h2>
                        <p className="mt-6 text-[17px] leading-relaxed text-cream/70 font-light">
                            {t('subtitle')}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid gap-10 md:grid-cols-3 border-t border-cream/10">
                    {stepIds.map((stepId, index) => (
                        <ScrollReveal
                            key={stepId}
                            mode="slide-up"
                            delay={index * 0.12}
                            className={`pt-8 md:pt-10 ${index === 0 ? '' : 'md:border-l md:border-cream/10 md:pl-8'}`}
                        >
                            <article className="h-full">
                                <p className="font-mono text-[11px] uppercase tracking-[0.34em] text-ember/80 mb-5">
                                    {stepId}
                                </p>
                                <h3 className="font-display italic text-[30px] leading-tight text-cream mb-4">
                                    {t(`steps.${stepId}.title`)}
                                </h3>
                                <p className="text-[16px] leading-relaxed text-cream/70 font-light">
                                    {t(`steps.${stepId}.desc`)}
                                </p>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>

                <ScrollReveal mode="fade" delay={0.3}>
                    <p className="mt-12 max-w-[760px] font-mono text-[11px] uppercase tracking-[0.18em] text-cream/50">
                        {t('footnote')}
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
}
