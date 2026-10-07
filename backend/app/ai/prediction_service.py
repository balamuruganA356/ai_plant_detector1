import uuid
import datetime
from typing import Dict, Any

from backend.app.ai.image_preprocessor import ImagePreprocessor
from backend.app.ai.plant_classifier import PlantClassifier
from backend.app.ai.disease_classifier import DiseaseClassifier
from backend.app.ai.severity_analyzer import SeverityAnalyzer

class PredictionService:
    def __init__(self):
        self.preprocessor = ImagePreprocessor()
        self.plant_classifier = PlantClassifier()
        self.disease_classifier = DiseaseClassifier()
        self.severity_analyzer = SeverityAnalyzer()

    def process_image(self, image_bytes: bytes, filename: str = "leaf.jpg") -> Dict[str, Any]:
        # 1. Image preprocessing
        processed_arr = self.preprocessor.preprocess_bytes(image_bytes)
        damage_ratio = self.preprocessor.extract_green_channel_mask(image_bytes)

        # 2. Plant Identification
        plant_name, plant_conf, plant_sci = self.plant_classifier.predict(processed_arr, filename)

        # 3. Disease Detection
        disease_name, disease_conf, is_healthy, disease_sci, symptoms, explanation = self.disease_classifier.predict(plant_name, filename)

        # 4. Severity Analysis
        severity_level, severity_score, severity_desc, health_score = self.severity_analyzer.analyze(is_healthy, disease_name, damage_ratio)

        # 5. Recommendations
        immediate_actions = [
            "Remove heavily infected leaves and discard safely away from crops.",
            "Improve airflow around the plant with trellising.",
            "Avoid overhead watering and switch to drip irrigation.",
            "Monitor nearby plants for similar foliar symptoms."
        ] if not is_healthy else [
            "Continue standard watering routine; irrigate deeply when top soil is dry.",
            "Maintain bi-weekly routine leaf inspections."
        ]

        long_term_prevention = [
            "Maintain proper spacing between plants.",
            "Practice regular crop rotation avoiding same plant families.",
            "Apply clean organic mulch to prevent soil-splash inoculation.",
            "Select certified disease-resistant seeds."
        ]

        # 6. Mode verification
        is_production = self.plant_classifier.has_production_model and self.disease_classifier.has_production_model
        mode = "production" if is_production else "demo"

        return {
            "id": f"AGRO-{uuid.uuid4().hex[:8].upper()}",
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "plant": {
                "name": plant_name,
                "confidence": plant_conf,
                "scientificName": plant_sci
            },
            "disease": {
                "name": disease_name,
                "confidence": disease_conf,
                "isHealthy": is_healthy,
                "scientificName": disease_sci
            },
            "severity": {
                "level": severity_level,
                "score": severity_score,
                "description": severity_desc
            },
            "healthScore": health_score,
            "symptoms": symptoms,
            "explanation": explanation,
            "recommendations": {
                "immediateActions": immediate_actions,
                "longTermPrevention": long_term_prevention,
                "organicTreatment": ["Cold-pressed Neem oil (0.5%) foliar spray every 7 days"],
                "chemicalTreatmentGuidance": ["Consult local agricultural extension office for approved fungicides"]
            },
            "preventionTips": [
                "Maintain proper spacing between plants.",
                "Avoid excessive moisture on foliage.",
                "Keep foliage dry when possible.",
                "Regularly inspect leaves during warm, humid spells."
            ],
            "weatherRisk": {
                "temperature": 29.0,
                "humidity": 78.0,
                "rainfall": 12.0,
                "windSpeed": 10.0,
                "riskLevel": "Low" if is_healthy else "High",
                "riskFactors": ["High humidity", "Recent rainfall", "Existing leaf infection"],
                "advice": "High humidity and recent rainfall create favorable conditions for fungal disease development."
            },
            "imageUrl": "",
            "mode": mode
        }
