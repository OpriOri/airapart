--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-09 02:27:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16420)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16403)
-- Name: apartments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apartments (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    location character varying(255) NOT NULL,
    price numeric NOT NULL,
    price_unit character varying(50) DEFAULT 'сутки'::character varying,
    bedrooms integer DEFAULT 1,
    bathrooms integer DEFAULT 1,
    area integer DEFAULT 0,
    rating numeric DEFAULT 0,
    max_guests integer DEFAULT 1,
    image_url character varying(255) NOT NULL,
    images jsonb,
    description text,
    amenities jsonb,
    is_new boolean DEFAULT false,
    apartment_id uuid
);


ALTER TABLE public.apartments OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16389)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id uuid NOT NULL,
    apartment_id integer NOT NULL,
    apartment_title character varying NOT NULL,
    check_in_date timestamp without time zone NOT NULL,
    check_out_date timestamp without time zone NOT NULL,
    guests integer NOT NULL,
    customer_name character varying NOT NULL,
    customer_email character varying NOT NULL,
    customer_phone character varying NOT NULL,
    status character varying DEFAULT 'pending'::character varying NOT NULL,
    amount double precision NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    cancel_token character varying,
    is_active boolean DEFAULT true,
    description character varying(150),
    has_pet boolean DEFAULT false,
    pet_type character varying(20),
    CONSTRAINT bookings_pet_type_check CHECK (((pet_type IS NULL) OR (lower((pet_type)::text) = ANY (ARRAY['cat'::text, 'dog'::text, 'other'::text])))),
    CONSTRAINT pet_type_check CHECK (((pet_type)::text = ANY (ARRAY[('cat'::character varying)::text, ('dog'::character varying)::text, ('other'::character varying)::text]))),
    CONSTRAINT status_check CHECK (((status)::text = ANY (ARRAY[('pending'::character varying)::text, ('confirmed'::character varying)::text, ('canceled'::character varying)::text, ('completed'::character varying)::text])))
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16401)
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_id_seq OWNER TO postgres;

--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 219
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- TOC entry 4920 (class 0 OID 16403)
-- Dependencies: 220
-- Data for Name: apartments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.apartments (id, title, location, price, price_unit, bedrooms, bathrooms, area, rating, max_guests, image_url, images, description, amenities, is_new, apartment_id) FROM stdin;
1	Элитная однокомнатная квартира	Минеральные воды, Сов 72, 123к2	4500	сутки	3	1	40	4.9	4	src/pictures/1_main.jpg	["src/pictures/1_2.jpg", "src/pictures/1_3.jpg", "src/pictures/1_4.jpg", "src/pictures/1_5.jpg", "src/pictures/1_6.jpg", "src/pictures/1_7.jpg", "src/pictures/1_8.jpg", "src/pictures/1_9.jpg", "src/pictures/1_10.jpg"]	Новая однокомнатная квартира в элитном жилом комплексе Змейка, рядом аэропорт, жд вокзал, кафе, магазины и столовая. В квартире есть все для комфортного проживания.	[{"icon": "Wifi", "name": "Бесплатный Wi-Fi", "available": true}, {"icon": "Tv", "name": "Телевизор", "available": true}, {"icon": "Fan", "name": "Кондиционер", "available": true}, {"icon": "UtensilsCrossed", "name": "Кухня", "available": true}, {"icon": "Baby", "name": "Можно с детьми", "available": true}, {"icon": "Microwave", "name": "Микроволновка", "available": true}, {"icon": "Refrigerator", "name": "Холодильник", "available": true}, {"icon": "SquareParking", "name": "Парковка", "available": true}, {"icon": "PawPrint", "name": "Можно с животными", "available": true}, {"icon": "Bath", "name": "Ванные принадлежности", "available": true}, {"icon": "Shirt", "name": "Утюг с гладильной доской", "available": true}, {"icon": "WashingMachine", "name": "Стиральная машина", "available": true}]	t	fb3f41bc-f6fe-4bb4-b5f2-2a4ccda1712c
2	Престижные апартаменты у аэропорта	Минеральные Воды, Сов 84, 123к2	5000	сутки	3	1	40	5	6	src/pictures/2_main.jpg	["src/pictures/2_1.jpg", "src/pictures/2_2.jpg", "src/pictures/2_3.jpg", "src/pictures/2_4.jpg", "src/pictures/2_5.jpg", "src/pictures/2_6.jpg", "src/pictures/2_6.jpg", "src/pictures/2_7.jpg", "src/pictures/2_8.jpg"]	Современные апартаменты в элитном комплексе "Змейка"\\nИдеальное расположение: всего 5 минут до аэропорта, 10 минут до ж/д вокзала и 5-7 минут до центра города. Рядом вся необходимая инфраструктура: кафе, рестораны, магазины, аптека.\\n\\nАпартаменты полностью готовы для комфортного проживания: современная мебель, техника и все необходимое для жизни. Отличный выбор для тех, кто ценит удобство и престижное расположение!	[{"icon": "Wifi", "name": "Бесплатный Wi-Fi", "available": true}, {"icon": "Tv", "name": "Телевизор", "available": true}, {"icon": "Fan", "name": "Кондиционер", "available": true}, {"icon": "UtensilsCrossed", "name": "Кухня", "available": true}, {"icon": "Baby", "name": "Можно с детьми", "available": true}, {"icon": "Microwave", "name": "Микроволновка", "available": true}, {"icon": "Refrigerator", "name": "Холодильник", "available": true}, {"icon": "SquareParking", "name": "Парковка", "available": true}, {"icon": "PawPrint", "name": "Можно с животными", "available": true}, {"icon": "Bath", "name": "Ванные принадлежности", "available": true}, {"icon": "Shirt", "name": "Утюг с гладильной доской", "available": true}, {"icon": "WashingMachine", "name": "Стиральная машина", "available": true}]	t	660e2757-0c82-440b-8fb6-4b0cffb78db4
7	Двухкомнатная квартира бизнес-класса	Минеральные Воды, Железноводская улица, 70к1	6000	сутки	3	1	65	5	6	src/pictures/7_main.jpg	["src/pictures/7_1.jpg", "src/pictures/7_2.jpg", "src/pictures/7_3.jpg", "src/pictures/7_4.jpg", "src/pictures/7_5.jpg", "src/pictures/7_6.jpg", "src/pictures/7_7.jpg", "src/pictures/7_8.jpg", "src/pictures/7_9.jpg"]	2-комнатная квартира бизнес-класса в престижном районе Минеральных Вод\nПросторное жилье с продуманной планировкой и высококлассной отделкой. Идеально подходит для деловых поездок и семейного отдыха.\nОсобенности апартаментов:\n• Современная бытовая техника премиальных брендов\n• Индивидуальная система климат-контроля\n• Высокоскоростной интернет (до 300 Мбит/с)\n• Телевизоры Smart TV с премиум-подпиской в каждой комнате\n• Полный комплект элитного постельного белья и банных принадлежностей\nИнфраструктура комплекса:\n• Круглосуточная охраняемая территория\n• Ландшафтный двор с детской игровой зоной\n• Мангальная зона\nРасположение:\n• 3 минуты езды до международного аэропорта\n• 5 минут пешком до делового центра «Вершина»\n• Автовокзал «Руслан» в непосредственной близости\n• Премиальный гастроном «Велесс» и ресторан «Харчевня» в шаговой доступности\nСервис:\n• Официальная отчетность с полным пакетом документов\n• Возможность безналичного расчета\n• Дополнительное парковочное место (+500 руб./сутки)\nДля гостей, ожидающих безупречного качества обслуживания и элитного уровня комфорта.	[{"icon": "Wifi", "name": "Бесплатный Wi-Fi", "available": true}, {"icon": "Tv", "name": "Телевизор", "available": true}, {"icon": "Fan", "name": "Кондиционер", "available": true}, {"icon": "UtensilsCrossed", "name": "Кухня", "available": true}, {"icon": "Baby", "name": "Можно с детьми", "available": true}, {"icon": "Microwave", "name": "Микроволновка", "available": true}, {"icon": "Refrigerator", "name": "Холодильник", "available": true}, {"icon": "Balcony", "name": "Балкон", "available": true}, {"icon": "SquareParking", "name": "Парковка", "available": true}, {"icon": "PawPrint", "name": "Можно с животными", "available": true}, {"icon": "Bath", "name": "Ванные принадлежности", "available": true}, {"icon": "Shirt", "name": "Утюг с гладильной доской", "available": true}, {"icon": "WashingMachine", "name": "Стиральная машина", "available": true}]	f	33346ca3-bd85-4a2e-bd36-1eeb5acc9f47
6	Двухкомнатная премиальная квартира	Минеральные Воды, Железноводская улица, 70	4000	сутки	2	1	57	4.9	3	src/pictures/6_main.jpg	["src/pictures/6_1.jpg", "src/pictures/6_2.jpg", "src/pictures/6_3.jpg", "src/pictures/6_4.jpg", "src/pictures/6_5.jpg", "src/pictures/6_6.jpg", "src/pictures/6_7.jpg", "src/pictures/6_8.jpg", "src/pictures/6_9.jpg"]	Просторная 2-комнатная квартира премиум-класса в Минеральных Водах\nСовременный интерьер и все необходимое для комфортного проживания:\n• Просторные светлые комнаты с качественной мебелью\n• Полная комплектация: кондиционер, высокоскоростной Wi-Fi, Smart TV\n• Новая бытовая техника: холодильник, стиральная машина, микроволновая печь\n• Предоставляется весь комплект постельного белья и банных принадлежностей\nИнфраструктура:\n• Круглосуточная охраняемая парковка\n• Благоустроенный двор с детской площадкой\n• Мангальная зона \nВыгодное расположение:\n• 3 минуты езды до международного аэропорта\n• 5 минут пешком до ТЦ «Вершина»\n• Автовокзал «Руслан» в шаговой доступности\n• Магазин «Велесс» и кафе «Харчевня» в непосредственной близости\nДополнительные услуги:\n• Гибкие условия оплаты (наличный/безналичный расчет)\n• Официальные документы для отчетности\n• Индивидуальные условия заселения\nИдеальный вариант для требовательных гостей, ценящих комфорт и безупречный сервис.	[{"icon": "Wifi", "name": "Бесплатный Wi-Fi", "available": true}, {"icon": "Coffee", "name": "Кофеварка", "available": true}, {"icon": "Tv", "name": "Телевизор", "available": true}, {"icon": "Fan", "name": "Кондиционер", "available": true}, {"icon": "UtensilsCrossed", "name": "Кухня", "available": true}, {"icon": "Baby", "name": "Можно с детьми", "available": true}, {"icon": "Microwave", "name": "Микроволновка", "available": true}, {"icon": "Refrigerator", "name": "Холодильник", "available": true}, {"icon": "SquareParking", "name": "Парковка", "available": true}, {"icon": "PawPrint", "name": "Можно с животными", "available": true}, {"icon": "Bath", "name": "Ванные принадлежности", "available": true}, {"icon": "Shirt", "name": "Утюг с гладильной доской", "available": true}, {"icon": "WashingMachine", "name": "Стиральная машина", "available": true}]	f	c5b39644-bd84-419c-908a-174af3ec4d30
8	Двухкомнатная квартира для семьи	Минеральные Воды, Железноводская улица, 72	5000	сутки	3	1	65	4.8	5	src/pictures/8_main.jpg	["src/pictures/8_1.jpg", "src/pictures/8_2.jpg", "src/pictures/8_3.jpg", "src/pictures/8_4.jpg", "src/pictures/8_5.jpg", "src/pictures/8_6.jpg", "src/pictures/8_7.jpg", "src/pictures/8_8.jpg", "src/pictures/8_9.jpg", "src/pictures/8_10.jpg"]	Сдается 2-комнатная квартира вблизи аэропорта Минеральные Воды\nКлючевые преимущества:\n• Удобное расположение - 3 минуты до аэропорта\n• Просторная бесплатная парковка\n• Круглосуточное заселение\nВ квартире имеется:\n- Вся необходимая бытовая техника\n- Комфортные спальные места\n- Чистое постельное белье и полотенца\nИнфраструктура рядом:\n• Кафе и рестораны\n• Магазины «Пятёрочка» и «Магнит»\n• Остановка общественного транспорта\nУсловия:\n• Прямой договор с собственником\n• Официальные документы для отчетности\n• Дополнительное место +500 руб./сутки\nЗвоните в любое время - решим все вопросы оперативно!	[{"icon": "Wifi", "name": "Бесплатный Wi-Fi", "available": true}, {"icon": "Tv", "name": "Телевизор", "available": true}, {"icon": "Fan", "name": "Кондиционер", "available": true}, {"icon": "UtensilsCrossed", "name": "Кухня", "available": true}, {"icon": "Baby", "name": "Можно с детьми", "available": true}, {"icon": "Microwave", "name": "Микроволновка", "available": false}, {"icon": "Refrigerator", "name": "Холодильник", "available": true}, {"icon": "Balcony", "name": "Балкон", "available": true}, {"icon": "SquareParking", "name": "Парковка", "available": true}, {"icon": "PawPrint", "name": "Можно с животными", "available": true}, {"icon": "Bath", "name": "Ванные принадлежности", "available": true}, {"icon": "Shirt", "name": "Утюг с гладильной доской", "available": true}, {"icon": "WashingMachine", "name": "Стиральная машина", "available": true}]	f	4626d8b0-1f58-4e54-9b99-563ca20db083
9	Апартаменты с видом на гору	Минеральные Воды, Сов 72, 123к1	4000	сутки	2	1	40	4.8	3	src/pictures/9_main.jpg	["src/pictures/9_1.jpg", "src/pictures/9_2.jpg", "src/pictures/9_3.jpg", "src/pictures/9_4.jpg", "src/pictures/9_5.jpg", "src/pictures/9_6.jpg", "src/pictures/9_7.jpg", "src/pictures/9_8.jpg", "src/pictures/9_9.jpg", "src/pictures/9_10.jpg", "src/pictures/9_11.jpg", "src/pictures/9_12.jpg", "src/pictures/9_13.jpg", "src/pictures/9_14.jpg", "src/pictures/9_15.jpg", "src/pictures/9_16.jpg", "src/pictures/9_17.jpg", "src/pictures/9_18.jpg"]	Новые апартаменты с видом на горы в 5 минутах от аэропорта Минеральные Воды\nКлючевые преимущества:\n• Идеальная транспортная доступность: 5 мин до аэропорта, 10 мин до ж/д вокзала\n• Панорамный вид на горный ландшафт\n• Круглосуточное заселение\nПолное оснащение:\n- Система теплых полов и индивидуальное отопление\n- Высокоскоростной Wi-Fi и современная техника\n- Полный комплект постельных принадлежностей и средств гигиены\nИнфраструктура:\n• Магазины: «НАШ», «Пятёрочка», «Магнит» - в шаговой доступности\n• Кафе, аптека, банкомат - рядом\n• До центра города - 7-10 минут на такси\nТерритория:\n• Бесплатная парковка\n• Детская площадка и мангальная зона\nУсловия:\n• Официальные документы для отчетности\n• Гибкие условия оплаты\nДля бронирования и уточнения деталей - звоните в любое время!	[{"icon": "Wifi", "name": "Бесплатный Wi-Fi", "available": true}, {"icon": "Tv", "name": "Телевизор", "available": true}, {"icon": "Fan", "name": "Кондиционер", "available": true}, {"icon": "UtensilsCrossed", "name": "Кухня", "available": true}, {"icon": "Baby", "name": "Можно с детьми", "available": true}, {"icon": "Microwave", "name": "Микроволновка", "available": true}, {"icon": "Refrigerator", "name": "Холодильник", "available": true}, {"icon": "SquareParking", "name": "Парковка", "available": true}, {"icon": "PawPrint", "name": "Можно с животными", "available": true}, {"icon": "Bath", "name": "Ванные принадлежности", "available": true}, {"icon": "Shirt", "name": "Утюг с гладильной доской", "available": true}, {"icon": "WashingMachine", "name": "Стиральная машина", "available": true}]	f	6c43b6ac-a3b3-4585-9cf7-8891f43116d6
3	Апартаменты с видом на горы у аэропорта	Минеральные Воды, Сов 72, 123к1	4000	сутки	2	1	40	5	4	src/pictures/3_main.jpg	["src/pictures/3_1.jpg", "src/pictures/3_2.jpg", "src/pictures/3_3.jpg", "src/pictures/3_main.jpg", "src/pictures/3_5.jpg", "src/pictures/3_6.jpg", "src/pictures/3_7.jpg", "src/pictures/3_8.jpg", "src/pictures/3_9.jpg", "src/pictures/3_10.jpg", "src/pictures/3_11.jpg", "src/pictures/3_12.jpg", "src/pictures/3_13.jpg", "src/pictures/3_14.jpg", "src/pictures/3_15.jpg", "src/pictures/3_16.jpg"]	Апартаменты с видом на гору в 5 минутах от аэропорта\nСовременные апартаменты с панорамным видом на горы и всем необходимым для комфортного проживания:\n\nТеплые полы и индивидуальное отопление\n\nПолная комплектация: телевизоры, бесплатный Wi-Fi, сплит-система, фен, утюг, постельное белье, микроволновая печь и средства гигиены\n\nБесплатная парковка и инфраструктура во дворе: мангальная зона и детская площадка\n\nРасположение:\n\n5 минут до аэропорта, 10 минут до ж/д вокзала, 7-10 минут до центра на такси\n\nВ шаговой доступности: кафе, магазины ("НАШ", "Пятерочка", "Магнит"), аптека и банкомат\n\nИдеальный выбор для тех, кто ценит комфорт, уют и удобное расположение!	[{"icon": "Wifi", "name": "Бесплатный Wi-Fi", "available": true}, {"icon": "Tv", "name": "Телевизор", "available": true}, {"icon": "Fan", "name": "Кондиционер", "available": true}, {"icon": "UtensilsCrossed", "name": "Кухня", "available": true}, {"icon": "Baby", "name": "Можно с детьми", "available": true}, {"icon": "Microwave", "name": "Микроволновка", "available": true}, {"icon": "Refrigerator", "name": "Холодильник", "available": true}, {"icon": "SquareParking", "name": "Парковка", "available": true}, {"icon": "PawPrint", "name": "Можно с животными", "available": true}, {"icon": "Bath", "name": "Ванные принадлежности", "available": true}, {"icon": "Shirt", "name": "Утюг с гладильной доской", "available": true}, {"icon": "WashingMachine", "name": "Стиральная машина", "available": true}]	t	c0c4ab8d-855d-42da-8cb3-ca8f6291de78
4	Однокомнатная квартира в престижном ЖК	Минеральные воды, Сов 72, 123к1	2500	сутки	2	1	40	4.8	4	src/pictures/4_main.jpg	["src/pictures/4_1.jpg", "src/pictures/4_2.jpg", "src/pictures/4_3.jpg", "src/pictures/4_4.jpg", "src/pictures/4_5.jpg", "src/pictures/4_6.jpg", "src/pictures/4_7.jpg", "src/pictures/4_8.jpg"]	Новая однокомнатная квартира в элитном комплексе у аэропорта\nСовременная квартира с полной комплектацией для комфортного проживания. В шаговой доступности магазины, кафе и вся необходимая инфраструктура.\n\nПреимущества:\n\nУдобное расположение: 10 минут до центра на машине, 15 минут до ж/д вокзала\n\nРядом с аэропортом — идеально для частых путешествий\n\nВсе необходимое для жизни: современная мебель, техника и продуманный дизайн\n\nИдеальный вариант для тех, кто ценит комфорт, стиль и удобное расположение!	[{"icon": "Wifi", "name": "Бесплатный Wi-Fi", "available": true}, {"icon": "Tv", "name": "Телевизор", "available": true}, {"icon": "Fan", "name": "Кондиционер", "available": true}, {"icon": "UtensilsCrossed", "name": "Кухня", "available": true}, {"icon": "Baby", "name": "Можно с детьми", "available": true}, {"icon": "Microwave", "name": "Микроволновка", "available": true}, {"icon": "Refrigerator", "name": "Холодильник", "available": true}, {"icon": "SquareParking", "name": "Парковка", "available": false}, {"icon": "PawPrint", "name": "Можно с животными", "available": true}, {"icon": "Bath", "name": "Ванные принадлежности", "available": false}, {"icon": "Shirt", "name": "Утюг с гладильной доской", "available": true}, {"icon": "WashingMachine", "name": "Стиральная машина", "available": true}]	t	41be13e4-acc4-4b30-8b21-53a9dca6ae2f
5	Современные апартаменты с видом на горы	Минеральные Воды, Сов 123 кв 61	4000	сутки	2	1	40	4.9	4	src/pictures/5_main.jpg	["src/pictures/5_1.jpg", "src/pictures/5_2.jpg", "src/pictures/5_3.jpg", "src/pictures/5_4.jpg", "src/pictures/5_5.jpg", "src/pictures/5_6.jpg", "src/pictures/5_7.jpg", "src/pictures/5_8.jpg"]	Апартаменты с видом на гору в 5 минутах от аэропорта\nСовременные апартаменты с панорамным видом на горы и всем необходимым для комфортного проживания:\n\nТеплые полы и индивидуальное отопление\n\nПолная комплектация: телевизоры, бесплатный Wi-Fi, сплит-система, фен, утюг, постельное белье, микроволновая печь и средства гигиены\n\nБесплатная парковка и инфраструктура во дворе: мангальная зона и детская площадка\n\nРасположение:\n\n5 минут до аэропорта, 10 минут до ж/д вокзала, 7-10 минут до центра на такси\n\nВ шаговой доступности: кафе, магазины ("НАШ", "Пятерочка", "Магнит"), аптека и банкомат\n\nИдеальный выбор для тех, кто ценит комфорт, уют и удобное расположение!	[{"icon": "Wifi", "name": "Бесплатный Wi-Fi", "available": true}, {"icon": "Tv", "name": "Телевизор", "available": true}, {"icon": "Fan", "name": "Кондиционер", "available": true}, {"icon": "UtensilsCrossed", "name": "Кухня", "available": true}, {"icon": "Baby", "name": "Можно с детьми", "available": true}, {"icon": "Microwave", "name": "Микроволновка", "available": true}, {"icon": "Refrigerator", "name": "Холодильник", "available": true}, {"icon": "SquareParking", "name": "Парковка", "available": true}, {"icon": "PawPrint", "name": "Можно с животными", "available": true}, {"icon": "Bath", "name": "Ванные принадлежности", "available": true}, {"icon": "Shirt", "name": "Утюг с гладильной доской", "available": true}, {"icon": "WashingMachine", "name": "Стиральная машина", "available": true}]	t	72f084e0-075e-4927-9577-d96590e2b1c8
\.


--
-- TOC entry 4918 (class 0 OID 16389)
-- Dependencies: 218
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bookings (id, apartment_id, apartment_title, check_in_date, check_out_date, guests, customer_name, customer_email, customer_phone, status, amount, created_at, cancel_token, is_active, description, has_pet, pet_type) FROM stdin;
c002128b-d084-49c5-b4ca-515c30896188	5	Современные апартаменты с видом на горы	2025-06-12 00:00:00	2025-06-14 00:00:00	2	Super Shmel	28shed28@gmail.com	+79616812976	canceled	8000	2025-06-08 12:42:07.817837	42453969-ad56-4f5a-a025-834ce786aa42	t	Оплата квартиры "Современные апартаменты с видом на горы"	t	cat
eb844813-2547-44e2-a13f-5c45cd30c58a	1	Элитная однокомнатная квартира	2025-06-12 00:00:00	2025-06-20 00:00:00	3	Super Shmel	28shed28@gmail.com	+79616812976	canceled	36000	2025-06-08 22:21:09.75131	e23d08e5-fb32-4282-871e-b51e4b4bf5d7	t	Оплата квартиры "Элитная однокомнатная квартира"	f	\N
41a27f22-0c9f-41a1-994f-8bcac227910c	5	Современные апартаменты с видом на горы	2025-07-08 00:00:00	2025-07-11 00:00:00	4	Super Shmel	28shed28@gmail.com	+79616812976	canceled	12000	2025-06-07 13:12:06.051482	be137b60-6197-454a-b698-adef07239298	t	Оплата квартиры "Современные апартаменты с видом на горы"	f	\N
\.


--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 219
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_id_seq', 1, false);


--
-- TOC entry 4772 (class 2606 OID 16432)
-- Name: apartments apartments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartments
    ADD CONSTRAINT apartments_pkey PRIMARY KEY (id);


-- Completed on 2025-06-09 02:27:45

--
-- PostgreSQL database dump complete
--

