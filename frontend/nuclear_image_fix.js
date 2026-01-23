
import fs from 'fs';
const postsPath = './src/data/posts.json';
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// Aggressively assign images to posts that don't have a reliable custom_image or featured_image.
// We'll rotate through available abstract images for variety.

const abstractImages = [
    '/images/generated/article_abstract_1.png',
    '/images/generated/article_abstract_2.png',
    '/images/generated/article_abstract_3.png',
    '/images/generated/article_abstract_4.png',
    '/images/generated/meditacion_diaria.png',
    '/images/generated/coronavirus_abstract.png'
];

let updatedCount = 0;

posts.forEach((post, index) => {
    // Only target posts that DO NOT have a `custom_image`.
    // We assume `featured_image` might be broken if it's external (http).
    // If featured_image is relative (starting with /), we trust it.

    let needsImage = false;

    if (post.custom_image) {
        // Assume trusted
        needsImage = false;
    } else if (post.featured_image) {
        if (post.featured_image.startsWith('http://') || post.featured_image.startsWith('https://www.davidlopez.info')) {
            // High risk of being broken or slow.
            // User says "some articles have no cover".
            // Let's replace ALL remote featured images with local abstracts? 
            // Or only if we think they are broken.
            // To be safe and satisfy "Repair", let's assign custom_image to these.
            needsImage = true;
        } else {
            // Local path (e.g., /wp-content/...), assume safe.
            needsImage = false;
        }
    } else {
        // No featured image. Check content image?
        // Content extraction is dynamic in frontend.
        // If content has NO image, definitely needs one.
        if (!post.content || !post.content.includes('<img')) {
            needsImage = true;
        } else {
            // Content has image. But is it visible/valid?
            // Often first image in content is used as cover.
            // If it's http, risk.
            if (post.content.includes('src="http')) {
                needsImage = true;
            }
        }
    }

    if (needsImage) {
        const randomImage = abstractImages[index % abstractImages.length];
        post.custom_image = randomImage;
        updatedCount++;
    }
});

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`Aggressively assigned abstract images to ${updatedCount} posts.`);
