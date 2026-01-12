
const fs = require('fs');
const path = require('path');

const pagesPath = path.join(__dirname, 'content-extraction/pages.json');
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

const targets = [
    'FICCIÓN', 'BAILARINAS', 'CURSO', 'SCHOPENHAUER', 'FILÓSOFOS',
    'PENSADORES', 'CRÍTICAS', 'SOBRE', 'REDES', 'CONTACT'
];

targets.forEach(target => {
    console.log(`--- Searching for ${target} ---`);
    const matches = pages.filter(p => p.title.toUpperCase().includes(target));
    matches.forEach(m => {
        console.log(`Title: ${m.title}`);
        console.log(`Slug: ${m.post_name}`);
        console.log(`Link: ${m.link}`);
        console.log('---');
    });
});
