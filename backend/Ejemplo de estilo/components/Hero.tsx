import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-void via-void to-void-light opacity-90 z-0"></div>
      
      {/* Abstract Animated Circle (CSS only to replace heavy WebGL) */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5 animate-pulse-slow z-0 blur-3xl opacity-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-900/20"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-gold-dim text-xs md:text-sm tracking-[0.3em] uppercase mb-6 animate-[fadeInUp_1s_ease-out_0.5s_forwards] opacity-0">
          Filosofía Contemporánea
        </p>
        <h1 className="text-5xl md:text-8xl font-serif text-white leading-tight mb-8 mix-blend-difference animate-[fadeInUp_1.5s_ease-out_0.2s_forwards] opacity-0">
          Pensar lo<br />
          <span className="italic text-stone-500">Impensable</span>
        </h1>
        <p className="text-stone-400 max-w-lg mx-auto leading-relaxed text-sm md:text-base animate-[fadeInUp_1.5s_ease-out_1s_forwards] opacity-0">
          Explorando la intersección entre la ética humana y la era digital. 
          Deconstruyendo la realidad un pensamiento a la vez.
        </p>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;