'use client';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function BlogCarousel() {
    const t = useTranslations('Blog');
    const posts = [0, 1, 2]; // Keys for posts

    return (
        <section id="blog" className="py-24 bg-obsidian overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-center">
                <div>
                    <span className="text-cyan font-mono text-sm uppercase mb-2 block tracking-widest">{t('badge')}</span>
                    <h2 className="text-4xl font-black text-white tracking-tighter">{t('title')}</h2>
                </div>
                <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-cyan hover:text-obsidian transition-all">
                        <ChevronLeft />
                    </button>
                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-cyan hover:text-obsidian transition-all">
                        <ChevronRight />
                    </button>
                </div>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-8 px-6 no-scrollbar snap-x">
                {posts.map((idx) => (
                    <div key={idx} className="min-w-[320px] md:min-w-[400px] glass rounded-3xl p-8 border border-white/5 hover:border-cyan/30 transition-all snap-start group cursor-pointer">
                        <span className="inline-block px-3 py-1 bg-cyan/10 text-cyan rounded-full text-[10px] font-bold uppercase mb-6">{t(`posts.${idx}.tag`)}</span>
                        <h3 className="text-2xl font-bold text-white mb-8 group-hover:text-cyan transition-colors">{t(`posts.${idx}.title`)}</h3>
                        <div className="flex items-center gap-4 text-slate-500 text-xs">
                            <span className="flex items-center gap-1 font-mono">{t(`posts.${idx}.time`)}</span>
                            <span className="flex items-center gap-1">{t('read_more')} <ArrowRight className="w-3 h-3" /></span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
