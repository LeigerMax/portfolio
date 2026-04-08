"use client";

import Experience from "@/components/three/Experience";
import { WhoAmIOverlay, ParcoursOverlay } from "@/components/ui/AboutOverlay";
import { ProjectGrid } from "@/components/ui/ProjectGrid";
import { CertificatesOverlay } from "@/components/ui/CertificatesOverlay";
import { ContactButtons } from "@/components/ui/ContactButtons";
import { Hero } from "@/components/ui/Hero";
import { SkillsSection } from "@/components/ui/SkillsSection";
import { MobilePortfolio } from "@/components/ui/MobilePortfolio";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { t } = useTranslation();
  const [showWhoAmI, setShowWhoAmI] = useState(false);
  const [showParcours, setShowParcours] = useState(false);
  const [showCerts, setShowCerts] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // État pour masquer l'UI et passer en mode libre
  const [isUIVisible, setIsUIVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    if (!isUIVisible || isMobile) {
      // Nettoyage complet quand on passe en mode libre ou sur mobile (où on utilise le scroll natif)
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
  }, [isUIVisible, isMobile]);

  return (
    <main className={`relative ${isUIVisible ? (isMobile ? "h-auto" : "h-[700vh]") : "h-screen overflow-hidden"} transition-all duration-500 pointer-events-none`}>
      {/* 3D Scene */}
      <Experience isUIVisible={isUIVisible} />

      {/* BOUTON TOGGLE UI */}
      <button
        onClick={() => setIsUIVisible(!isUIVisible)}
        className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[100] bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-mono text-[10px] md:text-sm uppercase tracking-widest hover:bg-white/20 transition-all pointer-events-auto shadow-2xl"
      >
        {isUIVisible ? t('hero.modeLibre') : t('hero.retourScroll')}
      </button>

      {/* SELECTEUR DE LANGUE */}
      <LanguageSwitcher />

      {isMobile && isUIVisible ? (
        /* UI Mobile - Cadre Unique */
        <MobilePortfolio />
      ) : (
        /* UI Desktop / Tablette */
        <>
          {/* Overlays - Uniquement sur Desktop/Tablet */}
          <div className={`transition-opacity duration-500 z-[50] pointer-events-none ${isUIVisible ? "opacity-100" : "opacity-0"}`}>
            <WhoAmIOverlay visible={showWhoAmI} />
            <ParcoursOverlay visible={showParcours} />
            <CertificatesOverlay visible={showCerts} />
          </div>

          {/* UI Scroll Container */}
          <div className={`relative z-10 w-full transition-opacity duration-500 pointer-events-none ${isUIVisible ? "opacity-100" : "opacity-0"}`}>
            <Hero />

            <section id="whoami-section" className="h-screen pointer-events-none snap-center" />
            <section id="parcours-section" className="h-screen pointer-events-none snap-center" />

            <div className="pointer-events-auto">
              <SkillsSection />
            </div>
            
            <section id="certs-section" className="h-screen pointer-events-none snap-center" />

            <section id="projects-section" className="h-screen flex items-center justify-center p-4 md:p-8 pointer-events-none snap-center">
              <div className={`w-full flex justify-center transition-all duration-700 transform ${showProjects ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <ProjectGrid />
              </div>
            </section>

            <section id="contact-section" className="h-[100vh] flex items-center justify-center md:justify-end p-6 md:p-20 pointer-events-none snap-center">
              <div className={`max-w-md w-full pointer-events-auto bg-[#0d0d0d]/80 backdrop-blur-md border card-border rounded-xl p-8 md:p-12 workspace-shadow relative overflow-hidden transition-all duration-700 transform ${showContact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                {/* Subtle texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-paper-grain" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-[1px] bg-white/20" />
                    <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">
                      {t('nav.contact')}
                    </h2>
                  </div>
                  
                  <h3 className="text-2xl font-light text-white uppercase tracking-[0.15em] mb-6 leading-tight">
                    {t('contact.stayConnected')} <span className="text-amber-200/60">{t('contact.contactSpan')}</span>
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-10 leading-relaxed font-medium">
                    {t('contact.readyToDiscuss')}
                  </p>
                  
                  <ContactButtons />
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </main>
  );
}