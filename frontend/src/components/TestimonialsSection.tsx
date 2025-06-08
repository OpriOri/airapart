import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    avatar: string;
    rating: number;
    text: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Анна К.',
        location: 'Санкт-Петербург',
        avatar: 'https://randomuser.me/api/portraits/women/79.jpg',
        rating: 5,
        text: 'Снимали квартиру на курортный месяц. Утром — пешком до питьевой галереи (15 минут через парк), вечером — вид на Эльбрус с балкона. В подъезде консьерж, как в Сочи! А ещё соседка-бабушка научила правильно заваривать местные травы 😊'
    },
    {
        id: 2,
        name: 'Сергей У.',
        location: 'Москва',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 4.5,
        text: 'Пользуюсь вашим сервисом постоянно — бронирую за минуту, цены адекватные, а до аэропорта рукой подать. Удобно, когда летаешь часто.'
    },
    {
        id: 3,
        name: 'Елена В.',
        location: 'Екатеринбург',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        text: 'Приехали с подружкой на выходные — выбрали квартиру через ваш сервис за 5 минут! Удивило, что до аэропорта на такси всего 5 - 7 минут (быстро и с комфортом). В квартире есть все необходимое, вернемся снова :)'
    },
    {
        id: 4,
        name: 'Алексей П.',
        location: 'Казань',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        rating: 5,
        text: 'Прилетел на переговоры — квартира в 7 минутах от аэропорта. Тишина, быстрый интернет, удобный стол для работы. Оформил бронь за 15 минут из зала вылета — идеально для командировок.'
    }
];

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);

    const goToPrev = () => {
        setDirection('left');
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setDirection('right');
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={16}
                className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
        ));
    };

    return (
        <section className="py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Что говорят наши клиенты</h2>
                    <p className="text-xl text-muted-foreground">
                        Узнайте о впечатлениях гостей, которые уже воспользовались нашими услугами
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Navigation Buttons */}
                    <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 md:-translate-x-8">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-md"
                            onClick={goToPrev}
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    </div>

                    <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 md:translate-x-8">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-md"
                            onClick={goToNext}
                            aria-label="Next testimonial"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Testimonials Slider */}
                    <div className="overflow-hidden py-8">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={testimonial.id}
                                    className="min-w-full px-4"
                                >
                                    <div
                                        className={cn(
                                            "bg-card rounded-2xl p-8 shadow-sm border h-full flex flex-col",
                                            "transition-all duration-500",
                                            index === activeIndex
                                                ? "scale-100 opacity-100"
                                                : "scale-95 opacity-60"
                                        )}
                                    >
                                        <div className="flex items-center mb-6">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.name}
                                                className="w-14 h-14 rounded-full object-cover mr-4"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                                                <p className="text-muted-foreground text-sm">{testimonial.location}</p>
                                            </div>
                                            <div className="ml-auto flex">
                                                {renderStars(testimonial.rating)}
                                            </div>
                                        </div>

                                        <blockquote className="text-lg italic flex-grow">
                                            "{testimonial.text}"
                                        </blockquote>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center space-x-2 mt-6">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    index === activeIndex
                                        ? "w-6 bg-primary"
                                        : "bg-primary/30"
                                )}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
