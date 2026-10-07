import React from 'react';
import { CloudRain, Droplets, Thermometer, Wind, AlertTriangle, ShieldCheck } from 'lucide-react';
import { translations } from '../data/translations';
import { Language, RiskLevel } from '../types';

interface WeatherWidgetProps {
  weather: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    riskLevel: RiskLevel;
    riskFactors: string[];
    advice?: string;
  };
  language: Language;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, language }) => {
  const t = translations[language].results;

  const getRiskBadge = (lvl: RiskLevel) => {
    switch (lvl) {
      case 'High':
        return 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800';
      case 'Medium':
        return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      case 'Low':
      default:
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';
    }
  };

  return (
    <div className="glass-card-interactive rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2 text-sm">
          <CloudRain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t.weatherRiskAssessment}</span>
        </h3>
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-md border flex items-center gap-1 ${getRiskBadge(weather.riskLevel)}`}>
          {weather.riskLevel === 'High' ? (
            <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
          ) : (
            <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          )}
          <span>Risk Level: {weather.riskLevel}</span>
        </span>
      </div>

      {/* 4 Weather Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="p-3 glass-panel-subtle rounded-xl flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">{t.temperature}</div>
            <div className="text-sm font-bold text-stone-800 dark:text-stone-100">{weather.temperature}°C</div>
          </div>
        </div>

        <div className="p-3 glass-panel-subtle rounded-xl flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">{t.humidity}</div>
            <div className="text-sm font-bold text-stone-800 dark:text-stone-100">{weather.humidity}%</div>
          </div>
        </div>

        <div className="p-3 glass-panel-subtle rounded-xl flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
            <CloudRain className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">{t.rainfall}</div>
            <div className="text-sm font-bold text-stone-800 dark:text-stone-100">{weather.rainfall} mm</div>
          </div>
        </div>

        <div className="p-3 glass-panel-subtle rounded-xl flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-teal-100 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">{t.windSpeed}</div>
            <div className="text-sm font-bold text-stone-800 dark:text-stone-100">{weather.windSpeed} km/h</div>
          </div>
        </div>
      </div>

      {/* Microclimatic Risk Drivers */}
      {weather.riskFactors && weather.riskFactors.length > 0 && (
        <div className="mb-3">
          <div className="text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5 flex items-center gap-1.5">
            <span>{t.riskFactorList}:</span>
          </div>
          <ul className="space-y-1">
            {weather.riskFactors.map((factor, idx) => (
              <li key={idx} className="text-xs text-stone-600 dark:text-stone-400 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {weather.advice && (
        <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
          <span className="font-semibold text-stone-900 dark:text-stone-100">Agronomic Advisory: </span>
          {weather.advice}
        </div>
      )}
    </div>
  );
};
