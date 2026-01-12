import React, { useEffect, useState } from 'react';
import pagesData from '../data/pages.json';

const FilosofosMiticos: React.FC = () => {
    const [pageData, setPageData] = useState<any>(null);

    useEffect(() => {
        const foundPage = pagesData.find((p: any) => p.post_name === 'filosofos-miticos-del-mitico-siglo-xx');
        setPageData(foundPage || null);
    }, []);

    if (!pageData) {
        return (
            <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-center flex items-center justify-center">
                <div className="animate-pulse text-gold-dim tracking-widest uppercase">Cargando contenido...</div>
            </div>
        );
    }

    // Process content to remove the first image if we are going to show it separately/larger
    // Or just let it be, but we want the Main Image to be huge and separated.
    // Let's assume we extract the first image to show it at the top.

    let content = pageData.content || '';
    let mainImage = '';

    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) {
        mainImage = imgMatch[1];
        // Remove the image from content so it doesn't duplicate
        // content = content.replace(imgMatch[0], ''); // Optional: user might want it removed from text if shown at top
    }

    // Use custom cover if available over extracted
    if (pageData.custom_cover) {
        mainImage = pageData.custom_cover;
    }

    // Clean up content styling
    const processedContent = content
        .replace(/aligncenter/g, 'mx-auto block')
        .replace(/<img[^>]*>/g, '') // Remove ALL images from text if we want a clean text layout? User said "separada del texto". 
        // Let's act safe: remove the specific one if we extracted it, or maybe keep others?
        // User said "la imagen tiene que estar mas grande y mas separada".
        // Best bet: Display main image at top, strip it from content.
        .replace(/<\/?[^>]+(>|$)/g, (tag) => {
            // Keep basic formatting tags
            return tag;
        });


    return (
        <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-void text-stone-300">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-serif text-gold-dim mb-16 text-center uppercase tracking-widest border-b border-white/5 pb-8">
                    {pageData.title}
                </h1>

                {/* Main Feature Image - Larger and Separated */}
                {mainImage && (
                    <div className="mb-24 flex justify-center">
                        <div className="p-2 border border-white/10 bg-void-light shadow-[0_0_50px_rgba(212,175,55,0.1)]">
                            <img
                                src={mainImage}
                                alt={pageData.title}
                                className="max-w-2xl w-full h-auto object-cover block"
                            />
                        </div>
                    </div>
                )}

                {/* Content with extra separation */}
                <div
                    className="prose prose-invert prose-lg prose-gold mx-auto font-serif leading-relaxed max-w-none text-justify
                    prose-p:text-stone-300 prose-p:mb-8"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                />
            </div>
        </div>
    );
};

export default FilosofosMiticos;
