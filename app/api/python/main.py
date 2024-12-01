from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import firebase_admin
from firebase_admin import credentials
import json
import os
from .models import Receipt
from .services import receipt_service, dashboard_service

cred = credentials.Certificate(json.loads(os.getenv('FIREBASE_SERVICE_ACCOUNT')))
firebase_admin.initialize_app(cred)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/receipts/")
async def create_receipt(receipt: Receipt):
    return await receipt_service.create_receipt(receipt)

@app.get("/receipts/{user_id}")
async def get_receipts(user_id: str):
    return await receipt_service.get_user_receipts(user_id)

@app.get("/analytics/{user_id}")
async def get_analytics(user_id: str):
    return await receipt_service.get_analytics(user_id)

@app.get("/dashboard/{user_id}")
async def get_dashboard_data(user_id: str):
    return await dashboard_service.get_dashboard_data(user_id)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)