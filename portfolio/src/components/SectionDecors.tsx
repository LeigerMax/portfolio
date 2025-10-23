'use client';

import { motion } from 'framer-motion';

// Décor pour la section Hero - Vue d'ensemble de la chambre rétro
export function HeroDecor() {
  return (
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
      {/* Ordinateur vintage au centre */}
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
  );
}

// Décor pour la section About - Bureau avec objets
export function AboutDecor() {
  return (
    <motion.div
      className="relative"
      animate={{ 
        rotateY: [0, 2, 0],
        scale: [1, 1.01, 1] 
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      {/* Bureau */}
      <div className="w-96 h-64 bg-gradient-to-br from-amber-900 to-amber-700 rounded-lg relative shadow-2xl">
        {/* Ordinateur portable ouvert */}
        <div className="absolute top-8 left-8 w-32 h-20 bg-gray-800 rounded-lg">
          <div className="w-full h-12 bg-black rounded-t-lg border-2 border-gray-700">
            <div className="p-1 text-green-400 text-xs font-mono">
              {'>'} Skills loading...
            </div>
          </div>
        </div>
        
        {/* Tasse de café */}
        <div className="absolute top-12 right-12 w-8 h-8 bg-white rounded-full">
          <div className="w-6 h-6 bg-amber-800 rounded-full m-1" />
        </div>
        
        {/* Livres empilés */}
        <div className="absolute bottom-8 left-12">
          <div className="w-16 h-2 bg-red-600 rounded" />
          <div className="w-16 h-2 bg-blue-600 rounded" />
          <div className="w-16 h-2 bg-green-600 rounded" />
        </div>
      </div>
    </motion.div>
  );
}

// Décor pour la section Projects - Console de jeu vintage
export function ProjectsDecor() {
  return (
    <motion.div
      className="relative"
      animate={{ 
        rotateX: [0, 1, 0],
        scale: [1, 1.01, 1] 
      }}
      transition={{ 
        duration: 7, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      {/* Console de jeu vintage */}
      <div className="w-80 h-48 bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg relative">
        {/* Écran */}
        <div className="absolute top-4 left-8 right-8 h-24 bg-black rounded border-2 border-gray-700">
          <motion.div
            className="w-full h-full bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded flex items-center justify-center font-mono text-green-400 text-xs"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            GAME OVER<br/>PRESS START
          </motion.div>
        </div>
        
        {/* Boutons */}
        <div className="absolute bottom-8 left-8 grid grid-cols-2 gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full ${
                i % 2 === 0 ? 'bg-red-600' : 'bg-blue-600'
              }`}
            />
          ))}
        </div>
        
        {/* Joystick */}
        <div className="absolute bottom-8 right-8">
          <div className="w-12 h-12 bg-gray-700 rounded-full relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Décor pour la section Experience - Étagère avec diplômes
export function ExperienceDecor() {
  return (
    <motion.div
      className="relative"
      animate={{ 
        rotateZ: [0, 0.5, 0],
        scale: [1, 1.005, 1] 
      }}
      transition={{ 
        duration: 10, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      {/* Étagère */}
      <div className="w-80 h-60 bg-gradient-to-b from-amber-800 to-amber-900 rounded-lg relative">
        {/* Étagères horizontales */}
        <div className="absolute top-16 left-4 right-4 h-2 bg-amber-700 rounded" />
        <div className="absolute top-32 left-4 right-4 h-2 bg-amber-700 rounded" />
        
        {/* Diplômes */}
        <div className="absolute top-20 left-8 w-20 h-16 bg-white rounded border-2 border-yellow-500 transform rotate-2">
          <div className="p-1 text-xs text-gray-800 font-serif">DIPLÔME</div>
        </div>
        
        <div className="absolute top-36 right-8 w-20 h-16 bg-white rounded border-2 border-blue-500 transform -rotate-1">
          <div className="p-1 text-xs text-gray-800 font-serif">MASTER</div>
        </div>
        
        {/* Livres techniques */}
        <div className="absolute bottom-8 left-8">
          <div className="w-3 h-20 bg-red-700 rounded-t" />
          <div className="w-3 h-20 bg-blue-700 rounded-t ml-1" />
          <div className="w-3 h-20 bg-green-700 rounded-t ml-2" />
        </div>
        
        {/* Trophée */}
        <div className="absolute bottom-8 right-8 w-8 h-12 bg-yellow-500 rounded-t-full">
          <div className="absolute bottom-0 w-full h-3 bg-yellow-600 rounded" />
        </div>
      </div>
    </motion.div>
  );
}

// Décor pour la section Contact - Téléphone rétro et bureau
export function ContactDecor() {
  return (
    <motion.div
      className="relative"
      animate={{ 
        rotateY: [0, -1, 0],
        scale: [1, 1.01, 1] 
      }}
      transition={{ 
        duration: 9, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      {/* Bureau avec téléphone */}
      <div className="w-80 h-48 bg-gradient-to-br from-amber-900 to-amber-800 rounded-lg relative">
        {/* Téléphone rétro */}
        <div className="absolute top-8 left-12 w-20 h-16 bg-red-800 rounded-lg">
          {/* Combiné */}
          <div className="absolute -top-2 left-2 w-16 h-4 bg-red-900 rounded-full" />
          {/* Cadran */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-800 rounded-full">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 36}deg) translateY(-12px)`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Carnet d'adresses */}
        <div className="absolute top-12 right-12 w-16 h-12 bg-brown-600 rounded">
          <div className="w-full h-1 bg-brown-800 mt-2" />
          <div className="w-full h-1 bg-brown-800 mt-1" />
          <div className="w-full h-1 bg-brown-800 mt-1" />
        </div>
        
        {/* Enveloppes */}
        <div className="absolute bottom-8 left-8">
          <div className="w-12 h-8 bg-white border border-gray-300 transform rotate-2" />
          <div className="w-12 h-8 bg-white border border-gray-300 transform -rotate-1 -mt-6 ml-2" />
        </div>
        
        {/* Plante */}
        <div className="absolute bottom-8 right-8">
          <div className="w-6 h-6 bg-green-600 rounded-full" />
          <div className="w-1 h-8 bg-green-700 mx-auto" />
          <div className="w-8 h-4 bg-amber-700 rounded-b-full mx-auto" />
        </div>
      </div>
    </motion.div>
  );
}