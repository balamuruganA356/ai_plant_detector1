# AgroVision AI – Intelligent Plant Disease Detection & Farming Assistant

AgroVision AI is an advanced, production-grade agricultural health intelligence platform. It enables farmers, agronomists, and home growers to upload photos of diseased or healthy plant leaves, accurately identify the crop species, detect pathological infections, quantify disease severity percentage, inspect explainable visual symptoms, assess microclimatic disease risk, export official PDF diagnosis reports, and consult an AI farming assistant in English and Tamil (தமிழ்).

---

## 🌟 Key Features

1. **Intelligent Leaf Scanner**
   - Drag-and-drop file upload, browser camera snapshot, and sample leaf library.
   - Supports JPG, JPEG, PNG, WEBP with automated client and server-side validation.
   - Animated multi-stage analysis progress indicator.

2. **Multimodal AI Plant & Disease Detection**
   - Identifies plant species (Tomato, Potato, Apple, Corn/Maize, Grape, Rice, Bell Pepper).
   - Distinguishes healthy leaves from pathogens (Early Blight, Late Blight, Apple Scab, Northern Leaf Blight, Black Rot, Rice Blast, Bacterial Spot).
   - Displays AI confidence percentages with clear qualitative classifications (Very High, High, Moderate, Low).

3. **Quantitative Disease Severity & Segmentation**
   - Computes estimated percentage of damaged leaf lamina (0% to 100%).
   - Visual gradient meter with levels: Healthy, Mild, Moderate, Severe, Critical.
   - Interactive lesion heatmap contour overlay highlighting necrotic cores and chlorotic margins.

4. **Explainable AI (XAI)**
   - "Why did AI detect this?" section detailing observable visual markers (concentric rings, chlorotic halos, velvety fungal spots).

5. **Overall Plant Health Score Radar (0–100)**
   - Granular breakdown of severity index, tissue integrity, chlorophyll condition, and symptom intensity.

6. **Actionable Agronomic Guidance**
   - Segregated into Immediate Field Actions, Long-Term Cultural Prevention, Biological/Organic Remedies, and safe chemical guidance.

7. **Microclimate Disease Risk Engine**
   - Synthesizes temperature, humidity, rainfall, and wind speed into Low/Medium/High disease risk alerts with agricultural advice.

8. **AgroVision Assistant Chatbot**
   - Conversational AI powered by Gemini 3.8 Flash server-side (with offline agronomy fallback).
   - Instant suggested queries, chat bubble history, and speech synthesis voice output.

9. **Bilingual Support (English + தமிழ்)**
   - Instant language switching across all diagnostic screens, labels, status tags, and assistant responses.

10. **Voice Speech Synthesis**
    - "🔊 Read Result" button to read aloud plant diagnosis, severity, and key recommendations.

11. **One-Click PDF Diagnostic Export**
    - High-quality downloadable PDF report with complete pathology details, health score gauges, and official safety disclaimer.

12. **Nearby Agricultural Centers Directory**
    - Directory of fertilizer stores, Krishi Vigyan Kendras (KVK), soil testing clinics, and certified nurseries with contact and map navigation.

13. **Crop Telemetry Dashboard & History Archive**
    - Interactive health score progression trends over time, pathogen frequency charts, severity distributions, and search/filter archives.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide React, jsPDF
- **Backend**: Express (Node.js/TypeScript) + Python FastAPI with SQLAlchemy ORM
- **AI / Vision**: Google Gemini 3.8 Flash (`@google/genai`), Keras/TensorFlow, OpenCV, NumPy, Pillow
- **Database**: SQLite / SQLAlchemy ORM (ready for PostgreSQL migration)

---

## 📂 Project Structure

```text
agrovision-ai/
│
├── frontend/ (src/)
│   ├── components/      # Navbar, Footer, ConfidenceMeter, SeverityVisualizer, WeatherWidget, HealthScoreRadar
│   ├── pages/           # HomePage, ScannerPage, DashboardPage, HistoryPage, AssistantPage, AgriSupportPage, AboutPage
│   ├── data/            # diseaseDatabase.ts, translations.ts, sampleImages.ts, agriShops.ts
│   ├── services/        # api.ts (client service with offline fallback)
│   ├── utils/           # pdfGenerator.ts
│   ├── types/           # index.ts (TypeScript schemas)
│   ├── App.tsx          # Main application router and state
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind CSS
│
├── backend/
│   ├── app/
│   │   ├── main.py      # FastAPI application
│   │   ├── models/      # SQLAlchemy db_models.py & Pydantic schemas.py
│   │   ├── ai/          # image_preprocessor.py, plant_classifier.py, disease_classifier.py, severity_analyzer.py, prediction_service.py
│   │   ├── services/    # weather_service.py, chat_service.py
│   │   └── database/    # database.py
│   ├── requirements.txt # Python dependencies
│   └── .env.example     # Backend environment configuration
│
├── ml/
│   ├── models/          # Trained .keras / .onnx models
│   ├── inference/       # predict.py
│   ├── preprocessing/   # preprocess.py
│   └── training/        # train.py
│
├── server.ts            # Node.js/Express full-stack entry point
├── package.json
└── README.md
```

---

## 🚀 Running the Application

### 1. Full-Stack Node.js Application (Default Dev Server)
The repository is pre-configured with a unified full-stack server running Express + Vite on port 3000:

```bash
# Install dependencies
npm install

# Start the full-stack server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

### 2. Standalone Python FastAPI Backend (Optional)
If running the Python FastAPI microservice separately:

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv

# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Launch FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env`:

```env
# GEMINI_API_KEY: Automatically provided in AI Studio or insert your key
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Optional external weather & database configurations:
WEATHER_API_KEY=""
DATABASE_URL="sqlite:///./agrovision.db"
PORT=3000
```

---

## 🔬 AI Inference Modes: Demo vs Production

AgroVision AI clearly identifies the active inference mode in all UI headers and API responses:
- **Production Mode (`"mode": "production"`)**: Active when `GEMINI_API_KEY` or trained Keras model files are present. Delivers live computer vision analysis.
- **Demo Mode (`"mode": "demo"`)**: Active when running offline or without an API key. Uses a high-fidelity agronomic pathology model with field-accurate symptoms and treatments.

---

## ⚠️ Agricultural & AI Safety Disclaimer

AgroVision AI is an educational decision-support tool. Predictions are probabilistic and may vary based on photo resolution, illumination, or rare pathogens. For critical crop management and chemical treatments, always consult a certified agricultural extension officer and strictly adhere to product label regulations and safety intervals.
