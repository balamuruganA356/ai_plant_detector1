import React from 'react';
import { HeartPulse, CheckCircle2 } from 'lucide-react';
import { translations } from '../data/translations';
import { Language } from '../types';

interface HealthScoreRadarProps {
  score: number;
  breakdown: {
    severityScore: number;
    leafDamageScore: number;
    colorVigorScore: number;
    symptomIntensityScore: number;
    confidenceFactor: number;
  };
  language: Language;
}

export const HealthScoreRadar: React.FC<HealthScoreRadarProps> = ({ score, breakdown, language }) => {
  const t = translations[language].results;

  const getScoreColor = (val: number) => {
    if (val >= 80) return 'text-emerald-600 dark:text-emerald-400';
    if (val >= 60) return 'text-lime-600 dark:text-lime-400';
    if (val >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  const getBarColor = (val: number) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 60) return 'bg-lime-500';
    if (val >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const metrics = [
    { label: 'Severity Index', value: breakdown.severityScore, description: 'Pathogen area absence factor' },
    { label: 'Tissue Integrity', value: breakdown.leafDamageScore, description: 'Epidermal cell vigor' },
    { label: 'Chlorophyll Health', value: breakdown.colorVigorScore, description: 'Photosynthetic green hue balance' },
    { label: 'Vascular Condition', value: breakdown.symptomIntensityScore, description: 'Absence of petiole necrosis' },
  ];

  return (
    <div className="glass-card-interactive rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-sm">
          <HeartPulse className="w-4 h-4 text-emerald-600" />
          <span>{t.healthScore}</span>
        </h3>
        <div className="flex items-baseline gap-1">
          <span className={`text-3xl font-extrabold tracking-tight ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-xs text-stone-400 font-medium">/ 100</span>
        </div>
      </div>

      {/* Progress Bar for Overall Health */}
      <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2.5 mb-5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 ${getBarColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Detailed Breakdown Metrics */}
      <div className="space-y-3 pt-1 border-t border-stone-100 dark:border-stone-800/80">
        {metrics.map((m, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-stone-700 dark:text-stone-300">
                {m.label}
              </span>
              <span className={`font-semibold ${getScoreColor(m.value)}`}>
                {m.value}%
              </span>
            </div>
            <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-1.5 rounded-full transition-all duration-700 ${getBarColor(m.value)}`}
                style={{ width: `${m.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-2.5 rounded-lg bg-stone-50 dark:bg-stone-950/70 border border-stone-200/70 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400 flex items-start gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
        <span>
          Scores ≥ 75 indicate favorable recovery probability with standard cultural interventions.
        </span>
      </div>
    </div>
  );
};
