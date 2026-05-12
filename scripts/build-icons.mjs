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

  // Fallback for different execution contexts
  const fallback = path.join(process.cwd(), "..", "src/assets");
  if (fs.existsSync(fallback)) return fallback;

  return null;
};

const ASSETS_ROOT = getAssetsRoot();

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
    "./scripts/svgr-template.cjs", // Ensure this template exists
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
 * Recursively syncs an Svg folder to a React folder
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
      // Check if subfolder ends in Svg and transform name to React
      let targetSubFolderName = entry.name;
      if (targetSubFolderName.endsWith("Svg")) {
        targetSubFolderName = targetSubFolderName.slice(0, -3) + "React";
      } else if (targetSubFolderName.endsWith("SVG")) {
        targetSubFolderName = targetSubFolderName.slice(0, -3) + "React";
      }

      // Recursive sync for subdirectories with mapped naming
      syncFolders(sourcePath, path.join(reactDir, targetSubFolderName));
    } else if (entry.isFile() && entry.name.endsWith(".svg")) {
      const componentName = entry.name.replace(".svg", ".tsx");
      const targetPath = path.join(reactDir, componentName);

      // Only convert if the TSX version doesn't exist
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
    console.log(`Current Working Directory: ${process.cwd()}`);
    process.exit(1);
  }

  const items = fs.readdirSync(ASSETS_ROOT, { withFileTypes: true });

  for (const item of items) {
    if (!item.isDirectory()) continue;
    
    const folderName = item.name;

    // Ignore PNG folders
    if (folderName.endsWith("Png")) continue;

    // Look for folders ending in "Svg" or "SVG"
    if (folderName.endsWith("Svg") || folderName.endsWith("SVG")) {
      const baseName = folderName.slice(0, -3); // Remove "Svg" or "SVG"
      const reactFolderName = `${baseName}React`;
      
      const svgPath = path.join(ASSETS_ROOT, folderName);
      const reactPath = path.join(ASSETS_ROOT, reactFolderName);

      console.log(`🔍 Checking pair: ${folderName} -> ${reactFolderName}`);
      syncFolders(svgPath, reactPath);
    }
  }
  
  console.log("✅ Icon sync complete.");
}

main();