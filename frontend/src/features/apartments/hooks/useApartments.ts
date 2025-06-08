import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { allProperties } from '../data/propertyData';

export default function useApartments() {
    const [properties, setProperties] = useState(allProperties);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, 20000]);
    const [selectedBedrooms, setSelectedBedrooms] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        filterProperties();
    }, [searchQuery, priceRange, selectedBedrooms, selectedCity, dateRange]);

    const filterProperties = () => {
        let filtered = allProperties;

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(property =>
                property.title.toLowerCase().includes(query) ||
                property.location.toLowerCase().includes(query)
            );
        }

        // Filter by price range
        filtered = filtered.filter(property =>
            property.price >= priceRange[0] && property.price <= priceRange[1]
        );

        // Filter by bedrooms
        if (selectedBedrooms) {
            const bedroomsCount = parseInt(selectedBedrooms);
            filtered = filtered.filter(property => property.bedrooms === bedroomsCount);
        }

        // Filter by city
        if (selectedCity) {
            filtered = filtered.filter(property =>
                property.location.includes(selectedCity)
            );
        }

        // Filter by date range - этот фильтр просто для примера, так как у нас нет данных о занятости
        // В реальном приложении здесь была бы проверка доступности квартиры на выбранные даты
        if (dateRange?.from && dateRange?.to) {
            // Для демонстрации просто отфильтруем случайные квартиры
            filtered = filtered.filter(property =>
                (property.id % 3 !== 0) // Простая фильтрация для демонстрации
            );
        }

        setProperties(filtered);
    };

    const resetFilters = () => {
        setSearchQuery('');
        setPriceRange([0, 20000]);
        setSelectedBedrooms('');
        setSelectedCity('');
        setDateRange(undefined);
        setProperties(allProperties);
    };

    return {
        properties,
        searchQuery,
        setSearchQuery,
        priceRange,
        setPriceRange,
        selectedBedrooms,
        setSelectedBedrooms,
        selectedCity,
        setSelectedCity,
        dateRange,
        setDateRange,
        isLoading,
        resetFilters
    };
}