
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'src/data/posts.json');
let posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

let matchCount = 0;

posts = posts.map(post => {
    if (!post.content) return post;

    let content = post.content;

    // 1. Replace Footnotes
    content = content.replace(/href="[^"]*davidlopez\.info[^"]*?(#_?ftn.+?)"/g, (match, anchor) => {
        matchCount++;
        return `href="${anchor}"`;
    });

    // 2. Replace ID links (variants: ?p=, ?page_id=)
    content = content.replace(/href="[^"]*davidlopez\.info\/\?(?:p|page_id)=(\d+)"/g, (match, id) => {
        matchCount++;
        if (id === '173') return 'href="/criticas-literarias"';
        return `href="/post/${id}"`;
    });

    // 3. Generic Replacement for davidlopez.info URLs
    content = content.replace(/href="https?:\/\/(?:www\.)?davidlopez\.info\/([^"]+)"/g, (match, fullPath) => {
        // Ignore files
        if (fullPath.match(/\.(jpg|jpeg|png|gif|pdf|bmp|heic|php)$/i)) return match;

        // Extract the ultimate slug
        const parts = fullPath.split(/[?#]/)[0].split('/').filter(Boolean);
        const slug = parts.pop();

        if (slug) {
            matchCount++;
            return `href="/${slug}"`;
        }
        return match;
    });

    // 4. Update the top-level "link" field
    if (post.link && post.link.includes('davidlopez.info')) {
        const idMatch = post.link.match(/[?&](?:p|page_id)=(\d+)/);
        if (idMatch) {
            post.link = `/post/${idMatch[1]}`;
        } else {
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
