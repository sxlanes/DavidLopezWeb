
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'src', 'data', 'posts.json');
const pagesPath = path.join(__dirname, 'src', 'data', 'pages.json');

const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

const allItems = [...posts, ...pages];

const slugMap = {};
allItems.forEach(item => {
    if (item.slug) {
        slugMap[item.slug] = item;
    }
});

const heroLinksToCheck = [
    // Club de Filosofia
    'platon-obras-completas',
    'schopenhauer-obras-e-ideas',
    'fisica-y-metafisica-de-la-ia',
    'poderosos-conceptos',
    'filosofia-del-arte',
    'filosofia-de-la-ciencia',
    'la-gran-metafisica',
    'filosofia-de-la-politica',
    'filosofia-y-actualidad',

    // Textos Filosoficos
    'las-bailarinas-logicas',
    'filosofos-miticos-siglo-xx',
    'pensadores-pensando-en-2015',
    'criticas-literarias',
    'enfermedad-medicina-y-magia',
    'la-magia-en-la-metafisica',

    // Obras de Ficcion
    'las-manos-de-julia-novela',
    'el-bosque-de-albaricoques-novela',
    'el-nuevo-filosofo-del-martillo',

    // Bio
    'sobre-mi'
];

console.log("Checking Hero Links against local database:");
heroLinksToCheck.forEach(slug => {
    if (slugMap[slug]) {
        console.log(`[OK] ${slug} found.`);
    } else {
        console.log(`[MISSING] ${slug} NOT FOUND locally.`);
    }
});

// Also check for 'wordpress' or 'davidlopez.info' links in these found items to see if they redirect content?
// No, the items themselves are local content.
