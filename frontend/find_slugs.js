
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsPath = path.join(__dirname, 'src/data/posts.json');
const rawData = fs.readFileSync(postsPath, 'utf8');
const posts = JSON.parse(rawData);

const idsToFind = [
    "3421", "3877", "5886", "5708", "5979", "4360", "5177", "7416", "4027", "3842",
    "3304", "3394", "3336", "4935", "4830", "4219", "5683", "5847", "3171", "4632",
    "3615", "5375", "5300", "3210", "4135", "3470", "4722", "6011", "3275", "4580"
];

const mapping = {};

posts.forEach(post => {
    if (idsToFind.includes(String(post.post_id))) {
        mapping[post.post_id] = post.post_name;
    }
});

console.log(JSON.stringify(mapping, null, 2));
