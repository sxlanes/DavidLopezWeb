const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'content-extraction/pages.json');
const pagesPathSrc = path.join(__dirname, 'src/data/pages.json');

function fixLinksWithMap(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }
    const rawData = fs.readFileSync(filePath, 'utf8');
    let pages = JSON.parse(rawData);

    // Build ID to Slug map
    const idToSlug = {};
    pages.forEach(p => {
        if (p.post_id && p.post_name) {
            idToSlug[p.post_id] = p.post_name;
        }
    });
    console.log(`Built map with ${Object.keys(idToSlug).length} entries.`);

    const targetSlug = 'pensadores-pensando-en-2015';
    const pageIndex = pages.findIndex(p => p.post_name === targetSlug);

    if (pageIndex !== -1) {
        let content = pages[pageIndex].content;
        let originalContent = content;

        // Regex to find links with ?p=ID
        // Matches href="..." containing ?p=digits, capturing ID
        // We handle:
        // href="http://www.davidlopez.info/?p=123"
        // href="https://www.davidlopez.info/?p=123"
        // href="/?p=123" -> effectively handled if we replace internal style too, but mainly the external ones

        // Strategy: Replace all vars of ?p=ID with /slug

        content = content.replace(/href=["'](https?:\/\/www\.davidlopez\.info)?\/\?p=(\d+)["']/g, (match, domain, id) => {
            if (idToSlug[id]) {
                console.log(`Mapping ID ${id} to /${idToSlug[id]}`);
                return `href="/${idToSlug[id]}"`;
            } else {
                console.log(`ID ${id} not found in map, keeping original but making relative if possible`);
                return `href="/?p=${id}"`;
            }
        });

        // Cleanup any remaining root links
        content = content.replace(/href="https?:\/\/www\.davidlopez\.info\/"/g, 'href="/"');

        // Final fallback for any other davidlopez.info links (images etc should probably stay external if they aren't migrated, 
        // but wait, images are src, not href. The regex ensures we only touch hrefs)

        // Actually, let's look at the remaining hrefs to be sure
        // But the main task is the p=ID links.

        if (content !== originalContent) {
            pages[pageIndex].content = content;
            fs.writeFileSync(filePath, JSON.stringify(pages, null, 2));
            console.log(`Updated content for ${targetSlug} in ${filePath}.`);
        } else {
            console.log("No changes made.");
        }
    } else {
        console.log(`Page ${targetSlug} not found in ${filePath}.`);
    }
}

fixLinksWithMap(pagesPath);
fixLinksWithMap(pagesPathSrc);
