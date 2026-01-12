const fs = require('fs');
const path = require('path');

try {
    const brainDir = "C:\\Users\\sxlan\\.gemini\\antigravity\\brain\\4f604dba-8b48-4b7b-8e73-963be93b5555";
    const destDir = path.join(__dirname, 'public/images/generated');

    const images = [
        'course_platon',
        'course_conceptos',
        'course_arte',
        'course_ciencia',
        'course_metafisica',
        'course_politica'
    ];

    console.log(`Copying course covers from ${brainDir} to ${destDir}...`);

    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    const allFiles = fs.readdirSync(brainDir);

    images.forEach(imgName => {
        const prefix = imgName;
        const matches = allFiles.filter(f => f.startsWith(prefix) && f.endsWith('.png'));

        if (matches.length > 0) {
            const latest = matches.sort().pop();
            const srcPath = path.join(brainDir, latest);
            const destPath = path.join(destDir, `${imgName}.png`);

            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${latest} to ${imgName}.png`);
        } else {
            console.error(`Could not find generated image for ${imgName}`);
        }
    });

    console.log("All course covers copied successfully!");
} catch (err) {
    console.error("Error copying files:", err);
}
