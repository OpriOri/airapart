from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Body
from sqlalchemy.orm import Session
from sqlalchemy import select, and_
from datetime import datetime, date
from uuid import UUID
from secrets import compare_digest
import re


from backend.app.db.session import get_db
from backend.app.models.booking import Booking
from backend.app.schemas.booking import (
    BookingResponse,
    BookingStatus,
    BookedDatesResponse,
    BookingCancel
)

from backend.app.services.email_utils import schedule_email, \
    ADMIN_EMAIL, generate_admin_cancellation_email, generate_client_cancellation_email


router = APIRouter(prefix="/api/bookings", tags=["bookings"])



EMAIL_REGEX = re.compile(r"[^@]+@[^@]+\.[^@]+")
PHONE_REGEX = re.compile(r"^\+7\d{10}$")


@router.post("/{booking_id}/cancel-by-client", response_model=BookingResponse)
def cancel_booking_by_client(
    booking_id: UUID,
    background_tasks: BackgroundTasks,
    payload: BookingCancel = Body(...),
    db: Session = Depends(get_db)
) -> BookingResponse:
    """
    Отмена бронирования клиентом по UUID и токену.
    """
    cancel_token = payload.cancel_token
    reason = payload.reason

    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.is_active.is_(True)
    ).first()

    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Бронирование не найдено"
        )

    if not compare_digest(booking.cancel_token, cancel_token):
        raise HTTPException(status_code=403, detail="Неверный токен отмены")

    if booking.status not in [BookingStatus.PENDING.value, BookingStatus.CONFIRMED.value]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Можно отменять только бронирования в статусе 'pending' или 'confirmed'"
        )

    today = date.today()
    check_in_date = booking.check_in_date.date() if isinstance(booking.check_in_date, datetime) else booking.check_in_date
    days_until_checkin = (check_in_date - today).days

    if days_until_checkin < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Нельзя отменить завершенное бронирование"
        )

    if 0 <= days_until_checkin < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Отмена возможна минимум за 1 день до заезда. Пожалуйста, свяжитесь с владельцем."
        )

    if reason:
        booking.cancel_reason = reason

    try:
        admin_subject, admin_html = generate_admin_cancellation_email(booking, reason)
        client_subject, client_html = generate_client_cancellation_email(booking, reason)

        schedule_email(background_tasks, ADMIN_EMAIL, admin_subject, admin_html)
        schedule_email(background_tasks, booking.customer_email, client_subject, client_html)

        booking.status = BookingStatus.CANCELED.value
        booking.updated_at = datetime.utcnow()

        db.commit()
        db.refresh(booking)

        return booking

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка при отмене бронирования: {str(e)}"
        )


@router.get(
    "/by-apartment/{apartment_id}",
    response_model=BookedDatesResponse,
    summary="Получение забронированных дат для квартиры",
    responses={
        200: {"description": "Список забронированных периодов"},
        404: {"description": "Квартира не найдена"},
        500: {"description": "Ошибка сервера"}
    }
)

def get_booked_dates(
    apartment_id: int,
    db: Session = Depends(get_db)
):
    """
    Получает список забронированных дат для указанной квартиры.

    Возвращает:
    - apartment_id: ID квартиры
    - booked_dates: Список периодов в формате [{"start": "YYYY-MM-DD", "end": "YYYY-MM-DD"}]
    """
    try:
        now = datetime.utcnow()

        bookings = db.execute(
            select(
                Booking.check_in_date,
                Booking.check_out_date
            ).where(
                and_(
                    Booking.apartment_id == apartment_id,
                    Booking.status == BookingStatus.CONFIRMED.value,
                    Booking.is_active == True,
                    Booking.check_out_date >= now  # Только будущие/текущие брони
                )
            ).order_by(Booking.check_in_date)
        ).all()

        booked_ranges = [
            {
                "start": booking.check_in_date.date().isoformat(),
                "end": booking.check_out_date.date().isoformat()
            }
            for booking in bookings
        ]

        return {
            "apartment_id": apartment_id,
            "booked_dates": booked_ranges
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Ошибка при получении данных: {str(e)}"
        )
