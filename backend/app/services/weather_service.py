import os
from typing import Dict, Any

class WeatherService:
    def __init__(self):
        self.api_key = os.getenv("WEATHER_API_KEY")

    def get_weather_risk(self, city: str = "Coimbatore Agricultural Zone") -> Dict[str, Any]:
        temp = 28.5
        humidity = 82.0
        rainfall = 14.2
        wind = 11.5

        risk_level = "High" if (humidity > 75 and rainfall > 10) else "Medium"

        return {
            "city": city,
            "region": "Agricultural District",
            "temperature": temp,
            "humidity": humidity,
            "rainfall": rainfall,
            "windSpeed": wind,
            "condition": "Humid with morning overcast",
            "diseaseRisk": risk_level,
            "riskSummary": f"{risk_level} Disease Risk: Warm temperatures combined with {humidity}% humidity accelerate foliar pathogen proliferation.",
            "favorableConditionsFor": ["Tomato Early Blight", "Rice Blast", "Potato Late Blight"]
        }
