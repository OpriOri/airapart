import smtplib
import ssl

from email.message import EmailMessage
import os
from dotenv import load_dotenv
from fastapi import BackgroundTasks

from backend.app.models.booking import Booking

from jinja2 import Environment, FileSystemLoader, select_autoescape
from pathlib import Path
from typing import Tuple, Optional

# Путь к шаблонам
TEMPLATES_DIR = Path(__file__).resolve().parent.parent / "email_templates"

# Jinja2 окружение
env = Environment(
    loader=FileSystemLoader(TEMPLATES_DIR),
    autoescape=select_autoescape(['html', 'xml'])
)

# Загружаем переменные из .env
load_dotenv()

# SMTP настройки
SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")

def send_email(to_email: str, subject: str, html_content: str):
    """Синхронная отправка email"""
    message = EmailMessage()
    message["From"] = SMTP_USER
    message["To"] = to_email
    message["Subject"] = subject


    message.set_content("Это HTML письмо иди нах")

    message.add_alternative(html_content, subtype="html")

    context = ssl.create_default_context()

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls(context=context)
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(message)


def schedule_email(background_tasks: BackgroundTasks, to_email: str, subject: str, html_content: str):
    """Фоновая отправка письма"""
    background_tasks.add_task(send_email, to_email, subject, html_content)

def generate_admin_email_content(booking: Booking) -> Tuple[str, str]:
    template = env.get_template("admin_booking_email.html")

    subject = f"Новое бронирование: {booking.apartment_title} от {booking.customer_name}"

    html = template.render(
        id=booking.id,
        apartment_id=booking.apartment_id,
        apartment_title=booking.apartment_title,
        check_in_date=booking.check_in_date.strftime('%d.%m.%Y'),
        check_out_date=booking.check_out_date.strftime('%d.%m.%Y'),
        guests=booking.guests,
        amount=booking.amount,
        customer_name=booking.customer_name,
        customer_email=booking.customer_email,
        customer_phone=booking.customer_phone,
        description=booking.description,
        has_pet=booking.has_pet,
        pet_type=booking.pet_type,
        status=booking.status,
        is_active=booking.is_active,
        cancel_token=booking.cancel_token,
        created_at=booking.created_at.strftime('%d.%m.%Y %H:%M')
    )

    return subject, html

def generate_client_email_content(booking: Booking) -> Tuple[str, str]:
    template = env.get_template("client_booking.html")

    subject = f"Ваше бронирование квартиры «{booking.apartment_title}»"

    html = template.render(
        id=booking.id,
        apartment_id=booking.apartment_id,
        apartment_title=booking.apartment_title,
        check_in_date=booking.check_in_date.strftime('%d.%m.%Y'),
        check_out_date=booking.check_out_date.strftime('%d.%m.%Y'),
        guests=booking.guests,
        customer_name=booking.customer_name,
        customer_email=booking.customer_email,
        customer_phone=booking.customer_phone,
        amount=booking.amount,
        description=booking.description,
        has_pet=booking.has_pet,
        pet_type=booking.pet_type,
        cancel_token=booking.cancel_token
    )

    return subject, html


def generate_admin_cancellation_email(booking: Booking, reason: Optional[str] = None) -> tuple[str, str]:
    template = env.get_template("admin_cancel_notification.html")

    subject = f"Отмена бронирования: {booking.apartment_title} (ID {booking.id})"

    html = template.render(booking=booking, reason=reason)

    return subject, html

def generate_client_cancellation_email(booking: Booking, reason: Optional[str] = None) -> tuple[str, str]:
    template = env.get_template("client_cancel_notification.html")

    subject = f"Вы отменили бронирование №{booking.id}"

    html = template.render(
        booking=booking,
        reason=reason
    )

    return subject, html
