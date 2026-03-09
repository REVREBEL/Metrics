const fs = require('fs');
const path = require('path');

const directoriesToScan = [
    path.join(__dirname, '../src/app/dashboard')
];

const clientHooks = ['useState', 'useEffect', 'useContext', 'useReducer', 'useCallback', 'useMemo', 'useRef', 'useLayoutEffect', 'useRouter', 'usePathname', 'useSearchParams', 'useSearch', 'useTheme', 'useSidebar'];

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

            // Skip if already has "use client" or 'use client'
            if (content.match(/^["']use client["']/)) return;
            if (content.includes('\n"use client"')) return;
            if (content.includes("\n'use client'")) return;

            // Check if it uses any client hooks
            const needsClient = clientHooks.some(hook => content.includes(hook));
            const hasOnClick = content.includes('onChange=') || content.includes('onClick=') || content.includes('onSubmit=');

            // For Shadcn components, they almost always need "use client" if they have interactivity
            if (needsClient || hasOnClick) {
                content = `"use client"\n\n` + content;
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Added "use client" to:', filePath);
            }
        }
    });
});
