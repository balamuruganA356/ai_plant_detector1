import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface ConfidenceMeterProps {
  confidence: number; // 0 to 1
  language: Language;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({ confidence, language }) => {
  const percentage = Math.round(confidence * 100);
  const t = translations[language].results;

  let classification = t.confidenceClassification.moderate;
  let colorClass = 'text-amber-600 dark:text-amber-400 stroke-amber-500';
  let badgeColor = 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800';

  if (percentage >= 90) {
    classification = t.confidenceClassification.veryHigh;
    colorClass = 'text-emerald-600 dark:text-emerald-400 stroke-emerald-500';
    badgeColor = 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
  } else if (percentage >= 75) {
    classification = t.confidenceClassification.high;
    colorClass = 'text-teal-600 dark:text-teal-400 stroke-teal-500';
    badgeColor = 'bg-teal-50 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800';
  } else if (percentage < 50) {
    classification = t.confidenceClassification.low;
    colorClass = 'text-rose-600 dark:text-rose-400 stroke-rose-500';
    badgeColor = 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800';
  }

  // SVG circular calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-5 glass-card-interactive rounded-2xl">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="stroke-stone-200 dark:stroke-stone-800"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            className={`${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white">
            {percentage}%
          </span>
          <span className="text-[10px] uppercase font-bold text-stone-500 dark:text-emerald-400/90">
            {t.aiConfidence}
          </span>
        </div>
      </div>

      <div className={`mt-3 px-3 py-1 text-xs font-medium rounded-md border text-center ${badgeColor}`}>
        <div className="flex items-center gap-1.5 justify-center">
          {percentage >= 75 ? (
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          ) : (
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          )}
          <span>{classification}</span>
        </div>
      </div>
    </div>
  );
};
