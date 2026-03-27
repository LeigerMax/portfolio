"use client";

import Experience from "@/components/three/Experience";
import { WhoAmIOverlay, ParcoursOverlay } from "@/components/ui/AboutOverlay";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { CertificatesOverlay } from "@/components/ui/CertificatesOverlay";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { Hero } from "@/components/ui/Hero";
import { SkillsSection } from "@/components/ui/SkillsSection";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [showWhoAmI, setShowWhoAmI] = useState(false);
  const [showParcours, setShowParcours] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // État pour masquer l'UI et passer en mode libre
  const [isUIVisible, setIsUIVisible] = useState(true);

  // Écouteur de touches (une seule fois au montage)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "v" || e.key === "Escape") {
        setIsUIVisible(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Gestion des ScrollTriggers (re-synchronisés sur toggle UI)
  useEffect(() => {
    if (!isUIVisible) {
      // Nettoyage complet quand on passe en mode libre
      ScrollTrigger.getAll().forEach(t => t.kill());
      setShowWhoAmI(false);
      setShowParcours(false);
      setShowCerts(false);
      setShowProjects(false);
      setShowContact(false);
      return;
    }

    // Attendre un peu que le DOM se mette à jour avant de ré-init
    const timeout = setTimeout(() => {
      // Trigger pour "Qui suis-je"
      ScrollTrigger.create({
        trigger: "#whoami-section",
        start: "top center",
        end: "bottom center",
        onEnter: () => setShowWhoAmI(true),
        onLeave: () => setShowWhoAmI(false),
        onEnterBack: () => setShowWhoAmI(true),
        onLeaveBack: () => setShowWhoAmI(false),
      });

      // Trigger pour "Mon Parcours"
      ScrollTrigger.create({
        trigger: "#parcours-section",
        start: "top center",
        end: "bottom center",
        onEnter: () => setShowParcours(true),
        onLeave: () => setShowParcours(false),
        onEnterBack: () => setShowParcours(true),
        onLeaveBack: () => setShowParcours(false),
      });

      // Trigger pour les certificats
      ScrollTrigger.create({
        trigger: "#certs-section",
        start: "top center",
        end: "bottom center",
        onEnter: () => setShowCerts(true),
        onLeave: () => setShowCerts(false),
        onEnterBack: () => setShowCerts(true),
        onLeaveBack: () => setShowCerts(false),
      });

      // Trigger pour les projets
      ScrollTrigger.create({
        trigger: "#projects-section",
        start: "top center",
        end: "bottom center",
        onEnter: () => setShowProjects(true),
        onLeave: () => setShowProjects(false),
        onEnterBack: () => setShowProjects(true),
        onLeaveBack: () => setShowProjects(false),
      });

      // Trigger pour le contact
      ScrollTrigger.create({
        trigger: "#contact-section",
        start: "top 20%",
        onEnter: () => setShowContact(true),
        onLeaveBack: () => setShowContact(false),
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isUIVisible]);

  return (
    <main className={`relative ${isUIVisible ? "h-[700vh]" : "h-screen overflow-hidden"} transition-all duration-500 pointer-events-none`}>
      {/* 3D Scene */}
      <Experience isUIVisible={isUIVisible} />

      {/* BOUTON TOGGLE UI */}
      <button
        onClick={() => setIsUIVisible(!isUIVisible)}
        className="fixed bottom-8 left-8 z-[100] bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-mono text-sm uppercase tracking-widest hover:bg-white/20 transition-all pointer-events-auto shadow-2xl"
      >
        {isUIVisible ? "[V] Mode Libre" : "[V] Retour au Scroll"}
      </button>

      {/* Overlays */}
      <div className={`transition-opacity duration-500 z-[5] pointer-events-none ${isUIVisible ? "opacity-100" : "opacity-0"}`}>
        <WhoAmIOverlay visible={showWhoAmI} />
        <ParcoursOverlay visible={showParcours} />
        <CertificatesOverlay visible={showCerts} />
      </div>

      {/* UI Scroll Container */}
      <div className={`relative z-10 w-full transition-opacity duration-500 pointer-events-none ${isUIVisible ? "opacity-100" : "opacity-0"}`}>
        <Hero />

        <section id="whoami-section" className="h-screen pointer-events-none" />
        <section id="parcours-section" className="h-screen pointer-events-none" />

        <SkillsSection />

        <section id="certs-section" className="h-screen flex items-center justify-end p-20 pointer-events-none">
          <div className="max-w-md bg-black/40 backdrop-blur-md p-8 border border-white/10 rounded-2xl pointer-events-auto">
            <h2 className="text-4xl font-black text-white mb-4 uppercase italic">Certifications</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Formations certifiantes en conteneurisation (Red Hat OpenShift), développement web moderne et création interactive avec Unity.
            </p>
          </div>
        </section>

        <section id="projects-section" className="h-screen flex items-center justify-center p-8 pointer-events-none">
          <div className={`w-full flex justify-center transition-all duration-700 transform ${showProjects ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <ProjectGrid />
          </div>
        </section>

        <section id="contact-section" className="h-[100vh] flex items-center justify-end p-20 pointer-events-none">
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