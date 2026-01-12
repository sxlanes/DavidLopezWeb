import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { askPhilosopher } from '../services/geminiService';
import { LoadingState, ChatMessage } from '../types';

const Oracle: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || status === LoadingState.LOADING) return;

    const userText = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setStatus(LoadingState.LOADING);

    const answer = await askPhilosopher(userText);

    setMessages(prev => [...prev, { role: 'model', text: answer }]);
    setStatus(LoadingState.SUCCESS);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section id="oracle" className="py-32 bg-black relative border-y border-white/5">
      <div 
        ref={ref}
        className={`container mx-auto px-6 max-w-4xl transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold-dim text-xs tracking-[0.2em] uppercase block mb-4">
              Interacción Digital
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
              El Oráculo<br />Sintético
            </h2>
            <p className="text-stone-400 mb-8 font-light leading-relaxed">
              Dialoga con una extensión digital de mi pensamiento. Impulsado por Inteligencia Artificial, este oráculo responde basándose en mis escritos y visión del mundo. Pregunta sobre el ser, la nada, o el futuro.
            </p>
          </div>

          <div className="bg-void-light border border-white/10 p-6 rounded-sm min-h-[400px] flex flex-col relative overflow-hidden group">
            
            {/* Ambient glow effect inside the card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-dim/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="flex-grow overflow-y-auto mb-4 space-y-4 max-h-[300px] custom-scrollbar pr-2" ref={scrollRef}>
              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center text-stone-600 italic text-sm text-center px-8">
                  "El conocimiento comienza con una pregunta. Escribe abajo..."
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white/5 text-stone-300 border border-white/5' 
                      : 'bg-transparent text-gold-dim border-l border-gold-dim pl-4'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {status === LoadingState.LOADING && (
                 <div className="flex justify-start">
                   <div className="text-gold-dim text-xs animate-pulse pl-4">Pensando...</div>
                 </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="relative mt-auto">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Cuál es el sentido de la duda?"
                className="w-full bg-black/50 border border-stone-800 text-stone-200 p-4 pr-12 text-sm focus:outline-none focus:border-gold-dim/50 transition-colors placeholder:text-stone-700 font-mono"
              />
              <button 
                type="submit"
                disabled={status === LoadingState.LOADING}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-white transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Oracle;