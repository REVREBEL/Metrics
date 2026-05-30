import * as fs from "node:fs";
import * as path from "node:path";
import { spawnSync } from "node:child_process";

/**
 * CONFIGURATION
 * Resolved based on your project structure: ./src/assets/
 */
const getAssetsRoot = () => {
  const root = path.join(process.cwd(), "src/assets");
  if (fs.existsSync(root)) return root;

  const fallback = path.join(process.cwd(), "..", "src/assets");
  if (fs.existsSync(fallback)) return fallback;

  return null;
};

const ASSETS_ROOT = getAssetsRoot();

/**
 * Converts strings safely into the PascalCase format that SVGR uses.
 * Handles spaces, underscores, hyphens, and clears out duplicate casings.
 */
function toPascalCase(str) {
  return str
    .replace(/[-_]+/g, " ")                 // Turn underscores/hyphens into spaces
    .replace(/[^\w\s]/g, "")                // Remove special characters
    .replace(/\s+(.)/g, (_, c) => c.toUpperCase()) // Capitalize letters following spaces
    .replace(/^\w/, (c) => c.toUpperCase()) // Ensure first letter is capitalized
    .replace(/\s+/g, "");                   // Strip any remaining spaces
}

/**
 * Phase 1: Cleans up and renames SVG files on disk to match PascalCase conventions
 */
function normalizeSvgFilenames(svgDir) {
  const entries = fs.readdirSync(svgDir, { withFileTypes: true });

  for (const entry of entries) {
    const currentPath = path.join(svgDir, entry.name);

    if (entry.isDirectory()) {
      normalizeSvgFilenames(currentPath);
    } else if (entry.isFile() && entry.name.endsWith(".svg")) {
      const baseName = entry.name.slice(0, -4);
      const pascalName = `${toPascalCase(baseName)}.svg`;
      
      if (entry.name !== pascalName) {
        const targetPath = path.join(svgDir, pascalName);
        
        // Handle potential collisions on case-sensitive filesystems
        if (fs.existsSync(targetPath)) {
          console.warn(`⚠️ Collision warning: ${pascalName} already exists. Merging/overwriting.`);
        }
        
        console.log(`🔄 Renaming SVG: ${entry.name} -> ${pascalName}`);
        fs.renameSync(currentPath, targetPath);
      }
    }
  }
}

/**
 * Runs SVGR on a specific file
 */
function convertSvgToTsx(sourceFile, outputDir) {
  const args = [
    "--no-prettier",
    "--typescript",
    "--ext",
    "tsx",
    "--icon",
    "--replace-attr-values",
    "#000=currentColor",
    "--replace-attr-values",
    "#000000=currentColor",
    "--replace-attr-values",
    "black=currentColor",
    "--template",
    "./scripts/svgr-template.cjs",
    "--out-dir",
    outputDir,
    sourceFile,
  ];

  const result = spawnSync("pnpm", ["exec", "svgr", ...args], {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.error) {
    console.error(`❌ Failed to convert ${sourceFile}:`, result.error);
  }
}

/**
 * Phase 2: Recursively syncs an Svg folder to a React folder
 */
function syncFolders(svgDir, reactDir) {
  if (!fs.existsSync(reactDir)) {
    console.log(`📁 Creating missing React folder: ${reactDir}`);
    fs.mkdirSync(reactDir, { recursive: true });
  }

  const entries = fs.readdirSync(svgDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(svgDir, entry.name);
    
    if (entry.isDirectory()) {
      let targetSubFolderName = entry.name;
      if (targetSubFolderName.endsWith("Svg") || targetSubFolderName.endsWith("SVG")) {
        targetSubFolderName = targetSubFolderName.slice(0, -3) + "React";
      }
      syncFolders(sourcePath, path.join(reactDir, targetSubFolderName));
    } else if (entry.isFile() && entry.name.endsWith(".svg")) {
      // 1:1 matching mapping since SVGs are perfectly named now
      const componentName = entry.name.replace(".svg", ".tsx");
      const targetPath = path.join(reactDir, componentName);

      if (!fs.existsSync(targetPath)) {
        console.log(`✨ Converting: ${entry.name} -> ${componentName}`);
        convertSvgToTsx(sourcePath, reactDir);
      }
    }
  }
}

/**
 * Main discovery loop
 */
function main() {
  if (!ASSETS_ROOT) {
    console.error(`❌ Error: Could not find assets directory at "src/assets"`);
    process.exit(1);
  }

  const items = fs.readdirSync(ASSETS_ROOT, { withFileTypes: true });

  // --- RUN PHASE 1: Normalization ---
  console.log("⚙️ Starting Phase 1: Normalizing SVG file names to PascalCase...");
  for (const item of items) {
    if (!item.isDirectory() || item.name.endsWith("Png")) continue;
    if (item.name.endsWith("Svg") || item.name.endsWith("SVG")) {
      normalizeSvgFilenames(path.join(ASSETS_ROOT, item.name));
    }
  }

  // --- RUN PHASE 2: Conversion ---
  console.log("🔍 Starting Phase 2: Syncing folders and compiling components...");
  for (const item of items) {
    if (!item.isDirectory() || item.name.endsWith("Png")) continue;
    if (item.name.endsWith("Svg") || item.name.endsWith("SVG")) {
      const baseName = item.name.slice(0, -3);
      const reactFolderName = `${baseName}React`;
      
      syncFolders(
        path.join(ASSETS_ROOT, item.name),
        path.join(ASSETS_ROOT, reactFolderName)
      );
    }
  }
  
  console.log("✅ Icon sync complete.");
}

main();
