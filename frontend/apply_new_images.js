
import fs from 'fs';

const postsPath = './src/data/posts.json';
const pagesPath = './src/data/pages.json';
let posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));
let pages = JSON.parse(fs.readFileSync(pagesPath, 'utf-8'));

// Images
const schopenhauerAbstract = "/images/generated/schopenhauer_course_abstract_1768343094877.png";
const arteAbstract = "/images/generated/filosofia_arte_abstract_1768343073525.png";
const actualidadAbstract = "/images/generated/filosofia_actualidad_abstract_1768343052610.png";
const conceptosAbstract = "/images/generated/poderosos_conceptos_abstract_1768343023855.png";
const miticosHQ = "/images/uploaded/filosofos_miticos_hq.jpg";
const albaricoquesHQ = "/images/uploaded/albaricoques_hq.jpg";

// 1. Schopenhauer Course + Obras e Ideas
posts.forEach(p => {
    const title = (p.title || "").toLowerCase();

    // Schopenhauer Course
    if (title.includes('schopenhauer') && (title.includes('curso') || title.includes('obras e ideas') || title.includes('obras y ideas'))) {
        p.custom_image = schopenhauerAbstract;
        console.log(`Updated Schopenhauer: ${p.title}`);
    }

    // Philosophy of Art
    if (title.includes('filosofía del arte') || title.includes('filosofia del arte')) {
        p.custom_image = arteAbstract;
        console.log(`Updated Art: ${p.title}`);
    }

    // Philosophy & Actuality (Debate, Conference)
    if (title.includes('filosofía y actualidad')) {
        p.custom_image = actualidadAbstract;
        console.log(`Updated Actualidad: ${p.title}`);
    }

    // Poderosos Conceptos
    if (title.includes('poderosos conceptos')) {
        p.custom_image = conceptosAbstract;
        console.log(`Updated Conceptos: ${p.title}`);
    }
});

// 2. Pages: Albaricoques & Filosofos Miticos
pages.forEach(p => {
    // Filosofos Miticos Page
    if (p.post_name === 'filosofos-miticos-del-mitico-siglo-xx' || p.title.includes('Míticos del Mítico')) {
        p.custom_cover = miticosHQ;
        // Also replace in content if possible
        if (p.content) {
            // Replace any existing img src in content with new one
            // We use a safe regex to find the first image or main image
            p.content = p.content.replace(/src="[^"]*"/, `src="${miticosHQ}"`);
        }
        console.log(`Updated Filosofos Miticos Page`);
    }

    // El Bosque de Albaricoques (Page/Entry content in Novelas is handled by pages.json usually)
    // There is no single page for it, but 'el-bosque-de-albaricoques' handles the route.
    if (p.post_name === 'el-bosque-de-albaricoques') {
        p.custom_cover = albaricoquesHQ;
        // Replace in content too
        if (p.content) {
            p.content = p.content.replace(/src="[^"]*"/, `src="${albaricoquesHQ}"`);
        }
        console.log(`Updated Albaricoques Page`);
    }

    // Also update "Novelas" page content if it lists it there hardcoded?
    if (p.post_name === 'novelas') {
        // Look for albaricoques image in content
        if (p.content.includes('albaricoques')) {
            // Try to find the image tag associated with it. Hard to be precise without breaking others.
            // But I recall I injected 'albaricoques_cover.jpg' specifically.
            p.content = p.content.replace(/src="[^"]*albaricoques[^"]*"/g, `src="${albaricoquesHQ}"`);
            console.log(`Updated Albaricoques ref in Novelas Page`);
        }
    }
});

// Save
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2));
console.log("Database updated.");
