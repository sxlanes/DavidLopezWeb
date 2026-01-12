const fs = require('fs');
const path = require('path');

// Image paths
const images = [
    'article_abstract_1.png',
    'article_abstract_2.png',
    'article_abstract_3.png',
    'article_abstract_4.png'
];

try {
    // Use the absolute path provided in previous metadata for Safety (or constructing from known path)
    // We can just rely on the fact that I know where they are generated.
    // Re-use logic from previous successful copies: constructing source path safely
    const brainDir = "C:\\Users\\sxlan\\.gemini\\antigravity\\brain\\4f604dba-8b48-4b7b-8e73-963be93b5555";
    const destDir = path.join(__dirname, 'public/images/generated');

    console.log(`Copying images from ${brainDir} to ${destDir}...`);

    if (!fs.existsSync(destDir)) {
        console.log("Creating destination directory...");
        fs.mkdirSync(destDir, { recursive: true });
    }

    // Find the exact files in brain dir because timestamps might vary slightly or I need to handle matching
    // Actually, I know the filenames are article_abstract_X_TIMESTAMP.png
    // I need to find the latest file for each prefix.

    const allFiles = fs.readdirSync(brainDir);

    images.forEach(imgName => {
        const prefix = imgName.replace('.png', '');
        // Find files starting with prefix and ending with .png
        const matches = allFiles.filter(f => f.startsWith(prefix) && f.endsWith('.png'));

        if (matches.length > 0) {
            // Sort or pick latest? usually just one.
            const latest = matches.sort().pop();
            const srcPath = path.join(brainDir, latest);
            const destPath = path.join(destDir, imgName);

            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${latest} to ${imgName}`);
        } else {
            console.error(`Could not find generated image for ${imgName}`);
        }
    });

} catch (err) {
    console.error("Error copying files:", err);
}
