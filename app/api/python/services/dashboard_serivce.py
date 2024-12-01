from fastapi import HTTPException
from firebase_admin import firestore
from datetime import datetime, timedelta

db = firestore.client()

async def get_dashboard_data(user_id: str):
    try:
        receipts_ref = db.collection('receipts').where('user_id', '==', user_id)
        docs = receipts_ref.stream()
        receipts = [doc.to_dict() for doc in docs]
        
        # get today's date at midnight for comparison
        today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        
        # calculate metrics
        total_receipts = len(receipts)
        total_amount = sum(receipt['total'] for receipt in receipts)
        generated_today = sum(1 for receipt in receipts 
                            if datetime.fromisoformat(receipt['date']).date() == today.date())
        
        # get active templates (implement based on the templates collection)
        templates_ref = db.collection('templates').where('user_id', '==', user_id)
        active_templates = len(list(templates_ref.stream()))
        
        return {
            "totalReceipts": total_receipts,
            "generatedToday": generated_today,
            "totalAmount": total_amount,
            "activeTemplates": active_templates
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))