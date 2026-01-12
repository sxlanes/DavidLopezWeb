const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'src/data/pages.json');
const rawData = fs.readFileSync(pagesPath, 'utf8');
const pages = JSON.parse(rawData);

const targetSlug = 'pensadores-pensando-en-2015';
const page = pages.find(p => p.post_name === targetSlug);

if (page) {
    console.log(`--- Content for ${targetSlug} ---`);
    console.log(page.content);
} else {
    console.log(`Page ${targetSlug} not found.`);
}
