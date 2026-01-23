const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'src/data/posts.json');
const pagesPath = path.join(__dirname, 'src/data/pages.json');

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

let updatedCount = 0;

const updateItem = (item) => {
    let updated = false;
    const title = item.title.toLowerCase();
    const slug = item.post_name;

    // 1. Poderosos Conceptos
    if (slug === 'poderosos-conceptos' || title.includes('poderosos conceptos')) {
        item.custom_image = '/images/generated/course_conceptos_v2.png';
        item.custom_cover = '/images/generated/course_conceptos_v2.png';
        updated = true;
    }

    // 2. Filosofía y Actualidad
    if (slug === 'filosofia-y-actualidad-conferencias-interactivas' || title.includes('filosofía y actualidad') || title.includes('filosofia y actualidad')) {
        item.custom_image = '/images/generated/course_politica_v2.png';
        item.custom_cover = '/images/generated/course_politica_v2.png';
        updated = true;
    }

    // 3. Filosofía del Arte
    if (slug === 'curso-de-filosofia-del-arte' || title.includes('filosofía del arte') || title.includes('filosofia del arte')) {
        item.custom_image = '/images/generated/course_arte_v2.png';
        item.custom_cover = '/images/generated/course_arte_v2.png';
        updated = true;
    }

    if (updated) updatedCount++;
};

console.log('Updating posts...');
posts.forEach(updateItem);
console.log('Updating pages...');
pages.forEach(updateItem);

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));

console.log(`Total items updated: ${updatedCount}`);
