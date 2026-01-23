
const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/posts.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/pages.json'), 'utf8'));

const allData = [...posts, ...pages];
const existingSlugs = new Set(allData.map(d => d.post_name).filter(Boolean));
const existingIds = new Set(allData.map(d => String(d.post_id)));

const missingPages = new Set();
const linkRegex = /href="([^"]+)"/g;

allData.forEach(item => {
    if (!item.content) return;
    let match;
    while ((match = linkRegex.exec(item.content)) !== null) {
        let href = match[1];
        if (href.includes('davidlopez.info')) {
            const cleanHref = href.split(/[?#]/)[0];
            const parts = cleanHref.split('/').filter(p => p && !p.includes('davidlopez.info'));
            const slug = parts.pop();

            if (!slug) continue;
            if (slug.match(/\.(jpg|jpeg|png|gif|pdf|bmp|php|heic)$/i)) continue;
            if (slug.startsWith('?p=')) {
                const id = slug.split('=').pop();
                if (!existingIds.has(id)) missingPages.add(href);
                continue;
            }
            if (!existingSlugs.has(slug)) {
                missingPages.add(href);
            }
        }
    }
});

console.log(JSON.stringify([...missingPages], null, 2));
