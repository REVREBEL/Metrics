import fs from "node:fs";
import path from "node:path";

const iconsDir = path.resolve("./src/assets/rebel-icons");

function toPascalCase(value) {
  return value
    .replace(/\.[^.]+$/, "")
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toSafeExportName(file) {
  const basename = path.basename(file, path.extname(file));
  const exportName = toPascalCase(basename);

  if (!exportName) {
    throw new Error(`Unable to create a valid export name for ${file}`);
  }

  return /^\d/.test(exportName) ? `Icon${exportName}` : exportName;
}

const files = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith(".tsx"))
  .sort();

const lines = files.map((file) => {
  const name = path.basename(file, ".tsx");
  const exportName = toSafeExportName(file);
  return `export { default as ${exportName} } from "./${name}";`;
});

fs.writeFileSync(
  path.join(iconsDir, "index.ts"),
  lines.join("\n") + "\n",
  "utf8"
);

console.log(`Generated index.ts for ${files.length} icons.`);
