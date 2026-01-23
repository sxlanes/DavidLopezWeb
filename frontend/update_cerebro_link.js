
import fs from 'fs';

const posts = JSON.parse(fs.readFileSync('./src/data/posts.json', 'utf-8'));
const pages = JSON.parse(fs.readFileSync('./src/data/pages.json', 'utf-8'));

const all = [...posts, ...pages];

// 1. Find the target "Cerebro" post (Definition in Bailarinas)
// Search for title "Cerebro" or "Bailarinas Lógicas: Cerebro"
// or "las-bailarinas-logicas-cerebro" in slugs
const cerebroTarget = all.find(p =>
    p.post_name === 'las-bailarinas-logicas-cerebro' ||
    p.post_name === 'las-bailarinas-logicas-cerebro-2' ||
    (p.title && p.title.toLowerCase().includes('bailarinas') && p.title.toLowerCase().includes('cerebro'))
);

if (!cerebroTarget) {
    console.log("Could not find 'Cerebro' definition.");
} else {
    console.log("Found Cerebro target:", cerebroTarget.post_name);

    // 2. Modify "Filosofos Miticos" page content to update the link
    const filosofosPage = pages.find(p => p.post_name === 'filosofos-miticos-del-mitico-siglo-xx');
    if (filosofosPage) {
        let content = filosofosPage.content;

        // Find existing link to Cerebro. 
        // He says it's in quote or yellow and mentions "Cerebro". 
        // It might be linking to "?p=1948" (which was "Cerebro" in id map earlier? Let's check).
        // I will replace ANY link with text "Cerebro" or containing it.

        // Current link might look like <a href="...">Cerebro</a>
        // Content snippet from previous grep:
        // [Véase "<a href="www.davidlopez.info/?p=1948">Cerebro</a>"].

        // I will replace all instances of linking to 1948 OR generic "Cerebro" links if they match the context.
        // Specifically replacing href.

        const newHref = `/${cerebroTarget.post_name}`;

        // Regex to replace href in <a ...>Cerebro</a>
        // Or directly replace the p=1948 one.

        content = content.replace(/href="[^"]*\?p=1948"/g, `href="${newHref}"`);
        // Also checks if there are other variations
        content = content.replace(/href="[^"]*cerebro[^"]*"/ig, `href="${newHref}"`);

        filosofosPage.content = content;

        // Save pages
        fs.writeFileSync('./src/data/pages.json', JSON.stringify(pages, null, 2));
        console.log("Updated Filosofos page with correct Cerebro link.");
    } else {
        console.log("Filosofos page not found.");
    }
}
