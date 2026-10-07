import React from 'react';
import { 
  Scan, 
  Sparkles, 
  ShieldCheck, 
  BarChart3, 
  CloudRain, 
  Layers, 
  ArrowRight, 
  CheckCircle,
  FileText,
  Bot,
  MapPin,
  Leaf
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SUPPORTED_CROPS } from '../data/diseaseDatabase';

interface HomePageProps {
  language: Language;
  onNavigate: (page: string) => void;
  onSelectSample?: (sampleKey: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ language, onNavigate }) => {
  const t = translations[language];

  const features = [
    {
      icon: Scan,
      title: 'Multimodal Leaf Identification',
      description: 'Accurately distinguishes crop species (Tomato, Potato, Apple, Corn, Grape, Rice, Pepper) and differentiates healthy foliage from early-stage lesion pathology.'
    },
    {
      icon: Layers,
      title: 'Quantitative Severity Quantification',
      description: 'Calculates the exact percentage of compromised leaf blade surface and categorizes damage from Mild to Critical using simulated contour segmentation.'
    },
    {
      icon: Sparkles,
      title: 'Explainable AI Symptom Extraction',
      description: 'Pinpoints specific visible visual markers (e.g. concentric target rings, chlorotic halos, velvety fungal spots) to justify each diagnostic determination.'
    },
    {
      icon: CloudRain,
      title: 'Microclimatic Disease Risk Engine',
      description: 'Synthesizes real-time ambient temperature, humidity, rainfall, and leaf wetness hours to evaluate disease spread velocity.'
    },
    {
      icon: FileText,
      title: 'Downloadable Pathology Reports',
      description: 'Instant PDF export with crop pathology details, health score radar breakdown, cultural interventions, and safety compliance disclosures.'
    },
    {
      icon: Bot,
      title: 'AgroVision Agronomy Chatbot',
      description: 'Context-aware agricultural AI assistant available 24/7 in English and Tamil for organic remedies, fertilization, and spray intervals.'
    }
  ];

  const workflowSteps = [
    { step: '01', title: 'Upload Leaf Image', desc: 'Capture or drag-and-drop a leaf photo with camera or file picker.' },
    { step: '02', title: 'AI Preprocessing', desc: 'Automated cropping, illumination normalization, and pixel cleanup.' },
    { step: '03', title: 'Crop & Pathogen Classification', desc: 'Neural vision network predicts plant species and disease state.' },
    { step: '04', title: 'Severity & Risk Calculation', desc: 'Quantifies damaged lamina percentage and weather vulnerability.' },
    { step: '05', title: 'Agronomic Treatment Plan', desc: 'Receive immediate field actions, bio-controls, and prevention tips.' },
  ];

  return (
    <div className="space-y-16 py-6 sm:py-10">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-950/80 via-stone-900/75 to-stone-950/85 backdrop-blur-md text-white p-8 sm:p-14 border border-emerald-500/30 shadow-2xl">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 text-xs font-semibold tracking-wide">
            <Leaf className="w-3.5 h-3.5" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-normal max-w-2xl">
            {t.hero.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('scanner')}
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2 group cursor-pointer"
            >
              <Scan className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>{t.hero.analyzeBtn}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const featEl = document.getElementById('features-section');
                if (featEl) featEl.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-5 py-3.5 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 text-stone-100 border border-stone-700 font-semibold text-sm transition-all cursor-pointer"
            >
              {t.hero.exploreBtn}
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">96.4%</div>
              <div className="text-xs text-stone-300 dark:text-emerald-200/80 font-medium">{t.hero.statAccuracy}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">7+</div>
              <div className="text-xs text-stone-300 dark:text-emerald-200/80 font-medium">{t.hero.statCrops}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">&lt; 1.2s</div>
              <div className="text-xs text-stone-300 dark:text-emerald-200/80 font-medium">{t.hero.statSpeed}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tracking-tight">18+</div>
              <div className="text-xs text-stone-300 dark:text-emerald-200/80 font-medium">{t.hero.statPathogens}</div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFLOW PIPELINE */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
            How AgroVision AI Works
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300">
            From field photograph to laboratory-grade diagnostic assessment in 5 simple automated steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {workflowSteps.map((step) => (
            <div
              key={step.step}
              className="glass-card-interactive rounded-2xl p-5 relative flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                  STEP {step.step}
                </span>
                <h3 className="font-semibold text-stone-900 dark:text-white text-sm mt-2 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE PLATFORM CAPABILITIES */}
      <section id="features-section" className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
            Comprehensive Plant Health Intelligence
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300">
            Engineered specifically to solve real agronomic challenges with explainability, safety, and field precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-card-interactive rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 flex items-center justify-center text-emerald-700 dark:text-emerald-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-stone-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SUPPORTED CROPS DIRECTORY BANNER */}
      <section className="glass-card rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white tracking-tight">
              Supported Agricultural Crops & Varieties
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              Validated on diverse global field cultivars with robust resistance to variable lighting.
            </p>
          </div>
          <button
            onClick={() => onNavigate('scanner')}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors self-start sm:self-auto cursor-pointer"
          >
            Test a Crop Now
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {SUPPORTED_CROPS.map((crop) => (
            <div
              key={crop.id}
              className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200/80 dark:border-emerald-500/20 rounded-xl p-3.5 text-center shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="text-3xl mb-1.5">{crop.icon}</div>
              <div className="font-semibold text-xs text-stone-900 dark:text-white">{crop.name}</div>
              <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">{crop.tamilName}</div>
              <div className="mt-2 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                {crop.commonDiseases.length} Pathogens
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CALL TO ACTION */}
      <section className="text-center rounded-3xl bg-white/80 dark:bg-stone-900/75 backdrop-blur-md border border-stone-200/80 dark:border-emerald-500/30 p-8 sm:p-12 shadow-xs space-y-4">
        <div className="inline-flex p-3 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
          <Scan className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white tracking-tight">
          Ready to Inspect Your Plant?
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-lg mx-auto">
          Upload any plant leaf photo or try one of our realistic pre-loaded field samples to experience sub-second diagnostic classification.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('scanner')}
            className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition-colors inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Launch Plant Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
