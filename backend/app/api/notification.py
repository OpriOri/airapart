# """
# Роутер для отправки уведомлений
# """
#
# from fastapi import APIRouter, Depends, HTTPException, Body
# from typing import Dict, Any, Optional
# import json
# import smtplib
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# import requests
# from datetime import datetime
#
# from backend.app.db.session import get_db
# from sqlalchemy.orm import Session
# from backend.app.config import EMAIL_CONFIG, TELEGRAM_CONFIG
# from backend.app.schemas.notification import EmailNotificationRequest, TelegramNotificationRequest, \
#     BookingNotificationRequest
# from backend.app.api.csrf_router import verify_csrf_token
# from backend.app.services.notification_service import send_email, send_telegram_message, format_date
#
#
# router = APIRouter()
#
#
# # Эндпоинт для отправки email-уведомлений
# @router.post("/email")
# async def send_email_notification(
#         request: EmailNotificationRequest,
#         _: bool = Depends(verify_csrf_token)
# ):
#     """Отправляет email-уведомление"""
#     try:
#         # Преобразуем content в HTML-формат
#         html_content = f"""
#         <html>
#             <body>
#                 <h1>{request.subject}</h1>
#                 <div>{request.content}</div>
#             </body>
#         </html>
#         """
#
#         success = send_email(request.recipient, request.subject, html_content)
#
#         if success:
#             return {"success": True, "message": "Email sent successfully"}
#         else:
#             raise HTTPException(status_code=500, detail="Failed to send email")
#
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error sending email: {str(e)}")
#
#
#
#
# # Эндпоинт для отправки всех уведомлений о бронировании
# @router.post("/booking")
# async def send_booking_notifications(
#         request: BookingNotificationRequest,
#         db: Session = Depends(get_db),
#         _: bool = Depends(verify_csrf_token)
# ):
#     """Отправляет все необходимые уведомления о бронировании"""
#     try:
#         # Форматируем даты
#         check_in = format_date(request.check_in_date)
#         check_out = format_date(request.check_out_date)
#
#         # Формируем HTML для email клиенту
#         customer_html = f"""
#         <h2>Здравствуйте, {request.customer_name}!</h2>
#         <p>Ваше бронирование квартиры "{request.apartment_title}" успешно создано.</p>
#         <h3>Детали бронирования:</h3>
#         <ul>
#             <li>Даты проживания: с {check_in} по {check_out}</li>
#             <li>Количество гостей: {request.guests}</li>
#             <li>Общая стоимость: {request.amount} ₽</li>
#             <li>{"С питомцем: " + request.pet_type if request.has_pet else "Без питомцев"}</li>
#         </ul>
#         <p><strong>ВАЖНО!</strong> Для завершения бронирования необходимо:</p>
#         <ol>
#             <li>Отправить фотографию паспорта (только разворот с основной информацией) владельцу через WhatsApp</li>
#             <li>Получить подтверждение и информацию о заселении</li>
#         </ol>
#         <p>Отправить документы можно по ссылке: <a href="https://wa.me/{request.owner_whatsapp}">WhatsApp</a></p>
#         <p>С уважением,<br>Команда АпартРента</p>
#         """
#
#         # Формируем HTML для email владельцу
#         owner_html = f"""
#         <h2>Новое бронирование!</h2>
#         <h3>Информация о бронировании:</h3>
#         <ul>
#             <li>Квартира: {request.apartment_title} (ID: {request.apartment_id})</li>
#             <li>Даты: {check_in} - {check_out}</li>
#             <li>Гостей: {request.guests}</li>
#             <li>Сумма: {request.amount} ₽</li>
#             <li>{"С питомцем: " + request.pet_type if request.has_pet else "Без питомцев"}</li>
#         </ul>
#         <h3>Информация о клиенте:</h3>
#         <ul>
#             <li>Имя: {request.customer_name}</li>
#             <li>Email: {request.customer_email}</li>
#             <li>Телефон: {request.customer_phone}</li>
#         </ul>
#         <p><strong>ВАЖНО!</strong> Клиент должен отправить вам фотографию паспорта через WhatsApp для завершения бронирования.<br>
#         Пожалуйста, проверьте свой WhatsApp и подтвердите получение документов.</p>
#         """
#
#         # Формируем текст для Telegram
#         telegram_text = f"""
# 📋 *Новое бронирование*
# 🏠 {request.apartment_title}
# 📅 {check_in} → {check_out}
# 👥 {request.guests} гост.
# 💰 {request.amount} ₽
#
# 👤 *Клиент*
# - {request.customer_name}
# - {request.customer_phone}
# - {request.customer_email}
# {"- С питомцем: " + request.pet_type if request.has_pet else "- Без питомцев"}
#
# ⚠️ *Ожидается получение документов через WhatsApp*
#         """
#
#         # Отправляем email клиенту
#         customer_email_success = send_email(
#             request.customer_email,
#             f"Бронирование квартиры {request.apartment_title}",
#             customer_html
#         )
#
#         # Получаем email владельца из базы данных или настроек
#         owner_email = "owner@apartarenta.ru"  # Замените на реальное получение email владельца
#
#         # Отправляем email владельцу
#         owner_email_success = send_email(
#             owner_email,
#             f"Новое бронирование: {request.apartment_title}",
#             owner_html
#         )
#
#         # Отправляем сообщение в Telegram
#         # Получаем chat_id из настроек
#         chat_id = TELEGRAM_CONFIG["booking_chat_id"]
#         telegram_success = send_telegram_message(chat_id, telegram_text)
#
#         return {
#             "success": customer_email_success and owner_email_success and telegram_success,
#             "details": {
#                 "customer_email": customer_email_success,
#                 "owner_email": owner_email_success,
#                 "telegram": telegram_success
#             }
#         }
#
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"Error sending notifications: {str(e)}")