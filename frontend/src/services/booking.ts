/**
 * Сервис для работы с бронированиями
 */
// src/services/booking.ts
    //ебаьб ваш рот тут столько дерьма просто пиздец
// URL API бэкенда
const isDev = import.meta.env.DEV;

let RAW_API_URL = isDev ? "http://localhost:8000" : import.meta.env.VITE_API_URL;


// Нормализуем
const API_URL = RAW_API_URL.endsWith('/api') ? RAW_API_URL : `${RAW_API_URL}/api`;
function getCsrfTokenFromCookies(): string | null {
    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf_token='))
        ?.split('=')[1];

    return token || null;
}

export const bookingService = {
    async cancelBookingByClient(bookingId: string, cancelToken: string, reason?: string) {
        try {
            const csrfToken = getCsrfTokenFromCookies();

            // 1. Проверка обязательных параметров
            if (!bookingId || !cancelToken) {
                return {
                    success: false,
                    message: 'Не указаны обязательные параметры'
                };
            }

            const response = await fetch(`${API_URL}/bookings/${bookingId}/cancel-by-client`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken || '',
                },
                credentials: 'include',
                body: JSON.stringify({
                    cancel_token: cancelToken,
                    reason: reason || '',
                }),
            });

            // 2. Обработка не JSON-ответов
            if (!response.ok) {
                try {
                    const errorData = await response.json();
                    return {
                        success: false,
                        message: errorData.detail || 'Не удалось отменить бронирование'
                    };
                } catch (e) {
                    return {
                        success: false,
                        message: `Ошибка сервера: ${response.statusText}`
                    };
                }
            }

            // 3. Безопасный парсинг ответа
            try {
                const data = await response.json();
                return { success: true, booking: data };
            } catch (e) {
                console.error('Invalid JSON response:', e);
                return {
                    success: false,
                    message: 'Некорректный ответ сервера'
                };
            }

        } catch (error) {
            // 4. Обработка сетевых ошибок
            console.error('Network error:', error);
            return {
                success: false,
                message: 'Ошибка сети. Проверьте соединение.'
            };
        }
    }
};