import { spawnSync } from "node:child_process";

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
  "./src/assets/rebel-icons",
  "./src/assets/rebel-icons_svg",
];

const result = spawnSync("pnpm", ["exec", "svgr", ...args], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 0);
