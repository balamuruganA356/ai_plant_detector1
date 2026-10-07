import React, { useEffect, useState } from 'react';
import { 
  Scan, 
  HeartPulse, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  CloudRain, 
  ChevronRight, 
  Clock, 
  BarChart3,
  Calendar
} from 'lucide-react';
import { Language, PlantDiagnosis, WeatherData } from '../types';
import { translations } from '../data/translations';
import { api } from '../services/api';

interface DashboardPageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onSelectDiagnosis: (diag: PlantDiagnosis) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  language,
  onNavigate,
  onSelectDiagnosis,
}) => {
  const t = translations[language].dashboard;

  const [diagnoses, setDiagnoses] = useState<PlantDiagnosis[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const historyData = await api.getHistory();
        setDiagnoses(historyData);
        const weatherData = await api.getWeatherRisk();
        setWeather(weatherData);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalScans = diagnoses.length;
  const healthyCount = diagnoses.filter((d) => d.disease.isHealthy).length;
  const diseasedCount = totalScans - healthyCount;
  const highRiskCount = diagnoses.filter(
    (d) => d.severity.level === 'Severe' || d.severity.level === 'Critical'
  ).length;

  // Disease frequency
  const diseaseCounts: Record<string, number> = {};
  diagnoses.forEach((d) => {
    diseaseCounts[d.disease.name] = (diseaseCounts[d.disease.name] || 0) + 1;
  });
  const diseaseList = Object.entries(diseaseCounts).sort((a, b) => b[1] - a[1]);

  // Health Trend progression (last 8 scans)
  const trendSamples = [...diagnoses].reverse().slice(-8);

  return (
    <div className="space-y-8 py-6 sm:py-8 max-w-7xl mx-auto">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1">
            {t.subtitle}
          </p>
        </div>

        <button
          onClick={() => onNavigate('scanner')}
          className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Scan className="w-4 h-4" />
          <span>{t.quickScan}</span>
        </button>
      </div>

      {/* TOP METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Scans */}
        <div className="p-5 glass-card-interactive rounded-2xl">
          <div className="flex items-center justify-between text-stone-600 dark:text-stone-300 mb-2">
            <span className="text-xs font-semibold">{t.totalScans}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center">
              <Scan className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-stone-900 dark:text-white">
            {totalScans}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Lifetime leaf telemetry</div>
        </div>

        {/* Healthy Plants */}
        <div className="p-5 glass-card-interactive rounded-2xl">
          <div className="flex items-center justify-between text-stone-600 dark:text-stone-300 mb-2">
            <span className="text-xs font-semibold">{t.healthyPlants}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {healthyCount}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
            {totalScans > 0 ? `${Math.round((healthyCount / totalScans) * 100)}% healthy ratio` : 'Awaiting scans'}
          </div>
        </div>

        {/* Diseases Detected */}
        <div className="p-5 glass-card-interactive rounded-2xl">
          <div className="flex items-center justify-between text-stone-600 dark:text-stone-300 mb-2">
            <span className="text-xs font-semibold">{t.diseasesDetected}</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {diseasedCount}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Requiring cultural intervention</div>
        </div>

        {/* High Risk Plants */}
        <div className="p-5 glass-card-interactive rounded-2xl">
          <div className="flex items-center justify-between text-stone-600 dark:text-stone-300 mb-2">
            <span className="text-xs font-semibold">{t.highRiskPlants}</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            {highRiskCount}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">Severe or Critical lesions</div>
        </div>
      </div>

      {/* CHARTS & HEALTH TREND SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Plant Health Score Progression Trend */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-stone-900 dark:text-white text-sm">
                {t.healthTrend}
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Avg Score: {totalScans > 0 ? Math.round(diagnoses.reduce((acc, d) => acc + d.healthScore, 0) / totalScans) : 0}/100
            </span>
          </div>

          {trendSamples.length > 0 ? (
            <div className="space-y-4 pt-2">
              {/* Responsive SVG Chart */}
              <div className="h-44 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-stone-200/60 dark:border-emerald-500/20">
                {trendSamples.map((sample, idx) => {
                  const heightPercent = Math.max(sample.healthScore, 10);
                  const isHigh = sample.healthScore >= 75;
                  const isLow = sample.healthScore < 50;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div className="text-[10px] font-bold text-stone-500 dark:text-stone-300 mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {sample.healthScore}
                      </div>
                      <div
                        className={`w-full max-w-[28px] rounded-t-md transition-all duration-500 ${
                          isHigh
                            ? 'bg-emerald-600 group-hover:bg-emerald-500'
                            : isLow
                            ? 'bg-rose-500 group-hover:bg-rose-400'
                            : 'bg-amber-500 group-hover:bg-amber-400'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium mt-2 truncate max-w-full">
                        {sample.plant.name.slice(0, 3)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-1">
                <span>Earliest Scan</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                  Plant Health Index Trend over recent scans
                </span>
                <span>Latest Scan</span>
              </div>
            </div>
          ) : (
            <div className="h-44 flex items-center justify-center text-xs text-stone-400">
              {t.noDataYet}
            </div>
          )}
        </div>

        {/* Pathogen Distribution */}
        <div className="glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-stone-900 dark:text-white text-sm">
              {t.diseaseDistribution}
            </h3>
          </div>

          {diseaseList.length > 0 ? (
            <div className="space-y-3 pt-1">
              {diseaseList.slice(0, 5).map(([name, count], idx) => {
                const percent = Math.round((count / totalScans) * 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-stone-800 dark:text-stone-200 truncate">
                        {name}
                      </span>
                      <span className="font-bold text-stone-600 dark:text-stone-300">
                        {count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-stone-200/70 dark:bg-stone-800/80 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-stone-400">
              No disease signatures logged yet.
            </div>
          )}
        </div>
      </div>

      {/* WEATHER RISK & RECENT DIAGNOSES SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weather Risk Widget */}
        <div className="glass-card rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Microclimate Telemetry</span>
            </h3>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800">
              {weather?.diseaseRisk || 'High'} Risk
            </span>
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            {weather?.riskSummary || 'High humidity and warm air accelerate fungal spore germination.'}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <div className="p-2.5 rounded-xl glass-panel-subtle">
              <div className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-semibold">Temperature</div>
              <div className="text-sm font-bold text-stone-900 dark:text-white">{weather?.temperature || 28.5}°C</div>
            </div>
            <div className="p-2.5 rounded-xl glass-panel-subtle">
              <div className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-semibold">Humidity</div>
              <div className="text-sm font-bold text-stone-900 dark:text-white">{weather?.humidity || 82}%</div>
            </div>
          </div>
        </div>

        {/* Recent Diagnoses List */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 dark:text-white text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.recentDiagnoses}</span>
            </h3>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>{t.viewAllHistory}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {diagnoses.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectDiagnosis(item);
                  onNavigate('scanner');
                }}
                className="py-3 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/40 p-2 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shrink-0 flex items-center justify-center p-1">
                    <img src={item.imageUrl} alt={item.plant.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-white">
                      {item.plant.name} — {item.disease.name}
                    </div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">
                      {new Date(item.timestamp).toLocaleDateString()} · Severity: {item.severity.level}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    Health: {item.healthScore}/100
                  </div>
                  <div className="text-[10px] text-stone-500 dark:text-stone-400">
                    Conf: {Math.round(item.disease.confidence * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
