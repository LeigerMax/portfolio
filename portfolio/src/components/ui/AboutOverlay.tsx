"use client";

import { motion, AnimatePresence } from "framer-motion";
import { aboutData } from "@/data/about";
import { Briefcase, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ExperienceItem {
  roleKey?: string;
  company: string;
  periodKey: string;
  descriptionKey: string;
  tags?: string[];
}

interface EducationItem {
  degreeKey: string;
  school: string;
  periodKey: string;
  descriptionKey: string;
}

/**
 * "Qui suis-je" overlay — displayed next to the photo frame.
 * Shows only the bio text, aligned to the right of the frame.
 */
export function WhoAmIOverlay({ visible, isInline = false }: { visible: boolean; isInline?: boolean }) {
  const { t } = useTranslation();
  const content = (
    <div className={`w-full pointer-events-auto relative overflow-hidden ${isInline ? "px-2" : "max-w-2xl bg-[#0d0d0d]/80 backdrop-blur-md border card-border rounded-xl p-8 md:p-12 workspace-shadow"}`}>
      {/* Subtle texture overlay - only on non-inline */}
      {!isInline && <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-paper-grain" />}

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-[1px] bg-white/20" />
          <h2 className="text-xl md:text-3xl font-light text-white tracking-[0.2em] uppercase">
            {t('about.whoAmI')}
          </h2>
        </div>
        <p className="text-base text-gray-400 leading-relaxed font-medium">
          {t('about.bio')}
        </p>
      </div>
    </div>
  );

  if (isInline) return content;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 right-0 w-full md:w-1/2 h-full pointer-events-none flex items-center justify-start p-6 md:p-12 z-50"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ParcoursOverlay({ visible, isInline = false }: { visible: boolean; isInline?: boolean }) {
  const { t } = useTranslation();
  const content = (
    <div className={`w-full pointer-events-auto relative overflow-hidden ${isInline ? "px-2" : "max-w-7xl bg-[#0d0d0d]/80 backdrop-blur-md border card-border rounded-xl p-6 md:p-12 workspace-shadow max-h-[90vh] md:max-h-[80vh] overflow-y-auto custom-scrollbar"}`}>
      {/* Subtle texture overlay - only on non-inline */}
      {!isInline && <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-paper-grain" />}

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-6 mb-10 md:mb-20">
          <div className="w-8 md:w-16 h-[1px] bg-white/10" />
          <h2 className="text-xl md:text-4xl font-light text-white tracking-[0.25em] uppercase text-center">
            {t('about.parcours')}
          </h2>
          <div className="w-8 md:w-16 h-[1px] bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* EXPERIENCE */}
          <section>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-2.5 bg-white/[0.03] border card-border rounded-lg text-gray-400">
                <Briefcase size={22} />
              </div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.25em]">
                {t('about.exp_prof')}
              </h3>
            </div>

            <div className="space-y-12">
              {aboutData.experience.map((exp: ExperienceItem, i: number) => (
                <div key={i} className="relative pl-10 border-l border-white/10 group">
                  <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-black border border-white/20 rounded-full group-hover:border-amber-200/50 transition-colors" />
                  <div className="text-sm font-bold text-white mb-1.5 group-hover:text-amber-100/90 transition-colors">{t(exp.roleKey || '')}</div>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-amber-200/40 mb-4">{exp.company} • {t(exp.periodKey || '')}</div>
                  <p className="text-xs md:text-sm text-gray-400 mb-5 leading-relaxed font-medium">{t(exp.descriptionKey || '')}</p>
                  {exp.tags && (
                    <div className="flex flex-wrap gap-2.5">
                      {exp.tags.map((tag: string) => (
                        <span key={tag} className="text-[9px] px-2 py-0.5 bg-white/[0.03] border border-white/[0.1] rounded-sm uppercase text-gray-600 font-black tracking-widest">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-2.5 bg-white/[0.03] border card-border rounded-lg text-gray-400">
                <GraduationCap size={22} />
              </div>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.25em]">
                {t('about.edu_stud')}
              </h3>
            </div>

            <div className="space-y-12">
              {aboutData.education.map((edu: EducationItem, i: number) => (
                <div key={i} className="relative pl-10 border-l border-white/10 group">
                  <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-black border border-white/20 rounded-full group-hover:border-emerald-200/50 transition-colors" />
                  <h4 className="font-bold text-white text-sm mb-1.5 group-hover:text-emerald-100/90 transition-colors">{t(edu.degreeKey || '')}</h4>
                  <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-emerald-200/40 mb-4">{edu.school} • {t(edu.periodKey || '')}</div>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-medium">{t(edu.descriptionKey || '')}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  if (isInline) return content;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center p-4 md:p-10 z-[60]"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
