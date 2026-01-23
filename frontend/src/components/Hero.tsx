import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, X } from 'lucide-react';

// Data Configuration
const courseList = [
  { label: "Platón. Obras Completas", to: "/platon-obras-completas" },
  { label: "Schopenhauer. Obras e Ideas", to: "/nuevo-curso-online" },
  { label: "Física y Metafísica de la IA", to: "/nuevo-curso-online-fisica-y-metafisica-de-la-inteligencia-artificial" },
  { label: "Poderosos Conceptos", to: "/poderosos-conceptos" },
  { label: "Filosofía del Arte", to: "/curso-de-filosofia-del-arte" },
  { label: "Filosofía de la Ciencia", to: "/curso-de-filosofia-de-la-ciencia" },
  { label: "La Gran Metafísica", to: "/la-gran-metafisica" },
  { label: "Filosofía de la Política", to: "/filosofia-de-la-politica" },
  { label: "Filosofía y Actualidad", to: "/filosofia-y-actualidad-conferencias-interactivas" },
];

const novelList = [
  { label: "Las manos de Julia", to: "/las-manos-de-julia-novela" },
  { label: "El bosque de albaricoques", to: "/el-bosque-de-albaricoques" },
  { label: "El nuevo filósofo del martillo", to: "/el-nuevo-filosofo-del-martillo-novela" },
];

const schopenhauerSubmenu = [
  { label: "Libro: La Magia (Ensayo)", to: "https://www.amazon.es/MAGIA-acceso-sistema-filosófico-Schopenhauer/dp/B0CQ86XCXH", isExternal: true },
  { label: "Art: Enfermedad, Medicina y Magia", to: "/enfermedad-medicina-y-magia-en-el-sistema-filosofico-de-schopenhauer" },
  { label: "Art: La Magia en la Metafísica", to: "/die-magie-in-schopenhauers-metaphysik-ein-weg-um-uns-als-magisches-nichts-zu-erkennen" },
];

const textosList = [
  { label: "Las Bailarinas Lógicas", to: "/las-bailarinas-logicas" },
  { label: "Filósofos Míticos Siglo XX", to: "/filosofos-miticos-del-mitico-siglo-xx" },
  { label: "Pensadores Vivos en 2015", to: "/pensadores-pensando-en-2015" },
  { label: "Críticas Literarias", to: "/criticas-literarias" },
  // Special item with submenu
  { label: "Obras sobre Schopenhauer", hasSubmenu: true, items: schopenhauerSubmenu },
];

const Hero: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<boolean>(false);

  const toggleMenu = (menuName: string) => {
    if (openMenu === menuName) {
      setOpenMenu(null);
      setOpenSubmenu(false);
    } else {
      setOpenMenu(menuName);
      setOpenSubmenu(false);
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-void">

      {/* Background Image - Blurred & Darkened */}
      <div className="absolute inset-0 z-0">
        {/* User uploaded background image */}
        <div className="absolute inset-0 bg-[url('/images/uploaded/hero_background.jpg')] bg-cover bg-center opacity-70 scale-105 saturate-0 contrast-125"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/50 to-void"></div>
      </div>

      {/* 1. TOP SECTION: Name & Subtitle */}
      <div className="relative z-20 text-center mt-12 md:mt-24 px-4 animate-fade-in-up flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-serif text-gold-dim tracking-tight mb-4">
          David López
        </h1>
        <p className="text-stone-300 font-sans text-sm md:text-lg tracking-widest uppercase">
          Doctor en Filosofía con mención internacional
        </p>
      </div>

      {/* 2. MIDDLE SECTION: The 4 Pillars Navigation */}
      <div className="relative z-20 flex-grow flex items-center justify-center w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 w-full text-center items-start">

          {/* --- PILLAR 1: CLUB DE FILOSOFÍA --- */}
          <div className="relative group flex flex-col items-center">
            <button
              onClick={() => toggleMenu('club')}
              className={`text-2xl md:text-3xl font-serif tracking-widest uppercase transition-all duration-300 transform hover:scale-105 hover:text-gold-dim border-b-2 border-transparent hover:border-gold-dim/50 pb-2 ${openMenu === 'club' ? 'text-gold-dim scale-105 border-gold-dim/50' : 'text-white'}`}
            >
              Club de Filosofía
            </button>

            {/* Dropdown Menu */}
            <div className={`mt-8 flex flex-col gap-3 transition-all duration-500 overflow-hidden w-full ${openMenu === 'club' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {courseList.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  className="text-stone-400 hover:text-white text-sm md:text-base uppercase tracking-wider block py-1 transition-colors hover:translate-x-1 duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* --- PILLAR 2: TEXTOS FILOSÓFICOS --- */}
          <div className="relative group flex flex-col items-center">
            <button
              onClick={() => toggleMenu('textos')}
              className={`text-2xl md:text-3xl font-serif tracking-widest uppercase transition-all duration-300 transform hover:scale-105 hover:text-gold-dim border-b-2 border-transparent hover:border-gold-dim/50 pb-2 ${openMenu === 'textos' ? 'text-gold-dim scale-105 border-gold-dim/50' : 'text-white'}`}
            >
              Textos Filosóficos
            </button>

            <div className={`mt-8 flex flex-col gap-4 transition-all duration-500 overflow-hidden w-full ${openMenu === 'textos' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {textosList.map((item, idx) => (
                <div key={idx}>
                  {item.hasSubmenu ? (
                    <div className="flex flex-col items-center w-full">
                      <button
                        onClick={(e) => { e.stopPropagation(); setOpenSubmenu(!openSubmenu); }}
                        className="text-stone-300 hover:text-white text-sm md:text-base uppercase tracking-wider py-1 flex items-center justify-center gap-2 transition-colors hover:translate-x-1 duration-300 w-full"
                      >
                        {item.label} <ChevronDown size={14} className={`transition-transform duration-300 ${openSubmenu ? 'rotate-180 text-gold-dim' : 'text-stone-500'}`} />
                      </button>
                      {/* Submenu */}
                      <div className={`flex flex-col gap-2 mt-2 pl-0 md:pl-0 border-l-0 border-white/10 transition-all duration-500 bg-white/5 rounded-sm w-full ${openSubmenu ? 'max-h-[300px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
                        {item.items?.map((sub, sIdx) => (
                          sub.isExternal ? (
                            <a key={sIdx} href={sub.to} target="_blank" rel="noreferrer" className="text-gold-dim/70 hover:text-gold-dim text-xs md:text-sm uppercase tracking-wider block py-1 px-4 hover:bg-white/5 transition-colors">
                              {sub.label}
                            </a>
                          ) : (
                            <Link key={sIdx} to={sub.to} className="text-stone-400 hover:text-white text-xs md:text-sm uppercase tracking-wider block py-1 px-4 hover:bg-white/5 transition-colors">
                              {sub.label}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.to}
                      className="text-stone-400 hover:text-white text-sm md:text-base uppercase tracking-wider block py-1 transition-colors hover:translate-x-1 duration-300"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* --- PILLAR 3: OBRAS DE FICCIÓN --- */}
          <div className="relative group flex flex-col items-center">
            <button
              onClick={() => toggleMenu('ficcion')}
              className={`text-2xl md:text-3xl font-serif tracking-widest uppercase transition-all duration-300 transform hover:scale-105 hover:text-gold-dim border-b-2 border-transparent hover:border-gold-dim/50 pb-2 ${openMenu === 'ficcion' ? 'text-gold-dim scale-105 border-gold-dim/50' : 'text-white'}`}
            >
              Obras de Ficción
            </button>

            <div className={`mt-8 flex flex-col gap-3 transition-all duration-500 overflow-hidden w-full ${openMenu === 'ficcion' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {novelList.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  className="text-stone-400 hover:text-white text-sm md:text-base uppercase tracking-wider block py-1 transition-colors hover:translate-x-1 duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* --- PILLAR 4: BIOGRAFÍA --- */}
          <div className="relative group flex flex-col items-center">
            <Link
              to="/sobre-mi"
              className="text-2xl md:text-3xl font-serif tracking-widest uppercase transition-all duration-300 transform hover:scale-105 hover:text-gold-dim border-b-2 border-transparent hover:border-gold-dim/50 pb-2 text-white"
            >
              Biografía
            </Link>
          </div>

        </div>
      </div>

      {/* 3. BOTTOM SECTION: Footer Links */}
      <div className="relative z-20 w-full flex justify-center pb-20 md:pb-32">
        <div className="flex gap-12 md:gap-24 text-xs md:text-sm uppercase tracking-[0.25em] text-stone-400 font-bold">
          <Link to="/contacto" className="hover:text-gold-dim transition-colors">Contactar</Link>
          <Link to="/newsletter" className="hover:text-gold-dim transition-colors">Suscríbete</Link>
          <Link to="/redes-sociales" className="hover:text-gold-dim transition-colors">Redes Sociales</Link>
        </div>
      </div>

      {/* Copyright - Bottom Left */}
      <div className="absolute bottom-4 left-6 z-20 text-stone-600 text-[10px] md:text-xs tracking-widest">
        © {new Date().getFullYear()} David López
      </div>

    </section>
  );
};

export default Hero;