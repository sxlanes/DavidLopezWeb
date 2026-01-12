const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'src/data/pages.json');
const rawData = fs.readFileSync(pagesPath, 'utf8');
const pages = JSON.parse(rawData);

const targetSlug = 'pensadores-pensando-en-2015';
const page = pages.find(p => p.post_name === targetSlug);

if (page) {
    console.log(`--- Content Snippet for ${targetSlug} ---`);
    // Print lines containing davidlopez.info to see what they look like
    const lines = page.content.split('\n');
    lines.forEach((line, index) => {
        if (line.includes('davidlopez.info')) {
            console.log(`Line ${index}: ${line.trim()}`);
        }
    });
} else {
    console.log(`Page ${targetSlug} not found.`);
}
