import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';


// Define your Telegram bot token and chat ID here
// In a real application, these should be environment variables


const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Имя должно содержать не менее 2 символов.',
    }),
    email: z.string().email({
        message: 'Пожалуйста, введите действительный email.',
    }),
    phone: z.string().min(6, {
        message: 'Пожалуйста, введите действительный номер телефона.',
    }),
    message: z.string().min(10, {
        message: 'Сообщение должно содержать не менее 10 символов.',
    }),
    privacyPolicy: z.boolean().refine(val => val === true, {
        message: 'Вы должны согласиться с политикой конфиденциальности'
    }),
});


export type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            message: '',
            privacyPolicy: false,
        },
    });



    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);

        try {
            // ВРЕМЕННАЯ ЗАГЛУШКА: имитируем успешную отправку
            await new Promise((resolve) => setTimeout(resolve, 500)); // типа "отправка"

            // Success
            setIsSubmitted(true);
            toast({
                title: "Сообщение отправлено",
                description: "Мы свяжемся с вами в ближайшее время.",
            });

            // Success
            setIsSubmitted(true);

            toast({
                title: "Сообщение отправлено",
                description: "Мы свяжемся с вами в ближайшее время.",
            });

            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                form.reset();
            }, 3000);
        } catch (error) {
            console.error('Form submission error:', error);
            toast({
                title: "Ошибка отправки",
                description: "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
            {!isSubmitted ? (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Иван Иванов" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="example@mail.ru" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Телефон</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+7 (999) 123-45-67" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Сообщение</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Напишите ваш вопрос или пожелание..."
                                            className="min-h-32 resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="privacyPolicy"
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
                                            Я согласен с{' '}
                                            <span
                                                className="text-primary underline cursor-pointer"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowPrivacyPolicy(true);
                                                }}
                                            >
                        политикой конфиденциальности
                      </span>{' '}
                                            и обработкой моих персональных данных
                                        </FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full sm:w-auto px-8 py-6 text-lg rounded-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Отправка...
                </span>
                            ) : (
                                <span className="flex items-center">
                  Отправить
                  <Send className="ml-2 h-5 w-5" />
                </span>
                            )}
                        </Button>
                    </form>
                </Form>
            ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Спасибо за ваше сообщение!</h3>
                    <p className="text-muted-foreground mb-6">
                        Мы получили ваше сообщение и ответим вам в ближайшее время.
                    </p>
                </div>
            )}

            {/* Privacy Policy Dialog */}
            <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <Shield className="mr-2 h-5 w-5 text-primary" />
                            Политика конфиденциальности
                        </DialogTitle>
                        <DialogDescription>
                            Дата последнего обновления: {new Date().toLocaleDateString()}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 text-sm">
                        <h3 className="text-lg font-semibold">1. Какие данные мы собираем</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Имя и фамилия</li>
                            <li>Адрес электронной почты</li>
                            <li>Номер телефона</li>
                            <li>Текст вашего сообщения (жалоба, предложение или вопрос)</li>
                        </ul>

                        <h3 className="text-lg font-semibold">2. Для чего мы используем эти данные</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Чтобы ответить на ваше обращение</li>
                            <li>Улучшить качество нашего сервиса</li>
                            <li>Связаться с вами для уточнения деталей</li>
                        </ul>

                        <h3 className="text-lg font-semibold">3. Как мы защищаем ваши данные</h3>
                        <p>
                            Все данные передаются через защищенное HTTPS-соединение.
                            Мы храним информацию только до решения вашего вопроса, после чего удаляем её.
                        </p>

                        <h3 className="text-lg font-semibold">4. Ваши права</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Запросить копию предоставленных данных</li>
                            <li>Отозвать согласие на обработку</li>
                            <li>Потребовать удаление ваших данных</li>
                        </ul>

                        <h3 className="text-lg font-semibold">5. Контакты</h3>
                        <p>
                            По вопросам обработки данных обращайтесь:<br />
                            Email: support@apart-airport.ru<br />
                            Телефон: +7 (928) 351-91-92
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
