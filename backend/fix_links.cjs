const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'src/data/pages.json');
const rawData = fs.readFileSync(pagesPath, 'utf8');
let pages = JSON.parse(rawData);

const targetSlug = 'pensadores-pensando-en-2015';
const pageIndex = pages.findIndex(p => p.post_name === targetSlug);

if (pageIndex !== -1) {
    let content = pages[pageIndex].content;

    // Replace http://www.davidlopez.info/?p=XXXX with /?p=XXXX
    // Also handle possible https variants
    const regex = /href="https?:\/\/www\.davidlopez\.info\/\?p=(\d+)"/g;
    content = content.replace(regex, 'href="/?p=$1"');

    // Also handle root domain links if any
    const regexRoot = /href="https?:\/\/www\.davidlopez\.info\/"/g;
    content = content.replace(regexRoot, 'href="/"');

    // Update the content
    pages[pageIndex].content = content;

    fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));
    console.log(`Updated content for ${targetSlug}. Replaced external links with internal ones.`);
} else {
    console.log(`Page ${targetSlug} not found.`);
}
