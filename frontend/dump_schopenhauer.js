
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesPath = path.join(__dirname, 'src/data/pages.json');
const rawData = fs.readFileSync(pagesPath, 'utf8');
const pages = JSON.parse(rawData);

const page = pages.find(p => p.post_name === 'la-magia-clave-de-acceso-al-sistema-filosofico-de-schopenhauer');

if (page) {
    console.log(page.content);
} else {
    // Try to find the page related to Schopenhauer if exact slug is wrong
    const candidate = pages.find(p => p.title && p.title.toLowerCase().includes('schopenhauer'));
    if (candidate) {
        console.log("Found by title:", candidate.title);
        console.log("Slug:", candidate.post_name);
        console.log(candidate.content);
    } else {
        console.log("No Schopenhauer page found");
    }
}
