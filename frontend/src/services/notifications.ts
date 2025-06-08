import {FormValues} from "@/components/ContactForm.tsx";

/**
 * Сервис для отправки уведомлений пользователям и администраторам
 */

export interface NotificationContent {
    bookingId?: string;
    apartmentId: string;
    apartmentTitle: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    totalAmount: number;
    paymentAmount: number;
    paymentType: 'prepayment' | 'fullPayment';
    paymentStatus: 'pending' | 'succeeded' | 'canceled';
    ownerWhatsApp?: string;
    hasPet?: boolean;
    petType?: string;
}

// URL API бэкенда
const isDev = import.meta.env.DEV;

let RAW_API_URL = isDev ? "http://localhost:8000" : import.meta.env.VITE_API_URL;

// Защита от undefined
if (!RAW_API_URL) {
    console.warn("⚠️ VITE_API_URL is undefined! Falling back to '/api'");
    RAW_API_URL = "/api";
}

// Нормализуем
const API_URL = RAW_API_URL.endsWith('/api') ? RAW_API_URL : `${RAW_API_URL}/api`;




/**
 * Отправляет уведомление по электронной почте через бэкенд
 */
export const sendEmailNotification = async (
    recipient: string,
    subject: string,
    content: NotificationContent
): Promise<boolean> => {
    console.log(`Отправка Email на ${recipient}`, {
        subject,
        content
    });

    try {
        // Формируем данные для отправки на бэкенд
        const emailData = {
            recipient,
            subject,
            content: {
                booking_id: content.bookingId,
                apartment_id: content.apartmentId,
                apartment_title: content.apartmentTitle,
                customer_name: content.customerName,
                customer_email: content.customerEmail,
                customer_phone: content.customerPhone,
                check_in_date: content.checkInDate,
                check_out_date: content.checkOutDate,
                guests: content.guests,
                total_amount: content.totalAmount,
                payment_amount: content.paymentAmount,
                payment_type: content.paymentType,
                payment_status: content.paymentStatus,
                owner_whatsapp: content.ownerWhatsApp,
                has_pet: content.hasPet,
                pet_type: content.petType
            }
        };

        // Отправка запроса на бэкенд
        const response = await fetch(`${API_URL}/notifications/email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emailData),
        });

        if (!response.ok) {
            throw new Error(`Ошибка при отправке email: ${response.statusText}`);
        }

        return true;
    } catch (error) {
        console.error('Ошибка при отправке email:', error);
        return false;
    }
};

/**
 * Отправляет уведомление в Telegram через бэкенд
 */
export const sendTelegramNotification = async (
    data: FormValues
): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:8000/bot/notifications/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Отправляем только данные без chat_id
        });

        if (!response.ok) {
            console.error('Ошибка при запросе на бэкенд:', await response.text());
            throw new Error('Не удалось отправить сообщение в Telegram');
        }

        const result = await response.json();
        return result.success === true;
    } catch (error) {
        console.error('Ошибка при отправке сообщения в Telegram:', error);
        return false;
    }
};


/**
 * Генерирует ссылку на WhatsApp
 */
export const generateWhatsAppLink = (phoneNumber: string, message: string): string => {
    // Удаляем все символы, кроме цифр
    const cleanedPhone = phoneNumber.replace(/[^\d]/g, '');

    // Кодируем сообщение для URL
    const encodedMessage = encodeURIComponent(message);

    // Возвращаем ссылку на WhatsApp
    return `https://wa.me/${cleanedPhone}?text=${encodedMessage}`;
};

/**
 * Генерирует контент для уведомлений на основе имеющихся данных
 */
export const generateNotificationContent = (data: NotificationContent): {
    customerSubject: string,
    customerText: string,
    ownerSubject: string,
    ownerText: string,
    telegramText: string,
    whatsAppLink?: string,
    whatsAppMessage?: string
} => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const checkIn = formatDate(data.checkInDate);
    const checkOut = formatDate(data.checkOutDate);

    const paymentTypeText = data.paymentType === 'prepayment'
        ? `Предоплата (${Math.round(data.paymentAmount / data.totalAmount * 100)}%)`
        : 'Полная оплата';

    const paymentStatusText = {
        'pending': 'Ожидает оплаты',
        'succeeded': 'Оплачено',
        'canceled': 'Отменено'
    }[data.paymentStatus];

    // Информация о документах для WhatsApp
    const documentsInfo = `Для завершения бронирования, пожалуйста, отправьте фотографию вашего паспорта (только страницу с основной информацией) владельцу квартиры через WhatsApp: ${data.ownerWhatsApp || 'номер будет отправлен дополнительно'}`;

    // WhatsApp сообщение для клиента
    const whatsAppMessage = `Здравствуйте, ${data.customerName}! Я владелица квартиры "${data.apartmentTitle}" по вашему бронированию на ${checkIn} - ${checkOut}. Для подтверждения бронирования пришлите, пожалуйста, фотографию разворота паспорта с основной информацией. Это необходимо для обеспечения безопасности имущества. Фотография будет удалена сразу после вашего отъезда. Спасибо за понимание!`;

    // Уведомление для клиента
    const customerSubject = `Бронирование квартиры ${data.apartmentTitle}`;
    const customerText = `
    Здравствуйте, ${data.customerName}!

    Ваше бронирование квартиры "${data.apartmentTitle}" успешно создано.
    
    Детали бронирования:
    - Даты проживания: с ${checkIn} по ${checkOut}
    - Количество гостей: ${data.guests}
    - Общая стоимость: ${data.totalAmount.toLocaleString()} ₽
    - ${paymentTypeText}: ${data.paymentAmount.toLocaleString()} ₽
    - Статус оплаты: ${paymentStatusText}
    ${data.hasPet ? `- С питомцем: ${data.petType}` : '- Без питомцев'}
    
    ВАЖНО! Для завершения бронирования необходимо:
    1. Отправить фотографию паспорта (2-3 страница) владельцу через WhatsApp
    (НОМЕР ВЛАДЕЛЬЦА ОБЯЗАТЕЛЬНО ДОЛЖЕН СОВПАДАТЬ С НОМЕРОМ НА САЙТЕ!!!!) ---> https://airapartmv.ru/contact
    2. Получить подтверждение и информацию о заселении
    
    Отправить документы можно по ссылке: ${data.ownerWhatsApp ? generateWhatsAppLink(data.ownerWhatsApp, whatsAppMessage) : 'Ссылка будет отправлена дополнительно'}
    
    Ваши документы необходимы только для идентификации и обеспечения безопасности имущества. 
    Они будут удалены сразу после вашего отъезда.
    
    Если у вас возникнут вопросы, пожалуйста, свяжитесь с нами по телефону или электронной почте.
    
    С уважением,
    Команда АпартРента
  `;

    // Уведомление для владельца
    const ownerSubject = `Новое бронирование: ${data.apartmentTitle}`;
    const ownerText = `
    Новое бронирование!
    
    Информация о бронировании:
    - Квартира: ${data.apartmentTitle} (ID: ${data.apartmentId})
    - Даты: ${checkIn} - ${checkOut}
    - Гостей: ${data.guests}
    - Общая сумма: ${data.totalAmount.toLocaleString()} ₽
    - ${paymentTypeText}: ${data.paymentAmount.toLocaleString()} ₽
    - Статус оплаты: ${paymentStatusText}
    
    Информация о клиенте:
    - Имя: ${data.customerName}
    - Email: ${data.customerEmail}
    - Телефон: ${data.customerPhone}
    ${data.hasPet ? `- С питомцем: ${data.petType}` : '- Без питомцев'}
    
    ВАЖНО! Клиент должен отправить вам фотографию паспорта через WhatsApp для завершения бронирования.
    Пожалуйста, проверьте свой WhatsApp и подтвердите получение документов.
  `;

    // Уведомление для Telegram
    const telegramText = `
📋 *Новое бронирование*
🏠 ${data.apartmentTitle}
📅 ${checkIn} → ${checkOut}
👥 ${data.guests} гост.
💰 ${data.totalAmount.toLocaleString()} ₽
💳 ${paymentTypeText}: ${data.paymentAmount.toLocaleString()} ₽
✅ ${paymentStatusText}

👤 *Клиент*
- ${data.customerName}
- ${data.customerPhone}
- ${data.customerEmail}
${data.hasPet ? `- С питомцем: ${data.petType}` : '- Без питомцев'}

⚠️ *Ожидается получение документов через WhatsApp*
  `;

    return {
        customerSubject,
        customerText,
        ownerSubject,
        ownerText,
        telegramText,
        whatsAppLink: data.ownerWhatsApp ? generateWhatsAppLink(data.ownerWhatsApp, whatsAppMessage) : undefined,
        whatsAppMessage
    };
};