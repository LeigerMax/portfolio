"use client";

import { useState } from "react";
import { certifications } from "@/data/certs";
import { Award, Gamepad2, GraduationCap, Server, Cloud, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 6;

// Icônes par émetteur
function getIssuerIcon(issuer: string) {
  if (issuer.includes("Red Hat")) return <Server size={28} />;
  if (issuer.includes("Unity")) return <Gamepad2 size={28} />;
  if (issuer.includes("Technofutur") || issuer.includes("OpenClassrooms") || issuer.includes("Adobe")) return <GraduationCap size={28} />;
  if (issuer.includes("Google Cloud")) return <Cloud size={28} />;
  if (issuer.includes("Appcues")) return <Star size={28} />;
  return <Award size={28} />;
}

function getIssuerAccent(issuer: string) {
  if (issuer.includes("Red Hat")) return "text-red-400";
  if (issuer.includes("Unity")) return "text-emerald-400";
  if (issuer.includes("Technofutur") || issuer.includes("OpenClassrooms") || issuer.includes("Adobe")) return "text-blue-400";
  if (issuer.includes("Google Cloud")) return "text-sky-400";
  if (issuer.includes("Appcues")) return "text-amber-400";
  return "text-purple-400";
}

export function CertificatesOverlay({ visible, isInline = false }: { visible: boolean; isInline?: boolean }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);
  const current = certifications.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const content = (
    <div
      className={`w-full pointer-events-auto relative overflow-hidden ${isInline ? "px-2" : "max-w-6xl bg-[#0d0d0d]/80 backdrop-blur-md rounded-xl border card-border shadow-2xl py-8 px-6 md:px-16"}`}
      style={!isInline ? { animation: "fadeSlideIn 0.5s ease-out" } : {}}
    >
      {/* Subtle texture overlay - only on non-inline */}
      {!isInline && <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-paper-grain" />}

      {/* Header */}
      <div className="relative z-10 flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-4 mb-2">
            {!isInline && <div className="w-8 md:w-10 h-[1px] bg-white/20" />}
            <h2 className="text-xl md:text-3xl font-light text-white tracking-[0.2em] uppercase">
              {t('certificates.title')}
            </h2>
          </div>
        </div>
        {!isInline && (
          <div className="text-xs text-white/30 font-mono uppercase tracking-widest bg-white/[0.03] px-4 py-1.5 rounded-full border border-white/[0.05]">
            {certifications.length} {t('certificates.count')}
          </div>
        )}
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12 ">
        {current.map((cert, i: number) => {
          const CardWrapper = cert.link ? 'a' : 'div';
          return (
            <CardWrapper
              key={page * ITEMS_PER_PAGE + i}
              href={cert.link}
              target={cert.link ? "_blank" : undefined}
              rel={cert.link ? "noopener noreferrer" : undefined}
              className={`group relative bg-white/[0.01] border ${cert.isImportant ? 'border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'border-white/5'} rounded-lg p-6 md:p-8 hover:bg-white/[0.03] ${cert.link ? 'cursor-pointer hover:border-white/30' : ''} transition-all duration-300 flex flex-col justify-center`}
            >
              <div className="flex items-start gap-5">
                <div className="text-gray-400 group-hover:text-amber-200/60 transition-colors scale-110">
                  {getIssuerIcon(cert.issuer)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-2 md:mb-3 pr-20 md:pr-24">
                    {cert.titleKey.includes('.') ? t(cert.titleKey) : cert.titleKey}
                  </h3>
                  <div className={`text-xs font-black uppercase tracking-widest ${getIssuerAccent(cert.issuer)} opacity-80 ${cert.descriptionKey ? 'mb-4' : 'mb-0'}`}>
                    {cert.issuer}
                  </div>
                  {cert.descriptionKey && (
                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-none font-medium mt-4">
                      {cert.descriptionKey.includes('.') ? t(cert.descriptionKey) : cert.descriptionKey}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="absolute top-6 right-6 md:top-8 md:right-8 flex flex-col items-end gap-2">
                <div className="text-[10px] md:text-xs font-mono text-white/20 uppercase tracking-tighter">
                  {cert.date}
                </div>
                {cert.isImportant && (
                  <div className="px-2 py-1 bg-white/5 border border-white/10 text-white/60 text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-sm">
                    Certificat
                  </div>
                )}
              </div>
            </CardWrapper>
          );
        })}
      </div>

      {/* Pagination Principale */}
      {totalPages > 1 && (
        <div className="relative z-10 flex items-center justify-center gap-2 md:gap-6">
          <button
            onClick={() => setPage((p: number) => Math.max(0, p - 1))}
            disabled={page === 0}
            aria-label="Certification page précédente"
            className="px-3 md:px-6 py-2 md:py-2.5 bg-white/[0.12] border border-white/30 text-white/90 rounded-lg hover:bg-white/[0.2] hover:text-white transition-all disabled:opacity-30 cursor-pointer text-xs md:text-sm font-bold shrink-0"
          >
            ←
          </button>

          <div className="flex gap-1.5 md:gap-3 flex-wrap justify-center">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Aller à la page de certification ${i + 1}`}
                className={`w-7 h-7 md:w-10 md:h-10 rounded-lg text-[10px] md:text-xs font-bold transition-all cursor-pointer border shrink-0 ${i === page
                  ? "bg-white border-white text-black"
                  : "bg-white/[0.02] border-white/10 text-white/30 hover:text-white hover:border-white/20"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p: number) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            aria-label="Certification page suivante"
            className="px-3 md:px-6 py-2 md:py-2.5 bg-white/[0.12] border border-white/30 text-white/90 rounded-lg hover:bg-white/[0.2] hover:text-white transition-all disabled:opacity-30 cursor-pointer text-xs md:text-sm font-bold shrink-0"
          >
            →
          </button>
        </div>
      )}
    </div>
  );

  if (isInline) return content;

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4 md:p-8">
      {content}
    </div>
  );
}
