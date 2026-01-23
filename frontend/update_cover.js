
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/pages.json');
try {
    const data = fs.readFileSync(filePath, 'utf8');
    const pages = JSON.parse(data);
    const pageIndex = pages.findIndex(p => p.post_name === 'el-bosque-de-albaricoques');

    if (pageIndex !== -1) {
        pages[pageIndex].custom_cover = '/images/bosque_cover_final.png';
        fs.writeFileSync(filePath, JSON.stringify(pages, null, 2), 'utf8');
        console.log('Successfully updated custom_cover for el-bosque-de-albaricoques');
    } else {
        console.log('Page not found');
    }
} catch (error) {
    console.error('Error updating file:', error);
}
