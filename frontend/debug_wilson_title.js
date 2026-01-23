
import fs from 'fs';

const posts = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf-8'));
const pages = JSON.parse(fs.readFileSync('./src/data/pages.json', 'utf-8'));

const allContent = [...posts, ...pages];

const found = allContent.find(p => p.title && p.title.includes('Wilson'));

if (found) {
    console.log('Slug:', found.post_name);
    console.log('Title:', found.title);
    console.log('ID:', found.post_id);
    console.log('Content Start:', found.content.substring(0, 200));
} else {
    console.log('Not found');
}
