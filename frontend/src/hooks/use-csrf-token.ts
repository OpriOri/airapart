import { useState, useEffect } from 'react';
import { toast } from "sonner";

export function useCsrfToken() {
    const [isReady, setIsReady] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const initCsrfToken = async () => {
        try {
            const response = await fetch('/api/csrf-token', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('CSRF token initialization failed');
            }

            // Даем браузеру время на запись cookie
            setTimeout(() => {
                const cookieToken = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('csrf_token='))
                    ?.split('=')[1];

                if (cookieToken) {
                    setToken(cookieToken);
                    setIsReady(true);
                } else {
                    console.error('CSRF token not found in cookies');
                    setIsReady(false);
                }
            }, 100); // 100мс паузы хватает
        } catch (error) {
            console.error('Ошибка CSRF токена:', error);
            toast.error('Ошибка безопасности. Пожалуйста, обновите страницу.');
            setIsReady(false);
        }
    };

    useEffect(() => {
        initCsrfToken();
    }, []);

    return {
        isReady,
        getCsrfToken: () => token,
        refreshCsrfToken: initCsrfToken,
    };
}
