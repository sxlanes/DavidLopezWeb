import React from 'react';

const AboutMe: React.FC = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-stone-300">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h1 className="text-4xl font-serif text-gold-dim mb-16 text-center tracking-widest uppercase">Sobre Mí</h1>

                <div className="mb-12 relative w-64 h-64 md:w-80 md:h-80">
                    <div className="absolute inset-0 border border-gold-dim/30 rounded-full transform rotate-6 scale-105"></div>
                    <img
                        src="https://www.davidlopez.info/wp-content/uploads/2020/03/David-López-scaled.jpeg"
                        alt="David López"
                        className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 ease-out border-2 border-void-light shadow-2xl"
                    />
                </div>

                <div className="prose prose-invert prose-gold mx-auto font-serif text-lg leading-relaxed text-center max-w-2xl">
                    <p>
                        David López es filósofo y escritor. Doctor en Filosofía con mención internacional (España, Alemania, Italia y Brasil).
                        Su tesis doctoral analiza el lugar de la magia en el sistema filosófico de Schopenhauer.
                    </p>
                    <p className="mt-6">
                        Estudió Derecho en la Universidad San Pablo-CEU y ejerció como abogado durante quince años antes de dedicarse
                        exclusivamente a la literatura y la filosofía.
                    </p>
                    <p className="mt-6">
                        Ha dirigido la Escuela Libre de Filosofía en Ámbito Cultural (Madrid) durante 11 años.
                        Es autor de novelas como "El filósofo del martillo", "El bosque de albaricoques" y ensayos como
                        "La magia: clave de acceso al sistema filosófico de Schopenhauer".
                    </p>
                    <p className="mt-6">
                        Desde 2009 mantiene este espacio de reflexión filosófica leído en más de 40 países.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
