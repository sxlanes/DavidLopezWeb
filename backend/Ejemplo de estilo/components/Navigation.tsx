import React, { useState, useEffect } from 'react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled ? 'bg-void/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="text-xl font-serif tracking-widest text-white cursor-pointer hover:text-gold-dim transition-colors"
          onClick={() => scrollToSection('hero')}
        >
          DAVID LÓPEZ
        </div>
        <div className="hidden md:flex space-x-12 text-xs tracking-widest uppercase font-bold text-stone-500">
          <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors duration-300">Esencia</button>
          <button onClick={() => scrollToSection('oracle')} className="hover:text-white transition-colors duration-300">Oráculo</button>
          <button onClick={() => scrollToSection('works')} className="hover:text-white transition-colors duration-300">Obras</button>
        </div>
        <div className="md:hidden">
          {/* Mobile menu placeholder - minimal implementation */}
           <button onClick={() => scrollToSection('oracle')} className="text-gold-dim text-xs tracking-widest uppercase border border-gold-dim/30 px-3 py-1 rounded">
            Preguntar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;