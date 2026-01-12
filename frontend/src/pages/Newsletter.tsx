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
            <div className="max-w-xl w-full bg-void-light border border-white/5 p-12 rounded-lg text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-dim to-transparent opacity-50"></div>

                <h1 className="text-3xl font-serif text-white mb-4">Newsletter</h1>
                <p className="text-stone-400 mb-8">
                    Suscríbete para recibir reflexiones filosóficas, novedades sobre cursos y publicaciones.
                </p>

                {status === 'success' ? (
                    <div className="bg-green-900/20 text-green-400 p-4 rounded border border-green-900/50">
                        Gracias por suscribirte.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            required
                            placeholder="Tu correo electrónico"
                            className="bg-black/50 border border-white/10 p-3 rounded text-stone-300 focus:border-gold-dim focus:outline-none transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-gold-dim text-black font-bold uppercase tracking-widest py-3 px-8 hover:bg-gold-bright transition-colors mx-auto w-fit"
                        >
                            Suscribirse
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Newsletter;
