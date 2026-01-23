
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsPath = path.join(__dirname, 'src/data/posts.json');
const rawData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(rawData);

const map = {};

posts.forEach(post => {
    // Extract slug from link if post_name is missing
    let slug = post.post_name;
    if (!slug && post.link) {
        // http://.../category/slug/
        const parts = post.link.split('/').filter(p => p);
        slug = parts[parts.length - 1];
    }

    if (post.post_id && slug) {
        map[post.post_id] = slug;
    }
});

const outputPath = path.join(__dirname, 'src/data/id_slug_map.json');
fs.writeFileSync(outputPath, JSON.stringify(map, null, 2));
console.log(`Map created with ${Object.keys(map).length} entries at ${outputPath}`);
