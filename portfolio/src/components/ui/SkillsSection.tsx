"use client";

import { skillCategories, SkillCategory } from "@/data/skills";

const colorClasses: Record<string, { accent: string; border: string }> = {
  blue: { accent: "text-blue-400", border: "border-blue-400/30" },
  green: { accent: "text-green-400", border: "border-green-400/30" },
  yellow: { accent: "text-yellow-400", border: "border-yellow-400/30" },
  red: { accent: "text-red-400", border: "border-red-400/30" },
  purple: { accent: "text-purple-400", border: "border-purple-400/30" },
};

export function SkillsSection() {
  return (
    <section className="h-screen flex items-center justify-start p-20 pointer-events-none">
      <div className="max-w-2xl bg-black/60 backdrop-blur-xl p-10 border border-white/10 rounded-3xl pointer-events-auto shadow-2xl">
        <h2 className="text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
          La Bibliothèque des Compétences
        </h2>

        <div className="grid grid-cols-2 gap-8 text-sm">
          {skillCategories.map((category) => (
            <div 
              key={category.title} 
              className={category.title === "Méthodologies & Systèmes" ? "col-span-2" : ""}
            >
              <h3 className={`${colorClasses[category.color].accent} font-bold uppercase mb-3 tracking-widest border-b ${colorClasses[category.color].border} pb-1`}>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
