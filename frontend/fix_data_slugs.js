
import fs from 'fs';

const postsPath = './src/data/posts.json';
const pagesPath = './src/data/pages.json';
const idSlugMapPath = './src/data/id_slug_map.json';

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));
const idSlugMap = JSON.parse(fs.readFileSync(idSlugMapPath, 'utf-8'));

let updatedCount = 0;

function updateSlugs(collection) {
    collection.forEach(item => {
        const id = String(item.post_id);
        if (idSlugMap[id]) {
            const mappedSlug = idSlugMap[id];
            if (!item.post_name || item.post_name !== mappedSlug) {
                // If map has a URL param like ?p=..., ignore or handle? 
                // The map seems to have valid slugs.
                if (!mappedSlug.startsWith('?p=')) {
                    console.log(`Updating ID ${id}: '${item.post_name}' -> '${mappedSlug}'`);
                    item.post_name = mappedSlug;
                    updatedCount++;
                }
            }
        }
    });
}

updateSlugs(posts);
updateSlugs(pages);

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));

console.log(`Updated ${updatedCount} items.`);
