'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

function KnifeIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="inline-block"
            aria-hidden="true"
        >
            <path d="M19 3L5 17l-2 4 4-2L21 5a2 2 0 0 0-2-2z" />
            <path d="M14 8l2 2" />
        </svg>
    );
}

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative min-h-[100svh] md:min-h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: 'grayscale(100%)' }}
                    autoPlay
                    muted
                    playsInline
                    loop
                >
                    <source src="/video/Chef_s_Kitchen_Pass_Timelapse_Video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/55 to-ink/88" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,79,43,0.22),transparent_36%)]" />
            </div>

            <div
                className="relative z-10 grid min-h-[100svh] md:min-h-screen w-full"
                style={{ paddingLeft: 'clamp(20px, 5vw, 80px)', paddingRight: 'clamp(20px, 5vw, 80px)' }}
            >
                <div
                    className="max-w-[700px] self-center w-full"
                    style={{
                        paddingTop: 'clamp(74px, 9vh, 108px)',
                        paddingBottom: 'clamp(72px, 10vh, 116px)',
                    }}
                >
                    <div className="animate-fade-up d1 flex items-center gap-2 text-ember font-mono text-[11px] tracking-widest uppercase mb-4">
                        <KnifeIcon />
                        <span>{t('eyebrow')}</span>
                    </div>

                    <p className="animate-fade-up d2 font-mono text-[11px] uppercase tracking-[0.4em] text-cream/78 mb-4">
                        Le Sous Chef
                    </p>

                    <h1
                        className="animate-fade-up d3 font-display font-normal text-cream leading-[0.97] mb-6 md:mb-7"
                        style={{ fontSize: 'clamp(40px, 5.8vw, 78px)' }}
                    >
                        <span className="block">{t('line1')}</span>
                        <span className="block italic">{t('line2')}</span>
                        <span className="block">{t('line3')}</span>
                    </h1>

                    <p
                        className="animate-fade-up d4 font-body font-light text-cream/76 max-w-[620px] mb-7 md:mb-8 leading-[1.42]"
                        style={{ fontSize: 'clamp(15px, 1.65vw, 19px)' }}
                    >
                        {t('subtitle')}
                    </p>

                    <div className="animate-fade-up d5 flex flex-wrap gap-4">
                        <a
                            href="#contact"
                            className="bg-ember text-cream text-sm font-medium px-6 py-[0.7rem] rounded-[3px] hover:opacity-90 transition-opacity"
                        >
                            {t('cta_primary')}
                        </a>
                        <a
                            href="#how-it-works"
                            className="border border-cream/40 text-cream bg-transparent text-sm font-medium px-6 py-[0.7rem] rounded-[3px] hover:bg-cream/10 transition-colors"
                        >
                            {t('cta_secondary')}
                        </a>
                    </div>

                    <p className="animate-fade-up d5 mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/56">
                        {t('support')}
                    </p>
                </div>
            </div>

            <motion.div
                className="animate-fade-up d5 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 text-cream/50"
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                <span className="font-mono text-xs tracking-widest uppercase">{t('scroll')}</span>
            </motion.div>
        </section>
    );
}
