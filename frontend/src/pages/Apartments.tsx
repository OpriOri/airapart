import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import useApartments from '@/features/apartments/hooks/useApartments';
import ApartmentsFilters from '@/features/apartments/components/ApartmentsFilters';
import ApartmentsViewSelector from '@/features/apartments/components/ApartmentsViewSelector';
import { Home } from 'lucide-react';

export default function Apartments() {
    const {
        properties,
        searchQuery,
        setSearchQuery,
        priceRange,
        setPriceRange,
        selectedBedrooms,
        setSelectedBedrooms,
        selectedCity,
        setSelectedCity,
        dateRange,
        setDateRange,
        isLoading,
        resetFilters
    } = useApartments();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Квартиры - Апартаменты у аэропорта';
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="pt-20 bg-secondary/30">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Наши квартиры</h1>
                    <p className="text-muted-foreground text-lg mb-6">
                        Комфорт начинается здесь
                    </p>

                    <ApartmentsFilters
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedBedrooms={selectedBedrooms}
                        setSelectedBedrooms={setSelectedBedrooms}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
                        resetFilters={resetFilters}
                    />

                    <ApartmentsViewSelector
                        properties={properties}
                        isLoading={isLoading}
                        resetFilters={resetFilters}
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}

function Bed(props: any) {
    return <Home {...props} />;
}

function Bath(props: any) {
    return <Home {...props} />;
}