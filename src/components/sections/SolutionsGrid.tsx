"use client";

import { useTranslations } from "next-intl";
import { Search, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";
import TiltCard from "../atoms/TiltCard";
import { motion } from "framer-motion";
import { useState } from "react";
import RadarQuizModal from "../organisms/RadarQuizModal";
import ControlQualifyModal from "../organisms/ControlQualifyModal";

export default function SolutionsGrid() {
    const t = useTranslations("solutions");
    const [isRadarOpen, setIsRadarOpen] = useState(false);
    const [isControlOpen, setIsControlOpen] = useState(false);

    // Products config to map to translations keys
    const products = [
        {
            key: "audit",
            icon: <Search className="w-8 h-8 text-acid-lime" />,
            action: () => setIsRadarOpen(true),
            highlight: false
        },
        {
            key: "noshow",
            icon: <ShieldCheck className="w-8 h-8 text-acid-lime" />,
            action: () => document.getElementById("shield-calculator")?.scrollIntoView({ behavior: "smooth" }),
            highlight: false
        },
        {
            key: "efficiency",
            icon: <BarChart3 className="w-8 h-8 text-acid-lime" />,
            action: () => setIsControlOpen(true),
            highlight: true
        }
    ];

    return (
        <section id="soluciones" className="py-32 bg-obsidian relative overflow-hidden">
            <RadarQuizModal isOpen={isRadarOpen} onClose={() => setIsRadarOpen(false)} />
            <ControlQualifyModal isOpen={isControlOpen} onClose={() => setIsControlOpen(false)} />

            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#d4ff0008,_transparent_50%)] z-0 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Intro */}
                <div className="mb-20 text-center">
                    <span className="text-acid-lime font-mono text-sm uppercase mb-6 block tracking-widest neon-text">
                        {t("badge")}
                    </span>
                    <p className="text-2xl md:text-3xl font-light text-slate-300 max-w-2xl mx-auto leading-relaxed font-display">
                        "{t("intro")}"
                    </p>
                </div>

                {/* Products List */}
                <div className="flex flex-col gap-16 mb-24">
                    {products.map((product, idx) => (
                        <TiltCard
                            key={idx}
                            className={`rounded-[2rem] bg-surface border ${product.highlight ? 'border-acid-lime/20' : 'border-white/5'} relative overflow-hidden group p-8 md:p-12`}
                            glowColor={product.highlight ? "rgba(212, 255, 0, 0.2)" : "rgba(255, 255, 255, 0.1)"}
                            onClick={product.action}
                        >
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                {/* Left Content */}
                                <div>
                                    <div className="w-16 h-16 rounded-2xl bg-acid-lime/10 flex items-center justify-center mb-8 border border-acid-lime/20">
                                        {product.icon}
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight font-display">
                                        {t(`${product.key}.title`)}
                                    </h3>
                                    <p className="text-xl text-acid-lime font-mono mb-6">
                                        {t(`${product.key}.subtitle`)}
                                    </p>

                                    <div className="space-y-6">
                                        <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                            <span className="text-slate-400 text-sm uppercase tracking-widest block mb-2 font-bold">{t("label_problem")}</span>
                                            <p className="text-slate-300">{t(`${product.key}.problem`)}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <span className="text-slate-400 text-sm uppercase tracking-widest block mb-2 font-bold">{t("label_features")}</span>
                                            <ul className="space-y-2">
                                                {/* We need to get the array from translations. 
                                                    Since useTranslations returns an object/string, we can use 0,1,2,3 keys if array, 
                                                    or just hardcode known length if it's fixed. 
                                                    Ideally next-intl supports arrays. 
                                                    Let's use raw properties or specific keys. 
                                                    Actually next-intl `t.raw('key')` returns the object/array.
                                                */}
                                                {[0, 1, 2, 3].map((i) => {
                                                    try {
                                                        const feature = t(`${product.key}.features.${i}`);
                                                        return feature ? (
                                                            <li key={i} className="flex items-start gap-3 text-slate-400">
                                                                <span className="text-acid-lime mt-1">•</span>
                                                                <span>{feature}</span>
                                                            </li>
                                                        ) : null;
                                                    } catch (e) { return null; }
                                                })}
                                            </ul>
                                        </div>

                                        <div>
                                            <span className="text-slate-400 text-sm uppercase tracking-widest block mb-2 font-bold">{t("label_result")}</span>
                                            <p className="text-white font-medium">{t(`${product.key}.result`)}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            product.action();
                                        }}
                                        className="mt-10 flex items-center gap-3 text-acid-lime font-bold text-sm uppercase tracking-widest group/btn hover:text-white transition-colors"
                                    >
                                        {t(`${product.key}.cta`)}
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                    </button>
                                </div>

                                {/* Right Content (Visual/Target) */}
                                <div className="h-full flex flex-col justify-center">
                                    <div className="bg-obsidian/50 rounded-2xl p-8 border border-white/5 text-center">
                                        <span className="text-slate-500 text-sm uppercase tracking-widest block mb-4">{t("label_target")}</span>
                                        <p className="text-white text-lg font-light leading-relaxed">
                                            "{t(`${product.key}.target`)}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </div>

                {/* Results Banner */}
                <div className="w-full">
                    <TiltCard
                        className="w-full bg-acid-lime rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group relative overflow-hidden"
                        glowColor="#ffffff"
                    >
                        <div className="max-w-md relative z-10">
                            <h3 className="text-3xl md:text-4xl font-black text-obsidian mb-4 tracking-tight leading-[0.9] font-display">
                                {t("results.title")}
                            </h3>
                            <p className="text-obsidian/70 font-bold font-mono tracking-tight">
                                {t("results.subtitle")}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-12 w-full md:w-auto relative z-10">
                            <div className="text-center md:text-left">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="block font-mono font-black text-5xl md:text-6xl text-obsidian tracking-tighter"
                                >
                                    {t("results.revenue.value")}
                                </motion.span>
                                <span className="text-xs font-black uppercase text-obsidian/60 tracking-widest">
                                    {t("results.revenue.label")}
                                </span>
                            </div>
                            <div className="text-center md:text-left">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="block font-mono font-black text-5xl md:text-6xl text-obsidian tracking-tighter"
                                >
                                    {t("results.tables.value")}
                                </motion.span>
                                <span className="text-xs font-black uppercase text-obsidian/60 tracking-widest">
                                    {t("results.tables.label")}
                                </span>
                            </div>
                        </div>
                        {/* Noise texture overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 mix-blend-multiply pointer-events-none"></div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
}
