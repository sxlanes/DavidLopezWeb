const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'src/data/pages.json');
const rawData = fs.readFileSync(pagesPath, 'utf8');
let pages = JSON.parse(rawData);

const targetSlug = 'pensadores-pensando-en-2015';
const pageIndex = pages.findIndex(p => p.post_name === targetSlug);

if (pageIndex !== -1) {
    let content = pages[pageIndex].content;
    console.log("Original content snippet:", content.substring(0, 500));

    // Replace standard http
    content = content.replace(/href="http:\/\/www\.davidlopez\.info\/\?p=(\d+)"/g, 'href="/?p=$1"');
    // Replace https
    content = content.replace(/href="https:\/\/www\.davidlopez\.info\/\?p=(\d+)"/g, 'href="/?p=$1"');
    // Replace root http
    content = content.replace(/href="http:\/\/www\.davidlopez\.info\/"/g, 'href="/"');
    // Replace root https
    content = content.replace(/href="https:\/\/www\.davidlopez\.info\/"/g, 'href="/"');

    // Fallback: simple replace of domain string if it's in an href
    // This is safer as it catches other paths too
    content = content.replace(/href="http:\/\/www\.davidlopez\.info/g, 'href="');
    content = content.replace(/href="https:\/\/www\.davidlopez\.info/g, 'href="');

    // Update the content
    pages[pageIndex].content = content;

    fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));
    console.log(`Updated content for ${targetSlug}. Replaced external links with internal ones.`);
    console.log("New content snippet:", content.substring(0, 500));
} else {
    console.log(`Page ${targetSlug} not found.`);
}
