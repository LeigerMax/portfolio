'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glowColor?: string;
}

export function Card({ children, className, hoverable = false, glowColor = 'cyan' }: CardProps) {
  const getGlowColor = (color: string) => {
    switch(color) {
      case 'cyan': return '#00ffff';
      case 'pink': return '#ff00ff';
      case 'green': return '#00ff00';
      case 'purple': return '#a855f7';
      case 'yellow': return '#eab308';
      case 'orange': return '#f97316';
      default: return '#00ffff';
    }
  };

  return (
    <motion.div
      className={cn(
        "relative bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden",
        hoverable && "cursor-pointer transition-all duration-300",
        className
      )}
      whileHover={hoverable ? { 
        scale: 1.02,
        boxShadow: `0 0 30px ${getGlowColor(glowColor)}40`
      } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Effet de grille rétro */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>
      
      {/* Bordure néon */}
      <div className={cn(
        "absolute inset-0 rounded-lg",
        hoverable && "group-hover:shadow-neon transition-shadow duration-300"
      )} />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("p-6 pb-4", className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function CardTitle({ children, className, glowColor = 'cyan' }: CardTitleProps) {
  return (
    <h3 className={cn(
      "text-xl font-bold text-white font-mono tracking-wider",
      glowColor === 'cyan' && "text-cyan-400",
      glowColor === 'pink' && "text-pink-400",
      glowColor === 'green' && "text-green-400",
      glowColor === 'purple' && "text-purple-400",
      glowColor === 'yellow' && "text-yellow-400",
      glowColor === 'orange' && "text-orange-400",
      className
    )}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-gray-300 text-sm leading-relaxed", className)}>
      {children}
    </p>
  );
}