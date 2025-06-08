# Этап 1: Сборка проекта
FROM node:18-bullseye AS builder

WORKDIR /app

# 1. Копируем только файлы зависимостей
COPY frontend/package.json frontend/package-lock.json ./

# 2. Устанавливаем зависимости
RUN npm ci --silent

# 3. Копируем исходный код и конфиги
COPY frontend/ .

# 4. Собираем production-версию
RUN npm run build

## Этап 2: Сервер для статики           - убрали ибо отказ от nginx идет
#FROM nginx:alpine
#
## 1. Копируем собранные файлы
#COPY --from=builder /app/dist /usr/share/nginx/html
#
## 2. Копируем конфиг Nginx (явно указываем путь)
#COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
#
#
#CMD ["nginx", "-g", "daemon off;"]