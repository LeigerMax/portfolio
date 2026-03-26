"use client";

import { useState } from "react";
import { certifications } from "@/data/certs";
import { Award, Gamepad2, GraduationCap, Server } from "lucide-react";

const ITEMS_PER_PAGE = 4;

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
  const totalPages = Math.ceil(certifications.length / ITEMS_PER_PAGE);
  const current = certifications.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

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

        {/* Grille 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {current.map((cert: any, i: number) => (
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
                  <h3 className="text-white font-bold text-sm leading-tight mb-1.5 line-clamp-2">
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
              <div className="absolute top-4 right-4 text-[10px] font-mono text-white/30 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded-full">
                {cert.date}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p: number) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-purple-500/20 hover:border-purple-500/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer text-sm font-bold"
            >
              ← Préc.
            </button>
            
            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    i === page
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
              className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-purple-500/20 hover:border-purple-500/30 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer text-sm font-bold"
            >
              Suiv. →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
