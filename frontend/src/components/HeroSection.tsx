import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SlideImage {
    url: string;
    caption: string;
}

const slides: SlideImage[] = [
    {
        url: '/pictures/1_main.jpg',
        caption: 'Современные апартаменты в 10 минутах от аэропорта'
    },
    {
        url: '/pictures/4_main.jpg',
        caption: 'Только премиальные и комфортные ЖК'
    },
    {
        url: '/pictures/7_main.jpg',
        caption: 'Новые квартиры и апартаменты уже ждут'
    }
];

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loaded, setLoaded] = useState<boolean[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Preload images
        const preloadImages = () => {
            slides.forEach((slide, index) => {
                const img = new Image();
                img.src = slide.url;
                img.onload = () => {
                    setLoaded(prev => {
                        const newLoaded = [...prev];
                        newLoaded[index] = true;
                        return newLoaded;
                    });
                };
            });
        };

        preloadImages();

        // Auto-rotate slides
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={cn(
                        "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    )}
                    aria-hidden={index !== currentIndex}
                >
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <img
                        src={slide.url}
                        alt={slide.caption}
                        className={cn(
                            "w-full h-full object-cover transition-transform duration-10000 ease-out",
                            loaded[index] ? "scale-105" : "scale-100",
                            index === currentIndex ? "animate-ken-burns" : ""
                        )}
                        style={{
                            animationDuration: '15s',
                            animationFillMode: 'forwards',
                        }}
                    />
                </div>
            ))}

            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight animate-slide-up"
                        style={{ animationDelay: '0.2s', textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
                    >
                        Апартаменты у аэропорта — заселение 24/7 без очередей
                    </h1>

                    <p
                        className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up"
                        style={{ animationDelay: '0.4s', textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
                    >
                        {slides[currentIndex].caption}
                    </p>

                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
                        style={{ animationDelay: '0.6s' }}
                    >
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                            onClick={() => navigate('/apartments')}
                        >
                            Выбрать апартаменты
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                            index === currentIndex
                                ? "bg-white w-8"
                                : "bg-white/50 hover:bg-white/80"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
