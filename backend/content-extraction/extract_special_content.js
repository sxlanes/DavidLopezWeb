const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

// Actually, simple regex for img src is safer in basic node script without installing new deps if I can avoid it.
// But I have xml2js.

const xmlPath = path.join(__dirname, '../davidlpez.WordPress.2026-01-10  ok - copia.xml');
const parser = new xml2js.Parser();

function extractFirstImage(content) {
    if (!content) return null;
    const match = content.match(/<img[^>]+src="([^">]+)"/);
    return match ? match[1] : null;
}

fs.readFile(xmlPath, function (err, data) {
    if (err) return console.error(err);
    parser.parseString(data, function (err, result) {
        if (err) return console.error(err);

        const items = result.rss.channel[0].item;
        const attachments = {}; // ID -> URL
        const attachmentsByParent = {}; // ParentID -> [URL]

        // Attachment pass
        items.forEach(item => {
            const postType = item['wp:post_type'][0];
            const postId = item['wp:post_id'][0];
            if (postType === 'attachment') {
                const url = item['wp:attachment_url'][0];
                const parentId = item['wp:post_parent'][0];
                attachments[postId] = url;
                if (parentId !== '0') {
                    if (!attachmentsByParent[parentId]) attachmentsByParent[parentId] = [];
                    attachmentsByParent[parentId].push(url);
                }
            }
        });

        const courses = [];
        const books = [];
        const aboutData = {};

        items.forEach(item => {
            const postType = item['wp:post_type'][0];
            const title = item.title[0];
            const content = item['content:encoded'][0] || '';
            const postId = item['wp:post_id'][0];

            // Resolve Image
            let featuredImage = null;
            let thumbnailId = null;
            if (item['wp:postmeta']) {
                item['wp:postmeta'].forEach(meta => {
                    if (meta['wp:meta_key'][0] === '_thumbnail_id') {
                        thumbnailId = meta['wp:meta_value'][0];
                    }
                });
            }
            if (thumbnailId && attachments[thumbnailId]) {
                featuredImage = attachments[thumbnailId];
            } else if (attachmentsByParent[postId] && attachmentsByParent[postId].length > 0) {
                featuredImage = attachmentsByParent[postId][0];
            } else {
                // Fallback to content extraction
                featuredImage = extractFirstImage(content);
            }


            // 1. Courses
            if (title.toLowerCase().includes('curso') && (postType === 'page' || postType === 'post')) {
                // Check if it's really a course product or just a blog post about a course. 
                // We will assume pages with "Curso" are likely the main pages, or posts properly categorized.
                // For now, grab everything with Curso in title.
                courses.push({
                    id: postId,
                    title: title,
                    content: content,
                    image: featuredImage,
                    link: item.link[0]
                });
            }

            // 2. Books
            // Look for "Libro" category or title
            let isBook = false;
            if (item.category) {
                item.category.forEach(c => {
                    const catName = typeof c === 'string' ? c : c._;
                    if (catName.toLowerCase().includes('libro') || catName.toLowerCase().includes('publicaciones')) isBook = true;
                });
            }
            if (title.toLowerCase().includes('libro')) isBook = true;

            if (isBook && (postType === 'page' || postType === 'post')) {
                books.push({
                    id: postId,
                    title: title,
                    content: content,
                    image: featuredImage,
                    link: item.link[0],
                    amazonLink: content.match(/href="([^"]*amazon[^"]*)"/)?.[1] || null // Try to find amazon link
                });
            }

            // 3. About Me
            if (title.toLowerCase().includes('algo sobre mí') || title.toLowerCase() === 'sobre mí') {
                aboutData.image = featuredImage;
                if (!aboutData.image) {
                    // Try harder to find image in about page content
                    const images = content.match(/<img[^>]+src="([^">]+)"/g);
                    if (images && images.length > 0) {
                        // extract src from the tag
                        const src = images[0].match(/src="([^">]+)"/)[1];
                        aboutData.image = src;
                    }
                }
            }
        });

        console.log(`Found ${courses.length} courses`);
        console.log(`Found ${books.length} books`);
        console.log('About Image:', aboutData.image);

        // Save
        fs.writeFileSync(path.join(__dirname, '../src/data/courses_extracted.json'), JSON.stringify(courses, null, 2));
        fs.writeFileSync(path.join(__dirname, '../src/data/books_extracted.json'), JSON.stringify(books, null, 2));

        // Output About image for manual update or automatic if I write a mechanism
        if (aboutData.image) {
            console.log("SUGGESTION: Update src/pages/About.tsx with image: " + aboutData.image);
        }
    });
});
