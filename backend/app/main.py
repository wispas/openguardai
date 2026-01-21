from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import text, image, video, audio

app = FastAPI(
    title="OpenGuard AI",
    description="Multimodal AI content moderation framework",
    version="0.2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(text.router)
app.include_router(image.router)
app.include_router(video.router)
app.include_router(audio.router)

@app.get("/")
def root():
    return {"status": "OpenGuard AI running"}
