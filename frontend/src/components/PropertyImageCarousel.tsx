import { useState, useRef, useEffect } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PropertyImageCarouselProps {
    images: string[];
    title: string;
}

export default function PropertyImageCarousel({ images, title }: PropertyImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fullscreenIndex, setFullscreenIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const mainCarouselRef = useRef<any>(null);
    const fullscreenCarouselRef = useRef<any>(null);

    // Fallback image if no images provided
    const imageList = (images?.length ? images : ['/placeholder.svg']).map(image =>
        image.startsWith('/') || /^https?:\/\//i.test(image) ? image : `/${image}`
    );

    // Функция для обработки клика на миниатюру
    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);

        if (mainCarouselRef.current) {
            mainCarouselRef.current.scrollTo(index);
        }
    };

    // Функция для обработки клика на миниатюру в полноэкранном режиме
    const handleFullscreenThumbnailClick = (index: number) => {
        setFullscreenIndex(index);

        if (fullscreenCarouselRef.current) {
            fullscreenCarouselRef.current.scrollTo(index);
        }
    };

    // Синхронизация индекса полноэкранного режима с основным индексом при открытии полноэкранного режима
    useEffect(() => {
        if (isFullscreen) {
            setFullscreenIndex(currentIndex);

            // Ensure the fullscreen carousel is at the correct index when opened
            setTimeout(() => {
                if (fullscreenCarouselRef.current) {
                    fullscreenCarouselRef.current.scrollTo(currentIndex);
                }
            }, 50);
        }
    }, [isFullscreen, currentIndex]);

    return (
        <div className="relative">
            <div className="max-w-3xl mx-auto">
                <Carousel
                    className="w-full"
                    setApi={(api) => {
                        mainCarouselRef.current = api;
                        api?.on('select', () => {
                            setCurrentIndex(api.selectedScrollSnap());
                        });
                    }}
                >
                    <CarouselContent>
                        {imageList.map((image, index) => (
                            <CarouselItem key={index}>
                                <div
                                    className="relative overflow-hidden rounded-lg cursor-pointer"
                                    onClick={() => setIsFullscreen(true)}
                                >
                                    <AspectRatio ratio={4 / 3} className="bg-muted">
                                        <img
                                            src={image}
                                            alt={`${title} - изображение ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </AspectRatio>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                </Carousel>
            </div>

            {/* Миниатюры изображений */}
            {imageList.length > 1 && (
                <div className="flex justify-center gap-2 mt-4 overflow-x-auto pb-2 max-w-3xl mx-auto">
                    {imageList.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={cn(
                                "h-16 w-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 p-0 transition-all",
                                currentIndex === index ? "border-primary ring-1 ring-primary ring-opacity-50" : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <img
                                src={image}
                                alt={`${title} миниатюра ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </button>
                    ))}
                    {imageList.length > 5 && (
                        <button
                            className="flex items-center justify-center w-16 h-16 flex-shrink-0 bg-muted rounded-md text-muted-foreground hover:bg-muted/80 transition-colors"
                            onClick={() => setIsFullscreen(true)}
                        >
                            +{imageList.length - 5}
                        </button>
                    )}
                </div>
            )}

            {/* Полноэкранная галерея с отдельным отслеживанием состояния */}
            <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
                <DialogContent className="max-w-[95vw] w-full max-h-[95vh] p-0 bg-background/95 backdrop-blur-sm overflow-hidden">
                    <Carousel
                        className="w-full dialog-carousel"
                        setApi={(api) => {
                            fullscreenCarouselRef.current = api;
                            api?.on('select', () => {
                                setFullscreenIndex(api.selectedScrollSnap());
                            });
                        }}
                    >
                        <CarouselContent>
                            {imageList.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="h-[70vh] flex items-center justify-center p-2 sm:p-4">
                                        <img
                                            src={image}
                                            alt={`${title} - изображение ${index + 1}`}
                                            className="max-w-full max-h-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="left-1 sm:left-4 z-10 h-8 w-8" />
                        <CarouselNext className="right-1 sm:right-4 z-10 h-8 w-8" />
                    </Carousel>

                    <div className="flex justify-center gap-1 sm:gap-2 p-2 sm:p-4 bg-background/80 absolute bottom-0 left-0 right-0 backdrop-blur-sm overflow-x-auto">
                        {imageList.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => handleFullscreenThumbnailClick(index)}
                                className={cn(
                                    "h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 p-0 transition-all",
                                    fullscreenIndex === index ? "border-primary ring-1 ring-primary ring-opacity-50" : "border-transparent opacity-70 hover:opacity-100"
                                )}
                            >
                                <img
                                    src={image}
                                    alt={`${title} миниатюра ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
