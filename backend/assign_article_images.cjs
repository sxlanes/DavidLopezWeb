const fs = require('fs');
const path = require('path');

const postsPath = 'src/data/posts.json';
const posts = require('./' + postsPath);

function run() {
    const images = [
        '/images/generated/article_abstract_1.png',
        '/images/generated/article_abstract_2.png',
        '/images/generated/article_abstract_3.png',
        '/images/generated/article_abstract_4.png'
    ];

    let updatedCount = 0;

    const updatedPosts = posts.map((post, index) => {
        const hasFeatured = post.featured_image && typeof post.featured_image === 'string' && post.featured_image.length > 0;
        const hasContentImg = post.content && typeof post.content === 'string' && post.content.includes('<img');

        // We consider custom_image valid only if we are re-assigning OR if it points to an existing file.
        // But here we want to ensure EVERYONE gets one of OUR clean new images if they lack a real specific one.
        // So if they have no featured/content image, we OVERWRITE/SET custom_image.

        // Check if image is effectively missing OR is a likely broken external link
        const isExternalBroken = post.featured_image && post.featured_image.includes('davidlopez.info');

        if (!hasFeatured || isExternalBroken || (!hasContentImg && !post.custom_image)) {
            // Assign a random one from our pool
            const imgPath = images[index % images.length];

            // Assign if not already using a generated one
            if (!post.custom_image || !images.includes(post.custom_image)) {
                post.custom_image = imgPath;
                updatedCount++;
            }
        }
        return post;
    });

    if (updatedCount > 0) {
        fs.writeFileSync(path.join(__dirname, postsPath), JSON.stringify(updatedPosts, null, 2), 'utf-8');
        console.log(`Updated ${updatedCount} posts with default images.`);
        // Also update the backup file just in case
        try {
            fs.writeFileSync(path.join(__dirname, 'content-extraction/posts.json'), JSON.stringify(updatedPosts, null, 2), 'utf-8');
        } catch (e) {
            console.log("Could not update content-extraction/posts.json");
        }
    } else {
        console.log("No posts needed updating.");
    }
}

run();
