"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { Project } from "@/types";

export function ProjectGrid({ isMinimal = false }: { isMinimal?: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = isMinimal ? 3 : 3; // On garde 3 car c'est déjà optimisé

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % projects.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + projects.length) % projects.length);
    }
  };

  return (
    <div id="projects" className={`w-full ${isMinimal ? "max-w-[1400px] pt-4" : "max-w-[1400px] pt-20"} px-4`}>
      {/* Titre - Uniquement si PAS minimal */}
      {!isMinimal && (
        <div className="mb-16 flex items-center gap-4">
          <div className="w-12 h-[1px] bg-white/20" />
          <h2 className="text-3xl font-light text-white tracking-[0.2em] uppercase">
            Projets Sélectionnés
          </h2>
        </div>
      )}

      {/* Grille de projets */}
      <div className={`grid grid-cols-1 md:grid-cols-3 ${isMinimal ? "gap-8" : "gap-12"}`}>
        {currentProjects.map((project, idx) => (
          <div
            key={idx}
            className="group bg-[#0d0d0d]/80 backdrop-blur-md border card-border rounded-xl overflow-hidden hover:border-white/20 transition-all duration-500 workspace-shadow flex flex-col relative"
          >
            {/* Subtle texture overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-paper-grain" />

            {/* Image du projet */}
            <div className="relative h-56 bg-[#151515] overflow-hidden border-b card-border">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 grayscale-[20%] group-hover:grayscale-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* Contenu */}
            <div className="p-10 flex flex-col flex-1 relative z-10">
              {/* Titre */}
              <h3 className="text-xl font-bold text-white tracking-tight mb-5 group-hover:text-amber-200/80 transition-colors">
                {project.title}
              </h3>

              {/* Technos */}
              <div className="flex flex-wrap gap-2.5 mb-8">
                {project.technologies.map((t: string) => (
                  <span key={t} className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-400 bg-white/[0.05] border border-white/[0.1] px-3 py-1 rounded-sm">
                    {t}
                  </span>
                ))}
              </div>

              {/* Description courte */}
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-10 flex-1 font-medium">
                {project.description}
              </p>

              {/* Bouton Découvrir */}
              <button
                onClick={() => setSelectedIndex(startIndex + idx)}
                className="group/btn relative w-full py-4 bg-white/[0.02] border border-white/10 text-white text-xs font-black uppercase tracking-[0.25em] rounded-lg hover:bg-white hover:text-black transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Détails du projet
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-16">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-3 bg-[#0d0d0d] border card-border rounded-xl text-white/40 disabled:opacity-5 hover:text-white hover:border-white/20 transition-all cursor-pointer"
          >
            ←
          </button>

          <div className="flex gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold transition-all cursor-pointer border ${currentPage === i + 1
                  ? "bg-white border-white text-black workspace-shadow"
                  : "bg-[#0d0d0d] border card-border text-white/40 hover:text-white hover:border-white/20"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-3 bg-[#0d0d0d] border card-border rounded-xl text-white/40 disabled:opacity-5 hover:text-white hover:border-white/20 transition-all cursor-pointer"
          >
            →
          </button>
        </div>
      )}

      {/* MODAL DÉTAIL */}
      <ProjectModal 
        project={selectedIndex !== null ? projects[selectedIndex] : null} 
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}