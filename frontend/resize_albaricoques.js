
import fs from 'fs';
const pages = JSON.parse(fs.readFileSync('./src/data/pages.json', 'utf-8'));

// Find Novelas page
const novelas = pages.find(p => p.post_name === 'novelas');
if (novelas) {
    // Check content for Albaricoques image size
    let content = novelas.content;

    // Previous injection was:
    // <div class="mb-12 text-center"><img class="aligncenter shadow-2xl rounded-sm mb-4" src="/wp-content/uploads/albaricoques_cover.jpg" alt="El bosque de albaricoques" width="300" /><br/>...

    // User wants "image smaller in the page of El Bosque". 
    // Wait, "en la página de El Bosque". Is there a separate page for the book?
    // "El bosque de albaricoques" link points to Amazon in the debug output I saw earlier! 
    // <a href="https://www.amazon.com/...">EL BOSQUE DE ALBARICOQUES</a>
    // So there is NO internal page for it currently, unless I created one?
    // Ah, maybe the user means the "Novelas" page where it is listed.
    // "En la página de obras de ficción... me gustaría que fuera de mejor calidad"
    // "En la página de El bosque de albaricoques la imagen sea más pequeña".
    // If he clicks on it and it goes to Amazon, he sees Amazon.
    // So he must be referring to the "Novelas" page (Obras de ficción) for both requests?
    // OR he thinks there is a dedicated page.
    // Let's assume he means the entry in "Novelas" page.

    // To make it smaller: change width="300" to width="200"?
    // To make it better quality: I already updated the src to `albaricoques_cover.jpg`.
    // Maybe he wants me to update `albaricoques_cover.jpg` again? 
    // But he didn't send a new file.
    // "siempre respetando el mismo tamaño que las demás".
    // The other images in Novelas might be larger/smaller.
    // I recall checking `debug_novelas.js`:
    // Montesacro image: width="491" ??
    // Src: https://www.davidlopez.info/wp-content/uploads/2021/03/GREDOS-en-MONTESACRO-225x300.jpeg (225x300)
    // My Albaricoques image is width="300".

    // Maybe "more small" means matching the 225 width?

    content = content.replace('width="300"', 'width="225"');

    novelas.content = content;
    fs.writeFileSync('./src/data/pages.json', JSON.stringify(pages, null, 2));
    console.log("Updated Albaricoques size in Novelas page.");
}
