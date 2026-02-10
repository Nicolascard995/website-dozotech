"use client";

import ShieldCalculator from "../organisms/ShieldCalculator";

export default function ShieldSection() {
    return (
        <section id="shield-calculator" className="py-24 bg-obsidian relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">

                    {/* Text Content */}
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <span className="text-cyan font-mono text-sm uppercase tracking-widest neon-text">
                            No-Show Killer
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter decoration-clone leading-tight font-display">
                            Protect your <span className="text-cyan">revenue</span>.
                        </h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xl">
                            Every empty table is money you never get back. Use the calculator to see exactly how much your "no-shows" are costing you annually, and get the tool to stop it.
                        </p>
                    </div>

                    {/* Calculator Component */}
                    <div className="flex-1 w-full max-w-md">
                        <ShieldCalculator />
                    </div>

                </div>
            </div>
        </section>
    );
}
