
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/pages.json');
try {
    const data = fs.readFileSync(filePath, 'utf8');
    const pages = JSON.parse(data);
    const page = pages.find(p => p.post_name === 'el-bosque-de-albaricoques');
    if (page) {
        console.log(JSON.stringify(page, null, 2));
    } else {
        console.log('Page not found');
    }
} catch (error) {
    console.error('Error reading file:', error);
}
