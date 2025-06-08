import * as React from "react";
import { ru } from "date-fns/locale";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useBookedDates } from "@/hooks/use-booked-dates";

interface DateRangePickerProps {
    dateRange: DateRange | undefined;
    onDateRangeChange: (range: DateRange | undefined) => void;
    className?: string;
    disabled?: boolean;
    apartmentId?: number; // Изменили тип на number
}

export function DateRangePicker({
                                    dateRange,
                                    onDateRangeChange,
                                    className,
                                    disabled = false,
                                    apartmentId,
                                }: DateRangePickerProps) {
    const { toast } = useToast();

    const {
        bookedDates,
        isLoading,
        error,
        isDateBooked,
        isRangeAvailable,
        isPartialRangeAvailable,
        bookedRanges
    } = useBookedDates(apartmentId || null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Обработка ошибок
    React.useEffect(() => {
        if (error) {
            toast({
                title: "Ошибка",
                description: error,
                variant: "destructive",
            });
        }
    }, [error, toast]);

    // Функция для блокировки дат
    const disabledDays = React.useCallback(
        (date: Date) => {
            const dayStart = new Date(date);
            dayStart.setHours(0, 0, 0, 0);

            const dayEnd = new Date(date);
            dayEnd.setHours(23, 59, 59, 999);

            // Блокируем прошедшие даты
            if (date < today) return true;

            // Блокируем даты, которые полностью или частично забронированы
            return bookedRanges.some(range =>
                dayStart < range.end && dayEnd > range.start
            );
        },
        [today, bookedRanges]
    );

    // Обработчик выбора дат
    const handleSelect = (range: DateRange | undefined) => {
        if (!range?.from || !range?.to) {
            onDateRangeChange(range);
            return;
        }

        // Проверка полной доступности
        if (!isRangeAvailable(range.from, range.to)) {
            toast({
                title: "Ошибка",
                description: "Выбранный период полностью занят",
                variant: "destructive",
            });
            return;
        }

        // Проверка частичного пересечения
        if (!isPartialRangeAvailable(range.from, range.to)) {
            toast({
                title: "Внимание",
                description: "Выбранный период частично пересекается с существующими бронированиями",
            });
            onDateRangeChange(range);
            return;
        }

        onDateRangeChange(range);
    };

    // Получаем даты для визуального выделения
    const getPartialOverlapDates = () => {
        if (!dateRange?.from || !dateRange?.to) return [];

        return bookedRanges.flatMap(range => {
            const overlapStart = new Date(Math.max(range.start.getTime(), dateRange.from.getTime()));
            const overlapEnd = new Date(Math.min(range.end.getTime(), dateRange.to.getTime()));

            const dates = [];
            let current = new Date(overlapStart);

            while (current <= overlapEnd) {
                dates.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }

            return dates;
        });
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateRange && "text-muted-foreground",
                            isLoading && "opacity-70 cursor-not-allowed"
                        )}
                        disabled={disabled || isLoading}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Загрузка доступных дат...
                            </span>
                        ) : (
                            <>
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dateRange?.from ? (
                                    dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "dd.MM.yyyy", { locale: ru })} -{" "}
                                            {format(dateRange.to, "dd.MM.yyyy", { locale: ru })}
                                        </>
                                    ) : (
                                        format(dateRange.from, "dd.MM.yyyy", { locale: ru })
                                    )
                                ) : (
                                    <span>Выберите даты</span>
                                )}
                            </>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange?.from || new Date()}
                        selected={dateRange}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                        locale={ru}
                        disabled={disabledDays}
                        fromDate={today}
                        modifiers={{
                            booked: bookedDates,
                            partial: getPartialOverlapDates()
                        }}
                        modifiersClassNames={{
                            booked: "bg-red-100 text-gray-500 opacity-60"
                        }}
                        footer={
                            <div className="px-4 pb-4 pt-0 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-red-100 rounded-sm"></div>
                                    <span>Полностью занято</span>
                                </div>
                            </div>
                        }
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}