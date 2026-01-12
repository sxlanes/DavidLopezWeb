import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import postsData from '../data/posts.json';
import { getPostImage, normalizeCategories, Post } from '../utils/contentHelpers';

const ArticlesCategory: React.FC = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();

    // Helper to match slug to category name
    const matchCategory = (slug: string, categories: string[]) => {
        const normalizedSlug = slug.toLowerCase().replace(/-/g, ' ');
        return categories.some(cat =>
            cat.toLowerCase() === normalizedSlug ||
            cat.toLowerCase().replace(/ /g, '-') === slug.toLowerCase() ||
            // Handle special cases like 'Filosofía alemana' -> 'filosofia-alemana' (accents)
            cat.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, '-') === slug.toLowerCase()
        );
    };

    const categoryPosts = useMemo(() => {
        if (!categorySlug) return [];

        return (postsData as any[]).filter((post: any) => {
            const cats = normalizeCategories(post.categories);
            return matchCategory(categorySlug, cats);
        }).sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    }, [categorySlug]);

    // Derive a display title from the slug
    const displayTitle = categorySlug?.replace(/-/g, ' ').toUpperCase();

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 bg-void text-stone-300 min-h-screen">
            <div className="mb-16 text-center">
                <Link to="/articulos" className="text-xs uppercase tracking-widest text-stone-500 hover:text-gold-dim mb-4 block">
                    &larr; Volver a Artículos
                </Link>
                <h1 className="text-4xl md:text-5xl font-serif text-gold-dim tracking-widest uppercase border-b border-white/5 pb-8 inline-block">
                    {displayTitle}
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {categoryPosts.length > 0 ? (
                    categoryPosts.map((post, idx) => {
                        const imageUrl = getPostImage(post, idx);
                        // Ensure slug exists, fallback to ID based or hash
                        const linkTarget = post.post_name ? `/${post.post_name}` : `/?p=${post.post_id}`;

                        return (
                            <Link to={linkTarget} key={idx} className="group flex flex-col h-full bg-void-light border border-white/5 hover:border-gold-dim/30 transition-all duration-300">
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-void/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-8 flex-1 flex flex-col">
                                    <h3 className="text-xl font-serif text-white mb-4 leading-snug group-hover:text-gold-dim transition-colors line-clamp-3">
                                        {post.title}
                                    </h3>
                                    <div className="mt-auto pt-6 flex justify-between items-center text-[10px] uppercase tracking-widest text-stone-500 border-t border-white/5">
                                        <span>{new Date(post.pubDate).getFullYear()}</span>
                                        <span className="group-hover:translate-x-1 transition-transform">Leer Artículo &rarr;</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-20 text-stone-500 italic">
                        No se encontraron artículos en esta categoría.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticlesCategory;
