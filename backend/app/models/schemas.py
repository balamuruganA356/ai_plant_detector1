from typing import List, Optional
from pydantic import BaseModel, Field

class PlantIdentification(BaseModel):
    name: str
    confidence: float
    scientificName: Optional[str] = None

class DiseaseDetection(BaseModel):
    name: str
    confidence: float
    isHealthy: bool = False
    scientificName: Optional[str] = None

class SeverityAnalysis(BaseModel):
    level: str
    score: float
    description: str

class Recommendations(BaseModel):
    immediateActions: List[str]
    longTermPrevention: List[str]
    organicTreatment: Optional[List[str]] = None
    chemicalTreatmentGuidance: Optional[List[str]] = None

class WeatherRisk(BaseModel):
    temperature: float
    humidity: float
    rainfall: float
    windSpeed: float
    riskLevel: str
    riskFactors: List[str]
    advice: Optional[str] = None

class AnalyzeResponse(BaseModel):
    id: str
    timestamp: str
    plant: PlantIdentification
    disease: DiseaseDetection
    severity: SeverityAnalysis
    healthScore: int
    healthScoreBreakdown: Optional[dict] = None
    symptoms: List[str]
    explanation: str
    recommendations: Recommendations
    preventionTips: List[str]
    weatherRisk: WeatherRisk
    imageUrl: str
    mode: str = Field(..., description="'demo' or 'production'")

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = None
    language: Optional[str] = "en"

class ChatResponse(BaseModel):
    response: str
    suggestions: Optional[List[str]] = None

class FeedbackRequest(BaseModel):
    diagnosisId: str
    helpful: bool
    comment: Optional[str] = None

class WeatherResponse(BaseModel):
    city: str
    region: str
    temperature: float
    humidity: float
    rainfall: float
    windSpeed: float
    condition: str
    diseaseRisk: str
    riskSummary: str
    favorableConditionsFor: List[str]
