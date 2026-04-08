"use client";

import { WhoAmIOverlay, ParcoursOverlay } from "./AboutOverlay";
import { SkillsSection } from "./SkillsSection";
import { CertificatesOverlay } from "./CertificatesOverlay";
import { ProjectGrid } from "./ProjectGrid";
import { ContactButtons } from "./ContactButtons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function MobileHero() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center pt-24 pb-6">
      <h1 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter italic leading-[0.9]">
        Maxime <br /> Allemeersch
        <span className="sr-only"> — {t('hero.title')} & Expert Web Fullstack</span>
      </h1>
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-amber-200/60 mb-6 border-y border-white/5 py-2 w-full max-w-[200px]">
        {t('hero.title')}
      </p>
      <p className="text-sm text-gray-400 max-w-[280px] mx-auto leading-relaxed font-medium">
        {t('hero.description')}
      </p>

      {/* Suggestion Desktop */}
      <div className="mt-8">
        <p className="text-[9px] md:text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] inline-flex items-center gap-2 bg-white/[0.03] px-4 py-2 rounded-full border border-white/5">
          <span className="animate-pulse">●</span> {t('hero.desktopOptimal')}
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-2">
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20 animate-pulse">
          {t('hero.explore')}
        </span>
      </div>
    </div>
  );
}

const Reveal = ({ children, id, className = "" }: { children: React.ReactNode, id?: string, className?: string }) => (
  <motion.div
    id={id}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export function MobilePortfolio() {
  const { t } = useTranslation();
  return (
    <div className="relative z-10 w-full min-h-screen px-4 pb-20 pointer-events-auto">
      {/* 
        Unified Mobile "Cadre" (Frame) 
        This single container holds all content with a consistent background and blur.
      */}
      <div className="max-w-md mx-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden workspace-shadow relative">
        {/* Subtle texture overlay for the whole card */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-paper-grain" />

        {/* Content Flow */}
        <div className="p-4 space-y-4">
          <Reveal id="mobile-hero">
            <MobileHero />
          </Reveal>

          <div className="space-y-16 pb-12">
            <Reveal id="mobile-whoami" className="pt-4 px-2">
              <WhoAmIOverlay visible={true} isInline={true} />
            </Reveal>

            <Reveal id="mobile-projects" className="border-t border-white/5 pt-12 px-2 scroll-mt-24">
              <div className="mb-10 flex items-center gap-4">
                <div className="w-10 h-[1px] bg-white/20" />
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">{t('nav.projects')}</h2>
              </div>
              <ProjectGrid isMinimal={true} />
            </Reveal>

            <Reveal id="mobile-parcours" className="border-t border-white/5 pt-12 scroll-mt-24">
              <ParcoursOverlay visible={true} isInline={true} />
            </Reveal>

            <Reveal id="mobile-skills" className="border-t border-white/5 pt-12 scroll-mt-24">
              <SkillsSection isInline={true} />
            </Reveal>

            <Reveal id="mobile-certs" className="border-t border-white/5 pt-12 scroll-mt-24">
              <CertificatesOverlay visible={true} isInline={true} />
            </Reveal>

            <Reveal id="mobile-contact" className="border-t border-white/5 pt-12 px-2 pb-8 scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-[1px] bg-white/20" />
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">{t('nav.contact')}</h2>
              </div>
              <h3 className="text-2xl font-light text-white uppercase tracking-[0.1em] mb-6">
                {t('contact.readyToCollaborate')}
              </h3>
              <ContactButtons />
            </Reveal>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-8 text-center border-t border-white/5 bg-black/40">
          <p className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em]">
            © 2026 • Maxime Allemeersch
          </p>
        </div>
      </div>
    </div>
  );
}
