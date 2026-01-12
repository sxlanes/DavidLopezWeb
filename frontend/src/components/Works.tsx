import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { WorkItem } from '../types';

const worksData: WorkItem[] = [
  { id: '1', title: 'El Silencio Digital', year: '2023', description: 'Un ensayo sobre la pérdida del aburrimiento en la era del smartphone.', category: 'Essay' },
  { id: '2', title: 'Ética de la Simulación', year: '2022', description: 'Libro explorando los límites morales de los mundos virtuales.', category: 'Book' },
  { id: '3', title: 'Más Allá del Humano', year: '2021', description: 'Conferencia impartida en la Universidad de Salamanca.', category: 'Lecture' },
  { id: '4', title: 'Reflejos del Ego', year: '2024', description: 'Colección de aforismos sobre la identidad moderna.', category: 'Book' },
];

const Works: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="works" className="py-32 bg-void relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
          <h2 className="text-3xl md:text-4xl font-serif text-white">Publicaciones <br />& Conferencias</h2>
          <p className="text-stone-500 text-sm mt-4 md:mt-0 max-w-xs text-right">
            Una selección cronológica de pensamientos materializados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {worksData.map((work, index) => (
            <div 
              key={work.id}
              className={`group cursor-pointer transition-all duration-700 delay-[${index * 100}ms] ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs font-bold text-gold-dim uppercase tracking-wider">{work.category}</span>
                <span className="text-xs text-stone-600 font-mono">{work.year}</span>
              </div>
              <h3 className="text-2xl text-white font-serif mb-3 group-hover:text-gold-dim transition-colors duration-300">
                {work.title}
              </h3>
              <p className="text-stone-500 text-sm font-light leading-relaxed group-hover:text-stone-400 transition-colors">
                {work.description}
              </p>
              <div className="w-0 group-hover:w-full h-px bg-gold-dim/50 mt-6 transition-all duration-500 ease-in-out"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;