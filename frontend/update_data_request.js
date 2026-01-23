
import fs from 'fs';
import path from 'path';

// Paths
const postsPath = path.join(process.cwd(), 'src/data/posts.json');
const pagesPath = path.join(process.cwd(), 'src/data/pages.json');
const coursesPath = path.join(process.cwd(), 'src/data/courses_extracted.json');

try {
    // Update Posts (Arte y Guerra)
    let postsObj = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
    const artePostIndex = postsObj.findIndex(p => p.title.toLowerCase().includes('arte y la guerra'));
    if (artePostIndex !== -1) {
        postsObj[artePostIndex].custom_image = '/images/generated/art_war_cover.png';
        console.log('Updated "Arte y Guerra" cover image.');
    }

    // Also check if it's in pages.json
    // Ideally, we should update both if they duplicate data, but let's stick to posts primarily if that's where articles live.
    // Actually, 'pages.json' also contains some articles sometimes or static pages.
    let pagesObj = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));

    // Update Pensadores links
    const pensadoresIndex = pagesObj.findIndex(p => p.post_name === 'pensadores-pensando-en-2015');
    if (pensadoresIndex !== -1) {
        let content = pagesObj[pensadoresIndex].content;

        // Update specific links mentioned
        // 1. "Véase cerebro": <a href="/?p=1948"> -> need to find slug for post 1948 or "cerebro"
        // 2. "/filosofos-miticos-del-mitico-siglo-xx-claude-levi-strauss" -> make sure this is a valid route or redirect to /pg/slug
        // 3. "/diccionario-filosofico-inteligencia" -> ensure this slug exists or map to correct one.

        // Heuristic replacement for now to make them "internal" properly
        // Replace absolute old URLs with relative
        content = content.replace(/http:\/\/www.davidlopez.info\//g, '/');

        // Replace /?p=1948 with /post/1948 (which our Router handles as a fallback)
        content = content.replace(/\/\?p=(\d+)/g, '/post/$1');

        // Ensure other links don't break.
        // The router has a catch-all /:slug, so /diccionario-filosofico-inteligencia should work IF that slug exists in posts/pages.
        // If it doesn't, we might need to be smarter.

        // Let's verify if "diccionario-filosofico-inteligencia" exists as a slug
        // If not, maybe it's just "inteligencia" or something.
        // But for now, ensuring they are relative links is the first step requested (yellow links "lleven a las paginas correspondientes").

        pagesObj[pensadoresIndex].content = content;
        console.log('Updated "Pensadores" links structure.');
    }

    // Update Courses (Física y Metafísica)
    let coursesObj = JSON.parse(fs.readFileSync(coursesPath, 'utf8'));
    const physicsCourseIndex = coursesObj.findIndex(c => c.title.toLowerCase().includes('física y metafísica'));
    if (physicsCourseIndex !== -1) {
        coursesObj[physicsCourseIndex].image = '/images/generated/ai_physics_cover.png';
        console.log('Updated "Física y Metafísica" course image.');
    } else {
        console.log('Course "Física y Metafísica" not found in courses_extracted.json');
    }

    // Write files back
    fs.writeFileSync(postsPath, JSON.stringify(postsObj, null, 2), 'utf8');
    fs.writeFileSync(pagesPath, JSON.stringify(pagesObj, null, 2), 'utf8');
    fs.writeFileSync(coursesPath, JSON.stringify(coursesObj, null, 2), 'utf8');

} catch (e) {
    console.error(e);
}
