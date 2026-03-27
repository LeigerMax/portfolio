"use client";

import { motion, AnimatePresence } from "framer-motion";
import { aboutData } from "@/data/about";
import { Briefcase, GraduationCap } from "lucide-react";

interface ExperienceItem {
  title?: string;
  role?: string;
  company: string;
  period: string;
  description: string;
  tags?: string[];
}

interface EducationItem {
  degree: string;
  school: string;
  period: string;
  description: string;
}

/**
 * "Qui suis-je" overlay — displayed next to the photo frame.
 * Shows only the bio text, aligned to the right of the frame.
 */
export function WhoAmIOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 right-0 w-1/2 h-full pointer-events-none flex items-center justify-start p-12 z-50"
        >
          <div className="max-w-lg pointer-events-auto bg-black/50 backdrop-blur-xl rounded-2xl p-10 border border-white/10 shadow-2xl">
            <h2 className="text-5xl font-black italic text-white mb-6 tracking-tighter uppercase">
              {aboutData.bio.title}
            </h2>
            <p className="text-lg text-blue-100/90 leading-relaxed font-light">
              {aboutData.bio.content}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * "Mon Parcours" overlay — displayed when viewing the window/left wall area.
 * Shows experience + education timelines side by side.
 */
export function ParcoursOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center p-10 z-50"
        >
          <div className="max-w-4xl w-full pointer-events-auto bg-black/50 backdrop-blur-xl rounded-2xl p-10 border border-white/10 shadow-2xl overflow-y-auto max-h-[85vh]">
            <h2 className="text-5xl font-black italic text-white mb-10 tracking-tighter uppercase text-center">
              Mon Parcours
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* EXPERIENCE */}
              <section>
                <h3 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
                  <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                    <Briefcase size={20} />
                  </span>
                  Expérience Professionnelle
                </h3>
                <div className="space-y-6">
                  {aboutData.experience.map((exp: ExperienceItem, i: number) => (
                    <div key={i} className="relative pl-6 border-l-2 border-purple-500/30 group">
                      <div className="absolute left-[-6px] top-2 w-[10px] h-[10px] bg-purple-500 rounded-full group-hover:scale-125 transition-transform" />
                      <div className="text-sm font-bold text-white mb-0.5">{exp.role || exp.title}</div>
                      <div className="text-sm text-purple-300 mb-2">{exp.company} • {exp.period}</div>
                      <p className="text-sm text-blue-100/70 mb-3">{exp.description}</p>
                      {exp.tags && (
                        <div className="flex gap-2">
                          {exp.tags.map((tag: string) => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 rounded uppercase text-white/50">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* EDUCATION */}
              <section>
                <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                  <span className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                    <GraduationCap size={20} />
                  </span>
                  Formation
                </h3>
                <div className="space-y-6">
                  {aboutData.education.map((edu: EducationItem, i: number) => (
                    <div key={i} className="relative pl-6 border-l-2 border-emerald-500/30 group">
                      <div className="absolute left-[-6px] top-2 w-[10px] h-[10px] bg-emerald-500 rounded-full group-hover:scale-125 transition-transform" />
                      <h4 className="font-bold text-white text-lg leading-tight">{edu.degree}</h4>
                      <div className="text-sm text-emerald-300 mb-2">{edu.school} • {edu.period}</div>
                      <p className="text-sm text-blue-100/70">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
