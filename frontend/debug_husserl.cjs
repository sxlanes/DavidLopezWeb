const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'src/data/posts.json');
const pagesPath = path.join(__dirname, 'src/data/pages.json');

function findPost(id) {
    try {
        const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
        const post = posts.find(p => p.post_id == id);
        if (post) return { source: 'posts', ...post };

        const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
        const page = pages.find(p => p.post_id == id);
        if (page) return { source: 'pages', ...page };

        return null;
    } catch (e) {
        console.error("Error reading files:", e);
        return null;
    }
}

const p = findPost(3304);
if (p) {
    console.log("Found post:");
    console.log("ID:", p.post_id);
    console.log("Slug:", p.post_name);
    console.log("Title:", p.title);
} else {
    console.log("Post 3304 not found.");
}
