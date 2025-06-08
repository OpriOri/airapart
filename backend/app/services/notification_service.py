# """
# Утилиты для отправки уведомлений
# """
# import os
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# import requests
# from datetime import datetime
# from backend.app.config import EMAIL_CONFIG, TELEGRAM_CONFIG
# from backend.app.schemas.booking import BookingCreate
# from backend.app.schemas.notification import TelegramNotificationRequest
# from telegram_bot.utils.logger import logger
#
# CHAT_ID = os.getenv("NOTIFY_CHAT_ID")
#
# # def send_email(to_email: str, subject: str, html_content: str) -> bool:
# #     """
# #     Отправляет электронное письмо через SMTP-сервер
# #     """
# #     try:
# #         msg = MIMEMultipart()
# #         msg['From'] = EMAIL_CONFIG["user"]
# #         msg['To'] = to_email
# #         msg['Subject'] = subject
# #
# #         msg.attach(MIMEText(html_content, 'html'))
# #
# #         server = smtplib.SMTP(EMAIL_CONFIG["host"], EMAIL_CONFIG["port"])
# #         server.starttls()
# #         server.login(EMAIL_CONFIG["user"], EMAIL_CONFIG["password"])
# #         server.send_message(msg)
# #         server.quit()
# #
# #         return True
# #     except Exception as e:
# #         print(f"Ошибка при отправке email: {str(e)}")
# #         return False
#
#
# def send_telegram_message(message: str, parse_mode: str = "Markdown") -> bool:
#     """
#     Отправляет сообщение в Telegram через Telegram Bot API.
#     """
#     url = f"https://api.telegram.org/bot{TELEGRAM_CONFIG['api_token']}/sendMessage"
#     payload = {
#         "chat_id": CHAT_ID,
#         "text": message,
#         "parse_mode": parse_mode,
#     }
#
#     try:
#         response = requests.post(url, json=payload, timeout=10)
#
#         if response.status_code != 200:
#             logger.error("Ошибка при отправке в Telegram: %s — %s", response.status_code, response.text)
#             return False
#
#         logger.info("Сообщение успешно отправлено в Telegram.")
#         return True
#
#     except requests.exceptions.RequestException as e:
#         logger.exception("Исключение при попытке отправки сообщения в Telegram")
#         return False
#
#
# def format_date(date_string: str) -> str:
#     """
#     Форматирует дату в удобочитаемый формат
#     """
#     date_obj = datetime.fromisoformat(date_string.replace('Z', '+00:00'))
#     return date_obj.strftime("%d.%m.%Y")
#
# def format_telegram_message(data: TelegramNotificationRequest) -> str:
#     return (
#         "📨 *Новое сообщение с сайта:*\n\n"
#         f"👤 *Имя:* {data.name}\n"
#         f"📧 *Email:* {data.email}\n"
#         f"📱 *Телефон:* {data.phone}\n\n"
#         f"💬 *Сообщение:*\n{data.message}"
#     )
#
# def format_booking_telegram_message(data: BookingCreate) -> str:
#     """
#     Формирует сообщение для отправки в Telegram при новом бронировании
#     """
#     check_in = data.check_in_date.strftime("%d.%m.%Y")
#     check_out = data.check_out_date.strftime("%d.%m.%Y")
#
#     pet_info = f"\n🐾 *Питомец:* {data.pet_type}" if data.has_pet and data.pet_type else ""
#
#     return (
#         "📢 *Новое бронирование!*\n\n"
#         f"🏠 *Квартира:* {data.apartment_title}\n"
#         f"📅 *Даты:* {check_in} — {check_out}\n"
#         f"👥 *Гостей:* {data.guests}\n"
#         f"💰 *Сумма:* {data.amount} ₽\n\n"
#         f"👤 *Клиент:* {data.customer_name}\n"
#         f"📞 *Телефон:* {data.customer_phone}\n"
#         f"📧 *Email:* {data.customer_email}"
#         f"{pet_info}"
#         f"\n📝 *Комментарий:*\n{data.description or '—'}"
#     )
