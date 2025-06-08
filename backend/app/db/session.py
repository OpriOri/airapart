from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from backend.app.config import settings

# Создаем "движок" для работы с базой данных
engine = create_engine(settings.DATABASE_URL)

# Создаем фабрику сессий
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Функция для получения сессии базы данных
def get_db():
    """
    Генератор сессий базы данных.
    Используется в зависимостях FastAPI для управления жизненным циклом сессии.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()