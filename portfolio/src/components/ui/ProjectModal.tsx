"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onNext, onPrev, onClose]);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer z-[110]" 
        onClick={onClose} 
      />
      
      {/* Wrapper pour le contenu et les flèches desk */}
      <div className="relative w-full max-w-5xl z-[120] flex items-center justify-center pointer-events-none px-4">
        
        {/* Navigation Flèches Projets (Desktop) */}
        <div className="hidden lg:block absolute -left-24 top-1/2 -translate-y-1/2 pointer-events-auto">
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="p-6 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-full transition-all border border-white/10 cursor-pointer group backdrop-blur-xl"
            title="Projet Précédent"
          >
            <span className="text-4xl group-hover:-translate-x-1 transition-transform block">←</span>
          </button>
        </div>

        <div className="hidden lg:block absolute -right-24 top-1/2 -translate-y-1/2 pointer-events-auto">
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="p-6 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-full transition-all border border-white/10 cursor-pointer group backdrop-blur-xl"
            title="Projet Suivant"
          >
            <span className="text-4xl group-hover:translate-x-1 transition-transform block">→</span>
          </button>
        </div>

        <div className="relative bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] w-full max-h-[92vh] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto">
          {/* Header with Close */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={onClose}
            className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white/50 hover:text-white hover:bg-black/80 transition-all cursor-pointer border border-white/10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Media Section (Images/Video) */}
          <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all border border-white/10 cursor-pointer"
                    >
                      ←
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all border border-white/10 cursor-pointer"
                    >
                      →
                    </button>
                    
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.images.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all ${i === currentImageIndex ? "bg-purple-500 w-6" : "bg-white/30"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
          </div>

          <div className="px-6 md:px-12 pb-12 -mt-16 relative">
            <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">
              {project.title}
            </h3>

            <div className="flex flex-wrap gap-2 mb-10">
              {project.technologies.map((t: string) => (
                <span
                  key={t}
                  className="px-4 py-1.5 bg-purple-500/10 text-purple-400 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-10">
                <section>
                  <h4 className="text-purple-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-purple-500/50"></span>
                    Le Concept
                  </h4>
                  <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-line font-medium border-l-2 border-white/5 pl-6">
                    {project.description}
                  </div>
                </section>
              </div>

              <div className="space-y-6">
                <h4 className="text-purple-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-purple-500/50"></span>
                  Liens
                </h4>
                <div className="flex flex-col gap-3">
                  {project.links?.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between px-6 py-4 bg-purple-500 text-black font-black uppercase tracking-tighter text-sm rounded-2xl hover:bg-purple-400 transition-all"
                    >
                      <span>Voir le Live</span>
                      <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  )}
                  {project.links?.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between px-6 py-4 bg-white/5 text-white border border-white/10 font-bold uppercase tracking-tighter text-sm rounded-2xl hover:bg-white/10 transition-all"
                    >
                      <span>Code Source</span>
                      <span className="text-xl group-hover:translate-x-1 transition-transform">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Navigation Flèches Projets (Mobile) */}
      <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-[110]">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="p-4 bg-black/80 backdrop-blur-lg border border-white/10 text-white rounded-2xl shadow-2xl"
        >
          ← Précédent
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="p-4 bg-black/80 backdrop-blur-lg border border-white/10 text-white rounded-2xl shadow-2xl"
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
