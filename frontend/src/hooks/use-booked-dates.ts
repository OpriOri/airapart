import { useState, useEffect, useCallback, useMemo } from 'react';

interface BookedDateRange {
    start: Date;
    end: Date;
}

interface BookedDatesResponse {
    apartment_id: number;
    booked_dates: {
        start: string;
        end: string;
    }[];
    next_available?: string | null;
}

export function useBookedDates(apartmentId: number | null) {
    const [bookedRanges, setBookedRanges] = useState<BookedDateRange[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBookedDates = useCallback(async () => {
        if (!apartmentId) {
            setBookedRanges([]);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`/api/bookings/by-apartment/${apartmentId}`, {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error(`Ошибка загрузки: ${response.status}`);
            }

            const data: BookedDatesResponse = await response.json();

            // Валидация и преобразование дат
            const ranges = data.booked_dates.map(range => {
                const start = new Date(range.start);
                const end = new Date(range.end);

                if (isNaN(start.getTime())) throw new Error(`Неверная дата начала: ${range.start}`);
                if (isNaN(end.getTime())) throw new Error(`Неверная дата окончания: ${range.end}`);

                return { start, end };
            });

            setBookedRanges(ranges);
            setError(null);
        } catch (err) {
            console.error('Ошибка получения данных:', err);
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            setBookedRanges([]);
        } finally {
            setIsLoading(false);
        }
    }, [apartmentId]);

    useEffect(() => {
        fetchBookedDates();
    }, [fetchBookedDates]);

    // Мемоизированный массив всех забронированных дат (для react-day-picker)
    const bookedDates = useMemo(() => {
        return bookedRanges.flatMap(range => {
            const dates: Date[] = [];
            let current = new Date(range.start);
            const end = new Date(range.end);

            while (current <= end) {
                dates.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }

            return dates;
        });
    }, [bookedRanges]);

    const isDateBooked = useCallback((date: Date): boolean => {
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);

        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);

        return bookedRanges.some(range =>
            dayStart < range.end && dayEnd > range.start
        );
    }, [bookedRanges]);

    const isRangeAvailable = useCallback((start: Date, end: Date): boolean => {
        return !bookedRanges.some(range =>
            (start < range.end && end > range.start)
        );
    }, [bookedRanges]);

    const isPartialRangeAvailable = useCallback((start: Date, end: Date): boolean => {
        const startTime = start.getTime();
        const endTime = end.getTime();

        return !bookedRanges.some(range => {
            const rangeStart = range.start.getTime();
            const rangeEnd = range.end.getTime();

            // Проверка на любое пересечение
            return (
                (startTime < rangeEnd && endTime > rangeStart)
            );
        });
    }, [bookedRanges]);

    return {
        bookedRanges,
        bookedDates, // Добавлено для react-day-picker
        isLoading,
        error,
        isDateBooked,
        isRangeAvailable,
        isPartialRangeAvailable,
        refresh: fetchBookedDates
    };
}