from fastapi import APIRouter, Depends, HTTPException, Request, status, BackgroundTasks
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse
from yookassa import Payment
import uuid
import logging
import ipaddress

from backend.app.config import YOOKASSA_SHOP_CONFIG
from backend.app.db.session import get_db
from backend.app.models.booking import Booking
from backend.app.schemas.booking import BookingCreate
from backend.app.schemas.webhook import YookassaWebhook
from backend.app.services.booking_service import validate_booking_data, create_booking
from backend.app.services.email_utils import generate_admin_email_content, generate_client_email_content, \
    schedule_email, ADMIN_EMAIL

router = APIRouter(prefix="/api/payments", tags=["payments"])

# Инициализация ключей ЮKassa
import yookassa
yookassa.Configuration.account_id = YOOKASSA_SHOP_CONFIG["shop_id"]
yookassa.Configuration.secret_key = YOOKASSA_SHOP_CONFIG["secret_key"]


YOOKASSA_IP_RANGES = [
    ipaddress.ip_network("185.71.76.0/27"),
    ipaddress.ip_network("185.71.77.0/27"),
    ipaddress.ip_network("77.75.153.0/25")
]


@router.post("/create")
def create_payment(booking: BookingCreate, request: Request, db: Session = Depends(get_db)):
    """
    Создает платёж в ЮKassa после валидации брони.
    """
    # Шаг 1: Валидация и расчет стоимости
    try:
        validated = validate_booking_data(booking, db)
    except HTTPException as e:
        raise e

    calculated_amount = validated["calculatedAmount"]
    apartment_title = validated["apartmentTitle"]

    # Шаг 2: Создание уникального ID платежа
    booking_id = str(uuid.uuid4())

    # 2. Создаём бронь со статусом pending
    create_booking(db=db, booking=booking, booking_id=booking_id)

    # Шаг 3: Создание платежа через ЮKassa
    try:
        payment = Payment.create({
            "amount": {
                "value": f"{calculated_amount:.2f}",  # в формате "1000.00"
                "currency": "RUB"
            },
            "confirmation": {
                "type": "redirect",
                "return_url": "http://localhost:3000/payment/success"
            },
            "capture": True,
            "description": f"Бронирование квартиры «{apartment_title}»",
            "metadata": {
                "booking_id": booking_id,
                "apartment_id": booking.apartment_id,
                "customer_name": booking.customer_name,
                "customer_email": booking.customer_email,
                "customer_phone": booking.customer_phone,
                "check_in": str(booking.check_in_date),
                "check_out": str(booking.check_out_date),
                "guests": booking.guests
            }
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка создания платежа: {str(e)}")

    # Шаг 4: Возврат URL для перенаправления пользователя
    confirmation_url = payment.confirmation.confirmation_url

    return JSONResponse({
        "confirmation_url": confirmation_url,
        "booking_id": booking_id  # Можно использовать потом в Webhook для связи
    })


def is_yookassa_ip(ip_str: str) -> bool:
    try:
        ip = ipaddress.ip_address(ip_str)
        return any(ip in net for net in YOOKASSA_IP_RANGES)
    except ValueError:
        return False

@router.post("/webhook/yookassa/d9a78e6c-fe3b-11ee-b6ae-325096b39f47")  # Пример уникального пути
def yookassa_webhook(
    request: Request,
    payload: YookassaWebhook,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    # Проверка IP отправителя
    client_ip = request.client.host
    if not is_yookassa_ip(client_ip):
        logging.warning(f"❌ Попытка доступа к вебхуку с IP {client_ip}")
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Access denied")

    # Проверка типа события
    if payload.event != "payment.succeeded":
        raise HTTPException(status_code=400, detail="Unhandled event type")

    # Получение ID брони из metadata
    booking_id = payload.object.metadata.booking_id

    # Поиск брони в базе
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    # проверка суммы на подмену
    expected_amount = booking.amount

    if str(payload.object.amount.value) != str(expected_amount):
        logging.warning(
            f"❌ Несовпадение суммы оплаты! Соси. Ожидалось: {expected_amount}, получено: {payload.object.amount.value}"
        )
        raise HTTPException(status_code=400, detail="Payment amount mismatch")

    # Обновление статуса
    booking.status = "confirmed"
    db.commit()

    # Логирование
    logging.info(f"[ЮKassa] ✅ Оплата прошла. Бронь {booking_id} подтверждена.")
    logging.info(f"[ЮKassa] 💰 Сумма: {payload.object.amount.value} {payload.object.amount.currency}")


    admin_subject, admin_html = generate_admin_email_content(booking)
    client_subject, client_html = generate_client_email_content(booking)

    # отправка писем в фоне
    schedule_email(background_tasks, ADMIN_EMAIL, admin_subject, admin_html)
    schedule_email(background_tasks, booking.customer_email, client_subject, client_html)

    return {"status": "ok"}