
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/books_extracted.json');
try {
    const data = fs.readFileSync(filePath, 'utf8');
    const books = JSON.parse(data);
    const book = books.find(b => b.title.toLowerCase().includes('bosque de albaricoques'));
    if (book) {
        console.log(JSON.stringify(book, null, 2));
    } else {
        console.log('Book not found in books_extracted.json');
        // Try looking in posts.json
        const postsPath = path.join(process.cwd(), 'src/data/posts.json');
        const postsData = fs.readFileSync(postsPath, 'utf8');
        const posts = JSON.parse(postsData);
        const post = posts.find(p => p.title.toLowerCase().includes('bosque de albaricoques'));
        if (post) {
            console.log('Found in posts.json:');
            console.log(JSON.stringify(post, null, 2));
        } else {
            console.log('Book not found in posts.json either');
        }
    }
} catch (error) {
    console.error('Error reading file:', error);
}
