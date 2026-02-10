import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import FounderBanner from '@/components/sections/FounderBanner';
import AboutSection from '@/components/sections/AboutSection';
import Methodology from '@/components/sections/Methodology';
import SolutionsGrid from '@/components/sections/SolutionsGrid';
import ShieldSection from '@/components/sections/ShieldSection';
import BlogCarousel from '@/components/sections/BlogCarousel';
import Footer from '@/components/layout/Footer';

export default function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <FounderBanner />
            <AboutSection />
            <Methodology />
            <SolutionsGrid />
            <ShieldSection />
            <BlogCarousel />
            <Footer />
        </>
    );
}
