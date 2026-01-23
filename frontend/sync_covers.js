
import fs from 'fs';

const postsPath = './src/data/posts.json';
const pagesPath = './src/data/pages.json';
let posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// Sync custom_image to custom_cover for Courses.tsx compatibility
let count = 0;
posts.forEach(p => {
    if (p.custom_image && !p.custom_cover) {
        p.custom_cover = p.custom_image;
        count++;
    }
});

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`Synced custom_image to custom_cover for ${count} posts.`);
