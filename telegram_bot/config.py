import os
from typing import List
from dotenv import load_dotenv
from pydantic import BaseModel

load_dotenv()  # Загружаем переменные из .env

def parse_int_list(env_value: str) -> List[int]:
    return [int(x.strip()) for x in env_value.split(',') if x.strip().isdigit()]

class Settings(BaseModel):
    API_TOKEN: str = os.getenv("API_TOKEN")
    ADMIN_IDS: List[int] = parse_int_list(os.getenv("ADMIN_IDS", ""))
    NOTIFY_CHAT_ID: int = int(os.getenv("NOTIFY_CHAT_ID", 0))

    API_BASE_URL: str = os.getenv("API_BASE_URL", "http://localhost:8000/api")
    ENV: str = os.getenv("ENV", "development")

    DOMAINS: List[str] = [d.strip() for d in os.getenv("DOMAINS", "").split(",") if d.strip()]
    WEBHOOK_SECRET: str = os.getenv("WEBHOOK_SECRET", "default_secret")

    @property
    def is_dev(self) -> bool:
        return self.ENV == "development"

    @property
    def webhook_base(self) -> str:
        return self.DOMAINS[0] if not self.is_dev and self.DOMAINS else "http://localhost:8000"

    @property
    def webhook_url(self) -> str:
        return f"{self.webhook_base}/bot/webhook/{self.WEBHOOK_SECRET}"

settings = Settings()
