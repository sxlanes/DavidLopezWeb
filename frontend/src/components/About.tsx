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
          className={`max-w-3xl mx-auto transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
            }`}
        >
          {/* Content removed as per user request */}
        </div>
      </div>
    </section >
  );
};

export default About;