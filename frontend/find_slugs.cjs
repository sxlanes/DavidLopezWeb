const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/posts.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/pages.json'), 'utf8'));

const allData = [...posts, ...pages];

const titles = [
    "poderosos conceptos",
    "filosofía y actualidad",
    "filosofia y actualidad"
];

allData.forEach(item => {
    titles.forEach(t => {
        if (item.title && item.title.toLowerCase().includes(t)) {
            console.log(`Match for "${t}":`);
            console.log(`  Title: ${item.title}`);
            console.log(`  Slug (post_name): ${item.post_name}`);
            console.log(`  Type: ${item.post_type || 'page'}`);
            console.log(`  Custom Cover: ${item.custom_cover}`);
            console.log('---');
        }
    });
});
