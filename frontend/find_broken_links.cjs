
const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/posts.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/pages.json'), 'utf8'));

const allData = [...posts, ...pages];
const existingSlugs = new Set(allData.map(d => d.post_name).filter(Boolean));
const existingIds = new Set(allData.map(d => String(d.post_id)));

const brokenLinks = new Set();
const linkRegex = /href="([^"]+)"/g;

allData.forEach(item => {
    if (!item.content) return;
    let match;
    while ((match = linkRegex.exec(item.content)) !== null) {
        let href = match[1];

        // Only interested in internal links
        if (href.startsWith('/') || href.includes('davidlopez.info')) {
            // Clean up hash/query
            const cleanHref = href.split(/[?#]/)[0];
            const slug = cleanHref.split('/').filter(Boolean).pop();

            if (!slug) continue;

            // Check if it's a post ID link /post/123
            if (cleanHref.includes('/post/')) {
                const id = cleanHref.split('/post/').pop();
                if (!existingIds.has(id)) {
                    brokenLinks.add(href);
                }
                continue;
            }

            // Check if it's a slug that doesn't exist
            if (!existingSlugs.has(slug) && !existingIds.has(slug)) {
                // Also check if it's a file
                if (!slug.match(/\.(jpg|jpeg|png|gif|pdf|bmp|php)$/i)) {
                    brokenLinks.add(href);
                }
            }
        }
    }
});

console.log('--- BROKEN/MISSING LINKS ---');
[...brokenLinks].forEach(l => console.log(l));
