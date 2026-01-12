import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import pagesData from '../data/pages.json';
import dictionaryIndices from '../data/dictionaryIndices.json';

const BailarinasLogicas: React.FC = () => {
    // Get page data for Title and Intro Image
    const pageData = (pagesData as any[]).find((p: any) => p.post_name === 'las-bailarinas-logicas');

    // Extract Main Image from content
    const introImage = useMemo(() => {
        if (!pageData) return null;
        // Simple regex to find the first image in content
        const imgMatch = pageData.content.match(/<img[^>]+src="([^">]+)"/);
        return imgMatch ? imgMatch[1] : null;
    }, [pageData]);

    // Group entries by First Letter
    const groupedEntries = useMemo(() => {
        const sorted = [...dictionaryIndices].sort((a, b) => a.term.localeCompare(b.term));
        const groups: Record<string, typeof dictionaryIndices> = {};

        sorted.forEach(entry => {
            // Get first letter, normalize accents (e.g. Á -> A)
            const letter = entry.term.charAt(0).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(entry);
        });

        return groups;
    }, []);

    const letters = Object.keys(groupedEntries).sort();

    if (!pageData) return null;

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-stone-300">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 text-center uppercase tracking-widest relative inline-block">
                        <span className="text-gold-dim block mb-2 text-xs md:text-sm tracking-[0.3em] font-light uppercase">Diccionario Filosófico</span>
                        Las Bailarinas Lógicas
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gold-dim mt-4"></span>
                    </h1>

                    {/* Centered Intro Image - reduced size for better density */}
                    {introImage && (
                        <div className="flex justify-center mt-8 mb-8">
                            <div className="p-1 bg-gradient-to-b from-gold-dim/20 to-transparent rounded-sm shadow-xl opacity-90 transition-opacity hover:opacity-100">
                                <img
                                    src={introImage}
                                    alt="Las Bailarinas Lógicas"
                                    className="max-w-[200px] md:max-w-[260px] w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Content - Dictionary Columns Layout */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 mx-auto">
                    {letters.map(letter => (
                        <div key={letter} className="break-inside-avoid-column mb-10 group">
                            <div className="flex items-center border-b border-white/10 mb-3 pb-1">
                                <span className="text-3xl font-serif text-gold-dim/80 mr-2">{letter}</span>
                                <div className="h-px bg-white/5 flex-grow"></div>
                            </div>
                            <ul className="space-y-1">
                                {groupedEntries[letter].map((entry, idx) => (
                                    <li key={idx}>
                                        <Link
                                            to={`/${entry.slug}`}
                                            className="block py-0.5 px-2 -mx-2 rounded hover:bg-white/5 text-sm font-serif text-stone-400 hover:text-white transition-all duration-200"
                                        >
                                            {entry.term}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12 text-xs text-stone-600 uppercase tracking-widest border-t border-white/5 pt-8">
                    {dictionaryIndices.length} Conceptos definidos
                </div>
            </div>
        </div>
    );
};

export default BailarinasLogicas;
