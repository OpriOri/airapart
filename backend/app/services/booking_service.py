from datetime import date, datetime, timedelta
from uuid import uuid4

from sqlalchemy import or_, and_
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from starlette import status

from backend.app.api.bookings import EMAIL_REGEX, PHONE_REGEX
from backend.app.db.session import get_db
from backend.app.models.apartment import Apartment
from backend.app.models.booking import Booking
from backend.app.schemas.booking import BookingCreate, BookingStatus


def validate_booking_data(booking: BookingCreate, db: Session = Depends(get_db)):

    # Наличие квартиры в базе
    apartment = db.query(Apartment).filter(Apartment.id == booking.apartment_id).first()
    if not apartment:
        raise HTTPException(status_code=404, detail="Квартира с таким ID не найдена")

    # Даты
    if booking.check_out_date <= booking.check_in_date:
        raise HTTPException(400, detail="Дата выезда должна быть позже даты заезда")
    if booking.check_in_date.date() < date.today():
        raise HTTPException(400, detail="Дата заезда не может быть в прошлом")


    now = datetime.utcnow()
    expiration_minutes = 15

    overlapping = db.query(Booking).filter(
        Booking.apartment_id == booking.apartment_id,
        Booking.check_out_date > booking.check_in_date,
        Booking.check_in_date < booking.check_out_date,
        Booking.is_active.is_(True),
        or_(
            Booking.status == "confirmed",
            and_(
                Booking.status == "pending",
                Booking.created_at > now - timedelta(minutes=expiration_minutes)
            )
        )
    ).first()
    if overlapping:
        raise HTTPException(409, detail="Квартира уже занята на выбранные даты")

    # Гости
    if booking.guests <= 0 or booking.guests > 10:
        raise HTTPException(400, detail="Недопустимое количество гостей")

    # Email
    if not EMAIL_REGEX.match(booking.customer_email):
        raise HTTPException(400, detail="Неверный формат email")

    # Телефон
    if not PHONE_REGEX.match(booking.customer_phone):
        raise HTTPException(400, detail="Номер телефона должен начинаться с +7 и содержать 11 цифр")

    # Питомец
    if booking.has_pet:
        if booking.pet_type not in {"cat", "dog", "other"}:
            raise HTTPException(400, detail="Недопустимый тип питомца")
    else:
        if booking.pet_type:
            raise HTTPException(400, detail="pet_type должен быть пустым, если has_pet = False")

    # Цена за сутки
    price_per_day = apartment.price

    # Количество ночей
    nights = (booking.check_out_date - booking.check_in_date).days
    if nights <= 0:
        raise HTTPException(400, detail="Неверный диапазон дат")

    # Полная стоимость брони
    total_amount = nights * price_per_day


    return {
        "message": "Данные прошли проверку и готовы к оплате",
        "calculatedAmount": total_amount,
        "apartmentTitle": apartment.title  # можно вернуть на фронт
    }

def create_booking(booking: BookingCreate, db: Session, booking_id: str) -> Booking:
    try:
        booking_data = booking.model_dump(exclude_unset=True)

        db_booking = Booking(
            **booking_data,
            id=booking_id,
            cancel_token=str(uuid4()),
            is_active=True,
            status=BookingStatus.PENDING.value,
            created_at=datetime.utcnow()
        )

        db.add(db_booking)
        db.commit()
        db.refresh(db_booking)

        return db_booking

    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Ошибка целостности данных: {str(e)}"
        )
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Внутренняя ошибка сервера: {str(e)}"
        )

