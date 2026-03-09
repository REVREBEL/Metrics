import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.resolve(__dirname, '../src');
const WIDGETS_DIR = path.resolve(SRC_DIR, 'widgets');
const COMPONENTS_DIR = path.resolve(SRC_DIR, 'components');
const UI_DIR = path.resolve(COMPONENTS_DIR, 'ui');
const OUTPUT_FILE = path.resolve(SRC_DIR, 'lib/playground/registry.ts');
const OUTPUT_DIR = path.dirname(OUTPUT_FILE);

const toPascalCase = (str) =>
  str
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

function generate() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const metadataImports = [];
  const registryEntries = [];

  // 1. Scan Widgets
  if (fs.existsSync(WIDGETS_DIR)) {
    const widgets = fs.readdirSync(WIDGETS_DIR).filter(f => 
      fs.statSync(path.join(WIDGETS_DIR, f)).isDirectory()
    );
    widgets.forEach(f => {
      const safeKey = `widget_${f.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const hasMetadata = fs.existsSync(path.join(WIDGETS_DIR, f, 'metadata.ts'));
      const metadataVar = `widget_${f.replace(/[^a-zA-Z0-9]/g, '_')}_metadata`;
      if (hasMetadata) {
        metadataImports.push(`import { metadata as ${metadataVar} } from '@/widgets/${f}/metadata';`);
      }
      registryEntries.push(`  ${safeKey}: { 
    name: "${f}", 
    type: "widget",
    component: dynamic(() => import('@/widgets/${f}/index').then(mod => (mod as any).default || (mod as any)[Object.keys(mod)[0]])),
    metadata: ${hasMetadata ? metadataVar : 'null'}
  }`);
    });
  }

  // 2. Scan UI Primitives (Fixed with bracket notation to avoid parse error)
  if (fs.existsSync(UI_DIR)) {
    const uiFiles = fs.readdirSync(UI_DIR).filter(f => f.endsWith('.tsx'));
    uiFiles.forEach(f => {
      const name = f.replace('.tsx', '');
      const safeKey = `ui_${name.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const pascalName = toPascalCase(name);
      
      registryEntries.push(`  ${safeKey}: { 
    name: "${name}", 
    type: "ui-primitive",
    component: dynamic(() => import('@/components/ui/${name}').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m["${pascalName}"] || m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  }`);
    });
  }

  // 3. Scan Custom Components
  if (fs.existsSync(COMPONENTS_DIR)) {
    const customFiles = fs.readdirSync(COMPONENTS_DIR).filter(f => 
      f.endsWith('.tsx') && !f.includes('workshop')
    );
    customFiles.forEach(f => {
      const name = f.replace('.tsx', '');
      const safeKey = `custom_${name.replace(/[^a-zA-Z0-9]/g, '_')}`;
      
      registryEntries.push(`  ${safeKey}: { 
    name: "${name}", 
    type: "custom-component",
    component: dynamic(() => import('@/components/${name}').then(mod => {
      const m = mod as Record<string, any>;
      const componentLike = Object.keys(m).find((key) => /^[A-Z]/.test(key) && typeof m[key] === 'function');
      return m.default || (componentLike ? m[componentLike] : m[Object.keys(m)[0]]);
    })),
    metadata: null
  }`);
    });
  }

  const content = `/* eslint-disable @typescript-eslint/no-explicit-any */
// AUTOMATICALLY GENERATED - DO NOT EDIT
import dynamic from 'next/dynamic';
${metadataImports.length > 0 ? `\n${metadataImports.join('\n')}\n` : ''}

export const PLAYGROUND_REGISTRY: Record<string, any> = {
${registryEntries.join(',\n')}
};`;

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(`✅ Universal Registry Generated: Found ${registryEntries.length} items.`);
}

generate();
