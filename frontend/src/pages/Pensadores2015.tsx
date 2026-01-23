import React, { useMemo } from 'react';
import pagesData from '../data/pages.json';
import DictionaryLayout from '../components/DictionaryLayout';

const Pensadores2015: React.FC = () => {
    const pageData = (pagesData as any[]).find((p: any) => p.post_name === 'pensadores-pensando-en-2015');

    // Extract entries from content HTML using DOMParser
    const entries = useMemo(() => {
        if (!pageData?.content) return [];
        const parser = new DOMParser();
        const doc = parser.parseFromString(pageData.content, 'text/html');
        return Array.from(doc.querySelectorAll('a'))
            .map(a => ({
                term: a.textContent?.trim() || '',
                link: a.getAttribute('href') || ''
            }))
            .filter(entry => entry.term.length > 1 && entry.link); // Filter out empty or image-only links
    }, [pageData]);

    const introImage = useMemo(() => {
        if (!pageData?.content) return null;
        const match = pageData.content.match(/<img[^>]+src="([^">]+)"/);
        return match ? match[1] : null;
    }, [pageData]);

    if (!pageData) return null;

    return (
        <DictionaryLayout
            title="Pensadores vivos en 2015"
            subtitle="Diccionario Filosófico"
            introImage={introImage}
            entries={entries}
        />
    );
};

export default Pensadores2015;
