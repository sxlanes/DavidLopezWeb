const fs = require('fs');
const path = require('path');

// Target the one used by Page.tsx
const pagesPath = path.join(__dirname, 'content-extraction/pages.json');
// Also verify if the src/data/pages.json one needs update (I already did that one, but let's do this one now)
// I will just update this specific path now.

console.log(`Updating ${pagesPath}`);

const rawData = fs.readFileSync(pagesPath, 'utf8');
let pages = JSON.parse(rawData);

const targetSlug = 'el-nuevo-filosofo-del-martillo-novela';
const bookTitle = 'EL FILÓSOFO DE MARTILLO (Novela)';
const bookLink = 'https://www.amazon.es/El-NUEVO-FILOSOFO-DEL-MARTILLO/dp/1482325438/ref=sr_1_4?__mk_es_ES=ÅMÅŽÕÑ&dchild=1&keywords=El+nuevo+filósofo+del+martillo&qid=1614626460&sr=8-4';

const newContent = `
<p>En el cielo de la civilización de comienzos del siglo XXI suenan de pronto, y con una fuerza insólita, los martillazos de Nietzsche. La filosofía, y también la extrema violencia, toman enseguida la calle.</p>

<p>Millones de dedos acusan a la editorial Metamorfosis, la cual ha puesto en marcha una campaña de promoción de las obras de Nietzsche cuyas dimensiones superan todo lo conocido.</p>

<p>En medio del desconcierto social, una filósofa española lucha por encontrar a un poderoso hombre de negocios al que ama con locura, y que, aparéntemente, la ha abandonado para convertirse en un vagabundo contemplativo. Ella, sin embargo, cree que ha sido secuestrado por exaltados nietzscheanos.</p>

<p>La investigación de la filósofa y, sobre todo, la enorme fuerza de su amor la llevarán a un lugar decisivo en la vida del filósofo del martillo: el Montesacro de Orta, en el norte de Italia.</p>

<p>“Fue el sueño más maravilloso de mi vida”, dijo Nietzsche muchos años después de subir con Lou Salomé a aquel lugar prodigioso.</p>

<p>Esta novela es una nueva versión de una obra del autor que, con el mismo título, fue publicada por la editorial Planeta en 2001.</p>

<p><a href="${bookLink}" target="_blank" rel="noopener noreferrer">Comprar la novela desde este enlace</a></p>
`;

let pageIndex = pages.findIndex(p => p.post_name === targetSlug);

if (pageIndex !== -1) {
    console.log(`Found existing page "${targetSlug}". Updating content.`);
    pages[pageIndex].title = bookTitle;
    pages[pageIndex].content = newContent;
} else {
    console.log(`Page "${targetSlug}" not found. Creating new entry.`);
    const newPage = {
        title: bookTitle,
        content: newContent,
        post_name: targetSlug,
        post_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        status: 'publish',
        link: 'https://www.davidlopez.info/' + targetSlug + '/',
        excerpt: '',
        meta: []
    };
    pages.push(newPage);
}

fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));
console.log('content-extraction/pages.json updated successfully.');
