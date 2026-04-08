"use client";

import { skillCategories } from "@/data/skills";
import { useTranslation } from "react-i18next";

const colorClasses: Record<string, { accent: string; border: string; bg: string }> = {
  blue: { accent: "text-blue-300", border: "border-blue-300/20", bg: "bg-blue-300/5" },
  green: { accent: "text-emerald-300", border: "border-emerald-300/20", bg: "bg-emerald-300/5" },
  yellow: { accent: "text-amber-300", border: "border-amber-300/20", bg: "bg-amber-300/5" },
  red: { accent: "text-orange-300", border: "border-orange-300/20", bg: "bg-orange-300/5" },
  purple: { accent: "text-yellow-200/60", border: "border-yellow-200/10", bg: "bg-yellow-200/5" },
  cyan: { accent: "text-teal-300", border: "border-teal-300/20", bg: "bg-teal-300/5" },
};

export function SkillsSection({ isInline = false }: { isInline?: boolean }) {
  const { t } = useTranslation();
  const content = (
    <div className={`w-full pointer-events-auto relative overflow-hidden ${isInline ? "px-2" : "max-w-4xl bg-[#0d0d0d]/80 backdrop-blur-md border card-border rounded-xl workspace-shadow py-8 px-6 md:px-12"}`}>
      {/* Subtle texture overlay - only on non-inline */}
      {!isInline && <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-paper-grain" />}
      
      <div className="relative z-10">
        <div className={`flex items-center gap-4 ${isInline ? "mb-6" : "mb-10"}`}>
          <div className={`${isInline ? "w-8" : "w-12"} h-[1px] bg-white/20`} />
          <h2 className={`${isInline ? "text-sm" : "text-xl md:text-4xl"} font-light text-white tracking-[0.2em] uppercase`}>
            {t('about.skills')}
          </h2>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${isInline ? "gap-x-8 gap-y-6" : "gap-x-16 gap-y-8 md:gap-y-12 text-base"}`}>
          {skillCategories.map((category) => (
            <div 
              key={category.titleKey} 
              className="group"
            >
              <h3 className={`${colorClasses[category.color].accent} ${isInline ? "text-[10px]" : "text-xs"} font-black uppercase ${isInline ? "mb-3" : "mb-5"} tracking-[0.3em] flex items-center gap-3`}>
                <span className={`${isInline ? "w-1.5 h-1.5" : "w-2 h-2"} rounded-full ${colorClasses[category.color].bg} border ${colorClasses[category.color].border}`} />
                {t(category.titleKey)}
              </h3>
              <div className={`flex flex-wrap ${isInline ? "gap-2" : "gap-3"}`}>
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`${isInline ? "text-[11px] px-2 py-1" : "text-sm font-medium tracking-wide bg-white/[0.03] px-3 py-1.5"} text-gray-300 rounded-sm border border-white/[0.08] group-hover:border-white/20 transition-colors`}
                  >
                    {skill.includes('.') ? t(skill) : skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isInline) return content;

  return (
    <section className="h-screen flex items-center justify-center md:justify-start p-6 md:p-20 pointer-events-none snap-center">
      {content}
    </section>
  );
}
