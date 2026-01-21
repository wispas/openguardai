from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/analyze", tags=["Video Moderation"])

@router.post("/video")
async def analyze_video(file: UploadFile = File(...)):
    return {
        "type": "video",
        "label": "review_required",
        "confidence": 0.75,
        "action": "review"
    }
