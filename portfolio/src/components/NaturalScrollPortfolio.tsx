'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNaturalScroll } from '@/hooks/useNaturalScroll';
import { Navigation } from '@/components/Navigation';
import { ScrollInstructions } from '@/components/ScrollInstructions';
import { SectionWrapper } from '@/components/SectionWrapper';
import { 
  HeroDecor, 
  AboutDecor, 
  ProjectsDecor, 
  ExperienceDecor, 
  ContactDecor 
} from '@/components/SectionDecors';

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

export function NaturalScrollPortfolio() {
  const { 
    currentSection, 
    getCurrentSectionConfig, 
    isFirstLoad,
    navigateToSection
  } = useNaturalScroll();

  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  // Générer les particules uniquement côté client
  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 15; i++) {
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

  return (
    <div className="relative">
      {/* Fond global minimal */}
      <div className="fixed inset-0 z-0 bg-black">
        {/* Particules globales */}
        {mounted && (
          <div className="absolute inset-0">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.1, 0.4, 0.1],
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
        )}

        {/* Effet de scanlines global */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-2"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ffff 2px, #00ffff 4px)',
          }}
        />
      </div>

      {/* Navigation fixe */}
      <Navigation />

      {/* Instructions de scroll */}
      {currentSection === 'hero' && !isFirstLoad && (
        <ScrollInstructions />
      )}

      {/* Container principal avec scroll naturel */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: sectionConfig.zoomLevel,
          rotate: sectionConfig.rotation,
          x: sectionConfig.offsetX,
          y: sectionConfig.offsetY,
        }}
        transition={{
          duration: 1.2,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Section Hero */}
        <SectionWrapper 
          id="hero" 
          backgroundColor="from-purple-900 via-pink-900 to-indigo-900"
          decorElement={<HeroDecor />}
        >
          <HeroSection />
        </SectionWrapper>

        {/* Section À propos */}
        <SectionWrapper 
          id="about" 
          backgroundColor="from-cyan-900 via-blue-900 to-purple-900"
          decorElement={<AboutDecor />}
        >
          <AboutSection />
        </SectionWrapper>

        {/* Section Projets */}
        <SectionWrapper 
          id="projects" 
          backgroundColor="from-green-900 via-emerald-900 to-cyan-900"
          decorElement={<ProjectsDecor />}
        >
          <ProjectsSection />
        </SectionWrapper>

        {/* Section Expérience */}
        <SectionWrapper 
          id="experience" 
          backgroundColor="from-orange-900 via-red-900 to-pink-900"
          decorElement={<ExperienceDecor />}
        >
          <ExperienceSection />
        </SectionWrapper>

        {/* Section Contact */}
        <SectionWrapper 
          id="contact" 
          backgroundColor="from-violet-900 via-purple-900 to-pink-900"
          decorElement={<ContactDecor />}
        >
          <ContactSection />
        </SectionWrapper>
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
    </div>
  );
}