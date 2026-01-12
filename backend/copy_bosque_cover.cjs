const fs = require('fs');
const path = require('path');

try {
    const brainDir = "C:\\Users\\sxlan\\.gemini\\antigravity\\brain\\4f604dba-8b48-4b7b-8e73-963be93b5555";
    const destDir = path.join(__dirname, 'public/images');

    // Find the generated image (timestamped)
    const allFiles = fs.readdirSync(brainDir);
    const match = allFiles.find(f => f.startsWith('bosque_cover_new') && f.endsWith('.png'));

    if (match) {
        fs.copyFileSync(path.join(brainDir, match), path.join(destDir, 'bosque_cover_new.png'));
        console.log(`Copied ${match} to public/images/bosque_cover_new.png`);
    } else {
        console.error("Could not find generated bosque_cover_new.png");
    }
} catch (e) {
    console.error(e);
}
