const fs = require('fs');
const path = require('path');

const directoryToScan = path.join(__dirname, '../src/app/(dashboard)');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(directoryToScan, function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');

        let changed = false;
        if (content.includes('@/app/dashboard/dashboard/')) {
            content = content.replace(/@\/app\/dashboard\/dashboard\//g, "@/app/dashboard/");
            changed = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed import syntax in:', filePath);
        }
    }
});
