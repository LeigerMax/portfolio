'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  decorElement?: ReactNode;
  backgroundColor: string;
}

export function SectionWrapper({ id, children, decorElement, backgroundColor }: SectionWrapperProps) {
  return (
    <section id={`section-${id}`} className="relative min-h-screen">
      {/* Fond de section avec gradient */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${backgroundColor}`}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Grille rétro pour cette section */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Élément décoratif centré dans cette section */}
      {decorElement && (
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
          {decorElement}
        </div>
      )}

      {/* Contenu de la section */}
      <div className="relative z-10">
        {children}
        <div className="h-32" /> {/* Marge blanche */}
      </div>
    </section>
  );
}