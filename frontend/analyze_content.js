
import fs from 'fs';
import path from 'path';

const pagesPath = path.join(process.cwd(), 'src/data/pages.json');
const postsPath = path.join(process.cwd(), 'src/data/posts.json');

try {
    const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
    const pensadoresPage = pages.find(p => p.post_name === 'pensadores-pensando-en-2015');

    if (pensadoresPage) {
        console.log('--- Pensadores Page Content Snippet (with links) ---');
        // Extract a snippet containing links to analyze them
        const linkMatches = pensadoresPage.content.match(/<a[^>]*>(?:(?!<\/a>).)*<\/a>/g);
        if (linkMatches) {
            console.log(linkMatches.slice(0, 5).join('\n'));
        } else {
            console.log('No links found in content.');
        }
    } else {
        console.log('Page "pensadores-pensando-en-2015" not found.');
    }

    const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
    const arteGuerraPost = posts.find(p => p.title.toLowerCase().includes('arte y la guerra'));
    if (arteGuerraPost) {
        console.log('\n--- Arte y Guerra Post ---');
        console.log('ID:', arteGuerraPost.post_id);
        console.log('Image:', arteGuerraPost.custom_image || arteGuerraPost.featured_image);
    } else {
        console.log('Post "El arte y la guerra..." not found.');
    }

} catch (e) {
    console.error(e);
}
