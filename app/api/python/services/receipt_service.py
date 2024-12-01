from fastapi import HTTPException
from firebase_admin import firestore
from datetime import datetime, timedelta
from ..models import Receipt, AnalyticsData

db = firestore.client()

async def create_receipt(receipt: Receipt):
    try:
        doc_ref = db.collection('receipts').document()
        doc_ref.set(receipt.dict())
        return {"id": doc_ref.id, "message": "Receipt created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def get_user_receipts(user_id: str):
    try:
        receipts_ref = db.collection('receipts').where('user_id', '==', user_id)
        docs = receipts_ref.stream()
        return [{"id": doc.id, **doc.to_dict()} for doc in docs]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def get_analytics(user_id: str):
    try:
        receipts_ref = db.collection('receipts').where('user_id', '==', user_id)
        docs = receipts_ref.stream()
        receipts = [doc.to_dict() for doc in docs]
        
        # calculate analytics
        total_amount = sum(receipt['total'] for receipt in receipts)
        status_count = {}
        monthly_totals = {}
        
        for receipt in receipts:
            # count by status
            status = receipt.get('status', 'pending')
            status_count[status] = status_count.get(status, 0) + 1
            
            # monthly totals
            date = datetime.fromisoformat(receipt['date'])
            month_key = date.strftime('%Y-%m')
            monthly_totals[month_key] = monthly_totals.get(month_key, 0) + receipt['total']
        
        return AnalyticsData(
            total_receipts=len(receipts),
            total_amount=total_amount,
            receipts_by_status=status_count,
            monthly_totals=[{"month": k, "total": v} for k, v in monthly_totals.items()]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))