import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Main content links
  const primaryLinks = [
    { name: 'OBRAS DE FICCIÓN', path: '/novelas' },
    { name: 'LAS BAILARINAS LÓGICAS (UN DICCIONARIO FILOSÓFICO)', path: '/las-bailarinas-logicas' },
    { name: 'CURSOS Y CONFERENCIAS ONLINE', path: '/cursos' },
    { name: 'FILÓSOFOS MÍTICOS DEL MÍTICO SIGLO XX', path: '/filosofos-miticos-del-mitico-siglo-xx' },
    { name: 'PENSADORES EN 2015', path: '/pensadores-pensando-en-2015' },
    { name: 'CRÍTICAS LITERARIAS', path: '/criticas-literarias' },
    { name: 'TRABAJOS DE SCHOPENHAUER', path: '/sobre-schopenhauer' },
  ];

  // Secondary links (lower hierarchy)
  const secondaryLinks = [
    { name: 'ALGO SOBRE MÍ', path: '/sobre-mi' },
    { name: 'REDES SOCIALES', path: '/redes-sociales' },
    { name: 'SUSCRIBIRSE AL NEWSLETTER', path: '/newsletter' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-void/90 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'
          }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <NavLink
            to="/"
            className="text-xl font-serif tracking-widest text-white hover:text-gold-dim transition-colors relative z-50"
            onClick={() => setIsMenuOpen(false)}
          >
            DAVID LÓPEZ
          </NavLink>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-xs uppercase tracking-widest font-bold text-white flex items-center gap-2 relative z-50 hover:text-gold-dim transition-colors group"
          >
            <span className="hidden md:inline">{isMenuOpen ? 'CERRAR' : 'MENÚ'}</span>
            <div className={`w-6 flex flex-col items-end gap-[5px] transition-all duration-300 ${isMenuOpen ? 'gap-0' : ''}`}>
              <span className={`h-[1px] bg-current w-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[1px]' : ''}`} />
              <span className={`h-[1px] bg-current w-full transition-all duration-300 ${isMenuOpen ? '-rotate-45' : ''}`} />
              <span className={`h-[1px] bg-current w-2/3 group-hover:w-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-void z-40 transition-all duration-700 ease-in-out flex flex-col justify-center items-center ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <div className="container mx-auto px-6 max-w-5xl h-full flex flex-col justify-center overflow-y-auto py-24">

          {/* Primary Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
            {primaryLinks.map((link, idx) => (
              <div key={link.name}
                className={`transition-all duration-700 delay-[${idx * 50}ms] ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-lg md:text-xl font-serif tracking-wide block py-2 border-b border-white/5 hover:border-gold-dim/50 hover:text-gold-dim transition-all duration-300 ${isActive ? 'text-gold-dim border-gold-dim/30' : 'text-stone-400'}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </div>
            ))}
          </div>

          {/* Secondary Links Separator */}
          <div className={`w-full h-px bg-white/10 mb-10 max-w-xs mx-auto transition-all duration-1000 delay-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} />

          {/* Secondary Links */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            {secondaryLinks.map((link, idx) => (
              <div key={link.name}
                className={`transition-all duration-700 delay-[${(primaryLinks.length + idx) * 50 + 300}ms] ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `text-xs uppercase tracking-widest font-bold hover:text-gold-dim transition-colors duration-300 ${isActive ? 'text-gold-dim' : 'text-stone-500'}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              </div>
            ))}
          </div>

        </div>

        <div className={`absolute bottom-8 left-0 w-full text-center text-stone-600 text-[10px] tracking-widest uppercase transition-all duration-1000 delay-700 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
          David López © {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
};

export default Navigation;