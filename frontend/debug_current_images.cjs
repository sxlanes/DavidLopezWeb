const fs = require('fs');
const path = require('path');
const postsPath = path.join(__dirname, 'src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

posts.forEach(post => {
    if (post.title.toLowerCase().includes('poderosos conceptos') ||
        post.title.toLowerCase().includes('filosofía del arte') ||
        post.title.toLowerCase().includes('filosofía y actualidad')) {
        console.log(`Title: ${post.title}`);
        console.log(`Custom Image: ${post.custom_image}`);
        console.log(`Custom Cover: ${post.custom_cover}`);
        console.log('---');
    }
});
