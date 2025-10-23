'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: 'cyan' | 'pink' | 'green' | 'purple';
  neonEffect?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    glowColor = 'cyan',
    neonEffect = true,
    children, 
    ...props 
  }, ref) => {
    const baseClasses = "relative font-mono font-bold uppercase tracking-wider transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: cn(
        "bg-gradient-to-r text-black border-2",
        glowColor === 'cyan' && "from-cyan-400 to-cyan-600 border-cyan-400 hover:from-cyan-300 hover:to-cyan-500",
        glowColor === 'pink' && "from-pink-400 to-pink-600 border-pink-400 hover:from-pink-300 hover:to-pink-500",
        glowColor === 'green' && "from-green-400 to-green-600 border-green-400 hover:from-green-300 hover:to-green-500",
        glowColor === 'purple' && "from-purple-400 to-purple-600 border-purple-400 hover:from-purple-300 hover:to-purple-500"
      ),
      secondary: cn(
        "bg-gray-800 text-white border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-500"
      ),
      outline: cn(
        "bg-transparent text-white border-2 hover:bg-white/10",
        glowColor === 'cyan' && "border-cyan-400 text-cyan-400 hover:text-cyan-300 hover:border-cyan-300",
        glowColor === 'pink' && "border-pink-400 text-pink-400 hover:text-pink-300 hover:border-pink-300",
        glowColor === 'green' && "border-green-400 text-green-400 hover:text-green-300 hover:border-green-300",
        glowColor === 'purple' && "border-purple-400 text-purple-400 hover:text-purple-300 hover:border-purple-300"
      ),
      ghost: "bg-transparent text-white hover:bg-white/10 border-2 border-transparent"
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base"
    };

    const glowColors = {
      cyan: "hover:shadow-[0_0_20px_#00ffff80]",
      pink: "hover:shadow-[0_0_20px_#ff00ff80]",
      green: "hover:shadow-[0_0_20px_#00ff0080]",
      purple: "hover:shadow-[0_0_20px_#8000ff80]"
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          neonEffect && glowColors[glowColor],
          "hover:scale-105 active:scale-95",
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        {...props}
      >
        {/* Effet de scan rétro */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Bordure animée */}
        <div className="absolute inset-0 border-2 border-white/20 animate-pulse" />
        
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };