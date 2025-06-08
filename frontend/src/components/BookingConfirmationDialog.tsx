import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Shield, Check, User, Mail, Phone, Loader2, Cat, Dog } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PrivacyPolicyDialog } from '@/components/PrivacyPolicyDialog';
import { PaymentData, createBooking } from '@/services/payment';
import { useNavigate } from 'react-router-dom';
import { PublicOfferDialog } from "@/components/PublicOfferDialog.tsx";

interface BookingConfirmationProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    propertyTitle: string;
    propertyId: string;
    dateRange: DateRange | undefined;
    guests: number;
    totalPrice: number;
    onConfirm: () => void;
}

const bookingFormSchema = z.object({
    fullName: z.string().min(2, { message: "Введите ваше полное имя" }),
    phone: z.string().min(6, { message: "Введите корректный номер телефона" }),
    email: z.string().email({ message: "Введите корректный email" }),
    hasPet: z.boolean().default(false),
    petType: z.string().optional(),
    privacyPolicy: z.literal(true, {
        errorMap: () => ({ message: "Необходимо согласиться с политикой конфиденциальности" }),
    }),
    publicOffer: z.literal(true, {
        errorMap: () => ({ message: "Необходимо согласиться с публичной офертой" }),
    }),
}).refine(data => !data.hasPet || (data.hasPet && data.petType && data.petType.length > 0), {
    message: "Укажите тип питомца",
    path: ["petType"],
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export function BookingConfirmationDialog({
                                              open,
                                              onOpenChange,
                                              propertyTitle,
                                              propertyId,
                                              dateRange,
                                              guests,
                                              totalPrice,
                                              onConfirm,
                                          }: BookingConfirmationProps) {
    const isMobile = useIsMobile();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [showPublicOffer, setShowPublicOffer] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);


    const form = useForm<BookingFormValues>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            email: "",
            hasPet: false,
            petType: "",
            privacyPolicy: undefined as unknown as true,
            publicOffer: undefined as unknown as true,
        },
    });


    const hasPet = form.watch("hasPet");


    const handleConfirm = async (values: BookingFormValues) => {
        try {
            setIsProcessing(true);

            if (!(dateRange?.from && dateRange?.to)) {
                throw new Error("Даты бронирования не указаны");
            }

            const bookingData: PaymentData = {
                description: `Оплата квартиры "${propertyTitle}"`,
                customerEmail: values.email,
                customerPhone: values.phone,
                customerName: values.fullName,
                apartmentId: propertyId,
                apartmentTitle: propertyTitle,
                checkInDate: dateRange.from.toISOString(),
                checkOutDate: dateRange.to.toISOString(),
                guests,
                hasPet: values.hasPet,
                petType: values.hasPet && values.petType?.trim()
                    ? values.petType.trim().toLowerCase()
                    : undefined,
                totalAmount: totalPrice,
            };

            const response = await createBooking(bookingData);

            toast({
                title: "Бронирование успешно!",
                description: `${values.fullName}, ваше бронирование подтверждено!`,
            });

            onConfirm();
            onOpenChange(false);

            window.location.href = response.confirmation_url;


        } catch (error) {
            console.error("Ошибка при создании бронирования:", error);
            toast({
                title: "Ошибка",
                description: "Произошла ошибка при создании бронирования. Пожалуйста, попробуйте снова.",
                variant: "destructive",
            });
        } finally {
            setIsProcessing(false);
        }
    };



    const content = (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleConfirm)} className="space-y-4 w-full flex flex-col">
                <div className="flex-1">
                    <ScrollArea className="h-[450px] pr-4">
                        <div className="space-y-4 pb-4">
                            <div>
                                <h3 className="font-medium text-lg">Детали бронирования</h3>
                                <p className="text-muted-foreground">{propertyTitle}</p>
                            </div>

                            {dateRange?.from && dateRange.to && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Заезд</p>
                                        <p className="font-medium">{format(dateRange.from, 'dd MMMM yyyy', { locale: ru })}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Выезд</p>
                                        <p className="font-medium">{format(dateRange.to, 'dd MMMM yyyy', { locale: ru })}</p>
                                    </div>
                                </div>
                            )}

                            <div>
                                <p className="text-sm text-muted-foreground">Гости</p>
                                <p className="font-medium">{guests} {guests === 1 ? 'гость' : guests < 5 ? 'гостя' : 'гостей'}</p>
                            </div>

                            <Separator className="my-4" />

                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ФИО</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9" placeholder="Иванов Иван Иванович" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Номер телефона</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9" placeholder="+7 (999) 123-45-67" {...field} />
                                            </div>
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
                                        <FormLabel>Электронная почта</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                <Input className="pl-9" placeholder="example@mail.ru" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hasPet"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="cursor-pointer">
                                                Я планирую приехать с питомцем
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {hasPet && (
                                <FormField
                                    control={form.control}
                                    name="petType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Укажите тип питомца</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="cat" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal cursor-pointer flex items-center">
                                                            <Cat className="mr-2 h-4 w-4" /> Кошка
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="dog" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal cursor-pointer flex items-center">
                                                            <Dog className="mr-2 h-4 w-4" /> Собака
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value="other" />
                                                        </FormControl>
                                                        <FormLabel className="font-normal cursor-pointer">
                                                            Другой питомец
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <Separator className="my-4" />



                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Общая стоимость</span>
                                    <span className="font-medium">{totalPrice.toLocaleString()} ₽</span>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="privacyPolicy"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                                        <FormControl>
                                            <Checkbox
                                                id="privacyPolicy"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel htmlFor="privacyPolicy" className="text-sm font-normal cursor-pointer">
                                                Я согласен с{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPrivacyPolicy(true)}
                                                    className="text-primary underline font-medium hover:text-primary/80"
                                                >
                                                    политикой конфиденциальности
                                                </button>
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="publicOffer"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                                        <FormControl>
                                            <Checkbox
                                                id="publicOffer"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel htmlFor="publicOffer" className="text-sm font-normal cursor-pointer">
                                                Я согласен с{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPublicOffer(true)}
                                                    className="text-primary underline font-medium hover:text-primary/80"
                                                >
                                                    публичной офертой
                                                </button>
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-start gap-2 text-sm bg-muted p-3 rounded-lg">
                                <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium">Безопасное бронирование</p>
                                    <p className="text-muted-foreground">Ваши данные защищены и не будут переданы третьим лицам</p>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>

                <div className="pt-2 bg-background">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isProcessing}
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Обработка...
                            </>
                        ) : (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                {"Перейти к оплате"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );

    return (
        <>
            {isMobile ? (
                <Drawer open={open} onOpenChange={onOpenChange}>
                    <DrawerContent className="max-h-[90vh]">
                        <DrawerHeader className="pb-2">
                            <DrawerTitle>Подтверждение бронирования</DrawerTitle>
                            <DrawerDescription>
                                Проверьте детали вашего бронирования
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="px-4 pb-2 flex-1 flex flex-col">
                            {content}
                        </div>
                    </DrawerContent>
                </Drawer>
            ) : (
                <Dialog open={open} onOpenChange={onOpenChange}>
                    <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
                        <DialogHeader className="pb-2">
                            <DialogTitle>Подтверждение бронирования</DialogTitle>
                            <DialogDescription>
                                Проверьте детали вашего бронирования
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex-1 flex flex-col">
                            {content}
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <PrivacyPolicyDialog
                open={showPrivacyPolicy}
                onOpenChange={setShowPrivacyPolicy}
            />

            <PublicOfferDialog
                open={showPublicOffer}
                onOpenChange={setShowPublicOffer}
            />
        </>
    );
}
