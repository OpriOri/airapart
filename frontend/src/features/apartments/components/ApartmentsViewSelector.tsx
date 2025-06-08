import { Building, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ApartmentsList from './ApartmentsList';
import ApartmentsListView from './ApartmentsListView';
import ApartmentsMapView from './ApartmentsMapView';

interface ApartmentsViewSelectorProps {
    properties: any[];
    isLoading: boolean;
    resetFilters: () => void;
}

export default function ApartmentsViewSelector({ properties, isLoading, resetFilters }: ApartmentsViewSelectorProps) {
    // Убедимся, что properties всегда является массивом, даже если передано undefined
    const safeProperties = Array.isArray(properties) ? properties : [];

    return (
        <Tabs defaultValue="grid" className="mb-6">
            <div className="flex justify-between items-center">
        <span className="text-muted-foreground">
          {safeProperties.length} {safeProperties.length === 1 ? 'результат' :
            safeProperties.length >= 2 && safeProperties.length <= 4 ? 'результата' : 'результатов'}
        </span>

                <TabsList>
                    <TabsTrigger value="grid" className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span className="hidden sm:inline">Сетка</span>
                    </TabsTrigger>
                    <TabsTrigger value="list" className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span className="hidden sm:inline">Список</span>
                    </TabsTrigger>
                    <TabsTrigger value="map" className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span className="hidden sm:inline">Карта</span>
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="grid" className="mt-6">
                <ApartmentsList
                    properties={safeProperties}
                    isLoading={isLoading}
                    resetFilters={resetFilters}
                />
            </TabsContent>

            <TabsContent value="list" className="mt-6">
                <ApartmentsListView
                    properties={safeProperties}
                    isLoading={isLoading}
                    resetFilters={resetFilters}
                />
            </TabsContent>

            <TabsContent value="map" className="mt-6">
                <ApartmentsMapView properties={safeProperties} />
            </TabsContent>
        </Tabs>
    );
}
