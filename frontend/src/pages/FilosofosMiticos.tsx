import React, { useMemo } from 'react';
import pagesData from '../data/pages.json';
import idSlugMap from '../data/id_slug_map.json';
import DictionaryLayout from '../components/DictionaryLayout';

const FilosofosMiticos: React.FC = () => {
    const pageData = (pagesData as any[]).find((p: any) => p.post_name === 'filosofos-miticos-del-mitico-siglo-xx');

    // Extract entries from content HTML using DOMParser (safe in browser)
    const entries = useMemo(() => {
        if (!pageData?.content) return [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(pageData.content, 'text/html');
        // Select all anchors inside the content paragraphs
        return Array.from(doc.querySelectorAll('a'))
            .map(a => {
                // Clean term: Remove hyphens, bullets, extra spaces from start
                const term = (a.textContent?.trim() || '').replace(/^[-–—]\s*/, '').trim();

                let link = a.getAttribute('href') || '';

                // Fix WordPress links
                if (link.includes('davidlopez.info')) {
                    try {
                        const url = new URL(link);
                        const pParam = url.searchParams.get('p');

                        if (pParam && (idSlugMap as any)[pParam]) {
                            const mappedSlug = (idSlugMap as any)[pParam];
                            // If mappedSlug starts with ?p=, it means we didn't find a nice slug
                            if (mappedSlug.startsWith('?p=')) {
                                link = `/post/${pParam}`;
                            } else {
                                link = `/${mappedSlug}`;
                            }
                        } else if (pParam) {
                            link = `/post/${pParam}`;
                        } else {
                            // Attempt to use pathname if no p param
                            link = url.pathname;
                        }
                    } catch (e) {
                        // invalid url, keep original
                    }
                }

                return { term, link };
            })
            .filter(entry => entry.term.length > 1 && entry.link)
            .sort((a, b) => a.term.localeCompare(b.term, 'es', { sensitivity: 'base' }));
    }, [pageData]);

    // Extract intro image if available (usually the first image in content)
    const introImage = useMemo(() => {
        if (!pageData?.content) return null;
        const match = pageData.content.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
    }, [pageData]);

    if (!pageData) return null;

    return (
        <DictionaryLayout
            title="Filósofos míticos del siglo XX"
            subtitle="Diccionario Filosófico"
            introImage={introImage}
            entries={entries}
        />
    );
};

export default FilosofosMiticos;
