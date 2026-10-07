import React from 'react';
import { Sprout, ShieldAlert, Cpu, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = translations[language];

  return (
    <footer className="glass-nav border-t border-b-0 text-stone-700 dark:text-stone-300 text-xs mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Sprout className="w-4 h-4" />
              </div>
              <span className="font-bold text-stone-900 dark:text-white text-base">
                AgroVision AI
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              Intelligent plant disease detection, severity quantification, and microclimatic risk analytics designed for growers, agronomists, and researchers.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
              <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Full-Stack AI Engine · React + Vite</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-emerald-400 uppercase tracking-wider text-[11px] mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('home')} className="text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scanner')} className="text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  {t.nav.scanner}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  {t.nav.dashboard}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('history')} className="text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  {t.nav.history}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Agricultural Resources */}
          <div>
            <h4 className="font-semibold text-stone-900 dark:text-emerald-400 uppercase tracking-wider text-[11px] mb-3">
              Resources & Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('assistant')} className="text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  {t.nav.assistant}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('nearby')} className="text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  {t.nav.nearby}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <a href="#crops" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="text-stone-600 dark:text-stone-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                  Diagnostic Crop Catalog
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Agricultural Safety Disclaimer */}
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-white text-xs">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Safety Disclaimer</span>
            </div>
            <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed">
              AgroVision AI is an educational decision-support tool. AI predictions are not guarantees. Always consult qualified local extension agents before applying regulated crop protection chemicals.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 dark:text-stone-400">
          <div>
            © {new Date().getFullYear()} AgroVision AI Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span className="text-stone-600 dark:text-stone-300">Built with precision for sustainable agriculture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
