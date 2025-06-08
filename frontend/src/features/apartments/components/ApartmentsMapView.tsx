import { MapPin } from 'lucide-react';
import MapSection from '@/components/MapSection';
import { allProperties } from "@/features/apartments/data/propertyData.ts";

interface ApartmentsMapViewProps {
    properties: any[];
}

export default function ApartmentsMapView({ properties }: ApartmentsMapViewProps) {
    // Проверяем, есть ли свойства для отображения или является ли properties undefined
    if (!properties || properties.length === 0) {
        return (
            <div className="bg-muted rounded-xl overflow-hidden h-[600px] flex flex-col items-center justify-center border w-full">
                <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Нет свойств для отображения</h3>
                <p className="text-muted-foreground">Измените параметры фильтрации или сбросьте фильтры</p>
            </div>
        );
    }

    // Ограничим количество локаций для отображения на карте до 10,
    // чтобы избежать слишком длинного URL и ошибок
    const limitedProperties = properties.slice(0, 10);
    // Создаем одну строку со всеми адресами, разделенными '|'
    const allLocations = limitedProperties.map(property => property.location).join('|');

    return (
        <div className="bg-muted rounded-xl overflow-hidden h-[600px] flex items-center justify-center border w-full">
            <MapSection
                locationText={allLocations}
                height="600px"
                width="100%"
                showMultipleLocations={true}
            />
        </div>
    );
}