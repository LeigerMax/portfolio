'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePortfolioNavigation } from '@/hooks/usePortfolioNavigation';
import { Navigation } from '@/components/Navigation';
import { ScrollInstructions } from '@/components/ScrollInstructions';

// Import des sections
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ContactSection } from '@/components/sections/ContactSection';

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export function RetroPortfolio() {
  const { 
    currentSection, 
    getCurrentSectionConfig, 
    isTransitioning,
    isFirstLoad 
  } = usePortfolioNavigation();

  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  // Générer les particules uniquement côté client pour éviter l'erreur d'hydratation
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2
      });
    }
    setParticles(newParticles);
    setMounted(true);
  }, []);

  const sectionConfig = getCurrentSectionConfig();

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'hero':
        return <HeroSection />;
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Fond rétro animé */}
      <div className="absolute inset-0">
        {/* Grille rétro */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Gradient de fond qui change selon la section */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${sectionConfig.backgroundColor}`}
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        
        {/* Particules flottantes */}
        <div className="absolute inset-0">
          {mounted && particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Instructions de scroll */}
      {currentSection === 'hero' && !isFirstLoad && (
        <ScrollInstructions />
      )}

      {/* Container principal avec effet de zoom */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          x: sectionConfig.zoomTarget.x,
          y: sectionConfig.zoomTarget.y,
          scale: sectionConfig.zoomTarget.scale,
          rotate: sectionConfig.zoomTarget.rotation || 0,
        }}
        transition={{
          duration: sectionConfig.transitionDuration,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Overlay de transition */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Section actuelle */}
        <motion.div
          className="w-full h-full flex items-center justify-center"
          key={currentSection}
          initial={isFirstLoad ? { opacity: 0, scale: 0.8 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: isFirstLoad ? 1.5 : 0.6,
            delay: isFirstLoad ? 0.5 : 0.2 
          }}
        >
          {renderCurrentSection()}
        </motion.div>
      </motion.div>

      {/* Overlay d'introduction */}
      <AnimatePresence>
        {isFirstLoad && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.div
              className="text-center space-y-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.div
                className="text-6xl font-mono text-cyan-400"
                animate={{ 
                  textShadow: [
                    "0 0 10px #00ffff",
                    "0 0 20px #00ffff",
                    "0 0 10px #00ffff"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                LOADING...
              </motion.div>
              <motion.div
                className="w-64 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-pink-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Effet de scanlines rétro */}
      <div 
        className="fixed inset-0 pointer-events-none z-20 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ffff 2px, #00ffff 4px)',
        }}
      />
    </div>
  );
}