const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const xmlPath = path.join(__dirname, '../davidlpez.WordPress.2026-01-10  ok - copia.xml');
const parser = new xml2js.Parser();

fs.readFile(xmlPath, function (err, data) {
    if (err) return console.error(err);
    parser.parseString(data, function (err, result) {
        if (err) return console.error(err);

        const items = result.rss.channel[0].item;
        const types = {};
        const categories = {};

        items.forEach(item => {
            const type = item['wp:post_type'][0];
            types[type] = (types[type] || 0) + 1;

            if (item.category) {
                item.category.forEach(c => {
                    const catName = typeof c === 'string' ? c : c._;
                    categories[catName] = (categories[catName] || 0) + 1;
                });
            }
        });

        console.log('Post Types:', types);
        // show top 20 categories
        console.log('Top Categories:', Object.entries(categories).sort((a, b) => b[1] - a[1]).slice(0, 20));

        // Find "Sobre mí" page image
        const aboutPage = items.find(i => i.title[0].toLowerCase().includes('sobre') && i['wp:post_type'][0] === 'page');
        if (aboutPage) {
            console.log('About Page Found:', aboutPage.title[0]);
            let thumbnailId = null;
            if (aboutPage['wp:postmeta']) {
                aboutPage['wp:postmeta'].forEach(meta => {
                    if (meta['wp:meta_key'][0] === '_thumbnail_id') {
                        thumbnailId = meta['wp:meta_value'][0];
                    }
                });
            }
            console.log('About Page Thumbnail ID:', thumbnailId);
        }
    });
});
