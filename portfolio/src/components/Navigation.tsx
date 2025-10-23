'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNaturalScroll, SectionId } from '@/hooks/useNaturalScroll';
import { useLanguage, useTranslation } from '@/hooks/useLanguage';
import { Languages, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const { currentSection, navigateToSection } = useNaturalScroll();
  const { language, setLanguage } = useLanguage();
  const t = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections: { id: SectionId; label: string; icon: string }[] = [
    { id: 'hero', label: t.nav.hero, icon: '🏠' },
    { id: 'about', label: t.nav.about, icon: '👨‍💻' },
    { id: 'projects', label: t.nav.projects, icon: '🎮' },
    { id: 'experience', label: t.nav.experience, icon: '📚' },
    { id: 'contact', label: t.nav.contact, icon: '📞' }
  ];

  const handleSectionClick = (sectionId: SectionId) => {
    navigateToSection(sectionId);
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <>
      {/* Navigation Desktop */}
      <motion.nav 
        className={cn(
          "fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block",
          className
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="bg-black/20 backdrop-blur-md border border-cyan-500/30 rounded-full px-6 py-3">
          <div className="flex items-center space-x-1">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-sm font-mono transition-all duration-300",
                  "hover:bg-cyan-500/20 hover:text-cyan-400",
                  currentSection === section.id 
                    ? "bg-cyan-500/30 text-cyan-400 shadow-[0_0_15px_#00ffff40]" 
                    : "text-gray-300"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden xl:inline">{section.label}</span>
                <span className="xl:hidden text-lg">{section.icon}</span>
                
                {currentSection === section.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-full"
                    layoutId="activeSection"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
            
            {/* Bouton de changement de langue */}
            <div className="w-px h-6 bg-gray-600 mx-2" />
            <motion.button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-full text-xs font-mono text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300 flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Languages size={16} />
              <span className="uppercase">{language}</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Navigation Mobile */}
      <div className="lg:hidden">
        {/* Bouton Menu Mobile */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-6 right-6 z-50 bg-black/20 backdrop-blur-md border border-cyan-500/30 rounded-full p-3 text-cyan-400"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Menu Mobile Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="flex flex-col items-center justify-center h-full space-y-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ delay: 0.1 }}
              >
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={cn(
                      "text-2xl font-mono tracking-wider transition-all duration-300",
                      "hover:scale-110 hover:text-cyan-400",
                      currentSection === section.id 
                        ? "text-cyan-400 scale-110 drop-shadow-[0_0_15px_#00ffff80]" 
                        : "text-gray-300"
                    )}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{section.icon}</span>
                      <span>{section.label}</span>
                    </div>
                  </motion.button>
                ))}
                
                {/* Bouton langue mobile */}
                <motion.button
                  onClick={toggleLanguage}
                  className="text-lg font-mono text-gray-400 hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2 mt-8"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Languages size={20} />
                  <span>{language === 'fr' ? 'Français' : 'English'}</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Indicateur de section actuelle */}
      <motion.div
        className="fixed bottom-6 left-6 z-40 bg-black/20 backdrop-blur-md border border-cyan-500/30 rounded-full px-4 py-2"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-sm">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span>{sections.find(s => s.id === currentSection)?.label}</span>
        </div>
      </motion.div>

      {/* Instructions de navigation */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 bg-black/20 backdrop-blur-md border border-gray-600/30 rounded-lg px-3 py-2 text-xs text-gray-400 font-mono hidden lg:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="space-y-1">
          <div>← → Navigation</div>
          <div>1-5 Sections</div>
        </div>
      </motion.div>
    </>
  );
}