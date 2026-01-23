
import fs from 'fs';

const posts = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf-8'));
const pages = JSON.parse(fs.readFileSync('./src/data/pages.json', 'utf-8'));

const allContent = [...posts, ...pages];

const targetSlug = 'pensadores-vivos-e-o-wilson-primeras-notas';

const found = allContent.find(p => p.post_name === targetSlug);

if (found) {
    console.log(found.content);
} else {
    console.log('Not found');
}
