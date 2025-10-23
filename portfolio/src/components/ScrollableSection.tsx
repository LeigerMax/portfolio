'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollableSectionProps {
  children: ReactNode;
  className?: string;
}

export function ScrollableSection({ children, className }: ScrollableSectionProps) {
  return (
    <motion.div
      className={cn(
        "scrollable-section h-screen w-full overflow-y-auto overflow-x-hidden",
        "scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-cyan-500",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </motion.div>
  );
}