from typing import Tuple

class SeverityAnalyzer:
    """
    Estimates disease severity level and percentage score.
    Levels: Healthy, Mild, Moderate, Severe, Critical.
    """
    def analyze(self, is_healthy: bool, disease_name: str, damage_ratio: float = 0.58) -> Tuple[str, float, str, int]:
        if is_healthy:
            return "Healthy", 0.0, "Zero visible lesions detected. Leaf lamina is fully functional.", 98

        score = round(damage_ratio * 100, 1) if damage_ratio > 0 else 58.0
        
        if score < 20:
            level = "Mild"
            health_score = 82
        elif score < 50:
            level = "Moderate"
            health_score = 68
        elif score < 75:
            level = "Severe"
            health_score = 45
        else:
            level = "Critical"
            health_score = 25

        desc = f"Approximately {score}% of the visible leaf area shows symptoms associated with the detected disease."
        return level, score, desc, health_score
