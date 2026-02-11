'use client';
import { useTranslations } from 'next-intl';
import { TrendingUp, Search, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../atoms/ScrollReveal';
import { useState } from 'react';
import RadarQuizModal from '../organisms/RadarQuizModal';

export default function Methodology() {
    const t = useTranslations('Methodology');
    const [isRadarOpen, setIsRadarOpen] = useState(false);

    const steps = [
        {
            id: "01",
            title: t('steps.01.title'),
            desc: t('steps.01.desc'),
            icon: <Search className="w-6 h-6 text-acid-lime" />
        },
        {
            id: "02",
            title: t('steps.02.title'),
            desc: t('steps.02.desc'),
            icon: <TrendingUp className="w-6 h-6 text-acid-lime" />
        },
        {
            id: "03",
            title: t('steps.03.title'),
            desc: t('steps.03.desc'),
            icon: <ChefHat className="w-6 h-6 text-acid-lime" />,
            cta: t('steps.03.cta')
        }
    ];

    return (
        <section id="metodologia" className="py-32 bg-[#0f1117] relative overflow-hidden">
            <RadarQuizModal isOpen={isRadarOpen} onClose={() => setIsRadarOpen(false)} />

            {/* Background Mono Typography */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] flex items-center justify-center overflow-hidden">
                <span className="text-[15vw] font-mono font-bold text-white leading-none whitespace-nowrap">
                    MISE EN PLACE
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <ScrollReveal mode="slide-up">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
                            {t('title')}
                        </h2>
                        <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
                            {t('subtitle')}
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Visual Flow Connector (Animated SVG) */}
                    <div className="hidden md:block absolute top-16 left-0 w-full h-20 z-0 pointer-events-none">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                            <motion.path
                                d="M 100,32 C 300,32 500,32 700,32 C 900,32 1100,32 1300,32"
                                fill="transparent"
                                strokeWidth="1"
                                stroke="rgba(212, 255, 0, 0.3)"
                                strokeDasharray="10 10"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                            <motion.path
                                d="M 100,32 C 300,32 500,32 700,32 C 900,32 1100,32 1300,32"
                                fill="transparent"
                                strokeWidth="2"
                                stroke="var(--color-acid-lime)"
                                strokeDasharray="0 1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                            />
                        </svg>
                    </div>

                    {steps.map((step, idx) => (
                        <ScrollReveal key={idx} mode="slide-up" delay={idx * 0.2} className="relative z-10 group bg-surface/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm hover:border-acid-lime/50 transition-colors duration-500 flex flex-col items-start h-full">
                            <div className="w-16 h-16 rounded-2xl bg-obsidian border border-white/10 flex items-center justify-center mb-8 group-hover:bg-acid-lime/10 group-hover:scale-110 transition-all duration-500 shadow-xl relative">
                                {step.icon}
                                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-acid-lime text-obsidian font-black text-xs flex items-center justify-center shadow-[0_0_15px_rgba(212,255,0,0.5)]">
                                    {step.id}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 font-display tracking-tight">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm flex-grow">{step.desc}</p>

                            {step.cta && (
                                <button
                                    onClick={() => setIsRadarOpen(true)}
                                    className="mt-6 text-acid-lime font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
                                >
                                    {step.cta}
                                </button>
                            )}
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

