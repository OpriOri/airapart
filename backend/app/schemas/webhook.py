from pydantic import BaseModel

class Metadata(BaseModel):
    booking_id: str

class Amount(BaseModel):
    value: str
    currency: str

class PaymentObject(BaseModel):
    id: str
    status: str
    paid: bool
    amount: Amount
    metadata: Metadata

class YookassaWebhook(BaseModel):
    event: str
    type: str
    object: PaymentObject
