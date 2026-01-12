import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pagesData from '../data/pages.json';

const shopenhauerSlugs = [
    { slug: 'lamagiaaccesoaschopenhauer', title: 'La magia: clave de acceso al sistema filosófico de Schopenhauer' },
    { slug: 'die-magie-in-schopenhauers-metaphysik-ein-weg-um-uns-als-magisches-nichts-zu-erkennen', title: 'Die Magie in Schopenhauers Metaphysik' },
    { slug: 'enfermedad-medicina-y-magia-en-el-sistema-filosofico-de-schopenhauer', title: 'Enfermedad, Medicina y Magia en el sistema filosófico de Schopenhauer' }
];

const Schopenhauer: React.FC = () => {
    // Get the main intro page
    const introPage = pagesData.find((p: any) => p.post_name === 'sobre-schopenhauer');

    // Specific formatted list as requested
    const workItems = [
        {
            fullText: "La magia: clave de acceso al sistema filosófico de Schopenhauer. Indepentently published, 2020 (Libro de ensayo).",
            link: "https://www.amazon.es/magia-acceso-sistema-filos%C3%B3fico-Schopenhauer/dp/B08CPB33X2" // Assuming link to book or similar
        },
        {
            fullText: '"Enfermedad, Medicina y Magia en el sistema filosófico de Schopenhauer". (Voluntas-Revista internacional de Filosofía, Vol. 11, Núm. 3, 2020).',
            link: "/enfermedad-medicina-y-magia-en-el-sistema-filosofico-de-schopenhauer"
        },
        {
            fullText: '“Die Magie in Schopenhauers Metaphysik: ein Weg, um uns als ‘magisches Nichts’ zu erkennen” [La magia en la metafísica de Schopenhauer: una vía para conocernos como ‘nada mágica’]. (95. Jahrbuch der Schopenhauer-Gesellschaft, 2014).',
            link: "/die-magie-in-schopenhauers-metaphysik-ein-weg-um-uns-als-magisches-nichts-zu-erkennen"
        }
    ];

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-stone-300">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif text-gold-dim mb-12 text-center uppercase tracking-widest border-b border-white/5 pb-8">
                    {introPage?.title || 'Trabajos sobre Schopenhauer'}
                </h1>

                {/* Intro Content - Centered Images */}
                {introPage && (
                    <div
                        className="prose prose-invert prose-lg prose-gold mx-auto font-serif leading-relaxed max-w-none mb-16
                        prose-img:mx-auto prose-img:block prose-img:rounded-md prose-img:shadow-2xl text-justify"
                        dangerouslySetInnerHTML={{
                            __html: introPage.content
                                .replace(/width="\d+"/g, '')
                                .replace(/height="\d+"/g, '')
                                .replace(/aligncenter/g, 'mx-auto block')
                        }}
                    />
                )}

                {/* List of Works */}
                <div className="space-y-8 mt-16 border-t border-white/5 pt-16">
                    <h2 className="text-2xl font-serif text-white text-center uppercase tracking-widest mb-12">Publicaciones Destacadas</h2>
                    {workItems.map((work, idx) => (
                        <div key={idx} className="bg-void-light border border-white/5 p-8 hover:border-gold-dim/30 transition-all duration-300 group">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex-1">
                                    <p className="text-lg text-stone-300 font-serif leading-relaxed group-hover:text-white transition-colors">
                                        {/* Simple formatting for bolding dates or titles if needed, but keeping it raw text mostly */}
                                        {work.fullText}
                                    </p>
                                </div>
                                <Link
                                    to={work.link}
                                    className="shrink-0 px-6 py-3 border border-gold-dim/30 text-gold-dim text-xs uppercase tracking-widest hover:bg-gold-dim hover:text-black transition-all"
                                >
                                    Ver Publicación
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Schopenhauer;
