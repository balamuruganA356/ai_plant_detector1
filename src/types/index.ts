export type Language = 'en' | 'ta';

export type SeverityLevel = 'Healthy' | 'Mild' | 'Moderate' | 'Severe' | 'Critical';
export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface PlantDiagnosis {
  id: string;
  timestamp: string;
  plant: {
    name: string;
    scientificName?: string;
    confidence: number;
  };
  disease: {
    name: string;
    scientificName?: string;
    confidence: number;
    isHealthy: boolean;
  };
  severity: {
    level: SeverityLevel;
    score: number; // 0 - 100 percentage of visible leaf area affected
    description: string;
  };
  healthScore: number; // 0 - 100 overall plant vigor score
  healthScoreBreakdown: {
    severityScore: number;
    leafDamageScore: number;
    colorVigorScore: number;
    symptomIntensityScore: number;
    confidenceFactor: number;
  };
  symptoms: string[];
  explanation: string;
  recommendations: {
    immediateActions: string[];
    longTermPrevention: string[];
    organicTreatment?: string[];
    chemicalTreatmentGuidance?: string[];
  };
  preventionTips: string[];
  weatherRisk: {
    temperature: number; // in °C
    humidity: number; // in %
    rainfall: number; // in mm
    windSpeed: number; // in km/h
    riskLevel: RiskLevel;
    riskFactors: string[];
    advice: string;
  };
  imageUrl: string;
  notes?: string;
  mode: 'production' | 'demo';
}

export interface WeatherData {
  city: string;
  region: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  diseaseRisk: RiskLevel;
  riskSummary: string;
  favorableConditionsFor: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface AgriShop {
  id: string;
  name: string;
  tamilName?: string;
  district: string;
  tamilDistrict?: string;
  type: 'Fertilizer & Pesticide' | 'Government Krishi Kendra / Agri Office' | 'Plant Nursery' | 'Soil Testing Center';
  address: string;
  tamilAddress?: string;
  phone: string;
  distanceKm: number;
  rating: number;
  openHours: string;
  services: string[];
}

export interface FeedbackData {
  id?: string;
  diagnosisId: string;
  helpful: boolean;
  comment?: string;
  userRating?: number;
  timestamp: string;
}

export interface CropInfo {
  id: string;
  name: string;
  tamilName: string;
  icon: string;
  commonDiseases: string[];
  growingSeason: string;
  optimalTemperature: string;
  idealHumidity: string;
}
