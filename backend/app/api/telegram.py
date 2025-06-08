# # backend/app/api/telegram_routes.py
# import requests
# from fastapi import APIRouter, HTTPException, BackgroundTasks
#
#
# from backend.app.schemas.notification import TelegramNotificationRequest, TelegramNotificationResponse
# from backend.app.config import TELEGRAM_CONFIG
#
#
# router = APIRouter(
#     prefix="/bot",
#     tags=["telegram"]
# )
#
#
# @router.post(
#     "/notifications/chat",
#     response_model=TelegramNotificationResponse,
#     summary="Отправка уведомления в Telegram",
#     responses={
#         200: {
#             "description": "Уведомление успешно поставлено в очередь на отправку",
#             "content": {
#                 "application/json": {
#                     "example": {"success": True, "message": "Notification queued for delivery"}
#                 }
#             }
#         },
#         422: {
#             "description": "Ошибка валидации данных",
#             "content": {
#                 "application/json": {
#                     "example": {"detail": "Validation error: phone field required"}
#                 }
#             }
#         },
#         500: {
#             "description": "Ошибка сервера при отправке уведомления",
#             "content": {
#                 "application/json": {
#                     "example": {"detail": "Internal server error"}
#                 }
#             }
#         }
#     }
# )
# async def send_telegram_notification(
#         request: TelegramNotificationRequest,
#         background_tasks: BackgroundTasks
# ):
#     """
#     Отправляет уведомление в Telegram чат при получении данных из контактной формы
#
#     - **name**: Имя отправителя
#     - **email**: Email для обратной связи
#     - **phone**: Контактный телефон
#     - **message**: Текст сообщения
#     - **parse_mode**: Форматирование текста (Markdown/HTML)
#     """
#     try:
#         formatted_message = (
#             "📨 *Новое сообщение с сайта:*\n\n"
#             f"👤 *Имя:* {request.name}\n"
#             f"📧 *Email:* {request.email}\n"
#             f"📱 *Телефон:* {request.phone}\n\n"
#             f"💬 *Сообщение:*\n{request.message}"
#         )
#
#         background_tasks.add_task(
#             _send_telegram_message,
#             message=formatted_message,
#             parse_mode=request.parse_mode
#         )
#
#         return {"success": True, "message": "Notification queued for delivery"}
#
#     except Exception as e:
#         raise HTTPException(status_code=500, detail="Internal server error")
#
#
# def _send_telegram_message(message: str, parse_mode: str = "Markdown"):
#     url = f"https://api.telegram.org/bot{TELEGRAM_CONFIG['api_token']}/sendMessage"
#     payload = {
#         "chat_id": TELEGRAM_CONFIG["chat_id"],
#         "text": message,
#         "parse_mode": parse_mode
#     }
#
#     response = requests.post(url, json=payload, timeout=10)
#     response.raise_for_status()
#     return True