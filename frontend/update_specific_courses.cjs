const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, 'src/data/posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

let updatedCount = 0;

posts.forEach(post => {
    // 1. Schopenhauer Course
    if (post.title.toLowerCase().includes('schopenhauer') &&
        (post.title.toLowerCase().includes('curso') || post.title.toLowerCase().includes('obras'))) {
        console.log(`Updating Schopenhauer: ${post.title}`);
        post.custom_image = '/images/generated/course_schopenhauer.png';
        post.custom_cover = '/images/generated/course_schopenhauer.png'; // Ensure both
        updatedCount++;
    }

    // 2. Poderosos Conceptos
    if (post.title.toLowerCase().includes('poderosos conceptos')) {
        console.log(`Updating Poderosos Conceptos: ${post.title}`);
        post.custom_image = '/images/generated/course_conceptos_v2.png'; // Updated v2 image
        post.custom_cover = '/images/generated/course_conceptos_v2.png';
        updatedCount++;
    }

    // 3. Filosofía y Actualidad
    if (post.title.toLowerCase().includes('filosofía y actualidad') || post.title.toLowerCase().includes('filosofia y actualidad')) {
        console.log(`Updating Filosofía y Actualidad: ${post.title}`);
        post.custom_image = '/images/generated/course_politica_v2.png'; // Updated v2 image
        post.custom_cover = '/images/generated/course_politica_v2.png';
        updatedCount++;
    }

    // 4. Filosofía del Arte
    if (post.title.toLowerCase().includes('filosofía del arte') || post.title.toLowerCase().includes('filosofia del arte')) {
        console.log(`Updating Filosofía del Arte: ${post.title}`);
        post.custom_image = '/images/generated/course_arte_v2.png'; // Updated v2 image
        post.custom_cover = '/images/generated/course_arte_v2.png';
        updatedCount++;
    }
});

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`Updated ${updatedCount} courses with new images.`);
