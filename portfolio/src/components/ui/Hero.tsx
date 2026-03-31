"use client";

export function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center p-4 md:p-8 pointer-events-none snap-center">
      <div className="bg-[#0d0d0d]/85 backdrop-blur-xl p-8 md:p-12 lg:p-16 border card-border rounded-2xl md:rounded-[2.5rem] pointer-events-auto text-center mx-4 max-w-4xl workspace-shadow relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-paper-grain" />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-8 md:w-12 h-[1px] bg-white/10" />
            <div className="w-8 md:w-12 h-[1px] bg-white/10" />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-light text-white mb-6 uppercase tracking-widest leading-tight">
            Maxime Allemeersch
            <span className="sr-only"> — Software Engineer & Expert Web Fullstack</span>
          </h1>

          <p className="text-base md:text-xl text-amber-200/60 font-light uppercase tracking-[0.25em] mb-8">
            Software Engineer
          </p>

          <p className="text-sm md:text-lg text-white/50 max-w-xl mx-auto mb-16 leading-relaxed font-medium tracking-wide">
            Développeur passionné et polyvalent, spécialisé dans la création de solutions complètes et performantes.
          </p>

          <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
            <div className="text-white/30 font-mono text-[10px] uppercase tracking-[0.3em]">
              Explorer l'espace
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
