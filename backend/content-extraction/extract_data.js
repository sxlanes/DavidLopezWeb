const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const xmlPath = path.join(__dirname, '../davidlpez.WordPress.2026-01-10  ok - copia.xml');
const parser = new xml2js.Parser();

console.log('Reading XML file...');
fs.readFile(xmlPath, function (err, data) {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('Parsing XML...');
    parser.parseString(data, function (err, result) {
        if (err) {
            console.error('Error parsing XML:', err);
            return;
        }

        const channel = result.rss.channel[0];
        const items = channel.item;

        console.log(`Found ${items.length} items`);

        const attachments = {}; // ID -> URL
        const attachmentsByParent = {}; // ParentID -> [URL]
        const posts = [];

        // First pass: Identify attachments
        items.forEach(item => {
            const postType = item['wp:post_type'][0];
            const postId = item['wp:post_id'][0];

            if (postType === 'attachment') {
                const url = item['wp:attachment_url'][0];
                const parentId = item['wp:post_parent'][0];

                attachments[postId] = url;

                if (parentId !== '0') {
                    if (!attachmentsByParent[parentId]) {
                        attachmentsByParent[parentId] = [];
                    }
                    attachmentsByParent[parentId].push(url);
                }
            }
        });

        console.log(`Indexed ${Object.keys(attachments).length} attachments`);

        // Second pass: Process posts
        items.forEach(item => {
            const postType = item['wp:post_type'][0];

            if (postType === 'post' || postType === 'page') { // We might want pages too? User focused on articles.
                const postId = item['wp:post_id'][0];
                const title = item.title[0];
                const link = item.link[0];
                const pubDate = item.pubDate[0];
                const content = item['content:encoded'][0];
                const excerpt = item['excerpt:encoded'][0];

                // Categories
                const categories = [];
                if (item.category) {
                    item.category.forEach(cat => {
                        if (typeof cat === 'string') categories.push(cat);
                        else if (cat._) categories.push(cat._);
                    });
                }

                // Thumbnail
                let thumbnailId = null;
                if (item['wp:postmeta']) {
                    item['wp:postmeta'].forEach(meta => {
                        if (meta['wp:meta_key'][0] === '_thumbnail_id') {
                            thumbnailId = meta['wp:meta_value'][0];
                        }
                    });
                }

                let featuredImage = null;

                // Strategy 1: Explicit Thumbnail
                if (thumbnailId && attachments[thumbnailId]) {
                    featuredImage = attachments[thumbnailId];
                }

                // Strategy 2: First attached image (if no thumbnail)
                if (!featuredImage && attachmentsByParent[postId] && attachmentsByParent[postId].length > 0) {
                    featuredImage = attachmentsByParent[postId][0];
                }

                // Strategy 3: Extract from content (handled in frontend currently, but we can do it here too if regex works well, keeping it simple for now as frontend has DOMParser)
                // We'll leave content extraction to frontend or generic fallback if this fails.

                if (postType === 'post') {
                    posts.push({
                        post_id: postId,
                        title,
                        link,
                        pubDate,
                        content,
                        excerpt,
                        categories,
                        featured_image: featuredImage
                    });
                }
            }
        });

        console.log(`Processed ${posts.length} posts`);

        const outputPath = path.join(__dirname, '../src/data/posts.json');
        fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
        console.log('Saved to src/data/posts.json');
    });
});
