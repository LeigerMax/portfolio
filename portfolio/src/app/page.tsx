"use client";

import Experience from "@/components/three/Experience";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [showProjects, setShowProjects] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    // Trigger pour les projets (Écran PC)
    ScrollTrigger.create({
      trigger: "#projects-section",
      start: "top 20%",
      end: "bottom 80%",
      onEnter: () => setShowProjects(true),
      onLeaveBack: () => setShowProjects(false),
      onLeave: () => setShowProjects(false),
      onEnterBack: () => setShowProjects(true),
    });

    // Trigger pour le contact (Smartphone)
    ScrollTrigger.create({
      trigger: "#contact-section",
      start: "top 20%",
      onEnter: () => setShowContact(true),
      onLeaveBack: () => setShowContact(false),
    });
  }, []);

  return (
    <main className="relative h-[500vh]">
      {/* 3D Scene */}
      <Experience />

      {/* UI Scroll Container */}
      <div className="relative z-10 w-full">
        {/* Section 1: Hero (Plan d'ensemble) */}
        <section className="h-screen flex flex-col items-center justify-center p-8 pointer-events-none">
          <div className="bg-black/40 backdrop-blur-md p-12 border border-white/10 rounded-2xl pointer-events-auto text-center">
            <h1 className="text-8xl font-black text-white mb-2 uppercase tracking-tighter italic">
              Maxime Allemeersch
            </h1>
            <p className="text-2xl text-orange-400 font-mono uppercase tracking-[0.2em] mb-4">
              Software Engineer
            </p>
            <p className="text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
              Développeur passionné et polyvalent, spécialisé dans la création de solutions complètes, du front-end aux architectures cloud.
            </p>
            <div className="animate-bounce text-white/50 font-mono text-sm uppercase tracking-widest">
              Scrollez pour explorer mon espace
            </div>
          </div>
        </section>

        {/* Section 2: Skills (Carnet) */}
        <section className="h-screen flex items-center justify-start p-20 pointer-events-none">
          <div className="max-w-2xl bg-black/60 backdrop-blur-xl p-10 border border-white/10 rounded-3xl pointer-events-auto shadow-2xl">
            <h2 className="text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">La Bibliothèque des Compétences</h2>
            
            <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                    <h3 className="text-blue-400 font-bold uppercase mb-3 tracking-widest border-b border-blue-400/30 pb-1">Langages</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Java", "Python", "JavaScript", "TypeScript", "PHP", "C#", "Haskell"].map(s => (
                            <span key={s} className="text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">{s}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-green-400 font-bold uppercase mb-3 tracking-widest border-b border-green-400/30 pb-1">Frameworks & Web</h3>
                    <div className="flex flex-wrap gap-2">
                        {["React", "Node.js", "Next.js", "Angular", "jQuery", "Flutter", "HTML", "CSS"].map(s => (
                            <span key={s} className="text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">{s}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-yellow-400 font-bold uppercase mb-3 tracking-widest border-b border-yellow-400/30 pb-1">Bases de données</h3>
                    <div className="flex flex-wrap gap-2">
                        {["MySQL", "PostgreSQL"].map(s => (
                            <span key={s} className="text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">{s}</span>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-red-400 font-bold uppercase mb-3 tracking-widest border-b border-red-400/30 pb-1">Outils & Environnements</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Git", "GitHub", "Linux", "Docker", "Jira", "WordPress"].map(s => (
                            <span key={s} className="text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">{s}</span>
                        ))}
                    </div>
                </div>
                <div className="col-span-2">
                    <h3 className="text-orange-400 font-bold uppercase mb-3 tracking-widest border-b border-orange-400/30 pb-1">Méthodologies & Systèmes</h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                          "Agile", "Scrum", "OOP", "REST API", "Tailwind CSS", 
                          "Windows Server", "Administration réseau", "Packet Tracer"
                        ].map(s => (
                            <span key={s} className="text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/10">{s}</span>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Section 3: Certificats (Panneau en liège) */}
        <section className="h-screen flex items-center justify-end p-20 pointer-events-none">
          <div className="max-w-md bg-black/40 backdrop-blur-md p-8 border border-white/10 rounded-2xl pointer-events-auto">
            <h2 className="text-4xl font-black text-white mb-4 uppercase italic">Certifications</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Formations certifiantes en conteneurisation (Red Hat OpenShift), développement web moderne et création interactive avec Unity.
            </p>
          </div>
        </section>

        {/* Section 4: Projets (Écran PC) */}
        <section id="projects-section" className="h-screen flex items-center justify-center p-8 pointer-events-none">
          <div className={`w-full flex justify-center transition-all duration-700 transform ${showProjects ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
             <ProjectGrid />
          </div>
        </section>

        {/* Section 5: Contact (Smartphone) */}
        <section id="contact-section" className="h-screen flex items-center justify-end p-20 pointer-events-none">
          <div className={`max-w-md bg-black/60 backdrop-blur-xl p-10 border border-white/10 rounded-3xl transition-all duration-700 transform ${showContact ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
            <h2 className="text-4xl font-black text-white mb-6 uppercase italic">Restons en contact</h2>
            <p className="text-gray-300 text-lg mb-8">
              Prêt à discuter de votre prochain projet ou d'une opportunité ?
            </p>
            <ContactButtons />
          </div>
        </section>
      </div>
    </main>
  );
}