INSERT INTO apartments (
  id, title, location, price, price_unit,
  bedrooms, bathrooms, area, rating, max_guests,
  image_url, images, description, amenities, is_new
) VALUES (
  '3',
  'Апартаменты с видом на горы у аэропорта',
  'Минеральные Воды, Сов 72, 123к1',
  4000,
  'сутки',
  2,
  1,
  40,
  5,
  4,
  'src/pictures/3_main.jpg',
  '["src/pictures/3_1.jpg","src/pictures/3_2.jpg","src/pictures/3_3.jpg","src/pictures/3_main.jpg","src/pictures/3_5.jpg","src/pictures/3_6.jpg","src/pictures/3_7.jpg","src/pictures/3_8.jpg","src/pictures/3_9.jpg","src/pictures/3_10.jpg","src/pictures/3_11.jpg","src/pictures/3_12.jpg","src/pictures/3_13.jpg","src/pictures/3_14.jpg","src/pictures/3_15.jpg","src/pictures/3_16.jpg"]'::jsonb,
  'Апартаменты с видом на гору в 5 минутах от аэропорта
Современные апартаменты с панорамным видом на горы и всем необходимым для комфортного проживания:

Теплые полы и индивидуальное отопление

Полная комплектация: телевизоры, бесплатный Wi-Fi, сплит-система, фен, утюг, постельное белье, микроволновая печь и средства гигиены

Бесплатная парковка и инфраструктура во дворе: мангальная зона и детская площадка

Расположение:

5 минут до аэропорта, 10 минут до ж/д вокзала, 7-10 минут до центра на такси

В шаговой доступности: кафе, магазины ("НАШ", "Пятерочка", "Магнит"), аптека и банкомат

Идеальный выбор для тех, кто ценит комфорт, уют и удобное расположение!',
  '[{"name":"Бесплатный Wi-Fi","icon":"Wifi","available":true},{"name":"Телевизор","icon":"Tv","available":true},{"name":"Кондиционер","icon":"Fan","available":true},{"name":"Кухня","icon":"UtensilsCrossed","available":true},{"name":"Можно с детьми","icon":"Baby","available":true},{"name":"Микроволновка","icon":"Microwave","available":true},{"name":"Холодильник","icon":"Refrigerator","available":true},{"name":"Парковка","icon":"SquareParking","available":true},{"name":"Можно с животными","icon":"PawPrint","available":true},{"name":"Ванные принадлежности","icon":"Bath","available":true},{"name":"Утюг с гладильной доской","icon":"Shirt","available":true},{"name":"Стиральная машина","icon":"WashingMachine","available":true}]'::jsonb,
  true
);

INSERT INTO apartments (
  id, title, location, price, price_unit,
  bedrooms, bathrooms, area, rating, max_guests,
  image_url, images, description, amenities, is_new
) VALUES (
  '4',
  'Однокомнатная квартира в престижном ЖК',
  'Минеральные воды, Сов 72, 123к1',
  2500,
  'сутки',
  2,
  1,
  40,
  4.8,
  4,
  'src/pictures/4_main.jpg',
  '["src/pictures/4_1.jpg","src/pictures/4_2.jpg","src/pictures/4_3.jpg","src/pictures/4_4.jpg","src/pictures/4_5.jpg","src/pictures/4_6.jpg","src/pictures/4_7.jpg","src/pictures/4_8.jpg"]'::jsonb,
  'Новая однокомнатная квартира в элитном комплексе у аэропорта
Современная квартира с полной комплектацией для комфортного проживания. В шаговой доступности магазины, кафе и вся необходимая инфраструктура.

Преимущества:

Удобное расположение: 10 минут до центра на машине, 15 минут до ж/д вокзала

Рядом с аэропортом — идеально для частых путешествий

Все необходимое для жизни: современная мебель, техника и продуманный дизайн

Идеальный вариант для тех, кто ценит комфорт, стиль и удобное расположение!',
  '[{"name":"Бесплатный Wi-Fi","icon":"Wifi","available":true},{"name":"Телевизор","icon":"Tv","available":true},{"name":"Кондиционер","icon":"Fan","available":true},{"name":"Кухня","icon":"UtensilsCrossed","available":true},{"name":"Можно с детьми","icon":"Baby","available":true},{"name":"Микроволновка","icon":"Microwave","available":true},{"name":"Холодильник","icon":"Refrigerator","available":true},{"name":"Парковка","icon":"SquareParking","available":false},{"name":"Можно с животными","icon":"PawPrint","available":true},{"name":"Ванные принадлежности","icon":"Bath","available":false},{"name":"Утюг с гладильной доской","icon":"Shirt","available":true},{"name":"Стиральная машина","icon":"WashingMachine","available":true}]'::jsonb,
  true
);

INSERT INTO apartments (
  id, title, location, price, price_unit,
  bedrooms, bathrooms, area, rating, max_guests,
  image_url, images, description, amenities, is_new
) VALUES (
  '5',
  'Современные апартаменты с видом на горы',
  'Минеральные Воды, Сов 123 кв 61',
  4000,
  'сутки',
  2,
  1,
  40,
  4.9,
  4,
  'src/pictures/5_main.jpg',
  '["src/pictures/5_1.jpg","src/pictures/5_2.jpg","src/pictures/5_3.jpg","src/pictures/5_4.jpg","src/pictures/5_5.jpg","src/pictures/5_6.jpg","src/pictures/5_7.jpg","src/pictures/5_8.jpg"]'::jsonb,
  'Апартаменты с видом на гору в 5 минутах от аэропорта
Современные апартаменты с панорамным видом на горы и всем необходимым для комфортного проживания:

Теплые полы и индивидуальное отопление

Полная комплектация: телевизоры, бесплатный Wi-Fi, сплит-система, фен, утюг, постельное белье, микроволновая печь и средства гигиены

Бесплатная парковка и инфраструктура во дворе: мангальная зона и детская площадка

Расположение:

5 минут до аэропорта, 10 минут до ж/д вокзала, 7-10 минут до центра на такси

В шаговой доступности: кафе, магазины ("НАШ", "Пятерочка", "Магнит"), аптека и банкомат

Идеальный выбор для тех, кто ценит комфорт, уют и удобное расположение!',
  '[{"name":"Бесплатный Wi-Fi","icon":"Wifi","available":true},{"name":"Телевизор","icon":"Tv","available":true},{"name":"Кондиционер","icon":"Fan","available":true},{"name":"Кухня","icon":"UtensilsCrossed","available":true},{"name":"Можно с детьми","icon":"Baby","available":true},{"name":"Микроволновка","icon":"Microwave","available":true},{"name":"Холодильник","icon":"Refrigerator","available":true},{"name":"Парковка","icon":"SquareParking","available":true},{"name":"Можно с животными","icon":"PawPrint","available":true},{"name":"Ванные принадлежности","icon":"Bath","available":true},{"name":"Утюг с гладильной доской","icon":"Shirt","available":true},{"name":"Стиральная машина","icon":"WashingMachine","available":true}]'::jsonb,
  true
);

INSERT INTO apartments (
  id, title, location, price, price_unit,
  bedrooms, bathrooms, area, rating, max_guests,
  image_url, images, description, amenities, is_new
) VALUES (
  '6',
  'Двухкомнатная премиальная квартира',
  'Минеральные Воды, Железноводская улица, 70',
  4000,
  'сутки',
  2,
  1,
  57,
  4.9,
  3,
  'src/pictures/6_main.jpg',
  '["src/pictures/6_1.jpg","src/pictures/6_2.jpg","src/pictures/6_3.jpg","src/pictures/6_4.jpg","src/pictures/6_5.jpg","src/pictures/6_6.jpg","src/pictures/6_7.jpg","src/pictures/6_8.jpg","src/pictures/6_9.jpg"]'::jsonb,
  'Просторная 2-комнатная квартира премиум-класса в Минеральных Водах
Современный интерьер и все необходимое для комфортного проживания:
• Просторные светлые комнаты с качественной мебелью
• Полная комплектация: кондиционер, высокоскоростной Wi-Fi, Smart TV
• Новая бытовая техника: холодильник, стиральная машина, микроволновая печь
• Предоставляется весь комплект постельного белья и банных принадлежностей
Инфраструктура:
• Круглосуточная охраняемая парковка
• Благоустроенный двор с детской площадкой
• Мангальная зона 
Выгодное расположение:
• 3 минуты езды до международного аэропорта
• 5 минут пешком до ТЦ «Вершина»
• Автовокзал «Руслан» в шаговой доступности
• Магазин «Велесс» и кафе «Харчевня» в непосредственной близости
Дополнительные услуги:
• Гибкие условия оплаты (наличный/безналичный расчет)
• Официальные документы для отчетности
• Индивидуальные условия заселения
Идеальный вариант для требовательных гостей, ценящих комфорт и безупречный сервис.',
  '[{"name":"Бесплатный Wi-Fi","icon":"Wifi","available":true},{"name":"Кофеварка","icon":"Coffee","available":true},{"name":"Телевизор","icon":"Tv","available":true},{"name":"Кондиционер","icon":"Fan","available":true},{"name":"Кухня","icon":"UtensilsCrossed","available":true},{"name":"Можно с детьми","icon":"Baby","available":true},{"name":"Микроволновка","icon":"Microwave","available":true},{"name":"Холодильник","icon":"Refrigerator","available":true},{"name":"Парковка","icon":"SquareParking","available":true},{"name":"Можно с животными","icon":"PawPrint","available":true},{"name":"Ванные принадлежности","icon":"Bath","available":true},{"name":"Утюг с гладильной доской","icon":"Shirt","available":true},{"name":"Стиральная машина","icon":"WashingMachine","available":true}]'::jsonb,
  false
);

INSERT INTO apartments (
  id, title, location, price, price_unit,
  bedrooms, bathrooms, area, rating, max_guests,
  image_url, images, description, amenities, is_new
) VALUES (
  '7',
  'Двухкомнатная квартира бизнес-класса',
  'Минеральные Воды, Железноводская улица, 70к1',
  6000,
  'сутки',
  3,
  1,
  65,
  5,
  6,
  'src/pictures/7_main.jpg',
  '["src/pictures/7_1.jpg","src/pictures/7_2.jpg","src/pictures/7_3.jpg","src/pictures/7_4.jpg","src/pictures/7_5.jpg","src/pictures/7_6.jpg","src/pictures/7_7.jpg","src/pictures/7_8.jpg","src/pictures/7_9.jpg"]'::jsonb,
  '2-комнатная квартира бизнес-класса в престижном районе Минеральных Вод
Просторное жилье с продуманной планировкой и высококлассной отделкой. Идеально подходит для деловых поездок и семейного отдыха.
Особенности апартаментов:
• Современная бытовая техника премиальных брендов
• Индивидуальная система климат-контроля
• Высокоскоростной интернет (до 300 Мбит/с)
• Телевизоры Smart TV с премиум-подпиской в каждой комнате
• Полный комплект элитного постельного белья и банных принадлежностей
Инфраструктура комплекса:
• Круглосуточная охраняемая территория
• Ландшафтный двор с детской игровой зоной
• Мангальная зона
Расположение:
• 3 минуты езды до международного аэропорта
• 5 минут пешком до делового центра «Вершина»
• Автовокзал «Руслан» в непосредственной близости
• Премиальный гастроном «Велесс» и ресторан «Харчевня» в шаговой доступности
Сервис:
• Официальная отчетность с полным пакетом документов
• Возможность безналичного расчета
• Дополнительное парковочное место (+500 руб./сутки)
Для гостей, ожидающих безупречного качества обслуживания и элитного уровня комфорта.',
  '[{"name":"Бесплатный Wi-Fi","icon":"Wifi","available":true},{"name":"Телевизор","icon":"Tv","available":true},{"name":"Кондиционер","icon":"Fan","available":true},{"name":"Кухня","icon":"UtensilsCrossed","available":true},{"name":"Можно с детьми","icon":"Baby","available":true},{"name":"Микроволновка","icon":"Microwave","available":true},{"name":"Холодильник","icon":"Refrigerator","available":true},{"name":"Балкон","icon":"Balcony","available":true},{"name":"Парковка","icon":"SquareParking","available":true},{"name":"Можно с животными","icon":"PawPrint","available":true},{"name":"Ванные принадлежности","icon":"Bath","available":true},{"name":"Утюг с гладильной доской","icon":"Shirt","available":true},{"name":"Стиральная машина","icon":"WashingMachine","available":true}]'::jsonb,
  false
);

INSERT INTO apartments (
  id, title, location, price, price_unit,
  bedrooms, bathrooms, area, rating, max_guests,
  image_url, images, description, amenities, is_new
) VALUES (
  '8',
  'Двухкомнатная квартира для семьи',
  'Минеральные Воды, Железноводская улица, 72',
  5000,
  'сутки',
  3,
  1,
  65,
  4.8,
  5,
  'src/pictures/8_main.jpg',
  '["src/pictures/8_1.jpg","src/pictures/8_2.jpg","src/pictures/8_3.jpg","src/pictures/8_4.jpg","src/pictures/8_5.jpg","src/pictures/8_6.jpg","src/pictures/8_7.jpg","src/pictures/8_8.jpg","src/pictures/8_9.jpg","src/pictures/8_10.jpg"]'::jsonb,
  'Сдается 2-комнатная квартира вблизи аэропорта Минеральные Воды
Ключевые преимущества:
• Удобное расположение - 3 минуты до аэропорта
• Просторная бесплатная парковка
• Круглосуточное заселение
В квартире имеется:
- Вся необходимая бытовая техника
- Комфортные спальные места
- Чистое постельное белье и полотенца
Инфраструктура рядом:
• Кафе и рестораны
• Магазины «Пятёрочка» и «Магнит»
• Остановка общественного транспорта
Условия:
• Прямой договор с собственником
• Официальные документы для отчетности
• Дополнительное место +500 руб./сутки
Звоните в любое время - решим все вопросы оперативно!',
  '[{"name":"Бесплатный Wi-Fi","icon":"Wifi","available":true},{"name":"Телевизор","icon":"Tv","available":true},{"name":"Кондиционер","icon":"Fan","available":true},{"name":"Кухня","icon":"UtensilsCrossed","available":true},{"name":"Можно с детьми","icon":"Baby","available":true},{"name":"Микроволновка","icon":"Microwave","available":false},{"name":"Холодильник","icon":"Refrigerator","available":true},{"name":"Балкон","icon":"Balcony","available":true},{"name":"Парковка","icon":"SquareParking","available":true},{"name":"Можно с животными","icon":"PawPrint","available":true},{"name":"Ванные принадлежности","icon":"Bath","available":true},{"name":"Утюг с гладильной доской","icon":"Shirt","available":true},{"name":"Стиральная машина","icon":"WashingMachine","available":true}]'::jsonb,
  false
);

INSERT INTO apartments (
  id, title, location, price, price_unit,
  bedrooms, bathrooms, area, rating, max_guests,
  image_url, images, description, amenities, is_new
) VALUES (
  '9',
  'Апартаменты с видом на гору',
  'Минеральные Воды, Сов 72, 123к1',
  4000,
  'сутки',
  2,
  1,
  40,
  4.8,
  3,
  'src/pictures/9_main.jpg',
  '["src/pictures/9_1.jpg","src/pictures/9_2.jpg","src/pictures/9_3.jpg","src/pictures/9_4.jpg","src/pictures/9_5.jpg","src/pictures/9_6.jpg","src/pictures/9_7.jpg","src/pictures/9_8.jpg","src/pictures/9_9.jpg","src/pictures/9_10.jpg","src/pictures/9_11.jpg","src/pictures/9_12.jpg","src/pictures/9_13.jpg","src/pictures/9_14.jpg","src/pictures/9_15.jpg","src/pictures/9_16.jpg","src/pictures/9_17.jpg","src/pictures/9_18.jpg"]'::jsonb,
  'Новые апартаменты с видом на горы в 5 минутах от аэропорта Минеральные Воды
Ключевые преимущества:
• Идеальная транспортная доступность: 5 мин до аэропорта, 10 мин до ж/д вокзала
• Панорамный вид на горный ландшафт
• Круглосуточное заселение
Полное оснащение:
- Система теплых полов и индивидуальное отопление
- Высокоскоростной Wi-Fi и современная техника
- Полный комплект постельных принадлежностей и средств гигиены
Инфраструктура:
• Магазины: «НАШ», «Пятёрочка», «Магнит» - в шаговой доступности
• Кафе, аптека, банкомат - рядом
• До центра города - 7-10 минут на такси
Территория:
• Бесплатная парковка
• Детская площадка и мангальная зона
Условия:
• Официальные документы для отчетности
• Гибкие условия оплаты
Для бронирования и уточнения деталей - звоните в любое время!',
  '[{"name":"Бесплатный Wi-Fi","icon":"Wifi","available":true},{"name":"Телевизор","icon":"Tv","available":true},{"name":"Кондиционер","icon":"Fan","available":true},{"name":"Кухня","icon":"UtensilsCrossed","available":true},{"name":"Можно с детьми","icon":"Baby","available":true},{"name":"Микроволновка","icon":"Microwave","available":true},{"name":"Холодильник","icon":"Refrigerator","available":true},{"name":"Парковка","icon":"SquareParking","available":true},{"name":"Можно с животными","icon":"PawPrint","available":true},{"name":"Ванные принадлежности","icon":"Bath","available":true},{"name":"Утюг с гладильной доской","icon":"Shirt","available":true},{"name":"Стиральная машина","icon":"WashingMachine","available":true}]'::jsonb,
  false
);

