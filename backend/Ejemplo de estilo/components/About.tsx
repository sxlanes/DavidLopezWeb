import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <section id="about" className="py-32 bg-void-light relative overflow-hidden">
      {/* Decorative vertical line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/5 transform -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-12 text-center">
            La Búsqueda de la Verdad
          </h2>
          
          <div className="prose prose-invert prose-lg mx-auto text-stone-400 font-light text-justify">
            <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:text-gold-dim first-letter:mr-3 first-letter:float-left">
              Vivimos en una era de ruido. La información fluye incesantemente, erosionando nuestra capacidad de detenernos y reflexionar. Mi trabajo no busca dar respuestas definitivas, sino plantear las preguntas correctas.
            </p>
            <p className="mb-6">
              A través de la dialéctica moderna, intento reconciliar la tradición socrática con los desafíos de la inteligencia artificial y la biotecnología. ¿Qué significa ser humano cuando la máquina puede pensar? ¿Dónde reside la virtud en un mundo simulado?
            </p>
            <blockquote className="border-l-2 border-gold-dim pl-6 italic text-xl text-white my-12">
              "La filosofía no es un refugio contra la realidad, sino la herramienta más afilada para tallarla."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;