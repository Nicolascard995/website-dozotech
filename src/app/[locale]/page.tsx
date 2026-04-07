import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import WaitlistSection from '@/components/sections/WaitlistSection';
import FounderBanner from '@/components/sections/FounderBanner';
import AboutSection from '@/components/sections/AboutSection';
import Methodology from '@/components/sections/Methodology';
import SolutionsGrid from '@/components/sections/SolutionsGrid';
import ShieldSection from '@/components/sections/ShieldSection';
import BlogCarousel from '@/components/sections/BlogCarousel';
import Footer from '@/components/layout/Footer';

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const tMeta = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: 'Le Sous Chef — Kitchen OS for independent restaurants',
        description: 'Built by a chef, for chefs. The operating system that gives you back the reason you cook.',
        keywords: tMeta('keywords'),
    };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    return (
        <>
            <Navbar />
            <Hero />

            {/* Coming soon */}
            <section className="py-24 bg-cream" style={{ paddingLeft: 'clamp(20px,5vw,80px)', paddingRight: 'clamp(20px,5vw,80px)' }}>
                <div className="max-w-[1200px] mx-auto">
                    <p className="font-mono text-[10px] tracking-widest uppercase text-ember mb-6">
                        {locale === 'de' ? '// IN KÜRZE' : locale === 'es' ? '// PRÓXIMAMENTE' : '// COMING SOON'}
                    </p>
                    <h2 className="font-display italic text-ink leading-[1.1] max-w-[600px]" style={{ fontSize: 'clamp(32px,4vw,52px)' }}>
                        {locale === 'de'
                            ? 'Deine Küche verdient bessere Software.'
                            : locale === 'es'
                            ? 'Tu cocina merece mejor software.'
                            : 'Your kitchen deserves better software.'}
                    </h2>
                </div>
            </section>

            <WaitlistSection />

            {/* Hidden sections — preserved for Phase 5+ */}
            {false && <SolutionsGrid />}
            {false && <FounderBanner />}
            {false && <AboutSection />}
            {false && <Methodology />}
            {false && <ShieldSection />}
            {false && <BlogCarousel locale={locale} />}
            {false && <Footer />}

            {/* Minimal footer */}
            <footer className="bg-cream-dark border-t border-cream-dark py-8" style={{ paddingLeft: 'clamp(20px,5vw,80px)', paddingRight: 'clamp(20px,5vw,80px)' }}>
                <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-4">
                    <span className="font-mono text-[10px] tracking-widest text-ink-muted uppercase">
                        LE SOUS CHEF — lesouschef.com
                    </span>
                    <span className="font-mono text-[10px] text-ink-muted">
                        {locale === 'de' ? 'Von einem Koch. Für Köche.' : locale === 'es' ? 'Hecho por un chef. Para chefs.' : 'Made by a chef. For chefs.'}
                    </span>
                </div>
            </footer>
        </>
    );
}
