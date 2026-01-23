
import fs from 'fs';

// Manually read JSONs without TS imports
const posts = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf-8'));

const missingImages = [];

posts.forEach(post => {
    // Check exclusions (similar to Articles.tsx)
    const title = (post.title || '').toLowerCase();

    // Ignore dedicated sections
    const dedicatedSlugs = [
        'las-bailarinas-logicas', 'filosofos-miticos-del-mitico-siglo-xx', 'pensadores-pensando-en-2015',
        'criticas-literarias', 'sobre-schopenhauer', 'sobre-mi', 'redes-sociales'
    ];
    if (dedicatedSlugs.includes(post.post_name)) return;

    // Ignore exclusions
    const exclusionKeywords = [
        'bailarinas lógicas', 'bailarina lógica', 'curso', 'cursos', 'novela',
        'filósofos míticos', 'pensadores en 2015', 'schopenhauer', 'crítica literaria',
        'filosofía de la inteligencia artificial', 'platón', 'el arte y la guerra',
        'física y metafísica', 'sex puncta mystica', 'escuela libre', 'programa del mes',
        'conferencia del', 'feliz navidad', 'aviso importante', 'diccionario filosófico'
    ];
    if (exclusionKeywords.some(k => title.includes(k))) return;

    if (!post.content || post.content.length < 100) return;

    // Check for image
    let hasImage = false;
    if (post.featured_image) hasImage = true;
    if (post.custom_image) hasImage = true;
    if (!hasImage) {
        // Check content for <img tag
        if (post.content.includes('<img')) hasImage = true;
    }

    if (!hasImage) {
        missingImages.push({
            id: post.post_id,
            title: post.title,
            slug: post.post_name
        });
    }
});

console.log(JSON.stringify(missingImages, null, 2));
