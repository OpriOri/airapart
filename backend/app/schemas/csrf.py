"""
Модели для работы с CSRF-токенами
"""

from sqlalchemy import Column, String, DateTime, Integer
from backend.app.db.session import Base


class CsrfToken(Base):
    __tablename__ = "csrf_tokens"

    id = Column(Integer, primary_key=True, index=True)
    token = Column(String, unique=True, index=True)
    ip_address = Column(String)
    user_agent = Column(String)
    expires_at = Column(DateTime)
