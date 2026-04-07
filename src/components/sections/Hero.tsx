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
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Video background */}
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
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink/80" />
            </div>

            {/* Content */}
            <div
                className="relative z-10 flex flex-col w-full pt-14 pb-24"
                style={{ paddingLeft: 'clamp(20px, 5vw, 80px)', paddingRight: 'clamp(20px, 5vw, 80px)' }}
            >
                {/* Eyebrow */}
                <div className="animate-fade-up d1 flex items-center gap-2 text-ember font-mono text-xs tracking-widest uppercase mb-6">
                    <KnifeIcon />
                    <span>{t('eyebrow')}</span>
                </div>

                {/* H1 */}
                <h1
                    className="animate-fade-up d2 font-display font-normal text-cream leading-[1.07] mb-8"
                    style={{ fontSize: 'clamp(44px, 7vw, 84px)' }}
                >
                    <span className="block">{t('line1')}</span>
                    <span className="block italic">{t('line2')}</span>
                    <span className="block">{t('line3')}</span>
                </h1>

                {/* Subtitle */}
                <p
                    className="animate-fade-up d3 font-body font-light text-cream/75 max-w-[500px] mb-10 leading-relaxed"
                    style={{ fontSize: 'clamp(16px, 2vw, 20px)' }}
                >
                    {t('subtitle')}
                </p>

                {/* CTAs */}
                <div className="animate-fade-up d4 flex flex-wrap gap-4">
                    <a
                        href="#contact"
                        className="bg-ember text-cream text-sm font-medium px-6 py-3 rounded-[3px] hover:opacity-90 transition-opacity"
                    >
                        {t('cta_primary')}
                    </a>
                    <a
                        href="#how-it-works"
                        className="border border-cream/40 text-cream bg-transparent text-sm font-medium px-6 py-3 rounded-[3px] hover:bg-cream/10 transition-colors"
                    >
                        {t('cta_secondary')}
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
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
