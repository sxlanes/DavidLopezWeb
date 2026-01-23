
import fs from 'fs';

const posts = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf-8'));

const target = posts.find(p => p.title.includes('El filósofo del martillo') || p.post_name === 'el-nuevo-filosofo-del-martillo');

if (target) {
    console.log('ID:', target.post_id);
    console.log('Title:', target.title);
    console.log('Content snippet:', target.content.substring(0, 500));
} else {
    console.log('Not found');
}
