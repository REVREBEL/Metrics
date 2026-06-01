import fs from 'fs';
let content = fs.readFileSync('tsconfig.json', 'utf-8');
content = content.replace(/"\*\*\/\*\.tsx",/, '"src/**/*.tsx",');
content = content.replace(/"\*\*\/\*\.ts",/, '"src/**/*.ts",');
fs.writeFileSync('tsconfig.json', content, 'utf-8');
