'use client';
import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import TiltCard from '../atoms/TiltCard';

export default function AboutSection() {
 const t = useTranslations('About');
 const containerRef = useRef<HTMLDivElement>(null);
 const isInView = useInView(containerRef, { once: true, amount: 0.5 });
 const [isFlipped, setIsFlipped] = useState(false);

 useEffect(() => {
 if (isInView) {
 const timer = setTimeout(() => {
 setIsFlipped(true);
 }, 1000);
 return () => clearTimeout(timer);
 }
 }, [isInView]);

 return (
 <section className="py-32 bg-cream overflow-hidden relative">
 <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#111] to-transparent z-0 pointer-events-none" />

 <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
 <div className="relative order-2 md:order-1 perspective-1000" ref={containerRef}>
 <TiltCard className="rounded-3xl">
 <motion.div
 className="aspect-[4/5] rounded-3xl relative preserve-3d transition-all duration-700 group border border-white/10 cursor-pointer shadow-2xl"
 animate={{ rotateY: isFlipped ? 180 : 0 }}
 transition={{ duration: 0.8, ease: "easeInOut" }}
 style={{ transformStyle: 'preserve-3d' }}
 onClick={() => setIsFlipped(!isFlipped)}
 >
 {/* Front Face: Chef */}
 <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden" style={{ backfaceVisibility: 'hidden', zIndex: 2 }}>
 <div className="absolute inset-0 bg-ember/10 mix-blend-overlay z-20 pointer-events-none"></div>
 <img
 src="/images/chef_profile.png"
 alt="The Chef"
 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
 />
 <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl border border-white/5 z-30">
 <p className="text-white font-bold tracking-tight font-display">{t('image_quote')}</p>
 </div>
 </div>

 {/* Back Face: Consultant */}
 <div
 className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden"
 style={{
 backfaceVisibility: 'hidden',
 transform: 'rotateY(180deg)',
 zIndex: 1
 }}
 >
 <div className="absolute inset-0 bg-ember/5 mix-blend-overlay z-20 pointer-events-none"></div>
 <img
 src="/images/consultant_profile.png"
 alt="The Consultant"
 style={{ objectPosition: '75% center' }}
 className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
 />
 <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl border border-white/5 z-30">
 <p className="text-white font-bold tracking-tight font-display">&quot;Efficiency is the new flavor.&quot;</p>
 </div>
 </div>
 </motion.div>
 </TiltCard>

 {/* Neon Pulse Badge */}
 <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full flex items-center justify-center border border-ember/30 z-30 shadow-[0_0_30px_rgba(212,255,0,0.2)]">
 <div className="absolute inset-0 rounded-full border border-ember/50 animate-ping opacity-20"></div>
 <div className="text-center relative">
 <span className="block text-ember font-mono font-bold text-4xl">5</span>
 <span className="text-[10px] text-slate-400 uppercase tracking-tighter font-bold mt-1 block">{t('efficiency_label')}</span>
 </div>
 </div>
 </div>

 <div className="order-1 md:order-2">
 <span className="text-ember font-mono text-sm tracking-widest uppercase mb-4 block">{t('badge')}</span>
 <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8">
 {t('title')}
 </h2>
 <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed font-sans">
 <p>
 {t('description1')}
 </p>
 <p className="border-l-4 border-ember pl-6 italic text-white/90 text-xl font-display">
 {t('quote')}
 </p>
 <p className="text-gray-300 mb-6 font-space-grotesk text-lg leading-relaxed">
 {t("description2")}
 </p>
 </div>
 </div>
 </div>
 </section>
 );
}
