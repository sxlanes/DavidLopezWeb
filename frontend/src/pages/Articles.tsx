
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import postsData from '../data/posts.json';
import { getPostImage, Post } from '../utils/contentHelpers';

const Articles: React.FC = () => {
    // List of slugs that have dedicated menu sections - exclude these from general listing
    const dedicatedSectionSlugs = [
        'las-bailarinas-logicas',
        'filosofos-miticos-del-mitico-siglo-xx',
        'pensadores-pensando-en-2015',
        'criticas-literarias',
        'sobre-schopenhauer',
        'sobre-mi',
        'redes-sociales'
    ];

    // Explicit blacklist of IDs for empty/announcement/redundant posts
    const excludedPostIds = [
        '352', '493', '1755', '2183', '4464', '5067', '6753', '8480', '13702', '14973', '4363'
    ];

    // 1. Sort all posts by date (newest first) and filter out dedicated sections
    const sortedPosts = useMemo(() => {
        return [...(postsData as any[])]
            .filter((post: any) => {
                // Exclude explicit dedicated section slugs
                if (dedicatedSectionSlugs.includes(post.post_name)) return false;

                // Exclude explicit blacklisted IDs (empty/redundant content)
                if (excludedPostIds.includes(String(post.post_id))) return false;

                // Filter out empty content (short or just a link)
                if (!post.content || post.content.length < 100) return false;

                // Aggressive filtering by Title to avoid duplication with dedicated menus
                const title = (post.title || '').toLowerCase();
                const exclusionKeywords = [
                    'bailarinas lógicas',
                    'bailarina lógica',
                    'the logical ballerinas',
                    'mis bailarinas lógicas',
                    'curso',
                    'cursos',
                    'novela',
                    'filósofos míticos',
                    'pensadores en 2015',
                    'schopenhauer',
                    'crítica literaria',
                    // Specific exclusions requested by user
                    'filosofía de la inteligencia artificial',
                    'platón. obras completas',
                    'el arte y la guerra',
                    'física y metafísica',
                    'sex puncta mystica',
                    'escuela libre de filosofía',
                    'programa del mes',
                    'un aviso y el olor',
                    'conferencia del',
                    'conferencia del lunes',
                    'conferencia del 21',
                    'conferencia del 12',
                    'conferencia del 26',
                    'conferencia del 22',
                    'feliz navidad',
                    'aviso importante',
                    'diccionario filosófico'
                ];

                if (exclusionKeywords.some(keyword => title.includes(keyword))) {
                    return false;
                }

                // Exclude specific categories if present
                const categories = Array.isArray(post.categories) ? post.categories : [post.categories];
                if (categories.some((c: string) =>
                    c === 'Novelas' ||
                    c === 'Cursos' ||
                    c === 'Diccionarios filosóficos' ||
                    c === 'Bailarinas Lógicas'
                )) return false;

                return true;
            })
            .sort((a: any, b: any) =>
                new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
            );
    }, []);

    return (
        <div className="pt-10 pb-20 container mx-auto px-6 bg-void text-stone-300 min-h-screen">
            <h1 className="text-4xl md:text-5xl font-serif text-gold-dim mb-16 text-center tracking-widest uppercase border-b border-white/5 pb-8">
                Artículos y Ensayos
            </h1>

            {/* --- All Articles Section --- */}
            <div className="mb-12">
                <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                    <h2 className="text-2xl font-serif text-white uppercase tracking-widest pl-4 border-l-2 border-stone-600">
                        Todos los Artículos
                    </h2>
                    <span className="text-xs text-stone-500 uppercase tracking-wider hidden md:block">
                        {sortedPosts.length} Artículos
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {sortedPosts.map((post: any, idx) => {
                        // Offset index for unique images
                        const imageUrl = getPostImage(post, idx);
                        // Robust linking: Use slug if available, otherwise use ID-based route
                        const linkTarget = post.post_name ? `/${post.post_name}` : `/post/${post.post_id}`;

                        // Determine image source: found image OR fallback
                        const displayImage = imageUrl || `/images/generated/article_abstract_${(idx % 4) + 1}.png`;

                        return (
                            <div key={idx} className="group flex flex-col h-full hover:bg-white/5 p-4 -m-4 rounded-lg transition-colors relative">
                                <Link to={linkTarget} className="absolute inset-0 z-10" aria-label={`Leer ${post.title}`}></Link>

                                <div className="h-48 overflow-hidden relative mb-4 rounded-sm">
                                    <div className="absolute inset-0 bg-void/10 group-hover:bg-transparent transition object-cover" />
                                    <img
                                        src={displayImage}
                                        alt={post.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        loading="lazy"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.src = '/images/generated/article_abstract_4.png';
                                        }}
                                    />
                                </div>

                                <h3 className="text-base font-serif text-stone-300 mb-2 leading-snug group-hover:text-white transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <div className="mt-auto pt-2 flex justify-between items-center text-xs text-stone-600 uppercase tracking-widest relative z-20 pointer-events-none">
                                    <span>{new Date(post.pubDate).toLocaleDateString()}</span>
                                    <span className="group-hover:text-gold-dim transition-colors">Leer &rarr;</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Articles;
