from traceback import print_exception

from pydantic_settings import BaseSettings
from pathlib import Path
from dotenv import load_dotenv
import os

# Загрузка переменных окружения
env_path = Path(__file__).resolve().parents[2] / '.env'
load_dotenv(env_path)

class Settings(BaseSettings):
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str
    DB_HOST: str
    DB_PORT: int = 5432

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql+psycopg2://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

    class Config:
        env_file = env_path
        extra = "ignore"

settings = Settings()


# Настройки электронной почты
EMAIL_CONFIG = {
    "host": os.getenv("SMPT_HOST"),  # Измените на ваш SMTP-сервер
    "port": 587,
    "user": os.getenv("SMTP_USER"),  # Измените на ваш email
    "password": os.getenv("SMTP_PASSWORD"),  # Используйте пароль приложения
    "admin": os.getenv("ADMIN_EMAIL")
}

# Настройки Telegram
TELEGRAM_CONFIG = {
    "api_token": os.getenv("API_TOKEN"),
    "chat_id": os.getenv("NOTIFY_CHAT_ID") # ID чата для уведомлений о бронированиях
}


# Настройки CSRF-защиты
CSRF_CONFIG = {
    "token_lifetime_hours": 2,  # Время жизни CSRF-токена в часах
    "token_length": 32  # Длина генерируемого токена
}

# Настройки сервиса уведомлений
NOTIFICATION_CONFIG = {
    "default_owner_email": "owner@apartrent.ru",  # Email владельца по умолчанию
    "admin_email": "admin@apartrent.ru"  # Email для административных уведомлений
}

# Настройки Юкассы
YOOKASSA_SHOP_CONFIG = {
    "shop_id": os.getenv("YOOKASSA_SHOP_ID"),
    "secret_key": os.getenv("YOOKASSA_SECRET_KEY")
}

