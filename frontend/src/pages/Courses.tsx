import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import pagesData from '../data/pages.json';
import postsData from '../data/posts.json';

const Courses: React.FC = () => {
    // Specific Course configuration with Slugs
    const courseConfig = [
        { slug: "platon-obras-completas", displayTitle: "PLATÓN. OBRAS COMPLETAS", imageFallback: "https://www.davidlopez.info/wp-content/uploads/2012/10/Plat%C3%B3n-y-los-di%C3%A1logos-2-1024x768.jpg" }, // Found in search
        { slug: "nuevo-curso-online", displayTitle: "SCHOPENHAUER. OBRAS E IDEAS COMPLETAS", imageFallback: "https://www.davidlopez.info/wp-content/uploads/2013/05/Schopenhauer-y-el-dolor-del-mundo-1.jpg" },
        { slug: "nuevo-curso-online-fisica-y-metafisica-de-la-inteligencia-artificial", displayTitle: "FÍSICA Y METAFÍSICA DE LA INTELIGENCIA ARTIFICIAL", imageFallback: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000" },
        { slug: "poderosos-conceptos", displayTitle: "PODEROSOS CONCEPTOS" },
        { slug: "curso-de-filosofia-del-arte", displayTitle: "FILOSOFÍA DEL ARTE" },
        { slug: "curso-de-filosofia-de-la-ciencia", displayTitle: "FILOSOFÍA DE LA CIENCIA" },
        { slug: "la-gran-metafisica", displayTitle: "LA GRAN METAFÍSICA" },
        { slug: "filosofia-de-la-politica", displayTitle: "FILOSOFÍA DE LA POLÍTICA" },
        { slug: "filosofia-y-actualidad-conferencias-interactivas", displayTitle: "FILOSOFÍA Y ACTUALIDAD (Conferencias-debate)" }
    ];

    // Combine data sources
    const allData = [...(pagesData as any[]), ...(postsData as any[])];

    // Select the pages
    const selectedCourses = courseConfig.map(config => {
        // Try exact slug match
        const page = allData.find((p: any) => p.post_name === config.slug);

        if (!page) {
            console.warn(`Course not found for slug: ${config.slug}`);
            return null;
        }

        return {
            ...page,
            displayTitle: config.displayTitle,
            imageFallback: (config as any).imageFallback // Keep the fallback
        };
    }).filter(Boolean);

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void">
            <h1 className="text-4xl font-serif text-gold-dim mb-16 text-center tracking-widest uppercase">Cursos Online</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {selectedCourses.map((course: any, index: number) => {
                    // Strict priority: custom_cover > imageFallback > consistent default. No extraction from content if it varies.
                    const imageUrl = course.custom_cover || course.imageFallback || '/images/generated/course_conceptos.png';

                    return (
                        <div key={course.id || index} className="bg-void-light border border-white/5 overflow-hidden group hover:border-gold-dim/30 transition-all duration-300 flex flex-col h-full">
                            <div className="h-56 overflow-hidden relative">
                                <div className="absolute inset-0 bg-void/20 group-hover:bg-transparent transition-colors z-10" />
                                <img
                                    src={imageUrl}
                                    alt={course.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-8 flex-1 flex flex-col">
                                <h3 className="text-xl font-serif text-white mb-4 leading-snug min-h-[3.5rem]">{course.title}</h3>
                                <div
                                    className="text-stone-400 text-sm mb-6 flex-1 line-clamp-4 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: course.content ? course.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...' : '' }}
                                />
                                <div className="flex justify-between items-center mt-auto pt-6 border-t border-white/5">
                                    {/* Link to the course's slug if available, using the generic Page component or specialized detail */}
                                    {/* The link property in data often points to the old full URL. We need to extract the slug. */}
                                    <Link
                                        to={`/${course.link ? course.link.split('/').filter(Boolean).pop() : 'cursos'}`}
                                        className="flex items-center space-x-2 text-gold-dim hover:text-white transition-colors group/btn"
                                    >
                                        <ShoppingBag size={16} />
                                        <span className="text-xs uppercase tracking-widest font-bold border-b border-transparent group-hover/btn:border-gold-dim pb-0.5 transition-all">Ver Curso</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Courses;
