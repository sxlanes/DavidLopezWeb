
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const existingIds = new Set(posts.map(p => String(p.post_id)));
const existingSlugs = new Set(posts.map(p => p.post_name));

const referencedIds = new Set();
const otherLinks = new Set();
const missingSlugs = new Set();
const footnoteLinks = new Set();

const urlRegex = /(https?:\/\/(?:www\.)?davidlopez\.info\/[^\s"']*)/g;
const idRegex = /[?&]p=(\d+)/;

posts.forEach(post => {
    if (!post.content) return;

    let match;
    while ((match = urlRegex.exec(post.content)) !== null) {
        const url = match[1];

        // Check for ID
        const idMatch = url.match(idRegex);
        if (idMatch) {
            referencedIds.add(String(idMatch[1]));
            continue;
        }

        // Check for Footnotes
        if (url.includes('wp-admin') || url.includes('#_ftn') || url.includes('#ftn')) {
            footnoteLinks.add(url);
            continue;
        }

        // Check for attachments/files
        if (url.match(/\.(jpg|jpeg|png|gif|pdf)(\?.*)?$/i) || url.includes('attachment_id')) {
            // Ignore files for now
            continue;
        }

        // Check for Slugs
        // Extract slug from URL: davidlopez.info/slug/ or davidlopez.info/category/slug/
        try {
            // Basic slug extraction
            const cleanUrl = url.split(/[?#]/)[0]; // Remove query/hash
            const parts = cleanUrl.split('/').filter(p => p && !p.includes('davidlopez.info'));

            if (parts.length > 0) {
                const potentialSlug = parts[parts.length - 1];
                if (existingSlugs.has(potentialSlug)) {
                    // Match found!
                } else {
                    missingSlugs.add(url);
                }
            } else {
                otherLinks.add(url);
            }
        } catch (e) {
            otherLinks.add(url);
        }
    }
});

const missingIds = [...referencedIds].filter(id => !existingIds.has(id));

console.log('--- ANALYSIS V3 ---');
console.log(`Missing IDs (Content to fetch): ${missingIds.length}`);
if (missingIds.length > 0) console.log('Missing IDs:', missingIds);

console.log(`Missing Slugs (Potential external pages): ${missingSlugs.size}`);
[...missingSlugs].forEach(l => console.log(l));

console.log(`Footnote Links (To Fix): ${footnoteLinks.size}`);
