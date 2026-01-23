
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesPath = path.join(__dirname, 'src/data/pages.json');
const rawData = fs.readFileSync(pagesPath, 'utf8');
const pages = JSON.parse(rawData);

const page = pages.find(p => p.post_name === 'filosofos-miticos-del-mitico-siglo-xx');

if (page) {
    console.log(page.content);
} else {
    console.log("Page not found");
}
