# models.py
from sqlalchemy import Column, String, Integer, Float, Boolean
from sqlalchemy.dialects.postgresql import UUID, JSONB
import uuid
from backend.app.db.session import Base

class Apartment(Base):
    __tablename__ = "apartments"

    id = Column(Integer, primary_key=True, index=True)
    apartment_id = Column(UUID(as_uuid=True), unique=True, index=True, default=uuid.uuid4)

    title = Column(String)
    location = Column(String)
    price = Column(Integer)
    price_unit = Column(String)
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    area = Column(Integer)
    rating = Column(Float)
    max_guests = Column(Integer)
    image_url = Column(String)
    images = Column(JSONB)
    description = Column(String)
    amenities = Column(JSONB)
    is_new = Column(Boolean)
