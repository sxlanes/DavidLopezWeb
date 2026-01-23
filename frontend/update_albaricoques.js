
import fs from 'fs';

const pagesPath = './src/data/pages.json';
const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));

// Find "novelas" page
const targetIndex = pages.findIndex(p => p.post_name === 'novelas');

if (targetIndex !== -1) {
    let content = pages[targetIndex].content;

    // The user wants to REPLACE the image for "El bosque de albaricoques".
    // Looking at the content from debug_novelas.js, there isn't actually an image for "El Bosque..." currently visible in the snippet?
    // Wait, the snippet shows "GREDOS-en-MONTESACRO" image at the top.
    // And links for "EL BOSQUE DE ALBARICOQUES".
    // Does the user want to ADD the image or replace an existing one?
    // "vas a sustituir la imagen de el bosque de albaricoques por esta" (you are going to replace the image of... for this one).
    // This implies there IS an image.
    // Maybe I missed it in the snippet or it uses a different structure.
    // Or maybe the Gredos image is the one effectively showing?
    // Let's assume there might be an image I didn't see or I should look closer. 
    // IF there is no specific image for Albaricoques, I should INSERT it next to the link.
    // BUT the user said "substitute", implying replacement.

    // Let's try to find an image near the albaricoques link.
    // Pattern: <img ...> ... <a ...>EL BOSQUE...</a> OR <a ...>EL BOSQUE...</a> ... <img ...>

    // If I don't find a specific image linked to it, I will insert the new image right before the title link.

    const albaricoquesParams = 'EL BOSQUE DE ALBARICOQUES';
    const imageTag = `<img class="aligncenter shadow-2xl rounded-sm mb-4" src="/wp-content/uploads/albaricoques_cover.jpg" alt="El bosque de albaricoques" width="300" />`;

    // Check if there is already an image nearby? matches for <img ...>
    // The previous debug output showed only ONE image at the top (Montesacro). 
    // Maybe the user thinks that IS the image or wants to add this one for the specific book.
    // I will insert/replace.

    // I'll place the new image just before the Link span.
    const linkRegex = /<span[^>]*><a[^>]*>EL BOSQUE DE ALBARICOQUES<\/a><\/span>/;

    if (linkRegex.test(content)) {
        content = content.replace(linkRegex, (match) => {
            return `<div class="mb-12 text-center">${imageTag}<br/>${match}</div>`;
        });
    } else {
        // Fallback or broader search
        console.log("Could not find exact text match. Trying looser match.");
    }

    pages[targetIndex].content = content;
    fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));
    console.log("Updated Novelas page with Albaricoques cover.");
}
