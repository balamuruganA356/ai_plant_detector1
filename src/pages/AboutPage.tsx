import React from 'react';
import { 
  ShieldAlert, 
  Cpu, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  FileCode,
  Sprout
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SUPPORTED_CROPS } from '../data/diseaseDatabase';

interface AboutPageProps {
  language: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ language }) => {
  const t = translations[language].about;

  return (
    <div className="py-6 sm:py-8 max-w-5xl mx-auto space-y-12">
      
      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* PROBLEM & SOLUTION SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Problem */}
        <div className="glass-card-interactive rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-900/60">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-stone-900 dark:text-white">
            {t.theProblem}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {t.problemDescription}
          </p>
        </div>

        {/* Solution */}
        <div className="glass-card-interactive rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
            <Sprout className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-stone-900 dark:text-white">
            {t.theSolution}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {t.solutionDescription}
          </p>
        </div>
      </div>

      {/* TECHNOLOGY ARCHITECTURE OVERVIEW */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-lg font-bold text-stone-900 dark:text-white tracking-tight">
            System & AI Architecture Pipeline
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl glass-panel-subtle space-y-2">
            <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Frontend Layer</span>
            </div>
            <ul className="text-stone-700 dark:text-stone-200 space-y-1">
              <li>• React 19 SPA + Vite</li>
              <li>• Tailwind CSS Design System</li>
              <li>• Lucide Icons</li>
              <li>• Web Speech Synthesis (Voice)</li>
              <li>• Client-side jsPDF Reporting</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl glass-panel-subtle space-y-2">
            <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>Inference & Backend</span>
            </div>
            <ul className="text-stone-700 dark:text-stone-200 space-y-1">
              <li>• Node.js / Express Server</li>
              <li>• Python FastAPI + SQLAlchemy</li>
              <li>• Image Preprocessing Pipeline</li>
              <li>• Microclimate Weather Risk Engine</li>
              <li>• Pydantic & REST Schemas</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl glass-panel-subtle space-y-2">
            <div className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>AI Intelligence Models</span>
            </div>
            <ul className="text-stone-700 dark:text-stone-200 space-y-1">
              <li>• Google Gemini 3.8 Flash Vision</li>
              <li>• Modular Keras/TensorFlow Engine</li>
              <li>• Explainable Visual Symptom Parser</li>
              <li>• Surface Lesion Severity Analyzer</li>
              <li>• Agronomic Knowledge Base</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SUPPORTED CROPS CATALOG */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-stone-900 dark:text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>Diagnostic Crop Catalog & Agronomic Profiles</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUPPORTED_CROPS.map((crop) => (
            <div
              key={crop.id}
              className="p-4 glass-card-interactive rounded-2xl space-y-2 text-xs"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-stone-900 dark:text-white">
                <span className="text-xl">{crop.icon}</span>
                <span>{crop.name} ({crop.tamilName})</span>
              </div>
              <div className="text-stone-700 dark:text-stone-300 space-y-0.5">
                <div><span className="font-semibold text-stone-800 dark:text-emerald-400">Season:</span> {crop.growingSeason}</div>
                <div><span className="font-semibold text-stone-800 dark:text-emerald-400">Ideal Temp:</span> {crop.optimalTemperature}</div>
                <div><span className="font-semibold text-stone-800 dark:text-emerald-400">Humidity:</span> {crop.idealHumidity}</div>
              </div>
              <div className="pt-1.5 border-t border-stone-100 dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Key Diseases: </span>
                {crop.commonDiseases.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CRITICAL AI SAFETY & AGRONOMIC DISCLAIMER (Section 35 & 48) */}
      <div className="p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 text-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
          <span>{t.safetyDisclaimerTitle}</span>
        </div>
        <p className="text-xs text-amber-950 dark:text-amber-200/90 leading-relaxed">
          {t.safetyDisclaimer}
        </p>
        <div className="pt-2 text-[11px] text-amber-900 dark:text-amber-300 space-y-1">
          <div>✓ Predictions are probabilistic decision-support estimates, not certified agricultural guarantees.</div>
          <div>✓ Always verify crop symptom diagnosis with physical examination and certified extension advisors.</div>
          <div>✓ Strictly observe product container label instructions, safety buffers, and pre-harvest intervals for all treatments.</div>
        </div>
      </div>
    </div>
  );
};
