import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Cookie } from 'lucide-react';

export function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false);

    useEffect(() => {
        // Check if user has already given consent
        const hasConsent = localStorage.getItem('cookieConsent');
        if (!hasConsent) {
            // Show the consent banner after a short delay
            const timer = setTimeout(() => {
                setShowConsent(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowConsent(false);
    };

    if (!showConsent) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-0 right-0 z-50 mx-auto px-4 sm:max-w-md md:max-w-lg">
            <Card className="p-4 shadow-lg bg-white dark:bg-gray-800 border animate-slide-up">
                <div className="flex items-start gap-3">
                    <Cookie className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h3 className="font-medium mb-2">Мы используем файлы cookie</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Этот сайт использует файлы cookie для улучшения вашего пользовательского опыта.
                            Продолжая использовать сайт, вы соглашаетесь с использованием файлов cookie.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Button
                                onClick={acceptCookies}
                                size="sm"
                            >
                                Принять все
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={acceptCookies}
                            >
                                Только необходимые
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
