'use client';

import { useState, useCallback, useEffect } from 'react';

export type SectionId = 'hero' | 'about' | 'projects' | 'experience' | 'contact';

interface SectionConfig {
  id: SectionId;
  zoomTarget: {
    x: number;
    y: number;
    scale: number;
    rotation?: number;
  };
  backgroundColor: string;
  transitionDuration: number;
}

const sectionConfigs: Record<SectionId, SectionConfig> = {
  hero: {
    id: 'hero',
    zoomTarget: { x: 0, y: 0, scale: 1 },
    backgroundColor: 'from-purple-900 via-pink-900 to-indigo-900',
    transitionDuration: 1.5
  },
  about: {
    id: 'about',
    zoomTarget: { x: -50, y: -30, scale: 1.1, rotation: -0.3 },
    backgroundColor: 'from-cyan-900 via-blue-900 to-purple-900',
    transitionDuration: 1.2
  },
  projects: {
    id: 'projects',
    zoomTarget: { x: 60, y: -20, scale: 1.15, rotation: 0.2 },
    backgroundColor: 'from-green-900 via-emerald-900 to-cyan-900',
    transitionDuration: 1.3
  },
  experience: {
    id: 'experience',
    zoomTarget: { x: -30, y: 40, scale: 1.08, rotation: -0.15 },
    backgroundColor: 'from-orange-900 via-red-900 to-pink-900',
    transitionDuration: 1.4
  },
  contact: {
    id: 'contact',
    zoomTarget: { x: 30, y: 35, scale: 1.12, rotation: 0.1 },
    backgroundColor: 'from-violet-900 via-purple-900 to-pink-900',
    transitionDuration: 1.1
  }
};

export function usePortfolioNavigation() {
  const [currentSection, setCurrentSection] = useState<SectionId>('hero');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [canScrollInSection, setCanScrollInSection] = useState(true);

  const navigateToSection = useCallback((sectionId: SectionId) => {
    if (currentSection === sectionId || isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSection(sectionId);

    // Réinitialiser l'état de transition après la durée de l'animation
    const config = sectionConfigs[sectionId];
    setTimeout(() => {
      setIsTransitioning(false);
    }, config.transitionDuration * 1000);
  }, [currentSection, isTransitioning]);

  const getCurrentSectionConfig = useCallback(() => {
    return sectionConfigs[currentSection];
  }, [currentSection]);

  const getNextSection = useCallback(() => {
    const sections: SectionId[] = ['hero', 'about', 'projects', 'experience', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    return sections[nextIndex];
  }, [currentSection]);

  const getPreviousSection = useCallback(() => {
    const sections: SectionId[] = ['hero', 'about', 'projects', 'experience', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    const prevIndex = currentIndex === 0 ? sections.length - 1 : currentIndex - 1;
    return sections[prevIndex];
  }, [currentSection]);

  // Gestion des raccourcis clavier et du scroll
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isTransitioning) return;

      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault();
          navigateToSection(getNextSection());
          break;
        case 'ArrowLeft':
          event.preventDefault();
          navigateToSection(getPreviousSection());
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

    const handleWheel = (event: WheelEvent) => {
      if (isTransitioning) return;

      // Permettre le scroll normal sauf si Shift est pressé
      if (!event.shiftKey) {
        // Vérifier si on est à la fin du scroll de la section
        const target = event.target as Element;
        const scrollableParent = target.closest('.scrollable-section');
        
        if (scrollableParent) {
          const { scrollTop, scrollHeight, clientHeight } = scrollableParent;
          const isAtTop = scrollTop === 0;
          const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
          
          // Navigation entre sections seulement si on est en haut/bas de la section
          if ((event.deltaY > 0 && isAtBottom) || (event.deltaY < 0 && isAtTop)) {
            event.preventDefault();
            if (event.deltaY > 0) {
              navigateToSection(getNextSection());
            } else {
              navigateToSection(getPreviousSection());
            }
          }
        }
        return;
      }

      // Shift + Scroll = navigation forcée entre sections
      event.preventDefault();
      if (event.deltaY > 0) {
        navigateToSection(getNextSection());
      } else {
        navigateToSection(getPreviousSection());
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStartY = touch.clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (isTransitioning || touchStartY === null) return;

      const touch = event.changedTouches[0];
      const touchEndY = touch.clientY;
      const deltaY = touchStartY - touchEndY;

      // Minimum swipe distance
      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          // Swipe vers le haut - section suivante
          navigateToSection(getNextSection());
        } else {
          // Swipe vers le bas - section précédente
          navigateToSection(getPreviousSection());
        }
      }

      touchStartY = null;
    };

    let touchStartY: number | null = null;

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigateToSection, getNextSection, getPreviousSection, isTransitioning]);

  // Marquer le premier chargement comme terminé
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return {
    currentSection,
    isTransitioning,
    isFirstLoad,
    navigateToSection,
    getCurrentSectionConfig,
    getNextSection,
    getPreviousSection,
    sectionConfigs
  };
}