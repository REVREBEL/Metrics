import fs from "node:fs";
import path from "node:path";

function getAssetsRoot() {
  const candidates = [
    path.resolve("./src/assets"),
    path.resolve("../src/assets"),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

function toPascalCase(value) {
  return value
    .replace(/\.[^.]+$/, "")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toSafeExportName(file, usedNames) {
  const basename = path.basename(file, path.extname(file));
  const exportName = toPascalCase(basename);

  if (!exportName) {
    throw new Error(`Unable to create a valid export name for ${file}`);
  }

  const safeName = /^\d/.test(exportName) ? `Icon${exportName}` : exportName;

  if (!usedNames.has(safeName)) {
    usedNames.add(safeName);
    return safeName;
  }

  let index = 2;
  let dedupedName = `${safeName}${index}`;

  while (usedNames.has(dedupedName)) {
    index += 1;
    dedupedName = `${safeName}${index}`;
  }

  usedNames.add(dedupedName);
  return dedupedName;
}

function getIndexableDirectories(root) {
  const directories = [];

  function walk(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    const hasTsxFiles = entries.some(
      (entry) => entry.isFile() && entry.name.endsWith(".tsx") && entry.name !== "index.tsx"
    );

    if (hasTsxFiles) {
      directories.push(directory);
    }

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      walk(path.join(directory, entry.name));
    }
  }

  walk(root);
  return directories;
}

function writeIndex(directory) {
  const usedNames = new Set();
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".tsx") && file !== "index.tsx")
    .sort();

  if (!files.length) {
    return 0;
  }

  const lines = files.map((file) => {
    const name = path.basename(file, ".tsx");
    const exportName = toSafeExportName(file, usedNames);
    return `export { default as ${exportName} } from "./${name}";`;
  });

  fs.writeFileSync(
    path.join(directory, "index.ts"),
    lines.join("\n") + "\n",
    "utf8"
  );

  return files.length;
}

const assetsRoot = getAssetsRoot();

if (!assetsRoot) {
  console.error('Could not find assets directory at "src/assets".');
  console.error(`Current working directory: ${process.cwd()}`);
  process.exit(1);
}

const directories = getIndexableDirectories(assetsRoot);
let totalIcons = 0;

for (const directory of directories) {
  const iconCount = writeIndex(directory);
  totalIcons += iconCount;
  const relativePath = path.relative(process.cwd(), directory);
  console.log(`Generated ${relativePath}/index.ts for ${iconCount} icons.`);
}

console.log(`Generated ${directories.length} index files for ${totalIcons} icons.`);
