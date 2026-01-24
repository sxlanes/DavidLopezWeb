import React from 'react';

const VideosCortos: React.FC = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-stone-300">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-serif text-gold-dim mb-8 uppercase tracking-widest">Videos Cortos</h1>
                <p className="text-stone-300 font-sans text-lg leading-relaxed">
                    Próximamente: Una colección de Reels y videos cortos sobre filosofía y actualidad.
                </p>
            </div>
        </div>
    );
};

export default VideosCortos;
