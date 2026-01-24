import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

interface DictionaryEntry {
    term: string;
    link: string;
}

interface DictionaryLayoutProps {
    title: string;
    subtitle?: string;
    introImage?: string | null;
    entries: DictionaryEntry[];
}

const DictionaryLayout: React.FC<DictionaryLayoutProps> = ({ title, subtitle, introImage, entries }) => {

    // Group entries by First Letter
    const groupedEntries = useMemo(() => {
        const sorted = [...entries].sort((a, b) => a.term.localeCompare(b.term));
        const groups: Record<string, DictionaryEntry[]> = {};

        sorted.forEach(entry => {
            // Get first letter, normalize accents (e.g. Á -> A)
            const letter = entry.term.charAt(0).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(entry);
        });

        return groups;
    }, [entries]);

    const letters = Object.keys(groupedEntries).sort();

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-stone-300">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="relative z-10 text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 text-center uppercase tracking-widest relative inline-block">
                        {subtitle && <span className="text-gold-dim block mb-2 text-xs md:text-sm tracking-[0.3em] font-light uppercase">{subtitle}</span>}
                        {title}
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gold-dim mt-4"></span>
                    </h1>
                </div>

                {/* Background Image - Large, Fixed, Low Opacity */}
                {introImage && (
                    <div className="fixed inset-0 top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                        <div className="relative w-full h-full max-w-4xl mx-auto opacity-[0.10]">
                            <img
                                src={introImage}
                                alt={title}
                                className="w-full h-full object-contain object-center"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void"></div>
                        </div>
                    </div>
                )}

                {/* Content - Dictionary Columns Layout */}
                <div className="relative z-10 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 mx-auto">
                    {letters.map(letter => (
                        <div key={letter} className="break-inside-avoid-column mb-10 group">
                            <div className="flex items-center border-b border-white/10 mb-3 pb-1">
                                <span className="text-3xl font-serif text-gold-dim/80 mr-2">{letter}</span>
                                <div className="h-px bg-white/5 flex-grow"></div>
                            </div>
                            <ul className="space-y-1">
                                {groupedEntries[letter].map((entry, idx) => (
                                    <li key={idx}>
                                        {entry.link.startsWith('http') ? (
                                            <a
                                                href={entry.link}
                                                className="block py-0.5 px-2 -mx-2 rounded hover:bg-white/5 text-sm font-serif text-stone-400 hover:text-white transition-all duration-200"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {entry.term}
                                            </a>
                                        ) : (
                                            <Link
                                                to={entry.link}
                                                className="block py-0.5 px-2 -mx-2 rounded hover:bg-white/5 text-sm font-serif text-stone-400 hover:text-white transition-all duration-200"
                                            >
                                                {entry.term}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12 text-xs text-stone-600 uppercase tracking-widest border-t border-white/5 pt-8">
                    {entries.length} Entradas
                </div>
            </div>
        </div>
    );
};

export default DictionaryLayout;
