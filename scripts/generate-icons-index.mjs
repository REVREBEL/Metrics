import fs from "node:fs";
import path from "node:path";

const iconsDir = path.resolve("./src/assets/rebel-icons");
const files = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith(".tsx"))
  .sort();

const lines = files.map((file) => {
  const name = path.basename(file, ".tsx");
  return `export { default as ${name} } from "./${name}";`;
});

fs.writeFileSync(
  path.join(iconsDir, "index.ts"),
  lines.join("\n") + "\n",
  "utf8"
);

console.log(`Generated index.ts for ${files.length} icons.`);
