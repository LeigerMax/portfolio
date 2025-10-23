'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { Language, TranslationContent } from '@/types';
import { translations } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationContent;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  useEffect(() => {
    // Récupérer la langue sauvegardée ou détecter la langue du navigateur
    const savedLanguage = localStorage.getItem('portfolio-language') as Language;
    if (savedLanguage && ['fr', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      const browserLanguage = navigator.language.startsWith('fr') ? 'fr' : 'en';
      setLanguage(browserLanguage);
    }
  }, []);

  useEffect(() => {
    // Sauvegarder la langue sélectionnée
    localStorage.setItem('portfolio-language', language);
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const { t } = useLanguage();
  return t;
}