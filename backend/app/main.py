import os
from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional

from backend.app.models.schemas import (
    AnalyzeResponse,
    ChatRequest,
    ChatResponse,
    FeedbackRequest,
    WeatherResponse
)
from backend.app.ai.prediction_service import PredictionService
from backend.app.services.weather_service import WeatherService
from backend.app.services.chat_service import ChatService
from backend.app.database.database import Base, engine, get_db

# Initialize database schema
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AgroVision AI API",
    description="Intelligent Plant Disease Detection & Farming Assistant Backend",
    version="1.0.0"
)

# CORS configuration
origins = os.getenv("CORS_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

prediction_service = PredictionService()
weather_service = WeatherService()
chat_service = ChatService()

# In-memory history cache
history_cache: List[dict] = []

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AgroVision AI FastAPI Backend",
        "mode": "demo" if not prediction_service.plant_classifier.has_production_model else "production"
    }

@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_plant_leaf(
    file: UploadFile = File(...),
    crop_hint: Optional[str] = Form(None)
):
    # Validate format
    allowed_types = ["image/jpeg", "image/png", "image/webp", "image/jpg"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid image format. Supported: JPG, PNG, WEBP.")

    image_bytes = await file.read()
    if len(image_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Image exceeds 10MB limit.")

    result = prediction_service.process_image(image_bytes, file.filename or "leaf.jpg")
    history_cache.insert(0, result)
    return result

@app.post("/api/chat", response_model=ChatResponse)
def chat_with_assistant(req: ChatRequest):
    return chat_service.answer_query(req.message, req.language or "en", req.history)

@app.get("/api/weather", response_model=WeatherResponse)
def get_weather(city: Optional[str] = None):
    return weather_service.get_weather_risk(city or "Coimbatore Agricultural Zone")

@app.get("/api/history")
def get_history():
    return history_cache

@app.get("/api/history/{item_id}")
def get_history_item(item_id: str):
    for item in history_cache:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Diagnosis not found")

@app.delete("/api/history/{item_id}")
def delete_history_item(item_id: str):
    global history_cache
    history_cache = [item for item in history_cache if item["id"] != item_id]
    return {"success": True}

@app.post("/api/feedback")
def submit_feedback(fb: FeedbackRequest):
    return {"success": True, "message": "Feedback recorded."}

@app.get("/api/crops")
def get_supported_crops():
    return [
        {"id": "tomato", "name": "Tomato", "tamilName": "தக்காளி", "icon": "🍅"},
        {"id": "potato", "name": "Potato", "tamilName": "உருளைக்கிழங்கு", "icon": "🥔"},
        {"id": "apple", "name": "Apple", "tamilName": "ஆப்பிள்", "icon": "🍎"},
        {"id": "corn", "name": "Corn (Maize)", "tamilName": "மக்காச்சோளம்", "icon": "🌽"},
        {"id": "grape", "name": "Grape", "tamilName": "திராட்சை", "icon": "🍇"},
        {"id": "rice", "name": "Rice", "tamilName": "நெல்", "icon": "🌾"},
        {"id": "pepper", "name": "Bell Pepper", "tamilName": "குடைமிளகாய்", "icon": "🫑"},
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
