"use client";

import { useState } from "react";
import { Certification, certifications, ExtraCertification, extraCertifications } from "@/data/certs";
import { Award, BookOpen, Gamepad2, GraduationCap, Server } from "lucide-react";

const ITEMS_PER_PAGE = 4;
const EXTRA_ITEMS_PER_PAGE = 6;

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
        className="max-w-4xl w-full pointer-events-auto bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-10 animate-in fade-in duration-500"
        style={{ animation: "fadeSlideIn 0.5s ease-out" }}
      >
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">
              Certifications
            </h2>
            <div className="h-1.5 w-20 bg-purple-500 mt-2 rounded-full" />
          </div>
          <div className="text-sm text-white/40 font-mono">
            {certifications.length} certificats
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {current.map((cert: Certification, i: number) => (
            <div
              key={page * ITEMS_PER_PAGE + i}
              className={`group relative bg-gradient-to-br ${getIssuerColor(cert.issuer)} border rounded-xl p-5 hover:scale-[1.02] transition-all duration-300`}
            >
              {/* Icône + Badge */}
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0 mt-0.5">
                  {getIssuerIcon(cert.issuer)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm leading-tight mb-1.5 line-clamp-2 pr-28">
                    {cert.title}
                  </h3>
                  <div className={`text-xs font-semibold ${getIssuerAccent(cert.issuer)} mb-2`}>
                    {cert.issuer}
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                </div>
              </div>
              {/* Date badge */}
              <div className="absolute top-5 right-5 text-[10px] font-mono text-white/30 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full">
                {cert.date}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Principale */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p: number) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-1.5 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-purple-500/20 hover:border-purple-500/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer text-xs font-bold"
            >
              ←
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-6 h-6 rounded-md text-[10px] font-bold transition-all cursor-pointer ${i === page
                    ? "bg-purple-500 text-black"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p: number) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-4 py-1.5 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-purple-500/20 hover:border-purple-500/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer text-xs font-bold"
            >
              →
            </button>
          </div>
        )}

        {/* Formations Optionnelles */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-purple-400" />
              <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest">
                Autres Formations & Cours
              </h3>
            </div>
            
            {/* Pagination Optionnelle */}
            {totalExtraPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExtraPage((p) => Math.max(0, p - 1))}
                  disabled={extraPage === 0}
                  className="p-1.5 bg-white/5 border border-white/10 text-white rounded-md hover:bg-purple-500/20 disabled:opacity-20 cursor-pointer"
                >
                  ←
                </button>
                <span className="text-[10px] font-mono text-white/40">
                  {extraPage + 1} / {totalExtraPages}
                </span>
                <button
                  onClick={() => setExtraPage((p) => Math.min(totalExtraPages - 1, p + 1))}
                  disabled={extraPage === totalExtraPages - 1}
                  className="p-1.5 bg-white/5 border border-white/10 text-white rounded-md hover:bg-purple-500/20 disabled:opacity-20 cursor-pointer"
                >
                  →
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {currentExtra.map((extra: ExtraCertification, i: number) => (
              <div 
                key={extraPage * EXTRA_ITEMS_PER_PAGE + i}
                className="bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors group min-h-[80px] flex flex-col justify-center"
              >
                <div className="text-[11px] font-bold text-purple-400/80 mb-1.5 flex justify-between items-center bg-purple-500/5 px-2 py-0.5 rounded-full">
                  <span>{extra.issuer}</span>
                  <span className="text-[10px] text-white/30 font-mono italic">{extra.date}</span>
                </div>
                <h4 className="text-white/90 text-[13px] font-bold leading-tight group-hover:text-white transition-colors line-clamp-2 px-1">
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
