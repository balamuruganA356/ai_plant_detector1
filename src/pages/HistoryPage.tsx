import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Filter, 
  Check, 
  Eye,
  FileDown
} from 'lucide-react';
import { Language, PlantDiagnosis, SeverityLevel } from '../types';
import { translations } from '../data/translations';
import { api } from '../services/api';
import { generateDiagnosisPdfReport } from '../utils/pdfGenerator';

interface HistoryPageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onSelectDiagnosis: (diagnosis: PlantDiagnosis) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  language,
  onNavigate,
  onSelectDiagnosis,
}) => {
  const t = translations[language].history;

  const [records, setRecords] = useState<PlantDiagnosis[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlant, setSelectedPlant] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await api.getHistory();
      setRecords(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(t.confirmDelete)) {
      await api.deleteDiagnosis(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Unique plants for filter dropdown
  const uniquePlants = Array.from(new Set(records.map((r) => r.plant.name)));

  // Filter records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.notes && rec.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPlant = selectedPlant === 'All' || rec.plant.name === selectedPlant;
    const matchesSeverity = selectedSeverity === 'All' || rec.severity.level === selectedSeverity;

    return matchesSearch && matchesPlant && matchesSeverity;
  });

  // Calculate Plant Health Progress Trend (Section 23)
  let healthTrendStatus: 'improving' | 'declining' | 'neutral' = 'neutral';
  if (records.length >= 2) {
    const recentScores = records.slice(0, 5).map((r) => r.healthScore);
    const oldest = recentScores[recentScores.length - 1];
    const newest = recentScores[0];
    if (newest > oldest + 5) {
      healthTrendStatus = 'improving';
    } else if (newest < oldest - 5) {
      healthTrendStatus = 'declining';
    }
  }

  return (
    <div className="space-y-8 py-6 sm:py-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-50 tracking-tight">
          {t.title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 max-w-2xl font-medium">
          {t.subtitle}
        </p>
      </div>

      {/* HEALTH PROGRESSION TREND BANNER (Section 23) */}
      {records.length > 1 && (
        <div
          className={`p-4 rounded-2xl glass-card flex items-center justify-between gap-4 text-xs font-medium ${
            healthTrendStatus === 'improving'
              ? '!border-emerald-500/50 text-emerald-900 dark:text-emerald-300'
              : healthTrendStatus === 'declining'
              ? '!border-rose-500/50 text-rose-900 dark:text-rose-300'
              : 'text-stone-700 dark:text-stone-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {healthTrendStatus === 'improving' ? (
              <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : healthTrendStatus === 'declining' ? (
              <TrendingDown className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            ) : (
              <TrendingUp className="w-5 h-5 text-stone-500 shrink-0" />
            )}
            <span>
              {healthTrendStatus === 'improving'
                ? t.trendImproving
                : healthTrendStatus === 'declining'
                ? t.trendDeclining
                : 'Crop recovery baseline is stable across recorded diagnostic samples.'}
            </span>
          </div>

          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 underline cursor-pointer" onClick={() => onNavigate('dashboard')}>
            View Graphs
          </span>
        </div>
      )}

      {/* SEARCH & FILTERS BAR */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 glass-card p-4 rounded-2xl shadow-xs">
        
        {/* Search Input */}
        <div className="sm:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl glass-input text-stone-900 dark:text-stone-100"
          />
        </div>

        {/* Plant Filter */}
        <div>
          <select
            value={selectedPlant}
            onChange={(e) => setSelectedPlant(e.target.value)}
            className="w-full text-xs py-2 px-3 rounded-xl glass-input text-stone-900 dark:text-stone-100"
          >
            <option value="All">{t.filterAllPlants}</option>
            {uniquePlants.map((plant) => (
              <option key={plant} value={plant}>
                {plant}
              </option>
            ))}
          </select>
        </div>

        {/* Severity Filter */}
        <div>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="w-full text-xs py-2 px-3 rounded-xl glass-input text-stone-900 dark:text-stone-100"
          >
            <option value="All">{t.filterAllSeverities}</option>
            <option value="Healthy">Healthy</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {/* HISTORY TABLE & CARDS */}
      {filteredRecords.length > 0 ? (
        <div className="glass-card rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-50 dark:bg-stone-950/80 border-b border-stone-200 dark:border-stone-800 text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Sample</th>
                  <th className="py-3 px-4">{t.plant}</th>
                  <th className="py-3 px-4">{t.disease}</th>
                  <th className="py-3 px-4">{t.confidence}</th>
                  <th className="py-3 px-4">{t.severity}</th>
                  <th className="py-3 px-4">{t.health}</th>
                  <th className="py-3 px-4">{t.date}</th>
                  <th className="py-3 px-4 text-right">{t.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
                {filteredRecords.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      onSelectDiagnosis(item);
                      onNavigate('scanner');
                    }}
                    className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors cursor-pointer group"
                  >
                    {/* Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-center justify-center p-1">
                        <img
                          src={item.imageUrl}
                          alt={item.plant.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </td>

                    {/* Plant */}
                    <td className="py-3 px-4 font-bold text-stone-900 dark:text-stone-100">
                      {item.plant.name}
                    </td>

                    {/* Disease */}
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold ${
                          item.disease.isHealthy ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-900 dark:text-stone-100'
                        }`}
                      >
                        {item.disease.name}
                      </span>
                    </td>

                    {/* Confidence */}
                    <td className="py-3 px-4 font-medium text-stone-600 dark:text-stone-400">
                      {Math.round(item.disease.confidence * 100)}%
                    </td>

                    {/* Severity */}
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                          item.severity.level === 'Healthy'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : item.severity.level === 'Mild'
                            ? 'bg-lime-50 text-lime-800 border-lime-200'
                            : item.severity.level === 'Moderate'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}
                      >
                        {item.severity.level} ({item.severity.score}%)
                      </span>
                    </td>

                    {/* Health Score */}
                    <td className="py-3 px-4 font-bold text-emerald-700 dark:text-emerald-400">
                      {item.healthScore} / 100
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                      {new Date(item.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          generateDiagnosisPdfReport(item);
                        }}
                        className="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors rounded-md hover:bg-stone-200/60 dark:hover:bg-stone-800"
                        title="Download PDF"
                      >
                        <FileDown className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(item.id, e)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title={t.deleteItem}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-12 text-center text-xs text-stone-500">
          {t.noRecordsFound}
        </div>
      )}
    </div>
  );
};
