"""
Модели данных для уведомлений
"""

from pydantic import BaseModel, Field, EmailStr
from typing import Dict, Any, Optional

class EmailNotificationRequest(BaseModel):
    recipient: str
    subject: str
    content: str

class TelegramNotificationRequest(BaseModel):
    name: str
    email: str
    phone: str
    message: str
    parse_mode: Optional[str] = "Markdown"

class TelegramNotificationResponse(BaseModel):
    success: bool
    message: str

class BookingNotificationRequest(BaseModel):
    booking_id: int
    apartment_id: int
    apartment_title: str
    customer_name: str
    customer_email: str
    customer_phone: str
    check_in_date: str
    check_out_date: str
    guests: int
    amount: float
    payment_amount: Optional[float] = None
    payment_type: Optional[str] = None
    payment_status: Optional[str] = None
    has_pet: Optional[bool] = None
    pet_type: Optional[str] = None
    owner_whatsapp: Optional[str] = None
