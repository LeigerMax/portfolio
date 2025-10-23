'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Mouse } from 'lucide-react';

export function ScrollInstructions() {
  return (
    <motion.div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex flex-col items-center space-y-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 1 }}
    >
      {/* Indicateur de souris */}
      <motion.div
        className="bg-black/20 backdrop-blur-md border border-cyan-500/30 rounded-full p-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Mouse className="text-cyan-400" size={24} />
      </motion.div>



      {/* Flèche animée */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="text-cyan-400" size={20} />
      </motion.div>
    </motion.div>
  );
}