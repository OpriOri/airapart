import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, LogOut, Calendar, Info, AlertTriangle } from 'lucide-react';

export function CheckInRules() {
    return (
        <Card className="mb-6">
            <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center">
                    <Info className="mr-2 h-5 w-5 text-primary" />
                    Правила заселения
                </CardTitle>
                <CardDescription>
                    Важная информация о заезде и выезде
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">Время заезда</p>
                            <p className="text-muted-foreground">Круглосуточно</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <LogOut className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">Время выезда</p>
                            <p className="text-muted-foreground">До 12:00</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-3 pt-2">
                    <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium">Минимальный срок бронирования</p>
                        <p className="text-muted-foreground">1 сутки</p>
                    </div>
                </div>
                <div className="flex items-start gap-3 pt-2 border-t border-muted">
                    <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-medium">Политика отмены</p>
                        <p className="text-muted-foreground">Бронирование можно отменить бесплатно не менее чем за 1 день до даты заезда</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
