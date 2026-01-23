const fs = require('fs');
const path = require('path');
const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/posts.json'), 'utf8'));

const categories = {};
posts.forEach(post => {
    if (post.categories) {
        post.categories.forEach(cat => {
            categories[cat] = (categories[cat] || 0) + 1;
        });
    }
});

console.log(categories);
