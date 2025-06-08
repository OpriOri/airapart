import { useCsrfToken } from "@/hooks/use-csrf-token.ts";

interface TelegramMessage {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface BookingNotification {
    bookingId: string;
    apartmentTitle: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    petInfo?: string;
    requiresDocuments?: boolean;
}



/**
 * Сервис для отправки уведомлений в Telegram
 */
export const telegramService = {
    // Отправка сообщения с формы контактов в Telegram
    async sendContactMessage(data: TelegramMessage, token: string | null): Promise<boolean> {
        try {
            // Формируем сообщение для отправки в Telegram
            const message = `
📨 Новое сообщение с сайта:
      
👤 Имя: ${data.name}
📧 Email: ${data.email}
📱 Телефон: ${data.phone}
      
💬 Сообщение:
${data.message}
      `;

            // Отправляем запрос на бэкенд для пересылки в Telegram
            const response = await fetch('/api/telegram/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': token || '',
                },
                body: JSON.stringify({
                    message: message
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Не удалось отправить сообщение в Telegram');
            }

            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Ошибка при отправке сообщения в Telegram:', error);
            return false;
        }
    },

    // Отправка уведомления о бронировании в Telegram
    async sendBookingNotification(data: BookingNotification, token: string | null): Promise<boolean> {
        try {
            const formatDate = (dateString: string) => {
                const date = new Date(dateString);
                return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
            };

            const message = `
📋 *Новое бронирование*
      
🆔 ID бронирования: ${data.bookingId}
🏠 Квартира: ${data.apartmentTitle}
📅 Даты: ${formatDate(data.checkInDate)} → ${formatDate(data.checkOutDate)}
👥 Гостей: ${data.guests}
${data.petInfo ? `🐾 Питомец: ${data.petInfo}` : ''}
      
👤 *Клиент*
- Имя: ${data.customerName}
- Телефон: ${data.customerPhone}
- Email: ${data.customerEmail}

${data.requiresDocuments ? '⚠️ *Ожидается получение документов через WhatsApp*' : ''}
      `;

            const response = await fetch('/api/telegram/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': token || '',
                },
                body: JSON.stringify({
                    message: message
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Не удалось отправить уведомление о бронировании');
            }

            const result = await response.json();
            return result.success;
        } catch (error) {
            console.error('Ошибка при отправке уведомления о бронировании:', error);
            return false;
        }
    },

    // Отправка уведомления об отмене бронирования в Telegram
    sendCancellationNotification: async (booking: any, reason?: string) => {
        const message = `
      🚫 БРОНИРОВАНИЕ ОТМЕНЕНО 🚫
      Апартаменты: ${booking.apartment_title}
      Даты: ${new Date(booking.check_in_date).toLocaleDateString()} - ${new Date(booking.check_out_date).toLocaleDateString()}
      Гости: ${booking.guests_count}
      Причина отмены: ${reason || 'Не указана'}
    `;

        await fetch('/api/telegram/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ message }),
        });
    }
};