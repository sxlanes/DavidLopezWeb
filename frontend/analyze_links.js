
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const existingIds = new Set(posts.map(p => String(p.post_id)));
const existingSlugs = new Set(posts.map(p => p.post_name));

const referencedIds = new Set();
const otherLinks = new Set();

const urlRegex = /(https?:\/\/(?:www\.)?davidlopez\.info\/[^\s"']*)/g;
const idRegex = /[?&]p=(\d+)/;

posts.forEach(post => {
    if (!post.content) return;

    let match;
    while ((match = urlRegex.exec(post.content)) !== null) {
        const url = match[1];
        const idMatch = url.match(idRegex);

        if (idMatch) {
            referencedIds.add(String(idMatch[1]));
        } else {
            // Check if it's a file (pdf, jpg)
            if (!url.match(/\.(jpg|jpeg|png|gif|pdf)$/i)) {
                otherLinks.add(url);
            }
        }
    }
});

const missingIds = [...referencedIds].filter(id => !existingIds.has(id));

console.log('--- ANALYSIS ---');
console.log(`Total Posts: ${posts.length}`);
console.log(`Referenced IDs in content: ${referencedIds.size}`);
console.log(`Missing IDs (Content to fetch): ${missingIds.length}`);
if (missingIds.length > 0) {
    console.log('Missing IDs:', missingIds);
}

console.log(`Other Non-ID Links (Pages/Categories): ${otherLinks.size}`);
[...otherLinks].forEach(l => console.log(l));
