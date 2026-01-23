
import fs from 'fs';
const posts = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf-8'));
const pages = JSON.parse(fs.readFileSync('./src/data/pages.json', 'utf-8'));

console.log("--- POSTS ---");
posts.forEach(p => {
    if (p.title && p.title.toLowerCase().includes('schopenhauer')) {
        console.log(`POST [${p.post_id}]: ${p.title}`);
    }
});

console.log("--- PAGES ---");
pages.forEach(p => {
    if (p.title && p.title.toLowerCase().includes('schopenhauer')) {
        console.log(`PAGE [${p.ID}]: ${p.title}`);
    }
});
