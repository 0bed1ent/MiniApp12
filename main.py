from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command

bot = Bot(token="7079198985:AAEs67bepkXx9gyMVRXVeyGhR-e2wXNTuhs")
dp = Dispatcher()

@dp.message(Command(commands=["start"]))
async def start(message: types.Message):
    await message.answer("привет ты играешь в стендов")
dp.run_polling(bot)
