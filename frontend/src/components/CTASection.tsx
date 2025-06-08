import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CTASection() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div
                className="absolute inset-0 z-0 opacity-20"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(8px)'
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80 z-0" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-slide-up">
                        Готовы найти идеальную квартиру?
                    </h2>

                    <p className="text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Апартаменты и квартиры напрямую от собственника, сервис не берет комиссий за обслуживание
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <Button asChild size="lg" className="rounded-full px-8">
                            <Link to="/apartments">Найти квартиру</Link>
                        </Button>

                        <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                            <Link to="/contact">Связаться с нами</Link>
                        </Button>
                    </div>

                    <p className="mt-6 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '0.6s' }}>
                        Работаем с 2018 года • Более 100 довольных гостей ежемесячно • Быстрое заселение
                    </p>
                </div>
            </div>
        </section>
    );
}
