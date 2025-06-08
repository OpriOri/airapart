from datetime import datetime, date
from sqlalchemy.orm import Session
from backend.app.models.booking import Booking
from backend.app.schemas.booking import BookingStatus
import logging
from apscheduler.schedulers.background import BackgroundScheduler
import atexit
from backend.app.db.session import get_db

logger = logging.getLogger(__name__)
scheduler = BackgroundScheduler()


def cleanup_expired_bookings(db: Session):
    """
    Автоматически деактивирует прошедшие бронирования и меняет их статус.

    Обрабатывает:
    1. Бронирования с check_out_date < текущей даты → помечает как неактивные
    2. Бронирования с check_in_date <= текущей дате <= check_out_date → меняет статус на 'completed'

    Возвращает количество обработанных бронирований.
    """
    try:
        today = date.today()
        processed_count = 0

        # 1. Завершенные бронирования (прошедшие check_out_date)
        expired_bookings = db.query(Booking).filter(
            Booking.check_out_date < today,
            Booking.is_active.is_(True)
        ).all()

        for booking in expired_bookings:
            booking.is_active = False
            booking.status = BookingStatus.COMPLETED.value
            processed_count += 1
            logger.info(f"Деактивировано завершенное бронирование ID: {booking.id}")

        # 2. Активные бронирования, которые сейчас в процессе (сегодня между check_in и check_out)
        current_bookings = db.query(Booking).filter(
            Booking.check_in_date <= today,
            Booking.check_out_date >= today,
            Booking.is_active.is_(True),
            Booking.status == BookingStatus.CONFIRMED.value
        ).all()

        for booking in current_bookings:
            booking.status = BookingStatus.COMPLETED.value
            processed_count += 1
            logger.info(f"Обновлен статус активного бронирования ID: {booking.id} на 'completed'")

        db.commit()
        return processed_count

    except Exception as e:
        db.rollback()
        logger.error(f"Ошибка при очистке бронирований: {str(e)}", exc_info=True)
        raise

def start_scheduled_cleanup():
    """Запускает ежедневную автоматическую очистку в 3:00"""
    scheduler.add_job(
        lambda: cleanup_expired_bookings(next(get_db())),
        'cron', hour=3, minute=0,
        misfire_grace_time=3600
    )
    scheduler.start()
    atexit.register(scheduler.shutdown)
    logger.info("Scheduler started - daily cleanup at 3:00 AM")

# Инициализация при импорте
start_scheduled_cleanup()