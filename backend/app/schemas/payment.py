from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from enum import Enum


class PaymentStatus(str, Enum):
    PENDING = "pending"
    SUCCEEDED = "succeeded"
    CANCELED = "canceled"
    REFUNDED = "refunded"


class PaymentType(str, Enum):
    PREPAYMENT = "prepayment"
    FULL_PAYMENT = "fullPayment"


class PaymentCreate(BaseModel):
    booking_id: int
    amount: float
    payment_type: PaymentType
    description: str


class PaymentResponse(BaseModel):
    id: int
    booking_id: int
    amount: float
    payment_type: PaymentType
    status: PaymentStatus
    payment_url: str
    description: str
    created_at: datetime
