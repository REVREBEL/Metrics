import fs from "node:fs";
import path from "node:path";

function toPascalCase(value) {
  return value
    .replace(/\.[^.]+$/, "")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toSafeExportName(file, usedNames) {
  const baseName = path.basename(file, path.extname(file));
  const pascalName = toPascalCase(baseName);
  const safeName = /^\d/.test(pascalName) ? `Icon${pascalName}` : pascalName;

  if (!safeName) {
    throw new Error(`Unable to create an export name for ${file}`);
  }

  if (!usedNames.has(safeName)) {
    usedNames.add(safeName);
    return safeName;
  }

  let counter = 2;
  let dedupedName = `${safeName}${counter}`;

  while (usedNames.has(dedupedName)) {
    counter += 1;
    dedupedName = `${safeName}${counter}`;
  }

  usedNames.add(dedupedName);
  return dedupedName;
}

function findAssetDirs(root) {
  const result = [];

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const fullPath = path.join(root, entry.name);

    if (!entry.isDirectory()) continue;

    const files = fs.readdirSync(fullPath, { withFileTypes: true });
    const hasComponents = files.some(
      (file) => file.isFile() && file.name.endsWith(".tsx") && file.name !== "index.tsx"
    );

    if (hasComponents) {
      result.push(fullPath);
    }

    result.push(...findAssetDirs(fullPath));
  }

  return result;
}

function writeIndex(dir) {
  const usedNames = new Set();
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".tsx") && file !== "index.tsx")
    .sort();

  const lines = files.map((file) => {
    const componentName = path.basename(file, ".tsx");
    const exportName = toSafeExportName(file, usedNames);
    const componentFile = path.join(dir, file);
    const componentSource = fs.readFileSync(componentFile, "utf8");

    if (/export\s+default\b/.test(componentSource)) {
      return `export { default as ${exportName} } from "./${componentName}";`;
    }

    return `export { ${exportName} } from "./${componentName}";`;
  });

  fs.writeFileSync(path.join(dir, "index.ts"), `${lines.join("\n")}\n`, "utf8");
  return files.length;
}

const assetsDir = path.resolve("src/assets");

if (!fs.existsSync(assetsDir)) {
  console.error(`Assets directory not found: ${assetsDir}`);
  process.exit(1);
}

const dirs = findAssetDirs(assetsDir);
const total = dirs.reduce((count, dir) => count + writeIndex(dir), 0);

console.log(`Generated ${dirs.length} index files for ${total} assets.`);
