# schemas.py
from pydantic import BaseModel
from typing import List
from uuid import UUID

class Amenity(BaseModel):
    name: str
    icon: str
    available: bool

class ApartmentSchema(BaseModel):
    apartment_id: UUID
    title: str
    location: str
    price: int
    price_unit: str
    bedrooms: int
    bathrooms: int
    area: int
    rating: float
    max_guests: int
    image_url: str
    images: List[str]
    description: str
    amenities: List[Amenity]
    is_new: bool

    class Config:
        orm_mode = True
