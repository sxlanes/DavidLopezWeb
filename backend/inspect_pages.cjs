const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'content-extraction/pages.json');
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

const slugsToCheck = [
    'novelas', 'novelas-2',
    'las-bailarinas-logicas',
    'cursos',
    'sobre-schopenhauer',
    'filosofos-miticos-del-mitico-siglo-xx',
    'pensadores-pensando-en-2015',
    'criticas-literarias',
    'sobre-david-lopez',
    'redes-sociales',
    'contacto'
];

slugsToCheck.forEach(slug => {
    const page = pages.find(p => p.post_name === slug);
    console.log(`\n--- SLUG: ${slug} ---`);
    if (page) {
        console.log(`Title: ${page.title}`);
        console.log(`Content Length: ${page.content ? page.content.length : 0}`);
        console.log(`Snippet: ${page.content ? page.content.substring(0, 200).replace(/\n/g, ' ') : 'EMPTY'}`);
    } else {
        console.log("NOT FOUND");
    }
});
