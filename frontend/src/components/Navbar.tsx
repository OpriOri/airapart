import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

// Removed 'Услуги' from the navigation links
const navLinks = [
    { title: 'Главная', href: '/' },
    { title: 'Квартиры', href: '/apartments' },
    { title: 'Контакты', href: '/contact' },
    { title: 'Отмена бронирования', href: '/bookings/cancel' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isMobile = useIsMobile();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Desktop navbar implementation
    if (!isMobile) {
        return (
            <nav
                className={cn(
                    'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 py-3',
                    isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-2xl font-display font-bold tracking-tight transition-opacity hover:opacity-80"
                    >
                        Апартаменты у аэропорта
                    </Link>

                    {/* Desktop Menu */}
                    <div className="flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={cn(
                                    'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                                    location.pathname === link.href
                                        ? 'text-primary'
                                        : 'text-foreground/80 hover:text-foreground hover:bg-secondary'
                                )}
                            >
                                {link.title}
                            </Link>
                        ))}
                        {/* Modified button to link to /apartments */}
                        <Link to="/apartments">
                            <Button size="sm" className="ml-4">
                                Забронировать
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }

    // Mobile navbar implementation using Sheet from shadcn/ui
    return (
        <nav
            className={cn(
                'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 py-3',
                isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link
                    to="/"
                    className="text-2xl font-display font-bold tracking-tight transition-opacity hover:opacity-80"
                >
                    АпартРента
                </Link>

                {/* Mobile Menu with Sheet component */}
                <Sheet>
                    <SheetTrigger asChild>
                        <button
                            className="flex items-center"
                            aria-label="Open Menu"
                        >
                            <Menu className="h-6 w-6 text-foreground" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[80%] pt-12">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={cn(
                                        'px-4 py-3 rounded-md text-lg font-medium transition-all duration-200',
                                        location.pathname === link.href
                                            ? 'text-primary bg-primary/5'
                                            : 'text-foreground/80 hover:text-foreground hover:bg-secondary'
                                    )}
                                >
                                    {link.title}
                                </Link>
                            ))}
                            <Link to="/apartments" className="mt-4 px-4">
                                <Button size="lg" className="w-full">
                                    Забронировать
                                </Button>
                            </Link>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}