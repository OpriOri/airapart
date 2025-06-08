from pydantic import BaseModel, Field, EmailStr, ConfigDict
from datetime import datetime
from typing import Optional
from enum import Enum
from uuid import UUID


class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELED = "canceled"
    COMPLETED = "completed"


class BookingCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    apartment_id: int = Field(..., alias="apartmentId")
    apartment_title: str = Field(..., alias="apartmentTitle")
    check_in_date: datetime = Field(..., alias="checkInDate")
    check_out_date: datetime = Field(..., alias="checkOutDate")
    guests: int
    customer_name: str = Field(..., alias="customerName")
    customer_email: EmailStr = Field(..., alias="customerEmail")
    customer_phone: str = Field(..., alias="customerPhone")
    amount: float = Field(..., alias="totalAmount")  # будет игнорироваться при сохранении, используется только для отображения на фронте
    description: str | None = None
    has_pet: bool = Field(False, alias="hasPet")
    pet_type: Optional[str] = Field(None, alias="petType")


class BookingResponse(BaseModel):
    id: UUID
    apartment_id: int
    apartment_title: str
    check_in_date: datetime
    check_out_date: datetime
    guests: int
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    status: BookingStatus
    amount: float
    cancel_token: str
    is_active: bool
    created_at: datetime


class BookingCancel(BaseModel):
    cancel_token: str = Field(..., description="Секретный токен отмены (обязателен)")
    reason: Optional[str] = Field(None, description="Причина отмены (опционально)")

class BookedDatesResponse(BaseModel):
    apartment_id: int
    booked_dates: list[dict[str, str]]  # Формат: {"start": "2023-11-15", "end": "2023-11-20"}
