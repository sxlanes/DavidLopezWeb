
import fs from 'fs';
const postsPath = './src/data/posts.json';
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// Identify posts to update
// 3. MEDITACIÓN DIARIA -> Assign meditacion_diaria.png
// 4. FILOSOFÍA Y ACTUALIDAD -> Already has abstract_1.
// 7. El corona virus -> Has image but URL might be broken? Let's assign abstract regardless or check.
// 8. Unas primeras reflexiones -> Has image. 
// 9. The logical ballerinas: Nature -> Has image.

// I'll update the ones I generated images for:
// "MEDITACIÓN DIARIA (En directo)" (Check title)
// "Unas primeras reflexiones filosóficas sobre el coronavirus" (Assuming I can use the second one for this, or generated for generic coronavirus)

const updates = [
    {
        titlePart: "MEDITACIÓN DIARIA",
        newImage: "/images/generated/meditacion_diaria.png"
    },
    {
        titlePart: "coronavirus",
        newImage: "/images/generated/coronavirus_abstract.png",
        multiple: true // Apply to all coronavirus posts if they lack custom? Or just override to be safe.
    }
];

let updatedCount = 0;

posts.forEach(post => {
    const title = (post.title || '').toLowerCase();

    updates.forEach(upd => {
        if (title.includes(upd.titlePart.toLowerCase())) {
            // Only update if we want to ensure it has a GOOD image.
            // User said "some don't have".
            // I'll set custom_image which overrides everything.
            post.custom_image = upd.newImage;
            updatedCount++;
        }
    });
});

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
console.log(`Updated images for ${updatedCount} posts.`);
