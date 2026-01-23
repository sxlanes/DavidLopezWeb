const fs = require('fs');
const path = require('path');
const pages = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/pages.json'), 'utf8'));

const slugs = ['filosofos-miticos-del-mitico-siglo-xx', 'pensadores-pensando-en-2015'];

slugs.forEach(slug => {
    const page = pages.find(p => p.post_name === slug);
    if (page) {
        console.log(`=== Content for ${slug} ===`);
        // Log first 500 chars to check structure
        console.log(page.content.substring(0, 500));
        console.log('...');
    } else {
        console.log(`Page not found: ${slug}`);
    }
});
