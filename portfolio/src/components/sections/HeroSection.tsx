'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useLanguage';
import { useNaturalScroll } from '@/hooks/useNaturalScroll';
import { Button } from '@/components/ui/button';
import { personalInfo } from '@/data/portfolio';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

export function HeroSection() {
  const t = useTranslation();
  const { navigateToSection } = useNaturalScroll();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative px-4">
      {/* Décor de chambre rétro - Ordinateur vintage */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <motion.div
          className="relative"
          animate={{ 
            rotateY: [0, 1, 0],
            scale: [1, 1.02, 1] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Écran vintage */}
          <div className="w-96 h-72 bg-gray-900 border-8 border-gray-700 rounded-lg relative">
            <div className="w-full h-full bg-black rounded border-4 border-gray-800 relative overflow-hidden">
              {/* Effet de scan CRT */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent h-4"
                animate={{ y: [-16, 288, -16] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              {/* Texte sur l'écran */}
              <div className="p-4 font-mono text-green-400 text-xs">
                <div className="animate-pulse">
                  {'>'} Loading portfolio...<br/>
                  {'>'} Initializing retro mode...<br/>
                  {'>'} Welcome to the 80s!<br/>
                </div>
              </div>
            </div>
          </div>
          
          {/* Base de l'ordinateur */}
          <div className="w-80 h-16 bg-gray-600 rounded-lg mx-auto -mt-4 relative">
            <div className="absolute top-2 left-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <div className="absolute top-2 left-10 w-3 h-3 bg-yellow-500 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Avatar */}
          <motion.div
            className="relative w-32 h-32 mx-auto mb-8"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-pink-500 rounded-full p-1">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center relative overflow-hidden">
                {/* Placeholder avatar pixel art */}
                <div className="text-4xl">👨‍💻</div>
                
                {/* Effet de glitch */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                  animate={{ x: [-100, 100, -100] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            className="text-xl text-cyan-400 font-mono mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {t.hero.greeting}
          </motion.p>

          {/* Nom */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-white mb-4 relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8, type: "spring" }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
            
            {/* Effet de lueur */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent blur-lg -z-10"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {personalInfo.name}
            </motion.div>
          </motion.h1>

          {/* Titre */}
          <motion.h2
            className="text-2xl md:text-3xl text-pink-400 font-mono tracking-widest mb-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            {t.hero.title}
          </motion.h2>

          {/* Sous-titre */}
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            {t.hero.subtitle}
          </motion.p>

          {/* Boutons d'action */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9 }}
          >
            <Button
              onClick={() => navigateToSection('about')}
              size="lg"
              glowColor="cyan"
              className="min-w-48"
            >
              {t.hero.cta}
            </Button>

            {/* Liens sociaux */}
            <div className="flex space-x-4">
              <motion.a
                href="mailto:max.allemeersch@gmail.com"
                className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-cyan-400 transition-all duration-300 group"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #00ffff40" }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="text-gray-400 group-hover:text-cyan-400 transition-colors" size={20} />
              </motion.a>
              
              <motion.a
                href="https://github.com/LeigerMax"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-pink-400 transition-all duration-300 group"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #ff00ff40" }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="text-gray-400 group-hover:text-pink-400 transition-colors" size={20} />
              </motion.a>
              
              <motion.a
                href="https://linkedin.com/in/maxime-allemeersch"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-green-400 transition-all duration-300 group"
                whileHover={{ scale: 1.1, boxShadow: "0 0 20px #00ff0040" }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="text-gray-400 group-hover:text-green-400 transition-colors" size={20} />
              </motion.a>
            </div>
          </motion.div>

          
        </motion.div>
      </div>

      {/* Éléments décoratifs */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-pink-500 rounded-full"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute bottom-20 right-20 w-6 h-6 bg-cyan-500 rounded-full"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1] 
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}