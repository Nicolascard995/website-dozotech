"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Target, AlertCircle, ArrowRight } from "lucide-react";

interface SolutionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    productKey: string | null;
    onAction: () => void;
}

export default function SolutionDetailModal({ isOpen, onClose, productKey, onAction }: SolutionDetailModalProps) {
    const t = useTranslations("solutions");

    if (!isOpen || !productKey) return null;

    const features = [0, 1, 2, 3].map((i) => {
        try {
            return t(`${productKey}.features.${i}`);
        } catch (e) { return null; }
    }).filter(Boolean);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-obsidian/90 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-surface border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl overflow-y-auto max-h-[90vh]"
            >
                {/* Header with Title & Subtitle */}
                <div className="p-8 md:p-12 pb-0 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight font-display">
                        {t(`${productKey}.title`)}
                    </h2>
                    <p className="text-xl text-acid-lime font-mono mb-8">
                        {t(`${productKey}.subtitle`)}
                    </p>
                </div>

                <div className="px-8 md:px-12 pb-12 space-y-10">
                    {/* Problem Section */}
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                        <div className="flex items-center gap-3 mb-4 text-slate-400">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-sm uppercase tracking-widest font-bold">{t("label_problem")}</span>
                        </div>
                        <p className="text-slate-200 text-lg leading-relaxed">
                            {t(`${productKey}.problem`)}
                        </p>
                    </div>

                    {/* Includes Section */}
                    <div>
                        <div className="flex items-center gap-3 mb-6 text-slate-400">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-sm uppercase tracking-widest font-bold">{t("label_features")}</span>
                        </div>
                        <ul className="grid md:grid-cols-2 gap-4">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-4 text-slate-300 bg-white/5 p-4 rounded-xl border border-white/5">
                                    <span className="text-acid-lime font-bold">•</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Target & CTA Section */}
                    <div className="grid md:grid-cols-2 gap-8 items-center pt-6 border-t border-white/10">
                        <div>
                            <div className="flex items-center gap-3 mb-4 text-slate-500">
                                <Target className="w-5 h-5" />
                                <span className="text-sm uppercase tracking-widest font-bold">{t("label_target")}</span>
                            </div>
                            <p className="text-white font-light italic">
                                "{t(`${productKey}.target`)}"
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={onAction}
                                className="w-full bg-acid-lime text-obsidian font-black py-5 rounded-2xl hover:bg-white transition-all uppercase tracking-widest flex items-center justify-center gap-3"
                            >
                                {t(`${productKey}.cta`)}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-center text-acid-lime/60 text-sm font-mono font-bold">
                                {t(`${productKey}.result`)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Noise texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0 pointer-events-none" />
            </motion.div>
        </div>
    );
}
