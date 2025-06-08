import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, MapPin, Bed, Bath as BathIcon, Home, Star, Calendar, Wifi, Coffee, Tv, Fan, UtensilsCrossed, Baby, Microwave, Refrigerator, Building, SquareParking, PawPrint, Shirt, WashingMachine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { allProperties, type Amenity, type Property } from '@/features/apartments/data/propertyData';
import PropertyCard from '@/components/PropertyCard';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/DateRangePicker';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import MapSection from '@/components/MapSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyImageCarousel from '@/components/PropertyImageCarousel';
import { BookingConfirmationDialog } from '@/components/BookingConfirmationDialog';
import { CheckInRules } from '@/components/CheckInRules';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const iconMap: Record<string, React.ElementType> = {
    Wifi, Coffee, Tv, Fan, UtensilsCrossed, Baby, Microwave,
    Refrigerator, Building, SquareParking, PawPrint, Bath: BathIcon,
    Shirt, WashingMachine
};

const formatDescription = (description: string) => {
    if (!description) return [];

    const paragraphs = description
        .split(/\n\n|\.\s+/)
        .filter(p => p.trim().length > 0)
        .map(p => p.trim() + (p.endsWith('.') ? '' : '.'));

    return paragraphs.length > 0 ? paragraphs : [description];
};

export default function ApartmentDetails() {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [guests, setGuests] = useState<number>(1);
    const [showBookingDialog, setShowBookingDialog] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const { toast } = useToast();
    const isMobile = useIsMobile();

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Детали квартиры - АпартРента';

        const timer = setTimeout(() => {
            if (id) {
                const foundProperty = allProperties.find(p => p.id.toString() === id);
                setProperty(foundProperty || null);
            }
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [id]);

    const similarProperties = property
        ? allProperties.filter(p =>
            p.id !== property.id &&
            p.location.includes(property.location.split(',')[0]?.trim() || '')
        ).slice(0, 3)
        : [];

    const calculateTotalPrice = () => {
        if (!dateRange?.from || !dateRange?.to || !property) {
            return 0;
        }

        const nights = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
        return property.price * nights;
    };

    const handleBooking = () => {
        if (!dateRange?.from || !dateRange?.to) {
            toast({
                title: "Выберите даты",
                description: "Пожалуйста, укажите даты заезда и выезда",
                variant: "destructive"
            });
            return;
        }

        if (property && guests > (property.maxGuests || 2)) {
            toast({
                title: "Слишком много гостей",
                description: `Максимальное количество гостей для этой квартиры: ${property.maxGuests || 2}`,
                variant: "destructive"
            });
            return;
        }

        setShowBookingDialog(true);
    };

    const handleBookingConfirm = () => {
        toast({
            title: "Бронирование успешно!",
            description: `Вы забронировали квартиру с ${dateRange?.from?.toLocaleDateString() || ''} по ${dateRange?.to?.toLocaleDateString() || ''} для ${guests} гостей.`,
        });
    };

    const propertyImages = property?.images || [property?.imageUrl || '/placeholder.svg'];
    const formattedDescription = property?.description ? formatDescription(property.description) : [];
    const shouldTruncateDescription = formattedDescription.join(' ').length > 200;
    const displayedDescription = shouldTruncateDescription && !isDescriptionExpanded
        ? formattedDescription.join(' ').slice(0, 200) + '...'
        : formattedDescription.join(' ');

    const generateGuestOptions = (maxGuests: number) => {
        const options = [];
        for (let i = 1; i <= maxGuests; i++) {
            options.push(
                <SelectItem key={i} value={i.toString()}>
                    {i} {i === 1 ? 'гость' : i >= 2 && i <= 4 ? 'гостя' : 'гостей'}
                </SelectItem>
            );
        }
        return options;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="pt-20 flex-grow">
                    <div className="container mx-auto px-4 py-12 animate-pulse">
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-2/3">
                                <div className="h-64 bg-secondary/50 rounded-lg mb-4"></div>
                                <div className="h-12 bg-secondary/50 rounded-lg mb-2"></div>
                                <div className="h-8 bg-secondary/50 rounded-lg mb-4"></div>
                                <div className="h-48 bg-secondary/50 rounded-lg"></div>
                            </div>
                            <div className="lg:w-1/3">
                                <div className="h-48 bg-secondary/50 rounded-lg mb-4"></div>
                                <div className="h-32 bg-secondary/50 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="pt-20 flex-grow">
                    <div className="container mx-auto px-4 py-12 text-center">
                        <h1 className="text-3xl font-bold mb-4">Квартира не найдена</h1>
                        <p className="text-muted-foreground mb-6">Запрашиваемая квартира не существует или была удалена.</p>
                        <Button asChild>
                            <Link to="/apartments">Вернуться к списку квартир</Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="pt-20 flex-grow">
                <div className="container mx-auto px-4 py-6 apartment-details-container">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mb-4 bg-secondary/70 hover:bg-secondary/90 text-white"
                        asChild
                    >
                        <Link to="/apartments">
                            <ChevronLeft className="h-6 w-6" />
                        </Link>
                    </Button>

                    <div className="bg-background rounded-lg shadow-sm overflow-hidden mb-8">
                        <div className="p-4 md:p-6">
                            <h1 className="text-2xl md:text-3xl font-bold mb-4">{property?.title}</h1>
                            <div className="flex items-center text-sm md:text-base mb-4">
                                <MapPin className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                                {property?.location}
                            </div>

                            <PropertyImageCarousel
                                images={propertyImages}
                                title={property?.title || 'Квартира'}
                            />
                        </div>
                    </div>

                    <div className="lg:hidden mb-8">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <span className="text-2xl font-bold">{property?.price?.toLocaleString()} ₽</span>
                                        <span className="text-sm text-muted-foreground"> / ночь</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                                        <span className="font-semibold">{property?.rating}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <DateRangePicker
                                        dateRange={dateRange}
                                        onDateRangeChange={setDateRange}
                                        apartmentId={Number(id)}
                                    />

                                    <div className="space-y-2">
                                        <label htmlFor="guests-mobile" className="text-sm font-medium flex justify-between">
                                            <span>Количество гостей</span>
                                            {property && <span className="text-muted-foreground text-xs">Макс: {property.maxGuests || 2}</span>}
                                        </label>

                                        <Select
                                            value={guests.toString()}
                                            onValueChange={(value) => setGuests(parseInt(value))}
                                        >
                                            <SelectTrigger id="guests-mobile" className="w-full">
                                                <SelectValue placeholder="Выберите количество гостей" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {property ? generateGuestOptions(property.maxGuests || 2) :
                                                    <SelectItem value="1">1 гость</SelectItem>
                                                }
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button
                                        className="w-full"
                                        size="lg"
                                        onClick={handleBooking}
                                        disabled={property && guests > (property.maxGuests || 2)}
                                    >
                                        Забронировать
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-2/3">
                            <Card className="mb-8">
                                <CardContent className="p-6">
                                    <h2 className="text-2xl font-bold mb-4">Описание</h2>

                                    <div className="space-y-4 text-muted-foreground">
                                        <div className="text-base leading-relaxed space-y-2">
                                            {displayedDescription.split('\n').map((paragraph, idx) => (
                                                <p key={idx}>{paragraph}</p>
                                            ))}
                                        </div>

                                        {shouldTruncateDescription && (
                                            <Button
                                                variant="ghost"
                                                className="text-primary hover:text-primary/80"
                                                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                            >
                                                {isDescriptionExpanded ? 'Свернуть' : 'Подробнее'}
                                            </Button>
                                        )}
                                    </div>

                                    <Separator className="my-6" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                                        <div className="flex items-center text-lg bg-muted/30 p-2 px-4 rounded-lg">
                                            <Bed className="h-5 w-5 mr-3 text-primary" />
                                            {property?.bedrooms} спальни
                                        </div>
                                        <div className="flex items-center text-lg bg-muted/30 p-2 px-4 rounded-lg">
                                            <BathIcon className="h-5 w-5 mr-3 text-primary" />
                                            {property?.bathrooms} ванные комнаты
                                        </div>
                                        <div className="flex items-center text-lg bg-muted/30 p-2 px-4 rounded-lg">
                                            <Home className="h-5 w-5 mr-3 text-primary" />
                                            {property?.area} м²
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-4">Удобства</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-3">
                                        {property?.amenities ? (
                                            property.amenities.map((amenity, index) => {
                                                const IconComponent = iconMap[amenity.icon];
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`flex items-center p-2 rounded-md ${
                                                            !amenity.available
                                                                ? 'text-muted-foreground line-through bg-muted/20'
                                                                : 'bg-muted/30'
                                                        }`}
                                                    >
                                                        {IconComponent && <IconComponent className={`h-4 w-4 mr-3 ${amenity.available ? 'text-primary' : ''}`} />}
                                                        {amenity.name}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <>
                                                <div className="flex items-center p-2 rounded-md bg-muted/30">
                                                    <Wifi className="h-4 w-4 mr-3 text-primary" />
                                                    Бесплатный Wi-Fi
                                                </div>
                                                <div className="flex items-center p-2 rounded-md bg-muted/30">
                                                    <Coffee className="h-4 w-4 mr-3 text-primary" />
                                                    Кофеварка
                                                </div>
                                                <div className="flex items-center p-2 rounded-md bg-muted/30">
                                                    <Tv className="h-4 w-4 mr-3 text-primary" />
                                                    Телевизор
                                                </div>
                                                <div className="flex items-center p-2 rounded-md bg-muted/30">
                                                    <Fan className="h-4 w-4 mr-3 text-primary" />
                                                    Кондиционер
                                                </div>
                                                <div className="flex items-center p-2 rounded-md bg-muted/30">
                                                    <UtensilsCrossed className="h-4 w-4 mr-3 text-primary" />
                                                    Кухня
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <CheckInRules />
                        </div>

                        <div className="lg:w-1/3 hidden lg:block">
                            <Card className="sticky top-24">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <span className="text-2xl font-bold">{property?.price?.toLocaleString()} ₽</span>
                                            <span className="text-sm text-muted-foreground"> / ночь</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                                            <span className="font-semibold">{property?.rating}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <DateRangePicker
                                            dateRange={dateRange}
                                            onDateRangeChange={setDateRange}
                                            apartmentId={Number(id)}
                                        />

                                        <div className="space-y-2">
                                            <label htmlFor="guests" className="text-sm font-medium flex justify-between">
                                                <span>Количество гостей</span>
                                                {property && <span className="text-muted-foreground text-xs">Макс: {property.maxGuests || 2}</span>}
                                            </label>

                                            <Select
                                                value={guests.toString()}
                                                onValueChange={(value) => setGuests(parseInt(value))}
                                            >
                                                <SelectTrigger id="guests" className="w-full">
                                                    <SelectValue placeholder="Выберите количество гостей" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {property ? generateGuestOptions(property.maxGuests || 2) :
                                                        <SelectItem value="1">1 гость</SelectItem>
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Button
                                            className="w-full"
                                            size="lg"
                                            onClick={handleBooking}
                                            disabled={property && guests > (property.maxGuests || 2)}
                                        >
                                            Забронировать
                                        </Button>

                                        <div className="text-sm text-muted-foreground">
                                            <p className="mb-2">Обязательная предоплата при бронировании</p>

                                            {dateRange?.from && dateRange?.to && (
                                                <div className="mt-4 space-y-2">
                                                    <div className="flex justify-between">
                            <span>
                              {property?.price?.toLocaleString()} ₽ × {
                                Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
                            } ночей
                            </span>
                                                        <span>
                              {(property?.price &&
                                  Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) * property.price
                              )?.toLocaleString()} ₽
                            </span>
                                                    </div>
                                                    <Separator className="my-2" />
                                                    <div className="flex justify-between font-semibold">
                                                        <span>Итого</span>
                                                        <span>
                              {calculateTotalPrice().toLocaleString()} ₽
                            </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <Card className="mb-8 map-section">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4">На карте</h2>
                            <MapSection locationText={property?.location || ''} />
                        </CardContent>
                    </Card>

                    {similarProperties.length > 0 && (
                        <>
                            <h2 className="text-2xl font-bold mb-4">Похожие квартиры</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {similarProperties.map(similarProperty => (
                                    <PropertyCard
                                        key={similarProperty.id}
                                        {...similarProperty}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <BookingConfirmationDialog
                open={showBookingDialog}
                onOpenChange={setShowBookingDialog}
                propertyTitle={property?.title || ''}
                propertyId={property?.id?.toString() || ''}
                dateRange={dateRange}
                guests={guests}
                totalPrice={calculateTotalPrice()}
                onConfirm={handleBookingConfirm}
            />

            <Footer />
        </div>
    );
}
