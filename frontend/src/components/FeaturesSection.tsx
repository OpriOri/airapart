import { Shield, Clock, MapPin, CreditCard, Zap, Key, Wifi, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    className?: string;
}

function Feature({ icon, title, description, className }: FeatureProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300",
                "hover:bg-secondary/50 hover:shadow-sm",
                className
            )}
        >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}

export default function FeaturesSection() {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Почему выбирают нас</h2>
                    <p className="text-xl text-muted-foreground">
                        Комфорт без посредников — только проверенные квартиры и честные условия
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <Feature
                        icon={<Shield className="h-8 w-8" />}
                        title="Хозяйка знает лучше"
                        description="Живое общение вместо шаблонов — ваш арендодатель всегда на связи"
                        className="animate-slide-up"

                    />
                    <Feature
                        icon={<Clock className="h-8 w-8" />}
                        title="Решаем вопросы до того, как они возникнут"
                        description="Ваш комфорт — наша система: продумали всё, чтобы не пришлось звонить"
                        className="animate-slide-up"

                    />
                    <Feature
                        icon={<MapPin className="h-8 w-8" />}
                        title="Лучшие локации"
                        description="Только жилые районы с развитой инфраструктурой — никаких 'спальных гетто'"
                        className="animate-slide-up"

                    />
                    <Feature
                        icon={<Zap className="h-8 w-8" />}
                        title="Мгновенное бронирование"
                        description="Срочно нужна квартира в Минводах? Забронируйте апартаменты всего за 20 минут без долгого ожидания подтверждения"
                        className="animate-slide-up"
                    />

                    <Feature
                        icon={<Key className="h-8 w-8" />}
                        title="Бесконтактное заселение 24/7"
                        description="Круглосуточное самостоятельное заселение в квартиру посуточно через смарт-замок в любое время при позднем прилёте в Минводы"
                        className="animate-slide-up"
                    />
                    <Feature
                        icon={<CreditCard className="h-8 w-8" />}
                        title="Цена без накруток"
                        description="Вы платите ровно столько, сколько просит собственник — мы не берём комиссию"
                        className="animate-slide-up"

                    />
                    <Feature
                        icon={<Wifi className="h-8 w-8" />}
                        title="Бесплатный Wi-Fi"
                        description="Высокоскоростной интернет во всех апартаментах для работы и развлечений — оставайтесь на связи в комфортной обстановке"
                        className="animate-slide-up"
                    />

                    <Feature
                        icon={<Coffee className="h-8 w-8" />}
                        title="Полностью оборудованная кухня"
                        description="Современная техника и всё необходимое для приготовления еды — экономьте на питании во время поездки"
                        className="animate-slide-up"
                    />
                </div>
            </div>
        </section>
    );
}
