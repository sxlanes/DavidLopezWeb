const fs = require('fs');
const path = require('path');
const postsPath = path.join(__dirname, 'src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const slugsToCheck = [
    "poderosos-conceptos",
    "curso-de-filosofia-del-arte",
    "filosofia-y-actualidad-conferencias-interactivas"
];

slugsToCheck.forEach(slug => {
    const post = posts.find(p => p.post_name === slug);
    if (post) {
        console.log(`Slug found: ${slug}`);
        console.log(`Title: ${post.title}`);
        console.log(`Custom Cover: ${post.custom_cover}`);
    } else {
        console.log(`Slug NOT FOUND: ${slug}`);
    }
    console.log('---');
});
