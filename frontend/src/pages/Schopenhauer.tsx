import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pagesData from '../data/pages.json';

const Schopenhauer: React.FC = () => {
    // Get the main intro page
    const introPage = pagesData.find((p: any) => p.post_name === 'sobre-schopenhauer');

    // Manually defined list to separate the Book/Essay from the Articles
    const workItems = [
        {
            fullText: "La magia: clave de acceso al sistema filosófico de Schopenhauer. Indepentently published, 2020 (Libro de ensayo)",
            link: "https://www.amazon.es/MAGIA-acceso-sistema-filosófico-Schopenhauer/dp/B0CQ86XCXH/ref=sr_1_1?__mk_es_ES=ÅMÅŽÕÑ&crid=11X1K7D0BM77F&dib=eyJ2IjoiMSJ9.aseYQtp37ZEXNPIdP5jo7Q.Q_QU2L8baOmx8if3WCgvWMtb_uQYVQrrZTXT8vUIWms&dib_tag=se&keywords=La+magia%3A+clave+de+acceso+al+sistema+filosófico+de+Schopenhauer&qid=1768296915&sprefix=la+magia+clave+de+acceso+al+sistema+filosófico+de+schopenhauer.+indepentently+published+2020+libro+de+ensayo+%2Caps%2C227&sr=8-1",
            isExternal: true
        },
        {
            fullText: "Enfermedad, Medicina y Magia en el sistema filosófico de Schopenhauer. (Voluntas-Revista internacional de Filosofía, Vol. 11, Núm. 3, 2020)",
            link: "/enfermedad-medicina-y-magia-en-el-sistema-filosofico-de-schopenhauer",
            isExternal: false
        },
        {
            fullText: "Die Magie in Schopenhauers Metaphysik: ein Weg, um uns als ‘magisches Nichts’ zu erkennen [La magia en la metafísica de Schopenhauer: una vía para conocernos como ‘nada mágica’]. (95. Jahrbuch der Schopenhauer-Gesellschaft, 2014)",
            link: "/die-magie-in-schopenhauers-metaphysik-ein-weg-um-uns-als-magisches-nichts-zu-erkennen",
            isExternal: false
        }
    ];

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-stone-300">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif text-gold-dim mb-12 text-center uppercase tracking-widest border-b border-white/5 pb-8">
                    {introPage?.title || 'Trabajos sobre Schopenhauer'}
                </h1>

                {/* Schopenhauer Portrait */}
                <div className="flex justify-center mb-16">
                    <img
                        src="/images/generated/arthur_schopenhauer.png"
                        alt="Arthur Schopenhauer"
                        className="max-w-lg w-full h-auto rounded-sm border-2 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>

                {/* Intro Content Removed as requested */}


                {/* List of Works - Visually Separated */}
                <div className="space-y-12 mt-16 border-t border-white/5 pt-16">
                    <h2 className="text-2xl font-serif text-white text-center uppercase tracking-widest mb-12">Publicaciones Destacadas</h2>

                    {workItems.map((work, idx) => (
                        <div key={idx} className={`bg-void-light border ${work.isExternal ? 'border-gold-dim/30 shadow-[0_0_20px_rgba(212,175,55,0.05)]' : 'border-white/5'} p-8 md:p-10 transition-all duration-300 hover:border-gold-dim/50`}>
                            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                                <div className="flex-1">
                                    <h3 className={`text-xl font-serif ${work.isExternal ? 'text-gold-dim md:text-2xl' : 'text-white'} mb-4 leading-snug`}>
                                        {work.fullText}
                                    </h3>
                                </div>
                                {work.isExternal ? (
                                    <a
                                        href={work.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="shrink-0 px-8 py-4 bg-gold-dim text-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                                    >
                                        Ver Publicación
                                    </a>
                                ) : (
                                    <Link
                                        to={work.link}
                                        className="shrink-0 px-6 py-3 border border-white/20 text-stone-300 text-xs uppercase tracking-widest hover:border-gold-dim hover:text-gold-dim transition-all"
                                    >
                                        Leer Artículo
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Schopenhauer;
