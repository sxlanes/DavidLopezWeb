import React from 'react';
import { Link } from 'react-router-dom';
import pagesData from '../data/pages.json';

const targetSlugs = [
    'las-manos-de-julia-novela',
    'el-bosque-de-albaricoques',
    'el-nuevo-filosofo-del-martillo-novela' // Chosen based on "Novela" suffix match
];

const Novels: React.FC = () => {
    // Find the pages that match the slugs and SORT them by the defined order
    const novels = pagesData
        .filter((page: any) => targetSlugs.includes(page.post_name))
        .sort((a: any, b: any) => {
            return targetSlugs.indexOf(a.post_name) - targetSlugs.indexOf(b.post_name);
        });

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void">
            <h1 className="text-4xl font-serif text-gold-dim mb-16 text-center tracking-widest uppercase">Obras de Ficción</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {novels.map((novel: any, idx: number) => {
                    // Custom Covers Map
                    const customCovers: Record<string, string> = {
                        'el-bosque-de-albaricoques': '/images/bosque_cover_final.png'
                    };

                    // Use custom cover if available, else extract from content, else fallback
                    const imgMatch = novel.content.match(/src="([^"]+)"/);
                    const imageUrl = customCovers[novel.post_name] || novel.custom_cover || (imgMatch ? imgMatch[1] : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80');

                    // Force small cover layout for consistency as requested
                    const isSmallCover = true;

                    return (
                        <Link to={`/${novel.post_name}`} key={idx} className="group block bg-void-light border border-white/5 hover:border-gold-dim/30 transition-all duration-500 overflow-hidden flex flex-col h-full">
                            <div className="aspect-[2/3] overflow-hidden relative flex items-center justify-center bg-void-darker">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                <img
                                    src={imageUrl}
                                    alt={novel.title}
                                    className={`w-full h-full transform transition-transform duration-700 ${isSmallCover ? 'object-contain p-12 group-hover:scale-110' : 'object-cover group-hover:scale-105'
                                        }`}
                                />
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-xl font-serif text-white mb-6 leading-relaxed group-hover:text-gold-dim transition-colors">{novel.title}</h3>
                                <div
                                    className="text-stone-400 text-sm mb-8 flex-1 line-clamp-5 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: novel.content
                                            ? novel.content
                                                .replace(/<img[^>]*>/g, '') // Remove images
                                                .replace(/<\/?[^>]+(>|$)/g, " ") // Strip tags with space
                                                .replace(/&nbsp;/g, ' ')
                                                .substring(0, 300) + '...'
                                            : ''
                                    }}
                                />
                                <div className="mt-auto">
                                    <span className="inline-block bg-void border border-gold-dim text-gold-dim text-xs uppercase tracking-widest px-6 py-3 hover:bg-gold-dim hover:text-black transition-all font-bold">
                                        Más Información
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Novels;
