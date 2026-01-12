const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'src/data/pages.json');
const pages = require(pagesPath);

// Map slugs to their new covers
const coverMap = {
    'platon-obras-completas': '/images/generated/course_platon.png',
    'poderosos-conceptos': '/images/generated/course_conceptos.png',
    'curso-de-filosofia-del-arte': '/images/generated/course_arte.png',
    'curso-de-filosofia-de-la-ciencia': '/images/generated/course_ciencia.png',
    'la-gran-metafisica': '/images/generated/course_metafisica.png',
    'filosofia-de-la-politica': '/images/generated/course_politica.png'
};

let updated = 0;

Object.entries(coverMap).forEach(([slug, cover]) => {
    const page = pages.find(p => p.post_name === slug);
    if (page) {
        if (page.custom_cover !== cover) {
            page.custom_cover = cover;
            updated++;
            console.log(`Updated ${slug} with cover ${cover}`);
        }
    } else {
        console.warn(`Could not find page with slug: ${slug}`);
    }
});

if (updated > 0) {
    fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf-8');
    try {
        fs.writeFileSync(path.join(__dirname, 'content-extraction/pages.json'), JSON.stringify(pages, null, 2), 'utf-8');
    } catch (e) { }
    console.log(`\nSuccessfully updated ${updated} course covers in pages.json`);
} else {
    console.log("No changes needed.");
}
