"use client";

import { motion, useInView, Variant } from "framer-motion";
import { useRef } from "react";

type AnimationMode = "fade" | "slide-up" | "slide-right" | "zoom";

interface ScrollRevealProps {
    children: React.ReactNode;
    mode?: AnimationMode;
    delay?: number;
    duration?: number;
    threshold?: number;
    className?: string;
    stagger?: number; // useful if wrapping steps
}

const variants: Record<AnimationMode, { hidden: Variant; visible: Variant }> = {
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    "slide-up": {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    },
    "slide-right": {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    },
    zoom: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
    },
};

export default function ScrollReveal({
    children,
    mode = "slide-up",
    delay = 0,
    duration = 0.5,
    threshold = 0.2,
    className = "",
}: ScrollRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: `0px 0px -${threshold * 100}% 0px` as any });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[mode]}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
