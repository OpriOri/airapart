/**
 * Сервис для работы с платежной системой и создания бронирований
 */

export interface PaymentData {
    description: string;
    customerEmail: string;
    customerPhone: string;
    customerName: string;
    apartmentId: string;
    apartmentTitle: string;
    checkInDate: string;
    checkOutDate: string;
    guests: number;
    hasPet?: boolean;
    petType?: string;
    totalAmount: number; // может использоваться на фронте для отображения
}

export interface BookingResponse {
    confirmation_url: string;

    status: 'pending' | 'confirmed' | 'canceled';
}

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Создает бронирование без оплаты (временно используем для всех типов, кроме оплаты через ЮKassa)
 */
export const createBooking = async (bookingData: PaymentData): Promise<BookingResponse> => {
    try {
        const response = await fetch(`${API_URL}/payments/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingData),
        });


        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Ошибка сервера");
        }

        return await response.json();
    } catch (error) {
        console.error("Ошибка при создании бронирования:", error);
        throw error;
    }
};
