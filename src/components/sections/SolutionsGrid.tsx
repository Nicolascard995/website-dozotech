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

    return (
        <section id="soluciones" className="py-32 bg-obsidian relative overflow-hidden">
            <RadarQuizModal isOpen={isRadarOpen} onClose={() => setIsRadarOpen(false)} />
            <ControlQualifyModal isOpen={isControlOpen} onClose={() => setIsControlOpen(false)} />

            {/* Background enhancement */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#d4ff0008,_transparent_50%)] z-0 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-acid-lime font-mono text-sm uppercase mb-4 block tracking-widest neon-text">
                            {t("badge")}
                        </span>
                        <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter decoration-clone leading-tight">
                            {t("title")}
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-12 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
                    {/* Radar (Main Large Card) */}
                    <div className="md:col-span-8 md:row-span-2">
                        <TiltCard
                            className="h-full rounded-[2rem] bg-surface border border-white/5 relative overflow-hidden group cursor-pointer"
                            onClick={() => setIsRadarOpen(true)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0 pointer-events-none" />
                            <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-between">
                                <div>
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                        className="w-16 h-16 rounded-2xl bg-acid-lime/10 flex items-center justify-center mb-8 border border-acid-lime/20"
                                    >
                                        <Search className="w-8 h-8 text-acid-lime" />
                                    </motion.div>
                                    <h3 className="text-4xl font-black text-white mb-6 tracking-tight font-display">
                                        {t("radar.title")}
                                    </h3>
                                    <p className="text-slate-400 text-xl font-light leading-relaxed max-w-lg">
                                        {t("radar.desc")}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsRadarOpen(true);
                                    }}
                                    className="flex items-center gap-3 text-acid-lime font-bold text-sm uppercase tracking-widest group/btn mt-8"
                                >
                                    {t("radar.cta")}{" "}
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                </button>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-acid-lime/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000 pointer-events-none"></div>
                        </TiltCard>
                    </div>

                    {/* Shield (Small Card) */}
                    <div className="md:col-span-4 md:row-span-1">
                        <TiltCard
                            className="h-full rounded-[2rem] bg-surface border border-white/5 relative overflow-hidden group p-8 cursor-pointer"
                            onClick={() =>
                                document
                                    .getElementById("shield-calculator")
                                    ?.scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: -10 }}
                                className="w-12 h-12 rounded-xl bg-acid-lime/10 flex items-center justify-center mb-6 border border-acid-lime/20"
                            >
                                <ShieldCheck className="w-6 h-6 text-acid-lime" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-tight font-display">
                                {t("shield.title")}
                            </h3>
                            <p className="text-slate-400 text-sm font-light leading-relaxed">
                                {t("shield.desc")}
                            </p>
                        </TiltCard>
                    </div>

                    {/* Tranquilidad (Small Card) */}
                    <div className="md:col-span-4 md:row-span-1">
                        <TiltCard
                            className="h-full rounded-[2rem] bg-surface border border-white/5 relative overflow-hidden group p-8 cursor-pointer"
                            onClick={() => setIsControlOpen(true)}
                        >
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 10 }}
                                className="w-12 h-12 rounded-xl bg-acid-lime/10 flex items-center justify-center mb-6 border border-acid-lime/20"
                            >
                                <BarChart3 className="w-6 h-6 text-acid-lime" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-white mb-3 tracking-tight font-display">
                                {t("tranquilidad.title")}
                            </h3>
                            <p className="text-slate-400 text-sm font-light leading-relaxed">
                                {t("tranquilidad.desc")}
                            </p>
                        </TiltCard>
                    </div>
                </div>

                {/* Results Banner */}
                <div className="mt-6 w-full">
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
