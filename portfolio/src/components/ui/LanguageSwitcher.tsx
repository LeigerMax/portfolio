'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] flex gap-2 pointer-events-auto">
      <button
        onClick={toggleLanguage}
        className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-mono text-[10px] md:text-sm uppercase tracking-widest hover:bg-white/20 transition-all shadow-2xl flex items-center gap-2 group"
      >
        <span className={i18n.language === 'fr' ? 'text-amber-200' : 'text-white/40 group-hover:text-white/70'}>FR</span>
        <span className="text-white/20">|</span>
        <span className={i18n.language === 'en' ? 'text-amber-200' : 'text-white/40 group-hover:text-white/70'}>EN</span>
      </button>
    </div>
  );
}
