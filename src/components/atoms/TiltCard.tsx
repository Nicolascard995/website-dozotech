"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
    onClick?: () => void;
}

const ROTATION_RANGE = 25; // max rotation in degrees
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export default function TiltCard({ children, className = "", glowColor = "var(--color-acid-lime)", onClick }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className={`relative group/tilt ${className} ${onClick ? 'cursor-pointer' : ''}`}
        >
            {/* Inner Glow Effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none z-0"
                style={{
                    background: `radial-gradient(circle at center, ${glowColor}15 0%, transparent 70%)`
                }}
            />

            <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                {children}
            </div>
        </motion.div>
    );
}
