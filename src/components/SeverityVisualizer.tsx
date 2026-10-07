import React, { useState } from 'react';
import { SeverityLevel, Language } from '../types';
import { Layers, Info } from 'lucide-react';
import { translations } from '../data/translations';

interface SeverityVisualizerProps {
  level: SeverityLevel;
  score: number;
  description: string;
  imageUrl: string;
  language: Language;
}

export const SeverityVisualizer: React.FC<SeverityVisualizerProps> = ({
  level,
  score,
  description,
  imageUrl,
  language,
}) => {
  const [showSegmentation, setShowSegmentation] = useState(false);
  const t = translations[language].results;

  const getLevelColor = (lvl: SeverityLevel) => {
    switch (lvl) {
      case 'Healthy':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
      case 'Mild':
        return 'text-lime-700 bg-lime-50 border-lime-200 dark:bg-lime-950/40 dark:text-lime-300 dark:border-lime-800';
      case 'Moderate':
        return 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      case 'Severe':
        return 'text-orange-700 bg-orange-50 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800';
      case 'Critical':
        return 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
      default:
        return 'text-stone-700 bg-stone-50 border-stone-200';
    }
  };

  return (
    <div className="glass-card-interactive rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-stone-900 dark:text-white flex items-center gap-2 text-sm">
          <span>{t.severity}</span>
        </h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-md border ${getLevelColor(
            level
          )}`}
        >
          {level} – {score}%
        </span>
      </div>

      {/* Visual Severity Gradient Track */}
      <div className="my-4">
        <div className="relative h-3 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-600 overflow-hidden shadow-inner">
          <div
            className="absolute top-0 bottom-0 w-1 bg-white ring-2 ring-stone-900 rounded-sm shadow-md transition-all duration-700"
            style={{ left: `calc(${Math.min(Math.max(score, 3), 97)}% - 2px)` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-semibold text-stone-600 dark:text-stone-300 mt-1.5">
          <span>Healthy (0%)</span>
          <span>Mild</span>
          <span>Moderate</span>
          <span>Severe</span>
          <span>Critical (100%)</span>
        </div>
      </div>

      <p className="text-xs text-stone-700 dark:text-stone-200 leading-relaxed mb-4">
        {description}
      </p>

      {/* Leaf Image & Segmentation Heatmap Toggle */}
      <div className="border border-stone-200/80 dark:border-emerald-500/20 rounded-xl overflow-hidden bg-stone-50/80 dark:bg-stone-950/80">
        <div className="p-3 bg-stone-100/70 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-800 dark:text-stone-100 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
            <span>Leaf Lamina Segmentation</span>
          </span>
          <button
            type="button"
            onClick={() => setShowSegmentation(!showSegmentation)}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              showSegmentation
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-300 dark:border-stone-700 hover:bg-stone-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{showSegmentation ? 'Hide Lesion Heatmap' : t.segmentationToggle}</span>
          </button>
        </div>

        <div className="relative aspect-square max-h-64 mx-auto flex items-center justify-center p-2">
          <img
            src={imageUrl}
            alt="Leaf Sample"
            className="max-h-full max-w-full object-contain rounded-md"
          />

          {/* Simulated OpenCV / AI Lesion Contour Heatmap Overlay */}
          {showSegmentation && level !== 'Healthy' && (
            <div className="absolute inset-2 pointer-events-none rounded-md overflow-hidden flex items-center justify-center">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full max-h-60 opacity-80 mix-blend-multiply dark:mix-blend-screen animate-pulse"
              >
                {/* Red/Yellow highlighted lesion zones */}
                <circle cx="150" cy="240" r="35" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="6 3" />
                <circle cx="150" cy="240" r="28" fill="#ef4444" opacity="0.35" />
                
                <circle cx="250" cy="180" r="40" fill="none" stroke="#f97316" strokeWidth="4" strokeDasharray="6 3" />
                <circle cx="250" cy="180" r="32" fill="#f97316" opacity="0.35" />

                <circle cx="180" cy="130" r="16" fill="none" stroke="#eab308" strokeWidth="3" />
                <circle cx="180" cy="130" r="12" fill="#eab308" opacity="0.3" />

                <circle cx="230" cy="265" r="18" fill="none" stroke="#eab308" strokeWidth="3" />
                <circle cx="230" cy="265" r="14" fill="#eab308" opacity="0.3" />
              </svg>
            </div>
          )}

          {showSegmentation && level === 'Healthy' && (
            <div className="absolute inset-2 pointer-events-none rounded-md flex items-center justify-center bg-emerald-500/10">
              <div className="px-3 py-1.5 bg-emerald-900/90 text-white text-xs font-semibold rounded-md shadow-md">
                100% Healthy Tissue · 0 Lesion Clusters Detected
              </div>
            </div>
          )}
        </div>

        {showSegmentation && (
          <div className="p-2.5 bg-stone-100/90 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Necrotic Core
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block ml-2" /> Chlorotic Halo
            </span>
            <span className="italic">Simulated AI Mask (Demo)</span>
          </div>
        )}
      </div>
    </div>
  );
};
