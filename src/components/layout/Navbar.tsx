'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/atoms/LanguageSwitcher';
import Logo from '@/components/atoms/Logo';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-obsidian/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2 relative z-50">
                    <Logo className="w-8 h-8 text-cyan" />
                    <span className="text-xl font-bold tracking-tighter text-white uppercase tracking-widest">DOZO TECH</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <a href="#metodologia" className="hover:text-cyan transition-colors">{t('methodology')}</a>
                    <a href="#soluciones" className="hover:text-cyan transition-colors">{t('solutions')}</a>
                    <a href="#casos" className="hover:text-cyan transition-colors">{t('cases')}</a>
                    <a href="#blog" className="hover:text-cyan transition-colors">{t('blog')}</a>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>
                    <button className="hidden md:block px-6 py-2.5 bg-transparent border border-cyan text-cyan rounded-full text-xs font-bold uppercase tracking-widest hover:bg-cyan hover:text-obsidian transition-all duration-300 shadow-[0_0_15px_rgba(44,250,214,0.1)]">
                        {t('audit')}
                    </button>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative z-50 text-white p-2"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-obsidian/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="flex flex-col items-center gap-8 text-2xl font-black text-white tracking-tight">
                    <a href="#metodologia" onClick={() => setIsOpen(false)} className="hover:text-cyan transition-colors">{t('methodology')}</a>
                    <a href="#soluciones" onClick={() => setIsOpen(false)} className="hover:text-cyan transition-colors">{t('solutions')}</a>
                    <a href="#casos" onClick={() => setIsOpen(false)} className="hover:text-cyan transition-colors">{t('cases')}</a>
                    <a href="#blog" onClick={() => setIsOpen(false)} className="hover:text-cyan transition-colors">{t('blog')}</a>
                </div>

                <div className="mt-12 flex flex-col items-center gap-8">
                    <LanguageSwitcher />
                    <button className="px-10 py-4 bg-cyan text-obsidian font-black rounded-full text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(44,250,214,0.3)]">
                        {t('audit')}
                    </button>
                </div>
            </div>
        </nav>
    );
}
