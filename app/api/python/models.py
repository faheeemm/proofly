from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Item(BaseModel):
    description: str
    quantity: int
    price: float
    tax: Optional[float] = 0.0

class Receipt(BaseModel):
    user_id: str
    customer_name: str
    customer_email: Optional[str] = None
    date: str = Field(default_factory=lambda: datetime.now().isoformat())
    items: List[Item]
    total: float
    currency: str
    notes: Optional[str] = None
    status: str = "pending"  # pending, sent, paid
    payment_method: Optional[str] = None
    due_date: Optional[str] = None

class AnalyticsData(BaseModel):
    total_receipts: int
    total_amount: float
    receipts_by_status: dict
    monthly_totals: List[dict]