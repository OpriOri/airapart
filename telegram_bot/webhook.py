import aiohttp
from aiogram import Bot, Dispatcher, types, Router
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import Command
from aiogram.types import Message, Update
from aiogram.fsm.strategy import FSMStrategy
from fastapi import APIRouter, Request
from telegram_bot.config import settings

# Инициализация бота и диспетчера
bot = Bot(
    token=settings.API_TOKEN,
    default=DefaultBotProperties(parse_mode=ParseMode.HTML)
)
dp = Dispatcher(fsm_strategy=FSMStrategy.CHAT)
router = APIRouter()

# Создаем aiogram Router для хендлеров
bot_router = Router()

# Команда /start
@bot_router.message(Command("start"))
async def start_command_handler(message: Message):
    if message.from_user.id in settings.BOT_ADMIN_IDS:
        await message.answer(
            "Привет! Я бот для управления бронированиями.\n\n"
            "Что я умею:\n"
            "• Присылать уведомления о новых бронированиях\n"
            "• Показывать активные брони\n"
            "• Показывать ближайшее бронирование\n"
            "• Удалять просроченные бронирования\n"
            "\nПиши команды, и я помогу тебе!"
        )
    else:
        await message.answer("🚫 У вас нет доступа к использованию этого бота.")

# Регистрируем роутеры
dp.include_router(bot_router)

# Webhook endpoint
@router.post("/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    update = Update.model_validate(data)
    await dp.feed_update(bot=bot, update=update)
    return {"ok": True}

# Установка Webhook (в startup FastAPI)
async def setup_webhook():
    async with aiohttp.ClientSession() as session:
        webhook_url = settings.webhook_url
        payload = {
            "url": webhook_url,
            "secret_token": settings.WEBHOOK_SECRET,
        }
        url = f"https://api.telegram.org/bot{settings.API_TOKEN}/setWebhook"
        async with session.post(url, json=payload) as resp:
            if resp.status != 200:
                error = await resp.text()
                raise RuntimeError(f"Ошибка установки webhook: {resp.status} - {error}")
