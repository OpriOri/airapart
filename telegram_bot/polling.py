import asyncio
from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from telegram_bot.config import settings
from telegram_bot.handlers.admin_commands import bot_router
from telegram_bot.utils.logger import logger

async def main():
    bot = Bot(
        token=settings.API_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )
    dp = Dispatcher()
    dp.include_router(bot_router)

    logger.info("Bot has started in polling...")
    await dp.start_polling(bot)

if __name__=="__main__":
    asyncio.run(main())