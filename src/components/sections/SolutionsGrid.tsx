"use client";

import { useTranslations } from "next-intl";
import ScrollReveal from "../atoms/ScrollReveal";

const itemIds = ["01", "02", "03", "04"] as const;

export default function SolutionsGrid() {
    const t = useTranslations("Includes");

    return (
        <section
            id="includes"
            className="py-24 md:py-32 bg-cream relative overflow-hidden"
            style={{ paddingLeft: "clamp(20px,5vw,80px)", paddingRight: "clamp(20px,5vw,80px)" }}
        >
            <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[0.92fr_1.08fr] gap-14 lg:gap-20">
                <ScrollReveal className="lg:sticky lg:top-24 h-fit">
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ember mb-4">
                        {t("badge")}
                    </p>
                    <h2
                        className="font-display italic text-ink leading-[1.08] max-w-[540px]"
                        style={{ fontSize: "clamp(34px,4vw,58px)" }}
                    >
                        {t("title")}
                    </h2>
                    <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-ink-mid font-light">
                        {t("intro")}
                    </p>
                </ScrollReveal>

                <div className="border-t border-cream-dark/90">
                    {itemIds.map((itemId, index) => (
                        <ScrollReveal
                            key={itemId}
                            delay={index * 0.08}
                            className="grid gap-4 py-8 border-b border-cream-dark/90 md:grid-cols-[96px_1fr]"
                        >
                            <span className="font-mono text-[11px] uppercase tracking-[0.34em] text-ember/80">
                                {itemId}
                            </span>

                            <div>
                                <h3 className="font-display italic text-ink text-[30px] leading-tight mb-3">
                                    {t(`items.${itemId}.title`)}
                                </h3>
                                <p className="text-[16px] leading-relaxed text-ink-mid font-light">
                                    {t(`items.${itemId}.body`)}
                                </p>
                                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
                                    {t(`items.${itemId}.detail`)}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
