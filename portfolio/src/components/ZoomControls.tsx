'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ZoomControlsProps {
  onZoomChange: (scale: number) => void;
  currentZoom: number;
}

export function ZoomControls({ onZoomChange, currentZoom }: ZoomControlsProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleZoomIn = () => {
    const newZoom = Math.min(currentZoom + 0.1, 2);
    onZoomChange(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(currentZoom - 0.1, 0.5);
    onZoomChange(newZoom);
  };

  const handleReset = () => {
    onZoomChange(1);
  };

  return (
    <motion.div
      className="fixed top-1/2 right-6 transform -translate-y-1/2 z-40"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        className="bg-black/20 backdrop-blur-md border border-gray-600/30 rounded-lg p-2"
        animate={{ width: isVisible ? 'auto' : '48px' }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-2">
          <motion.button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-cyan-400 transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Zoom avant"
          >
            <ZoomIn className="text-gray-400 group-hover:text-cyan-400 transition-colors" size={16} />
          </motion.button>

          <motion.button
            onClick={handleReset}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-green-400 transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Réinitialiser"
          >
            <RotateCcw className="text-gray-400 group-hover:text-green-400 transition-colors" size={16} />
          </motion.button>

          <motion.button
            onClick={handleZoomOut}
            className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600 hover:border-pink-400 transition-colors duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Zoom arrière"
          >
            <ZoomOut className="text-gray-400 group-hover:text-pink-400 transition-colors" size={16} />
          </motion.button>
        </div>

        {isVisible && (
          <motion.div
            className="mt-2 text-xs text-gray-400 font-mono text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {Math.round(currentZoom * 100)}%
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}