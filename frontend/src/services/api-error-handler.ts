import { useToast } from "@/hooks/use-toast";

// Типы ошибок API
interface ApiError {
    status: number;
    message: string;
}

/**
 * Обработчик ошибок API
 */
export const apiErrorHandler = {
    /**
     * Обработка ошибок API с учетом HTTP статус-кодов
     */
    handleApiError(error: any, toast: ReturnType<typeof useToast>): string {
        console.error('API Error:', error);

        // Извлекаем статус и сообщение из ошибки
        const status = error.status || error.code || 500;
        let message = error.message || 'Произошла неизвестная ошибка';

        // Обрабатываем различные статус-коды
        switch (status) {
            case 400:
                message = 'Некорректные данные';
                toast.toast({
                    title: "Ошибка",
                    description: message,
                    variant: "destructive",
                });
                break;

            case 401:
                message = 'Необходима авторизация';
                toast.toast({
                    title: "Ошибка аутентификации",
                    description: message,
                    variant: "destructive",
                });
                break;

            case 403:
                message = 'Доступ запрещен';
                toast.toast({
                    title: "Ошибка доступа",
                    description: message,
                    variant: "destructive",
                });
                break;

            case 404:
                message = 'Ресурс не найден';
                toast.toast({
                    title: "Ошибка",
                    description: message,
                    variant: "destructive",
                });
                break;

            case 409:
                message = 'Конфликт дат бронирования';
                toast.toast({
                    title: "Даты недоступны",
                    description: "Выбранные даты уже забронированы. Пожалуйста, выберите другие даты.",
                    variant: "destructive",
                });
                break;

            case 422:
                message = 'Ошибка валидации данных';
                toast.toast({
                    title: "Ошибка валидации",
                    description: message,
                    variant: "destructive",
                });
                break;

            case 429:
                message = 'Слишком много запросов';
                toast.toast({
                    title: "Ограничение запросов",
                    description: "Пожалуйста, попробуйте позже.",
                    variant: "destructive",
                });
                break;

            case 500:
            case 502:
            case 503:
            case 504:
                message = 'Ошибка сервера';
                toast.toast({
                    title: "Сервис временно недоступен",
                    description: "Пожалуйста, попробуйте позже.",
                    variant: "destructive",
                });
                break;

            default:
                toast.toast({
                    title: "Ошибка",
                    description: message,
                    variant: "destructive",
                });
                break;
        }

        return message;
    },

    /**
     * Обработка успешных ответов API
     */
    handleApiSuccess(message: string, toast: ReturnType<typeof useToast>): void {
        toast.toast({
            title: "Успех",
            description: message,
        });
    }
};
