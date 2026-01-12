const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'content-extraction/pages.json');
const rawData = fs.readFileSync(pagesPath, 'utf8');
const pages = JSON.parse(rawData);

console.log("Sample page keys:", Object.keys(pages[0]));
console.log("First few IDs and Slugs:");
pages.slice(0, 5).forEach(p => {
    console.log(`ID: ${p.ID}, Slug: ${p.post_name}`);
});
