const fs = require('fs');
const path = require('path');
const pages = require('./src/data/pages.json');

// Check key pages for images
const specificPages = [
    'pensadores-pensando-en-2015',
    'filosofos-miticos-del-mitico-siglo-xx'
];

// Novels logic (guessing how to identify them - usually parent is 0 but they are likely identified by IDs or manual config. 
// Let's just looking for pages with "Novela" in title or similar to be safe, or just check the specific pages known.)
// Actually Novels.tsx filters? I'll just check specific ones if I can find them.
// "El bosque de albaricoques", "Las manos de Julia"

const novels = [
    "El bosque de albaricoques",
    "Las manos de Julia",
    "El filósofo de martillo"
];

function hasImage(content) {
    return content && content.includes('<img');
}

specificPages.forEach(slug => {
    const page = pages.find(p => p.post_name === slug);
    if (!page) {
        console.log(`Page not found: ${slug}`);
    } else {
        const valid = hasImage(page.content) || (page.custom_cover); // custom_cover is what we use in Novels.tsx, maybe Page.tsx doesn't use it yet?
        // Page.tsx uses pageData.content. It doesn't use custom_cover for the main image typically unless we added it.
        // But "Filosofos Miticos" uses "large-image" class, so it likely has an image in content.
        console.log(`Page ${slug}: Has image? ${valid ? 'YES' : 'NO'}`);
        if (!valid) {
            console.log(`  -> Content start: ${page.content ? page.content.substring(0, 50) : 'NULL'}`);
        }
    }
});

novels.forEach(title => {
    const page = pages.find(p => p.title.includes(title));
    if (page) {
        const valid = hasImage(page.content) || page.custom_cover || page.featured_image;
        console.log(`Novel ${title}: Has image? ${valid ? 'YES' : 'NO'}`);
    } else {
        console.log(`Novel not found: ${title}`);
    }
});
