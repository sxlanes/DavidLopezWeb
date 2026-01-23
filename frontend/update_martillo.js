
import fs from 'fs';

const postsPath = './src/data/posts.json';
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// Find target post
const targetIndex = posts.findIndex(p => p.post_id == 1906 || (p.title && p.title.includes("Regreso a las montañas")));

if (targetIndex !== -1) {
    let content = posts[targetIndex].content;
    console.log("Original content length:", content.length);

    // Replace Image
    // Regex for the old image src (generic enough to catch variations)
    // Old: http://www.davidlopez.info/wp-content/uploads/2010/10/bioht111.jpg
    content = content.replace(/src="[^"]*bioht111\.jpg"/g, 'src="/wp-content/uploads/filosofo_martillo_hq.jpg"');

    // Also update any link wrapping it if present
    content = content.replace(/href="[^"]*bioht111\.jpg"/g, 'href="/wp-content/uploads/filosofo_martillo_hq.jpg"');

    // YouTube handling?
    // Let's check if there is a youtube video in the content first
    if (content.includes('youtube') || content.includes('youtu.be')) {
        console.log("YouTube link found, ensuring https and structure.");
        // My global Page.tsx handler handles the structure if it's an iframe. 
        // If it's a raw link, I might want to ensure it is embedded.
        // User said "video de youtube salga mejor".
        // If it's just a text link, let's turn it into an embed if possible, or just trust the Page.tsx updates.
        // But Page.tsx only fixes iframes. 
        // Let's see if there is a raw link.
        // I'll dump the content here to check next step if needed, but for now I will rely on the global fix 
        // OR standard iframe replacement if I see a specific pattern.
    }

    posts[targetIndex].content = content;
    fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
    console.log("Updated post content.");
} else {
    console.log("Post not found.");
}
