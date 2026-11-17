# AirApart

Бывший горе продакшн проект бронирования апартаментов. Для локального запуска на macOS или Linux понадобятся Python 3.12, Node.js 22 с npm и команды PostgreSQL (`initdb`, `pg_ctl`, `createdb`, `psql`).

Пожалуйста, не используйте мой SMTP-сервер и почтовые реквизиты из `.env`. Для запуска используйте локальные настройки из команд ниже.

## Подготовка

Откройте терминал в корне проекта. Выполните один раз.

```bash
mkdir -p .local
python3.12 -m venv .local/venv
.local/venv/bin/python -m pip install -r backend/requirements.txt
npm --prefix frontend ci --include=optional --no-audit --no-fund

printf '%s\n' airapart-local | initdb -D .local/postgres -U postgres \
  --auth=scram-sha-256 --pwfile=/dev/stdin --encoding=UTF8 --no-locale
printf "listen_addresses = '127.0.0.1'\nport = 55433\n" >> .local/postgres/postgresql.conf
pg_ctl -D .local/postgres -l .local/postgres.log -w start
export PGPASSWORD=airapart-local
createdb -h 127.0.0.1 -p 55433 -U postgres airapart
awk '/^COPY public\.bookings / { skip=1 } skip && $0 == "\\." { skip=0; next } !skip' \
  backend/db_init/init.sql | psql -X -h 127.0.0.1 -p 55433 -U postgres -d airapart -v ON_ERROR_STOP=1 -1
unset PGPASSWORD
```

База содержит каталог квартир и пустую таблицу бронирований.

## Запуск

**Терминал 1, бэкенд из корня проекта**

```bash
env -u YOOKASSA_SHOP_ID -u YOOKASSA_SECRET_KEY PYTHON_DOTENV_DISABLED=1 \
  DB_HOST=127.0.0.1 DB_PORT=55433 DB_USER=postgres DB_PASSWORD=airapart-local DB_NAME=airapart \
  SMTP_HOST=127.0.0.1 SMTP_PORT=1025 SMTP_USER=demo@example.invalid SMTP_PASSWORD=demo ADMIN_EMAIL=demo@example.invalid \
  .local/venv/bin/python -B -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8010 --reload --reload-dir backend
```

**Терминал 2, фронтенд из корня проекта**

```bash
VITE_API_URL=/api VITE_GOOGLE_MAPS_API_KEY= AIRAPART_DEV_API_TARGET=http://127.0.0.1:8010 \
  npm --prefix frontend run dev -- --host 127.0.0.1 --port 3010 --strictPort
```

Сайт доступен на [127.0.0.1:3010](http://127.0.0.1:3010), Swagger — на [127.0.0.1:8010/docs](http://127.0.0.1:8010/docs). Платежи и отправка писем в этом запуске не настроены.

Если PostgreSQL остановлен, перед запуском бэкенда выполните `pg_ctl -D .local/postgres -l .local/postgres.log -w start` из корня проекта.
