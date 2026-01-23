
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsPath = path.join(__dirname, 'src/data/posts.json');
const rawData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(rawData);

const queries = [
    "Bergson", "Bloch", "Deleuze", "Derrida", "Feyerabend", "Foucault",
    "Gadamer", "Habermas", "Heidegger", "Horkheimer", "Husserl", "James",
    "Jaspers", "Kitaro", "Levinas", "Lyotard", "Marcuse", "Moore", "Ortega",
    "Popper", "Putnam", "Quine", "Russell", "Sartre", "Scheler", "Unamuno",
    "Weil", "Wittgenstein", "Zambrano"
];

const found = {};

posts.forEach(post => {
    queries.forEach(q => {
        if (post.title && post.title.includes(q)) {
            found[q] = { id: post.post_id, slug: post.post_name, title: post.title };
        }
    });
});

console.log(JSON.stringify(found, null, 2));
