
import fs from 'fs';
const postsPath = './src/data/posts.json';
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// 1. Add image to "Nuevo curso online Schopenhauer"
// 2. Add image to "Obras y ideas completas" (Wait, user said: "Nuevo curso online Schopenhauer, Obras y Ideas completas... put an image of Schopenhauer there") 
//    Maybe these are two separate courses or one long title?
//    "En nuevo curso online Schopenhauer Obras e ideas completas, puedes poner ahi una imagen de Schopenhauer"
//    It sounds like one item.
// 3. Fix links in Pensadores 2015 and Filosofos Miticos if possible (I can't check validity easily without crawling, but I can ensure format is clean).

let schocourseFound = false;

posts.forEach(post => {
    // Check for Schopenhauer course
    if (post.title && post.title.includes('Schopenhauer') && post.title.includes('curso') && post.title.includes('online')) {
        post.custom_image = "/images/generated/arthur_schopenhauer.png";
        schocourseFound = true;
        console.log(`Updated image for course: ${post.title}`);
    } else if (post.title && (post.title.includes('Obras e ideas completas') || post.title.includes('Obras y ideas completas'))) {
        post.custom_image = "/images/generated/arthur_schopenhauer.png";
        schocourseFound = true;
        console.log(`Updated image for course: ${post.title}`);
    }
});

if (!schocourseFound) console.log("Warning: Could not find the Schopenhauer course to update.");

// Save
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
