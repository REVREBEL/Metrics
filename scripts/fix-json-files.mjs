import fs from 'fs';

const files = [
  'src/lib/ui-builder/registry/shadcn-components-registry.json',
  'src/lib/ui-builder/registry/block-registry.json',
  'src/lib/playground/modules.ts'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/lucide-react/g, '@tabler/icons-react');
  content = content.replace(/<CalendarIcon/g, '<IconCalendar');
  content = content.replace(/<CheckIcon/g, '<IconCheck');
  content = content.replace(/<ChevronRightIcon/g, '<IconChevronRight');
  content = content.replace(/<ChevronLeftIcon/g, '<IconChevronLeft');
  content = content.replace(/<ChevronDownIcon/g, '<IconChevronDown');
  content = content.replace(/<ChevronUpIcon/g, '<IconChevronUp');
  content = content.replace(/<CircleIcon/g, '<IconCircle');
  content = content.replace(/<XIcon/g, '<IconX');
  
  // also fix imports for shadcn
  content = content.replace(/import \{ Calendar as CalendarIcon \} from "@tabler\/icons-react"/g, 'import { IconCalendar } from "@tabler/icons-react"');
  
  fs.writeFileSync(file, content);
}
