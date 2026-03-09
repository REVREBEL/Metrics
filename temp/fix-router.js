const fs = require('fs');
const path = require('path');

const directoriesToScan = [
    path.join(__dirname, '../src/app/dashboard/errors')
];

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

directoriesToScan.forEach(dir => {
    walkDir(dir, function (filePath) {
        if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            let content = fs.readFileSync(filePath, 'utf8');

            let changed = false;
            if (content.includes('router.history.back()')) {
                content = content.replace(/router\.history\.back\(\)/g, "router.back()");
                changed = true;
            }
            if (content.includes("router({ to: '/' })")) {
                content = content.replace(/router\(\{\s*to:\s*['"]\/['"]\s*\}\)/g, "router.push('/')");
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Fixed router syntax in:', filePath);
            }
        }
    });
});
