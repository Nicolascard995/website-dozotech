'use client';
import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Hero() {
    const t = useTranslations('Hero');
    const [activeVideo, setActiveVideo] = useState(1);
    const videoRef1 = useRef<HTMLVideoElement>(null);
    const videoRef2 = useRef<HTMLVideoElement>(null);
    // Expert touch: Buffer duration to overlap videos before one ends (preventing freeze)
    const FADE_DURATION = 2.5;

    const handleTimeUpdate = () => {
        const currentRef = activeVideo === 1 ? videoRef1 : videoRef2;
        const nextRef = activeVideo === 1 ? videoRef2 : videoRef1;

        if (currentRef.current && nextRef.current) {
            const timeLeft = currentRef.current.duration - currentRef.current.currentTime;

            // Seamless loop logic
            if (timeLeft <= FADE_DURATION && nextRef.current.paused) {
                nextRef.current.currentTime = 0;
                nextRef.current.play().catch(() => { });
                setActiveVideo(prev => prev === 1 ? 2 : 1);
            }
        }
    };

    // Ensure video plays on mount
    useEffect(() => {
        if (videoRef1.current) {
            videoRef1.current.play().catch(() => { });
        }
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-obsidian">
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-transparent z-10" />

                {/* Dual Video Player for Seamless Loop */}
                <video
                    ref={videoRef1}
                    onTimeUpdate={activeVideo === 1 ? handleTimeUpdate : undefined}
                    className={`absolute inset-0 w-full h-full object-cover grayscale scale-105 transition-opacity duration-[2000ms] ease-in-out ${activeVideo === 1 ? 'opacity-30 z-1' : 'opacity-0 z-0'}`}
                    muted
                    playsInline
                    loop={false} // Managed manually for crossfade
                >
                    <source src="/video/Chef_s_Kitchen_Pass_Timelapse_Video.mp4" type="video/mp4" />
                </video>

                <video
                    ref={videoRef2}
                    onTimeUpdate={activeVideo === 2 ? handleTimeUpdate : undefined}
                    className={`absolute inset-0 w-full h-full object-cover grayscale scale-105 transition-opacity duration-[2000ms] ease-in-out ${activeVideo === 2 ? 'opacity-30 z-1' : 'opacity-0 z-0'}`}
                    muted
                    playsInline
                    loop={false}
                >
                    <source src="/video/Chef_s_Kitchen_Pass_Timelapse_Video.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-20">
                <div className="max-w-4xl border-l-2 border-acid-lime/30 pl-8 md:pl-12">
                    <div className="overflow-visible group">
                        <h1
                            className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter relative"
                            data-text={t('title_part1') + " " + t('title_part2')}
                        >
                            <span className="relative z-10 block group-hover:translate-x-1 transition-transform duration-200">{t('title_part1')}</span>
                            <span className="relative z-10 block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 group-hover:-translate-x-1 transition-transform duration-200">
                                {t('title_part2')}
                            </span>

                            {/* Chromatic Aberration Effect (Pseudo-element simulation) */}
                            <span className="absolute top-0 left-0 -ml-1 text-acid-lime/40 opacity-0 group-hover:opacity-100 transition-opacity duration-100 select-none pointer-events-none mix-blend-screen animate-pulse">
                                {t('title_part1')}<br />{t('title_part2')}
                            </span>
                            <span className="absolute top-0 left-0 ml-1 text-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-100 select-none pointer-events-none mix-blend-screen animate-pulse delay-75">
                                {t('title_part1')}<br />{t('title_part2')}
                            </span>
                        </h1>
                    </div>

                    <p className="mt-8 text-xl md:text-2xl text-slate-400 leading-relaxed font-light max-w-lg font-sans">
                        {t('subtitle_prefix')} <span className="text-acid-lime font-bold italic neon-text">{t('subtitle_highlight')}</span>{t('subtitle_suffix')} <span className="text-white font-medium">{t('remote')}</span>
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4">
                        <button className="px-10 py-5 bg-acid-lime text-obsidian font-black rounded-full text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,255,0,0.4)] hover:shadow-[0_0_40px_rgba(212,255,0,0.6)]">
                            {t('cta')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Animated Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-acid-lime to-transparent relative overflow-hidden">
                    <motion.div
                        animate={{ y: [0, 100] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-acid-lime"
                    />
                </div>
                <span className="text-acid-lime text-[10px] uppercase tracking-[0.3em] font-mono opacity-60">
                    Scroll
                </span>
            </motion.div>

            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-acid-lime/20 to-transparent animate-[scan_4s_ease-in-out_infinite]" />
        </section>
    );
}
