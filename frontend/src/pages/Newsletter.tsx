import React, { useState } from 'react';

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setStatus('success');
        setEmail('');
    };

    return (
        <div className="pt-24 pb-20 container mx-auto px-6 min-h-screen bg-void flex items-center justify-center">
            <div className="max-w-2xl w-full bg-void-light/50 backdrop-blur-sm border border-white/5 p-12 md:p-16 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-dim/50 to-transparent"></div>

                <h1 className="text-3xl md:text-4xl font-serif text-white mb-6 tracking-wide">Círculo de Lectores</h1>
                <p className="text-stone-400 mb-10 text-base md:text-lg leading-relaxed max-w-lg mx-auto font-light">
                    Únete a nuestra comunidad de pensamiento. Recibe en tu correo reflexiones inéditas, acceso anticipado a nuevos cursos y fragmentos de mi próxima obra literaria.
                </p>

                {status === 'success' ? (
                    <div className="bg-gold-dim/10 text-gold-dim p-6 border border-gold-dim/20">
                        <p className="font-serif italic text-xl">"La filosofía es el cultivo de la mente."</p>
                        <p className="mt-2 text-sm uppercase tracking-widest">Gracias por suscribirte.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md mx-auto">
                        <div className="relative group">
                            <input
                                type="email"
                                required
                                placeholder=" "
                                className="peer w-full bg-transparent border-b border-stone-600 py-3 text-white focus:border-gold-dim focus:outline-none transition-colors placeholder-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="absolute left-0 -top-3.5 text-stone-500 text-xs transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-stone-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-gold-dim peer-focus:text-xs">
                                Tu dirección de correo
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-void border border-gold-dim text-gold-dim font-bold uppercase tracking-[0.2em] py-4 px-8 hover:bg-gold-dim hover:text-black transition-all duration-500 w-full"
                        >
                            Unirme Ahora
                        </button>

                        <p className="text-[10px] text-stone-600 uppercase tracking-widest mt-2">
                            Respetamos tu privacidad. Sin spam.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Newsletter;
