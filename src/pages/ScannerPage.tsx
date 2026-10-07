import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Camera, 
  X, 
  Scan, 
  RotateCcw, 
  FileDown, 
  Volume2, 
  VolumeX, 
  ThumbsUp, 
  ThumbsDown, 
  Bookmark, 
  MessageSquare, 
  Check, 
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Layers,
  Leaf
} from 'lucide-react';
import { Language, PlantDiagnosis } from '../types';
import { translations } from '../data/translations';
import { SAMPLE_LEAVES, SampleLeaf } from '../data/sampleImages';
import { api } from '../services/api';
import { generateDiagnosisPdfReport } from '../utils/pdfGenerator';
import { ConfidenceMeter } from '../components/ConfidenceMeter';
import { SeverityVisualizer } from '../components/SeverityVisualizer';
import { HealthScoreRadar } from '../components/HealthScoreRadar';
import { WeatherWidget } from '../components/WeatherWidget';

interface ScannerPageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onOpenChatWithQuery?: (query: string) => void;
  initialDiagnosis?: PlantDiagnosis | null;
}

export const ScannerPage: React.FC<ScannerPageProps> = ({
  language,
  onNavigate,
  onOpenChatWithQuery,
  initialDiagnosis = null,
}) => {
  const t = translations[language].scanner;
  const tRes = translations[language].results;
  const tCommon = translations[language].common;

  // Upload & State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFilename, setSelectedFilename] = useState<string>('leaf.jpg');
  const [selectedSampleKey, setSelectedSampleKey] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Camera State
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Analysis Progress State
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Diagnosis Result State
  const [diagnosis, setDiagnosis] = useState<PlantDiagnosis | null>(initialDiagnosis);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Voice Speech State
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Feedback State
  const [feedbackChoice, setFeedbackChoice] = useState<'yes' | 'no' | null>(null);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialDiagnosis) {
      setDiagnosis(initialDiagnosis);
      setSelectedImage(initialDiagnosis.imageUrl);
    }
  }, [initialDiagnosis]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  // Validate File (Type & Size <= 10MB)
  const handleFileSelected = (file: File) => {
    setFileError(null);
    setSelectedSampleKey(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setFileError('Invalid file format. Please upload a clear JPG, JPEG, PNG, or WEBP image.');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setFileError('Image exceeds 10MB. Please upload a smaller image file.');
      return;
    }

    setSelectedFilename(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedImage(event.target.result as string);
        setDiagnosis(null);
        setIsSaved(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Select preloaded sample leaf
  const handleSelectSample = (sample: SampleLeaf) => {
    setFileError(null);
    stopCamera();
    setSelectedImage(sample.thumbnail);
    setSelectedFilename(`${sample.id}.svg`);
    setSelectedSampleKey(sample.key);
    setDiagnosis(null);
    setIsSaved(false);
  };

  // Browser Camera Handlers
  const startCamera = async () => {
    setFileError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      setFileError('Unable to access camera. Please check your browser permissions or upload an image file.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setSelectedImage(dataUrl);
      setSelectedFilename(`camera_leaf_${Date.now()}.jpg`);
      setSelectedSampleKey(null);
      setDiagnosis(null);
      setIsSaved(false);
    }
    stopCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Remove Selected Image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedSampleKey(null);
    setDiagnosis(null);
    setFileError(null);
    setIsSaved(false);
    stopCamera();
  };

  // Perform Analysis with Multi-Step UI Progress
  const handleAnalyze = async () => {
    if (!selectedImage) {
      setFileError('Please select or upload a plant leaf image first.');
      return;
    }

    setIsAnalyzing(true);
    setDiagnosis(null);
    setCurrentStepIndex(0);
    setFileError(null);

    // Multi-step animated progress ticker
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < t.analyzingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 450);

    try {
      const result = await api.analyzePlantImage(
        selectedImage,
        selectedFilename,
        undefined,
        selectedSampleKey || undefined
      );

      clearInterval(stepInterval);
      setCurrentStepIndex(t.analyzingSteps.length - 1);
      setTimeout(() => {
        setDiagnosis(result);
        setIsAnalyzing(false);
      }, 300);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsAnalyzing(false);
      setFileError('Diagnostic analysis failed. Please try again with a clear leaf photo.');
    }
  };

  // Save Diagnosis
  const handleSaveDiagnosis = async () => {
    if (!diagnosis) return;
    await api.saveDiagnosis(diagnosis);
    setIsSaved(true);
  };

  // Voice Readout using Browser Web Speech Synthesis
  const handleToggleVoice = () => {
    if (!window.speechSynthesis || !diagnosis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let speechText = '';
    if (language === 'ta') {
      speechText = `கண்டறியப்பட்ட தாவரம்: ${diagnosis.plant.name}. நோய்: ${diagnosis.disease.name}. நம்பகத்தன்மை: ${Math.round(
        diagnosis.disease.confidence * 100
      )} சதவீதம். நோயின் தீவிரம்: ${diagnosis.severity.level}. தாவர ஆரோக்கிய குறியீடு: ${
        diagnosis.healthScore
      }. முக்கிய பரிந்துரை: ${diagnosis.recommendations.immediateActions.slice(0, 2).join('. ')}.`;
    } else {
      speechText = `Plant identified: ${diagnosis.plant.name}. Detected disease: ${
        diagnosis.disease.name
      }. AI Confidence: ${Math.round(diagnosis.disease.confidence * 100)} percent. Disease severity: ${
        diagnosis.severity.level
      }. Overall health score: ${diagnosis.healthScore} out of 100. Key immediate action: ${
        diagnosis.recommendations.immediateActions[0] || 'Inspect neighboring crops'
      }.`;
    }

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Submit Feedback
  const handleSubmitFeedback = async () => {
    if (!diagnosis || !feedbackChoice) return;
    await api.submitFeedback({
      diagnosisId: diagnosis.id,
      helpful: feedbackChoice === 'yes',
      comment: feedbackText,
      timestamp: new Date().toISOString(),
    });
    setFeedbackSubmitted(true);
  };

  return (
    <div className="space-y-10 py-6 sm:py-8 max-w-6xl mx-auto">
      
      {/* HEADER SECTION */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* ERROR ALERT */}
      {fileError && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 dark:text-rose-400" />
          <div className="flex-1">{fileError}</div>
          <button onClick={() => setFileError(null)} className="text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* MAIN UPLOAD / SCANNER CONTAINER */}
      {!diagnosis && !isAnalyzing && (
        <div className="space-y-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-3xl border-2 border-dashed transition-all p-6 sm:p-10 text-center glass-card ${
              isDragOver
                ? '!border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/60 shadow-2xl shadow-emerald-500/20'
                : 'hover:border-emerald-500/60'
            }`}
          >
            {/* Camera View Mode */}
            {isCameraActive ? (
              <div className="space-y-4 max-w-md mx-auto">
                <div className="relative rounded-xl overflow-hidden aspect-video bg-black shadow-md">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={capturePhoto}
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{t.capturePhoto}</span>
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200 font-semibold text-xs transition-colors"
                  >
                    {t.stopCamera}
                  </button>
                </div>
              </div>
            ) : selectedImage ? (
              /* Selected Image Preview Mode */
              <div className="space-y-5 max-w-md mx-auto">
                <div className="relative rounded-xl overflow-hidden aspect-square max-h-72 mx-auto bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-sm flex items-center justify-center p-2">
                  <img
                    src={selectedImage}
                    alt="Leaf Preview"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 text-white shadow-md transition-colors"
                    title={t.removeImage}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-stone-600 dark:text-stone-300 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{selectedFilename}</span>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleAnalyze}
                    className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 group cursor-pointer"
                  >
                    <Scan className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>{t.analyzePlant}</span>
                  </button>
                  <button
                    onClick={handleRemoveImage}
                    className="px-4 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 font-semibold text-xs transition-colors"
                  >
                    {t.removeImage}
                  </button>
                </div>
              </div>
            ) : (
              /* Empty Upload Prompt */
              <div className="space-y-4 max-w-lg mx-auto py-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mx-auto">
                  <Upload className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">
                    {t.uploadAreaTitle}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                    {t.dropOrBrowse}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                    {t.formats}
                  </p>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => e.target.files?.[0] && handleFileSelected(e.target.files[0])}
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                />

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{t.browseFiles}</span>
                  </button>

                  <button
                    type="button"
                    onClick={startCamera}
                    className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 font-semibold text-xs border border-stone-200 dark:border-stone-700 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{t.useCamera}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* VERIFIED SAMPLE LEAVES CAROUSEL / PICKER */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.sampleLeavesTitle}</span>
              </h3>
              <span className="text-[11px] text-stone-500 dark:text-emerald-400 font-semibold">1-Click Field Tests</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {SAMPLE_LEAVES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-3 rounded-2xl text-left transition-all glass-card-interactive flex flex-col justify-between group cursor-pointer ${
                    selectedSampleKey === sample.key
                      ? '!border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/20'
                      : ''
                  }`}
                >
                  <div className="aspect-square w-full rounded-lg bg-stone-50/80 dark:bg-stone-950/80 mb-2 overflow-hidden flex items-center justify-center p-1.5 border border-stone-200/60 dark:border-emerald-500/20">
                    <img
                      src={sample.thumbnail}
                      alt={sample.diseaseName}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-stone-900 dark:text-white truncate">
                      {sample.plantName}
                    </div>
                    <div className="text-[10px] text-stone-600 dark:text-stone-300 line-clamp-1">
                      {sample.isHealthy ? 'Healthy Leaf' : sample.diseaseName.split(' ')[0]}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ANIMATED MULTI-STEP ANALYSIS LOADING EXPERIENCE */}
      {isAnalyzing && (
        <div className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-6">
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 animate-spin" />
            <Leaf className="w-8 h-8 text-emerald-600 animate-pulse" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white">
              {t.analyzing}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 mt-1">
              Executing multi-stage neural vision & agronomic pathology inference
            </p>
          </div>

          {/* Stepper Progress Visualizer */}
          <div className="space-y-2.5 text-left pt-2">
            {t.analyzingSteps.map((stepDesc, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-2.5 rounded-xl text-xs transition-colors ${
                    isCurrent
                      ? 'glass-panel-subtle font-semibold text-emerald-950 dark:text-emerald-200 !border-emerald-500/40'
                      : isPast
                      ? 'text-stone-600 dark:text-stone-400'
                      : 'text-stone-400 dark:text-stone-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isPast
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-emerald-600 text-white animate-pulse'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-500'
                    }`}
                  >
                    {isPast ? <Check className="w-3 h-3" /> : idx + 1}
                  </div>
                  <span>{stepDesc}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* COMPREHENSIVE DIAGNOSTIC RESULT PAGE */}
      {diagnosis && !isAnalyzing && (
        <div className="space-y-8 animate-in fade-in duration-500">
          
          {/* Top Result Banner */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {diagnosis.id}
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-xs text-stone-600 dark:text-stone-300">
                  {new Date(diagnosis.timestamp).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                </span>
                <span className="text-stone-400">·</span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200">
                  {diagnosis.mode === 'production' ? 'Production AI' : 'Demo Engine'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
                <span>{diagnosis.plant.name}</span>
                <span className="text-stone-400 dark:text-stone-500 font-light">—</span>
                <span className={diagnosis.disease.isHealthy ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
                  {diagnosis.disease.name}
                </span>
              </h2>

              {diagnosis.disease.scientificName && (
                <p className="text-xs italic text-stone-600 dark:text-stone-300">
                  Pathogen taxon: {diagnosis.disease.scientificName}
                </p>
              )}
            </div>

            {/* Quick Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleToggleVoice}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors ${
                  isSpeaking
                    ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300'
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-600 dark:text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                <span>{isSpeaking ? tRes.stopReading : tRes.readResult}</span>
              </button>

              <button
                onClick={handleSaveDiagnosis}
                disabled={isSaved}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border flex items-center gap-1.5 transition-colors ${
                  isSaved
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700'
                }`}
              >
                <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{isSaved ? tRes.savedSuccess : tRes.saveDiagnosis}</span>
              </button>

              <button
                onClick={() => generateDiagnosisPdfReport(diagnosis)}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-900 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <FileDown className="w-4 h-4" />
                <span>{tRes.downloadReport}</span>
              </button>
            </div>
          </div>

          {/* KEY METRICS GRID: AI Confidence, Severity Visualizer, Health Score Radar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ConfidenceMeter confidence={diagnosis.disease.confidence} language={language} />
            <HealthScoreRadar score={diagnosis.healthScore} breakdown={diagnosis.healthScoreBreakdown} language={language} />
            <SeverityVisualizer
              level={diagnosis.severity.level}
              score={diagnosis.severity.score}
              description={diagnosis.severity.description}
              imageUrl={diagnosis.imageUrl}
              language={language}
            />
          </div>

          {/* SECTION 12: EXPLAINABLE AI RESULT */}
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-stone-900 dark:text-white font-bold text-base">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>{tRes.whyAiDetected}</span>
            </div>

            <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed glass-panel-subtle p-4 rounded-xl">
              {diagnosis.explanation}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-emerald-400 mb-2">
                {tRes.visualSymptoms}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {diagnosis.symptoms.map((symptom, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl glass-panel-subtle text-xs text-stone-800 dark:text-stone-200 flex items-start gap-2.5"
                  >
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{symptom}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 14 & 15: TREATMENT RECOMMENDATIONS & PREVENTION TIPS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Immediate Field Actions */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>{tRes.immediateActions}</span>
              </h3>
              <ul className="space-y-2.5">
                {diagnosis.recommendations.immediateActions.map((action, idx) => (
                  <li key={idx} className="text-xs text-stone-800 dark:text-stone-200 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">{idx + 1}.</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>

              {diagnosis.recommendations.organicTreatment && diagnosis.recommendations.organicTreatment.length > 0 && (
                <div className="pt-3 border-t border-stone-200/60 dark:border-emerald-500/20">
                  <h4 className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
                    Biological & Organic Controls:
                  </h4>
                  <ul className="space-y-1.5">
                    {diagnosis.recommendations.organicTreatment.map((ot, idx) => (
                      <li key={idx} className="text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                        <span>{ot}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Long-Term Cultural Prevention */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{tRes.longTermPrevention}</span>
              </h3>
              <ul className="space-y-2.5">
                {diagnosis.recommendations.longTermPrevention.map((prev, idx) => (
                  <li key={idx} className="text-xs text-stone-800 dark:text-stone-200 flex items-start gap-2.5 leading-relaxed">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">•</span>
                    <span>{prev}</span>
                  </li>
                ))}
              </ul>

              {diagnosis.recommendations.chemicalTreatmentGuidance && (
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-[11px] text-amber-950 dark:text-amber-200">
                  <span className="font-semibold text-amber-900 dark:text-amber-300">Chemical Guidance Note: </span>
                  {diagnosis.recommendations.chemicalTreatmentGuidance.join(' ')}
                </div>
              )}
            </div>
          </div>

          {/* SECTION 16: WEATHER RISK MODULE */}
          <WeatherWidget weather={diagnosis.weatherRisk} language={language} />

          {/* SECTION 46: FARMER FEEDBACK SYSTEM */}
          <div className="glass-card rounded-2xl p-6 text-center max-w-lg mx-auto space-y-3">
            <h4 className="font-bold text-stone-900 dark:text-white text-sm">
              {tRes.feedbackTitle}
            </h4>

            {feedbackSubmitted ? (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
                {tRes.feedbackThankYou}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setFeedbackChoice('yes')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                      feedbackChoice === 'yes'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{tRes.feedbackYes}</span>
                  </button>
                  <button
                    onClick={() => setFeedbackChoice('no')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                      feedbackChoice === 'no'
                        ? 'bg-rose-700 text-white border-rose-700'
                        : 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:text-stone-900 dark:hover:text-white'
                    }`}
                  >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>{tRes.feedbackNo}</span>
                  </button>
                </div>

                {feedbackChoice && (
                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder={tRes.feedbackPlaceholder}
                      className="w-full text-xs p-2.5 rounded-xl glass-input text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500"
                    />
                    <button
                      onClick={handleSubmitFeedback}
                      className="px-4 py-2 rounded-lg bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-colors cursor-pointer"
                    >
                      {tRes.submitFeedback}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* FINAL ACTION TOOLBAR */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={() => {
                setDiagnosis(null);
                setSelectedImage(null);
                setSelectedSampleKey(null);
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-700 font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{tRes.analyzeAnother}</span>
            </button>

            <button
              onClick={() => {
                if (onOpenChatWithQuery) {
                  onOpenChatWithQuery(
                    `I detected ${diagnosis.disease.name} in my ${diagnosis.plant.name}. What organic treatment protocol do you advise?`
                  );
                } else {
                  onNavigate('assistant');
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{tRes.askAssistant}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
