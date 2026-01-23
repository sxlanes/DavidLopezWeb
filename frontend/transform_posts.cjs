
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'src/data/posts.json');
let posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

let matchCount = 0;

posts = posts.map(post => {
    if (!post.content) return post;

    let content = post.content;

    // 1. Replace Footnotes
    // Matches: http://davidlopez.info...#_ftn1 or similar
    content = content.replace(/href="[^"]*davidlopez\.info[^"]*?(#_?ftn.+?)"/g, (match, anchor) => {
        matchCount++;
        return `href="${anchor}"`;
    });

    // 2. Replace ID links
    // Matches: ?p=123
    content = content.replace(/href="[^"]*davidlopez\.info\/\?p=(\d+)"/g, (match, id) => {
        matchCount++;
        return `href="/post/${id}"`;
    });

    // 3. Replace simple slug links (careful with images/files)
    // We only want to replace davidlopez.info/slug/ if it's NOT a file
    content = content.replace(/href="https?:\/\/(?:www\.)?davidlopez\.info\/([^"\/]+)\/?"/g, (match, slug) => {
        if (slug.match(/\.(jpg|png|pdf|php)$/)) return match; // Ignore files
        if (slug.startsWith('?')) return match; // Ignore query params not caught above
        matchCount++;
        return `href="/${slug}"`;
    });

    // 5. Replace specific page_ids
    content = content.replace(/href="[^"]*davidlopez\.info\/\?page_id=173"/g, 'href="/criticas-literarias"');

    // Remove dead links (keep text if possible, but regex replacement of just href is safer to keep structure)
    // We replace with # for now to avoid broken navigation
    content = content.replace(/href="[^"]*davidlopez\.info\/\?page_id=(175|801|8697)"/g, 'href="#"');

    // 4. Generic Replacement for any remaining davidlopez.info links
    // Strategy: Take the last segment as slug.
    // e.g. davidlopez.info/category/foo/ -> /foo
    // davidlopez.info/2010/01/foo/ -> /foo
    content = content.replace(/href="https?:\/\/(?:www\.)?davidlopez\.info\/(?:[^\/"]+\/)*([^\/"]+)\/?"/g, (match, slug) => {
        if (slug.match(/\.(jpg|png|pdf|php)$/)) return match; // Ignore files
        if (slug.startsWith('?')) return match;
        if (slug === 'wp-admin') return 'href="#"';
        matchCount++;
        return `href="/${slug}"`;
    });

    // 7. Update the top-level "link" field if it points to WP
    if (post.link && post.link.includes('davidlopez.info')) {
        const idMatch = post.link.match(/[?&]p=(\d+)/);
        if (idMatch) {
            post.link = `/post/${idMatch[1]}`;
        } else {
            // Try to extract slug
            const parts = post.link.split(/[?#]/)[0].split('/').filter(p => p && !p.includes('davidlopez.info'));
            if (parts.length > 0) {
                post.link = `/${parts[parts.length - 1]}`;
            }
        }
    }

    return { ...post, content };
});

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 4));
console.log(`Updated posts.json. Total replacements: ${matchCount}`);
