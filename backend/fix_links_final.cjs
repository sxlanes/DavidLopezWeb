const fs = require('fs');
const path = require('path');

// Target the FILE THAT PAGE.TSX ACTUALLY IMPORTS
const pagesPath = path.join(__dirname, 'content-extraction/pages.json');
// Also update the src/data one for consistency
const pagesPathSrc = path.join(__dirname, 'src/data/pages.json');

function fixFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    const rawData = fs.readFileSync(filePath, 'utf8');
    let pages = JSON.parse(rawData);

    const targetSlug = 'pensadores-pensando-en-2015';
    const pageIndex = pages.findIndex(p => p.post_name === targetSlug);

    if (pageIndex !== -1) {
        let content = pages[pageIndex].content;

        // Replace standard http
        content = content.replace(/href="http:\/\/www\.davidlopez\.info\/\?p=(\d+)"/g, 'href="/?p=$1"');
        // Replace https
        content = content.replace(/href="https:\/\/www\.davidlopez\.info\/\?p=(\d+)"/g, 'href="/?p=$1"');
        // Replace root http
        content = content.replace(/href="http:\/\/www\.davidlopez\.info\/"/g, 'href="/"');
        // Replace root https
        content = content.replace(/href="https:\/\/www\.davidlopez\.info\/"/g, 'href="/"');
        // Fallback catch-all for the domain in hrefs
        content = content.replace(/href="http:\/\/www\.davidlopez\.info/g, 'href="');
        content = content.replace(/href="https:\/\/www\.davidlopez\.info/g, 'href="');

        pages[pageIndex].content = content;

        fs.writeFileSync(filePath, JSON.stringify(pages, null, 2));
        console.log(`Updated content for ${targetSlug} in ${filePath}.`);
    } else {
        console.log(`Page ${targetSlug} not found in ${filePath}.`);
    }
}

fixFile(pagesPath);
fixFile(pagesPathSrc);
