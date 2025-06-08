import { Home, Bath, Bed, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ApartmentsListViewProps {
    properties: any[];
    isLoading: boolean;
    resetFilters: () => void;
}

export default function ApartmentsListView({ properties, isLoading, resetFilters }: ApartmentsListViewProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="rounded-xl overflow-hidden border animate-pulse flex">
                        <div className="aspect-video w-1/3 bg-muted"></div>
                        <div className="p-4 space-y-3 flex-1">
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
        <div className="space-y-4">
            {properties.map((property) => (
                <div
                    key={property.id}
                    className="flex flex-col sm:flex-row gap-4 bg-card rounded-xl overflow-hidden border hover:shadow-md transition-all duration-300 animate-slide-up"
                >
                    <div className="relative sm:w-1/3">
                        <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="w-full h-48 sm:h-full object-cover"
                        />
                        {property.isNew && (
                            <div className="absolute top-3 left-3">
                                <div className="bg-primary text-white text-xs px-2 py-1 rounded">Новинка</div>
                            </div>
                        )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{property.title}</h3>
                            <div className="font-bold text-lg text-primary">
                                {property.price.toLocaleString()} ₽
                                <span className="text-xs text-muted-foreground font-normal">/{property.priceUnit}</span>
                            </div>
                        </div>

                        <div className="flex items-center text-muted-foreground text-sm mb-4">
                            <MapPin size={16} className="mr-1" />
                            <span>{property.location}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
                            <div className="flex items-center gap-1">
                                <Bed size={16} />
                                <span>{property.bedrooms} {property.bedrooms === 1 ? 'спальня' : 'спальни'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Bath size={16} />
                                <span>{property.bathrooms} {property.bathrooms === 1 ? 'ванная' : 'ванные'}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Home size={16} />
                                <span>{property.area} м²</span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Button asChild>
                                <Link to={`/apartments/${property.id}`}>Подробнее</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}