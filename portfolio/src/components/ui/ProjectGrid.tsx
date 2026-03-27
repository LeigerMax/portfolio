"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { Project } from "@/types";

export function ProjectGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

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
    <div id="projects" className="w-full max-w-6xl px-4">
      {/* Titre */}
      <div className="mb-10">
        <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">Mes Projets</h2>
        <div className="h-2 w-24 bg-purple-500 mt-2"></div>
      </div>

      {/* Grille de projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project, idx) => (
          <div
            key={idx}
            className="group bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.15)] flex flex-col"
          >
            {/* Image du projet */}
            <div className="relative h-44 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                onError={(e) => {
                  // Fallback si l'image n'existe pas encore
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Overlay dégradé */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Contenu */}
            <div className="p-6 flex flex-col flex-1">
              {/* Titre */}
              <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-purple-400 transition-colors">
                {project.title}
              </h3>

              {/* Technos */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.technologies.map((t: string) => (
                  <span key={t} className="text-[10px] uppercase font-bold tracking-wider text-purple-400/80 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              {/* Description courte */}
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-5 flex-1">
                {project.description}
              </p>

              {/* Bouton Découvrir */}
              <button
                onClick={() => setSelectedIndex(startIndex + idx)}
                className="w-full py-2.5 bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-purple-500 hover:border-purple-500 hover:text-black transition-all duration-300 cursor-pointer"
              >
                Découvrir →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white disabled:opacity-20 hover:bg-purple-500/20 hover:border-purple-500/30 transition-all cursor-pointer"
          >
            ←
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1);
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-10 h-10 rounded-xl font-bold transition-all cursor-pointer border ${currentPage === i + 1
                  ? "bg-purple-500 border-purple-500 text-black shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setCurrentPage(p => Math.min(totalPages, p + 1));
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white disabled:opacity-20 hover:bg-purple-500/20 hover:border-purple-500/30 transition-all cursor-pointer"
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