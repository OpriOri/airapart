from aiogram import Router
from aiogram.types import Message
from aiogram.filters import Command
from telegram_bot.config import settings

bot_router = Router()

@bot_router.message(Command("start"))
async def start_command_handler(message: Message):
    if message.from_user.id in settings.ADMIN_IDS:
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