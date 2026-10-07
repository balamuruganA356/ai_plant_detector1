import React, { useState } from 'react';
import { 
  Sprout, 
  Scan, 
  LayoutDashboard, 
  History, 
  Bot, 
  MapPin, 
  Info, 
  Globe, 
  Moon, 
  Sun, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  mode?: 'production' | 'demo';
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  language,
  onLanguageChange,
  isDark,
  onToggleTheme,
  mode = 'demo',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language].nav;

  const navItems = [
    { id: 'home', label: t.home, icon: Sprout },
    { id: 'scanner', label: t.scanner, icon: Scan },
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'history', label: t.history, icon: History },
    { id: 'assistant', label: t.assistant, icon: Bot },
    { id: 'nearby', label: t.nearby, icon: MapPin },
    { id: 'about', label: t.about, icon: Info },
  ];

  const handleSelectPage = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleSelectPage('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-800 transition-all">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-stone-900 dark:text-stone-50 tracking-tight flex items-center gap-1.5">
                AgroVision <span className="text-emerald-700 dark:text-emerald-500 font-bold">AI</span>
              </span>
              <span className="block text-[10px] text-stone-500 dark:text-stone-400 font-medium tracking-wide">
                Crop Health Intelligence
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectPage(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                      : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-stone-400 dark:text-stone-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools: Language, Mode, Theme, Scan CTA */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Mode Indicator */}
            <div 
              title={mode === 'production' ? 'Production AI active' : 'Agronomic Demo engine active'}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md border flex items-center gap-1.5 ${
                mode === 'production' 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                  : 'bg-stone-100 border-stone-200 text-stone-700 dark:bg-stone-800 dark:border-stone-700 dark:text-stone-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${mode === 'production' ? 'bg-emerald-500 animate-pulse' : 'bg-stone-400'}`} />
              <span className="capitalize">{mode}</span>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Switch Language (English / தமிழ்)"
              >
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors shadow-2xs"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleSelectPage('scanner')}
              className="ml-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-700 text-white shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>{t.scanNow}</span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
              className="px-2 py-1 text-xs font-medium rounded-md border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300"
            >
              {language === 'en' ? 'தமிழ்' : 'EN'}
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="p-1.5 rounded-md border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-left transition-colors ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-semibold'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => handleSelectPage('scanner')}
              className="w-full py-2.5 rounded-lg bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Scan className="w-4 h-4" />
              <span>{t.scanNow}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
