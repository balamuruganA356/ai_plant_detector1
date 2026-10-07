import os
from typing import Dict, Any, List

class ChatService:
    def __init__(self):
        self.api_key = os.getenv("LLM_API_KEY")

    def answer_query(self, message: str, language: str = "en", history: List[dict] = None) -> Dict[str, Any]:
        q = message.lower()
        if language == "ta":
            if "ஆரம்ப கருகல்" in q or "தக்காளி" in q:
                reply = (
                    "தக்காளியில் ஆரம்ப கருகல் (Early Blight) நோயைக் கட்டுப்படுத்தும் வழிகள்:\n"
                    "1. பாதிக்கப்பட்ட கீழ் இலைகளை அகற்றி அழிக்கவும்.\n"
                    "2. வேர் பகுதியில் மட்டும் சொட்டு நீர் பாசனம் செய்யவும்.\n"
                    "3. வேப்ப எண்ணெய் (5 மி.லி/லிட்டர்) அல்லது சூடோமோனாஸ் தெளிக்கவும்.\n"
                    "4. தீவிர பாதிப்புக்கு வேளாண் அலுவலரின் ஆலோசனைப்படி பூஞ்சாணக்கொல்லி தெளிக்கவும்."
                )
            else:
                reply = "வணக்கம்! நான் உங்கள் அக்ரோவிஷன் AI விவசாய உதவியாளர். பயிர் பாதுகாப்பு மற்றும் உரம் குறித்த சந்தேகங்களை கேளுங்கள்."
            suggestions = ["தக்காளியில் ஆரம்ப கருகல்", "சாம்பல் நோய் தடுப்பு", "இயற்கை உரம்"]
        else:
            if "early blight" in q or "tomato" in q:
                reply = (
                    "**Early Blight Management Strategy:**\n"
                    "1. Strip and safely dispose of lower infected leaves exhibiting target-board lesions.\n"
                    "2. Transition immediately to drip irrigation; wet foliage promotes fungal sporulation.\n"
                    "3. Apply Bacillus subtilis or cold-pressed Neem oil (0.5%) every 7-10 days.\n"
                    "4. If severe, apply registered protectants (Chlorothalonil/Mancozeb) adhering strictly to label rates."
                )
            elif "water" in q or "irrigation" in q:
                reply = (
                    "**Irrigation Best Practices:**\n"
                    "- Water early in the morning so accidental splashes dry quickly.\n"
                    "- Water at root base; avoid overhead sprinklers during high humidity."
                )
            else:
                reply = "Hello! I am your AgroVision AI Assistant. How can I assist you with your crops, disease diagnostics, or organic soil remedies today?"
            suggestions = ["How to treat Early Blight in tomatoes?", "Watering schedule during high humidity", "Best organic fungicides"]

        return {
            "response": reply,
            "suggestions": suggestions
        }
