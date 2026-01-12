const fs = require('fs');

const pages = JSON.parse(fs.readFileSync('content-extraction/pages.json', 'utf8'));
const posts = JSON.parse(fs.readFileSync('content-extraction/posts.json', 'utf8'));
const allContent = [...pages, ...posts];

const bail = pages.find(p => p.post_name === 'las-bailarinas-logicas');

if (!bail) {
    console.log("Bailarinas page not found!");
    process.exit(1);
}

// Simple regex to find links: <a href="...">Text</a>
const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>(.*?)<\/a>/gi;

let match;
let count = 0;
let foundCount = 0;

console.log("Analyzing Links in Bailarinas Logicas...");

while ((match = regex.exec(bail.content)) !== null) {
    const href = match[2];
    const text = match[3].replace(/<[^>]+>/g, '').trim(); // Strip HTML from link text

    if (!href || href.startsWith('#') || href.includes('wp-content')) continue;

    count++;

    // Determine Slug or ID
    let identifier = '';
    if (href.includes('?p=')) {
        identifier = href.split('?p=')[1];
    } else {
        // Assume slug is the last part
        const parts = href.split('/').filter(p => p);
        identifier = parts[parts.length - 1];
    }

    // Search
    const found = allContent.find(p =>
        String(p.ID) === identifier ||
        String(p.post_id) === identifier ||
        p.post_name === identifier
    );

    if (found) {
        foundCount++;
        // console.log(`[FOUND] ${text} -> ${found.post_name}`);
    } else {
        console.log(`[MISSING] ${text} -> ${identifier} (Href: ${href})`);
    }
}

console.log(`\nTotal Links Analyzed: ${count}`);
console.log(`Content Found Locally: ${foundCount}`);
console.log(`Content Missing: ${count - foundCount}`);
