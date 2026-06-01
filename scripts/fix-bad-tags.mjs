import fs from 'fs';

const files = [
    'src/app/(app)/tasks/components/growth-plan-sidebar.tsx',
    'src/app/(app)/tasks/components/growth-plan-states.tsx',
    'src/app/(app)/tasks/components/kanban-view.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');

  // Fix "< div" and "< span" and other spaced tags that broke JSX
  content = content.replace(/<\s+([A-Za-z0-9]+)/g, "<$1");
  content = content.replace(/<\/\s+([A-Za-z0-9]+)/g, "</$1");

  // Fix onChange={(e) = >} missing the >
  content = content.replace(/\(e\)\s*=\s*strokeWidth=\{1\.5\}\s*size=\{20\}>\s*/g, '(e) => ');
  content = content.replace(/\(\)\s*=\s*strokeWidth=\{1\.5\}\s*size=\{20\}>\s*/g, '() => ');

  // Fix strokeWidth={1.5} size={20} inside JSX tags that shouldn't have them
  // This was inserted blindly into opening tags. We will remove it globally in these 3 broken files
  content = content.replace(/ strokeWidth=\{1\.5\}/g, '');
  content = content.replace(/ size=\{20\}/g, '');
  content = content.replace(/ stroke=\{1\.5\}/g, '');
  content = content.replace(/<span className="text-emerald-500">Online<\/span>\n\s*<span>-<\/span>\n\s*<span>\{member\.lastActive\}<\/span>\n\s*<\/>/g, '<>\n                            <span className="text-emerald-500">Online</span>\n                            <span>-</span>\n                            <span>{member.lastActive}</span>\n                          </>');

  // kanban view had some bad lines too
  content = content.replace(/\{completedTasks\}\/\{totalTasks\}\n\s*<\/span>\n\s*<\/div>\n\s*\)}/g, '{completedTasks}/{totalTasks}\n          </span>\n        </div>\n      )}');
  content = content.replace(/ \)/g, ')');
  content = content.replace(/ \>/g, '>');

  // Replace `)}` with `)}>` where there was a span
  content = content.replace(/\)\}\n            \{completedTasks\}\/\{totalTasks\}\n          <\/span>/g, ')}>\n            {completedTasks}/{totalTasks}\n          </span>');

  fs.writeFileSync(file, content, 'utf-8');
}
