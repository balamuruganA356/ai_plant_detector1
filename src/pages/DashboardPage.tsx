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
    (d) => d.severity.level === 'Severe' || d.severity.level === 'Critical' || d.weatherRisk?.riskLevel === 'High'
  ).length;

  // Disease frequency
  const diseaseCounts: Record<string, number> = {};
  diagnoses.forEach((d) => {
    const key = d.disease.isHealthy ? 'Healthy' : d.disease.name;
    diseaseCounts[key] = (diseaseCounts[key] || 0) + 1;
  });
  const diseaseList = Object.entries(diseaseCounts).sort((a, b) => b[1] - a[1]);

  // Health Trend progression (last 8 scans in chronological order: oldest to newest)
  const trendSamples = [...diagnoses].reverse().slice(-8);

  return (
    <div className="space-y-8 py-6 sm:py-8 max-w-7xl mx-auto">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-1 font-medium">
            {t.subtitle}
          </p>
        </div>

        <button
          onClick={() => onNavigate('scanner')}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Scan className="w-4 h-4" />
          <span>{t.quickScan}</span>
        </button>
      </div>

      {/* TOP METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Scans */}
        <div className="p-5 glass-card-interactive rounded-2xl border border-stone-200/80 dark:border-emerald-500/30">
          <div className="flex items-center justify-between text-stone-700 dark:text-stone-300 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">{t.totalScans}</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center shadow-2xs">
              <Scan className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-stone-900 dark:text-white">
            {totalScans}
          </div>
          <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-medium">
            {totalScans > 0 ? 'Lifetime leaf telemetry' : 'No scans recorded'}
          </div>
        </div>

        {/* Healthy Plants */}
        <div className="p-5 glass-card-interactive rounded-2xl border border-stone-200/80 dark:border-emerald-500/30">
          <div className="flex items-center justify-between text-stone-700 dark:text-stone-300 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">{t.healthyPlants}</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/40 flex items-center justify-center shadow-2xs">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {healthyCount}
          </div>
          <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-medium">
            {totalScans > 0 ? `${Math.round((healthyCount / totalScans) * 100)}% healthy ratio` : 'Awaiting scans'}
          </div>
        </div>

        {/* Diseases Detected */}
        <div className="p-5 glass-card-interactive rounded-2xl border border-stone-200/80 dark:border-amber-500/30">
          <div className="flex items-center justify-between text-stone-700 dark:text-stone-300 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">{t.diseasesDetected}</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-500/40 flex items-center justify-center shadow-2xs">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {diseasedCount}
          </div>
          <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-medium">
            {diseasedCount > 0 ? 'Requiring cultural intervention' : 'No active diseases'}
          </div>
        </div>

        {/* High Risk Plants */}
        <div className="p-5 glass-card-interactive rounded-2xl border border-stone-200/80 dark:border-rose-500/30">
          <div className="flex items-center justify-between text-stone-700 dark:text-stone-300 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">{t.highRiskPlants}</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-500/40 flex items-center justify-center shadow-2xs">
              <HeartPulse className="w-4.5 h-4.5 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            {highRiskCount}
          </div>
          <div className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-medium">
            {highRiskCount > 0 ? 'Severe lesions or elevated weather risk' : 'Low risk profile'}
          </div>
        </div>
      </div>

      {/* CHARTS & HEALTH TREND SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Plant Health Score Progression Trend */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-4 border border-stone-200/80 dark:border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-stone-900 dark:text-white text-base tracking-tight">
                Plant Health Index Trend
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/30 px-2.5 py-1 rounded-lg">
              Avg Score: {totalScans > 0 ? Math.round(diagnoses.reduce((acc, d) => acc + d.healthScore, 0) / totalScans) : 0}/100
            </span>
          </div>

          {trendSamples.length > 0 ? (
            <div className="space-y-4 pt-2">
              {/* Responsive SVG Bar Chart */}
              <div className="h-48 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-stone-200/80 dark:border-emerald-500/20">
                {trendSamples.map((sample, idx) => {
                  const heightPercent = Math.max(sample.healthScore, 12);
                  const isHigh = sample.healthScore >= 75;
                  const isLow = sample.healthScore < 50;
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div className="text-[11px] font-bold text-stone-800 dark:text-stone-100 mb-1 opacity-90 group-hover:opacity-100 transition-opacity">
                        {sample.healthScore}
                      </div>
                      <div
                        className={`w-full max-w-[32px] rounded-t-md transition-all duration-300 ${
                          isHigh
                            ? 'bg-emerald-500 group-hover:bg-emerald-400'
                            : isLow
                            ? 'bg-rose-500 group-hover:bg-rose-400'
                            : 'bg-amber-500 group-hover:bg-amber-400'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[11px] text-stone-700 dark:text-stone-300 font-semibold mt-2 truncate max-w-full">
                        {sample.plant.name.slice(0, 3)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-300 pt-1 font-medium">
                <span>Earliest Scan</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-bold">
                  Historical health scores in chronological order
                </span>
                <span>Latest Scan</span>
              </div>
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-xs text-stone-500 dark:text-stone-300 gap-2 border border-dashed border-stone-300 dark:border-emerald-500/25 rounded-xl">
              <BarChart3 className="w-7 h-7 text-stone-400 dark:text-emerald-400" />
              <span className="font-bold text-stone-800 dark:text-stone-200">No previous scans available</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">Perform your first leaf scan to record health trend data</span>
            </div>
          )}
        </div>

        {/* Pathogen / Disease Distribution */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-stone-200/80 dark:border-emerald-500/30">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-stone-900 dark:text-white text-base tracking-tight">
              Disease Distribution
            </h3>
          </div>

          {diseaseList.length > 0 ? (
            <div className="space-y-3.5 pt-1">
              {diseaseList.slice(0, 5).map(([name, count], idx) => {
                const percent = Math.round((count / totalScans) * 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-stone-900 dark:text-stone-100 truncate">
                        {name}
                      </span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-300">
                        {count} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-stone-200/90 dark:bg-stone-950/80 rounded-full h-2.5 overflow-hidden border border-stone-300/50 dark:border-emerald-500/20">
                      <div
                        className="h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-xs"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-14 flex flex-col items-center justify-center text-center text-xs text-stone-500 dark:text-stone-300 gap-2 border border-dashed border-stone-300 dark:border-emerald-500/25 rounded-xl">
              <ShieldCheck className="w-7 h-7 text-emerald-500 dark:text-emerald-400" />
              <span className="font-bold text-stone-800 dark:text-stone-200">No diseases detected</span>
              <span className="text-xs text-stone-500 dark:text-stone-400">No active disease signatures in scan history</span>
            </div>
          )}
        </div>
      </div>

      {/* WEATHER RISK & RECENT DIAGNOSES SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weather Risk Widget */}
        <div className="glass-card rounded-2xl p-6 space-y-4 border border-stone-200/80 dark:border-emerald-500/30">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-2 tracking-tight">
              <CloudRain className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
              <span>Microclimate Telemetry</span>
            </h3>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/90 dark:text-rose-300 dark:border-rose-500/40">
              {weather?.diseaseRisk || 'High'} Risk
            </span>
          </div>

          <p className="text-xs text-stone-700 dark:text-stone-200 leading-relaxed font-medium">
            {weather?.riskSummary || 'High humidity and warm air accelerate fungal spore germination.'}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl glass-panel-subtle border border-stone-200/80 dark:border-emerald-500/30">
              <div className="text-[10px] text-stone-600 dark:text-stone-300 uppercase font-bold tracking-wider">Temperature</div>
              <div className="text-base font-extrabold text-stone-900 dark:text-white mt-0.5">{weather?.temperature || 28.5}°C</div>
            </div>
            <div className="p-3 rounded-xl glass-panel-subtle border border-stone-200/80 dark:border-emerald-500/30">
              <div className="text-[10px] text-stone-600 dark:text-stone-300 uppercase font-bold tracking-wider">Humidity</div>
              <div className="text-base font-extrabold text-stone-900 dark:text-white mt-0.5">{weather?.humidity || 82}%</div>
            </div>
          </div>
        </div>

        {/* Recent Diagnoses List */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 space-y-4 border border-stone-200/80 dark:border-emerald-500/30">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 dark:text-white text-base flex items-center gap-2 tracking-tight">
              <Clock className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
              <span>Recent Field Diagnoses</span>
            </h3>
            <button
              onClick={() => onNavigate('history')}
              className="text-xs text-emerald-700 dark:text-emerald-300 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>{t.viewAllHistory}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {diagnoses.length > 0 ? (
            <div className="divide-y divide-stone-200/70 dark:divide-emerald-500/20">
              {diagnoses.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectDiagnosis(item);
                    onNavigate('scanner');
                  }}
                  className="py-3.5 flex items-center justify-between hover:bg-stone-100/80 dark:hover:bg-emerald-950/40 p-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-emerald-500/30 shrink-0 flex items-center justify-center p-1">
                      <img src={item.imageUrl} alt={item.plant.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 dark:text-white">
                        {item.plant.name} — <span className="text-emerald-700 dark:text-emerald-300">{item.disease.name}</span>
                      </div>
                      <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium mt-0.5">
                        {new Date(item.timestamp).toLocaleDateString()} · Severity: <span className="font-semibold text-amber-600 dark:text-amber-400">{item.severity.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
                      Health: {item.healthScore}/100
                    </div>
                    <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium mt-0.5">
                      Conf: {Math.round(item.disease.confidence * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-14 text-center text-xs text-stone-600 dark:text-stone-300 border border-dashed border-stone-300 dark:border-emerald-500/25 rounded-xl font-medium">
              No scan data available yet. Perform your first scan to view recent diagnosis records!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
