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

const map = {
    // src/app/(dashboard)/chats/page.tsx -> src/app/dashboard/chats/page.tsx 
    "chats/page.tsx": "import Chats from '@/app/dashboard/chats/page'",
    "users/page.tsx": "import Users from '@/app/dashboard/users/page'",
    "tasks/page.tsx": "import { Tasks } from '@/app/dashboard/tasks'",
    "settings/page.tsx": "import { SettingsProfile } from '@/app/dashboard/settings/profile'",
    "settings/account/page.tsx": "import { SettingsAccount } from '@/app/dashboard/settings/account/account-form'",
    "settings/appearance/page.tsx": "import { SettingsAppearance } from '@/app/dashboard/settings/appearance/appearance-form'",
    "settings/display/page.tsx": "import { SettingsDisplay } from '@/app/dashboard/settings/display/display-form'",
    "settings/notifications/page.tsx": "import { SettingsNotifications } from '@/app/dashboard/settings/notifications/notifications-form'",
};

walkDir(directoryToScan, function (filePath) {
    if (filePath.endsWith('.tsx')) {
        const relativePath = path.relative(directoryToScan, filePath);

        if (map[relativePath] || relativePath.includes('settings/')) {
            // Just doing a unified regex drop
            let content = fs.readFileSync(filePath, 'utf8');
            let changed = false;

            if (content.includes("from '@/app/dashboard/chats'")) {
                content = content.replace(/import\s*\{\s*Chats\s*\}\s*from\s*['"]@\/app\/dashboard\/chats['"];?/, "import Chats from '@/app/dashboard/chats/page';");
                content = content.replace(/<Chats\s*\/>/, "<Chats />");
                changed = true;
            }

            if (content.includes("from '@/app/dashboard/users'")) {
                content = content.replace(/import\s*\{\s*Users\s*\}\s*from\s*['"]@\/app\/dashboard\/users['"];?/, "import Users from '@/app/dashboard/users/page';");
                content = content.replace(/<Users\s*\/>/, "<Users />");
                changed = true;
            }

            if (content.includes("from '@/app/dashboard/settings/account'")) {
                content = content.replace(/import\s*\{\s*SettingsAccount\s*\}\s*from\s*['"]@\/app\/dashboard\/settings\/account['"];?/, "import { AccountForm } from '@/app/dashboard/settings/account/account-form';");
                content = content.replace(/<SettingsAccount\s*\/>/, "<AccountForm />");
                changed = true;
            }

            if (content.includes("from '@/app/dashboard/settings/appearance/appearance'")) {
                content = content.replace(/import\s*\{\s*SettingsAppearance\s*\}\s*from\s*['"]@\/app\/dashboard\/settings\/appearance\/appearance['"];?/, "import { AppearanceForm } from '@/app/dashboard/settings/appearance/appearance-form';");
                content = content.replace(/<SettingsAppearance\s*\/>/, "<AppearanceForm />");
                changed = true;
            }

            if (content.includes("from '@/app/dashboard/settings/display/display'")) {
                content = content.replace(/import\s*\{\s*SettingsDisplay\s*\}\s*from\s*['"]@\/app\/dashboard\/settings\/display\/display['"];?/, "import { DisplayForm } from '@/app/dashboard/settings/display/display-form';");
                content = content.replace(/<SettingsDisplay\s*\/>/, "<DisplayForm />");
                changed = true;
            }

            if (content.includes("from '@/app/dashboard/settings/notifications'")) {
                content = content.replace(/import\s*\{\s*SettingsNotifications\s*\}\s*from\s*['"]@\/app\/dashboard\/settings\/notifications['"];?/, "import { NotificationsForm } from '@/app/dashboard/settings/notifications/notifications-form';");
                content = content.replace(/<SettingsNotifications\s*\/>/, "<NotificationsForm />");
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log('Fixed export syntax in:', filePath);
            }
        }
    }
});
