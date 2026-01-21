from fastapi import FastAPI
from app.routers import text

app = FastAPI(
    title="OpenGuard AI",
    description="Open-source multimodal content moderation framework",
    version="0.1.0"
)

app.include_router(text.router)

@app.get("/")
def root():
    return {"status": "OpenGuard AI running"}
