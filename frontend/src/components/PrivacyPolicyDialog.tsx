import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrivacyPolicyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PrivacyPolicyDialog({ open, onOpenChange }: PrivacyPolicyDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Политика конфиденциальности</DialogTitle>
                    <DialogDescription>
                        Последнее обновление: {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[50vh] pr-4">
                    <div className="space-y-4 text-sm">
                        <p>
                            Сервис "Апартаменты у аэропорта" (далее "мы", "нас" или "наш") управляет сайтом apartrentа.ru (далее "Сервис").
                        </p>

                        <h4 className="text-base font-medium mt-6">Сбор и использование информации</h4>

                        <h5 className="font-medium mt-4">Типы собираемых данных</h5>
                        <p><strong>Персональные данные</strong></p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Адрес электронной почты</li>
                            <li>Имя и фамилия</li>
                            <li>Номер телефона</li>
                            <li>Данные бронирования (даты, количество гостей)</li>
                        </ul>

                        <h5 className="font-medium mt-4">Платежные данные</h5>
                        <p>
                            Все платежи обрабатываются через защищенный шлюз <strong>ЮКасса</strong>.
                            Мы не храним данные вашей банковской карты — их обработка полностью осуществляется платежной системой
                            в соответствии со стандартом безопасности PCI DSS.
                        </p>

                        <h5 className="font-medium mt-4">Технические данные</h5>
                        <p>
                            IP-адрес, тип браузера, cookies (используются для анализа трафика
                            и улучшения работы сервиса).
                        </p>

                        <h4 className="text-base font-medium mt-6">Как мы используем данные</h4>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Подтверждение и выполнение бронирований</li>
                            <li>Связь с вами по вопросам аренды</li>
                            <li>Улучшение функционала сайта</li>
                            <li>Предотвращение мошеннических действий</li>
                        </ul>

                        <h4 className="text-base font-medium mt-6">Безопасность</h4>
                        <p>
                            Мы используем: HTTPS-шифрование, регулярное обновление ПО,
                            ограниченный доступ к данным. Платежи защищены сертификатами
                            PCI DSS через ЮКассу.
                        </p>

                        <h4 className="text-base font-medium mt-6">Ваши права</h4>
                        <p>
                            Вы можете запросить удаление данных или отозвать согласие
                            на обработку, написав на info@apartrentа.ru.
                        </p>

                        <h4 className="text-base font-medium mt-6">Контакты</h4>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Email: info@apartrentа.ru</li>
                            <li>Телефон: +7 800 123-45-67</li>
                        </ul>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}