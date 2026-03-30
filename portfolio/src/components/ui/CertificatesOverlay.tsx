"use client";

import { useState } from "react";
import { Certification, certifications, ExtraCertification, extraCertifications } from "@/data/certs";
import { Award, BookOpen, Gamepad2, GraduationCap, Server } from "lucide-react";

const ITEMS_PER_PAGE = 4;
const EXTRA_ITEMS_PER_PAGE = 4;

// Icônes par émetteur
function getIssuerIcon(issuer: string) {
  if (issuer.includes("Red Hat")) return <Server size={28} />;
  if (issuer.includes("Unity")) return <Gamepad2 size={28} />;
  if (issuer.includes("Technofutur")) return <GraduationCap size={28} />;
  return <Award size={28} />;
}

function getIssuerColor(issuer: string) {
  if (issuer.includes("Red Hat")) return "from-red-500/20 to-red-900/10 border-red-500/30";
  if (issuer.includes("Unity")) return "from-emerald-500/20 to-emerald-900/10 border-emerald-500/30";
  if (issuer.includes("Technofutur")) return "from-blue-500/20 to-blue-900/10 border-blue-500/30";
  return "from-purple-500/20 to-purple-900/10 border-purple-500/30";
}

function getIssuerAccent(issuer: string) {
  if (issuer.includes("Red Hat")) return "text-red-400";
  if (issuer.includes("Unity")) return "text-emerald-400";
  if (issuer.includes("Technofutur")) return "text-blue-400";
  return "text-purple-400";
}

export function CertificatesOverlay({ visible }: { visible: boolean }) {
  const [page, setPage] = useState(0);
  const [extraPage, setExtraPage] = useState(0);

  const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);
  const current = certifications.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const totalExtraPages = Math.ceil(extraCertifications.length / EXTRA_ITEMS_PER_PAGE);
  const currentExtra = extraCertifications.slice(extraPage * EXTRA_ITEMS_PER_PAGE, (extraPage + 1) * EXTRA_ITEMS_PER_PAGE);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-8">
      <div
        className="max-w-6xl w-full pointer-events-auto bg-[#0d0d0d]/80 backdrop-blur-md rounded-xl border card-border shadow-2xl py-10 px-16 relative overflow-hidden animate-in fade-in duration-500"
        style={{ animation: "fadeSlideIn 0.5s ease-out" }}
      >
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-paper-grain" />

        {/* Header */}
        <div className="relative z-10 flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-[1px] bg-white/20" />
              <h2 className="text-3xl font-light text-white tracking-[0.2em] uppercase">
                Certifications
              </h2>
            </div>
          </div>
          <div className="text-xs text-white/30 font-mono uppercase tracking-widest bg-white/[0.03] px-4 py-1.5 rounded-full border border-white/[0.05]">
            {certifications.length} certifats
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 ">
          {current.map((cert: Certification, i: number) => (
            <div
              key={page * ITEMS_PER_PAGE + i}
              className={`group relative bg-white/[0.01] border card-border rounded-lg p-8 hover:bg-white/[0.03] transition-all duration-300`}
            >
              <div className="flex items-start gap-5">
                <div className="text-gray-400 group-hover:text-amber-200/60 transition-colors scale-110">
                  {getIssuerIcon(cert.issuer)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base leading-tight mb-3 pr-24">
                    {cert.title}
                  </h3>
                  <div className={`text-xs font-black uppercase tracking-widest ${getIssuerAccent(cert.issuer)} opacity-80 mb-4`}>
                    {cert.issuer}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 font-medium">
                    {cert.description}
                  </p>
                </div>
              </div>
              {/* Date badge */}
              <div className="absolute top-8 right-8 text-xs font-mono text-white/20 uppercase tracking-tighter">
                {cert.date}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Principale */}
        {totalPages > 1 && (
          <div className="relative z-10 flex items-center justify-center gap-6">
            <button
              onClick={() => setPage((p: number) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-6 py-2.5 bg-white/[0.12] border border-white/30 text-white/90 rounded-lg hover:bg-white/[0.2] hover:text-white transition-all disabled:opacity-30 cursor-pointer text-sm font-bold"
            >
              ←
            </button>

            <div className="flex gap-3">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-10 h-10 rounded-lg text-xs font-bold transition-all cursor-pointer border ${i === page
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
              className="px-6 py-2.5 bg-white/[0.12] border border-white/30 text-white/90 rounded-lg hover:bg-white/[0.2] hover:text-white transition-all disabled:opacity-30 cursor-pointer text-sm font-bold"
            >
              →
            </button>
          </div>
        )}

        {/* Formations Optionnelles */}
        <div className="relative z-10 mt-0 pt-6 border-t card-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-5 pl-4">
              <div className="p-2 bg-white/[0.03] border card-border rounded-lg text-gray-400">
                <BookOpen size={22} className="text-gray-400 hover:text-amber-200/60 transition-colors" />
              </div>
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">
                Archives & Études Complémentaires
              </h3>
            </div>

            {/* Pagination Optionnelle */}
            {totalExtraPages > 1 && (
              <div className="flex items-center gap-4 px-4">
                <button
                  onClick={() => setExtraPage((p) => Math.max(0, p - 1))}
                  disabled={extraPage === 0}
                  className="p-1 px-5 bg-white/[0.12] border border-white/30 text-white/90 rounded-md hover:bg-white/[0.2] hover:text-white disabled:opacity-30 cursor-pointer transition-all font-bold"
                >
                  ←
                </button>
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  {extraPage + 1} / {totalExtraPages}
                </span>
                <button
                  onClick={() => setExtraPage((p) => Math.min(totalExtraPages - 1, p + 1))}
                  disabled={extraPage === totalExtraPages - 1}
                  className="p-1 px-5 bg-white/[0.12] border border-white/30 text-white/90 rounded-md hover:bg-white/[0.2] hover:text-white disabled:opacity-30 cursor-pointer transition-all font-bold"
                >
                  →
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 py-2">
            {currentExtra.map((extra: ExtraCertification, i: number) => (
              <div
                key={extraPage * EXTRA_ITEMS_PER_PAGE + i}
                className="bg-white/[0.01] border card-border rounded-lg p-6 hover:bg-white/[0.03] hover:border-white/20 transition-all group flex flex-col justify-center min-h-[90px]"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-200/40">{extra.issuer}</span>
                  <span className="text-[10px] text-white/10 font-mono tracking-tighter">{extra.date}</span>
                </div>
                <h4 className="text-gray-300 text-sm font-medium leading-snug group-hover:text-amber-50 transition-colors">
                  {extra.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
