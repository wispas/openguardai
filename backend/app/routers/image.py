from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/analyze", tags=["Image Moderation"])

@router.post("/image")
async def analyze_image(file: UploadFile = File(...)):
    return {
        "type": "image",
        "label": "safe",
        "confidence": 0.92,
        "action": "allow"
    }
