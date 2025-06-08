import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingCancelForm from '../pages/BookingCancelForm.tsx';
import { useCsrfToken } from "@/hooks/use-csrf-token.ts";

export default function CancelBooking() {
    useCsrfToken();
    const { bookingId } = useParams<{ bookingId: string }>();

    if (!bookingId) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 pt-24 px-4">
                    <div className="container mx-auto py-16 text-center">
                        <h1 className="text-4xl font-bold mb-4">Ошибка</h1>
                        <p className="text-lg mb-8">
                            Не указан идентификатор бронирования. Пожалуйста, проверьте ссылку.
                        </p>
                        <a
                            href="/"
                            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                        >
                            Вернуться на главную
                        </a>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24">
                {/* Hero section */}
                <section className="bg-secondary/30">
                    <div className="container px-4 py-12 mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Отмена бронирования</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Здесь вы можете отменить ваше бронирование. Пожалуйста, введите код отмены, который был отправлен на ваш email.
                        </p>
                    </div>
                </section>


            </main>

            <Footer />
        </div>
    );
}