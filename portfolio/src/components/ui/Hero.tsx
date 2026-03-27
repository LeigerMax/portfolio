"use client";

export function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center p-8 pointer-events-none">
      <div className="bg-black/40 backdrop-blur-md p-12 border border-white/10 rounded-2xl pointer-events-auto text-center">
        <h1 className="text-8xl font-black text-white mb-2 uppercase tracking-tighter italic">
          Maxime Allemeersch
        </h1>
        <p className="text-2xl text-purple-400 font-mono uppercase tracking-[0.2em] mb-4">
          Software Engineer
        </p>
        <p className="text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
          Développeur passionné et polyvalent, spécialisé dans la création de solutions complètes.
        </p>
        <div className="animate-bounce text-white/50 font-mono text-sm uppercase tracking-widest">
          Scrollez pour explorer mon espace
        </div>
      </div>
    </section>
  );
}
