const fs = require('fs');

const pages = JSON.parse(fs.readFileSync('content-extraction/pages.json', 'utf8'));
const posts = JSON.parse(fs.readFileSync('content-extraction/posts.json', 'utf8'));

const bail = pages.find(p => p.post_name === 'las-bailarinas-logicas');

const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/gi;
let match;
const entries = [];

const allContent = [...pages, ...posts];

while ((match = regex.exec(bail.content)) !== null) {
    const href = match[2];
    const text = match[3].replace(/<[^>]+>/g, '').trim();

    if (!href || href.startsWith('#') || href.includes('wp-content')) continue;
    if (!text) continue;

    // Resolve Slug
    let slug = '';
    if (href.includes('?p=')) {
        const id = href.split('?p=')[1];
        const found = allContent.find(p => String(p.ID) === id || String(p.post_id) === id);
        if (found) slug = found.post_name;
    } else {
        const parts = href.split('/').filter(p => p);
        slug = parts[parts.length - 1];
    }

    if (slug) {
        entries.push({ term: text, slug: slug });
    }
}

// Sort alphabetically
entries.sort((a, b) => a.term.localeCompare(b.term, 'es'));

fs.writeFileSync('src/data/dictionaryIndices.json', JSON.stringify(entries, null, 2));
console.log(`Generated dictionaryIndices.json with ${entries.length} entries.`);
