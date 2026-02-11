import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
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
    const t = await getTranslations({ locale, namespace: 'Hero' });
    const tMeta = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: `${t('title_part1')} ${t('title_part2')}`,
        description: t('subtitle_prefix') + ' ' + t('subtitle_highlight') + t('subtitle_suffix'),
        keywords: tMeta('keywords'),
    };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return (
        <>
            <Navbar />
            <Hero />
            <FounderBanner />
            <AboutSection />
            <Methodology />
            <SolutionsGrid />
            <ShieldSection />
            <BlogCarousel locale={locale} />
            <Footer />
        </>
    );
}
