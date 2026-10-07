import React, { useState, useEffect } from 'react';
import { Language, PlantDiagnosis } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NeuralBackground } from './components/NeuralBackground';
import { HomePage } from './pages/HomePage';
import { ScannerPage } from './pages/ScannerPage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { AssistantPage } from './pages/AssistantPage';
import { AgriSupportPage } from './pages/AgriSupportPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Language State with persistence
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('agrovision_lang');
    return saved === 'ta' ? 'ta' : 'en';
  });

  // Dark Theme State with persistence (defaults to dark for luminous neural matrix)
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('agrovision_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Server Health / Mode state
  const [serverMode, setServerMode] = useState<'production' | 'demo'>('demo');

  // Cross-page state transfers
  const [activeDiagnosis, setActiveDiagnosis] = useState<PlantDiagnosis | null>(null);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string | null>(null);

  useEffect(() => {
    // Sync dark class to root HTML element
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('agrovision_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('agrovision_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('agrovision_lang', language);
  }, [language]);

  // Check backend health & mode
  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => {
        if (data.mode) setServerMode(data.mode);
      })
      .catch(() => {
        setServerMode('demo');
      });
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
  };

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDiagnosisFromList = (diagnosis: PlantDiagnosis) => {
    setActiveDiagnosis(diagnosis);
    setCurrentPage('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChatWithQuery = (query: string) => {
    setAssistantInitialQuery(query);
    setCurrentPage('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-emerald-50/25 dark:bg-[#040805]/75 text-stone-900 dark:text-stone-50 transition-colors font-sans selection:bg-emerald-500 selection:text-white overflow-x-hidden">
      
      {/* Animated Running Neurons Canvas Background */}
      <NeuralBackground isDark={isDark} />

      {/* Top Navigation */}
      <div className="relative z-20">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          language={language}
          onLanguageChange={handleLanguageChange}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          mode={serverMode}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {currentPage === 'home' && (
          <HomePage
            language={language}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'scanner' && (
          <ScannerPage
            language={language}
            onNavigate={handleNavigate}
            onOpenChatWithQuery={handleOpenChatWithQuery}
            initialDiagnosis={activeDiagnosis}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            language={language}
            onNavigate={handleNavigate}
            onSelectDiagnosis={handleSelectDiagnosisFromList}
          />
        )}

        {currentPage === 'history' && (
          <HistoryPage
            language={language}
            onNavigate={handleNavigate}
            onSelectDiagnosis={handleSelectDiagnosisFromList}
          />
        )}

        {currentPage === 'assistant' && (
          <AssistantPage
            language={language}
            initialQuery={assistantInitialQuery}
          />
        )}

        {currentPage === 'nearby' && (
          <AgriSupportPage
            language={language}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            language={language}
          />
        )}
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer
          language={language}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}
