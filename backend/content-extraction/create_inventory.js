const fs = require('fs');
const path = require('path');

const posts = JSON.parse(fs.readFileSync('posts.json', 'utf8'));
const pages = JSON.parse(fs.readFileSync('pages.json', 'utf8'));

let mdContent = '# Inventario de Contenido del Sitio Web "David López"\n\n';

mdContent += `Generado a partir del archivo XML: davidlpez.WordPress.2026-01-10  ok - copia.xml\n\n`;

mdContent += '## Resumen\n';
mdContent += `- **Total Artículos (Posts)**: ${posts.length}\n`;
mdContent += `- **Total Páginas**: ${pages.length}\n\n`;

mdContent += '## Páginas (Pages)\n';
pages.forEach(page => {
    mdContent += `- [${page.title}](${page.link}) (Estado: ${page.status}, Fecha: ${page.post_date})\n`;
});

mdContent += '\n## Artículos (Posts)\n';
// Group by status
const publishedPosts = posts.filter(p => p.status === 'publish');
const draftPosts = posts.filter(p => p.status === 'draft');
const otherPosts = posts.filter(p => p.status !== 'publish' && p.status !== 'draft');

mdContent += `### Publicados (${publishedPosts.length})\n`;
publishedPosts.forEach(post => {
    mdContent += `- [${post.title}](${post.link}) (Fecha: ${post.post_date})\n`;
});

if (draftPosts.length > 0) {
    mdContent += `\n### Borradores (${draftPosts.length})\n`;
    draftPosts.forEach(post => {
        mdContent += `- [${post.title}](${post.link}) (Fecha: ${post.post_date})\n`;
    });
}

if (otherPosts.length > 0) {
    mdContent += `\n### Otros Estados (${otherPosts.length})\n`;
    otherPosts.forEach(post => {
        mdContent += `- [${post.title}](${post.link}) (Estado: ${post.status})\n`;
    });
}

fs.writeFileSync('content_inventory.md', mdContent);
console.log("Markdown inventory created.");
