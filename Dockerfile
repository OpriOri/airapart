# Этап 1: Сборка Python-зависимостей
FROM python:3.10-slim AS python-builder

WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --prefix=/install --no-cache-dir -r requirements.txt

# Этап 2: Сборка фронта
FROM node:18-bullseye AS frontend-builder

WORKDIR /frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --silent
COPY frontend/ ./
RUN npm run build

# Этап 3: Финальный образ
FROM python:3.10-slim

WORKDIR /app

# Безопасность
RUN adduser --disabled-password appuser && \
    chown appuser:appuser /app
USER appuser

# Переменные окружения
ENV PYTHONPATH=/install/lib/python3.10/site-packages \
    PYTHONUNBUFFERED=1 \
    PATH="/install/bin:${PATH}"

# Копируем зависимости
COPY --from=python-builder --chown=appuser:appuser /install /install

COPY .env .env


# Копируем backend-код
COPY --chown=appuser:appuser backend ./backend

# Копируем собранный фронт
COPY --from=frontend-builder --chown=appuser:appuser /frontend/dist ./frontend/dist

# Проверка
RUN python -c "import uvicorn, gunicorn; print('Deps OK')" && \
    ls -la /app/backend/app && \
    ls -la /app/frontend/dist

EXPOSE 8000

# CMD: выбор между dev и prod
CMD ["sh", "-c", "if [ \"$DEV_MODE\" = \"true\" ]; then uvicorn backend.app.main:app --host 0.0.0.0 --reload; else gunicorn -k uvicorn.workers.UvicornWorker --workers 2 --bind 0.0.0.0:8000 backend.app.main:app; fi"]