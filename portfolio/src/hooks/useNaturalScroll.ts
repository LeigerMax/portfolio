'use client';

import { useState, useEffect, useCallback } from 'react';

export type SectionId = 'hero' | 'about' | 'projects' | 'experience' | 'contact';

interface SectionConfig {
  id: SectionId;
  zoomLevel: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  backgroundColor: string;
}

const sectionConfigs: Record<SectionId, SectionConfig> = {
  hero: {
    id: 'hero',
    zoomLevel: 1,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
    backgroundColor: 'from-purple-900 via-pink-900 to-indigo-900'
  },
  about: {
    id: 'about',
    zoomLevel: 1.08,
    rotation: -0.2,
    offsetX: -30,
    offsetY: -20,
    backgroundColor: 'from-cyan-900 via-blue-900 to-purple-900'
  },
  projects: {
    id: 'projects',
    zoomLevel: 1.12,
    rotation: 0.15,
    offsetX: 40,
    offsetY: -15,
    backgroundColor: 'from-green-900 via-emerald-900 to-cyan-900'
  },
  experience: {
    id: 'experience',
    zoomLevel: 1.06,
    rotation: -0.1,
    offsetX: -25,
    offsetY: 30,
    backgroundColor: 'from-orange-900 via-red-900 to-pink-900'
  },
  contact: {
    id: 'contact',
    zoomLevel: 1.1,
    rotation: 0.08,
    offsetX: 25,
    offsetY: 28,
    backgroundColor: 'from-violet-900 via-purple-900 to-pink-900'
  }
};

export function useNaturalScroll() {
  const [currentSection, setCurrentSection] = useState<SectionId>('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Détecter quelle section est actuellement visible
  const updateCurrentSection = useCallback(() => {
    const sections = ['hero', 'about', 'projects', 'experience', 'contact'] as SectionId[];
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY;

    for (const sectionId of sections) {
      const element = document.getElementById(`section-${sectionId}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = scrollTop + rect.top;
        const elementHeight = rect.height;
        
        // Section visible si son centre est dans la fenêtre
        if (elementTop <= scrollTop + windowHeight / 2 && 
            elementTop + elementHeight > scrollTop + windowHeight / 2) {
          if (currentSection !== sectionId) {
            setCurrentSection(sectionId);
          }
          break;
        }
      }
    }
  }, [currentSection]);

  // Calculer le progrès de scroll
  const updateScrollProgress = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(window.scrollY / scrollHeight, 1);
    setScrollProgress(progress);
  }, []);

  // Navigation programmée vers une section
  const navigateToSection = useCallback((sectionId: SectionId) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Écouter le scroll
  useEffect(() => {
    const handleScroll = () => {
      updateCurrentSection();
      updateScrollProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Appel initial
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateCurrentSection, updateScrollProgress]);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const sections: SectionId[] = ['hero', 'about', 'projects', 'experience', 'contact'];
      const currentIndex = sections.indexOf(currentSection);

      switch (event.key) {
        case 'ArrowDown':
        case ' ':
          event.preventDefault();
          if (currentIndex < sections.length - 1) {
            navigateToSection(sections[currentIndex + 1]);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (currentIndex > 0) {
            navigateToSection(sections[currentIndex - 1]);
          }
          break;
        case '1':
          navigateToSection('hero');
          break;
        case '2':
          navigateToSection('about');
          break;
        case '3':
          navigateToSection('projects');
          break;
        case '4':
          navigateToSection('experience');
          break;
        case '5':
          navigateToSection('contact');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, navigateToSection]);

  // Marquer le premier chargement comme terminé
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getCurrentSectionConfig = useCallback(() => {
    return sectionConfigs[currentSection];
  }, [currentSection]);

  return {
    currentSection,
    scrollProgress,
    isFirstLoad,
    navigateToSection,
    getCurrentSectionConfig,
    sectionConfigs
  };
}