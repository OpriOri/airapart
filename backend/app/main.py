from fastapi import FastAPI

from backend.app.api import bookings, csrf_router, apartments, payment
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="AeroApartMV")

#Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://airapartmv.ru",
        "https://www.airapartmv.ru"
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить все HTTP-методы (GET, POST, PUT, DELETE и т.д.)
    allow_headers=["*"],  # Разрешить все заголовки
)


app.include_router(bookings.router)
app.include_router(csrf_router.router, prefix="/api")
app.include_router(apartments.router)
app.include_router(payment.router)



@app.get('/')
def read_root():
    return {'message': 'i am serial chiller'}



#################################### -запускать через      uvicorn backend.app.main:app --reload
