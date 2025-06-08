import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Calendar, MapPin, Users, CreditCard, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface BookingInfo {
    propertyTitle: string;
    checkInDate: string;
    checkOutDate: string;
    customerName: string;
    status: string;
}

export default function PaymentSuccess() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();
    const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);

    // Проверяем, пришли ли мы с бронирования или с оплаты
    const fromBooking = location.state?.fromBooking || false;

    useEffect(() => {
        document.title = 'Успешное бронирование - АпартРента';

        // Получаем информацию о бронировании из localStorage
        const bookingData = localStorage.getItem('lastBooking');
        if (bookingData) {
            try {
                const parsedData = JSON.parse(bookingData);
                setBookingInfo(parsedData);
            } catch (e) {
                console.error('Ошибка при чтении данных бронирования:', e);
            }
        } else {
            console.warn("Данные о бронировании не найдены в localStorage");
        }
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <div className="pt-20 flex-grow">
                <div className="container mx-auto px-4 py-12">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mb-6"
                        onClick={() => navigate('/')}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        На главную
                    </Button>

                    <div className="max-w-lg mx-auto">
                        <Card className="border border-primary/20">
                            <CardHeader className="bg-primary-foreground/50">
                                <div className="flex items-center justify-center mb-4">
                                    <CheckCircle className="h-16 w-16 text-primary" />
                                </div>
                                <CardTitle className="text-center text-2xl">
                                    {fromBooking ? "Бронирование успешно создано!" : "Оплата прошла успешно!"}
                                </CardTitle>
                                <CardDescription className="text-center">
                                    {fromBooking
                                        ? "Ваше бронирование было успешно создано. Данные отправлены на вашу почту."
                                        : "Ваш платеж был успешно обработан. Данные о бронировании отправлены на вашу почту."
                                    }
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-6 space-y-6">
                                <Alert>
                                    <Info className="h-5 w-5" />
                                    <AlertTitle>Важная информация</AlertTitle>
                                    <AlertDescription>
                                        Детали бронирования и инструкции отправлены вам на email. Пожалуйста, проверьте свою почту,
                                        включая папку "Спам". В письме вы найдете номер бронирования и ссылку для управления бронированием,
                                        если вам потребуется внести изменения или отменить его.
                                    </AlertDescription>
                                </Alert>

                                {bookingInfo ? (
                                    <div className="space-y-4 mt-4">
                                        <Separator />

                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Квартира</div>
                                                    <div className="font-medium">{bookingInfo.propertyTitle}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Даты проживания</div>
                                                    <div className="font-medium">
                                                        {formatDate(bookingInfo.checkInDate)} - {formatDate(bookingInfo.checkOutDate)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="text-sm text-muted-foreground">На имя</div>
                                                    <div className="font-medium">{bookingInfo.customerName}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <CreditCard className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Статус</div>
                                                    <div className="font-medium capitalize">
                                                        {bookingInfo.status === 'confirmed' ? 'Подтверждено' :
                                                            bookingInfo.status === 'paid' ? 'Оплачено' :
                                                                bookingInfo.status === 'pending' ? 'В ожидании' :
                                                                    bookingInfo.status === 'canceled' ? 'Отменено' :
                                                                        bookingInfo.status}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-4 text-center text-muted-foreground">
                                        {fromBooking
                                            ? "Информация о бронировании будет доступна после обработки."
                                            : "Информация о платеже будет доступна после обработки."
                                        }
                                    </div>
                                )}
                            </CardContent>

                            <CardFooter className="flex flex-col gap-2">
                                <Button
                                    className="w-full"
                                    onClick={() => navigate('/apartments')}
                                >
                                    Продолжить просмотр квартир
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => navigate('/')}
                                >
                                    Вернуться на главную
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}