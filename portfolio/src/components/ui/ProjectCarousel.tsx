"use client";

import { projects } from "@/data/projects";
import { useState } from "react";
import { Github, ExternalLink, ChevronLeft, ChevronRight, Cpu, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % projects.length);
  const prev = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length);

  const current = projects[index];

  return (
    <div className="bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row h-[500px]">
      {/* Visual / Image (Placeholder) */}
      <div className="md:w-1/3 bg-zinc-900 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/10">
        <div className="text-center">
            <div className="w-32 h-32 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/50 blur-sm animate-pulse" />
            <div className="w-24 h-24 bg-orange-500 rounded-lg flex items-center justify-center mx-auto -mt-36 relative z-10 shadow-lg">
                <Cpu className="text-black transition-transform hover:scale-110" size={48} />
            </div>
            <h3 className="mt-8 font-mono text-orange-400 uppercase tracking-widest text-sm">Project No. {index + 1}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-orange-500/50"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-4xl font-black text-white uppercase italic">{current.title}</h2>
              <div className="flex gap-2">
                <a href={current.links.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10">
                  <Github size={20} />
                </a>
                <a href={current.links.live} target="_blank" rel="noopener noreferrer" className="p-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors text-black">
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              {current.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {current.tech.map((t) => (
                <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-orange-300 uppercase">
                  {t}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm">
                <BookOpen size={16} className="text-orange-500" />
                <span>Architecture & Défis</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-orange-500/30 pl-4 py-1 italic">
                {current.details}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
          <div className="flex gap-4">
            <button onClick={prev} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 border border-white/10">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all hover:scale-110 active:scale-95 border border-white/10">
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="text-zinc-500 font-mono text-xs">
            {index + 1} / {projects.length}
          </div>
        </div>
      </div>
    </div>
  );
}
