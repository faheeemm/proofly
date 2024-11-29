from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import firebase_admin
from firebase_admin import credentials, firestore
import json
import os

# Initialize Firebase Admin
cred = credentials.Certificate(json.loads(os.getenv('FIREBASE_SERVICE_ACCOUNT')))
firebase_admin.initialize_app(cred)
db = firestore.client()

app = FastAPI()

class Receipt(BaseModel):
    user_id: str
    customer_name: str
    date: str
    items: List[dict]
    total: float
    currency: str
    notes: Optional[str] = None

@app.post("/receipts/")
async def create_receipt(receipt: Receipt):
    try:
        doc_ref = db.collection('receipts').document()
        doc_ref.set(receipt.dict())
        return {"id": doc_ref.id, "message": "Receipt created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/receipts/{user_id}")
async def get_receipts(user_id: str):
    try:
        receipts_ref = db.collection('receipts').where('user_id', '==', user_id)
        docs = receipts_ref.stream()
        return [{"id": doc.id, **doc.to_dict()} for doc in docs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)