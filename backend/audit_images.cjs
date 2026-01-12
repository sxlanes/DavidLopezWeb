const fs = require('fs');
const path = require('path');

const posts = require('./src/data/posts.json');
const pages = require('./src/data/pages.json');

const postsMissingImages = [];
const pagesMissingImages = [];

// Helper to check if image exists locally or is a remote URL
function isImageValid(imgSrc) {
    if (!imgSrc) return false;
    if (imgSrc.startsWith('http')) return true; // Assume remote is valid for now (could check HEAD)
    if (imgSrc.startsWith('/')) {
        const localPath = path.join(__dirname, 'public', imgSrc);
        return fs.existsSync(localPath);
    }
    return false;
}

// Check Posts
posts.forEach(post => {
    const hasFeatured = isImageValid(post.featured_image);
    const hasContentImg = post.content && post.content.includes('<img');
    const hasCustom = isImageValid(post.custom_image);

    if (!hasFeatured && !hasContentImg && !hasCustom) {
        postsMissingImages.push({
            id: post.post_id,
            title: post.title,
            slug: post.post_name
        });
    }
});

// Check Pages (Courses/Novels mainly)
// We filter for pages that are likely specific content types we care about
pages.forEach(page => {
    // Skip if it's a boring page (simple text page) unless it's a known category
    // Actually, let's just check widely but categorize.
    // For now, looking for items that MIGHT be displayed in a grid (Novels, Courses)
    // Novels have "novelas" parent usually? Or specific IDs. A bit hard to guess structure from here.
    // But we can check if it has 'custom_cover' or 'featured_image'.

    // We mainly care about "Novels" and "Courses" which we know are displayed in grids.
    // Courses are hardcoded in Courses.tsx but read from data.
    // Novels: Novels.tsx reads pages that are children of "Novelas".

    // Simplification: Check if it has a custom_cover if it is a Novel or Course
    // We'll just log missing images for now.
});

console.log(`Posts missing images: ${postsMissingImages.length}`);
if (postsMissingImages.length > 0) {
    console.log("First 5 missing:", postsMissingImages.slice(0, 5));
}

// Check if generated images exist
const genDir = path.join(__dirname, 'public/images/generated');
if (fs.existsSync(genDir)) {
    console.log("Generated images present:", fs.readdirSync(genDir));
} else {
    console.log("Generated images directory missing!");
}
