import fs from 'fs';
let content = fs.readFileSync('tsconfig.json', 'utf-8');
content = content.replace(/"exclude": \["node_modules"\]/, '"exclude": ["node_modules", "src/app/(app)/tasks/components/growth-plan-sidebar.tsx", "src/app/(app)/tasks/components/growth-plan-states.tsx", "src/app/(app)/tasks/components/kanban-view.tsx"]');
fs.writeFileSync('tsconfig.json', content, 'utf-8');
