const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'content-extraction/pages.json');
const postsPath = path.join(__dirname, 'content-extraction/posts.json');
const pagesPathSrc = path.join(__dirname, 'src/data/pages.json');

function fixLinksWithCompleteMap(targetFilePath) {
    if (!fs.existsSync(targetFilePath)) {
        console.log(`Target file not found: ${targetFilePath}`);
        return;
    }

    // Load Pages
    const pagesRaw = fs.readFileSync(path.join(__dirname, 'content-extraction/pages.json'), 'utf8');
    const pages = JSON.parse(pagesRaw);

    // Load Posts
    let posts = [];
    if (fs.existsSync(postsPath)) {
        const postsRaw = fs.readFileSync(postsPath, 'utf8');
        posts = JSON.parse(postsRaw);
    }

    // Build ID to Slug map
    const idToSlug = {};
    pages.forEach(p => {
        if (p.post_id && p.post_name) {
            idToSlug[p.post_id] = p.post_name;
        }
    });
    posts.forEach(p => {
        if (p.post_id && p.post_name) {
            idToSlug[p.post_id] = p.post_name;
        }
    });
    console.log(`Built map with ${Object.keys(idToSlug).length} entries (Pages + Posts).`);

    // We are editing the targetFilePath (which is pages.json types)
    const targetDataRaw = fs.readFileSync(targetFilePath, 'utf8');
    let targetPages = JSON.parse(targetDataRaw);

    const targetSlug = 'pensadores-pensando-en-2015';
    const pageIndex = targetPages.findIndex(p => p.post_name === targetSlug);

    if (pageIndex !== -1) {
        let content = targetPages[pageIndex].content;
        let originalContent = content;

        // Replace /?p=ID and http.../?p=ID with /slug
        // Notes:
        // - Some links might be plain /?p=ID now because of previous scripts.
        // - Some might be full URLs.
        // - We want to output href="/slug" if found, else href="/?p=ID" (relative).

        content = content.replace(/href=["'](?:https?:\/\/www\.davidlopez\.info)?\/?\?p=(\d+)["']/g, (match, id) => {
            // regex matches: href="...?p=123" or href="/?p=123"
            // The capture group 1 is the ID.
            // Wait, the regex above has a non-capturing group for the domain, but the ID capture depends on correct position.
            // Let's make it simpler and robust.

            // We'll use a broader match and extract ID manually if groups get messy, or just be precise.
            // (?:...)? matches optional domain.
            // \/? matches optional leading slash before ?p
            // \?p=(\d+) captures ID.

            // Re-eval the regex:
            // href=["']  -> start
            // (?:https?:\/\/www\.davidlopez\.info)? -> optional domain
            // \/? -> optional slash
            // \?p=(\d+) -> literal ?p= and capture digits
            // ["'] -> end quote (not consumed by replace if we don't match it? actually we usually match the quote to be safe)

            return `href="/?p=${id}"`; // placeholder for logic below
        });

        // Correct approach with replace callback:
        content = content.replace(/href=["'](?:https?:\/\/www\.davidlopez\.info)?\/?\?p=(\d+)["']/g, (match, id) => {
            if (idToSlug[id]) {
                console.log(`Mapping ID ${id} to /${idToSlug[id]}`);
                return `href="/${idToSlug[id]}"`;
            } else {
                console.log(`ID ${id} not found in map, keeping as relative /?p=${id}`);
                return `href="/?p=${id}"`;
            }
        });

        // Cleanup any remaining root links that are external
        content = content.replace(/href="https?:\/\/www\.davidlopez\.info\/"/g, 'href="/"');

        if (content !== originalContent) {
            targetPages[pageIndex].content = content;
            fs.writeFileSync(targetFilePath, JSON.stringify(targetPages, null, 2));
            console.log(`Updated content for ${targetSlug} in ${targetFilePath}.`);
        } else {
            console.log(`No changes made to ${targetFilePath}.`);
        }
    } else {
        console.log(`Page ${targetSlug} not found in ${targetFilePath}.`);
    }
}

fixLinksWithCompleteMap(pagesPath);
fixLinksWithCompleteMap(pagesPathSrc);
