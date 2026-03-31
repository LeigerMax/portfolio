"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ProjectModal({ project, onClose, onNext, onPrev }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project?.title]);

  // Keyboard navigation & Scroll block
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [project, onNext, onPrev, onClose]);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-12 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl cursor-pointer" 
            onClick={onClose} 
          />
          
          {/* Content Wrapper */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[1400px] h-full md:h-auto z-[210] flex items-center justify-center px-0 md:px-4 pointer-events-none"
          >
            
            {/* Navigation Flèches Projets (Desktop) */}
            <div className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2 pointer-events-auto">
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="p-6 bg-white/[0.02] hover:bg-white/[0.05] text-white/20 hover:text-white rounded-full transition-all border border-white/10 cursor-pointer group backdrop-blur-xl"
                title="Projet Précédent"
              >
                <span className="text-4xl translate-x-[-2px] group-hover:-translate-x-1 transition-transform block">←</span>
              </button>
            </div>

            <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-auto">
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="p-6 bg-white/[0.02] hover:bg-white/[0.05] text-white/20 hover:text-white rounded-full transition-all border border-white/10 cursor-pointer group backdrop-blur-xl"
                title="Projet Suivant"
              >
                <span className="text-4xl translate-x-[2px] group-hover:translate-x-1 transition-transform block">→</span>
              </button>
            </div>

            <div className="relative bg-[#0d0d0d] md:bg-[#0d0d0d]/90 backdrop-blur-xl border-x md:border card-border rounded-none md:rounded-3xl w-full h-full md:h-auto md:max-h-[85vh] overflow-hidden workspace-shadow flex flex-col pointer-events-auto">
              {/* Header with Close */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
                <button
                  onClick={onClose}
                  className="p-3 bg-white/[0.05] backdrop-blur-md rounded-xl text-white/50 hover:text-white hover:bg-white/[0.1] transition-all cursor-pointer border border-white/10"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {/* Media Section (Images/Video) */}
                <div className="relative h-[45vh] md:h-[50vh] bg-black flex items-center justify-center overflow-hidden">
                  {project.video ? (
                    <iframe
                      src={project.video.replace("watch?v=", "embed/")}
                      className="w-full h-full"
                      allowFullScreen
                      title={project.title}
                    />
                  ) : (
                    <>
                      <img
                        src={project.images[currentImageIndex]}
                        alt={`${project.title} ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                      
                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); prevImage(); }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 md:p-5 bg-black/40 hover:bg-black/60 text-white/50 hover:text-white rounded-full transition-all border border-white/10 cursor-pointer backdrop-blur-md"
                          >
                            ←
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); nextImage(); }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 md:p-5 bg-black/40 hover:bg-black/60 text-white/50 hover:text-white rounded-full transition-all border border-white/10 cursor-pointer backdrop-blur-md"
                          >
                            →
                          </button>
                          
                          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                            {project.images.map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all ${i === currentImageIndex ? "bg-amber-100/80 w-10" : "bg-white/10 w-4"}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  )}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />
                </div>

                <div className="px-6 md:px-16 pb-40 md:pb-16 md:-mt-12 relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-[1px] bg-amber-200/20" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200/40">
                      Détails du Projet
                    </h4>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-light text-white uppercase tracking-[0.2em] mb-10 leading-tight">
                    {project.title}
                  </h3>

                  <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
                    {project.technologies.map((t: string) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 bg-white/[0.03] text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm border border-white/[0.08]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
                    <div className="lg:col-span-2 space-y-12 text-gray-400">
                      <section>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-6 h-[1px] bg-white/20" />
                          <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                            Description & Architecture
                          </h4>
                        </div>
                        <div className="leading-relaxed text-base whitespace-pre-line font-medium border-l border-white/10 pl-6 md:pl-8">
                          {project.description}
                        </div>
                      </section>
                    </div>

                    <div className="space-y-10">
                      <section>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-6 h-[1px] bg-white/20" />
                          <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
                            Accessibilité
                          </h4>
                        </div>
                        <div className="flex flex-col gap-4">
                          {project.links?.live && project.links.live !== "#" && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between px-8 py-5 bg-white text-black font-black uppercase tracking-[0.1em] text-[10px] md:text-xs rounded-xl hover:bg-amber-100 transition-all shadow-xl"
                            >
                              <span>Live Demo</span>
                              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                          )}
                          {project.links?.github && (
                            project.links.github !== "#" ? (
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between px-8 py-5 bg-white/[0.02] text-white border border-white/10 font-black uppercase tracking-[0.1em] text-[10px] md:text-xs rounded-xl hover:bg-white/[0.05] transition-all"
                              >
                                <span>Repository</span>
                                <span className="text-xl group-hover:translate-x-1 transition-transform">↗</span>
                              </a>
                            ) : (
                              <div className="flex items-center justify-between px-8 py-5 bg-white/[0.01] text-white/20 border border-white/5 font-black uppercase tracking-[0.1em] text-[10px] md:text-xs rounded-xl cursor-not-allowed">
                                <span>Repository Privé</span>
                                <span className="text-lg opacity-20">🔒</span>
                              </div>
                            )
                          )}
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Flèches Projets (Mobile) */}
            <div className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 flex gap-8 z-[230] pointer-events-auto">
              <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="w-14 h-14 flex items-center justify-center bg-black/90 backdrop-blur-2xl border border-white/20 text-white text-2xl font-light rounded-full shadow-2xl active:scale-90 transition-all"
              >
                ←
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="w-14 h-14 flex items-center justify-center bg-black/90 backdrop-blur-2xl border border-white/20 text-white text-2xl font-light rounded-full shadow-2xl active:scale-90 transition-all"
              >
                →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
