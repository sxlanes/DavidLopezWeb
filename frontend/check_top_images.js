
import fs from 'fs';
const postsData = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf-8'));

// Filter same as before
const posts = postsData;
const dedicatedSectionSlugs = [
    'las-bailarinas-logicas', 'filosofos-miticos-del-mitico-siglo-xx', 'pensadores-pensando-en-2015',
    'criticas-literarias', 'sobre-schopenhauer', 'sobre-mi', 'redes-sociales'
];
const excludedPostIds = ['352', '493', '1755', '2183', '4464', '5067', '6753', '8480', '13702', '14973', '4363'];
const exclusionKeywords = [
    'bailarinas lógicas', 'curso', 'novela', 'filósofos míticos', 'pensadores en 2015', 'schopenhauer', 'crítica literaria',
    'filosofía de la inteligencia artificial', 'platón', 'el arte', 'física y', 'sex puncta', 'escuela libre', 'programa',
    'conferencia', 'feliz navidad', 'aviso', 'diccionario'
];

const filtered = posts.filter(post => {
    if (dedicatedSectionSlugs.includes(post.post_name)) return false;
    if (excludedPostIds.includes(String(post.post_id))) return false;
    if (!post.content || post.content.length < 100) return false;
    const title = (post.title || '').toLowerCase();
    if (exclusionKeywords.some(k => title.includes(k))) return false;
    const categories = Array.isArray(post.categories) ? post.categories : [post.categories];
    if (categories.some(c => c === 'Novelas' || c === 'Cursos')) return false;
    return true;
}).sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

// Get top 10
const top10 = filtered.slice(0, 10);

console.log("Top 10 Articles and their Images:");
top10.forEach((p, i) => {
    let imgSource = "None";
    if (p.featured_image) imgSource = "Featured: " + p.featured_image;
    else if (p.custom_image) imgSource = "Custom: " + p.custom_image;
    else {
        const match = p.content.match(/src="([^"]+)"/);
        if (match) imgSource = "Content: " + match[1];
    }
    console.log(`${i + 1}. ${p.title} (${p.pubDate}) -> ${imgSource}`);
});
