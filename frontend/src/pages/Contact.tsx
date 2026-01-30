import React from 'react';
import { Mail } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void flex flex-col items-center justify-center">
            <h1 className="text-4xl font-serif text-gold-dim mb-16 text-center tracking-widest uppercase">Contacto</h1>

            <div className="grid grid-cols-1 max-w-lg w-full">
                <a
                    href="mailto:contacto@davidlopez.info"
                    className="flex items-center gap-6 p-8 border border-white/5 bg-void-light hover:border-gold-dim/30 hover:bg-white/5 transition-all duration-300 group"
                >
                    <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center text-gold-dim group-hover:scale-110 transition-transform duration-500 border border-white/5">
                        <Mail size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-serif text-white mb-1 group-hover:text-gold-dim transition-colors">Email</h3>
                        <p className="text-stone-500 text-xs uppercase tracking-widest mb-2">contacto@davidlopez.info</p>
                        <p className="text-stone-400 text-sm">Contacto directo.</p>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Contact;
