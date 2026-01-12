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

    useEffect(() => {
        // If ID is present (from /post/:id route), lookup by ID directly
        if (id) {
            const foundPostById = (postsData as any[]).find((p: any) => String(p.post_id) === String(id));
            setPageData(foundPostById || null);
            return;
        }

        // Determine slug from URL or props
        // If the route is /:slug, we use that. 
        // Some pages might be hardcoded like /cursos, but here we handle the generic pages.

        let currentSlug = slug;
        if (!currentSlug) {
            // Handle static routes by stripping the leading slash
            currentSlug = location.pathname.substring(1);
        }

        // Mapping for some routes if they don't match exactly
        const slugMapping: Record<string, string> = {
            'novelas': 'novelas', // or 'novelas-2' depending on content preference
            'contacto': 'contacto',
            'sobre-mi': 'sobre-david-lopez', // Mapped "About Me" to the correct slug
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

            // Critical Fallback for Dictionary Terms (which seem to lack slugs in JSON)
            // We search for the term in the title if the specific slug isn't found
            if (!foundPost && currentSlug) {
                // Heuristic: Extract the last part of the slug (often the term)
                // e.g. "escuela-libre...-apara-vidya" -> "apara vidya"
                const parts = currentSlug.split('-');
                // Try matching the last part, then last 2, etc.
                const lastPart = parts[parts.length - 1]; // "vidya"
                const lastTwo = parts.slice(-2).join(' '); // "apara vidya"

                // Try finding by normalized title inclusion
                foundPost = (postsData as any[]).find((p: any) => {
                    const normalizedTitle = p.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    // Check if title includes the term (normalized)
                    // We prioritize specific dictionary titles if possible
                    return normalizedTitle.includes(lastTwo.toLowerCase()) ||
                        normalizedTitle.includes(lastPart.toLowerCase()) ||
                        normalizedTitle.includes(currentSlug.replace(/-/g, ' '));
                });
            }

            setPageData(foundPost || null);
        }

    }, [slug, location.pathname]);

    if (!pageData) {
        return (
            <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-center flex items-center justify-center">
                <div className="animate-pulse text-gold-dim tracking-widest uppercase">Cargando contenido...</div>
            </div>
        );
    }

    // Process content to make it responsive and styled
    let processedContent = pageData.content
        .replace(/aligncenter/g, 'mx-auto block')
        .replace(/alignleft/g, 'float-left mr-4 mb-4')
        .replace(/alignright/g, 'float-right ml-4 mb-4')
        .replace(/<iframe/g, '<div class="aspect-w-16 aspect-h-9 my-8"><iframe class="w-full h-full border-0"')
        .replace(/<\/iframe>/g, '</iframe></div>')
        // Remove fixed dimensions from images to allow responsive scaling
        .replace(/width="\d+"/g, '')
        .replace(/height="\d+"/g, '');

    // If marked for small cover, enforce constraint on images
    if (pageData.custom_class === 'small-cover') {
        processedContent = processedContent.replace(/<img /g, '<img class="max-w-xs mx-auto shadow-2xl rounded-sm" ');
    }





    const containerClass = pageData.custom_class === 'large-image' ? "max-w-6xl mx-auto" : "max-w-4xl mx-auto";

    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-stone-300">
            <div className={containerClass}>

                {/* Hero Image if available */}


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
                                // Extract path if it's a full URL
                                const url = new URL(href, window.location.origin);
                                if (url.origin === window.location.origin) {
                                    e.preventDefault();
                                    // Manually update URL and trigger React Router... 
                                    // Since we don't have navigate handy in this scope without refactoring for useNavigate hook which we can do.
                                    // Be lazy: pushState and dispatch popstate.
                                    window.history.pushState({}, '', url.pathname + url.search);
                                    const navEvent = new PopStateEvent('popstate');
                                    window.dispatchEvent(navEvent);
                                }
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Page;
