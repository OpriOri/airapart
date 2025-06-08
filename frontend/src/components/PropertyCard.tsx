import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Home, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PropertyCardProps {
    id: number;
    title: string;
    location: string;
    price: number;
    priceUnit: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    rating: number;
    imageUrl: string;
    isNew?: boolean;
    className?: string;
}

export default function PropertyCard({
                                         id,
                                         title,
                                         location,
                                         price,
                                         priceUnit,
                                         bedrooms,
                                         bathrooms,
                                         area,
                                         rating,
                                         imageUrl,
                                         isNew = false,
                                         className,
                                     }: PropertyCardProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    const getCorrectImageUrl = (url: string) => {
        if (url.startsWith('https')) return url; // Для внешних ссылок
        if (url.startsWith('/')) return url;   // Для абсолютных путей
        return `/${url}`;                       // Добавляем / к относительным путям
    };

    return (
        <div
            className={cn(
                'group relative bg-card rounded-xl overflow-hidden border transition-all duration-300',
                'hover:shadow-lg hover:-translate-y-1',
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/apartments/${id}`} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                        src={getCorrectImageUrl(imageUrl)}
                        alt={title}
                        className={cn(
                            'object-cover w-full h-full blur-load transition-all duration-700 ease-in-out',
                            isHovered ? 'scale-110' : 'scale-100',
                            isLoaded ? 'loaded' : 'animate-pulse'
                        )}
                        onLoad={() => setIsLoaded(true)}
                    />
                    {isNew && (
                        <Badge className="absolute top-3 left-3 z-10 bg-primary">Новинка</Badge>
                    )}
                    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white rounded-full px-2 py-1 text-xs">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span>{rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
                        <div className="font-bold text-lg text-primary">
                            {formatPrice(price)} ₽
                            <span className="text-xs text-muted-foreground font-normal">/{priceUnit}</span>
                        </div>
                    </div>

                    <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin size={16} className="mr-1" />
                        <span className="truncate">{location}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Bed size={16} />
                            <span>{bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Bath size={16} />
                            <span>{bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Home size={16} />
                            <span>{area} м²</span>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="px-4 pb-4">
                <Link to={`/apartments/${id}`}>
                    <Button className="w-full" variant="outline">Подробнее</Button>
                </Link>
            </div>
        </div>
    );
}