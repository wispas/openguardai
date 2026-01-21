from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/analyze", tags=["Audio Moderation"])

@router.post("/audio")
async def analyze_audio(file: UploadFile = File(...)):
    return {
        "type": "audio",
        "label": "safe",
        "confidence": 0.90,
        "action": "allow"
    }
