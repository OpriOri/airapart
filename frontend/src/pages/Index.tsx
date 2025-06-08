import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

export default function Index() {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Апартаменты у аэропорта - Аренда квартир';
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow">
                <HeroSection />

                <FeaturesSection />

                <TestimonialsSection />

                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
