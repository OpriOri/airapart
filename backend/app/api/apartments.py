from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import List

from backend.app.models.apartment import Apartment
from backend.app.schemas.apartment import ApartmentSchema
from backend.app.db.session import get_db

router = APIRouter(prefix='/api/apartments', tags=['apartments'])

@router.get("/",
            status_code=status.HTTP_200_OK,
            summary="Отобразить все квартиры",
            response_model=List[ApartmentSchema])
async def get_apartments(session: Session = Depends(get_db)):
    query = select(Apartment)
    result = session.execute(query)
    apartments = result.scalars().all()
    return apartments
