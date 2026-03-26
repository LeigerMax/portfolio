"use client";

import { useState } from "react";
import { projects } from "@/data/projects";

export function ProjectGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const itemsPerPage = 6;
  const pages = Math.ceil(projects.length / itemsPerPage);

  const currentProjects = projects.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="w-full max-w-6xl px-4">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter">Mes Projets</h2>
          <div className="h-2 w-24 bg-orange-500 mt-2"></div>
        </div>
        
        {pages > 1 && (
          <div className="flex gap-4 mb-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="p-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-orange-500/20 transition-all disabled:opacity-20"
            >
              ←
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(pages - 1, p + 1))}
              disabled={currentPage === pages - 1}
              className="p-3 bg-white/5 border border-white/10 text-white rounded-full hover:bg-orange-500/20 transition-all disabled:opacity-20"
            >
              →
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProjects.map((project, idx) => (
          <div 
            key={idx}
            onClick={() => setSelectedProject(project)}
            className="group relative h-64 bg-black/40 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-orange-500/50 transition-all hover:-translate-y-2"
          >
            {/* Project Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
              <h3 className="text-2xl font-black text-white uppercase mb-2 group-hover:text-orange-400 transition-colors">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4 opacity-70">
                {project.tech.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] uppercase font-bold tracking-widest text-orange-500/80 border border-orange-500/30 px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-400 line-clamp-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {project.description}
              </p>
            </div>
            {/* Hover Indicator */}
            <div className="absolute top-6 right-6 p-2 bg-orange-500 rounded-full scale-0 group-hover:scale-100 transition-transform">
              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          <div className="relative bg-[#111] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 flex items-center justify-center">
                 <div className="w-48 h-48 bg-orange-500/20 rounded-3xl border border-orange-500/30 flex items-center justify-center">
                    <span className="text-8xl">🚀</span>
                 </div>
              </div>

              <div className="p-12">
                <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
                    {selectedProject.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tech.map((t: string) => (
                      <span key={t} className="px-3 py-1 bg-white/5 text-gray-300 text-xs font-bold uppercase tracking-widest rounded-full border border-white/10">
                        {t}
                      </span>
                    ))}
                </div>

                <div className="space-y-8">
                    <div>
                        <h4 className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-3">Le Projet</h4>
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {selectedProject.description}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-3">Architecture & Défis</h4>
                        <p className="text-gray-300 leading-relaxed italic">
                            {selectedProject.challenges}
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <a href={selectedProject.links.live} className="flex-1 py-4 bg-orange-500 text-black font-black uppercase tracking-tighter text-center rounded-xl hover:bg-orange-400 transition-colors">
                            Voir le Live
                        </a>
                        <a href={selectedProject.links.github} className="px-6 py-4 bg-white/5 text-white border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-colors">
                            GitHub
                        </a>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
