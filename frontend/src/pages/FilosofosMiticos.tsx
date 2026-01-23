import React, { useMemo } from 'react';
import pagesData from '../data/pages.json';
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
            .map(a => ({
                term: a.textContent?.trim() || '',
                link: a.getAttribute('href') || ''
            }))
            .filter(entry => entry.term.length > 1 && entry.link); // Filter out empty or image-only links
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
