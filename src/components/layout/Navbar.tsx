'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/atoms/LanguageSwitcher';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#about', label: t('about') },
        { href: '#how-it-works', label: t('how_it_works') },
        { href: '#results', label: t('results') },
        { href: '#contact', label: t('contact') },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 h-14 flex items-center transition-all duration-300 ${
                scrolled
                    ? 'bg-cream/92 backdrop-blur-md border-b border-cream-dark'
                    : 'bg-transparent'
            }`}
        >
            <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Wordmark */}
                <Link
                    href="/"
                    className="font-mono text-sm tracking-widest font-medium text-cream hover:opacity-70 transition-opacity"
                >
                    LE SOUS CHEF
                </Link>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            className="font-mono text-xs tracking-wide text-cream/70 hover:text-cream transition-colors"
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Desktop right */}
                <div className="hidden md:flex items-center gap-6">
                    <LanguageSwitcher />
                    <a
                        href="#contact"
                        className="bg-cream text-ink text-xs font-medium px-4 py-2 rounded-[3px] hover:opacity-80 transition-opacity"
                    >
                        {t('cta')}
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-cream p-1"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 bg-cream z-40 flex flex-col justify-center items-center md:hidden transition-all duration-300 ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
            >
                <div className="flex flex-col items-center gap-10">
                    {navLinks.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            onClick={() => setIsOpen(false)}
                            className="font-display italic text-4xl text-ink hover:text-ember transition-colors"
                        >
                            {label}
                        </a>
                    ))}
                </div>

                <div className="mt-14 flex flex-col items-center gap-6">
                    <LanguageSwitcher />
                    <a
                        href="#contact"
                        onClick={() => setIsOpen(false)}
                        className="bg-ink text-cream text-sm font-medium px-8 py-3 rounded-[3px] hover:opacity-80 transition-opacity"
                    >
                        {t('cta')}
                    </a>
                </div>
            </div>
        </nav>
    );
}
