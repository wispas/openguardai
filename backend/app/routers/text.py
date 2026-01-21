from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/analyze", tags=["Text Moderation"])

class TextRequest(BaseModel):
    content: str

@router.post("/text")
def analyze_text(data: TextRequest):
    text = data.content.lower()

    if "hate" in text or "kill" in text:
        return {
            "label": "toxic",
            "confidence": 0.85,
            "action": "review"
        }

    return {
        "label": "safe",
        "confidence": 0.95,
        "action": "allow"
    }
