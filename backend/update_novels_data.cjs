const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'src/data/pages.json');
const pages = require(pagesPath);

let updated = false;

// 1. Update Las Manos de Julia
const julia = pages.find(p => p.post_name === 'las-manos-de-julia-novela');
if (julia) {
    console.log("Found Las Manos de Julia");
    if (julia.custom_class !== 'small-cover') {
        julia.custom_class = 'small-cover';
        updated = true;
        console.log("Updated class for Las Manos de Julia");
    }
} else {
    console.log("Could not find Las Manos de Julia (slug: las-manos-de-julia-novela)");
    // Try searching by title just in case slug varies
    const juliaTitle = pages.find(p => p.title.toLowerCase().includes('manos de julia'));
    if (juliaTitle) {
        console.log(`Found by title: ${juliaTitle.title} (${juliaTitle.post_name})`);
        // If slug is different, we might need to update Novels.tsx, but let's just tag this data first
        if (juliaTitle.custom_class !== 'small-cover') {
            juliaTitle.custom_class = 'small-cover';
            updated = true;
            console.log("Updated class by title match.");
        }
    }
}

// 2. Update El Bosque de Albaricoques
const bosque = pages.find(p => p.post_name === 'el-bosque-de-albaricoques');
if (bosque) {
    if (bosque.custom_cover !== '/images/bosque_cover_new.png') {
        bosque.custom_cover = '/images/bosque_cover_new.png';
        updated = true;
        console.log("Updated cover for El Bosque de Albaricoques");
    }
}

// 3. Update Filosofo de Martillo (ensure it has cover if we have one, or just check)
// Assuming it's fine for now from previous work.

if (updated) {
    fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf-8');
    // Also update content-extraction backup
    try {
        fs.writeFileSync(path.join(__dirname, 'content-extraction/pages.json'), JSON.stringify(pages, null, 2), 'utf-8');
    } catch (e) { }
    console.log("Saved changes to pages.json");
} else {
    console.log("No changes needed.");
}
