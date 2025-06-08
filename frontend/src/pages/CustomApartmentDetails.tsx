import React from 'react';
import { createRoot } from 'react-dom/client';
import ApartmentDetails from './ApartmentDetails';
import { CheckInRules } from '@/components/CheckInRules';

export default function CustomApartmentDetails() {
    // Получаем элемент для вставки наших правил
    React.useEffect(() => {
        // Найдем контейнер, куда нужно вставить правила заселения
        const container = document.querySelector('.apartment-details-container');

        if (container) {
            // Создаем новый div для наших правил
            const rulesContainer = document.createElement('div');
            rulesContainer.id = 'check-in-rules-container';

            // Находим правильное место для вставки (перед секцией комментариев или картой)
            const mapSection = container.querySelector('.map-section');

            if (mapSection) {
                container.insertBefore(rulesContainer, mapSection);

                // Рендерим наш компонент правил в созданный контейнер
                const root = createRoot(rulesContainer);
                root.render(<CheckInRules />);
            }
        }
    }, []);

    return <ApartmentDetails />;
}
