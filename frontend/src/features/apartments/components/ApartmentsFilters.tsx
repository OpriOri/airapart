import { useState } from 'react';
import { X, SlidersHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/DateRangePicker';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ApartmentsFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    priceRange: number[];
    setPriceRange: (range: number[]) => void;
    selectedBedrooms: string;
    setSelectedBedrooms: (bedrooms: string) => void;
    selectedCity: string;
    setSelectedCity: (city: string) => void;
    dateRange: DateRange | undefined;
    setDateRange: (range: DateRange | undefined) => void;
    resetFilters: () => void;
}

export default function ApartmentsFilters({
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
                                              resetFilters
                                          }: ApartmentsFiltersProps) {
    const [isOpen, setIsOpen] = useState(false);
    const isMobile = useIsMobile();

    const filterContent = (
        <div className="space-y-6">
            <div className="space-y-3">
                <label className="text-sm font-medium">Цена за сутки</label>
                <Slider
                    defaultValue={[0, 20000]}
                    min={0}
                    max={20000}
                    step={500}
                    value={priceRange}
                    onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0].toLocaleString()} ₽</span>
                    <span>{priceRange[1].toLocaleString()} ₽</span>
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium">Спальни</label>
                <Select value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                    <SelectTrigger>
                        <SelectValue placeholder="Любое количество" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Changed from empty string to "all" */}
                        <SelectItem value="all">Любое количество</SelectItem>
                        <SelectItem value="1">1 спальня</SelectItem>
                        <SelectItem value="2">2 спальни</SelectItem>
                        <SelectItem value="3">3 спальни</SelectItem>
                        <SelectItem value="4">4+ спальни</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
                <label className="text-sm font-medium">Даты проживания</label>
                <DateRangePicker
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                />
            </div>

            <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                    resetFilters();
                    setIsOpen(false);
                }}
            >
                Сбросить фильтры
            </Button>
        </div>
    );

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                        placeholder="Поиск по названию или местоположению..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                <Button
                    variant="outline"
                    className="flex items-center gap-2 w-full sm:w-auto"
                    onClick={() => setIsOpen(true)}
                >
                    <SlidersHorizontal className="h-5 w-5" />
                    Фильтры
                </Button>
            </div>

            {isMobile ? (
                <Drawer open={isOpen} onOpenChange={setIsOpen}>
                    <DrawerContent className="px-4">
                        <DrawerHeader className="px-0">
                            <DrawerTitle>Фильтры</DrawerTitle>
                            <DrawerDescription>
                                Настройте параметры поиска
                            </DrawerDescription>
                        </DrawerHeader>
                        <ScrollArea className="h-[calc(80vh-10rem)] pb-8 pr-4">
                            {filterContent}
                        </ScrollArea>
                    </DrawerContent>
                </Drawer>
            ) : (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Фильтры</DialogTitle>
                            <DialogDescription>
                                Настройте параметры поиска
                            </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] pr-4">
                            {filterContent}
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}