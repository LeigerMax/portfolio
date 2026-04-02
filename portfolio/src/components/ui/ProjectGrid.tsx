import { useState, memo } from "react";
import { projects } from "@/data/projects";
import { ProjectModal } from "./ProjectModal";
import { Project } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

const ProjectCard = memo(({ 
  project, 
  isMinimal, 
  startIndex, 
  idx, 
  currentPage, 
  onSelect,
  onNext,
  onPrev
}: { 
  project: Project, 
  isMinimal: boolean, 
  startIndex: number, 
  idx: number, 
  currentPage: number,
  onSelect: (index: number) => void,
  onNext: () => void,
  onPrev: () => void
}) => {
  return (
    <motion.div
      key={project.id || `${currentPage}-${idx}`}
      initial={isMinimal ? { opacity: 0, x: 20 } : {}}
      animate={isMinimal ? { opacity: 1, x: 0 } : {}}
      exit={isMinimal ? { opacity: 0, x: -20 } : {}}
      transition={{ duration: 0.4 }}
      drag={isMinimal ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(e, { offset }) => {
        const sweep = offset.x;
        if (sweep < -50) onNext();
        else if (sweep > 50) onPrev();
      }}
      className={`group overflow-hidden transition-all duration-500 flex flex-col relative touch-none ${isMinimal ? "bg-white/[0.03] border border-white/10 rounded-[2rem] p-4 md:p-8 cursor-grab active:cursor-grabbing" : "bg-[#0d0d0d]/80 backdrop-blur-md border card-border rounded-xl workspace-shadow"}`}
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-paper-grain" />

      {/* Image du projet / Spacing mb-12 for mobile */}
      <div className={`relative h-48 md:h-56 bg-[#151515] overflow-hidden ${isMinimal ? "rounded-2xl mb-12" : "border-b card-border"}`}>
        <img
          src={project.images[0]}
          alt={`Aperçu de l'interface du projet ${project.title} - Réalisé avec ${project.technologies.slice(0, 3).join(", ")}`}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 grayscale-[20%] group-hover:grayscale-0"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Contenu - More padding for mobile */}
      <div className={`${isMinimal ? "p-4 pb-8" : "p-6 md:p-10"} flex flex-col flex-1 relative z-10`}>
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
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-10 flex-1 font-medium">
          {project.description}
        </p>

        {/* Bouton Détails - Fixé par wrapper focusable */}
        <div className="mt-auto pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(startIndex + idx);
            }}
            aria-label={`Voir les détails détaillés du projet ${project.title}`}
            className="group/btn relative w-full py-4 bg-white/[0.02] border border-white/10 text-white text-[10px] md:text-xs font-black uppercase tracking-[0.25em] rounded-xl hover:bg-white hover:text-black transition-all duration-300 cursor-pointer overflow-hidden active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Détails du projet
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

export function ProjectGrid({ isMinimal = false }: { isMinimal?: boolean }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = isMinimal ? 1 : 3; 

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);

  const goToNext = () => {
    setCurrentPage((p) => (p % totalPages) + 1);
  };

  const goToPrev = () => {
    setCurrentPage((p) => (p === 1 ? totalPages : p - 1));
  };

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
    <div id="projects" className={`w-full ${isMinimal ? "max-w-[1400px] pt-4" : "max-w-[1400px] pt-20"} px-4 pointer-events-auto relative z-20`}>
      {/* Titre - Uniquement si PAS minimal */}
      {!isMinimal && (
        <div className="mb-10 md:mb-16 flex items-center gap-4">
          <div className="w-8 md:w-12 h-[1px] bg-white/20" />
          <h2 className="text-xl md:text-3xl font-light text-white tracking-[0.2em] uppercase">
            Projets Sélectionnés
          </h2>
        </div>
      )}

      {/* Grille de projets / Carousel */}
      <div className="relative group/carousel">
        <div className={`grid grid-cols-1 md:grid-cols-3 ${isMinimal ? "gap-0" : "gap-12"}`}>
          <AnimatePresence mode="wait">
            {currentProjects.map((project, idx) => (
              <ProjectCard 
                key={project.id || `${currentPage}-${idx}`}
                project={project}
                isMinimal={isMinimal}
                startIndex={startIndex}
                idx={idx}
                currentPage={currentPage}
                onSelect={setSelectedIndex}
                onNext={goToNext}
                onPrev={goToPrev}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Flèches (Mobile Only) */}
        {isMinimal && totalPages > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-[-10px] top-[140px] -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all z-[40] active:scale-90 cursor-pointer pointer-events-auto"
            >
              ←
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-[-10px] top-[140px] -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all z-[40] active:scale-90 cursor-pointer pointer-events-auto"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Pagination dots (Mobile Only) */}
      {isMinimal && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8 pb-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-2 h-2 rounded-full transition-all ${currentPage === i + 1 ? "bg-white w-6" : "bg-white/20"}`}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls (Desktop Only) */}
      {!isMinimal && totalPages > 1 && (
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

      {/* MODAL DÉTAIL EN PORTAL POUR ÉVITER LES PROBLÈMES DE Z-INDEX MOBILE */}
      {typeof document !== "undefined" && createPortal(
        <ProjectModal 
          project={selectedIndex !== null ? projects[selectedIndex] : null} 
          onClose={() => setSelectedIndex(null)}
          onNext={handleNext}
          onPrev={handlePrev}
        />,
        document.body
      )}
    </div>
  );
}