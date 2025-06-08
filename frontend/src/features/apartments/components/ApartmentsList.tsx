import PropertyCard from '@/components/PropertyCard';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApartmentsListProps {
    properties: any[];
    isLoading: boolean;
    resetFilters: () => void;
}

export default function ApartmentsList({ properties, isLoading, resetFilters }: ApartmentsListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                    <div key={index} className="rounded-xl overflow-hidden border animate-pulse">
                        <div className="aspect-[4/3] bg-muted"></div>
                        <div className="p-4 space-y-3">
                            <div className="h-6 bg-muted rounded-md w-3/4"></div>
                            <div className="h-4 bg-muted rounded-md w-1/2"></div>
                            <div className="h-4 bg-muted rounded-md w-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (properties.length === 0) {
        return (
            <div className="text-center py-16">
                <Home className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground mb-6">
                    Попробуйте изменить параметры поиска или сбросить фильтры
                </p>
                <Button onClick={resetFilters}>Сбросить фильтры</Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
                <PropertyCard key={property.id} {...property} className="animate-slide-up" />
            ))}
        </div>
    );
}