# app/models/booking.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Index
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID
from backend.app.db.session import Base
import uuid



class Booking(Base):
    __tablename__ = "bookings"
    __table_args__ = (
        Index('ix_bookings_apartment_dates', 'apartment_id', 'check_in_date', 'check_out_date'),
    )


    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    apartment_id = Column(Integer)
    apartment_title = Column(String)
    customer_name = Column(String)
    customer_email = Column(String)
    customer_phone = Column(String)
    check_in_date = Column(DateTime)
    check_out_date = Column(DateTime)
    guests = Column(Integer)
    amount = Column(Float)
    status = Column(String, default="pending")
    cancel_token = Column(String, unique=True)
    is_active = Column(Boolean, default=True)
    description = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())  # Автоматическое заполнение
    has_pet = Column(Boolean, default=False, nullable=True)
    pet_type = Column(String, nullable=True)



