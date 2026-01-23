
import fs from 'fs';

const posts = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf-8'));
const pages = JSON.parse(fs.readFileSync('./src/data/pages.json', 'utf-8'));

const allContent = [...posts, ...pages];

const wilsons = allContent.filter(p => p.post_name && p.post_name.includes('wilson'));

wilsons.forEach(p => console.log(p.post_name, p.title));
