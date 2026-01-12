const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'content-extraction/pages.json');
try {
    const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

    console.log("Searching for 'contacto' and 'novela'...");

    const searches = ['contacto', 'novela', 'ficción'];

    searches.forEach(term => {
        const results = pages.filter(p =>
            (p.post_name && p.post_name.toLowerCase().includes(term)) ||
            (p.title && p.title.toLowerCase().includes(term))
        );
        console.log(`\n--- Results for '${term}' ---`);
        results.forEach(r => {
            console.log(`Title: ${r.title}`);
            console.log(`Slug: ${r.post_name}`);
            console.log(`ID: ${r.id}`);
        });
    });

} catch (e) {
    console.error("Error reading pages.json:", e);
}
