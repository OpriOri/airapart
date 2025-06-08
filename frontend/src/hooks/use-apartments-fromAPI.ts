import { useEffect, useState } from 'react';
import axios from 'axios'; // библиотека для HTTP-запросов
import { Apartment } from '../types/apartment'; // тип, описывающий квартиру

export function useApartmentsFromAPI() {
    // 1. Храним список квартир
    const [apartments, setApartments] = useState<Apartment[]>([]);

    // 2. Показываем, загружаются ли данные
    const [isLoading, setIsLoading] = useState(true);

    // 3. Сохраняем возможную ошибку
    const [error, setError] = useState<null | string>(null);

    // 4. useEffect — выполнится 1 раз при загрузке компонента
    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/apartments`) // Запрос к API
            .then(res => {
                setApartments(res.data); // сохраняем квартиры
            })
            .catch(() => {
                setError('Ошибка при загрузке квартир'); // если API не отвечает
            })
            .finally(() => {
                setIsLoading(false); // загрузка завершена
            });
    }, []);

    // 5. Возвращаем все нужные значения наружу
    return { apartments, isLoading, error };
}
