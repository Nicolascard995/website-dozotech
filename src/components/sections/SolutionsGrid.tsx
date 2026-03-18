"use client";

import { useTranslations } from "next-intl";
import { Search, ShieldCheck, BarChart3, ArrowRight } from "lucide-react";
import TiltCard from "../atoms/TiltCard";
import { motion } from "framer-motion";
import { useState } from "react";
import RadarQuizModal from "../organisms/RadarQuizModal";
import ControlQualifyModal from "../organisms/ControlQualifyModal";
import SolutionDetailModal from "../organisms/SolutionDetailModal";
import { AnimatePresence } from "framer-motion";

export default function SolutionsGrid() {
    const t = useTranslations("solutions");
    const [isRadarOpen, setIsRadarOpen] = useState(false);
    const [isControlOpen, setIsControlOpen] = useState(false);
    const [activeProduct, setActiveProduct] = useState<string | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

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
        <section id="soluciones" className="py-20 md:py-32 bg-obsidian relative overflow-hidden">
            <RadarQuizModal isOpen={isRadarOpen} onClose={() => setIsRadarOpen(false)} />
            <ControlQualifyModal isOpen={isControlOpen} onClose={() => setIsControlOpen(false)} />

            <AnimatePresence>
                {isDetailOpen && (
                    <SolutionDetailModal
                        isOpen={isDetailOpen}
                        productKey={activeProduct}
                        onClose={() => setIsDetailOpen(false)}
                        onAction={() => {
                            const product = products.find(p => p.key === activeProduct);
                            if (product) {
                                product.action();
                                setIsDetailOpen(false);
                            }
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#d4ff0008,_transparent_50%)] z-0 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Intro */}
                <div className="mb-12 md:mb-20 text-center">
                    <span className="text-acid-lime font-mono text-sm uppercase mb-4 md:mb-6 block tracking-widest neon-text">
                        {t("badge")}
                    </span>
                    <p className="text-xl md:text-3xl font-light text-slate-300 max-w-2xl mx-auto leading-relaxed font-display px-4 md:px-0">
                        "{t("intro")}"
                    </p>
                </div>

                {/* Products List */}
                <div className="grid lg:grid-cols-3 gap-8 md:gap-12 lg:gap-8 mb-24">
                    {products.map((product, idx) => (
                        <TiltCard
                            key={idx}
                            className={`rounded-[2rem] bg-surface border ${product.highlight ? 'border-acid-lime/20' : 'border-white/5'} relative overflow-hidden group p-6 md:p-8 lg:p-8 h-full flex flex-col`}
                            glowColor={product.highlight ? "rgba(212, 255, 0, 0.2)" : "rgba(255, 255, 255, 0.1)"}
                            onClick={() => {
                                setActiveProduct(product.key);
                                setIsDetailOpen(true);
                            }}
                        >
                            <div className="flex flex-col gap-6 lg:gap-8 items-start h-full w-full">
                                {/* Left Content */}
                                <div>
                                    <div className="w-14 h-14 md:w-16 md:h-16 lg:w-12 lg:h-12 rounded-2xl bg-acid-lime/10 flex items-center justify-center mb-6 md:mb-8 lg:mb-6 border border-acid-lime/20">
                                        {product.icon}
                                    </div>
                                    <h3 className="text-2xl md:text-4xl lg:text-2xl font-black text-white mb-3 md:mb-4 tracking-tight font-display">
                                        {t(`${product.key}.title`)}
                                    </h3>
                                    <p className="text-lg md:text-xl lg:text-base text-acid-lime font-mono mb-6">
                                        {t(`${product.key}.subtitle`)}
                                    </p>

                                    <div className="space-y-4 mb-8">
                                        <div className="space-y-2">
                                            <ul className="space-y-3">
                                                {[0, 1].map((i) => {
                                                    try {
                                                        const feature = t(`${product.key}.features.${i}`);
                                                        return feature ? (
                                                            <li key={i} className="flex items-start gap-3 text-slate-400 text-sm md:text-base">
                                                                <span className="text-acid-lime mt-1">•</span>
                                                                <span>{feature}</span>
                                                            </li>
                                                        ) : null;
                                                    } catch (e) { return null; }
                                                })}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 mt-auto w-full">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                product.action();
                                            }}
                                            className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-xl hover:bg-white hover:text-obsidian transition-all uppercase tracking-widest text-xs"
                                        >
                                            {t(`${product.key}.cta`)}
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveProduct(product.key);
                                                setIsDetailOpen(true);
                                            }}
                                            className="w-full flex items-center justify-center gap-2 text-acid-lime font-bold text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                                        >
                                            {t("label_view_details")}
                                            <ArrowRight className="w-3 h-3" />
                                        </button>
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
