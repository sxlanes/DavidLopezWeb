import React from 'react';
import { BookOpen } from 'lucide-react';
import booksData from '../data/books_extracted.json';

const Books: React.FC = () => {
    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void">
            <h1 className="text-4xl font-serif text-gold-dim mb-16 text-center tracking-widest uppercase">Libros</h1>
            <div className="max-w-4xl mx-auto space-y-10">
                {booksData.map((book: any, idx: number) => {
                    // Use extracted image or fallback
                    const imageUrl = book.image || `https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1000&auto=format&fit=crop`;

                    return (
                        <div key={idx} className="flex flex-col md:flex-row bg-void-light border border-white/5 p-8 items-start gap-8 hover:border-gold-dim/30 transition-all group">
                            <div className="w-full md:w-40 h-64 flex-shrink-0 relative overflow-hidden shadow-2xl self-center md:self-start">
                                <img
                                    src={imageUrl}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {!book.image && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-stone-800/50 backdrop-blur-sm">
                                        <BookOpen size={32} className="text-white/50" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left h-full">
                                <h3 className="text-2xl font-serif text-white mb-4 leading-tight">{book.title}</h3>
                                <div
                                    className="text-stone-400 mb-8 text-sm leading-relaxed line-clamp-4 prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: book.content.replace(/<[^>]+>/g, '').substring(0, 300) + '...' }}
                                />
                                <div className="mt-auto">
                                    <a
                                        href={book.amazonLink || book.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block border border-gold-dim text-gold-dim px-8 py-3 text-xs uppercase tracking-widest hover:bg-gold-dim hover:text-black transition-all"
                                    >
                                        {book.amazonLink ? 'Ver en Amazon' : 'Leer Más'}
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Books;
