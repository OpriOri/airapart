import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface MapSectionProps {
    locationText?: string;
    height?: string;
    width?: string;
    showMultipleLocations?: boolean;
}

const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapSection({
                                       locationText = "г. Минеральные воды, ул. Советская, д. 123",
                                       height = "384px",
                                       width = "100%",
                                       showMultipleLocations = false
                                   }: MapSectionProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [mapUrl, setMapUrl] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (mapRef.current) {
            observer.observe(mapRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        let url = '';

        if (showMultipleLocations && locationText.includes('|')) {
            // Multiple locations mode (for map view in apartments page)
            const encodedLocations = encodeURIComponent(locationText);
            url = `https://www.google.com/maps/embed/v1/search?key=${googleMapsKey}&q=${encodedLocations}&zoom=13`;
        } else {
            // Single location mode (for contact page and apartment details)
            const encodedLocation = encodeURIComponent(locationText);
            url = `https://www.google.com/maps/embed/v1/place?key=${googleMapsKey}&q=${encodedLocation}&zoom=15`;
        }

        setMapUrl(url);
    }, [locationText, showMultipleLocations]);

    return (
        <div
            ref={mapRef}
            className={`relative rounded-2xl overflow-hidden border shadow-sm`}
            style={{ height, width }}
        >
            {!isVisible ? (
                <div className="absolute inset-0 bg-secondary/30 flex flex-col items-center justify-center">
                    <div className="text-center">
                        <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Расположение</h3>
                        <p className="text-muted-foreground">{locationText.includes('|') ? 'Наши квартиры' : locationText}</p>
                    </div>
                </div>
            ) : (
                <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Карта: ${locationText.includes('|') ? 'Наши квартиры' : locationText}`}
                    className="transition-opacity duration-500"
                ></iframe>
            )}
        </div>
    );
}