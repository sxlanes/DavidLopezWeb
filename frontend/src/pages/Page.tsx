import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import pagesData from '../data/pages.json';
import postsData from '../data/posts.json';

// Normalize content to fix image paths or styling if needed
const processContent = (content: string) => {
    if (!content) return '';
    // Fix relative paths or styling issues if any
    return content;
};

const Page: React.FC = () => {
    const { slug, id } = useParams<{ slug?: string; id?: string }>();
    const location = useLocation();
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // If ID is present (from /post/:id route), lookup by ID directly
        if (id) {
            const foundPostById = (postsData as any[]).find((p: any) => String(p.post_id) === String(id));
            setPageData(foundPostById || null);
            setLoading(false);
            return;
        }

        let currentSlug = slug;
        if (!currentSlug) {
            // If we are at the root or a static path without :slug, try to derive it
            currentSlug = location.pathname.split('/').filter(Boolean).pop() || '';
        }

        // Mapping for some routes if they don't match exactly
        const slugMapping: Record<string, string> = {
            'novelas': 'novelas',
            'contacto': 'contacto',
            'sobre-mi': 'sobre-david-lopez',
        };

        if (slugMapping[currentSlug]) {
            currentSlug = slugMapping[currentSlug];
        }

        const foundPage = pagesData.find((p: any) => p.post_name === currentSlug);

        if (foundPage) {
            setPageData(foundPage);
        } else {
            // Fallback: Check posts if not found in pages
            let foundPost = (postsData as any[]).find((p: any) => p.post_name === currentSlug);

            // Critical Fallback for Dictionary Terms
            if (!foundPost && currentSlug && currentSlug.length > 2) {
                const parts = currentSlug.split('-');
                const termToSearch = parts[parts.length - 1];

                foundPost = (postsData as any[]).find((p: any) => {
                    const normalizedTitle = p.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return normalizedTitle.includes(termToSearch.toLowerCase()) ||
                        normalizedTitle.includes(currentSlug.replace(/-/g, ' '));
                });
            }

            setPageData(foundPost || null);
        }
        setLoading(false);

    }, [slug, id, location.pathname]);

    if (loading) {
        return (
            <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-center flex items-center justify-center">
                <div className="animate-pulse text-gold-dim tracking-widest uppercase font-serif">Buscando en el Huerto Infinito...</div>
            </div>
        );
    }

    if (!pageData) {
        return (
            <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-center flex flex-col items-center justify-center">
                <h1 className="text-3xl font-serif text-gold-dim mb-4 tracking-widest uppercase">Página no encontrada</h1>
                <p className="text-stone-400 mb-8 max-w-md">El contenido que buscas parece no estar disponible en el archivo local.</p>
                <a href="#/" className="text-gold-dim border border-gold-dim/30 px-6 py-2 hover:bg-gold-dim hover:text-black transition-all uppercase tracking-widest text-xs">
                    Volver al Menú Principal
                </a>
            </div>
        );
    }

    // Process content to make it responsive and styled
    let processedContent = pageData.content
        .replace(/aligncenter/g, 'mx-auto block')
        .replace(/alignleft/g, 'float-left mr-4 mb-4')
        .replace(/alignright/g, 'float-right ml-4 mb-4')
        .replace(/<iframe/g, '<div class="aspect-w-16 aspect-h-9 my-8 bg-black/50"><iframe class="w-full h-full border-0"')
        .replace(/<\/iframe>/g, '</iframe></div>')
        .replace(/http:\/\/www\.youtube\.com/g, 'https://www.youtube.com')
        .replace(/http:\/\/youtube\.com/g, 'https://www.youtube.com');

    if (pageData.custom_class === 'small-cover') {
        processedContent = processedContent.replace(/<img /g, '<img class="max-w-xs mx-auto shadow-2xl rounded-sm" ');
    }

    const containerClass = pageData.custom_class === 'large-image' ? "max-w-6xl mx-auto" : "max-w-4xl mx-auto";

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-stone-300">
            <div className={containerClass}>
                <h1 className="text-4xl md:text-5xl font-serif text-gold-dim mb-16 text-center uppercase tracking-widest border-b border-white/5 pb-8">
                    {pageData.title}
                </h1>

                <div
                    className="prose prose-invert prose-lg prose-gold mx-auto font-serif leading-relaxed max-w-none
                    prose-headings:font-serif prose-headings:tracking-widest prose-headings:uppercase prose-headings:text-gold-dim
                    prose-p:text-stone-300 prose-p:mb-6
                    prose-a:text-gold-dim prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-md prose-img:shadow-2xl prose-img:border prose-img:border-white/5
                    prose-strong:text-white prose-strong:font-bold"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                    onClick={(e) => {
                        const target = e.target as HTMLElement;
                        const link = target.closest('a');
                        if (link) {
                            const href = link.getAttribute('href');
                            if (href && (href.startsWith('/') || href.includes(window.location.hostname) || href.includes('localhost'))) {
                                // If using HashRouter, we should update the hash
                                const path = href.startsWith('/') ? href : new URL(href).pathname;
                                e.preventDefault();
                                window.location.hash = path;
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Page;
