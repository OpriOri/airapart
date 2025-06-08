import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-secondary/50 pt-16 pb-8 border-t">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold tracking-tight">Апартаменты у аэропорта</h3>
                        <p className="text-muted-foreground">
                            Премиальный сервис аренды квартир, который сделает ваш отдых или деловую поездку комфортной и беззаботной.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Навигация</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Главная</Link>
                            </li>
                            <li>
                                <Link to="/apartments" className="text-muted-foreground hover:text-primary transition-colors">Квартиры</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Контакты</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Контакты</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3">
                                <Phone size={18} className="text-primary" />
                                <span className="text-muted-foreground">+7 (928) 351-91-92</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={18} className="text-primary" />
                                <span className="text-muted-foreground">info@apartrent.ru</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="text-primary mt-1" />
                                <span className="text-muted-foreground">г. Минеральные воды, ул. Советская, д. 123</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
                    <p>© {currentYear} Апартаменты у аэропорта. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
}