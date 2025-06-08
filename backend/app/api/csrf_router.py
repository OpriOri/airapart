"""
Роутер для работы с CSRF через Cookie (без БД)
"""
from fastapi import APIRouter, Request, Response, HTTPException, Depends
import secrets
from datetime import datetime, timedelta

router = APIRouter()

# Конфигурация
CSRF_COOKIE_NAME = "csrf_token"
CSRF_HEADER_NAME = "X-CSRF-Token"
CSRF_TOKEN_AGE = 7200  # 2 часа в секундах

@router.get("/csrf-token")
async def get_csrf_token(response: Response):
    """
    Устанавливает CSRF-токен в cookie и возвращает статус.
    Фронтенд должен читать токен из cookie и отправлять в заголовках.
    """
    token = secrets.token_urlsafe(32)  # Безопасная генерация токена

    response.set_cookie(
        key=CSRF_COOKIE_NAME,
        value=token,
        max_age=CSRF_TOKEN_AGE,
        httponly=True,
        secure=False,  # в продакшене изменить на True
        samesite="lax",
        path="/"
    )
    return ({"csrf-token": token},
            {"status": "CSRF cookie set"})

def verify_csrf_token(request: Request):
    """
    Проверяет CSRF-токен из cookie и заголовка.
    Используйте как зависимость: `Depends(verify_csrf_token)`
    """
    cookie_token = request.cookies.get(CSRF_COOKIE_NAME)
    header_token = request.headers.get(CSRF_HEADER_NAME)

    if not cookie_token or not header_token:
        raise HTTPException(
            status_code=403,
            detail="CSRF token missing"
        )

    if not secrets.compare_digest(cookie_token, header_token):
        raise HTTPException(
            status_code=403,
            detail="Invalid CSRF token"
        )

    return True