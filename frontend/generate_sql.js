import fs from 'fs';

function escapeString(str) {
    return str.replace(/'/g, "''");
}

function generateInsertSQL(property) {
    return `
INSERT INTO apartments (
  id, title, location, price, price_unit,
  bedrooms, bathrooms, area, rating, max_guests,
  image_url, images, description, amenities, is_new
) VALUES (
  '${property.id}',
  '${escapeString(property.title)}',
  '${escapeString(property.location)}',
  ${property.price},
  '${escapeString(property.priceUnit)}',
  ${property.bedrooms},
  ${property.bathrooms},
  ${property.area},
  ${property.rating},
  ${property.maxGuests || 'NULL'},
  '${escapeString(property.imageUrl)}',
  '${JSON.stringify(property.images || [])}'::jsonb,
  '${escapeString(property.description || '')}',
  '${JSON.stringify(property.amenities || [])}'::jsonb,
  ${property.isNew ? 'true' : 'false'}
);
`.trim();
}

// Твой массив с квартирами
const properties = [
    {
        id: 3,
        title: 'Апартаменты с видом на горы у аэропорта',
        location: 'Минеральные Воды, Сов 72, 123к1',
        price: 4000,
        priceUnit: 'сутки',
        bedrooms: 2,
        bathrooms: 1,
        area: 40,
        rating: 5,
        maxGuests: 4,
        imageUrl: 'src/pictures/3_main.jpg',
        images: [
            'src/pictures/3_1.jpg',
            'src/pictures/3_2.jpg',
            'src/pictures/3_3.jpg',
            'src/pictures/3_main.jpg',
            'src/pictures/3_5.jpg',
            'src/pictures/3_6.jpg',
            'src/pictures/3_7.jpg',
            'src/pictures/3_8.jpg',
            'src/pictures/3_9.jpg',
            'src/pictures/3_10.jpg',
            'src/pictures/3_11.jpg',
            'src/pictures/3_12.jpg',
            'src/pictures/3_13.jpg',
            'src/pictures/3_14.jpg',
            'src/pictures/3_15.jpg',
            'src/pictures/3_16.jpg'
        ],
        description: 'Апартаменты с видом на гору в 5 минутах от аэропорта\n' +
            'Современные апартаменты с панорамным видом на горы и всем необходимым для комфортного проживания:\n' +
            '\n' +
            'Теплые полы и индивидуальное отопление\n' +
            '\n' +
            'Полная комплектация: телевизоры, бесплатный Wi-Fi, сплит-система, фен, утюг, постельное белье, микроволновая печь и средства гигиены\n' +
            '\n' +
            'Бесплатная парковка и инфраструктура во дворе: мангальная зона и детская площадка\n' +
            '\n' +
            'Расположение:\n' +
            '\n' +
            '5 минут до аэропорта, 10 минут до ж/д вокзала, 7-10 минут до центра на такси\n' +
            '\n' +
            'В шаговой доступности: кафе, магазины ("НАШ", "Пятерочка", "Магнит"), аптека и банкомат\n' +
            '\n' +
            'Идеальный выбор для тех, кто ценит комфорт, уют и удобное расположение!',
        amenities: [
            { name: 'Бесплатный Wi-Fi', icon: 'Wifi', available: true },
            { name: 'Телевизор', icon: 'Tv', available: true },
            { name: 'Кондиционер', icon: 'Fan', available: true },
            { name: 'Кухня', icon: 'UtensilsCrossed', available: true },
            { name: 'Можно с детьми', icon: 'Baby', available: true },
            { name: 'Микроволновка', icon: 'Microwave', available: true },
            { name: 'Холодильник', icon: 'Refrigerator', available: true },
            { name: 'Парковка', icon: 'SquareParking', available: true },
            { name: 'Можно с животными', icon: 'PawPrint', available: true },
            { name: 'Ванные принадлежности', icon: 'Bath', available: true },
            { name: 'Утюг с гладильной доской', icon: 'Shirt', available: true },
            { name: 'Стиральная машина', icon: 'WashingMachine', available: true }
        ],
        isNew: true
    },
    {
        id: 4,
        title: 'Однокомнатная квартира в престижном ЖК',
        location: 'Минеральные воды, Сов 72, 123к1',
        price: 2500,
        priceUnit: 'сутки',
        bedrooms: 2,
        bathrooms: 1,
        area: 40,
        rating: 4.8,
        maxGuests: 4,
        imageUrl: 'src/pictures/4_main.jpg',
        images: [
            'src/pictures/4_1.jpg',
            'src/pictures/4_2.jpg',
            'src/pictures/4_3.jpg',
            'src/pictures/4_4.jpg',
            'src/pictures/4_5.jpg',
            'src/pictures/4_6.jpg',
            'src/pictures/4_7.jpg',
            'src/pictures/4_8.jpg'
        ],
        description: 'Новая однокомнатная квартира в элитном комплексе у аэропорта\n' +
            'Современная квартира с полной комплектацией для комфортного проживания. В шаговой доступности магазины, кафе и вся необходимая инфраструктура.\n' +
            '\n' +
            'Преимущества:\n' +
            '\n' +
            'Удобное расположение: 10 минут до центра на машине, 15 минут до ж/д вокзала\n' +
            '\n' +
            'Рядом с аэропортом — идеально для частых путешествий\n' +
            '\n' +
            'Все необходимое для жизни: современная мебель, техника и продуманный дизайн\n' +
            '\n' +
            'Идеальный вариант для тех, кто ценит комфорт, стиль и удобное расположение!',
        amenities: [
            { name: 'Бесплатный Wi-Fi', icon: 'Wifi', available: true },
            { name: 'Телевизор', icon: 'Tv', available: true },
            { name: 'Кондиционер', icon: 'Fan', available: true },
            { name: 'Кухня', icon: 'UtensilsCrossed', available: true },
            { name: 'Можно с детьми', icon: 'Baby', available: true },
            { name: 'Микроволновка', icon: 'Microwave', available: true },
            { name: 'Холодильник', icon: 'Refrigerator', available: true },
            { name: 'Парковка', icon: 'SquareParking', available: false },
            { name: 'Можно с животными', icon: 'PawPrint', available: true },
            { name: 'Ванные принадлежности', icon: 'Bath', available: false },
            { name: 'Утюг с гладильной доской', icon: 'Shirt', available: true },
            { name: 'Стиральная машина', icon: 'WashingMachine', available: true }
        ],
        isNew: true
    },
    {
        id: 5,
        title: 'Современные апартаменты с видом на горы',
        location: 'Минеральные Воды, Сов 123 кв 61',
        price: 4000,
        priceUnit: 'сутки',
        bedrooms: 2,
        bathrooms: 1,
        area: 40,
        rating: 4.9,
        maxGuests: 4,
        imageUrl: 'src/pictures/5_main.jpg',
        images: [
            'src/pictures/5_1.jpg',
            'src/pictures/5_2.jpg',
            'src/pictures/5_3.jpg',
            'src/pictures/5_4.jpg',
            'src/pictures/5_5.jpg',
            'src/pictures/5_6.jpg',
            'src/pictures/5_7.jpg',
            'src/pictures/5_8.jpg'
        ],
        description: 'Апартаменты с видом на гору в 5 минутах от аэропорта\n' +
            'Современные апартаменты с панорамным видом на горы и всем необходимым для комфортного проживания:\n' +
            '\n' +
            'Теплые полы и индивидуальное отопление\n' +
            '\n' +
            'Полная комплектация: телевизоры, бесплатный Wi-Fi, сплит-система, фен, утюг, постельное белье, микроволновая печь и средства гигиены\n' +
            '\n' +
            'Бесплатная парковка и инфраструктура во дворе: мангальная зона и детская площадка\n' +
            '\n' +
            'Расположение:\n' +
            '\n' +
            '5 минут до аэропорта, 10 минут до ж/д вокзала, 7-10 минут до центра на такси\n' +
            '\n' +
            'В шаговой доступности: кафе, магазины ("НАШ", "Пятерочка", "Магнит"), аптека и банкомат\n' +
            '\n' +
            'Идеальный выбор для тех, кто ценит комфорт, уют и удобное расположение!',
        amenities: [
            { name: 'Бесплатный Wi-Fi', icon: 'Wifi', available: true },
            { name: 'Телевизор', icon: 'Tv', available: true },
            { name: 'Кондиционер', icon: 'Fan', available: true },
            { name: 'Кухня', icon: 'UtensilsCrossed', available: true },
            { name: 'Можно с детьми', icon: 'Baby', available: true },
            { name: 'Микроволновка', icon: 'Microwave', available: true },
            { name: 'Холодильник', icon: 'Refrigerator', available: true },
            { name: 'Парковка', icon: 'SquareParking', available: true },
            { name: 'Можно с животными', icon: 'PawPrint', available: true },
            { name: 'Ванные принадлежности', icon: 'Bath', available: true },
            { name: 'Утюг с гладильной доской', icon: 'Shirt', available: true },
            { name: 'Стиральная машина', icon: 'WashingMachine', available: true }
        ],
        isNew: true
    },
    {
        id: 6,
        title: 'Двухкомнатная премиальная квартира',
        location: "Минеральные Воды, Железноводская улица, 70",
        price: 4000,
        priceUnit: 'сутки',
        bedrooms: 2,
        bathrooms: 1,
        area: 57,
        rating: 4.9,
        maxGuests: 3,
        imageUrl: "src/pictures/6_main.jpg",
        images: [
            "src/pictures/6_1.jpg",
            "src/pictures/6_2.jpg",
            "src/pictures/6_3.jpg",
            "src/pictures/6_4.jpg",
            "src/pictures/6_5.jpg",
            "src/pictures/6_6.jpg",
            "src/pictures/6_7.jpg",
            "src/pictures/6_8.jpg",
            "src/pictures/6_9.jpg"
        ],
        description: "Просторная 2-комнатная квартира премиум-класса в Минеральных Водах\n" +
            "Современный интерьер и все необходимое для комфортного проживания:\n" +
            "• Просторные светлые комнаты с качественной мебелью\n" +
            "• Полная комплектация: кондиционер, высокоскоростной Wi-Fi, Smart TV\n" +
            "• Новая бытовая техника: холодильник, стиральная машина, микроволновая печь\n" +
            "• Предоставляется весь комплект постельного белья и банных принадлежностей\n" +
            "Инфраструктура:\n" +
            "• Круглосуточная охраняемая парковка\n" +
            "• Благоустроенный двор с детской площадкой\n" +
            "• Мангальная зона \n" +
            "Выгодное расположение:\n" +
            "• 3 минуты езды до международного аэропорта\n" +
            "• 5 минут пешком до ТЦ «Вершина»\n" +
            "• Автовокзал «Руслан» в шаговой доступности\n" +
            "• Магазин «Велесс» и кафе «Харчевня» в непосредственной близости\n" +
            "Дополнительные услуги:\n" +
            "• Гибкие условия оплаты (наличный/безналичный расчет)\n" +
            "• Официальные документы для отчетности\n" +
            "• Индивидуальные условия заселения\n" +
            "Идеальный вариант для требовательных гостей, ценящих комфорт и безупречный сервис.",
        amenities: [
            { name: 'Бесплатный Wi-Fi', icon: 'Wifi', available: true },
            { name: 'Кофеварка', icon: 'Coffee', available: true },
            { name: 'Телевизор', icon: 'Tv', available: true },
            { name: 'Кондиционер', icon: 'Fan', available: true },
            { name: 'Кухня', icon: 'UtensilsCrossed', available: true },
            { name: 'Можно с детьми', icon: 'Baby', available: true },
            { name: 'Микроволновка', icon: 'Microwave', available: true },
            { name: 'Холодильник', icon: 'Refrigerator', available: true },
            { name: 'Парковка', icon: 'SquareParking', available: true },
            { name: 'Можно с животными', icon: 'PawPrint', available: true },
            { name: 'Ванные принадлежности', icon: 'Bath', available: true },
            { name: 'Утюг с гладильной доской', icon: 'Shirt', available: true },
            { name: 'Стиральная машина', icon: 'WashingMachine', available: true }
        ],
        isNew: false
    },
    {
        id: 7,
        title: 'Двухкомнатная квартира бизнес-класса',
        location: "Минеральные Воды, Железноводская улица, 70к1",
        price: 6000,
        priceUnit: 'сутки',
        bedrooms: 3,
        bathrooms: 1,
        area: 65,
        rating: 5,
        maxGuests: 6,
        imageUrl: "src/pictures/7_main.jpg",
        images: [
            'src/pictures/7_1.jpg',
            'src/pictures/7_2.jpg',
            'src/pictures/7_3.jpg',
            'src/pictures/7_4.jpg',
            'src/pictures/7_5.jpg',
            'src/pictures/7_6.jpg',
            'src/pictures/7_7.jpg',
            'src/pictures/7_8.jpg',
            'src/pictures/7_9.jpg'
        ],
        description: "2-комнатная квартира бизнес-класса в престижном районе Минеральных Вод\n" +
            "Просторное жилье с продуманной планировкой и высококлассной отделкой. Идеально подходит для деловых поездок и семейного отдыха.\n" +
            "Особенности апартаментов:\n" +
            "• Современная бытовая техника премиальных брендов\n" +
            "• Индивидуальная система климат-контроля\n" +
            "• Высокоскоростной интернет (до 300 Мбит/с)\n" +
            "• Телевизоры Smart TV с премиум-подпиской в каждой комнате\n" +
            "• Полный комплект элитного постельного белья и банных принадлежностей\n" +
            "Инфраструктура комплекса:\n" +
            "• Круглосуточная охраняемая территория\n" +
            "• Ландшафтный двор с детской игровой зоной\n" +
            "• Мангальная зона\n" +
            "Расположение:\n" +
            "• 3 минуты езды до международного аэропорта\n" +
            "• 5 минут пешком до делового центра «Вершина»\n" +
            "• Автовокзал «Руслан» в непосредственной близости\n" +
            "• Премиальный гастроном «Велесс» и ресторан «Харчевня» в шаговой доступности\n" +
            "Сервис:\n" +
            "• Официальная отчетность с полным пакетом документов\n" +
            "• Возможность безналичного расчета\n" +
            "• Дополнительное парковочное место (+500 руб./сутки)\n" +
            "Для гостей, ожидающих безупречного качества обслуживания и элитного уровня комфорта.",
        amenities: [
            { name: 'Бесплатный Wi-Fi', icon: 'Wifi', available: true },
            { name: 'Телевизор', icon: 'Tv', available: true },
            { name: 'Кондиционер', icon: 'Fan', available: true },
            { name: 'Кухня', icon: 'UtensilsCrossed', available: true },
            { name: 'Можно с детьми', icon: 'Baby', available: true },
            { name: 'Микроволновка', icon: 'Microwave', available: true },
            { name: 'Холодильник', icon: 'Refrigerator', available: true },
            { name: 'Балкон', icon: 'Balcony', available: true },
            { name: 'Парковка', icon: 'SquareParking', available: true },
            { name: 'Можно с животными', icon: 'PawPrint', available: true },
            { name: 'Ванные принадлежности', icon: 'Bath', available: true },
            { name: 'Утюг с гладильной доской', icon: 'Shirt', available: true },
            { name: 'Стиральная машина', icon: 'WashingMachine', available: true }
        ],
        isNew: false
    },
    {
        id: 8,
        title: 'Двухкомнатная квартира для семьи',
        location: 'Минеральные Воды, Железноводская улица, 72',
        price: 5000,
        priceUnit: 'сутки',
        bedrooms: 3,
        bathrooms: 1,
        area: 65,
        rating: 4.8,
        maxGuests: 5,
        imageUrl: "src/pictures/8_main.jpg",
        images: [
            'src/pictures/8_1.jpg',
            'src/pictures/8_2.jpg',
            'src/pictures/8_3.jpg',
            'src/pictures/8_4.jpg',
            'src/pictures/8_5.jpg',
            'src/pictures/8_6.jpg',
            'src/pictures/8_7.jpg',
            'src/pictures/8_8.jpg',
            'src/pictures/8_9.jpg',
            'src/pictures/8_10.jpg'
        ],
        description: "Сдается 2-комнатная квартира вблизи аэропорта Минеральные Воды\n" +
            "Ключевые преимущества:\n" +
            "• Удобное расположение - 3 минуты до аэропорта\n" +
            "• Просторная бесплатная парковка\n" +
            "• Круглосуточное заселение\n" +
            "В квартире имеется:\n" +
            "- Вся необходимая бытовая техника\n" +
            "- Комфортные спальные места\n" +
            "- Чистое постельное белье и полотенца\n" +
            "Инфраструктура рядом:\n" +
            "• Кафе и рестораны\n" +
            "• Магазины «Пятёрочка» и «Магнит»\n" +
            "• Остановка общественного транспорта\n" +
            "Условия:\n" +
            "• Прямой договор с собственником\n" +
            "• Официальные документы для отчетности\n" +
            "• Дополнительное место +500 руб./сутки\n" +
            "Звоните в любое время - решим все вопросы оперативно!",
        amenities: [
            { name: 'Бесплатный Wi-Fi', icon: 'Wifi', available: true },
            { name: 'Телевизор', icon: 'Tv', available: true },
            { name: 'Кондиционер', icon: 'Fan', available: true },
            { name: 'Кухня', icon: 'UtensilsCrossed', available: true },
            { name: 'Можно с детьми', icon: 'Baby', available: true },
            { name: 'Микроволновка', icon: 'Microwave', available: false },
            { name: 'Холодильник', icon: 'Refrigerator', available: true },
            { name: 'Балкон', icon: 'Balcony', available: true },
            { name: 'Парковка', icon: 'SquareParking', available: true },
            { name: 'Можно с животными', icon: 'PawPrint', available: true },
            { name: 'Ванные принадлежности', icon: 'Bath', available: true },
            { name: 'Утюг с гладильной доской', icon: 'Shirt', available: true },
            { name: 'Стиральная машина', icon: 'WashingMachine', available: true }
        ],
        isNew: false
    },
    {
        id: 9,
        title: 'Апартаменты с видом на гору',
        location: 'Минеральные Воды, Сов 72, 123к1',
        price: 4000,
        priceUnit: 'сутки',
        bedrooms: 2,
        bathrooms: 1,
        area: 40,
        rating: 4.8,
        maxGuests: 3,
        imageUrl: 'src/pictures/9_main.jpg',
        images: [
            'src/pictures/9_1.jpg',
            'src/pictures/9_2.jpg',
            'src/pictures/9_3.jpg',
            'src/pictures/9_4.jpg',
            'src/pictures/9_5.jpg',
            'src/pictures/9_6.jpg',
            'src/pictures/9_7.jpg',
            'src/pictures/9_8.jpg',
            'src/pictures/9_9.jpg',
            'src/pictures/9_10.jpg',
            'src/pictures/9_11.jpg',
            'src/pictures/9_12.jpg',
            'src/pictures/9_13.jpg',
            'src/pictures/9_14.jpg',
            'src/pictures/9_15.jpg',
            'src/pictures/9_16.jpg',
            'src/pictures/9_17.jpg',
            'src/pictures/9_18.jpg'

        ],
        description: "Новые апартаменты с видом на горы в 5 минутах от аэропорта Минеральные Воды\n" +
            "Ключевые преимущества:\n" +
            "• Идеальная транспортная доступность: 5 мин до аэропорта, 10 мин до ж/д вокзала\n" +
            "• Панорамный вид на горный ландшафт\n" +
            "• Круглосуточное заселение\n" +
            "Полное оснащение:\n" +
            "- Система теплых полов и индивидуальное отопление\n" +
            "- Высокоскоростной Wi-Fi и современная техника\n" +
            "- Полный комплект постельных принадлежностей и средств гигиены\n" +
            "Инфраструктура:\n" +
            "• Магазины: «НАШ», «Пятёрочка», «Магнит» - в шаговой доступности\n" +
            "• Кафе, аптека, банкомат - рядом\n" +
            "• До центра города - 7-10 минут на такси\n" +
            "Территория:\n" +
            "• Бесплатная парковка\n" +
            "• Детская площадка и мангальная зона\n" +
            "Условия:\n" +
            "• Официальные документы для отчетности\n" +
            "• Гибкие условия оплаты\n" +
            "Для бронирования и уточнения деталей - звоните в любое время!",
        amenities: [
            { name: 'Бесплатный Wi-Fi', icon: 'Wifi', available: true },
            { name: 'Телевизор', icon: 'Tv', available: true },
            { name: 'Кондиционер', icon: 'Fan', available: true },
            { name: 'Кухня', icon: 'UtensilsCrossed', available: true },
            { name: 'Можно с детьми', icon: 'Baby', available: true },
            { name: 'Микроволновка', icon: 'Microwave', available: true },
            { name: 'Холодильник', icon: 'Refrigerator', available: true },
            { name: 'Парковка', icon: 'SquareParking', available: true },
            { name: 'Можно с животными', icon: 'PawPrint', available: true },
            { name: 'Ванные принадлежности', icon: 'Bath', available: true },
            { name: 'Утюг с гладильной доской', icon: 'Shirt', available: true },
            { name: 'Стиральная машина', icon: 'WashingMachine', available: true }
        ],
        isNew: false
    }
];

let sqlStatements = '';
for (const prop of properties) {
    sqlStatements += generateInsertSQL(prop) + '\n\n';
}

fs.writeFileSync('inserts.sql', sqlStatements, { encoding: 'utf8' });

console.log('SQL файл успешно создан в UTF-8');
