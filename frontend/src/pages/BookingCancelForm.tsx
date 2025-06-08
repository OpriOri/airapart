import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { bookingService } from '@/services/booking';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, XCircle, CheckCircle2, Shield } from 'lucide-react';
import {Checkbox} from "@/components/ui/checkbox.tsx";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';


// Схема валидации формы
const formSchema = z.object({
    bookingId: z
        .string()
        .length(36, { message: 'Неверный ID бронирования, проверьте почту!' }) // UUID с дефисами
        .refine(val => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val), {
            message: 'Неверный формат айди брони, проверьте почту!',
        }),
    cancelToken: z
        .string()
        .length(36, { message: 'Неверный токен отмены бронирования, проверьте почту!' }), // токен также UUID без дефисов
    reason: z.string().optional(),
    agreeToTerms: z.boolean().refine(val => val === true, {
        message: 'Вы должны согласиться с правилами отмены бронирования',
    }),
});


interface BookingCancellationFormProps {
    bookingId: string;
}

type FormValues = z.infer<typeof formSchema>;


export default function BookingCancelForm({ bookingId }: BookingCancellationFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showCancellationPolicy, setShowCancellationPolicy] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bookingId: bookingId,
            cancelToken: '',
            reason: '',
            agreeToTerms: false,
        },
    });

    const onSubmit = async (values: FormValues) => {
        if (!values.agreeToTerms) {
            setError('Необходимо согласие с условиями отмены!');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await bookingService.cancelBookingByClient(
                values.bookingId,
                values.cancelToken,
                values.reason
            );

            if (response.success) {
                setIsCancelled(true);
                toast({
                    title: 'Бронирование отменено',
                    description: 'На вашу почту отправлено подтверждение отмены.',
                    variant: 'default',
                });
            } else {
                throw new Error(response.message || 'Ошибка при отмене бронирования');
            }
        } catch (err: any) {
            console.error('Cancel error:', err);
            setError(err.message || 'Не удалось отменить бронирование');
            toast({
                title: 'Ошибка отмены',
                description: err.message || 'Что-то пошло не так.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isCancelled) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 pt-24 px-4">
                    <div className="max-w-md mx-auto text-center p-8 space-y-4">
                        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                        <h2 className="text-2xl font-bold">Бронирование успешно отменено!</h2>
                        <p className="text-muted-foreground">
                            Ваше бронирование было успешно отменено. Если применимо, возврат средств будет обработан в соответствии с нашей политикой возврата.
                            Необходимая информация об отмененном бронировании уже выслана на вашу почту, вы можете связаться с нами если что-то пошло не так.
                        </p>
                        <Button className="mt-4" onClick={() => window.location.href = '/'}>
                            Вернуться на главную
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 pt-24 px-4">
                {/* Hero section */}
                <section className="bg-secondary/30">
                    <div className="container px-4 py-12 mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">Отмена бронирования</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Здесь вы можете отменить ваше бронирование. Пожалуйста, введите ID бронирования и код отмены, которые были отправлены на ваш email.
                        </p>
                    </div>
                </section>

                {/* Форма отмены бронирования */}
                <section className="container py-12 mx-auto">
                    <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm max-w-md mx-auto">
                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Ошибка</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}


                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="bookingId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>ID Бронирования</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Введите ID бронирования"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                ID бронирования был отправлен на ваш email
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cancelToken"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Код отмены</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Введите код отмены"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Код отмены был отправлен на ваш email при бронировании
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="reason"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Причина отмены (необязательно)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Укажите причину отмены бронирования..."
                                                    className="min-h-24 resize-none"
                                                    {...field}
                                                    disabled={isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="agreeToTerms"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-sm cursor-pointer">
                                                    Я ознакомился(-лась) и согласен(-а) с <Button
                                                    variant="link"
                                                    className="p-0 h-auto text-primary"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShowCancellationPolicy(true);
                                                    }}
                                                >
                                                    правилами отмены бронирования
                                                </Button>
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <div className="flex justify-between space-x-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-1/2"
                                        onClick={() => window.history.back()}
                                        disabled={isSubmitting}
                                    >
                                        Назад
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="destructive"
                                        className="w-1/2"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Отмена...
                                    </span>
                                        ) : (
                                            <span className="flex items-center">
                                        <XCircle className="mr-2 h-5 w-5" />
                                        Отменить
                                    </span>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </section>
            </main>
            <Dialog open={showCancellationPolicy} onOpenChange={setShowCancellationPolicy}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <Shield className="mr-2 h-5 w-5 text-primary" />
                            Условия отмены бронирования
                        </DialogTitle>
                        <DialogDescription>
                            Дата последнего обновления: {new Date().toLocaleDateString()}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 text-sm">
                        <h3 className="text-lg font-semibold">1. Общие положения</h3>
                        <p>
                            1.1. Настоящие условия регулируют порядок отмены бронирования апартаментов, размещённых на платформе «Апартаменты у аэропорта / АпартРента» (ИП Иванов И.И., ОГРНИП 123456789012).<br />
                            1.2. Бронирование считается действительным после 100% оплаты и подтверждения через систему.<br />
                            1.3. Условия отмены применяются только к бронированиям, оформленным через официальные каналы платформы.
                        </p>

                        <h3 className="text-lg font-semibold">2. Условия отмены</h3>
                        <p>
                            2.1. При отмене бронирования применяются следующие штрафные санкции:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Более 72 часов до заезда:</strong> полный возврат средств за вычетом комиссии платежного системы (если применимо).</li>
                            <li><strong>От 72 до 24 часов до заезда:</strong> удерживается 30% от общей суммы бронирования.</li>
                            <li><strong>Менее 24 часов до заезда:</strong> удерживается стоимость первых суток проживания.</li>
                            <li><strong>Неявка (no-show):</strong> штраф в размере 100% стоимости первых суток.</li>
                        </ul>
                        <p>
                            2.2. Время расчёта — по часовому поясу места размещения апартаментов (МСК, UTC+3).
                        </p>

                        <h3 className="text-lg font-semibold">3. Возврат средств</h3>
                        <p>
                            3.1. Возврат осуществляется на исходный способ оплаты в течение:<br />
                            — 10 рабочих дней для банковских карт (срок зависит от банка получателя);<br />
                            — 7 рабочих дней для электронных платежных систем.<br />
                            3.2. При частичном возврате комиссия платежного системы не компенсируется.
                        </p>

                        <h3 className="text-lg font-semibold">4. Форс-мажор</h3>
                        <p>
                            4.1. При наступлении обстоятельств непреодолимой силы (ЧС, военные действия, природные катастрофы), подтверждённых официальными документами, бронирование аннулируется без штрафов.<br />
                            4.2. Для пересмотра условий необходимо предоставить доказательства не позднее 3 дней после события.
                        </p>

                        <h3 className="text-lg font-semibold">5. Изменение бронирования</h3>
                        <p>
                            5.1. Перенос дат приравнивается к отмене с применением соответствующих штрафов и созданию нового бронирования.<br />
                            5.2. Возможность переноса зависит от наличия свободных мест и согласия Арендодателя.
                        </p>

                        <h3 className="text-lg font-semibold">6. Споры и контакты</h3>
                        <p>
                            6.1. Все споры решаются путём переговоров, а при недостижении согласия — в суде по месту регистрации ИП «АпартРента».<br />
                            6.2. Контакты для урегулирования вопросов:<br />
                            — Email: <a href="mailto:info@apartrent.ru" className="text-primary underline">info@apartrent.ru</a><br />
                            — Телефон: <a href="tel:+79283519192" className="text-primary underline">+7 (928) 351-91-92</a><br />
                            — Юридический адрес: 357200, г. Минеральные Воды, ул. Советская, д. 123.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

    );
}