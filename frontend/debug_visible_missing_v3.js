
import fs from 'fs';
// Manual read
const postsData = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf-8'));

const posts = postsData;

// Articles.tsx exclusion logic (simplified replication)
const dedicatedSectionSlugs = [
    'las-bailarinas-logicas',
    'filosofos-miticos-del-mitico-siglo-xx',
    'pensadores-pensando-en-2015',
    'criticas-literarias',
    'sobre-schopenhauer',
    'sobre-mi',
    'redes-sociales'
];
const excludedPostIds = [
    '352', '493', '1755', '2183', '4464', '5067', '6753', '8480', '13702', '14973', '4363'
];
const exclusionKeywords = [
    'bailarinas lógicas', 'bailarina lógica', 'the logical ballerinas', 'mis bailarinas lógicas',
    'curso', 'cursos', 'novela', 'filósofos míticos', 'pensadores en 2015', 'schopenhauer', 'crítica literaria',
    'filosofía de la inteligencia artificial', 'platón. obras completas', 'el arte y la guerra',
    'física y metafísica', 'sex puncta mystica', 'escuela libre de filosofía', 'programa del mes',
    'un aviso y el olor', 'conferencia del', 'feliz navidad', 'aviso importante', 'diccionario filosófico'
];

const filtered = posts.filter(post => {
    if (dedicatedSectionSlugs.includes(post.post_name)) return false;
    if (excludedPostIds.includes(String(post.post_id))) return false;
    if (!post.content || post.content.length < 100) return false;
    const title = (post.title || '').toLowerCase();
    if (exclusionKeywords.some(keyword => title.includes(keyword))) return false;
    // Categories
    const categories = Array.isArray(post.categories) ? post.categories : [post.categories];
    if (categories.some(c =>
        c === 'Novelas' || c === 'Cursos' || c === 'Diccionarios filosóficos' || c === 'Bailarinas Lógicas'
    )) return false;
    return true;
}).sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

const missing = filtered.filter(post => {
    // Check if it has an image source
    let hasImage = false;
    if (post.featured_image) hasImage = true;
    if (post.custom_image) hasImage = true;
    // Extract from content
    if (post.content && (post.content.includes('<img') || post.content.includes('src='))) hasImage = true;

    return !hasImage;
}).map(p => ({ title: p.title, id: p.post_id }));

console.log("Total filtered articles:", filtered.length);
console.log("Missing images count:", missing.length);
console.log(JSON.stringify(missing, null, 2));
