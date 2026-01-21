from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import text

app = FastAPI(
    title="OpenGuard AI",
    description="Open-source multimodal content moderation framework",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(text.router)

@app.get("/")
def root():
    return {"status": "OpenGuard AI running"}
